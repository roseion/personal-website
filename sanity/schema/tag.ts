import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tag',
  title: '标签',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '名称', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 48 } }),
  ],
})
