# coding=utf-8
from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
import views

urlpatterns = patterns('',
                       url(r'^current_user/$', views.CurrentUser.as_view()),

                       )
#
# urlpatterns = format_suffix_patterns(urlpatterns)