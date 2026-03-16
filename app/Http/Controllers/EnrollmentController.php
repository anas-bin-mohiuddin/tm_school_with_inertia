<?php
namespace App\Http\Controllers;

use App\Models\AcademicSession;
use App\Models\ClassModel;
use App\Models\CourseBatch;
use App\Models\Enrollment;
use App\Models\School;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $enrollments = Enrollment::accessibleSchools($schoolIds)
            ->with([
                'student:id,first_name,last_name',
                'class:id,name',
                'section:id,name',
                'courseBatch:id,name',
                'academicSession:id,name',
            ])
            ->paginate(20);

        return Inertia::render('Enrollments/Index', [
            'enrollments' => $enrollments,
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        return Inertia::render('Enrollments/Create', [
            'students'         => Student::accessibleSchools($schoolIds)->get(['id', 'first_name', 'last_name']),
            'classes'          => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections'         => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
            'courseBatches'    => CourseBatch::accessibleSchools($schoolIds)->get(['id', 'name']),
            'academicSessions' => AcademicSession::whereIn('school_id', $schoolIds)->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);

        $data = $request->validate([
            'student_id' => [
                'required',
                'exists:students,id',
                Rule::unique('enrollments', 'student_id')->where(function ($query) use ($request) {
                    if ($request->type === 'course') {
                        return $query->where('type', 'course')
                                     ->where('course_batch_id', $request->course_batch_id);
                    }
                    return $query->where('type', 'school')
                                 ->where('academic_session_id', $request->academic_session_id)
                                 ->where('class_id', $request->class_id)
                                 ->where('section_id', $request->section_id);
                }),
            ],
            'type'               => 'required|in:school,course',
            'academic_session_id'=> 'nullable|exists:academic_sessions,id',
            'class_id'           => 'nullable|exists:classes,id',
            'section_id'         => 'nullable|exists:sections,id',
            'course_batch_id'    => 'nullable|exists:course_batches,id',
            'roll_number'        => 'nullable|integer',
            'admission_date'     => 'nullable|date',
            'original_admission_fee' => 'nullable|numeric|min:0',
            'original_recurring_fee' => 'nullable|numeric|min:0',
            'status'                 => 'nullable|string|max:50',
        ]);

        $data['school_id'] = $school->id;
        Enrollment::create($data);

        return redirect()->route('enrollments.index');
    }

    public function edit(Enrollment $enrollment)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        return Inertia::render('Enrollments/Edit', [
            'enrollment'       => $enrollment,
            'students'         => Student::accessibleSchools($schoolIds)->get(['id', 'first_name', 'last_name']),
            'classes'          => ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']),
            'sections'         => Section::accessibleSchools($schoolIds)->get(['id', 'class_id', 'name']),
            'courseBatches'    => CourseBatch::accessibleSchools($schoolIds)->get(['id', 'name']),
            'academicSessions' => AcademicSession::whereIn('school_id', $schoolIds)->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $data = $request->validate([
            'student_id' => [
                'required',
                'exists:students,id',
                Rule::unique('enrollments', 'student_id')->ignore($enrollment->id)->where(function ($query) use ($request) {
                    if ($request->type === 'course') {
                        return $query->where('type', 'course')
                                     ->where('course_batch_id', $request->course_batch_id);
                    }
                    return $query->where('type', 'school')
                                 ->where('academic_session_id', $request->academic_session_id)
                                 ->where('class_id', $request->class_id)
                                 ->where('section_id', $request->section_id);
                }),
            ],
            'type'               => 'required|in:school,course',
            'academic_session_id'=> 'nullable|exists:academic_sessions,id',
            'class_id'           => 'nullable|exists:classes,id',
            'section_id'         => 'nullable|exists:sections,id',
            'course_batch_id'    => 'nullable|exists:course_batches,id',
            'roll_number'        => 'nullable|integer',
            'admission_date'     => 'nullable|date',
            'original_admission_fee' => 'nullable|numeric|min:0',
            'original_recurring_fee' => 'nullable|numeric|min:0',
            'status'                 => 'nullable|string|max:50',
        ]);

        $enrollment->update($data);

        return redirect()->route('enrollments.index');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index');
    }
}
