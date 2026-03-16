import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const PaymentsIndex = ({ payments }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'student_name', label: 'Student' },
    { key: 'invoice_type', label: 'Invoice Type' },
    { key: 'amount_paid', label: 'Amount Paid' },
    { key: 'date', label: 'Date' },
    { key: 'payment_method', label: 'Method' },
    { key: 'transaction_id', label: 'Transaction ID' },
    { key: 'receiver_name', label: 'Received By' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => Inertia.visit(`/payments/${id}/edit`);

  const handleDelete = (id) => {
    if (confirm('Delete this payment?')) {
      Inertia.delete(`/payments/${id}`);
    }
  };

  const data = payments.data.map((p) => {
    const student = p.invoice?.enrollment?.student;
    return {
      ...p,
      student_name: student ? `${student.first_name} ${student.last_name}` : '—',
      invoice_type: p.invoice?.type ?? '—',
      receiver_name: p.receiver?.name ?? '—',
      actions: (
        <>
          <button onClick={() => handleEdit(p.id)} className="mr-2 text-blue-600">Edit</button>
          <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
        </>
      ),
    };
  });

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
