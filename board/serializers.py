from rest_framework import serializers
from board.models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('title', 'members')
    def create(self, validated_data):
        try:
            new_card = Board.objects.create(**validated_data)
            return new_card
        except Exception as e:
            print(e)
