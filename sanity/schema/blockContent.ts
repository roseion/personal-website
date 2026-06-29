import { defineType, defineField } from 'sanity'

export default defineType({
  title: '正文内容',
  name: 'blockContent',
  type: 'array',
  of: [
    defineField({
      title: 'Block',
      type: 'block',
      styles: [
        { title: '正文', value: 'normal' },
        { title: '标题 1', value: 'h1' },
        { title: '标题 2', value: 'h2' },
        { title: '标题 3', value: 'h3' },
        { title: '标题 4', value: 'h4' },
        { title: '引用', value: 'blockquote' },
      ],
      lists: [
        { title: '无序列表', value: 'bullet' },
        { title: '有序列表', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: '粗体', value: 'strong' },
          { title: '斜体', value: 'em' },
          { title: '代码', value: 'code' },
          { title: '删除线', value: 'strike-through' },
        ],
        annotations: [
          {
            title: '链接',
            name: 'link',
            type: 'object',
            fields: [
              { title: 'URL', name: 'href', type: 'url' },
              { title: '新窗口打开', name: 'blank', type: 'boolean', initialValue: true },
            ],
          },
        ],
      },
    }),
    defineField({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: '替代文字', type: 'string' },
        { name: 'caption', title: '图注', type: 'string' },
      ],
    }),
    defineField({
      type: 'code',
      title: '代码块',
    }),
  ],
})
