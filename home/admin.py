from django.contrib import admin
from home.models import News 
# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['news_title', 'news_image', 'image_img']
    readonly_fields = ['image_img',]
    fields = ['news_title', 'news_content', 'news_image', 'image_img']

admin.site.register(News, QuestionAdmin)
