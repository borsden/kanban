# coding=utf-8
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from board.models import Board

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


class ChangeBoardColumns(APIView):
    """
    View для изменения, создания и удаления колонок, а также изменения их порядка.
    """

    def post(self, request, *args, **kwargs):
        try:
            board = get_object_or_404(Board, id=request.data['id'])
            # Пробегаемся по полученному списку
            for position, column_json in enumerate(request.data['columns']):
                # Если данная колонка уже существует:
                if 'id' in column_json:
                    # Ищем колонку в базе, она должна принадлежат данной доске.
                    column = get_object_or_404(Column, id=column_json['id'], board=board)

                    if 'type' in column_json:
                        # Если колонка помечена как удаленная, то удаляем ее и переходим к следующему объекту
                        if column_json['type'] == 'deleting':
                            column.delete()
                            continue
                        # Если колонка изменена, то изменения могут быть только в ее названии, поэтому обновляем его
                        elif column_json['type'] == 'changing':
                            column.title = column_json['title']
                            column.save(update_fields=['title'])
                # Создаем колонку, если ее еще нет.
                else:
                    column = Column.objects.create(title=column_json['title'], board=board)
                # Изменяем порядок колонки. Порядок - номер вхождения.
                column.position = position
                column.save(update_fields=['position'])
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)

        return Response({}, status=status.HTTP_200_OK)