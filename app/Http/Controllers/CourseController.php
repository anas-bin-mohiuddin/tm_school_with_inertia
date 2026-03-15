<?php
namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $courses = Course::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function create()
    {
        return Inertia::render('Courses/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'name' => 'required',
            'admission_fee' => 'nullable|numeric',
            'recurring_type' => 'nullable|string',
            'recurring_fee' => 'nullable|numeric',

        ]);
        $data['school_id'] = $school->id;
        Course::create($data);
        return redirect()->route('courses.index');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Courses/Edit', [
            'course' => $course
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'name' => 'required',
            'admission_fee' => 'nullable|numeric',
            'recurring_type' => 'nullable|string',
            'recurring_fee' => 'nullable|numeric',
        ]);
        $course->update($data);
        return redirect()->route('courses.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index');
    }
}
