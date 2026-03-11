import React from 'react';

const Table = ({ columns, data }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="bg-white">
          {columns.map((col) => (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
