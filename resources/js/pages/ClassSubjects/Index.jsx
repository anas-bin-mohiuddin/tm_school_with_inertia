import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const ClassSubjectsIndex = ({ classSubjects }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'class_name', label: 'Class' },
    { key: 'section_name', label: 'Section' },
    { key: 'subject_name', label: 'Subject' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/class-subjects/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete class subject?')) {
      Inertia.delete(`/class-subjects/${id}`);
    }
  };

  const data = classSubjects.data.map((cs) => ({
    ...cs,
    class_name: cs.class?.name ?? '—',
    subject_name: cs.subject?.name ?? '—',
    actions: (
      <>
        <button onClick={() => handleEdit(cs.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(cs.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Class Subjects</h1>
          <button onClick={() => Inertia.visit('/class-subjects/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Class Subject</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={classSubjects.current_page}
          totalPages={classSubjects.last_page}
          onPageChange={(page) => Inertia.visit(`/class-subjects?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default ClassSubjectsIndex;
