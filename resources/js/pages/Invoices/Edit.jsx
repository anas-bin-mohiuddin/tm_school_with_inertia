import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const TYPE_OPTIONS = [
  { value: 'school_admission',    label: 'School Admission' },
  { value: 'program_admission',   label: 'Program Admission' },
  { value: 'program_monthly_fee', label: 'Program Monthly Fee' },
];

const STATUS_OPTIONS = [
  { value: 'unpaid',  label: 'Unpaid' },
  { value: 'partial', label: 'Partial' },
  { value: 'paid',    label: 'Paid' },
];

const InvoicesEdit = ({ invoice, enrollments }) => {
  const [values, setValues] = useState({
    ...invoice,
    enrollment_id: invoice.enrollment_id != null ? String(invoice.enrollment_id) : '',
  });

  const enrollmentOptions = enrollments.map((e) => ({
    value: e.id,
    label: e.student
      ? `#${e.id} — ${e.student.first_name} ${e.student.last_name} (${e.type})`
      : `#${e.id} (${e.type})`,
  }));

  const fields = [
    { name: 'enrollment_id', label: 'Enrollment', type: 'select', options: enrollmentOptions },
    { name: 'type',          label: 'Invoice Type', type: 'select', options: TYPE_OPTIONS },
    { name: 'billing_term',  label: 'Billing Term' },
    { name: 'total_amount',  label: 'Total Amount', type: 'number' },
    { name: 'status',        label: 'Status', type: 'select', options: STATUS_OPTIONS },
  ];

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/invoices/${invoice.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Invoice</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Update</button>
        </Form>
      </div>
    </div>
  );
};

export default InvoicesEdit;
