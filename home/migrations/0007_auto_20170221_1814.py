# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-21 18:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20170221_1119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slaider',
            name='image',
            field=models.ImageField(blank=True, help_text='500x500px', upload_to='', verbose_name='Ссылка картинки'),
        ),
    ]
