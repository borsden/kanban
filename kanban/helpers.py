# coding=utf-8
import base64
import os
import uuid
from django.core.files.base import ContentFile
from django.utils.deconstruct import deconstructible


class Base64Image(object):
    def __init__(self, image_base64):
        self.image_base64 = image_base64


    def get_raw_image(self, user_id=0):
        if isinstance(self.image_base64, basestring) and self.image_base64.startswith('data:image'):
            # формат ~= data:image/X,
            format, imgstr = self.image_base64.split(';base64,')
            #  получаем расширение файла
            ext = format.split('/')[-1]
            # Название изображения будет случайным именем
            name = unicode(uuid.uuid4()) + '.' + ext
            # Преобразуем в изображение
            return ContentFile(base64.b64decode(imgstr), name=name)
            # Преобразуем в изображение со случайным именем
            # return ContentFile(base64.b64decode(imgstr), name=unicode(uuid.uuid4()) + '.' + ext)