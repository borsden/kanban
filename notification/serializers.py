from rest_framework import serializers

from notification.models import EmailNotification


class EmailNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailNotification
        fields = ('id', 'confirmed_email', 'new_board', 'new_task', 'expired_task', 'entry',)