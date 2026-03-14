<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\Section;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $sections = Section::paginate(20);
        return Inertia::render('Sections/Index', [
            'sections' => $sections
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();
        $classes = ClassModel::accessibleSchools($schoolIds)->get(['id', 'name']);
        return Inertia::render('Sections/Create', [
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $school = School::find($this->currentSchoolId);
        $data = $request->validate([
            'class_id' => 'required|integer',
            'name' => 'required',
        ]);
        $data['school_id'] = $school->id;
        Section::create($data);
        return redirect()->route('sections.index');
    }

    public function edit(Section $section)
    {
        return Inertia::render('Sections/Edit', [
            'section' => $section
        ]);
    }

    public function update(Request $request, Section $section)
    {
        $data = $request->validate([
            'class_id' => 'required|integer',
            'name' => 'required',
        ]);
        $section->update($data);
        return redirect()->route('sections.index');
    }

    public function destroy(Section $section)
    {
        $section->delete();
        return redirect()->route('sections.index');
    }
}
