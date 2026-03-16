import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const AcademicSessionsIndex = ({ academicSessions }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
    { key: 'is_current_label', label: 'Current' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/academic-sessions/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this academic session?')) {
      Inertia.delete(`/academic-sessions/${id}`);
    }
  };

  const data = academicSessions.data.map((session) => ({
    ...session,
    is_current_label: session.is_current ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Yes</span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">No</span>
    ),
    actions: (
      <>
        <button onClick={() => handleEdit(session.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(session.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Academic Sessions</h1>
          <button
            onClick={() => Inertia.visit('/academic-sessions/create')}
            className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
          >
            + Add Session
          </button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={academicSessions.current_page}
          totalPages={academicSessions.last_page}
          onPageChange={(page) => Inertia.visit(`/academic-sessions?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default AcademicSessionsIndex;
