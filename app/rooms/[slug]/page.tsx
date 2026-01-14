'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Maximize, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { Room, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'

const bedTypeLabels: Record<string, string> = {
  king: 'King Size Bed',
  queen: 'Queen Size Bed',
  twin: 'Twin Beds',
  single: 'Single Bed',
}

export default function RoomPage() {
  const params = useParams()
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [roomRes, settingsRes] = await Promise.all([
          fetch(`/api/room/${params.slug}`),
          fetch('/api/settings')
        ])

        if (roomRes.ok) {
          const roomData = await roomRes.json()
          setRoom(roomData)
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json()
          setSettings(settingsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchData()
    }
  }, [params.slug])

  const nextImage = () => {
    if (room?.images) {
      setCurrentImageIndex((prev) =>
        prev === room.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (room?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? room.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-accent">
        <p className="text-gray-600 mb-4">Room not found</p>
        <Link href="/#rooms" className="text-primary hover:underline">
          Back to rooms
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="container-custom py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>

          {settings?.bookingUrl && (
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2"
            >
              Book Now
            </a>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative aspect-[4/3] md:aspect-video bg-gray-100">
        <AnimatePresence mode="wait">
          {room.images && room.images[currentImageIndex] && (
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image
                src={urlFor(room.images[currentImageIndex])
                  .width(1200)
                  .fit('max')
                  .url()}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {room.images && room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white transition-colors rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white transition-colors rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {room.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          {room.name}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          {room.capacity && (
            <span className="flex items-center gap-2 bg-accent px-3 py-2 rounded">
              <Users className="w-4 h-4" />
              Up to {room.capacity} guests
            </span>
          )}
          {room.size && (
            <span className="flex items-center gap-2 bg-accent px-3 py-2 rounded">
              <Maximize className="w-4 h-4" />
              {room.size}
            </span>
          )}
          {room.bedType && (
            <span className="bg-accent px-3 py-2 rounded">
              {bedTypeLabels[room.bedType]}
            </span>
          )}
        </div>

        {room.description && (
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {room.description}
          </p>
        )}

        {/* Features */}
        {room.features && room.features.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-xl text-gray-900 mb-4">Room Features</h2>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-accent text-gray-700 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Book Now CTA */}
        {settings?.bookingUrl && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:relative md:border-0 md:p-0 md:mt-8">
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full md:w-auto justify-center"
            >
              Book This Room
            </a>
          </div>
        )}
      </div>

      {/* Spacer for fixed bottom button on mobile */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
