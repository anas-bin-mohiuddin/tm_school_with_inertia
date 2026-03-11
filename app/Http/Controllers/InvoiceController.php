<?php
namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('enrollment')->paginate(20);
        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'enrollment_id' => 'required|integer',
            'type' => 'required',
            'amount' => 'required|numeric',
            'status' => 'required',
        ]);
        Invoice::create($data);
        return redirect()->route('invoices.index');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'enrollment_id' => 'required|integer',
            'type' => 'required',
            'amount' => 'required|numeric',
            'status' => 'required',
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
