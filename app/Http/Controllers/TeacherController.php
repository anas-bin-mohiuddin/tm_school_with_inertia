<?php
namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $teachers = Teacher::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers
        ]);
    }

    public function create()
    {
        return Inertia::render('Teachers/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'name' => 'required',
            'designation' => 'nullable',
            'joining_date' => 'nullable|date',
            'qualification' => 'nullable',
            'experience' => 'nullable|integer',
            'salary' => 'nullable|numeric',
            'profile_photo' => 'nullable|file|image',
        ]);
        if ($request->hasFile('profile_photo')) {
            $data['profile_photo'] = $request->file('profile_photo')->store('profile_photos', 'public');
        }

        $data['school_id'] = $school->id;
        Teacher::create($data);
        return redirect()->route('teachers.index');
    }

    public function edit(Teacher $teacher)
    {
        return Inertia::render('Teachers/Edit', [
            'teacher' => $teacher
        ]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'name' => 'required',
            'designation' => 'nullable',
            'joining_date' => 'nullable|date',
            'qualification' => 'nullable',
            'experience' => 'nullable|integer',
            'salary' => 'nullable|numeric',
            'profile_photo' => 'nullable|file|image',
        ]);
        if ($request->hasFile('profile_photo')) {
            $data['profile_photo'] = $request->file('profile_photo')->store('profile_photos', 'public');
        }
        $teacher->update($data);
        return redirect()->route('teachers.index');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->route('teachers.index');
    }
}
