# Generated by Django 3.1 on 2020-08-25 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0004_auto_20200825_1643'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='location_value',
            field=models.CharField(default='abednego', max_length=256),
        ),
    ]
