from rest_framework import generics, status
from rest_framework.response import Response

from column import serializers
from column.models import Column


class CreateColumn(generics.CreateAPIView):
    queryset = Column.objects.all()
    serializer_class = serializers.ColumnSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super(CreateColumn, self).post(request, *args, **kwargs)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


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
            return Response({}, status=status.HTTP_409_CONFLICT)
