import { type SchemaTypeDefinition } from 'sanity'
import siteSettings from '../schemas/siteSettings'
import homepage from '../schemas/homepage'
import room from '../schemas/room'
import amenityCategory from '../schemas/amenityCategory'
import experience from '../schemas/experience'
import galleryImage from '../schemas/galleryImage'
import season from '../schemas/season'
import extra from '../schemas/extra'
import faqItem from '../schemas/faqItem'
import testimonial from '../schemas/testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettings,
    homepage,
    // Documents
    room,
    amenityCategory,
    experience,
    galleryImage,
    season,
    extra,
    faqItem,
    testimonial,
  ],
}
