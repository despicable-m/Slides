from django.contrib import admin
from .models import University, School, Program, User, Level, Course

# Register your models here.
admin.site.register(University)
admin.site.register(School)
admin.site.register(Program)
admin.site.register(User)
admin.site.register(Level)
admin.site.register(Course)