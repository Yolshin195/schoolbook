from django.shortcuts import render
from django.shortcuts import render_to_response, redirect
from home.models import News, Metadata
from quzi.models import QuestionList
from article.models import Article
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.core import serializers
import json

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
    combobox = []
    for element in Metadata.objects.all():
        if element.metadata_boolean:
            combobox.append(element)
    return render_to_response("home.html", {
            "news": news,
            "quzi": quzi,
            "article": article,
            "combobox": combobox,
        }
    )


def metadata(request, metadata_name):
    try:
        content = Metadata.objects.get(metadata_url=metadata_name)
    except ObjectDoesNotExist:
        return redirect('/')
    return render_to_response("metadata.html", {"post": content})

def combobox(request):
    data = []
    for element in Metadata.objects.all():
        if element.metadata_boolean:
            data.append(element)

    #формируем json запрос
    """
    content = json.dumps({"combobox": data})
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(
        content
    )
    return response
    """
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(serializers.serialize("json",
        data 
    ))  
    return response
