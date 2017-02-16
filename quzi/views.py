from django.shortcuts import render
from django.views.generic import ListView, DetailView
from quzi.models import QuestionList, Question, Answer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.core import serializers
import json

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


def answer(request, pk):
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(serializers.serialize("json",
        Answer.objects.filter(answer_question_id=pk) 
    ))
    return response

def testJS(request, pk):
    question_list = []
    """ { "question_1d": 1, 'question_content': '', 'answer':[]  #{"id": 0, "content": "", "value": ""} } """
    question = Question.objects.filter(question_question_list=pk)
    for number, quest in enumerate(question):
        dic = {
                "number": number,
                "question_id": quest.id,
                "question_content": quest.question_content,
                "answer" : []
        }
        question_list.append(dic)
        for answ in Answer.objects.filter(answer_question_id=quest.id):
            answer1 = {
                "ansver_id": answ.id,
                "ansver_content": answ.ansver_content,
                "ansver_boolean": answ.ansver_boolean,
            }
            question_list[number]["answer"].append(answer1)
    content = json.dumps(question_list)
    response = HttpResponse()
    response['Content-Type'] = "text/javascript"
    response.write(
        content
    )
    return response

def test(request, pk):
    titl = QuestionList.objects.get(id=pk)
    return render_to_response('answer.html', {"titl": titl})
