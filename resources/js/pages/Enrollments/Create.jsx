import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'student_id', label: 'Student ID', type: 'number' },
  { name: 'type', label: 'Type' },
  { name: 'class_id', label: 'Class ID', type: 'number' },
  { name: 'section_id', label: 'Section ID', type: 'number' },
  { name: 'course_batch_id', label: 'Course Batch ID', type: 'number' },
  { name: 'roll_number', label: 'Roll Number' },
  { name: 'academic_session_id', label: 'Academic Session ID', type: 'number' },
];

const EnrollmentsCreate = () => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/enrollments', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Enrollment</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default EnrollmentsCreate;
