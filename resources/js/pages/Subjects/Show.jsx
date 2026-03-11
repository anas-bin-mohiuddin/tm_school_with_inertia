import React from 'react';
import Sidebar from '../../Components/Sidebar';

const SubjectsShow = ({ subject }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Subject Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Name:</strong> {subject.name}</div>
        <div><strong>Status:</strong> {subject.status}</div>
      </div>
    </div>
  </div>
);

export default SubjectsShow;
