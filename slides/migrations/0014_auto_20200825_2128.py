# Generated by Django 3.1 on 2020-08-25 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0013_auto_20200825_2054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='document',
            field=models.FileField(upload_to='<django.db.models.fields.CharField>'),
        ),
    ]
