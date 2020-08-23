from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User, University, School, Program, Level, Course


# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return HttpResponse("Welcome")
    else:
        return HttpResponseRedirect(reverse('login'))


def register(request):
    if request.method == "POST":
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            data = json.loads(request.body)
            the_id = data['id']
            option = data['opt']

            # Get schools in that university
            if option == "uni":
                schools = School.objects.filter(university=the_id)
                school_dict = dict()
                for school in schools:
                    school_dict[school.id] = school.school
                return JsonResponse({"schools": school_dict})
            # Get all programs in the school
            elif option == "sch":
                programs = Program.objects.filter(school=the_id)
                program_dict = dict()
                for program in programs:
                    program_dict[program.id] = program.program
                return JsonResponse({"programs":program_dict})
            # Get all levels the selected program has
            elif option == "pro":
                levels = Level.objects.filter(program=the_id)
                level_dict = dict()
                for level in levels:
                    level_dict[level.id] = level.level
                
                print(level_dict)
                return JsonResponse({"levels":level_dict})
        else:
            username = request.POST["username"]
            first_name = request.POST["first-name"]
            last_name = request.POST["last-name"]
            university = University.objects.get(pk=request.POST["university"])
            school = School.objects.get(pk=request.POST["school"])
            program = Program.objects.get(pk=request.POST["program"])
            level = Level.objects.get(pk=request.POST["level"])
            password = request.POST["password"]

            try:
                user = User.objects.create_user(username,
                first_name=first_name, last_name=last_name,
                university=university, school=school,
                program=program, level=level, password=password)
                user.save()
            except IntegrityError:
                print("Integrity error")
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
    universities = University.objects.all()
    return render(request, "slides/register.html", {
        "universities": universities
    })


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "slides/login.html", {
                "message":"Invalid username and/or password."
            })
    else:
        return render(request, "slides/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def upload(request):
    
    courses = Course.objects.filter(
        level__user__program=request.user.program,
        level__user__university=request.user.university,
        level__user__school=request.user.school)

    return render(request, "slides/upload.html", {
        "courses":courses
    })