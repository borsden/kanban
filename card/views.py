# coding=utf-8
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from card import serializers
from card.models import Card


class CreateCard(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = serializers.CardCreateSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super(CreateCard, self).post(request, *args, **kwargs)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


class DetailCard(generics.RetrieveUpdateDestroyAPIView):
    """
    View изменения карточки. В случае, если есть поле last_date, отбрасывается значение после T.
    """
    def get_queryset(self):
        return Card.objects.all()

    def get_serializer_class(self):
        return serializers.CardSerializer

    def put(self, request, *args, **kwargs):
        try:
            if request.data['last_date']:
                request.data['last_date'] = request.data['last_date'].split('T')[0]
            return super(DetailCard, self).update(request, *args, **kwargs)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


class ArchiveCard(DetailCard):
    """
    View для архивирования карточки.
    """

    def put(self, request, *args, **kwargs):
        try:
            id = kwargs.pop('pk')
            card = get_object_or_404(Card, id=id)
            card.archive = True
            card.save(update_fields=['archive'])
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)


class ChangeColumnCard(APIView):
    """
    View для изменения колонки, которой принадлежит карта, при drag'n'drop.
    """

    def put(self, request, *args, **kwargs):
        try:
            card_id = kwargs.pop('card_id')
            column_id = kwargs.pop('column_id')
            card = get_object_or_404(Card, id=card_id)
            card.column_id = column_id
            card.save()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            print e
            return Response({}, status=status.HTTP_409_CONFLICT)