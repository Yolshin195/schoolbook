from django.db import models

# Create your models here.

class TableOfContents(models.Model):
    class Meta:
        db_table = "fableofcontents"
        
    table_title = models.CharField(max_length = 200)

    def __unicode__(self):
        return self.table_title

    def get_absolute_url(self):
        return "/articles/%i/" % self.id
    


class Article(models.Model):   
    class Meta:
        db_table = "article"   
    
    article_tableofcontent = models.ForeignKey(TableOfContents)
    article_title = models.CharField(max_length = 200)
    article_taxt = models.TextField()
    article_date = models.DateTimeField()

    def __unicode__(self):
        return self.article_title

    def get_absolute_url(self):
        return "/article/%i/" % self.id
