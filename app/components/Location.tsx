'use client'

import { motion } from 'framer-motion'
import { Homepage, SiteSettings } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import { MapPin, Clock, Plane, Train, Bus, Car, Navigation } from 'lucide-react'

interface LocationProps {
  data: Homepage | null
  settings: SiteSettings | null
}

export default function Location({ data, settings }: LocationProps) {
  if (!data) return null

  const hasGettingHere =
    data.gettingHere?.fromAirport ||
    data.gettingHere?.byTrain ||
    data.gettingHere?.byBus

  return (
    <section id="location" className="section-padding bg-accent overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title={data.locationTitle || 'Location'}
          subtitle={data.locationSubtitle || 'Find Us'}
          description={data.locationDescription}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-auto lg:min-h-[500px] bg-gray-200"
          >
            {(() => {
              // Build address string from settings
              const addressParts = []
              if (settings?.siteName) addressParts.push(settings.siteName)
              if (settings?.address?.line1) addressParts.push(settings.address.line1)
              if (settings?.address?.city) addressParts.push(settings.address.city)
              if (settings?.address?.country) addressParts.push(settings.address.country)
              const mapQuery = addressParts.length > 0
                ? encodeURIComponent(addressParts.join(', '))
                : settings?.coordinates?.lat && settings?.coordinates?.lng
                  ? `${settings.coordinates.lat},${settings.coordinates.lng}`
                  : null

              return mapQuery ? (
                <iframe
                  src={`https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <MapPin className="w-16 h-16" />
                </div>
              )
            })()}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Address */}
            {settings?.address && (
              <div className="mb-8">
                <h3 className="font-serif text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address
                </h3>
                <p className="text-gray-600 mb-4">
                  {settings.address.line1 && <>{settings.address.line1}<br /></>}
                  {settings.address.line2 && <>{settings.address.line2}<br /></>}
                  {settings.address.city && <>{settings.address.city}, </>}
                  {settings.address.country}
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Google Maps Directions */}
                  {(settings?.coordinates?.lat && settings?.coordinates?.lng) && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${settings.coordinates.lat},${settings.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                  )}

                  {/* PickMe Button - Opens app on mobile via Android App Link */}
                  <a
                    href="https://pickme.lk/app"
                    onClick={(e) => {
                      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
                      const isAndroid = /Android/.test(navigator.userAgent)

                      if (isAndroid) {
                        e.preventDefault()
                        // Use Android App Links - this opens the app directly if installed
                        window.location.href = 'intent://pickme.lk/#Intent;scheme=https;package=com.pickme.passenger;action=android.intent.action.VIEW;end'
                      } else if (isIOS) {
                        e.preventDefault()
                        window.location.href = 'pickme://'
                      } else {
                        // Desktop - let default href work
                        e.preventDefault()
                        window.open('https://pickme.lk', '_blank')
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B900] text-white text-sm font-medium hover:bg-[#00A000] transition-colors cursor-pointer"
                  >
                    <Car className="w-4 h-4" />
                    Book with PickMe
                  </a>
                </div>
              </div>
            )}

            {/* Nearby Places */}
            {data.nearbyPlaces && data.nearbyPlaces.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-xl text-gray-900 mb-4">
                  Nearby Attractions
                </h3>
                <div className="space-y-3">
                  {data.nearbyPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-700">{place.name}</span>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {place.distance}
                        </span>
                        {place.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {place.time}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Getting Here */}
            {hasGettingHere && (
              <div>
                <h3 className="font-serif text-xl text-gray-900 mb-4">
                  Getting Here
                </h3>
                <div className="space-y-4">
                  {data.gettingHere?.fromAirport && (
                    <div className="flex gap-3">
                      <Plane className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 mb-1">From Airport</p>
                        <p className="text-sm text-gray-600">
                          {data.gettingHere.fromAirport}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.gettingHere?.byTrain && (
                    <div className="flex gap-3">
                      <Train className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 mb-1">By Train</p>
                        <p className="text-sm text-gray-600">
                          {data.gettingHere.byTrain}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.gettingHere?.byBus && (
                    <div className="flex gap-3">
                      <Bus className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 mb-1">By Bus</p>
                        <p className="text-sm text-gray-600">
                          {data.gettingHere.byBus}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
