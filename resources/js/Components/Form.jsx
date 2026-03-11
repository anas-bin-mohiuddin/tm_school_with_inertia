import React from 'react';

const Form = ({ fields, values, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {fields.map((field) => (
      <div key={field.name}>
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
        <input
          type={field.type || 'text'}
          name={field.name}
          value={values[field.name] || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    ))}
    {children}
  </form>
);

export default Form;
