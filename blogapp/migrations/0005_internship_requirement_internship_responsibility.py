# Generated by Django 4.2.21 on 2025-06-02 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0004_internship'),
    ]

    operations = [
        migrations.AddField(
            model_name='internship',
            name='requirement',
            field=models.JSONField(null=True),
        ),
        migrations.AddField(
            model_name='internship',
            name='responsibility',
            field=models.JSONField(null=True),
        ),
    ]
