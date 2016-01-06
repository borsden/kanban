from rest_framework import serializers

from column.models import Column


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ('title', 'board', 'card_number', 'cards',)

    def create(self, validated_data):
        try:
            new_column = Column.objects.create(**validated_data)
            return new_column
        except Exception as e:
            print(e)
