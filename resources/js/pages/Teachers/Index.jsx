import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const TeachersIndex = ({ teachers }) => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'joining_date', label: 'Joining Date' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'profile_photo', label: 'Profile Photo' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/teachers/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete teacher?')) {
      Inertia.delete(`/teachers/${id}`);
    }
  };

  const data = teachers.data.map((teacher) => ({
    ...teacher,
    actions: (
      <>
        <button onClick={() => handleEdit(teacher.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(teacher.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Teachers</h1>
          <button onClick={() => Inertia.visit('/teachers/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Teacher</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={teachers.current_page}
          totalPages={teachers.last_page}
          onPageChange={(page) => Inertia.visit(`/teachers?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default TeachersIndex;
