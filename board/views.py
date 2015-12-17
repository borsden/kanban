from django.shortcuts import render
from rest_framework import generics
from board import serializers
from board.models import Board


class CreateBoard(generics.CreateAPIView):
    queryset = Board.objects.all()
    serializer_class = serializers.BoardSerializer

    def post(self, request, *args, **kwargs):
        try:
            # print request.data
            # print request['data']
            # request.data['user'] = request.user.pk
            return super(CreateBoard, self).post(request, *args, **kwargs)
        except Exception as e:
            print e


class DetailBoard(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Board.objects.all()

    def get_serializer_class(self):
        return serializers.BoardSerializer

    def put(self, request, *args, **kwargs):
        try:
            return super(DetailBoard, self).update(request, *args, **kwargs)
        except Exception as e:
            print e