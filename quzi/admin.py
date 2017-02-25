from django.contrib import admin
from quzi.models import QuestionList, Question, Answer, Comments

# Register your models here.
class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1

class AnswerInlone(admin.StackedInline):
    model = Answer
    extra = 4

class QuestionAdmin(admin.ModelAdmin):
    list_display = [
        'question_question_list',
        'question_content',
    ]
    foelss = ['question_content']
    list_filter = ['question_question_list']
    inlines = [AnswerInlone]

    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )


class QuestionListAdmin(admin.ModelAdmin):
    list_display = ('question_list_title',)
    fields = ['question_list_title', 'question_list_content', "question_list_article_url", "question_list_image"]
    # list_filter = ['article_date']

class AnswerCSS(admin.ModelAdmin):
    list_display = [
        'ansver_boolean',
        'ansver_content',
        'answer_question',
    ]
    foelss = [
        'ansver_content',
        'ansver_boolean',
    ]
    list_filter = ['answer_question']
    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )

class CommentsListAdmin(admin.ModelAdmin):
    list_display = ('procent',)

    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )

admin.site.register(QuestionList, QuestionListAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerCSS)
admin.site.register(Comments, CommentsListAdmin)
