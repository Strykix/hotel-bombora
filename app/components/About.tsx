'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Homepage } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import {
  Palmtree,
  Waves,
  Users,
  Heart,
  Sun,
  Utensils,
  Wifi,
  Car,
  Plane,
} from 'lucide-react'

interface AboutProps {
  data: Homepage | null
}

const iconMap: Record<string, React.ElementType> = {
  palmtree: Palmtree,
  waves: Waves,
  users: Users,
  heart: Heart,
  pool: Waves,
  sun: Sun,
  utensils: Utensils,
  wifi: Wifi,
  car: Car,
  plane: Plane,
}

export default function About({ data }: AboutProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get images array - use aboutImages if available, otherwise fallback to single aboutImage
  const images = data?.aboutImages && data.aboutImages.length > 0
    ? data.aboutImages
    : data?.aboutImage
      ? [data.aboutImage]
      : []

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  if (!data) return null

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image carousel */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] lg:aspect-[3/4]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={urlFor(images[currentImageIndex]).width(800).height(1000).url()}
                    alt={`${data.aboutTitle || 'About'} - ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-1.5 bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Decorative border - hidden on mobile to prevent overflow */}
              <div className="hidden md:block absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary -z-10" />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              title={data.aboutTitle || 'Welcome'}
              subtitle={data.aboutSubtitle}
              centered={false}
            />

            {data.aboutDescription && (
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.aboutDescription}
              </p>
            )}

            {/* Highlights */}
            {data.aboutHighlights && data.aboutHighlights.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {data.aboutHighlights.map((highlight, index) => {
                  const IconComponent = iconMap[highlight.icon] || Heart
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-accent flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
