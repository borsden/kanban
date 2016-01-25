from swampdragon.serializers.model_serializer import ModelSerializer


class UserRouterSerializer(ModelSerializer):
    class Meta:
        model = 'user.User'
        publish_fields = ('email', 'first_name', 'last_name', 'fullname', 'initials', 'avatar')