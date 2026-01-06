import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Expériences',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: "Half day", "2-3 hours"',
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'Ex: "5 km"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Adventure', value: 'adventure' },
          { title: 'Culture', value: 'culture' },
          { title: 'Wildlife', value: 'wildlife' },
          { title: 'Water Sports', value: 'water-sports' },
          { title: 'Family', value: 'family' },
          { title: 'Food & Drink', value: 'food-drink' },
          { title: 'History', value: 'history' },
          { title: 'Photography', value: 'photography' },
          { title: 'Relaxation', value: 'relaxation' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'image',
    },
  },
})
