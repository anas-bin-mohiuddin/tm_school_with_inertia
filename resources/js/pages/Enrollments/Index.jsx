import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const EnrollmentsIndex = ({ enrollments }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'student_id', label: 'Student ID' },
    { key: 'type', label: 'Type' },
    { key: 'class_id', label: 'Class ID' },
    { key: 'section_id', label: 'Section ID' },
    { key: 'course_batch_id', label: 'Course Batch ID' },
    { key: 'roll_number', label: 'Roll Number' },
    { key: 'academic_session_id', label: 'Academic Session ID' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/enrollments/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete enrollment?')) {
      Inertia.delete(`/enrollments/${id}`);
    }
  };

  const data = enrollments.data.map((enrollment) => ({
    ...enrollment,
    actions: (
      <>
        <button onClick={() => handleEdit(enrollment.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(enrollment.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Enrollments</h1>
          <button onClick={() => Inertia.visit('/enrollments/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Enrollment</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={enrollments.current_page}
          totalPages={enrollments.last_page}
          onPageChange={(page) => Inertia.visit(`/enrollments?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default EnrollmentsIndex;
