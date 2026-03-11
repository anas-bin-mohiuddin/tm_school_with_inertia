import React from 'react';
import Sidebar from '../../Components/Sidebar';

const EnrollmentsShow = ({ enrollment }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Enrollment Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Student ID:</strong> {enrollment.student_id}</div>
        <div><strong>Type:</strong> {enrollment.type}</div>
        <div><strong>Class ID:</strong> {enrollment.class_id}</div>
        <div><strong>Section ID:</strong> {enrollment.section_id}</div>
        <div><strong>Course Batch ID:</strong> {enrollment.course_batch_id}</div>
        <div><strong>Roll Number:</strong> {enrollment.roll_number}</div>
        <div><strong>Academic Session ID:</strong> {enrollment.academic_session_id}</div>
      </div>
    </div>
  </div>
);

export default EnrollmentsShow;
