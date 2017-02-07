from django.db import models

# Create your models here.
class TableOfContents(models.Model):
    table_title = models.CharField(max_length = 200)


class Article(models.Model):   
    class Meta:
        db_table = "article"   
    
    article_tableofcontent = models.ForeignKey(TableOfContents)
    article_title = models.CharField(max_length = 200)
    article_taxt = models.TextField()
    article_date = models.DateTimeField()
