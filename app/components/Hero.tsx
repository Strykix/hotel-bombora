'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Homepage, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Button from './ui/Button'

interface HeroProps {
  data: Homepage | null
  settings: SiteSettings | null
}

export default function Hero({ data, settings }: HeroProps) {
  if (!data) return null

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {data.heroImage && (
        <div className="absolute inset-0">
          <Image
            src={urlFor(data.heroImage).width(1920).height(1080).url()}
            alt={data.heroTitle || 'Villa'}
            fill
            priority
            className="object-cover"
          />
          <div className="overlay-gradient" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {data.heroHeadline && (
            <span className="text-xs md:text-sm lg:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-secondary-light mb-3 md:mb-4 block">
              {data.heroHeadline}
            </span>
          )}

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-3 md:mb-4 leading-tight">
            {data.heroTitle}
          </h1>

          {data.heroSubtitle && (
            <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-200 mb-2">
              {data.heroSubtitle}
            </p>
          )}

          {data.heroDescription && (
            <p className="text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
              {data.heroDescription}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
            {settings?.bookingUrl && data.heroCta && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.open(settings.bookingUrl, '_blank')}
              >
                {data.heroCta}
              </Button>
            )}

            {data.heroCtaSecondary && (
              <Button variant="secondary" size="lg" onClick={scrollToContent}>
                {data.heroCtaSecondary}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  )
}
