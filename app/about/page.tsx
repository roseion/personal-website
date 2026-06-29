import { sanityFetch } from '@/sanity/lib/fetch'
import { pageQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import RichText from '@/components/sanity/RichText'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于我',
}

export default async function AboutPage() {
  const page = await sanityFetch<any>({ query: pageQuery, params: { slug: 'about' }, tags: ['page'] })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {page ? (
        <>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-text">
            {page.title || '关于我'}
          </h1>
          {page.body && <RichText value={page.body} />}
        </>
      ) : (
        <>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-text">关于我</h1>
          <div className="space-y-4 text-text-muted">
            <p>
              这是一个关于页面。你可以通过 Sanity CMS 在 <code>/admin</code> 后台创建一个 slug 为
              <code>about</code> 的页面来管理这里的内容。
            </p>
            <p>
              或者，你也可以直接编辑这个页面文件来添加静态内容。
            </p>
          </div>
        </>
      )}
    </div>
  )
}
