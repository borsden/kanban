from swampdragon.serializers.model_serializer import ModelSerializer


class ColumnRouterSerializer(ModelSerializer):
    class Meta:
        model = 'column.Column'
        publish_fields = ('title', 'card_number', 'board')