"""urls for slides"""
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("upload", views.upload, name="upload"),
    path("data_get", views.data_get, name="data_get"),
    path("fetch/<info>", views.fetch, name="fetch")
]
