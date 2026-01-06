import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { getSettings } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()

  return {
    title: settings?.seoTitle || settings?.siteName || 'Luxury Villa',
    description: settings?.seoDescription || 'A luxury villa experience',
    keywords: settings?.seoKeywords?.join(', '),
    openGraph: {
      title: settings?.seoTitle || settings?.siteName,
      description: settings?.seoDescription,
      images: settings?.ogImage ? [urlFor(settings.ogImage).width(1200).height(630).url()] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seoTitle || settings?.siteName,
      description: settings?.seoDescription,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} overflow-x-hidden`}>
      <body className="font-sans antialiased overflow-x-hidden w-full max-w-full">
        <div className="relative w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
