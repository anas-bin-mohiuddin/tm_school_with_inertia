You are helping build a multi-tenant School Management and After-School Program Management system.

Tech Stack

* Laravel 12 (backend)
* Inertia.js
* React (frontend)
* MySQL
* TailwindCSS for UI
* RESTful controllers
* Eloquent ORM
* Laravel Form Request validation
* Use the existing database migrations

Architecture

The system is a multi-school SaaS platform.

Each record belongs to a school via `school_id`.

Additionally, schools can have a hierarchical structure:

* A school may have a `parent_school_id`
* Parent schools can access data of all their child schools
* Child schools can only access their own data

Example:

Head Office School
├── Branch School A
├── Branch School B

Head Office can view and manage all branch data.

Database Structure

Main tables available:

schools
roles
users
students
teachers
subjects
academic_sessions
classes
sections
class_subjects
class_routines
courses
course_batches
batch_teachers
enrollments
invoices
payments

Schools Table

schools

* id
* parent_school_id
* name
* email
* contact_no
* address
* logo
* status

User System

Users belong to a school.

Roles include:

* Super Admin
* School Admin
* Teacher
* Accountant

Users must only access data belonging to:

* their school
  OR
* their school + its child schools (if it is a parent school)

Implement query scoping for this.

Authentication

The application will initially be developed **without authentication** to simplify early development and UI building.

Controllers may temporarily assume a current user context for development purposes.

Example development assumption:

$currentSchoolId = 1;

Later the application will integrate authentication using Laravel session-based authentication.

Recommended authentication stack:

* Laravel Breeze
* Inertia.js
* React

Authentication will provide:

* login
* logout
* password reset
* email verification
* role-based access

After authentication is added, all requests should use:

auth()->user()

Example:

$user = auth()->user();
$schoolId = $user->school_id;

Query scoping must then use the authenticated user's school.

Example:

Student::accessibleSchools()->paginate();

Middleware

When authentication is enabled, middleware should ensure:

* user is authenticated
* user belongs to a school
* queries are scoped to allowed schools

Example middleware:

EnsureSchoolScope

This middleware will determine:

* user's school
* child schools (if any)

Accessible school IDs will be stored for query scoping.

Example helper method:

getAccessibleSchoolIds()

Backend Requirements

Use Laravel features:

* Eloquent relationships
* Form Request validation
* Resource Controllers
* Policies for authorization
* Middleware for school scoping

Controllers should return Inertia responses.

Example:

return Inertia::render('Students/Index', [
'students' => $students
]);

Frontend Architecture

Use React with Inertia.

Directory structure example:

resources/js/

Pages/
Dashboard/
Students/
Teachers/
Classes/
Sections/
Subjects/
Courses/
Enrollments/
Invoices/
Payments/

Each module should contain:

Index.jsx
Create.jsx
Edit.jsx
Show.jsx

Components should be reusable.

Example components:

Components/

Form/
Table/
Modal/
Pagination/
SelectInput/

Functional Modules

Student Management

* CRUD students
* student profile page
* enrollment history

Teacher Management

* CRUD teachers
* assign teachers to subjects
* assign teachers to course batches

Class Management

* create classes
* create sections
* assign subjects to classes
* assign teachers to subjects

Routine Management

* weekly class routine
* schedule by class + section
* timetable display

Course Management (After-school programs)

* create courses
* create course batches
* assign teachers to batches

Enrollment System

The enrollments table supports two types:

school
course

School Enrollment includes:

* student
* class
* section
* academic session
* roll number

Course Enrollment includes:

* student
* course batch

Finance System

Invoices

Invoices belong to enrollments.

Types:

school_admission
program_admission
program_monthly_fee

Payments

Payments belong to invoices.

Features:

* partial payments
* payment history
* invoice status updates

Invoice statuses:

paid
unpaid
partial

React UI Requirements

Admin dashboard must include:

Dashboard
Students
Teachers
Classes
Sections
Subjects
Class Routine
Courses
Course Batches
Enrollments
Invoices
Payments

Each page must include:

* table listing
* create form
* edit form
* delete action
* pagination
* filtering

Important Relationships

Student

* hasMany Enrollments

Teacher

* belongsTo User
* teaches ClassSubjects
* teaches BatchTeachers

Class

* hasMany Sections
* hasMany ClassSubjects

Section

* belongsTo Class

Course

* hasMany CourseBatches

CourseBatch

* belongsTo Course
* hasMany BatchTeachers

Enrollment

* belongsTo Student
* belongsTo Class
* belongsTo Section
* belongsTo CourseBatch

Invoice

* belongsTo Enrollment
* hasMany Payments

Payment

* belongsTo Invoice
* belongsTo User (received_by)

Security Rules

All queries must be scoped by school.

Example:

User from parent school:
can see records where school_id = parent OR child school ids.

User from child school:
can only see records where school_id = their school.

Create helper functions or scopes for this.

Example:

scopeAccessibleSchools()

Goal

Generate:

* Laravel Models
* Relationships
* Resource Controllers
* Form Requests
* Inertia responses
* React pages
* reusable components

The goal is to build a clean, scalable, multi-tenant School ERP system using Laravel + Inertia + React.
