'use client';

import { useEffect, useRef } from 'react';
import { useForm } from '@formspree/react';

const CONFIRM_ENDPOINT = '/api/confirm-contact';

async function sendConfirmation({ name, email, company }) {
  const response = await fetch(CONFIRM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, company }),
  });

  if (!response.ok) {
    console.warn(
      'Confirmation email failed:',
      response.status,
      await response.text().catch(() => '')
    );
  }
}

export const useContactForm = (formId) => {
  const [state, handleSubmit] = useForm(formId);
  const pendingRef = useRef<{
    name: string;
    email: string;
    company: string;
  } | null>(null);

  useEffect(() => {
    if (!state.succeeded || !pendingRef.current) return;
    const payload = pendingRef.current;
    pendingRef.current = null;
    sendConfirmation(payload).catch(() => {});
  }, [state.succeeded]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    pendingRef.current = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      company: String(data.get('company') || '').trim(),
    };

    await handleSubmit(event);
    form.reset();
  };

  return { state, handleFormSubmit };
};
