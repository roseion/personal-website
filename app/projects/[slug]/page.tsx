import { sanityFetch } from '@/sanity/lib/fetch'
import { projectBySlugQuery, projectsSitemapQuery } from '@/sanity/lib/queries'
import { urlFor, formatDate } from '@/lib/utils'
import RichText from '@/components/sanity/RichText'
import Link from 'next/link'
import { ChevronLeft, ExternalLink, CodeXml } from 'lucide-react'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: projectsSitemapQuery, tags: ['project'] })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<any>({ query: projectBySlugQuery, params: { slug }, tags: ['project'] })

  if (!project) return {}

  return {
    title: project.title,
    description: project.excerpt || project.title,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await sanityFetch<any>({ query: projectBySlugQuery, params: { slug }, tags: ['project'] })

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">项目不存在</h1>
        <Link href="/projects" className="mt-4 inline-flex items-center gap-1 text-brand-600">
          <ChevronLeft size={16} /> 返回项目
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-brand-600"
      >
        <ChevronLeft size={16} /> 返回项目
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{project.title}</h1>
        {project.excerpt && <p className="mt-4 text-lg text-text-muted">{project.excerpt}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {project.publishedAt && (
            <time className="text-sm text-text-muted">{formatDate(project.publishedAt)}</time>
          )}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-text-muted">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              <ExternalLink size={16} /> 在线体验
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-stone-50"
            >
              <CodeXml size={16} /> 源码
            </a>
          )}
        </div>
      </header>

      {project.coverImage && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={urlFor(project.coverImage as SanityImageSource).width(1024).fit('max').auto('format').url()}
            alt={project.coverImage.alt || project.title}
            className="w-full"
          />
        </div>
      )}

      {project.description && <RichText value={project.description} />}

      {project.gallery?.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((img: any, i: number) => (
            <img
              key={i}
              src={urlFor(img as SanityImageSource).width(600).fit('max').auto('format').url()}
              alt={img.alt || `${project.title} ${i + 1}`}
              className="w-full rounded-xl"
            />
          ))}
        </div>
      )}
    </article>
  )
}
