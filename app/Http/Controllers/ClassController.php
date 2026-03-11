<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $classes = ClassModel::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('Classes/Index', [
            'classes' => $classes
        ]);
    }

    public function create()
    {
        return Inertia::render('Classes/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'name' => 'required',
            'status' => 'required',
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
