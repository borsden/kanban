# coding=utf-8
import json

from django.contrib.auth import authenticate, login, logout
from rest_framework import status, permissions
from rest_framework.generics import UpdateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from kanban.helpers import Base64Image
from user import serializers
from user.models import User


class CurrentUser(RetrieveUpdateAPIView):
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


class UpdateUser(UpdateAPIView):
    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        return serializers.UserSerializer

    def put(self, request, *args, **kwargs):
        try:
            serializer = serializers.UserSerializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


class LoginUser(APIView):
    def post(self, request, format=None):
        email = request.data['email']
        password = request.data['password']
        account = authenticate(email=email, password=password)
        if account is not None:
            try:
                login(self.request, account)
                serializer = serializers.UserSerializer(account)
                return Response(serializer.data)
            except Exception as e:
                print e
                return Response({}, status=status.HTTP_409_CONFLICT)
        else:
            return Response({u'Email/пароль не подходят'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class ChangeAvatar(APIView):
    def post(self, request, format=None):
        try:
            user = request.user
            base = Base64Image(image_base64=request.data['image'])
            user.avatar.delete(save=False)
            user.avatar = base.get_raw_image(user_id=user.id)
            user.save(update_fields=['avatar'])
            return Response({'avatar': user.avatar.url}, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


# Смена пароля текущего пользователя
class ChangePassword(APIView):
    def post(self, request):
        try:
            email = self.request.user.email
            new_password = request.data['new_password']
            account = authenticate(email=email, password=request.data['old_password'])
            if account is None:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
            if not (new_password and new_password == request.data['new_password']):
                return Response(status=status.HTTP_303_SEE_OTHER)
            else:
                self.request.user.set_password(new_password)
                self.request.user.save()
                # Принудительно перезаходим
                account = authenticate(email=email, password=new_password)
                login(self.request, account)
                return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)

