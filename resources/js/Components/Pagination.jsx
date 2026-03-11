import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-4">
    <button
      className="px-3 py-1 mx-1 bg-gray-200 rounded"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </button>
    <span className="px-3 py-1 mx-1">Page {currentPage} of {totalPages}</span>
    <button
      className="px-3 py-1 mx-1 bg-gray-200 rounded"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
);

export default Pagination;
