# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-07 16:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_title', models.CharField(max_length=200)),
                ('article_taxt', models.TextField()),
                ('article_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'article',
            },
        ),
        migrations.CreateModel(
            name='TableOfContents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_title', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'fableofcontents',
            },
        ),
        migrations.AddField(
            model_name='article',
            name='article_tableofcontent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='article.TableOfContents'),
        ),
    ]
