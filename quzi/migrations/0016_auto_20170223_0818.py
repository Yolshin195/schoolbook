# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-23 08:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quzi', '0015_questionlist_question_list_article_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionlist',
            name='question_list_article_url',
            field=models.CharField(blank=True, choices=[('/articles/article/1/', 'Тема №1'), ('/articles/article/2/', 'Основы физики'), ('/articles/article/3/', 'dfgfdg'), ('/articles/article/4/', 'Чёткая физика'), ('/articles/article/5/', 'Чёткая физика часть 2')], default=False, max_length=200),
        ),
    ]
