# coding=utf-8
from django.conf.urls import patterns, url

import views


urlpatterns = patterns('',
                       url(r'^colleagues/$', views.Colleagues.as_view()),
                       url(r'^all_followers/$', views.AllFollowers.as_view()),
                       url(r'^follower/(?P<pk>[0-9]+)/$', views.Follower.as_view()),
                       url(r'^delete_follower/(?P<pk>[0-9]+)/$', views.DeleteFollower.as_view()),
                       url(r'^invited_members/$', views.InvitedMembers.as_view()),
                       url(r'^delete_invited_member/(?P<pk>[0-9]+)/$', views.DeleteInvitedMember.as_view()),
                       )
