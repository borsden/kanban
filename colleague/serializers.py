# coding=utf-8
from rest_framework import serializers

from board.models import Board

from models import Invitation
from user.models import User


# Сериализатор списка приглашенных пользователей
class InvitedMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ('id', 'email', 'user', 'board', 'board_title')
        extra_kwargs = {
            'board_title': {'read_only': True}
        }


# Сериализатор досок для списка коллег
class BoardColleagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('id', 'title',)


# Сериализатор пользователей для списка пригласивших
class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'avatar', 'fullname', 'initials')
        extra_kwargs = {
            'avatar': {'read_only': True},
            'email': {'read_only': True},
        }


# Сериализатор пригласивших
class FollowerSerializer(serializers.ModelSerializer):
    user = UserFollowerSerializer()

    class Meta:
        model = Invitation
        fields = ('id', 'email', 'user', 'board', 'board_title')
        extra_kwargs = {
            'board_title': {'read_only': True},
            'user': {'read_only': True},
        }
