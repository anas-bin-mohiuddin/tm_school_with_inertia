import React from 'react';
import Sidebar from '../../Components/Sidebar';

const SectionsShow = ({ section }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Section Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Class ID:</strong> {section.class_id}</div>
        <div><strong>Name:</strong> {section.name}</div>
        <div><strong>Status:</strong> {section.status}</div>
      </div>
    </div>
  </div>
);

export default SectionsShow;
