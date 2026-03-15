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
        <div><strong>Start Date:</strong> {courseBatch.start_date}</div>
        <div><strong>End Date:</strong> {courseBatch.end_date}</div>
        <div><strong>Start Time:</strong> {courseBatch.start_time}</div>
        <div><strong>End Time:</strong> {courseBatch.end_time}</div>
      </div>
    </div>
  </div>
);

export default CourseBatchesShow;
