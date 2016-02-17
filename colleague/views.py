# coding=utf-8
from rest_framework import status
from rest_framework.generics import DestroyAPIView, UpdateAPIView, get_object_or_404, CreateAPIView
from rest_framework.response import Response
from swampdragon.pubsub_providers.base_provider import PUBACTIONS

from board.models import Board
from colleague import serializers
from colleague.models import Invitation
from user.models import User


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
        invite_user = get_object_or_404(User, id=request.data['user'])
        invites = Invitation.objects.filter(email=request.data['email'], board=board)
        return board, invite_user, invites

    def update(self, request, *args, **kwargs):
        try:
            # Проверяем совпадение email текущего пользователя и email в приглашении,
            # и если они не равны, выдаем ошибку 405

            board, invite_user, invites = self.get_invite_member_attributes(request)
            if self.request.user.email != request.data['email'] and not invites.exists():
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            # Добавляем пользователя в текущую доску
            board.members.add(self.request.user)
            # Удаляем приглашения
            invites.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_409_CONFLICT)


# Отклонение приглашения. Наследуемся от Follower, и чуть изменяем update
class DeleteFollower(Follower):
    def update(self, request, *args, **kwargs):
        try:
            board, invite_user, invites = self.get_invite_member_attributes(request)

            if self.request.user.email != request.data['email'] and not invites.exists():
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            # Удаляем все приглашения в данную доску
            invites.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_409_CONFLICT)


# Список наших приглашений
class InvitedMember(CreateAPIView):
    def get_queryset(self):
        return Invitation.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer

    # При создании нового приглашения пользователем, создавшим приглашения, соответственно, будем мы
    def post(self, request, *args, **kwargs):
        request.data['user'] = self.request.user.id
        # Проверка на присутствие пользователя в members доски
        if not Board.objects.filter(id=request.data['board'], members=self.request.user).exists():
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        # Проверяем, существует ли уже такое приглашение
        elif Invitation.objects.filter(user=self.request.user, email=request.data['email']).exists():
            return Response(status=status.HTTP_302_FOUND)
        # Проверяем, вдруг пользователь дурачек и приглашает самого себя
        elif self.request.user.email == request.data['email']:
            return Response(status=status.HTTP_303_SEE_OTHER)
        try:
            return super(InvitedMember, self).post(request, *args, **kwargs)
        except Exception as e:
            return Response(status=status.HTTP_409_CONFLICT)


# Удаление нашего приглашения
class DeleteInvitedMember(DestroyAPIView):
    def get_queryset(self):
        # return Invitation.objects.filter(user=self.request.user)
        return Invitation.objects.filter(board__members=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer

    def delete(self, request, *args, **kwargs):
        return super(DeleteInvitedMember, self).delete(request, *args, **kwargs)


# Удаляем пользователя из списка пользователей доски
class DeleteBoardMember(UpdateAPIView):
    def get_queryset(self):
        return Board.objects.filter(members=self.request.user)

    def get_serializer_class(self):
        return serializers.BoardColleagueSerializer

    def put(self, request, *args, **kwargs):

        try:
            # Проверка на присутствие текущего пользователя в members доски
            board = Board.objects.get(id=request.data['board_id'], members=self.request.user)
            del_user = User.objects.get(id=request.data['id'])
            # Проверка на присутсвие удаляемого пользователя в members доски
            if not board.members.filter(id=del_user.id).exists():
                raise Exception
            # Удаляем пользователя
            board.members.remove(del_user)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

