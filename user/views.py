from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from user import serializers
from user.models import User


class CurrentUser(ListAPIView):
    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return serializers.UserSerializer

    def get(self, request, *args, **kwargs):

        serializer = serializers.UserSerializer(request.user)
        try:
            return Response(serializer.data)
        except Exception as e:
            print e