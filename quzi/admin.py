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
    foelss = ['question_content']
    inlines = [AnswerInlone]

    class Media:
        js = (
            '/static/js/tinymce/tinymce.min.js',
            '/static/js/tinymce/tinymce.init.js',
        )


class QuestionListAdmin(admin.ModelAdmin):
    list_display = ('question_list_title',)
    fields = ['question_list_title', 'question_list_content', "question_list_article_url"]
    # list_filter = ['article_date']

class AnswerCSS(admin.ModelAdmin):
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
