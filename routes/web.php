<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseBatchController;
use App\Http\Controllers\BatchTeacherController;
use App\Http\Controllers\ClassRoutineController;
use App\Http\Controllers\AcademicSessionController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return redirect()->route('login');
});
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('students', StudentController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('enrollments', EnrollmentController::class);
    Route::resource('invoices', InvoiceController::class);
    Route::resource('payments', PaymentController::class);
    Route::resource('classes', ClassController::class);
    Route::resource('sections', SectionController::class);
    Route::resource('subjects', SubjectController::class);
    Route::resource('class-subjects', ClassSubjectController::class);
    Route::resource('courses', CourseController::class);
    Route::resource('course-batches', CourseBatchController::class);
    Route::resource('batch-teachers', BatchTeacherController::class);
    Route::resource('class-routines', ClassRoutineController::class);
    Route::resource('academic-sessions', AcademicSessionController::class);
});
