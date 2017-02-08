from django.shortcuts import render
from django.views.generic import ListView, DetailView
from article.models import TableOfContents, Article

# Create your views here.

class PostsListView(ListView): # представление в виде списка
    template_name = "tableofcontents.html"
    model = TableOfContents                   # модель для представления 

class ArticleListView(ListView): # представление в виде списка
    template_name = "articles.html"

    def get_queryset(self):
        return Article.objects.filter(article_tableofcontent_id=self.kwargs['pk'])                   # модель для представления 

class ArticleDetailView(DetailView): # детализированное представление модели
    template_name = "article.html"
    model = Article 
