import React from 'react';
import Sidebar from '../../Components/Sidebar';

function DashboardCard({ color, icon, label, value }) {
  const colorMap = {
    blue: 'bg-blue-200 group-hover:bg-blue-300',
    green: 'bg-green-200 group-hover:bg-green-300',
    yellow: 'bg-yellow-200 group-hover:bg-yellow-300',
    purple: 'bg-purple-200 group-hover:bg-purple-300',
    pink: 'bg-pink-200 group-hover:bg-pink-300',
    indigo: 'bg-indigo-200 group-hover:bg-indigo-300',
    red: 'bg-red-200 group-hover:bg-red-300',
    gray: 'bg-gray-200 group-hover:bg-gray-300',
  };
  return (
    <div
      className={`group ${colorMap[color]} p-6 rounded-xl shadow-lg flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-${color}-400`} 
      aria-label={label}
      tabIndex={0}
    >
      <div className="mb-2" aria-hidden="true">{icon}</div>
      <div className="text-lg font-semibold text-gray-700">{label}</div>
      <div className={`text-3xl font-extrabold text-${color}-700 mt-2`}>{value}</div>
    </div>
  );
}

const DashboardIndex = ({ stats }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">Welcome to School Manager</h1>
          <p className="text-gray-500 mt-1">Your centralized dashboard overview</p>
        </div>
        <form method="POST" action="/logout">
          <input type="hidden" name="_token" value={window.Laravel?.csrfToken || ''} />
          <button onClick={() => Inertia.post('/logout')} className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold shadow transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Dashboard cards with icons, hover, ARIA, transitions */}
        {/* Schools: office building */}
        <DashboardCard color="blue" icon={<svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} label="Schools" value={stats.schools} />
        {/* Students: user group */}
        <DashboardCard color="green" icon={<svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} label="Students" value={stats.students} />
        {/* Teachers: academic cap */}
        <DashboardCard color="yellow" icon={<svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>} label="Teachers" value={stats.teachers} />
        {/* Classes: book open */}
        <DashboardCard color="purple" icon={<svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} label="Classes" value={stats.classes} />
        {/* Courses: archive/collection */}
        <DashboardCard color="pink" icon={<svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} label="Courses" value={stats.courses} />
        {/* Enrollments: clipboard list */}
        <DashboardCard color="indigo" icon={<svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} label="Enrollments" value={stats.enrollments} />
        {/* Invoices: document text */}
        <DashboardCard color="red" icon={<svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} label="Invoices" value={stats.invoices} />
        {/* Payments: credit card */}
        <DashboardCard color="gray" icon={<svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} label="Payments" value={stats.payments} />
      </div>
    </div>
  </div>
);

export default DashboardIndex;
