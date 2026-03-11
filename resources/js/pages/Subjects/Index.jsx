import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const SubjectsIndex = ({ subjects }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/subjects/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete subject?')) {
      Inertia.delete(`/subjects/${id}`);
    }
  };

  const data = subjects.data.map((subject) => ({
    ...subject,
    actions: (
      <>
        <button onClick={() => handleEdit(subject.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(subject.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Subjects</h1>
          <button onClick={() => Inertia.visit('/subjects/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Subject</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={subjects.current_page}
          totalPages={subjects.last_page}
          onPageChange={(page) => Inertia.visit(`/subjects?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default SubjectsIndex;
