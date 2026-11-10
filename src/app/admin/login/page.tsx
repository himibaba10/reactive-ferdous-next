'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Login failed');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-zinc-950 flex items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl'>
        <p className='text-xs uppercase tracking-[0.2em] text-secondary mb-2'>
          Admin
        </p>
        <h1 className='text-3xl font-semibold text-white mb-2'>Sign in</h1>
        <p className='text-zinc-400 mb-8 text-sm'>
          One admin account. JWT session stored in an httpOnly cookie.
        </p>

        <form onSubmit={onSubmit} className='space-y-4'>
          <label className='block'>
            <span className='text-sm text-zinc-400'>Email</span>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-secondary'
            />
          </label>
          <label className='block'>
            <span className='text-sm text-zinc-400'>Password</span>
            <input
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-secondary'
            />
          </label>

          {error && (
            <p className='text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg px-3 py-2'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-secondary text-primary font-semibold py-3 hover:brightness-95 disabled:opacity-60'
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
