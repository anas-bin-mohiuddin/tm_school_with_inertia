import React from 'react';
import Sidebar from '../../Components/Sidebar';

const BatchTeachersShow = ({ batchTeacher }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Batch Teacher Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Course Batch ID:</strong> {batchTeacher.course_batch_id}</div>
        <div><strong>Teacher ID:</strong> {batchTeacher.teacher_id}</div>
        <div><strong>Status:</strong> {batchTeacher.status}</div>
      </div>
    </div>
  </div>
);

export default BatchTeachersShow;
