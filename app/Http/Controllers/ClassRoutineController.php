<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\ClassRoutine;
use App\Models\School;
use App\Models\Section;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassRoutineController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $classRoutines = ClassRoutine::with([
            'class:id,name',
            'section:id,name',
            'subject:id,name',
            'teacher:id,name',
        ])->paginate(20);

        return Inertia::render('ClassRoutines/Index', [
            'classRoutines' => $classRoutines,
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        return Inertia::render('ClassRoutines/Create', [
            'classes'  => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections' => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
            'subjects' => Subject::accessibleSchools($schoolIds)->get(['id', 'name']),
            'teachers' => Teacher::get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'section_id' => 'nullable|exists:sections,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'teacher_id' => 'nullable|exists:teachers,id',
            'start_time' => 'nullable|date_format:H:i',
            'end_time'   => 'nullable|date_format:H:i|after:start_time',
            'day'        => 'nullable|integer|min:1|max:7',
        ]);

        ClassRoutine::create($data);

        return redirect()->route('class-routines.index');
    }

    public function edit(ClassRoutine $classRoutine)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        return Inertia::render('ClassRoutines/Edit', [
            'classRoutine' => $classRoutine,
            'classes'      => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections'     => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
            'subjects'     => Subject::accessibleSchools($schoolIds)->get(['id', 'name']),
            'teachers'     => Teacher::get(['id', 'name']),
        ]);
    }

    public function update(Request $request, ClassRoutine $classRoutine)
    {
        $data = $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'section_id' => 'nullable|exists:sections,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'teacher_id' => 'nullable|exists:teachers,id',
            'start_time' => 'nullable|date_format:H:i,H:i:s',
            'end_time'   => 'nullable|date_format:H:i,H:i:s|after:start_time',
            'day'        => 'nullable|integer|min:1|max:7',
        ]);

        $classRoutine->update($data);

        return redirect()->route('class-routines.index');
    }

    public function destroy(ClassRoutine $classRoutine)
    {
        $classRoutine->delete();

        return redirect()->route('class-routines.index');
    }
}
