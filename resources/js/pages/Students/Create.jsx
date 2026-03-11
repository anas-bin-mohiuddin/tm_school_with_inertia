import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'first_name', label: 'FirstName' },
  { name: 'last_name', label: 'LastName' },
  { name: 'address', label: 'Address' },
];

const StudentsCreate = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    address: '',
    });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting values:', values); // <- check this in browser
    Inertia.post('/students', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Student</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default StudentsCreate;
