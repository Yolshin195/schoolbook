from django.db import models
from article.models import Article, TableOfContents

# Create your models here.
class QuestionList(models.Model):
    class Meta:
        db_table = 'question_list'


    question_list_title = models.CharField(max_length = 200, verbose_name="Название теста")
    question_list_content = models.CharField(max_length = 500, verbose_name="Описание теста")

    def __unicode__(self):
        return self.question_list_title


    def __str__(self):
        return self.question_list_title

    def get_absolute_url(self):
        return "/quzi/question/%i/" % self.id


class Question(models.Model):   
    class Meta:
        db_table = 'question'


    question_question_list = models.ForeignKey(QuestionList)
    question_content = models.TextField(verbose_name="Текст вопроса")

    def __unicode__(self):
        return self.question_content

    
    def __str__(self):
        return self.question_content


class Answer(models.Model):   
    class Meta:
        db_table = 'answer'


    answer_question = models.ForeignKey(Question)
    ansver_content = models.TextField(verbose_name="Текст ответа")
    ansver_boolean = models.BooleanField(default=False, verbose_name="Верный ответ") 

    def __unicode__(self):
        return self.question_title
