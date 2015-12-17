from rest_framework import serializers
from column.models import Column


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ('title', 'board', 'card_number', 'cards')

    # balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    def create(self, validated_data):
        try:
            new_column = Column.objects.create(**validated_data)
            return new_column
        except Exception as e:
            print(e)
