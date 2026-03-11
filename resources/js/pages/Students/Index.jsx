import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const StudentsIndex = ({ students }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/students/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete student?')) {
      Inertia.delete(`/students/${id}`);
    }
  };

  const data = students.data.map((student) => ({
    ...student,
    name: `${student.first_name} ${student.last_name || ''}`.trim(),
    actions: (
      <>
        <button onClick={() => handleEdit(student.id)}
         className="px-3 py-1 m-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-shadow shadow-sm">Edit</button>
        <button onClick={() => handleDelete(student.id)}
         className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-shadow shadow-sm">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <button onClick={() => Inertia.visit('/students/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Student</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={students.current_page}
          totalPages={students.last_page}
          onPageChange={(page) => Inertia.visit(`/students?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default StudentsIndex;
