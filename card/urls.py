# coding=utf-8
from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
import views

urlpatterns = patterns('',
                       url(r'^create_card/$', views.CreateCard.as_view()),
                       url(r'^archive_card/(?P<pk>[0-9]+)/$', views.ArchiveCard.as_view()),
                       url(r'^cards/(?P<pk>[0-9]+)/$', views.DetailCard.as_view()),

                       )
#
# urlpatterns = format_suffix_patterns(urlpatterns)