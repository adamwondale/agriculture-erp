'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Sign in to Agriculture ERP</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="user@agrierp.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
}
