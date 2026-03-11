import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <button className="absolute top-2 right-2" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
