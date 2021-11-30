from django.shortcuts import render
from .models import Room
from .serializer import RoomSerializer
from rest_framework import generics


class RoomView(generics.CreateAPIView):
    query_set = Room.objects.all()
    serializer_class = RoomSerializer
