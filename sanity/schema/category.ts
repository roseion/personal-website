import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: '分类',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '名称', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 48 } }),
    defineField({ name: 'description', title: '描述', type: 'text', rows: 2 }),
  ],
})
