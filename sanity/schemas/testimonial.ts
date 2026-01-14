import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Provenance',
      type: 'string',
      description: 'Ex: "London, UK"',
    }),
    defineField({
      name: 'date',
      title: 'Date du séjour',
      type: 'string',
      description: 'Ex: "March 2024"',
    }),
    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      options: {
        list: [
          { title: '5 étoiles', value: 5 },
          { title: '4 étoiles', value: 4 },
          { title: '3 étoiles', value: 3 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Photo (optionnel)',
      type: 'image',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
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
      title: 'name',
      subtitle: 'location',
      media: 'avatar',
    },
  },
})
