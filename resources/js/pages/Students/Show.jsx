import React from 'react';
import Sidebar from '../../Components/Sidebar';
import { Inertia } from '@inertiajs/inertia';

const StudentsShow = ({ student }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student Profile</h1>
        <button onClick={() => Inertia.visit(`/students/${student.id}/edit`)} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">Edit</button>
      </div>
      <div className="">
        <div><strong>Name:</strong> {student.first_name} {student.last_name}</div>
        <div><strong>Address:</strong> {student.address}</div>
      </div>
    </div>
  </div>
);

export default StudentsShow;
