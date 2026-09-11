import { defineType, defineField, defineArrayMember } from 'sanity'

export const dentist = defineType({
  name: 'dentist',
  title: 'Dentist / Practitioner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials (e.g. DDS, FAGD)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'patientsServed',
      title: 'Patients Served (approximate count)',
      type: 'number',
    }),
    defineField({
      name: 'satisfactionRate',
      title: 'Satisfaction Rate (e.g. 99.4)',
      type: 'number',
    }),
    defineField({
      name: 'education',
      title: 'Education & Honors',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Dentist Profile',
        subtitle: subtitle || 'Practitioner',
      }
    },
  },
})
