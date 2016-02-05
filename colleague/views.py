from rest_framework import status
from rest_framework.generics import DestroyAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, \
    UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from board.models import Board
from colleague import serializers
from colleague.models import InvitedMember
from user.models import User


class Colleagues(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(boards__in=
                                   self.request.user.boards.all()).exclude(id=self.request.user.id).distinct()

    def get_serializer_class(self):
        return serializers.ColleagueSerializer


class AllFollowers(ListAPIView):
    def get_queryset(self):
        # print InvitedMember.objects.filter(email=self.request.user.email)
        # print User.objects.filter(invited_members__email=self.request.user.email).exclude(id=self.request.user.id)
        return InvitedMember.objects.filter(email=self.request.user.email)

    def get_serializer_class(self):
        return serializers.FollowerSerializer


class Follower(UpdateAPIView):
    def get_queryset(self):
        return InvitedMember.objects.all()

    def get_serializer_class(self):
        return serializers.FollowerSerializer

    def get_invite_member_attributes(self, request):

        board = get_object_or_404(Board, id=request.data['board'])
        invite_user = get_object_or_404(User, id=request.data['user']['id'])
        invited_member = get_object_or_404(InvitedMember,
                                           user=invite_user,
                                           email=request.data['email'],
                                           id=request.data['id'],
                                           board=board)
        return board, invite_user, invited_member

    def update(self, request, *args, **kwargs):
        try:
            if self.request.user.email != request.data['email']:
                return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            board, invite_user, invited_member = self.get_invite_member_attributes(request)
            board.members.add(self.request.user)
            invited_member.delete()
            serializer = serializers.ColleagueSerializer(board.members.all().exclude(id=self.request.user.id),
                                                         many=True,
                                                         read_only=True,
                                                         context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


class DeleteFollower(Follower):
    def update(self, request, *args, **kwargs):
        try:
            board, invite_user, invited_member = self.get_invite_member_attributes(request)
            invited_member.delete()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)
        return super(Follower, self).update(request, *args, **kwargs)


class InvitedMembers(ListCreateAPIView):
    def get_queryset(self):
        return InvitedMember.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = self.request.user.id
        try:
            return super(InvitedMembers, self).post(request, *args, **kwargs)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)


class DeleteInvitedMember(DestroyAPIView):
    def get_queryset(self):
        return InvitedMember.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        return serializers.InvitedMemberSerializer