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
    news_content = models.TextField(blank=True)
    news_date = models.DateTimeField(auto_now=True)
    news_image = models.ImageField(
        blank = True, 
        upload_to = '', 
        help_text = '900x500px', 
        verbose_name = 'Ссылка картинки'
    )

class Metadata(models.Model):
    metadata_name = models.CharField(
        max_length = 200,
        help_text = 'Название страницы', 
        verbose_name = 'Имя страницы'
    )
    metadata_title = models.CharField(
        blank = True,
        max_length = 200,
        help_text = 'Заголовок страницы', 
        verbose_name = 'Заголовок'
    )
    metadata_content = models.TextField(
        blank = True,
        help_text = 'Основной текст', 
        verbose_name = 'Контент'
    )
    
    def get_absolute_url(self):
        return "/%s/" % self.metadata_name
