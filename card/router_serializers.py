from swampdragon.serializers.model_serializer import ModelSerializer


class CardRouterSerializer(ModelSerializer):
    class Meta:
        model = 'card.Card'
        publish_fields = (
            'priority', 'title', 'worker', 'last_date',
            'column_id', 'tags', 'description', 'archive')
