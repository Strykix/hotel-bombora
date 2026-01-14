'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GalleryImage } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import Modal from './ui/Modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryProps {
  images: GalleryImage[]
}

const categoryLabels: Record<string, string> = {
  villa: 'Villa',
  pool: 'Pool',
  rooms: 'Rooms',
  interior: 'Interior',
  garden: 'Garden',
  views: 'Views',
  surroundings: 'Surroundings',
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  if (!images || images.length === 0) return null

  // Get unique categories
  const uniqueCategories = Array.from(new Set(images.map((img) => img.category).filter((c): c is string => Boolean(c))))
  const categories: string[] = ['all', ...uniqueCategories]

  // Filter images
  const filteredImages =
    activeFilter === 'all'
      ? images
      : images.filter((img) => img.category === activeFilter)

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1
      )
    }
  }

  return (
    <section id="gallery" className="section-padding bg-accent">
      <div className="container-custom">
        <SectionTitle
          title="Gallery"
          subtitle="Visual Tour"
          description="Explore our stunning villa through our curated collection of photographs."
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-2 md:px-4 text-xs md:text-sm tracking-wide uppercase transition-colors touch-manipulation min-h-[40px] ${
                activeFilter === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All' : categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`relative cursor-pointer overflow-hidden ${
                  image.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openModal(index)}
              >
                <div
                  className={`relative ${
                    image.featured ? 'aspect-square' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={urlFor(image.image)
                      .width(image.featured ? 800 : 400)
                      .height(image.featured ? 800 : 400)
                      .url()}
                    alt={image.alt || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={selectedIndex !== null} onClose={closeModal}>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <div className="relative flex items-center justify-center min-h-[50vh]">
            <Image
              src={urlFor(filteredImages[selectedIndex].image)
                .width(1400)
                .fit('max')
                .url()}
              alt={filteredImages[selectedIndex].alt || 'Gallery image'}
              width={1400}
              height={1050}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
