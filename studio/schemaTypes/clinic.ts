import { defineType, defineField, defineArrayMember } from 'sanity'

export const clinic = defineType({
  name: 'clinic',
  title: 'Clinic Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Clinic Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline / Value Proposition',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emergencyPhone',
      title: 'Emergency Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Clinic Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street Address', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State / Province', type: 'string' }),
        defineField({ name: 'zip', title: 'Postal / ZIP Code', type: 'string' }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Google Rating (e.g. 4.9)',
      type: 'number',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Total Review Count',
      type: 'number',
    }),
    defineField({
      name: 'yearEstablished',
      title: 'Year Established',
      type: 'number',
      description: 'The year the clinic was founded (e.g. 2010). Used to calculate years in business on the hero section.',
    }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Day(s)', type: 'string' }),
            defineField({ name: 'time', title: 'Hours', type: 'string' }),
          ],
          preview: {
            select: { title: 'day', subtitle: 'time' },
          },
        }),
      ],
    }),
    defineField({
      name: 'insurances',
      title: 'Accepted Insurance Providers',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'emergencyNotice',
      title: 'Emergency Banner Message',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Clinic / Hero Photo',
      type: 'image',
      description: 'Displayed in the hero section on the landing page. Recommended: a real photo of the clinic, dentist, or team.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the photo for accessibility (e.g. "Dr. Chen smiling with patient").',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Dental Clinic',
        subtitle: subtitle || 'Clinic Details',
      }
    },
  },
})
