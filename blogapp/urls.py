from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("register", views.register_user),
    path("new_blog", views.create_blog),
    path("all_blogs", views.all_blogs),
    path("update_blog/<int:pk>", views.update_blog),
    path("delete_blog/<int:pk>", views.delete_blog),
    path("update_likes/<int:pk>", views.update_likes),
    path("update_user", views.update_user),
    path("all_internships", views.all_internships),
    path("all_internships_test", views.all_internships_test),
    path("get_user", views.get_user),
    path("get_blog/<int:pk>", views.get_blog),
    path("liked_blog/<int:pk>", views.likes_update),
    path("get_likes", views.get_likes),
    # path("forgotPassword", auth_views.PasswordResetView)

]
