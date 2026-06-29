import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '站点设置',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '站点名称', type: 'string' }),
    defineField({ name: 'description', title: '站点描述', type: 'text', rows: 2 }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image',
      fields: [{ name: 'alt', title: '替代文字', type: 'string' }],
    }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({
      name: 'socialLinks', title: '社交链接', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'platform', title: '平台', type: 'string', options: { list: ['GitHub', 'Twitter', 'LinkedIn', 'Email', 'WeChat', '其他'] } },
          { name: 'url', title: '链接', type: 'url' },
        ],
      }],
    }),
    defineField({
      name: 'mainNavigation', title: '主导航', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'label', title: '名称', type: 'string' },
          { name: 'href', title: '链接', type: 'string' },
        ],
      }],
    }),
  ],
})
