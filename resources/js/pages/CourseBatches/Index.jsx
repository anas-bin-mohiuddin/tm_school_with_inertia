import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const CourseBatchesIndex = ({ courseBatches }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'course_id', label: 'Course ID' },
    { key: 'name', label: 'Name' },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
    { key: 'start_time', label: 'Start Time' },
    { key: 'end_time', label: 'End Time' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/course-batches/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete course batch?')) {
      Inertia.delete(`/course-batches/${id}`);
    }
  };

  const data = courseBatches.data.map((batch) => ({
    ...batch,
    actions: (
      <>
        <button onClick={() => handleEdit(batch.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(batch.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Course Batches</h1>
          <button onClick={() => Inertia.visit('/course-batches/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Course Batch</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={courseBatches.current_page}
          totalPages={courseBatches.last_page}
          onPageChange={(page) => Inertia.visit(`/course-batches?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default CourseBatchesIndex;
