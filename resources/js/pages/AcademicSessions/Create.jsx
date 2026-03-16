import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'name', label: 'Session Name' },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  {
    name: 'is_current',
    label: 'Is Current Session?',
    type: 'select',
    options: [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' },
    ],
  },
];

const AcademicSessionsCreate = () => {
  const [values, setValues] = useState({ is_current: 0 });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/academic-sessions', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Add Academic Session</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
          >
            Save
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AcademicSessionsCreate;
