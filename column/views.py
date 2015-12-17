from django.shortcuts import render
from rest_framework import generics
from column import serializers
from column.models import Column


class CreateColumn(generics.CreateAPIView):
    queryset = Column.objects.all()
    serializer_class = serializers.ColumnSerializer

    def post(self, request, *args, **kwargs):
        try:
            # print request.data
            # print request['data']
            # request.data['user'] = request.user.pk
            return super(CreateColumn, self).post(request, *args, **kwargs)
        except Exception as e:
            print e


class DetailColumn(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Column.objects.all()

    def get_serializer_class(self):
        return serializers.ColumnSerializer

    def put(self, request, *args, **kwargs):
        try:
            return super(DetailColumn, self).update(request, *args, **kwargs)
        except Exception as e:
            print e