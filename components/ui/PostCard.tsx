import Link from 'next/link'
import { urlFor } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { SanityImageSource } from '@sanity/image-url'

interface PostCardProps {
  title: string
  slug: string
  excerpt?: string | null
  mainImage?: SanityImageSource | null
  publishedAt?: string | null
  tags?: { title: string; slug: string }[] | null
}

export default function PostCard({ title, slug, excerpt, mainImage, publishedAt, tags }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-soft transition-all duration-300 hover:shadow-card">
        {mainImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={urlFor(mainImage).width(600).height(338).url()}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold leading-snug text-text transition-colors group-hover:text-brand-600">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <time className="mt-3 block text-xs text-text-muted">{formatDate(publishedAt)}</time>
          )}
        </div>
      </article>
    </Link>
  )
}
