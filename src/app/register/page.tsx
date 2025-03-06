'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (res.ok) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed');
        toast.error(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#667eea] to-[#764ba2] p-5">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-5 text-black">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2.5 mb-4 rounded border border-gray-300 text-base outline-none focus:border-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2.5 mb-4 rounded border border-gray-300 text-base outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2.5 mb-4 rounded border border-gray-300 text-base outline-none focus:border-black"
          />
          <button 
            type="submit" 
            className="p-2.5 rounded bg-black text-white text-base cursor-pointer hover:bg-gray-800"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500 mt-2.5 text-sm">{error}</p>}
        <p className="mt-4 text-black">
          Already have an account?{' '}
          <Link href="/login" className="text-[#667eea] hover:underline">
            Login here
          </Link>
        </p>
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

export default Register;