import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import speech_recognition as sr
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


# Create your views here.
def homepage(request):
    return  render(request,"home.html") #"""HttpResponse("hello")"""

@api_view(['GET','POST'])
@csrf_exempt
def recognize_speech(req):
    data=json.loads(req.body)
    print("in views",data)
    return JsonResponse({"text":f"I am response to '{data['text']} ' "})
    # if request.method == 'POST' and 'audio' in request.FILES:
    #     audio_file = request.FILES['audio']
    #     recognizer = sr.Recognizer()
    #     try:
    #         with sr.AudioFile(audio_file) as source:
    #             audio_data = recognizer.record(source)
    #             text = recognizer.recognize_google(audio_data)
    #             print(text)
    #             return JsonResponse({'text': text})
    #     except sr.UnknownValueError:
    #         return JsonResponse({'error': 'Speech Recognition could not understand the audio'})
    #     except sr.RequestError as e:
    #         return JsonResponse({'error': f'Speech Recognition request failed; {e}'})
    # else:
    #     return JsonResponse({'error': 'Invalid request'})
