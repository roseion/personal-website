import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/ui/PostCard'
import Pagination from '@/components/ui/Pagination'
import { POSTS_PER_PAGE } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '博客',
  description: '最新文章列表',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const allPosts = await sanityFetch<any[]>({ query: postsQuery, tags: ['post'] })
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const posts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-text">博客</h1>
      {posts.length === 0 ? (
        <p className="text-text-muted">还没有文章，敬请期待。</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
        </>
      )}
    </div>
  )
}
