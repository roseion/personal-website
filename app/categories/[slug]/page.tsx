import { sanityFetch } from '@/sanity/lib/fetch'
import { categoryBySlugQuery, postsByCategoryQuery, categoriesQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/ui/PostCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await sanityFetch<{ slug: string }[]>({ query: categoriesQuery, tags: ['category'] })
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await sanityFetch<any>({ query: categoryBySlugQuery, params: { slug }, tags: ['category'] })
  if (!category) return {}
  return { title: `${category.title} - 分类`, description: category.description }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, posts] = await Promise.all([
    sanityFetch<any>({ query: categoryBySlugQuery, params: { slug }, tags: ['category'] }),
    sanityFetch<any[]>({ query: postsByCategoryQuery, params: { slug }, tags: ['post', 'category'] }),
  ])

  if (!category) notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-brand-600"
      >
        <ChevronLeft size={16} /> 返回博客
      </Link>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-text">{category.title}</h1>
      {category.description && <p className="mb-8 text-text-muted">{category.description}</p>}

      {posts.length === 0 ? (
        <p className="text-text-muted">该分类下还没有文章。</p>
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
