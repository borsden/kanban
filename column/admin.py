# coding=utf-8
from django.contrib import admin

from column.models import Column


class ColumnAdmin(admin.ModelAdmin):
    """Отображение задач"""
    # Данные поля отображаются в списке
    list_display = ('title', 'board',)
    # По данным полям возможна фильтрация
    list_filter = ('board',)

    search_fields = ('title',)
    ordering = ('id',)
    filter_horizontal = ()

# Регистрируем созданные формы
admin.site.register(Column, ColumnAdmin)