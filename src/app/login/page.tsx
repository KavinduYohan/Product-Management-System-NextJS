'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token); // Save the token
        toast.success('Login successful! Redirecting...'); 
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); 
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
        toast.error(data.error || 'Login failed'); 
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred. Please try again.'); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#667eea] to-[#764ba2] p-5">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-5 text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="p-2.5 mb-4 rounded border border-gray-300 text-base outline-none transition-colors duration-300 focus:border-[#667eea]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="p-2.5 mb-4 rounded border border-gray-300 text-base outline-none transition-colors duration-300 focus:border-[#667eea]"
          />
          <button 
            type="submit" 
            className="p-2.5 rounded bg-[#667eea] text-white text-base cursor-pointer transition-colors duration-300 hover:bg-[#5a6ecb]"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2.5 text-sm">{error}</p>}
        <p className="mt-4 text-sm text-gray-600">New user? <a href="/register" className="text-[#667eea] hover:underline">Register here</a></p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;