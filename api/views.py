from django.shortcuts import render
from rest_framework import response
from .models import Room
from rest_framework import generics, serializers, status
from .serializer import CreateRoomSerializer, RoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class RoomView(generics.CreateAPIView):
    query_set = Room.objects.all()
    serializer_class = RoomSerializer

class AllRoomViews(APIView):

    def get(self, request, format=None):
        query_set = Room.objects.all()
        serializer = RoomSerializer(query_set, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                guest_can_pause = serializer.data.get('guest_can_pause')
                votes_to_skip = serializer.data.get('votes_to_skip')
                host = self.request.session.session_key
                queryset = Room.objects.filter(host=host)
                if queryset.exists():
                    room = queryset[0]
                    room.guest_can_pause = guest_can_pause
                    room.votes_to_skip = votes_to_skip
                    self.request.session['room_code'] = room.code
                    room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                    return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                else:
                    room = Room(host=host, guest_can_pause=guest_can_pause,
                                votes_to_skip=votes_to_skip)
                    room.save()
                    self.request.session['room_code'] = room.code
                    return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'status':'Already in a room'})

class GetCSRFToken(APIView):

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

            code = request.data.get(self.lookup_url_kwarg)
            if code != None:
                room_result = Room.objects.filter(code=code)
                if len(room_result) > 0:
                    room = room_result[0]
                    self.request.session['room_code'] = code
                    return Response({'message':'Room joined'}, status=status.HTTP_200_OK)
                return Response({'Bad Request':'Room Code invalid'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'Bad Request':'Room Code invalid'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request':'Already host'}, status=status.HTTP_400_BAD_REQUEST)


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.GET.get(self.lookup_url_kwarg)
        if ( code ) != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found':'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request':'Code Parameter Not found in Request'}, status=status.HTTP_400_BAD_REQUEST)
