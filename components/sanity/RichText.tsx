import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/utils'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-relaxed text-stone-700">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight text-stone-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-stone-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-stone-900">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-brand-300 pl-4 italic text-stone-500">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 text-stone-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 text-stone-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={value?.blank ? '_blank' : undefined}
          rel={rel}
          className="text-brand-600 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-700"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="rounded bg-stone-100 px-1.5 py-0.5 text-sm font-mono text-stone-800">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <img
            src={urlFor(value as SanityImageSource).width(800).fit('max').auto('format').url()}
            alt={value.alt || ''}
            className="w-full rounded-xl"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      if (!value?.code) return null
      return (
        <pre className="my-6 overflow-x-auto rounded-xl bg-stone-900 p-4 text-sm text-stone-100">
          <code>{value.code}</code>
        </pre>
      )
    },
  },
}

interface RichTextProps {
  value: unknown
}

export default function RichText({ value }: RichTextProps) {
  return (
    <div className="prose-custom space-y-4">
      <PortableText value={value} components={components} />
    </div>
  )
}
