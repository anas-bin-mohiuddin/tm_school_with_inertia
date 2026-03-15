import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const CourseBatchesCreate = ({ courses }) => {
  const fields = [
    { name: 'course_id',  label: 'Course',     type: 'select', options: courses.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'name',       label: 'Name' },
    { name: 'start_date', label: 'Start Date', type: 'date' },
    { name: 'end_date',   label: 'End Date',   type: 'date' },
    { name: 'start_time', label: 'Start Time', type: 'time' },
    { name: 'end_time',   label: 'End Time',   type: 'time' },
  ];

  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/course-batches', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Course Batch</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default CourseBatchesCreate;
