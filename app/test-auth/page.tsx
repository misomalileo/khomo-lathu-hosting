'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function TestAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setMessage('Trying to sign up...');
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Success! User ID: ' + data.user?.id + ' Check your email for confirmation!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-4">Direct Auth Test</h1>
      <div className="space-y-4 max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button 
          onClick={handleSignUp}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Sign Up Direct
        </button>
        {message && <pre className="text-sm mt-4 text-yellow-300">{message}</pre>}
      </div>
    </div>
  );
}