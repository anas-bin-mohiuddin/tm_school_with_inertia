import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import { Inertia } from '@inertiajs/inertia';

const STATUS_BADGE = {
  paid:    'bg-green-100 text-green-800',
  unpaid:  'bg-red-100 text-red-800',
  partial: 'bg-yellow-100 text-yellow-800',
};

const InvoicesIndex = ({ invoices }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'student_name', label: 'Student' },
    { key: 'enrollment_type', label: 'Enrollment' },
    { key: 'type', label: 'Invoice Type' },
    { key: 'billing_term', label: 'Billing Term' },
    { key: 'total_amount', label: 'Amount' },
    { key: 'status_badge', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleEdit = (id) => Inertia.visit(`/invoices/${id}/edit`);

  const handleDelete = (id) => {
    if (confirm('Delete this invoice?')) {
      Inertia.delete(`/invoices/${id}`);
    }
  };

  const data = invoices.data.map((inv) => ({
    ...inv,
    student_name: inv.enrollment?.student
      ? `${inv.enrollment.student.first_name} ${inv.enrollment.student.last_name}`
      : '—',
    enrollment_type: inv.enrollment?.type ?? '—',
    status_badge: (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[inv.status] ?? 'bg-gray-100 text-gray-600'}`}>
        {inv.status}
      </span>
    ),
    actions: (
      <>
        <button onClick={() => handleEdit(inv.id)} className="mr-2 text-blue-600">Edit</button>
        <button onClick={() => handleDelete(inv.id)} className="text-red-600">Delete</button>
      </>
    ),
  }));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <button onClick={() => Inertia.visit('/invoices/create')} className="px-4 py-2 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">+ Create Invoice</button>
        </div>
        <Table columns={columns} data={data} />
        <Pagination
          currentPage={invoices.current_page}
          totalPages={invoices.last_page}
          onPageChange={(page) => Inertia.visit(`/invoices?page=${page}`)}
        />
      </div>
    </div>
  );
};

export default InvoicesIndex;
