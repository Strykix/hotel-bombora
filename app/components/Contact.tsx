'use client'

import { motion } from 'framer-motion'
import { SiteSettings } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import Button from './ui/Button'
import { Mail, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react'

interface ContactProps {
  settings: SiteSettings | null
}

export default function Contact({ settings }: ContactProps) {
  if (!settings) return null

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          title="Get in Touch"
          subtitle="Contact Us"
          description="Ready to book your stay or have questions? We're here to help."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Contact Info */}
          <div className="space-y-6">
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-4 p-4 bg-accent hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{settings.email}</p>
                </div>
              </a>
            )}

            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 bg-accent hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{settings.phone}</p>
                </div>
              </a>
            )}

            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello! I'm interested in booking Athmaya Villa...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-accent hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-medium text-gray-900">Message us directly</p>
                </div>
              </a>
            )}

            {/* Social Links */}
            {(settings.instagram || settings.facebook) && (
              <div className="flex gap-4 pt-4">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Booking CTA */}
          <div className="bg-primary p-8 text-white text-center flex flex-col justify-center">
            <h3 className="font-serif text-2xl mb-4">Ready to Book?</h3>
            <p className="text-gray-300 mb-6">
              Secure your tropical getaway today. We offer flexible booking options and personalized service.
            </p>

            <div className="space-y-4">
              {settings.bookingUrl && (
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => window.open(settings.bookingUrl, '_blank')}
                >
                  Book on Booking.com
                </Button>
              )}

              {settings.airbnbUrl && (
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-gray-900"
                  onClick={() => window.open(settings.airbnbUrl, '_blank')}
                >
                  Book on Airbnb
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
