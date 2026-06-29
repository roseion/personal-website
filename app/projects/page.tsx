import { sanityFetch } from '@/sanity/lib/fetch'
import { projectsQuery } from '@/sanity/lib/queries'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '项目',
  description: '我的作品集',
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<any[]>({ query: projectsQuery, tags: ['project'] })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-text">项目</h1>
      {projects.length === 0 ? (
        <p className="text-text-muted">还没有项目，敬请期待。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      )}
    </div>
  )
}
