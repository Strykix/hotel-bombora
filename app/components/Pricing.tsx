'use client'

import { motion } from 'framer-motion'
import { Homepage, Season, Extra } from '@/lib/types'
import { formatCurrency, getUnitLabel } from '@/lib/utils'
import SectionTitle from './ui/SectionTitle'
import { Check, Star } from 'lucide-react'

interface PricingProps {
  data: Homepage | null
  seasons: Season[]
  extras: Extra[]
  currency?: string
}

export default function Pricing({ data, seasons, extras, currency = 'USD' }: PricingProps) {
  if (!seasons || seasons.length === 0) return null

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          title={data?.pricingTitle || 'Rates & Packages'}
          subtitle={data?.pricingSubtitle || 'Pricing'}
          description={data?.pricingDescription}
        />

        {/* Season Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {seasons.map((season, index) => (
            <motion.div
              key={season._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-5 md:p-8 ${
                season.isPopular
                  ? 'bg-primary text-white'
                  : 'bg-accent text-gray-900'
              }`}
            >
              {season.isPopular && (
                <div className="absolute top-0 right-0 bg-secondary text-gray-900 px-3 md:px-4 py-1 text-[10px] md:text-xs uppercase tracking-wide font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}

              <h3 className="font-serif text-xl md:text-2xl mb-1 md:mb-2">{season.name}</h3>

              {season.period && (
                <p
                  className={`text-xs md:text-sm mb-4 md:mb-6 ${
                    season.isPopular ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {season.period}
                </p>
              )}

              <div className="mb-4 md:mb-6">
                <span className="font-serif text-3xl md:text-4xl">
                  {formatCurrency(season.pricePerNight, currency)}
                </span>
                <span
                  className={`text-xs md:text-sm ${
                    season.isPopular ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {' '}
                  / night
                </span>
              </div>

              {season.minNights && (
                <p
                  className={`text-sm mb-4 ${
                    season.isPopular ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Minimum {season.minNights} nights
                </p>
              )}

              {season.description && (
                <p
                  className={`text-sm ${
                    season.isPopular ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {season.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Inclusions */}
        {data?.pricingInclusions && data.pricingInclusions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent p-4 md:p-8 mb-8 md:mb-12"
          >
            <h3 className="font-serif text-xl md:text-2xl text-gray-900 mb-4 md:mb-6 text-center">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {data.pricingInclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 md:gap-2">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Extras */}
        {extras && extras.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-gray-900 mb-4 md:mb-6 text-center">
              Additional Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {extras.map((extra) => (
                <div
                  key={extra._id}
                  className="flex justify-between items-center p-3 md:p-4 bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm md:text-base truncate">{extra.name}</p>
                    {extra.description && (
                      <p className="text-xs md:text-sm text-gray-500 truncate">{extra.description}</p>
                    )}
                  </div>
                  <p className="text-primary font-medium whitespace-nowrap ml-3 text-sm md:text-base">
                    {formatCurrency(extra.price, currency)}
                    {extra.unit && (
                      <span className="text-xs md:text-sm text-gray-500">
                        {getUnitLabel(extra.unit)}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notes */}
        {data?.pricingNotes && data.pricingNotes.length > 0 && (
          <div className="mt-12 text-center">
            {data.pricingNotes.map((note, index) => (
              <p key={index} className="text-sm text-gray-500">
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
