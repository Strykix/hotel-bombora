import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'extra',
  title: 'Services extras',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du service',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'unit',
      title: 'Unité',
      type: 'string',
      options: {
        list: [
          { title: 'par trajet', value: 'per_trip' },
          { title: 'par jour', value: 'per_day' },
          { title: 'par personne', value: 'per_person' },
          { title: 'par heure', value: 'per_hour' },
          { title: 'par nuit', value: 'per_night' },
          { title: 'forfait', value: 'flat' },
        ],
      },
      initialValue: 'flat',
    }),
    defineField({
      name: 'description',
      title: 'Description (optionnel)',
      type: 'string',
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
      price: 'price',
      unit: 'unit',
    },
    prepare: ({ title, price, unit }) => {
      const unitLabels: Record<string, string> = {
        per_trip: '/trajet',
        per_day: '/jour',
        per_person: '/pers.',
        per_hour: '/heure',
        per_night: '/nuit',
        flat: '',
      }
      return {
        title,
        subtitle: `$${price}${unitLabels[unit] || ''}`,
      }
    },
  },
})
