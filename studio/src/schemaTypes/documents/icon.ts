import {defineField, defineType} from 'sanity'

export const icon = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'iconImage',
      title: 'Icon Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'iconImage'},
    prepare({title, media}) {
      return {title: title || 'Untitled', media}
    },
  },
})
