'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Room, SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import SectionTitle from './ui/SectionTitle'
import Modal from './ui/Modal'
import { Users, Maximize, ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomsProps {
  rooms: Room[]
  settings?: SiteSettings | null
}

const bedTypeLabels: Record<string, string> = {
  king: 'King Size Bed',
  queen: 'Queen Size Bed',
  twin: 'Twin Beds',
  single: 'Single Bed',
}

export default function Rooms({ rooms, settings }: RoomsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!rooms || rooms.length === 0) return null

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      )
    }
  }

  const handleRoomClick = (room: Room, e: React.MouseEvent) => {
    // Check if mobile (screen width < 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // Let the Link handle navigation on mobile
      return
    }
    // On desktop, prevent default and show modal
    e.preventDefault()
    setSelectedRoom(room)
    setCurrentImageIndex(0)
  }

  return (
    <section id="rooms" className="section-padding bg-accent overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Accommodations"
          subtitle="Our Rooms"
          description="Discover our beautifully appointed rooms, each designed for your comfort and relaxation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/rooms/${room.slug?.current || room._id}`}
                onClick={(e) => handleRoomClick(room, e)}
                className="group cursor-pointer bg-white block"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {room.images && room.images[0] && (
                    <Image
                      src={urlFor(room.images[0]).width(600).height(450).url()}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
                  <h3 className="font-serif text-lg md:text-xl font-medium text-gray-900 mb-1 md:mb-2">
                    {room.name}
                  </h3>

                  <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    {room.capacity && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {room.capacity} pers.
                      </span>
                    )}
                    {room.size && (
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {room.size}
                      </span>
                    )}
                  </div>

                  {room.bedType && (
                    <p className="text-xs md:text-sm text-gray-500">
                      {bedTypeLabels[room.bedType]}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal - Desktop only */}
      <Modal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
      >
        {selectedRoom && (
          <div className="bg-white">
            {/* Image Gallery */}
            <div className="relative aspect-video">
              <AnimatePresence mode="wait">
                {selectedRoom.images && selectedRoom.images[currentImageIndex] && (
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={urlFor(selectedRoom.images[currentImageIndex])
                        .width(1200)
                        .height(675)
                        .url()}
                      alt={selectedRoom.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {selectedRoom.images && selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedRoom.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(idx)
                        }}
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
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-2xl font-medium text-gray-900 mb-4">
                {selectedRoom.name}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {selectedRoom.capacity && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Up to {selectedRoom.capacity} guests
                  </span>
                )}
                {selectedRoom.size && (
                  <span className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {selectedRoom.size}
                  </span>
                )}
                {selectedRoom.bedType && (
                  <span>{bedTypeLabels[selectedRoom.bedType]}</span>
                )}
              </div>

              {selectedRoom.description && (
                <p className="text-gray-600 mb-6">{selectedRoom.description}</p>
              )}

              {/* Features */}
              {selectedRoom.features && selectedRoom.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Room Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent text-sm text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              {settings?.bookingUrl && (
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  Book This Room
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
