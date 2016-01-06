# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^current_user/$', views.CurrentUser.as_view()),
                       url(r'^login/$', views.LoginUser.as_view()),
                       url(r'^logout/$', views.LogoutUser.as_view()),

                       )
