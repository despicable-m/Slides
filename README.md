# Slides overview 

The app allows users - students - to upload course materials and make announcements which are then stored in a database that can only be seen by users in the same university and in some cases, only users who are reading the same program as the uploader in the same university.

## Registration
All users are supposed to open an account (register) before they can upload or access anything. During registration, users are asked to select their university, school (department), program and level from a list added to the database by a site admin.

## Homepage
After registration, users are logged in and redirected to the homepage where they have access to up to five recent announcements for students in the user's university, five recently uploaded documents specific to the user's level and course, courses specific to the user's level and program, and levels. The user can view more annoucements, uploaded documents and courses by click or tapping on the view all button adjacent to each category.

User can make announcements or uploads files, one at a time, by clicking on the relevant nav-link on the navigation bar.

![Homepage after logging in](readme_assets/Slides_homepage.jpeg)

# Why the restrictions?
While the restrictions make sure that users are not overwhelmed by too many documents and announcements that are not relevant to them, the restrictions also make sure that some documents that some lecturers might not want distributed outside the university do not get distributed outside the university.

# Files

## Back end

### [slides/models.py](slides/models.py "models.py")
This file contains all the program's models

### [slides/urls.py](slides/urls.py "urls.py")
This file contains all the web app's urls

### [slides/views.py](slides/views.py "views.py")
This file contains all the program's views.

## Front end

## _Templates_

### [slides/templates/slides/announce.html](slides/templates/slides/announce.html)
This is the page where the user can compose new announcements.

### [slides/templates/slides/announcement.html](slides/templates/slides/announcement.html)
The user is directed to this page when s/he expands an announcement

### [slides/templates/slides/announcements.html](slides/templates/slides/announcements.html)
This page is where the user views all announcements

### [slides/templates/slides/course.html](slides/templates/slides/course.html)
Shows all uploaded documents for a particular course.

### [slides/templates/slides/documents.html](slides/templates/slides/documents.html)
Displays all uploaded documents relevant to the user

### [slides/templates/slides/index.html](slides/templates/slides/index.html)
This is the homepage of the web application

### [slides/templates/slides/layout.html](slides/templates/slides/layout.html)
General layout of the web application's UI. It had the navbar, most scripts, general page and the footer. This is extended by other html files.

### [slides/templates/slides/login.html](slides/templates/slides/login.html)
This is the user login page.

### [slides/templates/slides/program.html](slides/templates/slides/program.html)
Shows all available courses of a particular program. This is diplayed based on the level clicked by the user on the homepage.

### [slides/templates/slides/register.html](slides/templates/slides/register.html)
User registration page

### [slides/templates/slides/search.html](slides/templates/slides/search.html)
Displays search results

### [slides/templates/slides/upload.html](slides/templates/slides/upload.html)
This is where the user can upload files

## _Static files_

### [slides/static/slides/index.js](slides/static/slides/index.js)
This javascript file controls the homepage of the web app

### [slides/static/slides/register.js](slides/static/slides/register.js)
This works on the user registration page. It sends the user's selections to the back end and receives relevant data that the user uses in registering.

### [slides/static/slides/script.js](slides/static/slides/script.js)
General javascript file for the web application.


