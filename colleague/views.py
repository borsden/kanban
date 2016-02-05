# coding=utf-8
from rest_framework import status
from rest_framework.generics import DestroyAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, \
    UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from board.models import Board
from colleague import serializers
from colleague.models import Invitation
from user.models import User


# Возвращает список коллег, с которыми есть общие доски
class Colleagues(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(boards__in=
                                   self.request.user.boards.all()).exclude(id=self.request.user.id).distinct()

    def get_serializer_class(self):
        return serializers.ColleagueSerializer


# Пользователи, которые отправили приглашение для текущего пользователя
class AllFollowers(ListAPIView):
    def get_queryset(self):
        return Invitation.objects.filter(email=self.request.user.email)

    def get_serializer_class(self):
        return serializers.FollowerSerializer


# Представление, которое используется при подтверждении приглашения
class Follower(UpdateAPIView):
    def get_queryset(self):
        return Invitation.objects.all()

    def get_serializer_class(self):
        return serializers.FollowerSerializer

    # дополнительная функция, возвращающая доску, пригласившего пользователя и само приглашение
    @staticmethod
    def get_invite_member_attributes(request):

        board = get_object_or_404(Board, id=request.data['board'])
        invite_user = get_object_or_404(User, id=request.data['user']['id'])
        invited_member = get_object_or_404(Invitation,
                                           user=invite_user,
                                           email=request.data['email'],
                                           id=request.data['id'],
                                           board=board)
        return board, invite_user, invited_member

    def update(self, request, *args, **kwargs):
        try:
            # Проверяем совпадение email текущего пользователя и email в приглашении,
            # и если они не равны, выдаем ошибку 405
            if self.request.user.email != request.data['email']:
                return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            board, invite_user, invited_member = self.get_invite_member_attributes(request)
            # Добавляем пользователя в текущую доску
            board.members.add(self.request.user)
            # Сохраняем доску для того, чтобы swampdragon зафиксировал ее изменение (т.е. изменение списка коллег)
            board.save()
            # Удаляем приглашение
            invited_member.delete()
            # Сериализуем пользователей доски и отправляем на сервер
            serializer = serializers.ColleagueSerializer(board.members.all().exclude(id=self.request.user.id),
                                                         many=True,
                                                         read_only=True,
                                                         context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


# Отклонение приглашения. Наследуемся от Follower, и чуть изменяем update
class DeleteFollower(Follower):
    def update(self, request, *args, **kwargs):
        try:
            board, invite_user, invited_member = self.get_invite_member_attributes(request)
            invited_member.delete()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


# Список наших приглашений
class InvitedMembers(ListCreateAPIView):
    def get_queryset(self):
        return Invitation.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer

    # При создании нового приглашения пользователем, создавшим приглашения, соответсвенно, будем мы
    def post(self, request, *args, **kwargs):
        request.data['user'] = self.request.user.id
        try:
            return super(InvitedMembers, self).post(request, *args, **kwargs)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)


# Удаление нашего приглашения
class DeleteInvitedMember(DestroyAPIView):
    def get_queryset(self):
        return Invitation.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer