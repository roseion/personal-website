import { sanityFetch } from '@/sanity/lib/fetch'
import { postBySlugQuery, postsSitemapQuery } from '@/sanity/lib/queries'
import { urlFor, formatDate } from '@/lib/utils'
import TagBadge from '@/components/ui/TagBadge'
import RichText from '@/components/sanity/RichText'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({ query: postsSitemapQuery, tags: ['post'] })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<any>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: post.seo?.ogImage
      ? { images: [{ url: urlFor(post.seo.ogImage).width(1200).url() }] }
      : post.mainImage
      ? { images: [{ url: urlFor(post.mainImage).width(1200).url() }] }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<any>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">文章不存在</h1>
        <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-brand-600 hover:text-brand-700">
          <ChevronLeft size={16} /> 返回博客
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-brand-600"
      >
        <ChevronLeft size={16} /> 返回博客
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories?.map((cat: any) => (
            <TagBadge key={cat.slug} label={cat.title} href={`/categories/${cat.slug}`} variant="category" />
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-text-muted">{post.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
          {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag: any) => (
                <TagBadge key={tag.slug} label={tag.title} href={`/tags/${tag.slug}`} />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Cover image */}
      {post.mainImage && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={urlFor(post.mainImage as SanityImageSource).width(1024).fit('max').auto('format').url()}
            alt={post.mainImage.alt || post.title}
            className="w-full"
          />
        </div>
      )}

      {/* Body */}
      {post.body && <RichText value={post.body} />}
    </article>
  )
}
