import React from 'react';
import Sidebar from '../../Components/Sidebar';

const CourseBatchesShow = ({ courseBatch }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Course Batch Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Course ID:</strong> {courseBatch.course_id}</div>
        <div><strong>Name:</strong> {courseBatch.name}</div>
        <div><strong>Status:</strong> {courseBatch.status}</div>
      </div>
    </div>
  </div>
);

export default CourseBatchesShow;
