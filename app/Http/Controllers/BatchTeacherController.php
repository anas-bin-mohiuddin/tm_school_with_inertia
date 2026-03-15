<?php
namespace App\Http\Controllers;

use App\Models\BatchTeacher;
use App\Models\Course;
use App\Models\CourseBatch;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchTeacherController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $batchTeachers = BatchTeacher::accessibleSchools($schoolIds)
            ->with(['courseBatch:id,name,course_id', 'courseBatch.course:id,name', 'teacher:id,name'])
            ->paginate(20);
        return Inertia::render('BatchTeachers/Index', [
            'batchTeachers' => $batchTeachers
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('BatchTeachers/Create', [
            'courses'       => Course::accessibleSchools($schoolIds)->get(['id', 'name']),
            'courseBatches' => CourseBatch::accessibleSchools($schoolIds)->get(['id', 'course_id', 'name']),
            'teachers'      => Teacher::accessibleSchools($schoolIds)->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_batch_id' => 'required|exists:course_batches,id',
            'teacher_id'      => ['required', 'exists:teachers,id', 'unique:batch_teachers,teacher_id,NULL,id,course_batch_id,' . $request->course_batch_id],
        ]);
        BatchTeacher::create($data);
        return redirect()->route('batch-teachers.index');
    }

    public function edit(BatchTeacher $batchTeacher)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('BatchTeachers/Edit', [
            'batchTeacher'  => $batchTeacher,
            'courses'       => Course::accessibleSchools($schoolIds)->get(['id', 'name']),
            'courseBatches' => CourseBatch::accessibleSchools($schoolIds)->get(['id', 'course_id', 'name']),
            'teachers'      => Teacher::accessibleSchools($schoolIds)->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, BatchTeacher $batchTeacher)
    {
        $data = $request->validate([
            'course_batch_id' => 'required|exists:course_batches,id',
            'teacher_id'      => ['required', 'exists:teachers,id', 'unique:batch_teachers,teacher_id,' . $batchTeacher->id . ',id,course_batch_id,' . $request->course_batch_id],
            'status'          => 'required',
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
