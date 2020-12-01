""" Model for slides database """
from django.contrib.auth.models import AbstractUser
from django.db import models


class University(models.Model):
    """ University table """
    university = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "universities"
    def __str__(self):
        return self.university


class School(models.Model):
    """ School table """
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='uni')
    school = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.university} - {self.school}"


class Program(models.Model):
    """ Program table """
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='sch')
    program = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.school} - {self.program}"


class Level(models.Model):
    """ Level table """
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="pro")
    level = models.IntegerField()
    year = models.IntegerField()

    def __str__(self):
        return f"{self.program} - L{self.level} - {self.year}"

class Course(models.Model):
    """ Course table """
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="lvl", default=1)
    course_code = models.CharField(max_length=20)
    course = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.level} - {self.course_code} - {self.course}"

class User(AbstractUser):
    """ User table """
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.username} - {self.first_name} - {self.last_name} - \
        {self.university} - {self.school} - {self.program} - \
        {self.level}"


def add_path(instance, filename):
    """ Defines file path """
    return f'{instance.slug}/{filename}'

class Document(models.Model):
    """ Document table """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    topic = models.CharField(max_length=10000)
    date = models.DateField()
    time = models.TimeField()
    slug = models.CharField(max_length=10000)
    file_name = models.CharField(max_length=10000, default="something.jpg")

    document = models.FileField(upload_to=add_path, max_length=1000)

    def __str__(self):
        return f"{self.document}"


class Announcement(models.Model):
    """ Announcement table"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="announcer")
    title = models.CharField(max_length=150)
    announcement = models.TextField(max_length=10000)

    def __str__(self):
        return f"{self.title}"
