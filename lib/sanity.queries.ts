import { groq } from 'next-sanity'
import { client } from './sanity.client'
import { isStaticMode } from '@/sanity/env'
import fs from 'fs'
import path from 'path'

// Charger les données statiques
function getStaticData() {
  try {
    const contentPath = path.join(process.cwd(), 'data', 'content.json')
    const hotelPath = path.join(process.cwd(), 'data', 'hotel.json')
    const photosPath = path.join(process.cwd(), 'data', 'photos.json')

    const content = fs.existsSync(contentPath)
      ? JSON.parse(fs.readFileSync(contentPath, 'utf-8'))
      : {}
    const hotel = fs.existsSync(hotelPath)
      ? JSON.parse(fs.readFileSync(hotelPath, 'utf-8'))
      : {}
    const photos = fs.existsSync(photosPath)
      ? JSON.parse(fs.readFileSync(photosPath, 'utf-8'))
      : { photos: [] }

    return { content, hotel, photos: photos.photos || [] }
  } catch (e) {
    console.error('Error loading static data:', e)
    return { content: {}, hotel: {}, photos: [] }
  }
}

// SETTINGS
export const settingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo,
    favicon,
    currency,
    email,
    phone,
    whatsapp,
    address,
    coordinates,
    instagram,
    facebook,
    tripadvisor,
    bookingUrl,
    airbnbUrl,
    directBookingEnabled,
    seoTitle,
    seoDescription,
    seoKeywords,
    ogImage
  }
`

// HOMEPAGE
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    heroHeadline,
    heroDescription,
    heroImage,
    heroVideo,
    heroCta,
    heroCtaSecondary,
    aboutTitle,
    aboutSubtitle,
    aboutDescription,
    aboutImage,
    aboutHighlights,
    amenitiesTitle,
    amenitiesSubtitle,
    experiencesTitle,
    experiencesSubtitle,
    experiencesDescription,
    pricingTitle,
    pricingSubtitle,
    pricingDescription,
    pricingInclusions,
    pricingNotes,
    locationTitle,
    locationSubtitle,
    locationDescription,
    nearbyPlaces,
    gettingHere
  }
`

// ROOMS
export const roomsQuery = groq`
  *[_type == "room"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    size,
    bedType,
    capacity,
    features,
    images
  }
`

// SINGLE ROOM
export const roomBySlugQuery = groq`
  *[_type == "room" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    size,
    bedType,
    capacity,
    features,
    images
  }
`

export async function getRoomBySlug(slug: string) {
  if (isStaticMode) return null
  return client.fetch(roomBySlugQuery, { slug })
}

// AMENITIES
export const amenitiesQuery = groq`
  *[_type == "amenityCategory"] | order(order asc) {
    _id,
    name,
    icon,
    items
  }
`

// EXPERIENCES
export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    title,
    description,
    duration,
    distance,
    image,
    tags
  }
`

// GALLERY
export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    alt,
    category,
    featured
  }
`

// PRICING
export const seasonsQuery = groq`
  *[_type == "season"] | order(order asc) {
    _id,
    name,
    period,
    pricePerNight,
    minNights,
    description,
    isPopular
  }
`

export const extrasQuery = groq`
  *[_type == "extra"] | order(order asc) {
    _id,
    name,
    price,
    unit,
    description
  }
`

// FAQ
export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer
  }
`

// TESTIMONIALS
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    location,
    date,
    rating,
    text,
    avatar,
    featured
  }
`

// FETCH FUNCTIONS - avec support mode statique
export async function getSettings() {
  if (isStaticMode) {
    const { content, hotel } = getStaticData()
    const settings = content.siteSettings || {}
    return {
      siteName: settings.name || hotel.name || 'Hotel',
      tagline: settings.tagline || `Welcome to ${hotel.name}`,
      phone: settings.contact?.phone || hotel.phone || '',
      whatsapp: settings.contact?.whatsapp || hotel.phone?.replace(/\s/g, '') || '',
      email: settings.contact?.email || '',
      address: settings.contact?.address || hotel.address || '',
      bookingUrl: settings.booking?.url || hotel.booking_url || hotel.booking_search || '',
      instagram: settings.social?.instagram || hotel.instagram || '',
      seoTitle: settings.seo?.title || `${hotel.name} | Hotel in Sri Lanka`,
      seoDescription: settings.seo?.description || `Experience paradise at ${hotel.name}`,
      currency: 'USD',
      directBookingEnabled: false,
    }
  }
  return client.fetch(settingsQuery)
}

