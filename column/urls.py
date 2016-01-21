# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^create_column/$', views.CreateColumn.as_view()),
                       url(r'^columns/(?P<pk>[0-9]+)/$', views.DetailColumn.as_view()),
                       url(r'^change_board_columns/$', views.ChangeBoardColumns.as_view()),
                       )