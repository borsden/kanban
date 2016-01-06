# coding=utf-8
from __future__ import unicode_literals

from django.db import models
from swampdragon.models import SelfPublishModel
from card import router_serializers


class Card(SelfPublishModel, models.Model):
    class Meta:
        verbose_name = u'карта'
        verbose_name_plural = u'Карты'

    serializer_class = router_serializers.CardRouterSerializer

    title = models.CharField(max_length=30, verbose_name=u'Название')
    column = models.ForeignKey(to='column.Column', verbose_name=u'Категория', related_name='cards')
    worker = models.ForeignKey(to='user.User', verbose_name=u'Работник', related_name='cards', blank=True, null=True)
    priority = models.IntegerField(default=1)
    description = models.TextField(verbose_name=u'Описание', max_length=1000, null=True, blank=True)
    last_date = models.DateField(verbose_name=u'Дедлайн', blank=True, null=True)
    created_date = models.DateField(auto_now=True, verbose_name=u'Дата создания')
    archive = models.BooleanField(default=False, verbose_name=u'В архиве')
    tags = models.ManyToManyField(to='card.Tags', verbose_name=u'Теги', related_name='cards', blank=True)

    def __unicode__(self):
        return self.title


class Tags(models.Model):
    class Meta:
        verbose_name = u'тег'
        verbose_name_plural = u'Теги'

    title = models.CharField(max_length=10, verbose_name=u'Название')

    def __unicode__(self):
        return self.title