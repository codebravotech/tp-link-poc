import {defineField, defineType} from 'sanity'

export const highlightsHero = defineType({
  name: 'highlightsHero',
  title: 'Highlights Hero',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Insert Menu Previews',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'modelNumber',
      title: 'Model Number',
      type: 'string',
    }),
    defineField({
      name: 'bgDesktopImage',
      title: 'Background Desktop Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bgMobileImage',
      title: 'Background Mobile Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', modelNumber: 'modelNumber', media: 'bgDesktopImage'},
    prepare({title, modelNumber, media}) {
      return {
        title: modelNumber || title || 'Untitled',
        subtitle: modelNumber ? `Highlights Hero – ${modelNumber}` : 'Highlights Hero',
        media,
      }
    },
  },
})
