from django.conf.urls import url
from django.contrib import admin
from quzi.views import QuziListView, question_list, answer

admin.autodiscover()

urlpatterns = [
    url(r'^answer/(?P<pk>\d+)/$', answer),
    url(r'^question/(?P<pk>\d+)/$', question_list), # а по URL http://имя_сайта/blog/число/ 
    url(r'^', QuziListView.as_view(), name="quzi"), # то есть по URL http://имя_сайта/blog/ 
]
