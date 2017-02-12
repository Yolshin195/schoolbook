from django.conf.urls import url
from django.contrib import admin
from quzi.views import QuziListView, question_list

admin.autodiscover()

urlpatterns = [
    url(r'^question/(?P<pk>\d+)/$', question_list), # а по URL http://имя_сайта/blog/число/ 
    url(r'^question/(?P<pk>\d+)/page/(?P<page>\d+)/$', question_list),
    url(r'^', QuziListView.as_view(), name="quzi"), # то есть по URL http://имя_сайта/blog/ 
]
