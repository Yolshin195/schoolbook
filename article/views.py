from django.shortcuts import render
from django.views.generic import ListView, DetailView
from article.models import TableOfContents, Article

# Create your views here.

class PostsListView(ListView): # представление в виде списка
    model = TableOfContents                   # модель для представления 

class ArticleListView(ListView): # представление в виде списка
    model = Article                   # модель для представления 

class ArticleDetailView(DetailView): # детализированное представление модели
    model = Article 
