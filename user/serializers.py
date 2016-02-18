from rest_framework import serializers
from notification.serializers import EmailNotificationSerializer

from user.models import User


class UserSerializer(serializers.ModelSerializer):
    email_notification = EmailNotificationSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'patronymic',
                  'avatar', 'fullname', 'initials', 'email_notification')
        extra_kwargs = {
            'avatar': {'read_only': True},
            'email': {'read_only': True},
            'email_notification': {'read_only': True},
        }

