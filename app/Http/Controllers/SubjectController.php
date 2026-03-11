<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $subjects = Subject::paginate(20);
        return Inertia::render('Subjects/Index', [
            'subjects' => $subjects
        ]);
    }

    public function create()
    {
        return Inertia::render('Subjects/Create');
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);
        $data['school_id'] = $school->id;
        Subject::create($data);
        return redirect()->route('subjects.index');
    }

    public function edit(Subject $subject)
    {
        return Inertia::render('Subjects/Edit', [
            'subject' => $subject
        ]);
    }

    public function update(Request $request, Subject $subject)
    {
        $data = $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);
        $subject->update($data);
        return redirect()->route('subjects.index');
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return redirect()->route('subjects.index');
    }
}
