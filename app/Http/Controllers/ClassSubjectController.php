<?php
namespace App\Http\Controllers;

use App\Models\ClassSubject;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassSubjectController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $classSubjects = ClassSubject::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('ClassSubjects/Index', [
            'classSubjects' => $classSubjects
        ]);
    }

    public function create()
    {
        return Inertia::render('ClassSubjects/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ]);
        $data['school_id'] = $school->id;
        ClassSubject::create($data);
        return redirect()->route('class-subjects.index');
    }

    public function edit(ClassSubject $classSubject)
    {
        return Inertia::render('ClassSubjects/Edit', [
            'classSubject' => $classSubject
        ]);
    }

    public function update(Request $request, ClassSubject $classSubject)
    {
        $data = $request->validate([
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ]);
        $classSubject->update($data);
        return redirect()->route('class-subjects.index');
    }

    public function destroy(ClassSubject $classSubject)
    {
        $classSubject->delete();
        return redirect()->route('class-subjects.index');
    }
}
