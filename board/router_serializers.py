from swampdragon.serializers.model_serializer import ModelSerializer


class BoardRouterSerializer(ModelSerializer):
    class Meta:
        model = 'board.Board'
        publish_fields = ('title', 'members', 'columns', 'description')
