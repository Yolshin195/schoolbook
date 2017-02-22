import PIL
from django.db import models
from PIL import Image

class News(models.Model):
    def image_img(self):
        if self.news_image:
            return u'<a href="{0}" target="_blank"><img src="{0}" width="100"/></a>'.format(self.news_image.url)
        else:
            return '(Нет изображения)'
    image_img.short_description = 'Картинка'
    image_img.allow_tags = True

    news_title = models.CharField(max_length = 200)
    news_content = models.TextField()
    news_date = models.DateTimeField(auto_now=True)
    news_image = models.ImageField(
        blank=True, 
        upload_to='', 
        help_text='900x500px', 
        verbose_name='Ссылка картинки'
    )
