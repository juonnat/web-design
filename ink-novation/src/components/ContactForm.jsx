import { useState } from 'react'
import { motion } from 'framer-motion'
import { studio } from '../data/content'

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: false },
  { name: 'idea', label: 'Tattoo Idea', type: 'textarea', required: true },
  { name: 'placement', label: 'Placement / Size', type: 'text', required: false },
  { name: 'style', label: 'Preferred Style', type: 'text', required: false },
  { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false },
]

const initialState = Object.fromEntries(fields.map((f) => [f.name, '']))

// Set VITE_FORM_ENDPOINT to a form service (Formspree et al) to have requests
// posted straight through. Without it the form falls back to opening the
// visitor's mail client, which is the zero-infrastructure stopgap.
const endpoint = import.meta.env.VITE_FORM_ENDPOINT

const mailtoHref = (values) => {
  const body = fields.map((f) => `${f.label}: ${values[f.name] || '—'}`).join('\n')
  const subject = encodeURIComponent(
    `New consultation request — ${values.name || 'Website'}`,
  )
  return `mailto:${studio.email}?subject=${subject}&body=${encodeURIComponent(body)}`
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!endpoint) {
      window.location.href = mailtoHref(values)
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`form endpoint returned ${res.status}`)
      setValues(initialState)
      setStatus('sent')
    } catch {
      // A failed post must not swallow the lead - the error state hands the
      // visitor the same mailto the no-endpoint build uses.
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-muted"
          >
            {field.label}
            {field.required && <span className="text-ink-accent-light"> *</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              value={values[field.name]}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-white/15 bg-ink-black px-4 py-3 text-sm text-ink-cream outline-none transition-colors duration-200 focus:border-ink-accent-light"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              value={values[field.name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-ink-black px-4 py-3 text-sm text-ink-cream outline-none transition-colors duration-200 focus:border-ink-accent-light"
            />
          )}
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={status === 'sending' ? undefined : { scale: 1.03, boxShadow: '0 0 24px rgba(45,212,191,0.4)' }}
        whileTap={status === 'sending' ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full rounded-full bg-ink-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-black disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Consultation Request'}
      </motion.button>

      {status === 'sent' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-ink-accent-light"
          role="status"
        >
          {endpoint
            ? 'Thanks — your request is in. We’ll reply as soon as we can.'
            : 'Opening your email app to send this along — we’ll reply as soon as we can.'}
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-ink-cream"
          role="alert"
        >
          That didn&rsquo;t go through.{' '}
          <a href={mailtoHref(values)} className="text-ink-accent-light underline">
            Send it as an email instead
          </a>{' '}
          and nothing is lost.
        </motion.p>
      )}

      <p className="text-center text-xs text-ink-muted/70">
        {endpoint ? 'Prefer to chat? DM ' : 'This form opens an email to us — for the fastest response, DM '}
        <a href={studio.instagramHref} target="_blank" rel="noreferrer" className="text-ink-accent-light">
          {studio.instagramHandle}
        </a>
        .
      </p>
    </form>
  )
}
