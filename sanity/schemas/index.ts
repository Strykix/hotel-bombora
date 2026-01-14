import siteSettings from './siteSettings'
import homepage from './homepage'
import room from './room'
import amenityCategory from './amenityCategory'
import experience from './experience'
import galleryImage from './galleryImage'
import season from './season'
import extra from './extra'
import faqItem from './faqItem'
import testimonial from './testimonial'

export const schemaTypes = [
  // Singletons (une seule instance)
  siteSettings,
  homepage,

  // Documents (plusieurs instances)
  room,
  amenityCategory,
  experience,
  galleryImage,
  season,
  extra,
  faqItem,
  testimonial,
]
