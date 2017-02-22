from django.shortcuts import render
from django.shortcuts import render_to_response
from home.models import Slaider
from quzi.models import QuestionList
from article.models import Article

# Create your views here.
def home(request):
    quzi = []
    for post in QuestionList.objects.order_by('-id'):
        if len(quzi) <= 3:
            quzi.append(post)
    article = [] 
    for post in Article.objects.order_by('-id'):
        if len(article) <= 3:
            article.append(post)
    img = Slaider.objects.get(id=15)
    return render_to_response("home.html", {
            "img": img,
            "quzi": quzi,
            "article": article
        }
    )
