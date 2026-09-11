import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Patient Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Patient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 to 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Content',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'procedure',
      title: 'Procedure Received (e.g. Veneers, Root Canal)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Review Date Label (e.g. 2 weeks ago)',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Landing Page',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'procedure',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: title ? `${title} (${'★'.repeat(rating || 5)})` : 'Review',
        subtitle: subtitle || 'Patient Testimonial',
      }
    },
  },
})
