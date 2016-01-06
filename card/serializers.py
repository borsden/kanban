# coding=utf-8
from rest_framework import serializers
from card.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = (
            'priority', 'title', 'worker', 'last_date', 'column', 'archive', 'tags', 'description', 'created_date',)
        extra_kwargs = {
            'created_date': {'read_only': True},
            'column': {'read_only': True},
        }


class CardCreateSerializer(CardSerializer):
    class Meta(CardSerializer.Meta):
        extra_kwargs = {
            'created_date': {'read_only': True},
        }
