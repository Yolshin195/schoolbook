from django.conf.urls import url
from django.contrib import admin
from article.views import PostsListView, ArticleListView, ArticleDetailView

admin.autodiscover()

urlpatterns = [
    url(r'^', PostsListView.as_view(), name='list'), # то есть по URL http://имя_сайта/blog/ 
    url(r'^articles/(?P<pk>\d+)/$', ArticleListView.as_view(), name='list1'), # то есть по URL http://имя_сайта/blog/ 
    # будет выводиться список постов
    url(r'^article/(?P<pk>\d+)/$', ArticleDetailView.as_view()), # а по URL http://имя_сайта/blog/число/ 
]
