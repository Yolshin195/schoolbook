from django.conf.urls import url
from django.contrib import admin
from home.views import home, metadata
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

admin.autodiscover()

urlpatterns = [
        url(r'^(?P<metadata_name>\w+)/$', metadata), # то есть по URL http://имя_сайта/blog/ 
        url(r'^', home), # то есть по URL http://имя_сайта/blog/ 
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns() + static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
