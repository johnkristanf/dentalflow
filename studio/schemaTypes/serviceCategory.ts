import {defineType, defineField} from 'sanity'

export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Key',
      type: 'slug',
      description: 'Used as the tab identifier (e.g. "general-dentistry")',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Single emoji representing this category (e.g. 🦷)',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'icon'},
    prepare({title, subtitle}) {
      return {title: subtitle ? `${subtitle} ${title}` : title}
    },
  },
})
