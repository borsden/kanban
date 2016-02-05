import base64
from django.core.files.base import ContentFile
from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'patronymic', 'avatar', 'fullname', 'initials')
        extra_kwargs = {
            'avatar': {'read_only': True},
            'email': {'read_only': True},
        }

