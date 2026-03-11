import React, { useState } from 'react';
import Sidebar from './Sidebar';

const TopNav = ({ open, setOpen }) => (
  <header className="bg-white shadow flex items-center justify-between px-4 py-3 md:ml-64">
    <button
      className="md:hidden text-gray-500 focus:outline-none"
      aria-label="Open sidebar"
      onClick={() => setOpen(true)}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
    </button>
    <span className="font-bold text-lg text-blue-700">School Manager</span>
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Admin</span>
      <img src="/avatar.png" alt="Profile" className="w-8 h-8 rounded-full" />
    </div>
  </header>
);

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="md:ml-64">
        <TopNav open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="p-4 md:p-8 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
