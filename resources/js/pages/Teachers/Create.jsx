import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'designation', label: 'Designation' },
  { name: 'joining_date', label: 'Joining Date', type: 'date' },
  { name: 'qualification', label: 'Qualification' },
  { name: 'experience', label: 'Experience', type: 'number' },
  { name: 'salary', label: 'Salary', type: 'number' },
  { name: 'profile_photo', label: 'Profile Photo', type: 'file' },
];

const TeachersCreate = () => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/teachers', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Teacher</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default TeachersCreate;
