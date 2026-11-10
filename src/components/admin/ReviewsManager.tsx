'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiJson, uploadImage } from '@/lib/admin-api';

type Review = {
  _id: string;
  quote?: string;
  author?: string;
  role?: string;
  rating?: number | null;
  img?: string;
};

export default function ReviewsManager() {
  const [items, setItems] = useState<Review[]>([]);
  const [form, setForm] = useState({
    quote: '',
    author: '',
    role: '',
    rating: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const json = await apiJson<{ data: Review[] }>('/api/reviews');
    setItems(json.data || []);
  };

  useEffect(() => {
    load().catch((e) => setMessage(e.message));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!form.quote.trim() && !file) {
        throw new Error('Add a quote, an image, or both');
      }
      const img = file ? await uploadImage(file, 'reviews') : undefined;
      await apiJson('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          rating: form.rating || null,
          ...(img ? { img } : {}),
        }),
      });
      setForm({ quote: '', author: '', role: '', rating: '' });
      setFile(null);
      setMessage('Review added');
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    await apiJson(`/api/reviews/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className='space-y-8 max-w-4xl'>
      <header>
        <h2 className='text-3xl font-semibold'>Client Reviews</h2>
        <p className='text-zinc-400 mt-1'>Testimonials shown on the homepage.</p>
      </header>

      <form
        onSubmit={onSubmit}
        className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4'
      >
        <label className='block'>
          <span className='text-sm text-zinc-400'>Quote</span>
          <textarea
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            rows={4}
            className='mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-secondary'
          />
        </label>
        <div className='grid md:grid-cols-3 gap-4'>
          <input
            placeholder='Author'
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className='rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5'
          />
          <input
            placeholder='Role'
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className='rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5'
          />
          <input
            placeholder='Rating (1-5)'
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className='rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5'
          />
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type='submit'
          disabled={loading}
          className='rounded-xl bg-secondary text-primary font-semibold px-5 py-2.5'
        >
          {loading ? 'Saving…' : 'Add review'}
        </button>
        {message && <p className='text-sm text-zinc-300'>{message}</p>}
      </form>

      <div className='space-y-3'>
        {items.map((r) => (
          <div
            key={r._id}
            className='rounded-xl border border-zinc-800 p-4 flex gap-4 items-start'
          >
            {r.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.img} alt='' className='w-16 h-16 rounded-lg object-cover' />
            )}
            <div className='flex-1'>
              <p className='text-zinc-200'>{r.quote || '(image review)'}</p>
              <p className='text-sm text-zinc-500 mt-1'>
                {r.author}
                {r.role ? ` · ${r.role}` : ''}
              </p>
            </div>
            <button
              type='button'
              onClick={() => onDelete(r._id)}
              className='text-sm text-red-400'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
