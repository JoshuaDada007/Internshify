from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog, Internship, Likes


class UserRegisterationData(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "password", "first_name", "last_name", "email"]
        kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        username = validated_data["username"]
        password = validated_data["password"]
        email = validated_data["email"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]

        user = get_user_model()
        new_user = user.objects.create(username=username, email=email, first_name=first_name, last_name=last_name)
        new_user.set_password(password)
        new_user.save()
        return new_user


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "bio", "linkedin", "email"]


class SimpleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


class BlogSerializerData(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)

    class Meta:
        model = Blog
        fields = ["id", "title", "content", "slug", "author", "published_at", "likes_count"]


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:

        model = Internship
        fields = "__all__"

class SimpleBlogSerializer(serializers.ModelSerializer):
    model = Blog
    fields = "__all__"

class LikeSerializer(serializers.ModelSerializer):
    blog = SimpleBlogSerializer(read_only=True)
    user = SimpleAuthorSerializer(read_only=True)
    class Meta:
        model = Likes
        fields = "__all__"
