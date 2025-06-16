from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_user),
    path("new_blog", views.create_blog),
    path("all_blogs", views.all_blogs),
    path("update_blog/<int:pk>", views.update_blog),
    path("delete_blog/<int:pk>", views.delete_blog),
    path("update_likes/<int:pk>", views.update_likes),
    path("update_user", views.update_user),
    path("all_internships", views.all_internships),
    path("get_user", views.get_user),
    path("get_blog/<int:pk>", views.get_blog)
]
