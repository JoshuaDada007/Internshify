from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_user),
    path("new_blog", views.create_blog),
    path("get_blogs", views.view_blogs),
    path("update_blog/<int:pk>", views.update_blog),
    path("delete_blog/<int:pk>", views.delete_blog),
    path("update_user", views.update_user),
    path("all_internships", views.all_internships)
]
