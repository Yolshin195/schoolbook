# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-21 18:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quzi', '0011_auto_20170221_0933'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionlist',
            name='question_list_image',
            field=models.ImageField(blank=True, help_text='140x140px', upload_to='', verbose_name='Ссылка картинки'),
        ),
    ]
