# coding=utf-8
import ast
from rest_framework import generics, status
from rest_framework.response import Response

from board import serializers
from board.models import Board


class CreateBoard(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer

    def post(self, request, *args, **kwargs):
        try:
            request.data['members'].append(self.request.user.id)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)
        try:
            return super(CreateBoard, self).post(request, *args, **kwargs)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)

    def get_serializer_class(self):
        return serializers.BoardSerializer


class DetailBoard(generics.RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        return serializers.BoardSerializer

    def get_queryset(self):
        return Board.objects.all()

    def put(self, request, *args, **kwargs):
        try:
            # Добавляем текущего пользователя в список пользователей доски
            # Сохраняем список пользователей доски отдельно, чтобы swamp_dragon корректно зафиксировал его изменение
            request.data['members'].append(self.request.user.id)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)
        try:
            return super(DetailBoard, self).update(request, *args, **kwargs)
        except Exception as e:
            return Response({}, status=status.HTTP_409_CONFLICT)