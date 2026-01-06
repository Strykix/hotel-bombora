'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export default function WhatsAppButton({
  phone,
  message = "Hello! I'm interested in booking...",
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true)
      }, 3000)

      const hideTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 8000)

      return () => {
        clearTimeout(tooltipTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [isVisible])

  if (!phone) return null

  // wa.me works on both mobile and desktop
  // Mobile: opens WhatsApp app directly
  // Desktop: opens web.whatsapp.com
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-full right-0 mb-2"
              >
                <div className="relative bg-white px-4 py-2 rounded-lg shadow-lg text-sm text-gray-700 whitespace-nowrap">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  Need help? Chat with us!
                  <div className="absolute bottom-0 right-4 translate-y-full">
                    <div className="border-8 border-transparent border-t-white" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </a>

          {/* Pulse Animation - pointer-events-none to not block clicks */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
