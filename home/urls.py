from django.conf.urls import url
from django.contrib import admin
from home.views import home 

admin.autodiscover()

urlpatterns = [
        url(r'^', home), # то есть по URL http://имя_сайта/blog/ 
]
