# coding=utf-8
from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
import views

urlpatterns = patterns('',
                       url(r'^create_column/$', views.CreateColumn.as_view()),
                       url(r'^columns/(?P<pk>[0-9]+)/$', views.DetailColumn.as_view()),

                       )
#
# urlpatterns = format_suffix_patterns(urlpatterns)