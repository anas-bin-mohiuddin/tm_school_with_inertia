import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'invoice_id', label: 'Invoice ID', type: 'number' },
  { name: 'user_id', label: 'Received By (User ID)', type: 'number' },
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'status', label: 'Status' },
];

const PaymentsEdit = ({ payment }) => {
  const [values, setValues] = useState(payment);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/payments/${payment.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Payment</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Update</button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentsEdit;
