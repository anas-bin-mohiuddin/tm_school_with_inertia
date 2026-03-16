import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const METHOD_OPTIONS = [
  { value: 'cash',          label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cheque',        label: 'Cheque' },
  { value: 'card',          label: 'Card' },
  { value: 'mobile_banking', label: 'Mobile Banking' },
];

const PaymentsCreate = ({ invoices, users }) => {
  const [values, setValues] = useState({});

  const invoiceOptions = invoices.map((inv) => {
    const student = inv.enrollment?.student;
    const name = student ? `${student.first_name} ${student.last_name}` : '—';
    return { value: inv.id, label: `#${inv.id} — ${name} | ${inv.type} | ${inv.total_amount}` };
  });

  const fields = [
    { name: 'invoice_id',     label: 'Invoice',        type: 'select', options: invoiceOptions },
    { name: 'amount_paid',    label: 'Amount Paid',    type: 'number' },
    { name: 'date',           label: 'Payment Date',   type: 'date' },
    { name: 'payment_method', label: 'Payment Method', type: 'select', options: METHOD_OPTIONS },
    { name: 'transaction_id', label: 'Transaction ID' },
    { name: 'received_by',    label: 'Received By',    type: 'select', options: users.map((u) => ({ value: u.id, label: u.name })) },
    { name: 'notes',          label: 'Notes' },
  ];

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/payments', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Payment</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentsCreate;
