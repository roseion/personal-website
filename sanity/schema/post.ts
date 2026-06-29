import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: '文章',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '标题', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'excerpt', title: '摘要', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: '正文', type: 'blockContent' }),
    defineField({
      name: 'mainImage', title: '封面图', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: '替代文字', type: 'string' }],
    }),
    defineField({ name: 'categories', title: '分类', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'tags', title: '标签', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'publishedAt', title: '发布时间', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'featured', title: '精选', type: 'boolean', initialValue: false }),
    defineField({ name: 'author', title: '作者', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: '发布时间', name: 'publishedAt', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'mainImage' },
  },
})
