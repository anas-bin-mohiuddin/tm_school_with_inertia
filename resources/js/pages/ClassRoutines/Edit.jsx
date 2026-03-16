import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const DAY_OPTIONS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

const ClassRoutinesEdit = ({ classRoutine, classes, sections, subjects, teachers }) => {
  const [values, setValues] = useState({
    ...classRoutine,
    start_time: classRoutine.start_time ? classRoutine.start_time.substring(0, 5) : '',
    end_time: classRoutine.end_time ? classRoutine.end_time.substring(0, 5) : '',
  });

  const filteredSections = sections.filter(
    (s) => String(s.class_id) === String(values.class_id)
  );

  const fields = [
    {
      name: 'class_id',
      label: 'Class',
      type: 'select',
      options: classes.map((c) => ({ value: c.id, label: c.name })),
    },
    {
      name: 'section_id',
      label: 'Section',
      type: 'select',
      options: filteredSections.map((s) => ({ value: s.id, label: s.name })),
    },
    {
      name: 'subject_id',
      label: 'Subject',
      type: 'select',
      options: subjects.map((s) => ({ value: s.id, label: s.name })),
    },
    {
      name: 'teacher_id',
      label: 'Teacher',
      type: 'select',
      options: teachers.map((t) => ({ value: t.id, label: t.name })),
    },
    { name: 'day', label: 'Day', type: 'select', options: DAY_OPTIONS },
    { name: 'start_time', label: 'Start Time', type: 'time' },
    { name: 'end_time', label: 'End Time', type: 'time' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'class_id' ? { section_id: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/class-routines/${classRoutine.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Class Routine</h1>
        <Form fields={fields} values={values} onChange={handleChange} onSubmit={handleSubmit}>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
          >
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ClassRoutinesEdit;
