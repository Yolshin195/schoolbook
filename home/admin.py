from django.contrib import admin
from home.models import News, Metadata 
# Register your models here.

class NewsAdmin(admin.ModelAdmin):
    list_display = ['news_title', 'news_image', 'image_img']
    readonly_fields = ['image_img',]
    fields = ['news_title', 'news_content', 'news_image', 'image_img']

class MetadataAdmin(admin.ModelAdmin):
    list_display = [
        'metadata_url',
        'metadata_name',
        'metadata_title',
        'metadata_content',
        'metadata_date',
        'metadata_boolean',
        'image_img',
    ]
    fields = [
        'metadata_url',
        'metadata_name',
        'metadata_title',
        'metadata_content',
        'metadata_boolean',
        'metadata_image',
    ]

    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )

admin.site.register(News, NewsAdmin)
admin.site.register(Metadata, MetadataAdmin)

