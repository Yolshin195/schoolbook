from django.contrib import admin
from home.models import Slaider
# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['image', 'image_img']
    readonly_fields = ['image_img',]
    fields = ['image', 'image_img']

admin.site.register(Slaider, QuestionAdmin)
