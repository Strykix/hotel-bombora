import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SiteSettings {
  siteName: string
  tagline?: string
  logo?: SanityImageSource
  favicon?: SanityImageSource
  currency: 'USD' | 'EUR' | 'GBP' | 'LKR'
  email?: string
  phone?: string
  whatsapp?: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    country?: string
  }
  coordinates?: {
    lat: number
    lng: number
  }
  instagram?: string
  facebook?: string
  tripadvisor?: string
  bookingUrl?: string
  airbnbUrl?: string
  directBookingEnabled?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: SanityImageSource
}

export interface Highlight {
  icon: string
  title: string
  description: string
}

export interface NearbyPlace {
  name: string
  distance: string
  time: string
}

export interface Homepage {
  heroTitle: string
  heroSubtitle?: string
  heroHeadline?: string
  heroDescription?: string
  heroImage: SanityImageSource
  heroVideo?: { asset: { url: string } }
  heroCta?: string
  heroCtaSecondary?: string
  aboutTitle?: string
  aboutSubtitle?: string
  aboutDescription?: string
  aboutImage?: SanityImageSource
  aboutHighlights?: Highlight[]
  amenitiesTitle?: string
  amenitiesSubtitle?: string
  experiencesTitle?: string
  experiencesSubtitle?: string
  experiencesDescription?: string
  pricingTitle?: string
  pricingSubtitle?: string
  pricingDescription?: string
  pricingInclusions?: string[]
  pricingNotes?: string[]
  locationTitle?: string
  locationSubtitle?: string
  locationDescription?: string
  nearbyPlaces?: NearbyPlace[]
  gettingHere?: {
    fromAirport?: string
    byTrain?: string
    byBus?: string
  }
}

export interface Room {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  size?: string
  bedType?: 'king' | 'queen' | 'twin' | 'single'
  capacity?: number
  features?: string[]
  images: Array<{
    asset: SanityImageSource
    alt?: string
  }>
}

export interface AmenityCategory {
  _id: string
  name: string
  icon?: string
  items?: string[]
}

export interface Experience {
  _id: string
  title: string
  description?: string
  duration?: string
  distance?: string
  image?: SanityImageSource
  tags?: string[]
}

export interface GalleryImage {
  _id: string
  image: SanityImageSource
  alt?: string
  category?: string
  featured?: boolean
}

export interface Season {
  _id: string
  name: string
  period?: string
  pricePerNight: number
  minNights?: number
  description?: string
  isPopular?: boolean
}

export interface Extra {
  _id: string
  name: string
  price: number
  unit?: 'per_trip' | 'per_day' | 'per_person' | 'per_hour' | 'per_night' | 'flat'
  description?: string
}

export interface FaqItem {
  _id: string
  question: string
  answer: string
}

export interface Testimonial {
  _id: string
  name: string
  location?: string
  date?: string
  rating?: number
  text: string
  avatar?: SanityImageSource
  featured?: boolean
}

export interface PageData {
  settings: SiteSettings | null
  homepage: Homepage | null
  rooms: Room[]
  amenities: AmenityCategory[]
  experiences: Experience[]
  gallery: GalleryImage[]
  seasons: Season[]
  extras: Extra[]
  faq: FaqItem[]
  testimonials: Testimonial[]
}
