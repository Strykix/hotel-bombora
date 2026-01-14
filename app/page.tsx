import { getAllPageData } from '@/lib/sanity.queries'
import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Rooms from '@/app/components/Rooms'
import Amenities from '@/app/components/Amenities'
import Experiences from '@/app/components/Experiences'
import Gallery from '@/app/components/Gallery'
import Pricing from '@/app/components/Pricing'
import Location from '@/app/components/Location'
import FAQ from '@/app/components/FAQ'
import Testimonials from '@/app/components/Testimonials'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/app/components/WhatsAppButton'

export const revalidate = 0 // Always fetch fresh data

export default async function HomePage() {
  const data = await getAllPageData()

  return (
    <>
      <Navbar settings={data.settings} />

      <main className="overflow-x-hidden">
        <Hero data={data.homepage} settings={data.settings} />
        <About data={data.homepage} />
        <Rooms rooms={data.rooms} settings={data.settings} />
        <Amenities
          data={data.homepage}
          categories={data.amenities}
        />
        <Experiences
          data={data.homepage}
          experiences={data.experiences}
        />
        <Gallery images={data.gallery} />
        <Pricing
          data={data.homepage}
          seasons={data.seasons}
          extras={data.extras}
          currency={data.settings?.currency}
        />
        <Testimonials testimonials={data.testimonials} />
        <Location data={data.homepage} settings={data.settings} />
        <FAQ items={data.faq} />
        <Contact settings={data.settings} />
      </main>

      <Footer settings={data.settings} />

      <WhatsAppButton
        phone={data.settings?.whatsapp}
        message={`Hello! I'm interested in booking ${data.settings?.siteName || 'your property'}...`}
      />
    </>
  )
}
