from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls import url, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns = [
        # CSRF Exempt for convenience during development
    url(r'graphql$', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    ] + urlpatterns
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
