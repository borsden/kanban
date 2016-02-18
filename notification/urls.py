# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^change_email_notification/(?P<pk>[0-9]+)/$', views.ChangeEmailNotification.as_view()),
                       )
