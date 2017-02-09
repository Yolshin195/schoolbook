from django.contrib import admin
from article.models import Article, TableOfContents

class CollectionAdmin(admin.ModelAdmin):
 
    # .. какие-то настройки отображения
 
    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )
# Register your models here.
admin.site.register(TableOfContents)
admin.site.register(Article, CollectionAdmin)
