import { sanityFetch } from '@/sanity/lib/fetch'
import { featuredPostsQuery, featuredProjectsQuery, settingsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/ui/PostCard'
import ProjectCard from '@/components/ui/ProjectCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const posts = await sanityFetch<any[]>({ query: featuredPostsQuery, tags: ['post'] })
  const projects = await sanityFetch<any[]>({ query: featuredProjectsQuery, tags: ['project'] })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          你好，我是
          <span className="block text-brand-600">Eosin</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
          这里是我分享技术、思考和作品的地方。通过文字记录学习，用项目探索可能。
        </p>
      </section>

      {/* Featured Posts */}
      {posts.length > 0 && (
        <section className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text">最新文章</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              查看全部 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text">精选项目</h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              查看全部 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
