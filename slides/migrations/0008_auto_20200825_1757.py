# Generated by Django 3.1 on 2020-08-25 17:57

from django.db import migrations, models
import django.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0007_auto_20200825_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='document',
            field=models.FileField(upload_to=django.db.models.fields.Field.get_attname),
        ),
    ]
