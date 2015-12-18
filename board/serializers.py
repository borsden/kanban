from rest_framework import serializers
from board.models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('title', 'members', 'description', 'columns')


    # balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    def create(self, validated_data):
        try:
            new_board = Board.objects.create(**validated_data)
            return new_board
        except Exception as e:
            print(e)
