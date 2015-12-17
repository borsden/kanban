from rest_framework import serializers
from card.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('priority', 'title', 'worker', 'last_date', 'column', 'tags', 'description', 'created_date')
        extra_kwargs = {
            'created_date': {'read_only': True}
        }

    # balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    def create(self, validated_data):
        try:
            new_card = Card.objects.create(**validated_data)
            return new_card
        except Exception as e:
            print(e)
