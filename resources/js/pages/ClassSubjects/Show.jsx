import React from 'react';
import Sidebar from '../../Components/Sidebar';

const ClassSubjectsShow = ({ classSubject }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Class Subject Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Class ID:</strong> {classSubject.class_id}</div>
        <div><strong>Subject ID:</strong> {classSubject.subject_id}</div>
        <div><strong>Teacher ID:</strong> {classSubject.teacher_id}</div>
        <div><strong>Status:</strong> {classSubject.status}</div>
      </div>
    </div>
  </div>
);

export default ClassSubjectsShow;
