from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import UserRegisterationData, BlogSerializerData, UpdateUserSerializer, InternshipSerializer, LikeSerializer
from .models import Blog, Internship, Likes


# for registering users
@api_view(["POST"])
def register_user(request):
    serializer = UserRegisterationData(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UpdateUserSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_blog(request):
    user = request.user
    serializer = BlogSerializerData(data=request.data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializerData(blog)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializerData(blogs, many=True)
    return Response(serializer.data)


# Create your views here.

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    user = request.user
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializerData(blog, data=request.data)
    if blog.author != user:
        return Response({"error": "This is not your blog gang :("}, status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_likes(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializerData(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    user = request.user
    blog = Blog.objects.get(id=pk)
    if blog.author != user:
        return Response({"error": "Cannot delete this post fuck nigga"})
    blog.delete()
    return Response({"message": "blog deleted successfully"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serializer = UpdateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def all_internships(request):
    internships = Internship.objects.all()
    serializer = InternshipSerializer(internships, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def likes_update(request, pk):
    user = request.user
    blog = Blog.objects.get(id=pk)
    existing_like = Likes.objects.filter(liked_user=user,liked_blog=blog).first()
    if existing_like:
        if blog.likes_count == 0:
            blog.likes_count = 0
        else:
            blog.likes_count -= 1
        existing_like.delete()
        prev_serializer = BlogSerializerData(blog)
        blog.save()
        return Response(prev_serializer.data, status.HTTP_200_OK)
    else:
        Likes.objects.create(liked_user=user, liked_blog=blog)
        blog.likes_count += 1
        serializer = BlogSerializerData(blog)
        blog.save()
        return Response(serializer.data, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_likes(request):
    user = request.user
    likes = Likes.objects.filter(liked_user=user)
    serializer = LikeSerializer(likes, many=True)

    return Response(serializer.data, status.HTTP_200_OK)





