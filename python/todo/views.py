from django.shortcuts import render, redirect, get_object_or_404
from .forms import TodoForm
from .models import Todo
# Create your views here.

def home(request):
    list = Todo.objects.all()
    return render(request, 'home.html', { 'list': list })


def add(request):
    list=Todo.objects.order_by("date")
    if request.method == "POST":
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    form = TodoForm()
    return render(request, 'add.html',{"form":form,"list":list})


def update(request, id):
    todo = get_object_or_404(Todo, id=id)
    form = TodoForm(instance=todo)
    if request.method == "POST":
        form = TodoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return redirect ('home')

    form = TodoForm()
    return render(request, 'update.html',{"form":form,"todo":todo})

def delete(request, id):
    todo = get_object_or_404(Todo, id=id)
    todo.delete()
    return redirect("home")
