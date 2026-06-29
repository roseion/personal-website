import { sanityFetch } from '@/sanity/lib/fetch'
import { tagBySlugQuery, postsByTagQuery, tagsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/ui/PostCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await sanityFetch<{ slug: string }[]>({ query: tagsQuery, tags: ['tag'] })
  return tags.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = await sanityFetch<any>({ query: tagBySlugQuery, params: { slug }, tags: ['tag'] })
  if (!tag) return {}
  return { title: `#${tag.title}` }
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const [tag, posts] = await Promise.all([
    sanityFetch<any>({ query: tagBySlugQuery, params: { slug }, tags: ['tag'] }),
    sanityFetch<any[]>({ query: postsByTagQuery, params: { slug }, tags: ['post', 'tag'] }),
  ])

  if (!tag) notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-brand-600"
      >
        <ChevronLeft size={16} /> 返回博客
      </Link>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-text">
        #<span className="text-brand-600">{tag.title}</span>
      </h1>

      {posts.length === 0 ? (
        <p className="text-text-muted">该标签下还没有文章。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      )}
    </div>
  )
}
