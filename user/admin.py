# coding=utf-8
from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User


class UserCreationForm(forms.ModelForm):
    """
    Форма для создания новых пользователей. Включает все требуемые поля, а также повторение пароля.
    """
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput, required=False)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput, required=False)

    class Meta:
        model = User
        fields = ('email', 'status')

    def clean_password(self):

        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Сохраняем пароль в виде хеша
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """Форма изменения пользователя. Пароль хранится в виде хеша."""
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'password', 'status', 'first_name', 'last_name', 'patronymic', 'is_admin')

    def clean_password(self):
        return self.initial["password"]


class MyUserAdmin(UserAdmin):
    """Отображение всех пользователей"""
    form = UserChangeForm
    add_form = UserCreationForm

    # Данные поля отображаются в списке пользователей
    list_display = ('email', 'status', 'is_admin')
    # По данным полям возможна фильтрация
    list_filter = ('is_admin', 'status')
    #
    fieldsets = (
        (None, {'fields': ('email', 'password', 'status')}),
        (u'Административная часть', {'fields': ('is_admin',)}),
        (u'Профиль', {'fields': ('first_name', 'last_name', 'patronymic', 'avatar')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

# Регистрируем созданные формы
admin.site.register(User, MyUserAdmin)
# Так как мы не используем встроенные Django разрешения, то наоборот, отсоединим их
admin.site.unregister(Group)