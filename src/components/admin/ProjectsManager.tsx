'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiJson, uploadImage } from '@/lib/admin-api';

type Project = {
  _id: string;
  id?: string;
  title: string;
  category: string;
  img: string;
  live?: string;
  frontendCodeLink?: string;
  backendCodeLink?: string;
  technologies?: string[];
};

const empty = {
  title: '',
  category: 'Web Development',
  live: '',
  frontendCodeLink: '',
  backendCodeLink: '',
  technologies: '',
};

export default function ProjectsManager({
  fixedCategory,
  title,
  description,
  folder = 'projects',
  showLinks = true,
}: {
  fixedCategory?: string;
  title: string;
  description: string;
  folder?: string;
  showLinks?: boolean;
}) {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState({
    ...empty,
    category: fixedCategory || empty.category,
  });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const q = fixedCategory
      ? `?category=${encodeURIComponent(fixedCategory)}`
      : '';
    const json = await apiJson<{ data: Project[] }>(`/api/projects${q}`);
    let data = json.data || [];
    if (!fixedCategory) {
      data = data.filter(
        (p) =>
          !['Graphic Design', 'Figma Design', 'Logo Design'].includes(
            p.category
          )
      );
    }
    setItems(data);
  };

  useEffect(() => {
    load().catch((e) => setMessage(e.message));
  }, [fixedCategory]);

  const reset = () => {
    setForm({ ...empty, category: fixedCategory || empty.category });
    setFile(null);
    setEditingId(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!editingId && !file) throw new Error('Please choose an image');
      let img: string | undefined;
      if (file) img = await uploadImage(file, folder);

      const payload = {
        title: form.title,
        category: fixedCategory || form.category,
        live: form.live,
        frontendCodeLink: form.frontendCodeLink,
        backendCodeLink: form.backendCodeLink,
        technologies: form.technologies,
        ...(img ? { img } : {}),
      };

      if (editingId) {
        await apiJson(`/api/projects/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setMessage('Updated successfully');
      } else {
        await apiJson('/api/projects', {
          method: 'POST',
          body: JSON.stringify({ ...payload, img }),
        });
        setMessage('Created successfully');
      }
      reset();
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (p: Project) => {
    setEditingId(p._id);
    setForm({
      title: p.title || '',
      category: p.category || fixedCategory || 'Web Development',
      live: p.live || '',
      frontendCodeLink: p.frontendCodeLink || '',
      backendCodeLink: p.backendCodeLink || '',
      technologies: (p.technologies || []).join(', '),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await apiJson(`/api/projects/${id}`, { method: 'DELETE' });
      setMessage('Deleted');
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className='space-y-8 max-w-5xl'>
      <header>
        <h2 className='text-3xl font-semibold'>{title}</h2>
        <p className='text-zinc-400 mt-1'>{description}</p>
      </header>

      <form
        onSubmit={onSubmit}
        className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 grid gap-4 md:grid-cols-2'
      >
        <Field
          label='Title'
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
          required
        />
        {!fixedCategory && (
          <Field
            label='Category'
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
            required
          />
        )}
        {showLinks && (
          <>
            <Field
              label='Live URL'
              value={form.live}
              onChange={(v) => setForm({ ...form, live: v })}
            />
            <Field
              label='Technologies (comma separated)'
              value={form.technologies}
              onChange={(v) => setForm({ ...form, technologies: v })}
            />
            <Field
              label='Frontend code'
              value={form.frontendCodeLink}
              onChange={(v) => setForm({ ...form, frontendCodeLink: v })}
            />
            <Field
              label='Backend code'
              value={form.backendCodeLink}
              onChange={(v) => setForm({ ...form, backendCodeLink: v })}
            />
          </>
        )}
        <label className='md:col-span-2 block'>
          <span className='text-sm text-zinc-400'>Image</span>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='mt-1 block w-full text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-secondary/20 file:px-4 file:py-2 file:text-secondary'
          />
        </label>
        <div className='md:col-span-2 flex gap-3'>
          <button
            type='submit'
            disabled={loading}
            className='rounded-xl bg-secondary text-primary font-semibold px-5 py-2.5 disabled:opacity-60'
          >
            {loading ? 'Saving…' : editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type='button'
              onClick={reset}
              className='rounded-xl border border-zinc-700 px-5 py-2.5 text-zinc-300'
            >
              Cancel
            </button>
          )}
        </div>
        {message && <p className='md:col-span-2 text-sm text-zinc-300'>{message}</p>}
      </form>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => (
          <article
            key={item._id}
            className='rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/30'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.title}
              className='h-40 w-full object-cover'
            />
            <div className='p-4 space-y-2'>
              <h3 className='font-medium'>{item.title}</h3>
              <p className='text-xs text-zinc-500'>{item.category}</p>
              <div className='flex gap-2 pt-2'>
                <button
                  type='button'
                  onClick={() => onEdit(item)}
                  className='text-sm text-secondary'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => onDelete(item._id)}
                  className='text-sm text-red-400'
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className='block'>
      <span className='text-sm text-zinc-400'>{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-secondary'
      />
    </label>
  );
}
