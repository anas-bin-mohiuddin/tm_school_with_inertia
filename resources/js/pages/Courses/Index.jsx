import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const CoursesIndex = ({ courses }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'admission_fee', label: 'Admission Fee' },
    { key: 'recurring_type', label: 'Recurring Type' },
    { key: 'recurring_fee', label: 'Recurring Fee' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/courses/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete course?')) {
      Inertia.delete(`/courses/${id}`);
    }
  };

  const data = courses.data.map((course) => ({
    ...course,
    actions: (
      <>
        <button onClick={() => handleEdit(course.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(course.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Courses</h1>
          <button onClick={() => Inertia.visit('/courses/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Course</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={courses.current_page}
          totalPages={courses.last_page}
          onPageChange={(page) => Inertia.visit(`/courses?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default CoursesIndex;
