# Generated by Django 3.1 on 2020-08-25 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0017_auto_20200825_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='locale',
            field=models.CharField(default=models.CharField(max_length=255), max_length=256),
        ),
        migrations.AlterField(
            model_name='document',
            name='document',
            field=models.FileField(upload_to=models.CharField(default=models.CharField(max_length=255), max_length=256)),
        ),
    ]
