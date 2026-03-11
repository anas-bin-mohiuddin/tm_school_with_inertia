<?php
namespace App\Http\Controllers;

use App\Models\CourseBatch;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseBatchController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $courseBatches = CourseBatch::paginate(20);
        return Inertia::render('CourseBatches/Index', [
            'courseBatches' => $courseBatches
        ]);
    }

    public function create()
    {
        return Inertia::render('CourseBatches/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'course_id' => 'required|integer',
            'name' => 'required',
            'status' => 'required',
        ]);
        $data['school_id'] = $school->id;
        CourseBatch::create($data);
        return redirect()->route('course-batches.index');
    }

    public function edit(CourseBatch $courseBatch)
    {
        return Inertia::render('CourseBatches/Edit', [
            'courseBatch' => $courseBatch
        ]);
    }

    public function update(Request $request, CourseBatch $courseBatch)
    {
        $data = $request->validate([
            'course_id' => 'required|integer',
            'name' => 'required',
            'status' => 'required',
        ]);
        $courseBatch->update($data);
        return redirect()->route('course-batches.index');
    }

    public function destroy(CourseBatch $courseBatch)
    {
        $courseBatch->delete();
        return redirect()->route('course-batches.index');
    }
}
