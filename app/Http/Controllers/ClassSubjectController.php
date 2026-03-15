<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\ClassSubject;
use App\Models\School;
use App\Models\Section;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassSubjectController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $classSubjects = ClassSubject::accessibleSchools($schoolIds)
            ->with(['class:id,name', 'subject:id,name', 'section:id,name'])
            ->paginate(20);
        return Inertia::render('ClassSubjects/Index', [
            'classSubjects' => $classSubjects
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('ClassSubjects/Create', [
            'classes'   => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'subjects'  => Subject::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections'  => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'section_id' => 'nullable|exists:sections,id',
            'status'     => 'nullable|string',
        ]);
        $data['school_id'] = $school->id;
        ClassSubject::create($data);
        return redirect()->route('class-subjects.index');
    }

    public function edit(ClassSubject $classSubject)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('ClassSubjects/Edit', [
            'classSubject' => $classSubject,
            'classes'      => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'subjects'     => Subject::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections'     => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
        ]);
    }

    public function update(Request $request, ClassSubject $classSubject)
    {
        $data = $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'section_id' => 'nullable|exists:sections,id',
            'status'     => 'nullable|string',
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
