<?php
namespace App\Http\Controllers;

use App\Models\BatchTeacher;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchTeacherController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $batchTeachers = BatchTeacher::accessibleSchools($schoolIds)->paginate(20);
        return Inertia::render('BatchTeachers/Index', [
            'batchTeachers' => $batchTeachers
        ]);
    }

    public function create()
    {
        return Inertia::render('BatchTeachers/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'course_batch_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ]);
        $data['school_id'] = $school->id;
        BatchTeacher::create($data);
        return redirect()->route('batch-teachers.index');
    }

    public function edit(BatchTeacher $batchTeacher)
    {
        return Inertia::render('BatchTeachers/Edit', [
            'batchTeacher' => $batchTeacher
        ]);
    }

    public function update(Request $request, BatchTeacher $batchTeacher)
    {
        $data = $request->validate([
            'course_batch_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ]);
        $batchTeacher->update($data);
        return redirect()->route('batch-teachers.index');
    }

    public function destroy(BatchTeacher $batchTeacher)
    {
        $batchTeacher->delete();
        return redirect()->route('batch-teachers.index');
    }
}
