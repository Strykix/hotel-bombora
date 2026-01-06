import { SiteSettings } from '@/lib/types'
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#rooms', label: 'Rooms' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#experiences', label: 'Experiences' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">
              {settings?.siteName || 'Athmaya Villa'}
            </h3>
            {settings?.tagline && (
              <p className="text-gray-400 mb-6">{settings.tagline}</p>
            )}

            {/* Social Links */}
            {(settings?.instagram || settings?.facebook) && (
              <div className="flex gap-4">
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              {settings?.address && (
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    {settings.address.line1 && <>{settings.address.line1}<br /></>}
                    {settings.address.city && <>{settings.address.city}, </>}
                    {settings.address.country}
                  </span>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex gap-3 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="flex gap-3 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="font-medium text-lg mb-4">Book Your Stay</h4>
            <div className="space-y-3">
              {settings?.bookingUrl && (
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-white/10 text-center hover:bg-white/20 transition-colors"
                >
                  Booking.com
                </a>
              )}
              {settings?.airbnbUrl && (
                <a
                  href={settings.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-white/10 text-center hover:bg-white/20 transition-colors"
                >
                  Airbnb
                </a>
              )}
              {settings?.tripadvisor && (
                <a
                  href={settings.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-white/10 text-center hover:bg-white/20 transition-colors"
                >
                  TripAdvisor
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; {currentYear} {settings?.siteName || 'Athmaya Villa'}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
