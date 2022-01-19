from django.urls import path
from .views import AllRoomViews, CreateRoomView, GetCSRFToken, GetRoom, JoinRoom, RoomView, GetRoom

urlpatterns = [
    path('', RoomView.as_view()),
    path('allrooms/', AllRoomViews.as_view()),
    path('create-room/', CreateRoomView.as_view()),
    path('getcsrf/', GetCSRFToken.as_view()),
    path('join/', JoinRoom.as_view()),
    path('get-room/', GetRoom.as_view()),

]