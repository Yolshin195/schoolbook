from django.db import models
#from quzi.models import QuestionList

# Create your models here.

class TableOfContents(models.Model):
    class Meta:
        db_table = "fableofcontents"
        
    table_title = models.CharField(max_length = 200)

    def __unicode__(self):
        return self.table_title

    def __str__(self):
        return self.table_title

    def get_absolute_url(self):
        return "/articles/%i/" % self.id


class Article(models.Model):   
    class Meta:
        db_table = "article"   
    
    """
    quzi_url_list = [] 
    for objects in QuestionList.objects.all(): 
        quzi_url_list.append((
            objects.get_absolute_url(),
            objects.question_list_title,
        ))

    article_quzi_url = models.CharField(max_length=200, blank=True,
                                      choices=quzi_url_list,
                                      default=False)
    """
    article_tableofcontent = models.ForeignKey(TableOfContents)
    article_title = models.CharField(max_length = 200)
    article_content = models.TextField()
    article_date = models.DateTimeField()

    def __unicode__(self):
        return self.article_title

    def __str__(self):
        return self.article_title

    def get_absolute_url(self):
        return "/articles/article/%i/" % self.id
