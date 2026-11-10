'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiJson, uploadImage } from '@/lib/admin-api';

type Logo = { _id: string; imgUrl: string };

export default function LogosManager() {
  const [items, setItems] = useState<Logo[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const json = await apiJson<{ data: Logo[] }>('/api/logos');
    setItems(json.data || []);
  };

  useEffect(() => {
    load().catch((e) => setMessage(e.message));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage('');
    try {
      const imgUrl = await uploadImage(file, 'logos');
      await apiJson('/api/logos', {
        method: 'POST',
        body: JSON.stringify({ imgUrl }),
      });
      setFile(null);
      setMessage('Logo added');
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this logo?')) return;
    await apiJson(`/api/logos/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className='space-y-8 max-w-4xl'>
      <header>
        <h2 className='text-3xl font-semibold'>Partner Logos</h2>
        <p className='text-zinc-400 mt-1'>
          Logos in the homepage “Trusted by” slider.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-wrap items-end gap-4'
      >
        <label className='block'>
          <span className='text-sm text-zinc-400'>Logo image</span>
          <input
            type='file'
            accept='image/*'
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='mt-1 block'
          />
        </label>
        <button
          type='submit'
          disabled={loading}
          className='rounded-xl bg-secondary text-primary font-semibold px-5 py-2.5'
        >
          {loading ? 'Uploading…' : 'Add logo'}
        </button>
        {message && <p className='w-full text-sm text-zinc-300'>{message}</p>}
      </form>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {items.map((logo) => (
          <div
            key={logo._id}
            className='rounded-xl border border-zinc-800 p-4 bg-zinc-900/30'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.imgUrl}
              alt=''
              className='h-16 w-full object-contain'
            />
            <button
              type='button'
              onClick={() => onDelete(logo._id)}
              className='mt-3 text-sm text-red-400'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
