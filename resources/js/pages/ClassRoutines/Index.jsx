import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const DAY_NAMES = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

const ClassRoutinesIndex = ({ classRoutines }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'class_name', label: 'Class' },
    { key: 'section_name', label: 'Section' },
    { key: 'subject_name', label: 'Subject' },
    { key: 'teacher_name', label: 'Teacher' },
    { key: 'day_name', label: 'Day' },
    { key: 'start_time', label: 'Start' },
    { key: 'end_time', label: 'End' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/class-routines/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this routine?')) {
      Inertia.delete(`/class-routines/${id}`);
    }
  };

  const data = classRoutines.data.map((cr) => ({
    ...cr,
    class_name: cr.class?.name ?? '—',
    section_name: cr.section?.name ?? '—',
    subject_name: cr.subject?.name ?? '—',
    teacher_name: cr.teacher?.name ?? '—',
    day_name: cr.day ? (DAY_NAMES[cr.day] ?? '—') : '—',
    actions: (
      <>
        <button onClick={() => handleEdit(cr.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(cr.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Class Routines</h1>
          <button
            onClick={() => Inertia.visit('/class-routines/create')}
            className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition"
          >
            + Add Routine
          </button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={classRoutines.current_page}
          totalPages={classRoutines.last_page}
          onPageChange={(page) => Inertia.visit(`/class-routines?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default ClassRoutinesIndex;
