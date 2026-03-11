import React from 'react';
import Sidebar from '../../Components/Sidebar';

const InvoicesShow = ({ invoice }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Invoice Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Enrollment ID:</strong> {invoice.enrollment_id}</div>
        <div><strong>Type:</strong> {invoice.type}</div>
        <div><strong>Amount:</strong> {invoice.amount}</div>
        <div><strong>Status:</strong> {invoice.status}</div>
      </div>
    </div>
  </div>
);

export default InvoicesShow;
