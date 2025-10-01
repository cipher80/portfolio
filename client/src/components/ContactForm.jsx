import React, { useState } from 'react';
import { postContact } from '../services/api.js';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      const out = await postContact(form);
      if (out?.success) setStatus('Sent! I will get back to you soon.');
    } catch (err) {
      setStatus(err.message || 'Failed. Please check your details.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <div style={{display:'grid', gap:12}}>
        <input className="input" name="name" placeholder="Your Name" value={form.name} onChange={onChange} required minLength={2} />
        <input className="input" name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} required />
        <input className="input" name="mobile" placeholder="Mobile (digits only)" value={form.mobile} onChange={onChange} required pattern="^[0-9]{7,15}$" />
        <button className="button" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send'}</button>
        {status && <div aria-live="polite">{status}</div>}
      </div>
    </form>
  );
}
