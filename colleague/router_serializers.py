from swampdragon.serializers.model_serializer import ModelSerializer


class InvitationRouterSerializer(ModelSerializer):
    class Meta:
        model = 'colleague.Invitation'
        publish_fields = ('email', 'user', 'board', 'board__title', 'user__email', 'user__fullname')
