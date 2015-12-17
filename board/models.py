# coding=utf-8
from __future__ import unicode_literals

from django.db import models
from swampdragon.models import SelfPublishModel
from board import router_serializers


class Board(SelfPublishModel, models.Model):
    class Meta:
        verbose_name = u'доска'
        verbose_name_plural = u'Доски'

    serializer_class = router_serializers.BoardRouterSerializer

    title = models.CharField(max_length=20, verbose_name=u'Название')
    members = models.ManyToManyField(to='user.User', related_name='boards', verbose_name=u'Участники')

    def __unicode__(self):
        return self.title
