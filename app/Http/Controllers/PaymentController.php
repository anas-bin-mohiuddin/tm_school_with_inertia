<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('invoice')->paginate(20);
        return Inertia::render('Payments/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        return Inertia::render('Payments/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_id' => 'required|integer',
            'user_id' => 'required|integer',
            'amount' => 'required|numeric',
            'status' => 'required',
        ]);
        Payment::create($data);
        return redirect()->route('payments.index');
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', [
            'payment' => $payment
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'invoice_id' => 'required|integer',
            'user_id' => 'required|integer',
            'amount' => 'required|numeric',
            'status' => 'required',
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
