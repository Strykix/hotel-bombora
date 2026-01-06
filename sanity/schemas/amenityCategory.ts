import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'amenityCategory',
  title: 'Catégories équipements',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la catégorie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      options: {
        list: [
          { title: 'Soleil (Outdoor)', value: 'sun' },
          { title: 'Maison (Indoor)', value: 'home' },
          { title: 'Cloche (Services)', value: 'bell' },
          { title: 'Spa (Wellness)', value: 'spa' },
          { title: 'Cuisine', value: 'utensils' },
          { title: 'WiFi', value: 'wifi' },
          { title: 'Voiture', value: 'car' },
          { title: 'Sécurité', value: 'shield' },
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Équipements',
      type: 'array',
      of: [{ type: 'string' }],
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
      items: 'items',
    },
    prepare: ({ title, items }) => ({
      title,
      subtitle: items ? `${items.length} équipements` : '0 équipement',
    }),
  },
})
