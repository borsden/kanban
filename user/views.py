# coding=utf-8
import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status, permissions
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from user import serializers
from user.models import User


class CurrentUser(ListAPIView):
    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return serializers.UserSerializer

    def get(self, request, *args, **kwargs):
        if request.user.is_anonymous():
            return Response(status=401)
        else:
            try:
                serializer = serializers.UserSerializer(request.user)
                return Response(serializer.data)
            except Exception as e:
                return Response(status=status.HTTP_401_UNAUTHORIZED)


class LoginUser(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        email = data.get('email', None)
        password = data.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            login(request, account)
            serializer = serializers.UserSerializer(account)
            return Response(serializer.data)
        else:
            return Response({u'Email/пароль не подходят'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)