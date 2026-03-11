<?php
namespace App\Http\Controllers;

use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\ClassModel;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Invoice;
use App\Models\Payment;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'schools' => School::count(),
            'students' => Student::count(),
            'teachers' => Teacher::count(),
            'classes' => ClassModel::count(), // school_id filter if needed
            'courses' => Course::count(),     // school_id filter if needed
            'subjects' => \App\Models\Subject::count(),
            'sections' => \App\Models\Section::count(),
            'course_batches' => \App\Models\CourseBatch::count(),
            'enrollments' => Enrollment::count(),
            'invoices' => Invoice::count(),
            'payments' => Payment::count(),
        ];
        return Inertia::render('Dashboard/Index', ['stats' => $stats]);
    }
}
