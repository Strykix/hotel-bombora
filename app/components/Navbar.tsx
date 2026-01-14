'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SiteSettings } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  settings: SiteSettings | null
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-50">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(150).height(50).url()}
                alt={settings.siteName || 'Logo'}
                width={150}
                height={50}
                className={isScrolled ? '' : 'brightness-0 invert'}
              />
            ) : (
              <span
                className={`font-serif text-2xl ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {settings?.siteName || 'Athmaya Villa'}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wide transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {settings?.bookingUrl && (
              <a
                href={settings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book Now
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${
              isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-white lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-gray-900 hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              {settings?.bookingUrl && (
                <motion.a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="btn-primary mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
