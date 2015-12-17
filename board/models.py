# coding=utf-8
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from board import router_serializers


class Board(models.Model):
    class Meta:
        verbose_name = u'доска'
        verbose_name_plural = u'Доски'

    serializer_class = router_serializers.BoardRouterSerializer

    title = models.CharField(max_length=20, verbose_name=u'Название')
    members = models.ManyToManyField(to='user.User', verbose_name=u'Участники', related_name='boards')
    # title = models.CharField(max_length=20, verbose_name=u'Название')

    def __unicode__(self):
        return self.title