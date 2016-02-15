# coding=utf-8
from django.db import models
from swampdragon.models import SelfPublishModel
from colleague import router_serializers


class Invitation(SelfPublishModel, models.Model):
    # Отображение в админке
    class Meta:
        verbose_name = u'приглашение'
        verbose_name_plural = u'Приглашения'

    serializer_class = router_serializers.InvitationRouterSerializer

    email = models.EmailField(verbose_name=u'Email', max_length=255, )
    user = models.ForeignKey(to='user.User', related_name='invited_members', verbose_name=u'Пригласивший')
    board = models.ForeignKey(to='board.Board', related_name='invited_members', verbose_name=u'Доска')

    @property
    def board_title(self):
        return self.board.title

    def __unicode__(self):
        return self.email