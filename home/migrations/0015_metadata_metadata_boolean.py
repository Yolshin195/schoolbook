# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-24 23:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_auto_20170224_2138'),
    ]

    operations = [
        migrations.AddField(
            model_name='metadata',
            name='metadata_boolean',
            field=models.BooleanField(default=True, help_text='отображать страницу', verbose_name='Отображать'),
        ),
    ]