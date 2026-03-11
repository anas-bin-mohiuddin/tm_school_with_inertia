import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const ClassesIndex = ({ classes }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/classes/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete class?')) {
      Inertia.delete(`/classes/${id}`);
    }
  };

  const data = classes.data.map((classItem) => ({
    ...classItem,
    actions: (
      <>
        <button onClick={() => handleEdit(classItem.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(classItem.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Classes</h1>
          <button onClick={() => Inertia.visit('/classes/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Class</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={classes.current_page}
          totalPages={classes.last_page}
          onPageChange={(page) => Inertia.visit(`/classes?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default ClassesIndex;
