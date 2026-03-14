import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const ClassesCreate = ({ teachers }) => {
  const [values, setValues] = useState({});

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'numeric_value', label: 'Numeric Value' },

    {
      name: 'class_teacher_id',
      label: 'Class Teacher',
      type: 'select',
      options: (teachers || []).map((t) => ({ value: t.id, label: t.name })),
    },
    { name: 'admission_fee', label: 'Admission Fee' },
    { name: 'recurring_type', label: 'Recurring Type' },
    { name: 'recurring_fee', label: 'Recurring Fee' },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/classes', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Class</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default ClassesCreate;
