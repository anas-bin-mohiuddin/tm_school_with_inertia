import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/login', values, {
      onError: (errors) => setError(errors.email || errors.password || 'Invalid credentials'),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <img src="/logo.png" alt="School ERP Logo" className="h-16 mx-auto mb-2" />
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">School ERP Login</h2>
          <p className="text-gray-500 text-center">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-lg transition">Login</button>
        </form>
        <div className="mt-6 text-sm text-gray-500 text-center">
          <span>Forgot your password?</span> <a href="/forgot-password" className="text-blue-600 hover:underline">Reset it</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
