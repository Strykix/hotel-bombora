import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'season',
  title: 'Saisons tarifaires',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la saison',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Ex: Basse saison, Haute saison, Peak season',
    }),
    defineField({
      name: 'period',
      title: 'Période',
      type: 'string',
      description: 'Ex: Mai - Octobre',
    }),
    defineField({
      name: 'pricePerNight',
      title: 'Prix par nuit',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'minNights',
      title: 'Nuits minimum',
      type: 'number',
      initialValue: 2,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Ex: "Green season with occasional rain"',
    }),
    defineField({
      name: 'isPopular',
      title: 'Marquer comme "Populaire"',
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
      price: 'pricePerNight',
      period: 'period',
    },
    prepare: ({ title, price, period }) => ({
      title: `${title} - $${price}/nuit`,
      subtitle: period,
    }),
  },
})
