import React from 'react';

const SelectInput = ({ name, value, options, onChange }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  >
    <option value="">Select...</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export default SelectInput;
