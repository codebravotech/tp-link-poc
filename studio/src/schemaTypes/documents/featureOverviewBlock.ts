import {defineField, defineType} from 'sanity'

export const featureOverviewBlock = defineType({
  name: 'featureOverviewBlock',
  title: 'Feature Overview Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'columns',
      title: 'Feature Columns',
      type: 'array',
      of: [{type: 'featureColumn'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'columns.0.image'},
    prepare({title, media}) {
      return {title: title || 'Untitled Feature Overview', media}
    },
  },
})
