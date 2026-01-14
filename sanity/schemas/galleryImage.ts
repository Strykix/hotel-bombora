import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Galerie photos',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: 'Description de l\'image pour l\'accessibilité',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'villa' },
          { title: 'Piscine', value: 'pool' },
          { title: 'Chambres', value: 'rooms' },
          { title: 'Intérieur', value: 'interior' },
          { title: 'Jardin', value: 'garden' },
          { title: 'Vues', value: 'views' },
          { title: 'Alentours', value: 'surroundings' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Image mise en avant',
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
      media: 'image',
      title: 'alt',
      subtitle: 'category',
    },
    prepare: ({ media, title, subtitle }) => ({
      title: title || 'Image sans titre',
      subtitle: subtitle,
      media,
    }),
  },
})
