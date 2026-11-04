import { useState } from 'react';
import { actions, isInputError } from 'astro:actions';
import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';
import { Turnstile } from '@marsidev/react-turnstile';
import { SoundButton } from './SoundButton';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await actions.contact(new FormData(e.currentTarget));
    if (error) {
      setStatus('error');
      setMessage(isInputError(error) ? Object.values(error.fields).flat().join(' ') : error.message);
      return;
    }
    setStatus('sent');
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-4 rounded-xl border border-gray bg-ink-panel p-5 sm:p-8">
      <label className="flex flex-col gap-1.5 font-display text-xs">
        Your email
        <input name="email" type="email" required autoComplete="email" className="h-11 rounded-md border border-gray bg-ink-0 px-3 font-sans text-base focus:border-electro-green focus:outline-none" />
      </label>
      <label className="flex flex-col gap-1.5 font-display text-xs">
        Message
        <textarea name="message" required minLength={10} rows={6} className="rounded-md border border-gray bg-ink-0 p-3 font-sans text-base focus:border-electro-green focus:outline-none" />
      </label>
      <label className="flex items-center gap-2 text-sm font-light">
        <input name="sendCopy" type="checkbox" className="size-5 accent-electro-green" /> Send me a copy
      </label>
      {/* Adds a hidden cf-turnstile-response input to the form */}
      <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} options={{ theme: 'dark', size: 'flexible' }} />
      <SoundButton type="submit" variant="electro" size="touch" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </SoundButton>
      <p role="status" className={status === 'error' ? 'text-electro-red' : 'text-electro-green'}>
        {status === 'sent' ? 'Message sent. Thanks!' : status === 'error' ? message : ''}
      </p>
    </form>
  );
}