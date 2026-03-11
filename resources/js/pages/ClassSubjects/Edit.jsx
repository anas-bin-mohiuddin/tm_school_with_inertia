import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'class_id', label: 'Class ID', type: 'number' },
  { name: 'subject_id', label: 'Subject ID', type: 'number' },
  { name: 'teacher_id', label: 'Teacher ID', type: 'number' },
  { name: 'status', label: 'Status' },
];

const ClassSubjectsEdit = ({ classSubject }) => {
  const [values, setValues] = useState(classSubject);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/class-subjects/${classSubject.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Class Subject</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Update</button>
        </Form>
      </div>
    </div>
  );
};

export default ClassSubjectsEdit;
