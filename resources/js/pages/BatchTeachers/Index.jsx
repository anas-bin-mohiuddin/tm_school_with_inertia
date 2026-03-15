import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const BatchTeachersIndex = ({ batchTeachers }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'course_name', label: 'Course' },
    { key: 'batch_name', label: 'Batch' },
    { key: 'teacher_name', label: 'Teacher' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/batch-teachers/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete batch teacher?')) {
      Inertia.delete(`/batch-teachers/${id}`);
    }
  };

  const data = batchTeachers.data.map((bt) => ({
    ...bt,
    course_name: bt.course_batch?.course?.name ?? '—',
    batch_name:  bt.course_batch?.name ?? '—',
    teacher_name: bt.teacher?.name ?? '—',
    actions: (
      <>
        <button onClick={() => handleEdit(bt.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(bt.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Batch Teachers</h1>
          <button onClick={() => Inertia.visit('/batch-teachers/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Batch Teacher</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={batchTeachers.current_page}
          totalPages={batchTeachers.last_page}
          onPageChange={(page) => Inertia.visit(`/batch-teachers?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default BatchTeachersIndex;
