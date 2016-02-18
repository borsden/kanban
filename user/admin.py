# coding=utf-8
from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from board.models import Board

from .models import User
from notification.models import EmailNotification


class UserCreationForm(forms.ModelForm):
    """
    Форма для создания новых пользователей. Включает все требуемые поля, а также повторение пароля.
    """
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput, required=False)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput, required=False)

    class Meta:
        model = User
        fields = ('email',)

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
    password = ReadOnlyPasswordHashField(label=("Password"),
                                         help_text=(
                                             u"Вы можете изменить пароль, используя эту ссылку."
                                             u" <a href=\"password/\">Изменить пароль</a>"))
    boards = forms.ModelMultipleChoiceField(Board.objects.all(), required=True)

    def __init__(self, *args, **kwargs):
        super(UserChangeForm, self).__init__(*args, **kwargs)
        if self.instance.pk:
            # if this is not a new object, we load related books
            self.initial['boards'] = self.instance.boards.values_list('pk', flat=True)

    def save(self, *args, **kwargs):
        instance = super(UserChangeForm, self).save(*args, **kwargs)
        if instance.pk:
            for board in instance.boards.all():
                if board not in self.cleaned_data['boards']:
                    # we remove books which have been unselected
                    instance.boards.remove(board)
            for board in self.cleaned_data['boards']:
                if board not in instance.boards.all():
                    # we add newly selected books
                    instance.boards.add(board)
        return instance

    class Meta:
        model = User
        fields = (
            'email', 'password', 'first_name', 'last_name', 'patronymic', 'is_admin', 'boards',)

    def clean_password(self):
        return self.initial["password"]


class EmailNotificationInline(admin.StackedInline):
    model = EmailNotification
    verbose_name_plural = u'Email уведомления'


class MyUserAdmin(UserAdmin):
    """Отображение всех пользователей"""
    form = UserChangeForm
    add_form = UserCreationForm

    # Данные поля отображаются в списке пользователей
    list_display = ('email', 'is_admin')
    # По данным полям возможна фильтрация
    list_filter = ('is_admin',)
    #
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        (u'Административная часть', {'fields': ('is_admin',)}),
        (u'Профиль', {'fields': ('first_name', 'last_name', 'patronymic', 'avatar')}),
        (u'Доски', {'fields': ('boards',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    inlines = (EmailNotificationInline, )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

# Регистрируем созданные формы
admin.site.register(User, MyUserAdmin)
# Так как мы не используем встроенные Django разрешения, то наоборот, отсоединим их
admin.site.unregister(Group)