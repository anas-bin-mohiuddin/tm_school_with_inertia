<?php
namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Invoice;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $invoices = Invoice::whereHas('enrollment', fn($q) => $q->whereIn('school_id', $schoolIds))
            ->with([
                'enrollment.student:id,first_name,last_name',
            ])
            ->paginate(20);

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $enrollments = Enrollment::accessibleSchools($schoolIds)
            ->with('student:id,first_name,last_name')
            ->get(['id', 'student_id', 'type']);

        return Inertia::render('Invoices/Create', [
            'enrollments' => $enrollments,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'total_amount'  => 'required|numeric|min:0',
            'status'        => 'required|in:paid,unpaid,partial',
            'type'          => 'nullable|string|max:50',
            'billing_term'  => 'nullable|string|max:255',
        ]);

        Invoice::create($data);

        return redirect()->route('invoices.index');
    }

    public function edit(Invoice $invoice)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $enrollments = Enrollment::accessibleSchools($schoolIds)
            ->with('student:id,first_name,last_name')
            ->get(['id', 'student_id', 'type']);

        return Inertia::render('Invoices/Edit', [
            'invoice'     => $invoice,
            'enrollments' => $enrollments,
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'total_amount'  => 'required|numeric|min:0',
            'status'        => 'required|in:paid,unpaid,partial',
            'type'          => 'nullable|string|max:50',
            'billing_term'  => 'nullable|string|max:255',
        ]);

        $invoice->update($data);

        return redirect()->route('invoices.index');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('invoices.index');
    }
}
