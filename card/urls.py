# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^create_card/$', views.CreateCard.as_view()),
                       url(r'^archive_card/(?P<pk>[0-9]+)/$', views.ArchiveCard.as_view()),
                       url(r'^cards/(?P<pk>[0-9]+)/$', views.DetailCard.as_view()),
                       url(r'^change_column_card/(?P<column_id>[0-9]+)/(?P<card_id>[0-9]+)/$',
                           views.ChangeColumnCard.as_view()),

                       )