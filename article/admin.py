from django.contrib import admin
from article.models import Article, TableOfContents

# Register your models here.
admin.site.register(TableOfContents)
admin.site.register(Article)
