from django.shortcuts import render
from django.views.generic import ListView, DetailView
from quzi.models import QuestionList, Question, Answer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response

# Create your views here.
class QuziListView(ListView): # представление в виде списка
    template_name = "quzi_list.html"
    model = QuestionList                   # модель для представления 

def question_list(request, pk):
    question_list = Question.objects.filter(question_question_list=pk)
    paginator = Paginator(question_list, 1) # Show 25 contacts per page

    page = request.GET.get('page')
    try:
        question = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        question = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        question = paginator.page(paginator.num_pages)

    return render_to_response('quzi.html', {"question": question})
