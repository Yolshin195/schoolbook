# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-23 16:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20170223_0818'),
    ]

    operations = [
        migrations.CreateModel(
            name='metadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metadata_name', models.CharField(help_text='Название страницы', max_length=200, verbose_name='Имя страницы')),
                ('metadata_title', models.CharField(help_text='Заголовок страницы', max_length=200, verbose_name='Заголовок')),
                ('metadata_content', models.TextField(blank=True, help_text='Основной текст', verbose_name='Контент')),
            ],
        ),
    ]
