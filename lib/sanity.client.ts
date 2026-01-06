import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { apiVersion, dataset, projectId, isStaticMode } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to always get fresh data
})

const builder = imageUrlBuilder(client)

// Static image builder that mimics Sanity's image URL builder interface
function createStaticImageBuilder(url: string) {
  return {
    width: () => createStaticImageBuilder(url),
    height: () => createStaticImageBuilder(url),
    quality: () => createStaticImageBuilder(url),
    format: () => createStaticImageBuilder(url),
    fit: () => createStaticImageBuilder(url),
    auto: () => createStaticImageBuilder(url),
    url: () => url,
  }
}

export function urlFor(source: SanityImageSource | { asset?: { url?: string } } | null | undefined) {
  // Handle null/undefined
  if (!source) {
    return createStaticImageBuilder('/images/placeholder.jpg')
  }

  // Static mode: check if source has a direct URL
  if (isStaticMode) {
    const imgSource = source as { asset?: { url?: string } }
    if (imgSource?.asset?.url) {
      return createStaticImageBuilder(imgSource.asset.url)
    }
    // Fallback to placeholder
    return createStaticImageBuilder('/images/placeholder.jpg')
  }

  // Sanity mode: use the image URL builder
  return builder.image(source)
}
