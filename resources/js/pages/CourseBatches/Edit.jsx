import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const fields = [
  { name: 'course_id', label: 'Course ID', type: 'number' },
  { name: 'name', label: 'Name' },
  { name: 'status', label: 'Status' },
];

const CourseBatchesEdit = ({ courseBatch }) => {
  const [values, setValues] = useState(courseBatch);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/course-batches/${courseBatch.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Course Batch</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Update</button>
        </Form>
      </div>
    </div>
  );
};

export default CourseBatchesEdit;
