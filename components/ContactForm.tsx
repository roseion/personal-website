'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    // Using formsubmit.co for demo - replace with your service
    await fetch('https://formsubmit.co/ajax/hello@example.com', {
      method: 'POST',
      body: data,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-surface-card p-8 text-center shadow-soft">
        <p className="text-lg font-medium text-text">感谢您的留言！</p>
        <p className="mt-2 text-sm text-text-muted">我会尽快回复您。</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          姓名
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1.5 block w-full rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm text-text placeholder-stone-400 shadow-soft transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="您的姓名"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          邮箱
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1.5 block w-full rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm text-text placeholder-stone-400 shadow-soft transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text">
          留言
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          required
          className="mt-1.5 block w-full rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm text-text placeholder-stone-400 shadow-soft transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="在这里写下您的留言..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100"
      >
        <Send size={16} />
        发送留言
      </button>
    </form>
  )
}
