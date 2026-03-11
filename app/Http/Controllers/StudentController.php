<?php
namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    // Temporary development context
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $students = Student::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('Students/Index', [
            'students' => $students
        ]);
    }

    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'nullable',
            'address' => 'nullable',
        ]);
        $data['school_id'] = $school->id;
        Student::create($data);
        return redirect()->route('students.index');
    }

    public function edit(Student $student)
    {
        return Inertia::render('Students/Edit', [
            'student' => $student
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'nullable',
            'address' => 'nullable',
        ]);
        $student->update($data);
        return redirect()->route('students.index');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index');
    }
}
