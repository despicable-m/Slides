""" Views """
# import os
import json
from pathlib import Path
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.db import IntegrityError
# from django.views.decorators.csrf import csrf_exempt
# from django.core.files.storage import FileSystemStorage

from .models import User, University, School, Program, Level, Course, Document


dt = datetime.now()
d = dt.date()
t = dt.strftime("%H:%M:%S")

# Create your views here.

def index(request):
    """ App homepage """
    if request.user.is_authenticated:
        if request.method == "POST":
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                # data = json.loads(request.body)
                # Gets the level and returns all courses in that level
                db_courses = Course.objects.filter(level=request.user.level).order_by("course")
                courses = list()
                for course in db_courses:
                    item = {"id":course.id, "course":course.course}
                    courses.append(item)

                return JsonResponse({"courses":courses})

        courses = Course.objects.filter(level=request.user.level).order_by("course")
        user = request.user
        documents = Document.objects.all().order_by("-id")
        levels = Level.objects.filter(program=request.user.program)
        years = Level.objects.filter(program=request.user.program,
                                     level=request.user.level.level)

        return render(request, "slides/index.html", {
            "courses":courses,
            "user": user,
            "documents":documents,
            "levels":levels,
            "years":years
        })
    else:
        return HttpResponseRedirect(reverse('login'))


@login_required
def data_get(request):
    """ Sends data to the frontend """
    documents = Document.objects.all().order_by("-id")
    docs = list()
    for document in documents:
        item = {"id":document.id, "topic":document.topic, "filename":document.file_name,
                "size":document.document.size, "url":document.document.url}
        docs.append(item)

    db_courses = Course.objects.filter(level=request.user.level).order_by("course")
    courses = list()
    for course in db_courses:
        item = {"id":course.id, "course":course.course}
        courses.append(item)

    db_years = Level.objects.filter(program=request.user.program,
                                    level=request.user.level.level)

    years = list()
    for year in db_years:
        item = {"id":year.id, "year":year.year}
        years.append(item)

    db_levels = Level.objects.filter(program=request.user.program)
    levels = list()
    for level in db_levels:
        item = {"id":level.id, "level":level.level}
        levels.append(item)

    program = request.user.program.program
    return JsonResponse({
        "documents":docs,
        "courses":courses,
        "levels":levels,
        "years":years,
        "program":program
    })


def fetch(request, info):
    """ Sends specific requested data to the frontend """
    if request.user.is_authenticated:
        if request.method == "POST":
            data = json.loads(request.body)
            if info == 'course':
                # Gets the level and returns all courses in that level
                level = Level.objects.get(pk=data['id'])
                db_courses = Course.objects.filter(level=level).order_by("course")
                courses = list()
                for course in db_courses:
                    item = {"id":course.id, "course":course.course}
                    courses.append(item)
                return JsonResponse({"courses":courses})

            elif info == 'document':
                course = Course.objects.get(pk=data['id'])
                db_documents = Document.objects.filter(course=course).order_by("-id")
                documents = list()
                for document in db_documents:
                    item = {"id":document.id, "topic":document.topic, "filename":document.file_name,
                            "size":document.document.size, "url":document.document.url}
                    documents.append(item)
                return JsonResponse({"documents":documents})


def register(request):
    """ User registration view """
    if request.method == "POST":
        # Works when post data is being received via AJAX
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
            # When form is submitted
            username = request.POST["username"]
            first_name = request.POST["first-name"]
            last_name = request.POST["last-name"]
            university = University.objects.get(pk=request.POST["university"])
            school = School.objects.get(pk=request.POST["school"])
            program = Program.objects.get(pk=request.POST["program"])
            level = Level.objects.get(pk=request.POST["level"])
            password = request.POST["password"]

            # Tries registering user
            try:
                user = User.objects.create_user(username,
                                                first_name=first_name,
                                                last_name=last_name,
                                                university=university,
                                                school=school,
                                                program=program,
                                                level=level,
                                                password=password)
                user.save()
            except IntegrityError:
                return render(request, "slides/register.html", {
                    "message":"Invalid username and/or password."
                })
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
    universities = University.objects.all()
    return render(request, "slides/register.html", {
        "universities": universities
    })


def login_view(request):
    """ User login view """
    if request.method == "POST":

        # Attempts signing user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Checks if authentication is sucessful
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
    """ Logs out user """
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def upload(request):
    """ Let's user upload files """
    if request.method == "POST":
        user = request.user
        the_file = request.FILES["uploaded-file"]
        file_name = request.FILES["uploaded-file"].name
        topic = request.POST["topic"]
        course = Course.objects.get(pk=request.POST["course"])

        slug = Path('{0}/{1}/{2}/{3}/{4}/{5}'.format(
            user.level.year,
            user.university.university,
            user.school.school,
            user.program.program,
            user.level.level,
            course.course))

        Document.objects.create(user=user,
                                university=user.university,
                                school=user.school,
                                program=user.program,
                                course=course,
                                topic=topic,
                                slug=slug,
                                file_name=file_name,
                                date=d,
                                time=t,
                                document=the_file)

        return render(request, 'slides/upload.html')

    courses = Course.objects.filter(level=request.user.level)
    return render(request, "slides/upload.html", {
        "courses":courses
    })
