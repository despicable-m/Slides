# Generated by Django 3.1 on 2020-08-25 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0018_auto_20200825_2148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='locale',
        ),
        migrations.AlterField(
            model_name='document',
            name='document',
            field=models.FileField(upload_to=models.CharField(max_length=255)),
        ),
    ]
