import Link from 'next/link'
import { urlFor } from '@/lib/utils'
import type { SanityImageSource } from '@sanity/image-url'

interface ProjectCardProps {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: SanityImageSource | null
  technologies?: string[] | null
}

export default function ProjectCard({ title, slug, excerpt, coverImage, technologies }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-soft transition-all duration-300 hover:shadow-card">
        {coverImage && (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={urlFor(coverImage).width(600).height(450).url()}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold leading-snug text-text transition-colors group-hover:text-brand-600">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
              {excerpt}
            </p>
          )}
          {technologies && technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
