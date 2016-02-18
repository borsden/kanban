# coding=utf-8
from django.db import models


class EmailNotification(models.Model):
    class Meta:
        verbose_name = u'Email уведомление'
        verbose_name_plural = u'email уведомление'

    user = models.OneToOneField(related_name='email_notification', verbose_name=u'Пользователь', to='user.User')
    confirmed_email = models.BooleanField(default=False, verbose_name=u'Email подтвержден')
    new_board = models.BooleanField(default=False, verbose_name=u'Уведомлять о приглашениях')
    new_task = models.BooleanField(default=False, verbose_name=u'Уведомлять о новых задачах')
    expired_task = models.BooleanField(default=False, verbose_name=u'Уведомлять о просроченных задачах')
    entry = models.BooleanField(default=False, verbose_name=u'Уведомлять о входе')

    def __unicode__(self):
        return self.user.email