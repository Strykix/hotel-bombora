'use client'

import { motion } from 'framer-motion'
import { Homepage, AmenityCategory } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import {
  Sun,
  Home,
  Bell,
  Sparkles,
  Utensils,
  Wifi,
  Car,
  Shield,
  Check,
} from 'lucide-react'

interface AmenitiesProps {
  data: Homepage | null
  categories: AmenityCategory[]
}

const iconMap: Record<string, React.ElementType> = {
  sun: Sun,
  home: Home,
  bell: Bell,
  spa: Sparkles,
  utensils: Utensils,
  wifi: Wifi,
  car: Car,
  shield: Shield,
}

export default function Amenities({ data, categories }: AmenitiesProps) {
  if (!categories || categories.length === 0) return null

  return (
    <section id="amenities" className="section-padding bg-primary text-white">
      <div className="container-custom">
        <SectionTitle
          title={data?.amenitiesTitle || 'Villa Amenities'}
          subtitle={data?.amenitiesSubtitle || 'What We Offer'}
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon || 'home'] || Home
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-3 md:p-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                  </div>
                  <h3 className="font-serif text-base md:text-xl leading-tight">{category.name}</h3>
                </div>

                {category.items && category.items.length > 0 && (
                  <ul className="space-y-1.5 md:space-y-2">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 md:gap-2 text-gray-300 text-sm md:text-base"
                      >
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
