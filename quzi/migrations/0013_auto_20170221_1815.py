# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-21 18:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quzi', '0012_questionlist_question_list_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionlist',
            name='question_list_image',
            field=models.ImageField(blank=True, help_text='140x140px', upload_to='quzi', verbose_name='Ссылка картинки'),
        ),
    ]
