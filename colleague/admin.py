# coding=utf-8
from django.contrib import admin
from colleague.models import InvitedMember


class InvitedMemberAdmin(admin.ModelAdmin):
    # Данные поля отображаются в списке пользователей
    list_display = ('email', 'user', 'board')


admin.site.register(InvitedMember, InvitedMemberAdmin)