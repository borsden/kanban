# coding=utf-8
from __future__ import unicode_literals

from django.db import models
from swampdragon.models import SelfPublishModel
from column.router_serializers import ColumnRouterSerializer


class Column(SelfPublishModel, models.Model):
    class Meta:
        verbose_name = u'категория'
        verbose_name_plural = u'Категории'

    serializer_class = ColumnRouterSerializer
    title = models.CharField(max_length=20, verbose_name=u'Название')
    board = models.ForeignKey(to='board.Board', verbose_name='Доска', related_name='columns')
    card_number = models.IntegerField(default=0)

    def __unicode__(self):
        return self.title
