# Generated by Django 4.2.23 on 2025-06-28 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogapp", "0012_remove_blog_likes_remove_likes_is_liked_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="likes",
            name="likes_count",
        ),
        migrations.AddField(
            model_name="blog",
            name="likes_count",
            field=models.IntegerField(default=0),
        ),
    ]
