import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Form from '../../Components/Form';
import { Inertia } from '@inertiajs/inertia';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'transferred', label: 'Transferred' },
];

const EnrollmentsEdit = ({ enrollment, students, classes, sections, courseBatches, academicSessions }) => {
  const [values, setValues] = useState({
    ...enrollment,
    class_id: enrollment.class_id != null ? String(enrollment.class_id) : '',
    section_id: enrollment.section_id != null ? String(enrollment.section_id) : '',
    course_batch_id: enrollment.course_batch_id != null ? String(enrollment.course_batch_id) : '',
    academic_session_id: enrollment.academic_session_id != null ? String(enrollment.academic_session_id) : '',
    admission_date: enrollment.admission_date ? enrollment.admission_date.substring(0, 10) : '',
  });

  const filteredSections = values.class_id
    ? sections.filter((s) => String(s.class_id) === values.class_id)
    : [];

  const isSchool = values.type === 'school';

  const fields = [
    {
      name: 'student_id',
      label: 'Student',
      type: 'select',
      options: students.map((s) => ({ value: s.id, label: `${s.first_name} ${s.last_name}` })),
    },
    {
      name: 'type',
      label: 'Enrollment Type',
      type: 'select',
      options: [
        { value: 'school', label: 'School' },
        { value: 'course', label: 'Course' },
      ],
    },
    ...(isSchool ? [
      {
        name: 'academic_session_id',
        label: 'Academic Session',
        type: 'select',
        options: academicSessions.map((a) => ({ value: a.id, label: a.name })),
      },
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
    ] : [
      {
        name: 'course_batch_id',
        label: 'Course Batch',
        type: 'select',
        options: courseBatches.map((b) => ({ value: b.id, label: b.name })),
      },
    ]),
    { name: 'roll_number', label: 'Roll Number', type: 'number' },
    { name: 'admission_date', label: 'Admission Date', type: 'date' },
    { name: 'original_admission_fee', label: 'Admission Fee', type: 'number' },
    { name: 'original_recurring_fee', label: 'Recurring Fee', type: 'number' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: STATUS_OPTIONS,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'class_id' ? { section_id: '' } : {}),
      ...(name === 'type' ? { class_id: '', section_id: '', course_batch_id: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/enrollments/${enrollment.id}`, values);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Enrollment</h1>
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

export default EnrollmentsEdit;
