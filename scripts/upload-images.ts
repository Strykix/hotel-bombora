import { createClient } from '@sanity/client'
import { basename } from 'path'
import { createReadStream, readdirSync, statSync } from 'fs'

const client = createClient({
  projectId: '2w8dspai',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const IMAGES_DIR = '/home/loic/hatmaya/hotel sri lanka'

// Categorize images based on their names
interface ImageCategory {
  hero: string[]
  about: string[]
  roomDeluxe: string[]
  roomSuperior: string[]
  roomPremium: string[]
  pool: string[]
  restaurant: string[]
  common: string[]
  exterior: string[]
  beach: string[]
  bathroom: string[]
  gallery: string[]
}

function categorizeImages(): ImageCategory {
  const files = readdirSync(IMAGES_DIR)
    .filter(f => f.endsWith('.jpg') && !f.includes(':Zone.Identifier'))

  const categories: ImageCategory = {
    hero: [],
    about: [],
    roomDeluxe: [],
    roomSuperior: [],
    roomPremium: [],
    pool: [],
    restaurant: [],
    common: [],
    exterior: [],
    beach: [],
    bathroom: [],
    gallery: [],
  }

  for (const file of files) {
    const lower = file.toLowerCase()

    if (lower.includes('piscine')) {
      categories.pool.push(file)
    } else if (lower.includes('exterieur') || lower.includes('exterior')) {
      categories.exterior.push(file)
    } else if (lower.includes('dinnerroom') || lower.includes('dinner')) {
      categories.restaurant.push(file)
    } else if (lower.includes('common room') || lower.includes('comon room')) {
      categories.common.push(file)
    } else if (lower.includes('plage') || lower.includes('beach')) {
      categories.beach.push(file)
    } else if (lower.includes('shower') || lower.includes('bathroom')) {
      categories.bathroom.push(file)
    } else if (lower.includes('balcon')) {
      categories.about.push(file)
    } else if (lower.includes('private room 2 people') && !lower.includes('deluxe')) {
      categories.roomDeluxe.push(file)
    } else if (lower.includes('deluxe') || lower.includes('3 bed')) {
      categories.roomPremium.push(file)
    } else if (lower.includes('petitdej') || lower.includes('breakfast')) {
      categories.restaurant.push(file)
    } else {
      // Numbered images go to gallery
      categories.gallery.push(file)
    }
  }

  // Set hero image (best pool photo)
  if (categories.pool.length > 0) {
    categories.hero = [categories.pool[0]]
  }

  // Set about image (balcony or exterior)
  if (categories.about.length === 0 && categories.exterior.length > 0) {
    categories.about = [categories.exterior[0]]
  }

  return categories
}

async function uploadImage(filename: string, altText: string): Promise<any> {
  const filepath = `${IMAGES_DIR}/${filename}`

  try {
    const imageAsset = await client.assets.upload('image', createReadStream(filepath), {
      filename: filename,
    })

    console.log(`  ✅ Uploaded: ${filename}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
      alt: altText,
    }
  } catch (error) {
    console.error(`  ❌ Failed to upload ${filename}:`, error)
    return null
  }
}

async function updateHomepage(heroImage: any, aboutImage: any) {
  console.log('\n🏠 Updating homepage...')

  const homepage = await client.fetch(`*[_type == "homepage"][0]._id`)

  if (homepage) {
    await client.patch(homepage)
      .set({
        heroImage: heroImage,
        aboutImage: aboutImage,
      })
      .commit()
    console.log('  ✅ Homepage updated with hero and about images')
  }
}

async function updateRooms(categories: ImageCategory, uploadedImages: Map<string, any>) {
  console.log('\n🛏️ Updating rooms...')

  const rooms = await client.fetch(`*[_type == "room"]{_id, name}`)

  for (const room of rooms) {
    let mainImage: any = null
    let galleryImages: any[] = []

    if (room.name.toLowerCase().includes('deluxe') && !room.name.toLowerCase().includes('premium')) {
      // Deluxe Double Room
      for (const img of categories.roomDeluxe) {
        const uploaded = uploadedImages.get(img)
        if (uploaded) {
          if (!mainImage) mainImage = uploaded
          else galleryImages.push(uploaded)
        }
      }
    } else if (room.name.toLowerCase().includes('superior')) {
      // Superior Double Room - use some pool/common photos
      for (const img of [...categories.common.slice(0, 1), ...categories.roomDeluxe.slice(1, 2)]) {
        const uploaded = uploadedImages.get(img)
        if (uploaded) {
          if (!mainImage) mainImage = uploaded
          else galleryImages.push(uploaded)
        }
      }
    } else if (room.name.toLowerCase().includes('premium') || room.name.toLowerCase().includes('suite')) {
      // Premium Suite
      for (const img of categories.roomPremium) {
        const uploaded = uploadedImages.get(img)
        if (uploaded) {
          if (!mainImage) mainImage = uploaded
          else galleryImages.push(uploaded)
        }
      }
    }

    if (mainImage) {
      const patch: any = { image: mainImage }
      if (galleryImages.length > 0) {
        patch.gallery = galleryImages
      }

      await client.patch(room._id)
        .set(patch)
        .commit()
      console.log(`  ✅ Updated room: ${room.name}`)
    }
  }
}

async function createGalleryImages(categories: ImageCategory, uploadedImages: Map<string, any>) {
  console.log('\n🖼️ Creating gallery images...')

  // Delete existing gallery images
  const existingGallery = await client.fetch(`*[_type == "galleryImage"]._id`)
  if (existingGallery.length > 0) {
    for (const id of existingGallery) {
      await client.delete(id)
    }
    console.log(`  🗑️ Deleted ${existingGallery.length} existing gallery images`)
  }

  // Group images by category for gallery
  const galleryGroups = [
    { category: 'Piscine', images: categories.pool, order: 1 },
    { category: 'Extérieur', images: categories.exterior, order: 2 },
    { category: 'Restaurant', images: categories.restaurant, order: 3 },
    { category: 'Espaces communs', images: categories.common, order: 4 },
    { category: 'Plage', images: categories.beach, order: 5 },
    { category: 'Chambres', images: [...categories.roomDeluxe, ...categories.roomPremium], order: 6 },
    { category: 'Salle de bain', images: categories.bathroom, order: 7 },
    { category: 'Galerie', images: categories.gallery.slice(0, 10), order: 8 }, // Limit numbered images
  ]

  let orderIndex = 1
  for (const group of galleryGroups) {
    for (const img of group.images) {
      const uploaded = uploadedImages.get(img)
      if (uploaded) {
        await client.create({
          _type: 'galleryImage',
          image: uploaded,
          category: group.category,
          order: orderIndex++,
        })
      }
    }
  }

  console.log(`  ✅ Created ${orderIndex - 1} gallery images`)
}

async function main() {
  console.log('🚀 Starting image upload to Sanity...\n')

  // Categorize images
  const categories = categorizeImages()
  console.log('📁 Image categories:')
  console.log(`  - Hero candidates: ${categories.hero.length}`)
  console.log(`  - About candidates: ${categories.about.length}`)
  console.log(`  - Pool: ${categories.pool.length}`)
  console.log(`  - Exterior: ${categories.exterior.length}`)
  console.log(`  - Restaurant: ${categories.restaurant.length}`)
  console.log(`  - Common areas: ${categories.common.length}`)
  console.log(`  - Beach: ${categories.beach.length}`)
  console.log(`  - Bathroom: ${categories.bathroom.length}`)
  console.log(`  - Room Deluxe: ${categories.roomDeluxe.length}`)
  console.log(`  - Room Premium: ${categories.roomPremium.length}`)
  console.log(`  - Other gallery: ${categories.gallery.length}`)

  // Upload all images
  console.log('\n📤 Uploading images...')
  const uploadedImages = new Map<string, any>()

  const allImages = [
    ...categories.pool,
    ...categories.exterior,
    ...categories.restaurant,
    ...categories.common,
    ...categories.beach,
    ...categories.bathroom,
    ...categories.roomDeluxe,
    ...categories.roomPremium,
    ...categories.about,
    ...categories.gallery.slice(0, 10), // Limit to 10 numbered images
  ]

  // Remove duplicates
  const uniqueImages = [...new Set(allImages)]

  for (const img of uniqueImages) {
    const altText = img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
    const uploaded = await uploadImage(img, altText)
    if (uploaded) {
      uploadedImages.set(img, uploaded)
    }
  }

  console.log(`\n✅ Uploaded ${uploadedImages.size} images`)

  // Update homepage
  const heroImg = categories.hero[0] ? uploadedImages.get(categories.hero[0]) : null
  const aboutImg = categories.about[0] ? uploadedImages.get(categories.about[0]) : uploadedImages.get(categories.exterior[0])

  if (heroImg && aboutImg) {
    await updateHomepage(heroImg, aboutImg)
  }

  // Update rooms
  await updateRooms(categories, uploadedImages)

  // Create gallery
  await createGalleryImages(categories, uploadedImages)

  console.log('\n🎉 All done! Check your Sanity Studio to see the images.')
}

main().catch(console.error)
