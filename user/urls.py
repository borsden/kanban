# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^current_user/$', views.CurrentUser.as_view()),
                       url(r'^update_user/$', views.UpdateUser.as_view()),
                       url(r'^login/$', views.LoginUser.as_view()),
                       url(r'^logout/$', views.LogoutUser.as_view()),
                       url(r'^change_avatar/$', views.ChangeAvatar.as_view()),
                       url(r'^colleagues/(?P<board_id>[0-9]+)/$', views.GetColleagues.as_view()),
                       )
