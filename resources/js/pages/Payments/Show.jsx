import React from 'react';
import Sidebar from '../../Components/Sidebar';

const PaymentsShow = ({ payment }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
      <div className="space-y-3 bg-gray-50 rounded-xl p-6 shadow">
        <div><strong>Invoice ID:</strong> {payment.invoice_id}</div>
        <div><strong>User ID:</strong> {payment.user_id}</div>
        <div><strong>Amount:</strong> {payment.amount}</div>
        <div><strong>Status:</strong> {payment.status}</div>
      </div>
    </div>
  </div>
);

export default PaymentsShow;