export async function getHomepage() {
  if (isStaticMode) {
    const { content, hotel, photos } = getStaticData()
    const homepage = content.homepage || {}
    const mainImage = photos[0]?.path || '/images/placeholder.jpg'

    return {
      heroTitle: homepage.hero?.title || `Welcome to ${hotel.name}`,
      heroSubtitle: homepage.hero?.subtitle || 'Your tropical escape',
      heroHeadline: hotel.name,
      heroDescription: homepage.about?.description || '',
      heroImage: { asset: { url: mainImage } },
      heroCta: homepage.hero?.ctaText || 'Book Now',
      heroCtaSecondary: 'Discover More',
      aboutTitle: homepage.about?.title || 'About Us',
      aboutSubtitle: 'Discover Paradise',
      aboutDescription: homepage.about?.description || `Welcome to ${hotel.name}, your perfect getaway in Sri Lanka.`,
      aboutImage: { asset: { url: photos[1]?.path || mainImage } },
      aboutHighlights: homepage.features?.map((f: any) => f.title) || ['Beachfront Location', 'Local Experience', 'Tropical Paradise'],
      amenitiesTitle: 'Amenities',
      amenitiesSubtitle: 'Everything you need',
      experiencesTitle: 'Experiences',
      experiencesSubtitle: 'Discover the area',
      locationTitle: 'Location',
      locationSubtitle: hotel.zone || 'Sri Lanka',
      locationDescription: hotel.address || '',
    }
  }
  return client.fetch(homepageQuery)
}

export async function getRooms() {
  if (isStaticMode) {
    const { photos } = getStaticData()
    // Générer des chambres fictives à partir des photos
    return [
      {
        _id: 'room-1',
        name: 'Deluxe Room',
        slug: { current: 'deluxe-room' },
        description: 'A comfortable room with all modern amenities.',
        size: '30m²',
        bedType: 'King Size',
        capacity: 2,
        features: ['Air Conditioning', 'Free WiFi', 'Private Bathroom', 'Sea View'],
        images: photos.slice(2, 5).map((p: any) => ({ asset: { url: p.path } }))
      },
      {
        _id: 'room-2',
        name: 'Suite',
        slug: { current: 'suite' },
        description: 'Spacious suite with stunning views.',
        size: '45m²',
        bedType: 'King Size',
        capacity: 3,
        features: ['Air Conditioning', 'Free WiFi', 'Private Bathroom', 'Balcony', 'Sea View'],
        images: photos.slice(5, 8).map((p: any) => ({ asset: { url: p.path } }))
      }
    ]
  }
  return client.fetch(roomsQuery)
}

export async function getAmenities() {
  if (isStaticMode) {
    return [
      { _id: 'amenity-1', name: 'Room Amenities', icon: 'bed', items: ['Air Conditioning', 'Free WiFi', 'Private Bathroom', 'Daily Housekeeping'] },
      { _id: 'amenity-2', name: 'Property Features', icon: 'home', items: ['Swimming Pool', 'Restaurant', 'Bar', 'Garden'] },
      { _id: 'amenity-3', name: 'Services', icon: 'star', items: ['Airport Transfer', 'Laundry Service', 'Tour Desk', '24/7 Reception'] },
    ]
  }
  return client.fetch(amenitiesQuery)
}

export async function getExperiences() {
  if (isStaticMode) {
    const { photos, hotel } = getStaticData()
    return [
      { _id: 'exp-1', title: 'Beach Activities', description: 'Enjoy surfing, swimming, and sunbathing on pristine beaches.', duration: 'All day', image: { asset: { url: photos[8]?.path || '/images/placeholder.jpg' } }, tags: ['Beach', 'Surf'] },
      { _id: 'exp-2', title: 'Local Tours', description: 'Discover the beauty of Sri Lanka with guided tours.', duration: 'Half day', image: { asset: { url: photos[10]?.path || '/images/placeholder.jpg' } }, tags: ['Tour', 'Culture'] },
      { _id: 'exp-3', title: 'Yoga & Wellness', description: 'Relax and rejuvenate with yoga sessions and spa treatments.', duration: '2 hours', image: { asset: { url: photos[12]?.path || '/images/placeholder.jpg' } }, tags: ['Wellness', 'Yoga'] },
    ]
  }
  return client.fetch(experiencesQuery)
}

