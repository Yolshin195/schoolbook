import PIL
from django.db import models
from PIL import Image

class Slaider(models.Model):
    def image_img(self):
        if self.image:
            return u'<a href="{0}" target="_blank"><img src="{0}" width="100"/></a>'.format(self.image.url)
        else:
            return '(Нет изображения)'
    image_img.short_description = 'Картинка'
    image_img.allow_tags = True

    image = models.ImageField(
        blank=True, 
        upload_to='', 
        help_text='500x500px', 
        verbose_name='Ссылка картинки'
    )
