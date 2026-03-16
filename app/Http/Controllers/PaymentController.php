<?php
namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $currentSchoolId = 1;

    public function index()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $payments = Payment::whereHas('invoice.enrollment', fn($q) => $q->whereIn('school_id', $schoolIds))
            ->with([
                'invoice:id,total_amount,type,enrollment_id',
                'invoice.enrollment.student:id,first_name,last_name',
                'receiver:id,name',
            ])
            ->paginate(20);

        return Inertia::render('Payments/Index', [
            'payments' => $payments,
        ]);
    }

    public function create()
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $invoices = Invoice::whereHas('enrollment', fn($q) => $q->whereIn('school_id', $schoolIds))
            ->with('enrollment.student:id,first_name,last_name')
            ->get(['id', 'total_amount', 'type', 'enrollment_id']);

        return Inertia::render('Payments/Create', [
            'invoices' => $invoices,
            'users'    => User::get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_id'      => 'required|exists:invoices,id',
            'amount_paid'     => 'required|numeric|min:0',
            'date'            => 'nullable|date',
            'payment_method'  => 'nullable|string|max:50',
            'transaction_id'  => 'nullable|string|max:100',
            'received_by'     => 'nullable|exists:users,id',
            'notes'           => 'nullable|string',
        ]);

        Payment::create($data);

        return redirect()->route('payments.index');
    }

    public function edit(Payment $payment)
    {
        $school = School::find($this->currentSchoolId);
        $schoolIds = $school->getAccessibleSchoolIds();

        $invoices = Invoice::whereHas('enrollment', fn($q) => $q->whereIn('school_id', $schoolIds))
            ->with('enrollment.student:id,first_name,last_name')
            ->get(['id', 'total_amount', 'type', 'enrollment_id']);

        return Inertia::render('Payments/Edit', [
            'payment'  => $payment,
            'invoices' => $invoices,
            'users'    => User::get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'invoice_id'      => 'required|exists:invoices,id',
            'amount_paid'     => 'required|numeric|min:0',
            'date'            => 'nullable|date',
            'payment_method'  => 'nullable|string|max:50',
            'transaction_id'  => 'nullable|string|max:100',
            'received_by'     => 'nullable|exists:users,id',
            'notes'           => 'nullable|string',
        ]);

        $payment->update($data);

        return redirect()->route('payments.index');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();

        return redirect()->route('payments.index');
    }
}
