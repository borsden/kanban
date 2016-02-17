# coding=utf-8
from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from swampdragon.models import SelfPublishModel
from swampdragon.pubsub_providers.base_provider import PUBACTIONS
from board import router_serializers
from user.models import User


class Board(SelfPublishModel, models.Model):
    class Meta:
        verbose_name = u'доска'
        verbose_name_plural = u'Доски'

    serializer_class = router_serializers.BoardRouterSerializer

    title = models.CharField(max_length=20, verbose_name=u'Название')
    description = models.TextField(verbose_name=u'Описание', null=True, blank=True)
    members = models.ManyToManyField(to='user.User', related_name='boards', verbose_name=u'Участники')

    def __unicode__(self):
        return self.title


# Ловим изменения пользователей доски
@receiver(m2m_changed, sender=Board.members.through)
def my_handler(instance, action, model, pk_set, **kwargs):
    # Swamp_dragon вызывает изменения в пользователях при добавлении
    # новой доски и при удалении любого пользователя из нее
    if action == 'post_add':
        for object_ in instance.members.all():
            object_._publish(PUBACTIONS.updated, object_._serializer.opts.publish_fields)

    if action == 'post_remove' and model == User:
        for object_ in User.objects.filter(id__in=pk_set):
            object_._publish(PUBACTIONS.updated, object_._serializer.opts.publish_fields)
