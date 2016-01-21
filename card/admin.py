# coding=utf-8
from django.contrib import admin

from card.models import Card, Tags


class CardAdmin(admin.ModelAdmin):
    """Отображение задач"""
    # Данные поля отображаются в списке
    list_display = ('title', 'archive',)
    # По данным полям возможна фильтрация
    list_filter = ('archive', 'column__board')

    search_fields = ('title',)
    ordering = ('id',)
    filter_horizontal = ()

# Регистрируем созданные формы
admin.site.register(Card, CardAdmin)
admin.site.register(Tags)