# coding=utf-8
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from swampdragon.models import SelfPublishModel

from notification.models import EmailNotification
from user import router_serializers


class UserManager(BaseUserManager):
    # Функция, вызываемая при создании пользователя
    def create_user(self, email, status=False, password=None):
        # Проверяем наличие email
        if not email:
            raise ValueError('Users must have an email address')
        # Нормализуем email, то есть приводим его к каноническому виду (все буквы строчные)
        user = self.model(
            email=self.normalize_email(email), status=status
        )
        # Устанавливаем пароль
        user.set_password(password)
        # Сохраняем пользователя
        user.save()
        EmailNotification.create(user=user)
        return user

    def create_superuser(self, email, password):
        # Создаем администратора
        user = self.create_user(email, status=True, password=password)
        user.is_admin = True
        user.save()
        return user


class User(SelfPublishModel, AbstractBaseUser):
    # Отображение в админке
    class Meta:
        verbose_name = u'пользователь'
        verbose_name_plural = u'Пользователи'

    serializer_class = router_serializers.UserRouterSerializer

    email = models.EmailField(
        verbose_name=u'Email',
        max_length=255,
        unique=True,
    )

    # Имя
    first_name = models.CharField(max_length=15, verbose_name=u"Имя", blank=True)

    # Фамилия
    last_name = models.CharField(max_length=30, verbose_name=u"Фамилия", blank=True)

    # Отчество
    patronymic = models.CharField(max_length=20, verbose_name=u"Отчество", blank=True)

    # Аватар
    avatar = models.ImageField(verbose_name=u'Аватар', blank=True, upload_to='avatars')

    # Значение имени и почты, которое мы используем для отображения, является свойством
    @property
    def name_and_email(self):
        name_and_email = u''
        if self.first_name:
            name_and_email += (self.first_name + u' ')
        if self.last_name:
            name_and_email += (self.last_name + u' ')
        if self.patronymic:
            name_and_email += (self.patronymic + u' - ')
        name_and_email += self.email
        return name_and_email

    @property
    def fullname(self):
        fullname_ = u''
        if self.first_name:
            fullname_ += (self.first_name + u' ')
        if self.last_name:
            fullname_ += (self.last_name + u'')
        return fullname_

    @property
    def initials(self):
        initials_ = u''
        if self.first_name and self.last_name:
            initials_ += (self.first_name.capitalize()[0] + self.last_name.capitalize()[0])
        else:
            initials_ += (self.email.capitalize()[0])
            print initials_
        return initials_

    # В случае, если переменная True, пользователь может является администратором
    is_admin = models.BooleanField(default=False, verbose_name=u'Админ')

    # Используем созданный нами UserManager для получения доступа к таким методам как create_user и т.д.
    objects = UserManager()

    # Указываем email в качестве логина пользователя
    USERNAME_FIELD = 'email'

    # Строковое представление модели
    def __unicode__(self):
        return self.email

    # Данные методы требуются для админки django
    # Имеет ли пользователь доступ к административной части
    @property
    def is_staff(self):
        return self.is_admin

    # Имеет ли пользователь определенные права доступа
    def has_perm(self, perm, obj=None):
        # Так как данный метод вызывается после метода is_staff,
        # укажем для простоты, что имеет, независимо от требуемого разрешения
        return True

    # Имеет ли пользователь доступ к приложению `app_label`?
    def has_module_perms(self, app_label):
        # Возвращаем True, иначе указываем свои собственные условия
        return True

    # Админка django требует, чтобы модель пользователя имела данные методы
    def get_full_name(self):
        return self.name_and_email

    def get_short_name(self):
        return self.name_and_email