'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Testimonial } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  if (!testimonials || testimonials.length === 0) return null

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="section-padding bg-primary text-white overflow-hidden">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          title="Guest Reviews"
          subtitle="Testimonials"
          light
        />

        <div
          className="relative"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {/* Quote Icon */}
          <Quote className="w-16 h-16 text-secondary/30 mx-auto mb-8" />

          {/* Testimonial Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Rating */}
              {current.rating && (
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating!
                          ? 'text-secondary fill-secondary'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Text */}
              <p className="text-base md:text-xl lg:text-2xl font-light leading-relaxed mb-6 md:mb-8 px-2">
                &ldquo;{current.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {current.avatar && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(current.avatar).width(100).height(100).url()}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">{current.name}</p>
                  <p className="text-sm text-gray-300">
                    {current.location}
                    {current.date && ` • ${current.date}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300 touch-manipulation"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300 touch-manipulation"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-secondary' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
