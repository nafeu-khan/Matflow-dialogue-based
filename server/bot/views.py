import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import speech_recognition as sr
from django.views.decorators.csrf import csrf_exempt
from numpy import size
from rest_framework.decorators import api_view
import spacy
def homepage(request):
    return  render(request,"home.html") #"""HttpResponse("hello")"""



# Load the English NLP model
nlp = spacy.load("en_core_web_sm")

@api_view(['POST'])
@csrf_exempt
def recognize_speech(req):
    data = json.loads(req.body)
    user_input = data.get('text', '')  # Get the text from the request data
    print("Received input:", user_input)
    doc = nlp(user_input)
    keywords = [token.text for token in doc if token.pos_ in ['VERB', 'NOUN']]  # Extract verbs and nouns as keywords

    if keywords:
        # Perform specific tasks based on extracted keywords
        # You can add your logic here to handle different keywords and perform corresponding actions
        print(keywords)
        # For example, if 'search' is a keyword, perform a search operation
        # Assuming keywords is a string separated by spaces
        # keywords = user_input.split()
        if 'show' in keywords and 'data' in keywords and 'set' in keywords:
            # Both 'show', 'data', and 'set' are in the input string
            # Perform the corresponding logic here
            response_text = "Performing a show dataset operation based on the user's input."


        # If 'calculate' is a keyword, perform a calculation operation
        elif 'calculate' in keywords:
            # Perform calculation logic here
            response_text = "Performing a calculation based on the user's input."

        else:
            # Handle other keywords or provide a default response
            response_text = "I didn't understand the user's request."

        return JsonResponse({"text": response_text})

    else:
        return JsonResponse({"text": "No valid keywords found in the user's input."})
