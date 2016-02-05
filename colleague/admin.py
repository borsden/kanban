# coding=utf-8
from django.contrib import admin
from colleague.models import Invitation


class InvitedMemberAdmin(admin.ModelAdmin):
    # Данные поля отображаются в списке пользователей
    list_display = ('email', 'user', 'board')


admin.site.register(Invitation, InvitedMemberAdmin)