import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: '项目',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '标题', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'excerpt', title: '简介', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: '详细描述', type: 'blockContent' }),
    defineField({
      name: 'coverImage', title: '封面图', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: '替代文字', type: 'string' }],
    }),
    defineField({
      name: 'gallery', title: '相册', type: 'array',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [{ name: 'alt', title: '说明', type: 'string' }],
      }],
    }),
    defineField({ name: 'technologies', title: '技术栈', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'liveUrl', title: '在线地址', type: 'url' }),
    defineField({ name: 'sourceUrl', title: '源码地址', type: 'url' }),
    defineField({ name: 'featured', title: '精选', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: '发布时间', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: '发布时间', name: 'publishedAt', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
