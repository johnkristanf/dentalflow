import {defineType, defineField} from 'sanity'

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
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the service name — used in the URL /services/[slug]',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Description / Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'symptoms',
      title: 'Signs & Symptoms / When You Need This',
      type: 'array',
      description: 'Key warning signs or symptoms indicating a patient needs this service (e.g. bleeding gums, chronic toothache, discolored enamel)',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'procedures',
      title: 'Procedures',
      type: 'array',
      description: 'List of specific procedures under this service',
      of: [
        {
          type: 'object',
          name: 'procedure',
          title: 'Procedure',
          fields: [
            defineField({
              name: 'name',
              title: 'Procedure Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Procedure Description',
              type: 'text',
              rows: 2,
              description: 'Step-by-step or clinical explanation of what happens during this procedure',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'description'},
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'serviceCategory'}],
      validation: (Rule) => Rule.required(),
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
      categoryName: 'category.name',
      categoryIcon: 'category.icon',
    },
    prepare({title, categoryName, categoryIcon}) {
      const cat = [categoryIcon, categoryName].filter(Boolean).join(' ')
      return {
        title: title || 'Unnamed Service',
        subtitle: cat || 'Dental Service',
      }
    },
  },
})
