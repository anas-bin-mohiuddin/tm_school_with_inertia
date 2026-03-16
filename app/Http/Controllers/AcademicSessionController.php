<?php
namespace App\Http\Controllers;

use App\Models\AcademicSession;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicSessionController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $academicSessions = AcademicSession::whereIn('school_id', $schoolIds)
            ->with('school:id,name')
            ->paginate(20);

        return Inertia::render('AcademicSessions/Index', [
            'academicSessions' => $academicSessions,
        ]);
    }

    public function create()
    {
        return Inertia::render('AcademicSessions/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);

        $data = $request->validate([
            'name'       => 'required|string|max:20',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'nullable|boolean',
        ]);

        $data['school_id'] = $school->id;

        if (!empty($data['is_current'])) {
            AcademicSession::where('school_id', $school->id)->update(['is_current' => false]);
        }

        AcademicSession::create($data);

        return redirect()->route('academic-sessions.index');
    }

    public function edit(AcademicSession $academicSession)
    {
        return Inertia::render('AcademicSessions/Edit', [
            'academicSession' => $academicSession,
        ]);
    }

    public function update(Request $request, AcademicSession $academicSession)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:20',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'nullable|boolean',
        ]);

        if (!empty($data['is_current'])) {
            AcademicSession::where('school_id', $academicSession->school_id)
                ->where('id', '!=', $academicSession->id)
                ->update(['is_current' => false]);
        }

        $academicSession->update($data);

        return redirect()->route('academic-sessions.index');
    }

    public function destroy(AcademicSession $academicSession)
    {
        $academicSession->delete();

        return redirect()->route('academic-sessions.index');
    }
}
