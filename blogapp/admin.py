from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Blog, Internship


class CustomUserAdmin(UserAdmin):
    list_display = ("username", "first_name", "last_name", "email")


admin.site.register(CustomUser, CustomUserAdmin)


class BlogAdmin(admin.ModelAdmin):
    list_display = ["title", "content", "slug", "author", "is_draft", "created_at", "published_at"]


admin.site.register(Blog, BlogAdmin)


# Register your models here.

class InternshipAdmin(admin.ModelAdmin):
    list_display = ("name", "link", "location", "role", "skill", "category", "season", "requirement", "responsibility", "date_posted")


admin.site.register(Internship, InternshipAdmin)
