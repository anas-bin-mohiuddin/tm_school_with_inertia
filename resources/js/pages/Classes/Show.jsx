import React from 'react';
import Sidebar from '../../Components/Sidebar';

const ClassesShow = ({ classItem }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Class Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Name:</strong> {classItem.name}</div>
        <div><strong>Status:</strong> {classItem.status}</div>
      </div>
    </div>
  </div>
);

export default ClassesShow;
