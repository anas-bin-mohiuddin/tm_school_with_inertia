import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const PaymentsIndex = ({ payments }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'invoice_id', label: 'Invoice ID' },
    { key: 'user_id', label: 'Received By (User ID)' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => {
    Inertia.visit(`/payments/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete payment?')) {
      Inertia.delete(`/payments/${id}`);
    }
  };

  const data = payments.data.map((payment) => ({
    ...payment,
    actions: (
      <>
        <button onClick={() => handleEdit(payment.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(payment.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Payments</h1>
          <button onClick={() => Inertia.visit('/payments/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Payment</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={payments.current_page}
          totalPages={payments.last_page}
          onPageChange={(page) => Inertia.visit(`/payments?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default PaymentsIndex;
