import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: '作者',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '姓名', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 48 } }),
    defineField({
      name: 'image', title: '头像', type: 'image',
      fields: [{ name: 'alt', title: '替代文字', type: 'string' }],
    }),
    defineField({ name: 'bio', title: '简介', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
