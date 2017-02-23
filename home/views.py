from django.shortcuts import render
from django.shortcuts import render_to_response
from home.models import News
from quzi.models import QuestionList
from article.models import Article

# Create your views here.
def home(request):
    news = []
    for post in News.objects.order_by('-id'):
        if len(news) < 3:
            news.append(post)
    quzi = []
    for post in QuestionList.objects.order_by('-id'):
        if len(quzi) < 3:
            quzi.append(post)
    article = [] 
    for post in Article.objects.order_by('-id'):
        if len(article) < 3:
            article.append(post)
    return render_to_response("home.html", {
            "news": news,
            "quzi": quzi,
            "article": article
        }
    )
