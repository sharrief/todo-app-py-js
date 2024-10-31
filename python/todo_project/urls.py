
from django.contrib import admin
from django.urls import path
from todo import views #here

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'), #here
    path('add/', views.add, name='add'), #here
    path('update/<int:id>/', views.update, name="update"),
    path('delete/<int:id>/', views.delete, name="delete"),

]
