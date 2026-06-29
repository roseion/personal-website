import { defineType } from 'sanity'

export default defineType({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    { name: 'metaTitle', title: '自定义标题', type: 'string', description: '留空则使用内容标题' },
    { name: 'metaDescription', title: 'Meta 描述', type: 'text', rows: 2 },
    { name: 'ogImage', title: 'Open Graph 图片', type: 'image' },
  ],
})
