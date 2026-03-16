import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const EnrollmentsIndex = ({ enrollments }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'student_name', label: 'Student' },
    { key: 'type', label: 'Type' },
    { key: 'session_name', label: 'Session' },
    { key: 'class_name', label: 'Class' },
    { key: 'section_name', label: 'Section' },
    { key: 'batch_name', label: 'Course Batch' },
    { key: 'roll_number', label: 'Roll No.' },
    { key: 'admission_date', label: 'Admission Date' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => Inertia.visit(`/enrollments/${id}/edit`);

  const handleDelete = (id) => {
    if (confirm('Delete this enrollment?')) {
      Inertia.delete(`/enrollments/${id}`);
    }
  };

  const data = enrollments.data.map((e) => ({
    ...e,
    student_name: e.student ? `${e.student.first_name} ${e.student.last_name || ''}`.trim() : '—',
    session_name: e.academic_session?.name ?? '—',
    class_name: e.class?.name ?? '—',
    section_name: e.section?.name ?? '—',
    batch_name: e.course_batch?.name ?? '—',
    actions: (
      <>
        <button onClick={() => handleEdit(e.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(e.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Enrollments</h1>
          <button
            onClick={() => Inertia.visit('/enrollments/create')}
            className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
          >
            + Create Enrollment
          </button>
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
