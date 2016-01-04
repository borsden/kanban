from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from card import serializers
from card.models import Card


class CreateCard(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = serializers.CardSerializer

    def post(self, request, *args, **kwargs):
        try:
            # print request.data
            # print request['data']
            # request.data['user'] = request.user.pk
            return super(CreateCard, self).post(request, *args, **kwargs)
        except Exception as e:
            print e


class DetailCard(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Card.objects.all()

    def get_serializer_class(self):
        return serializers.CardSerializer

    def put(self, request, *args, **kwargs):
        try:
            # print(request.data)
            if request.data['last_date']:
                request.data['last_date'] = request.data['last_date'].split('T')[0]
            return super(DetailCard, self).update(request, *args, **kwargs)
        except Exception as e:
            print e


class ArchiveCard(DetailCard):
    def get_queryset(self):
        return Card.objects.all()

    def get_serializer_class(self):
        return serializers.CardSerializer

    def put(self, request, *args, **kwargs):
        try:
            id = kwargs.pop('pk')
            card = get_object_or_404(Card, id=id)
            card.archive = True
            card.save(update_fields=['archive'])
            serializer = serializers.CardSerializer(card)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print e