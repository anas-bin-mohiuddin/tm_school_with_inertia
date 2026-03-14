import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';


const ClassSubjectsCreate = ({ classes, subjects }) => {
  const [values, setValues] = useState({});

  const fields = [
    { name: 'class_id',   label: 'Class',   type: 'select', options: classes.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'subject_id', label: 'Subject', type: 'select', options: subjects.map((s) => ({ value: s.id, label: s.name })) },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/class-subjects', values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Assign Subject to Class</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Save</button>
        </Form>
      </div>
    </div>
  );
};

export default ClassSubjectsCreate;
