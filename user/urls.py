# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^current_user/$', views.CurrentUser.as_view()),
                       url(r'^update_user/$', views.UpdateUser.as_view()),
                       url(r'^login/$', views.LoginUser.as_view(), name='login'),
                       url(r'^logout/$', views.LogoutUser.as_view()),
                       url(r'^change_avatar/$', views.ChangeAvatar.as_view()),
                       url(r'^change_password/$', views.ChangePassword.as_view()),
                       )