export async function getGallery() {
  if (isStaticMode) {
    const { photos } = getStaticData()
    return photos.map((p: any, i: number) => ({
      _id: `gallery-${i}`,
      image: { asset: { url: p.path } },
      alt: `Photo ${i + 1}`,
      category: i < 5 ? 'rooms' : i < 10 ? 'property' : 'surroundings',
      featured: i < 6
    }))
  }
  return client.fetch(galleryQuery)
}

export async function getSeasons() {
  if (isStaticMode) {
    return [
      { _id: 'season-1', name: 'Low Season', period: 'May - October', pricePerNight: 80, minNights: 2, description: 'Great rates during the green season', isPopular: false },
      { _id: 'season-2', name: 'High Season', period: 'November - April', pricePerNight: 120, minNights: 3, description: 'Perfect weather for your holiday', isPopular: true },
      { _id: 'season-3', name: 'Peak Season', period: 'December - January', pricePerNight: 150, minNights: 5, description: 'Celebrate the holidays in paradise', isPopular: false },
    ]
  }
  return client.fetch(seasonsQuery)
}

export async function getExtras() {
  if (isStaticMode) {
    return [
      { _id: 'extra-1', name: 'Airport Transfer', price: 50, unit: 'per way', description: 'Private transfer from/to airport' },
      { _id: 'extra-2', name: 'Breakfast', price: 15, unit: 'per person', description: 'Full breakfast buffet' },
      { _id: 'extra-3', name: 'Surf Lesson', price: 35, unit: 'per session', description: '2-hour surf lesson with instructor' },
    ]
  }
  return client.fetch(extrasQuery)
}

export async function getFaq() {
  if (isStaticMode) {
    const { hotel } = getStaticData()
    return [
      { _id: 'faq-1', question: 'What time is check-in and check-out?', answer: 'Check-in is from 2:00 PM and check-out is until 11:00 AM.' },
      { _id: 'faq-2', question: 'How can I make a reservation?', answer: `You can book directly through our booking partner or contact us at ${hotel.phone}.` },
      { _id: 'faq-3', question: 'Is airport transfer available?', answer: 'Yes, we offer airport transfers. Please contact us to arrange.' },
      { _id: 'faq-4', question: 'Do you have WiFi?', answer: 'Yes, free WiFi is available throughout the property.' },
    ]
  }
  return client.fetch(faqQuery)
}

export async function getTestimonials() {
  if (isStaticMode) {
    return [
      { _id: 'test-1', name: 'Sarah M.', location: 'United Kingdom', rating: 5, text: 'Amazing stay! The location is perfect and the staff was incredibly friendly.', featured: true },
      { _id: 'test-2', name: 'Thomas B.', location: 'Germany', rating: 5, text: 'Beautiful property with stunning views. Will definitely come back!', featured: true },
      { _id: 'test-3', name: 'Marie L.', location: 'France', rating: 4, text: 'Great experience overall. The beach is just steps away.', featured: false },
    ]
  }
  return client.fetch(testimonialsQuery)
}

// GET ALL DATA (pour la page d'accueil)
export async function getAllPageData() {
  const [
    settings,
    homepage,
    rooms,
    amenities,
    experiences,
    gallery,
    seasons,
    extras,
    faq,
    testimonials,
  ] = await Promise.all([
    getSettings(),
    getHomepage(),
    getRooms(),
    getAmenities(),
    getExperiences(),
    getGallery(),
    getSeasons(),
    getExtras(),
    getFaq(),
    getTestimonials(),
  ])

  return {
    settings,
    homepage,
    rooms,
    amenities,
    experiences,
    gallery,
    seasons,
    extras,
    faq,
    testimonials,
  }
}
