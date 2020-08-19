from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models



# Create your models here.
class University(models.Model):
    UNIVERSITIES = [
        ('UHAS', 'University of Health and Allied Sciences'),
        ('UG', 'University of Ghana'),
    ]
    university = models.CharField(max_length=30, choices=UNIVERSITIES)

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
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='department')
    program = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.school} - {self.program}"


class User(AbstractUser):
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.username} - {self.first_name} - {self.last_name} - {self.university} - {self.school} - {self.program}"