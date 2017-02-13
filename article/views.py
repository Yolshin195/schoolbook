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

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(ArticleListView, self).get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['TableOfContents'] = TableOfContents.objects.get(id=self.kwargs['pk'])
        return context

class ArticleDetailView(DetailView): # детализированное представление модели
    template_name = "article.html"
    model = Article 
