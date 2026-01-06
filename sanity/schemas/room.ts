import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'room',
  title: 'Chambres',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la chambre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'size',
      title: 'Superficie',
      type: 'string',
      description: 'Ex: 45 m²',
    }),
    defineField({
      name: 'bedType',
      title: 'Type de lit',
      type: 'string',
      options: {
        list: [
          { title: 'King Size', value: 'king' },
          { title: 'Queen Size', value: 'queen' },
          { title: '2 lits simples', value: 'twin' },
          { title: 'Lit simple', value: 'single' },
        ],
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Capacité (personnes)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'features',
      title: 'Équipements',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],

  orderings: [
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'bedType',
      media: 'images.0',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === 'king' ? 'King Size' : subtitle === 'queen' ? 'Queen Size' : subtitle,
      media,
    }),
  },
})
