from django.conf.urls import url
from django.contrib import admin
from quzi.views import QuziListView, answer, testJS, test, comments

admin.autodiscover()

urlpatterns = [
    url(r'^test/$', test),
    url(r'^testJS/(?P<pk>\d+)/$', testJS),
    url(r'^comments/(?P<pk>\d+)/$', comments),
    url(r'^answer/(?P<pk>\d+)/$', answer),
    url(r'^question/(?P<pk>\d+)/$', test), # а по URL http://имя_сайта/blog/число/ 
    url(r'^', QuziListView.as_view(), name="quzi"), # то есть по URL http://имя_сайта/blog/ 
]
