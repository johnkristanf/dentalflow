import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Dental Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Description / Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General Dentistry', value: 'General' },
          { title: 'Cosmetic Dentistry', value: 'Cosmetic' },
          { title: 'Restorative Care', value: 'Restorative' },
          { title: 'Emergency Care', value: 'Emergency' },
          { title: 'Orthodontics', value: 'Orthodontics' },
        ],
      },
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight / Most Popular Badge',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unnamed Service',
        subtitle: subtitle || 'Dental Service',
      }
    },
  },
})
