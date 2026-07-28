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

export default function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = fields
      .map((f) => `${f.label}: ${values[f.name] || '—'}`)
      .join('\n')
    const subject = encodeURIComponent(`New consultation request — ${values.name || 'Website'}`)
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
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
        whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(45,212,191,0.4)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full rounded-full bg-ink-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-black"
      >
        Send Consultation Request
      </motion.button>

      {submitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-ink-accent-light"
        >
          Opening your email app to send this along — we&rsquo;ll reply as soon as we can.
        </motion.p>
      )}

      <p className="text-center text-xs text-ink-muted/70">
        This form opens an email to us — for the fastest response, DM{' '}
        <a href={studio.instagramHref} target="_blank" rel="noreferrer" className="text-ink-accent-light">
          {studio.instagramHandle}
        </a>{' '}
        or call {studio.phone}.
      </p>
    </form>
  )
}
