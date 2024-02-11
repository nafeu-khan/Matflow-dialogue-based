import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import spacy
def homepage(request):
    return  render(request,"home.html") #"""HttpResponse("hello")"""

# import en_core_web_sm
# nlp = en_core_web_sm.load()


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
        response_text=""
        if ('Show' in keywords or 'show' in keywords) and 'data' in keywords and 'set' in keywords:
            csvdata=data.get('csvNames')
            print(csvdata)
            if(len(csvdata)):
                response_text = {"message":"Select dataset to see","action":"DatasetDisplay"}
            else:
                response_text={"message":"Please uplaod a dataset","action":""}
        return JsonResponse({"text": response_text["message"], "action":response_text["action"]})
    else:
        return JsonResponse({"text": "No valid keywords found in the user's input."})
