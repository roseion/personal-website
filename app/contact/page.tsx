import ContactForm from '@/components/ContactForm'
import { Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '联系',
  description: '与我取得联系',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-text">联系我</h1>
      <p className="mb-10 text-text-muted">
        有任何问题或想法？给我留言吧。
      </p>

      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface-card p-5 shadow-soft">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
              <Mail size={16} className="text-brand-600" /> 邮箱
            </h3>
            <a
              href="mailto:hello@example.com"
              className="text-sm text-brand-600 transition-colors hover:text-brand-700"
            >
              hello@example.com
            </a>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 shadow-soft">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
              <svg
                className="h-4 w-4 text-brand-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              社交
            </h3>
            <p className="text-sm text-text-muted">GitHub / Twitter 链接见页脚。</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
