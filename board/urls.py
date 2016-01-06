# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^create_board/$', views.CreateBoard.as_view()),
                       url(r'^boards/(?P<pk>[0-9]+)/$', views.DetailBoard.as_view()),

                       )