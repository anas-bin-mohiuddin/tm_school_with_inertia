<?php
namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $enrollments = Enrollment::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('Enrollments/Index', [
            'enrollments' => $enrollments
        ]);
    }

    public function create()
    {
        return Inertia::render('Enrollments/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'student_id' => 'required|integer',
            'type' => 'required',
            'class_id' => 'nullable|integer',
            'section_id' => 'nullable|integer',
            'course_batch_id' => 'nullable|integer',
            'roll_number' => 'nullable',
            'academic_session_id' => 'nullable|integer',
        ]);
        $data['school_id'] = $school->id;
        Enrollment::create($data);
        return redirect()->route('enrollments.index');
    }

    public function edit(Enrollment $enrollment)
    {
        return Inertia::render('Enrollments/Edit', [
            'enrollment' => $enrollment
        ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $data = $request->validate([
            'student_id' => 'required|integer',
            'type' => 'required',
            'class_id' => 'nullable|integer',
            'section_id' => 'nullable|integer',
            'course_batch_id' => 'nullable|integer',
            'roll_number' => 'nullable',
            'academic_session_id' => 'nullable|integer',
        ]);
        $enrollment->update($data);
        return redirect()->route('enrollments.index');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return redirect()->route('enrollments.index');
    }
}
