# coding=utf-8
from rest_framework import serializers
from board.models import Board
from user.models import User


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('id', 'title', 'members', 'description', 'columns')
        extra_kwargs = {
            'columns': {'read_only': True},
            'id': {'read_only': True},
        }

    # Удаляем список пользователей из validated_data,
    # так как создание новой доски валится при присутствии поля members. Сохраняем его после создания.
    def create(self, validated_data):
        members = validated_data['members']
        validated_data.pop('members')
        new_board = Board.objects.create(**validated_data)
        new_board.members = members
        return new_board
