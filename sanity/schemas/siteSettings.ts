import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  groups: [
    { name: 'general', title: 'Général' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Réseaux sociaux' },
    { name: 'booking', title: 'Réservation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // GÉNÉRAL
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      group: 'general',
      description: 'Ex: "Your Private Paradise in Ahangama"',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'currency',
      title: 'Devise',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'LKR (Rs)', value: 'LKR' },
        ],
      },
      initialValue: 'USD',
    }),

    // CONTACT
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      group: 'contact',
      description: 'Format international: +94 77 123 4567',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'Numéro sans espaces ni +: 94771234567',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'line1', title: 'Ligne 1', type: 'string' },
        { name: 'line2', title: 'Ligne 2', type: 'string' },
        { name: 'city', title: 'Ville', type: 'string' },
        { name: 'country', title: 'Pays', type: 'string' },
      ],
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordonnées GPS',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    }),

    // RÉSEAUX SOCIAUX
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'tripadvisor',
      title: 'TripAdvisor',
      type: 'url',
      group: 'social',
    }),

    // RÉSERVATION
    defineField({
      name: 'bookingUrl',
      title: 'Lien Booking.com',
      type: 'url',
      group: 'booking',
      description: 'URL complète de votre page Booking.com',
    }),
    defineField({
      name: 'airbnbUrl',
      title: 'Lien Airbnb',
      type: 'url',
      group: 'booking',
    }),
    defineField({
      name: 'directBookingEnabled',
      title: 'Activer réservation directe',
      type: 'boolean',
      group: 'booking',
      initialValue: false,
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
      description: 'Titre affiché dans Google (max 60 caractères)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Description affichée dans Google (max 160 caractères)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Mots-clés SEO',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'ogImage',
      title: 'Image de partage (Open Graph)',
      type: 'image',
      group: 'seo',
      description: 'Image affichée lors du partage sur Facebook/LinkedIn (1200x630px recommandé)',
    }),
  ],

  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({
      title: title || 'Paramètres du site',
      subtitle: 'Configuration générale',
    }),
  },
})
