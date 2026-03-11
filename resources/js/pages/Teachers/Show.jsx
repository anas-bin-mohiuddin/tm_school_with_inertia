import React from 'react';
import Sidebar from '../../Components/Sidebar';

const TeachersShow = ({ teacher }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Teacher Profile</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Profile Photo:</strong> <img src={teacher.profile_photo} alt="Profile" className="w-16 h-16 rounded-full" /></div>
        <div><strong>Name:</strong> {teacher.name}</div>
        <div><strong>Designation:</strong> {teacher.designation}</div>
        <div><strong>Joining Date:</strong> {teacher.joining_date}</div>
        <div><strong>Qualification:</strong> {teacher.qualification}</div>
        <div><strong>Experience:</strong> {teacher.experience} years</div>
        <div><strong>Salary:</strong> ${teacher.salary}</div>
        <div><strong>Status:</strong> {teacher.status}</div>
      </div>
    </div>
  </div>
);

export default TeachersShow;
