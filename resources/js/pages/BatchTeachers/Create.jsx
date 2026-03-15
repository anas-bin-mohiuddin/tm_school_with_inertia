import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const BatchTeachersCreate = ({ courses, courseBatches, teachers }) => {
  const [values, setValues] = useState({});

  const filteredBatches = courseBatches.filter((b) => String(b.course_id) === String(values.course_id));

  const fields = [
    { name: 'course_id',      label: 'Course',       type: 'select', options: courses.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'course_batch_id', label: 'Batch',        type: 'select', options: filteredBatches.map((b) => ({ value: b.id, label: b.name })) },
    { name: 'teacher_id',     label: 'Teacher',      type: 'select', options: teachers.map((t) => ({ value: t.id, label: t.name })) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'course_id' ? { course_batch_id: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/batch-teachers', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Create Batch Teacher</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default BatchTeachersCreate;
