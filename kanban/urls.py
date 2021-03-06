"""kanban URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, patterns, include
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from kanban import settings

admin.autodiscover()
urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('card.urls')),
    url(r'^api/v1/', include('column.urls')),
    url(r'^api/v1/', include('board.urls')),
    url(r'^api/v1/', include('user.urls')),
    url(r'^api/v1/', include('colleague.urls')),
    url(r'^api/v1/', include('notification.urls')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)