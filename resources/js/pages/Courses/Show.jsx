import React from 'react';
import Sidebar from '../../Components/Sidebar';

const CoursesShow = ({ course }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Course Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Name:</strong> {course.name}</div>
      </div>
    </div>
  </div>
);

export default CoursesShow;
