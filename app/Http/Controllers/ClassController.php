<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $classes = ClassModel::accessibleSchools($schoolIds)->with('teacher:id,name')->paginate(20);
        return Inertia::render('Classes/Index', [
            'classes' => $classes
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $teachers = Teacher::accessibleSchools($schoolIds)->get(['id', 'name']);
        return Inertia::render('Classes/Create', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'name' => 'required',
            'numeric_value' => 'nullable|integer',
            'admission_fee' => 'nullable|numeric',
            'class_teacher_id' => 'nullable|exists:teachers,id',
            'recurring_type' => 'nullable',
            'recurring_fee' => 'nullable|numeric',
        ]);
        $data['school_id'] = $school->id;
        ClassModel::create($data);
        return redirect()->route('classes.index');
    }

    public function edit(ClassModel $class)
    {
        return Inertia::render('Classes/Edit', [
            'class' => $class
        ]);
    }

    public function update(Request $request, ClassModel $class)
    {
        $data = $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);
        $class->update($data);
        return redirect()->route('classes.index');
    }

    public function destroy(ClassModel $class)
    {
        $class->delete();
        return redirect()->route('classes.index');
    }
}
