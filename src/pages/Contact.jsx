import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Inquiry from ${form.name || 'the DGC website'}`,
    )
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    )
    window.location.href = `mailto:contact@dgc.ph?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s start a conversation."
        lead="Whether you’re a founder, a co-investor, or simply curious about our work — we read every message."
      />

      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Side info */}
            <aside className="md:col-span-4">
              <div className="reveal rounded-2xl border border-forest-900/10 bg-white p-8">
                <p className="text-[11px] tracking-[0.22em] uppercase text-forest-700">
                  Direct
                </p>
                <a
                  href="mailto:contact@dgc.ph"
                  className="mt-4 block font-display text-3xl font-medium tracking-tight text-forest-900 hover:text-forest-700 transition-colors"
                >
                  contact@dgc.ph
                </a>
                <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-500">
                  <div>
                    <p className="text-[11px] tracking-[0.22em] uppercase text-ink-400">
                      Office
                    </p>
                    <p className="mt-2 text-forest-900">Manila, Philippines</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] uppercase text-ink-400">
                      For founders
                    </p>
                    <p className="mt-2">
                      Send us a short note about what you’re building and the
                      stage you’re at — a deck is welcome but not required.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="md:col-span-8">
              <form
                onSubmit={onSubmit}
                className="reveal space-y-8 rounded-2xl border border-forest-900/10 bg-white p-8 sm:p-12"
              >
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />
                <Field
                  label="Message"
                  name="message"
                  as="textarea"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  required
                />

                <div className="flex flex-col items-start gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-ink-400">
                    Submitting opens your email client to send a draft to{' '}
                    <span className="text-forest-900">contact@dgc.ph</span>.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700"
                  >
                    Send message
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, as = 'input', type = 'text', rows, ...rest }) {
  const Tag = as
  const baseInput =
    'w-full border-0 border-b border-forest-900/15 bg-transparent px-0 py-3 text-[16px] text-forest-900 placeholder:text-ink-400 focus:border-forest-800 focus:outline-none focus:ring-0 transition-colors'
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.22em] uppercase text-ink-400">
        {label}
      </span>
      <Tag
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        className={`${baseInput} ${as === 'textarea' ? 'resize-none' : ''} mt-2`}
        {...rest}
      />
    </label>
  )
}
