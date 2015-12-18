from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'fullname')

    # balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    # def create(self, validated_data):
    #     try:
    #         new_column = Column.objects.create(**validated_data)
    #         return new_column
    #     except Exception as e:
    #         print(e)
