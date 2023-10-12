from django.contrib import admin
from django.urls import path

from bot.views import recognize_speech, homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recognize-speech/',recognize_speech,name="recognize-speech"),
    path('', homepage),

]
