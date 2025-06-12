from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils.text import slugify
from django.utils import timezone


# Create your models here
class CustomUser(AbstractUser):
    bio = models.TextField(null=True)
    linkedin = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.username


class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(null=True)
    slug = models.SlugField(unique=True, null=True)
    is_draft = models.BooleanField(default=True)
    image = models.ImageField(upload_to="img/", null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="blogs", null=True)
    published_at = models.DateTimeField(auto_now=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        base_slug = slugify(self.title)
        slug = base_slug
        num = 1
        while Blog.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        self.slug = slug

        if not self.is_draft and self.published_at is None:
            self.published_at = timezone.now()

        super().save(*args, **kwargs)


class Internship(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    date_posted = models.CharField(null=True, max_length=255)
    season = models.CharField(null=True, max_length=255)

    requirement = models.JSONField(null=True, default=list)
    responsibility = models.JSONField(null=True, default=list)
    category = models.JSONField(null=True, default=list)
    skill = models.JSONField(null=True, default=list)
    created_at = models.DateTimeField(null=True, auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
