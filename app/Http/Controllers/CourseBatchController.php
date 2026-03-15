<?php
namespace App\Http\Controllers;

use App\Models\Course;
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
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('CourseBatches/Create', [
            'courses' => Course::accessibleSchools($schoolIds)->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'name' => 'required',
        ]);
        CourseBatch::create($data);
        return redirect()->route('course-batches.index');
    }

    public function edit(CourseBatch $courseBatch)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        return Inertia::render('CourseBatches/Edit', [
            'courseBatch' => $courseBatch,
            'courses'     => Course::accessibleSchools($schoolIds)->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, CourseBatch $courseBatch)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'name' => 'required',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
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
