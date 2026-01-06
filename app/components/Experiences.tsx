'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Homepage, Experience } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import { Clock, MapPin } from 'lucide-react'

interface ExperiencesProps {
  data: Homepage | null
  experiences: Experience[]
}

const tagLabels: Record<string, string> = {
  adventure: 'Adventure',
  culture: 'Culture',
  wildlife: 'Wildlife',
  'water-sports': 'Water Sports',
  family: 'Family',
  'food-drink': 'Food & Drink',
  history: 'History',
  photography: 'Photography',
  relaxation: 'Relaxation',
}

export default function Experiences({ data, experiences }: ExperiencesProps) {
  if (!experiences || experiences.length === 0) return null

  return (
    <section id="experiences" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          title={data?.experiencesTitle || 'Local Experiences'}
          subtitle={data?.experiencesSubtitle || 'Discover'}
          description={data?.experiencesDescription}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                {experience.image && (
                  <Image
                    src={urlFor(experience.image).width(600).height(450).url()}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Tags */}
                {experience.tags && experience.tags.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {experience.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/90 text-xs text-gray-800 uppercase tracking-wide"
                      >
                        {tagLabels[tag] || tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-2">
                {experience.title}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                {experience.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {experience.duration}
                  </span>
                )}
                {experience.distance && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {experience.distance}
                  </span>
                )}
              </div>

              {experience.description && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {experience.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
