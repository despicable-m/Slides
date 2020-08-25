from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_save


# Create your models here.
class University(models.Model):
    university = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "universities"
    def __str__(self):
        return self.university


class School(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='uni')
    school = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.university} - {self.school}"


class Program(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='sch')
    program = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.school} - {self.program}"


class Level(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name="pro")
    level = models.IntegerField()
    year = models.IntegerField()

    def __str__(self):
        return f"{self.program} - L{self.level} - {self.year}"

class Course(models.Model):
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="lvl", default=1)
    course_code = models.CharField(max_length=20)
    course = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.level} - {self.course_code} - {self.course}"

class User(AbstractUser):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return f"{self.username} - {self.first_name} - {self.last_name} - \
        {self.university} - {self.school} - {self.program} - \
        {self.level}"


# def upload_path_handler(user, filename):
#     return '{0}/{1}/{2}/{3}/{4}/{5}'.format(
#             user.level.year, user.university.university, user.school.school, 
#             user.program.program, user.level.level, filename)


# class Document(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     the_file = models.FileField(upload_to=upload_path_handler)


class Document(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)

    def location_string(self):
        return self.location
    document = models.FileField(upload_to=location)

    def save(self, *args, **kwargs):
        self.document = self.location_string()
        super(Document, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.document}"