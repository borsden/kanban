from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from notification import serializers
from notification.models import EmailNotification


class ChangeEmailNotification(generics.UpdateAPIView):
    def get_serializer_class(self):
        return serializers.EmailNotificationSerializer

    def get_queryset(self):
        return EmailNotification.objects.filter(user=self.request.user)

    def put(self, request, *args, **kwargs):
        print request
        return super(ChangeEmailNotification, self).update(request, *args, **kwargs)