import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2w8dspai',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seedData() {
  console.log('🌱 Starting Sanity seed...')

  try {
    // 1. Site Settings
    console.log('📝 Creating site settings...')
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'Athmaya Villa',
      tagline: 'Your Private Paradise in Ahangama',
      currency: 'USD',
      email: 'contact@athmayavilla.com',
      phone: '+94 77 123 4567',
      whatsapp: '94771234567',
      address: {
        line1: 'Ahangama Beach Road',
        city: 'Ahangama',
        country: 'Sri Lanka',
      },
      coordinates: {
        lat: 5.9811773,
        lng: 80.3651535,
      },
      instagram: 'https://instagram.com/athmayavilla',
      facebook: 'https://facebook.com/athmayavilla',
      bookingUrl: 'https://www.booking.com/hotel/lk/athmaya-villa-ahangama.html',
      seoTitle: 'Athmaya Villa - Luxury Beach Villa in Ahangama, Sri Lanka',
      seoDescription: 'Experience tropical luxury at Athmaya Villa. Private pool, ocean views, and authentic Sri Lankan hospitality in the heart of Ahangama.',
      seoKeywords: ['Ahangama villa', 'Sri Lanka luxury accommodation', 'beach villa', 'private pool', 'surf villa'],
    })

    // 2. Homepage
    console.log('🏠 Creating homepage content...')
    await client.createOrReplace({
      _id: 'homepage',
      _type: 'homepage',
      heroTitle: 'Athmaya Villa',
      heroSubtitle: 'Ahangama, Sri Lanka',
      heroHeadline: 'Your Private Tropical Paradise',
      heroDescription: 'Escape to serenity at our exclusive beachside villa. Wake up to ocean breezes, swim in your private pool, and discover the magic of Sri Lanka\'s southern coast.',
      heroCta: 'Book Your Stay',
      heroCtaSecondary: 'Explore the Villa',
      aboutTitle: 'Welcome to Athmaya',
      aboutSubtitle: 'A Place of Soul & Spirit',
      aboutDescription: 'Nestled in the serene coastal village of Ahangama, Athmaya Villa offers an authentic Sri Lankan experience combined with modern luxury. Our name "Athmaya" means "soul" in Sinhalese, reflecting our commitment to providing a soulful retreat where guests can reconnect with nature, themselves, and the vibrant local culture. Just minutes from pristine beaches and world-class surf breaks, our villa is your gateway to exploring the wonders of Sri Lanka\'s southern coast.',
      aboutHighlights: [
        { icon: 'palmtree', title: 'Beachfront Location', description: '5 minutes walk to Ahangama Beach' },
        { icon: 'pool', title: 'Private Pool', description: 'Infinity pool with garden views' },
        { icon: 'users', title: 'Perfect for Groups', description: 'Ideal for families and friends' },
        { icon: 'utensils', title: 'Local Cuisine', description: 'Authentic Sri Lankan breakfast included' },
        { icon: 'waves', title: 'Surf Paradise', description: 'Near famous surf spots' },
        { icon: 'heart', title: 'Personal Service', description: 'Dedicated staff for your comfort' },
      ],
      amenitiesTitle: 'Villa Amenities',
      amenitiesSubtitle: 'Everything You Need',
      experiencesTitle: 'Local Experiences',
      experiencesSubtitle: 'Discover Sri Lanka',
      experiencesDescription: 'From world-class surfing to ancient temples, Sri Lanka\'s south coast offers endless adventures. Let us arrange unforgettable experiences for you.',
      pricingTitle: 'Rates & Packages',
      pricingSubtitle: 'Transparent Pricing',
      pricingDescription: 'All-inclusive rates with no hidden fees. Your perfect vacation starts here.',
      pricingInclusions: [
        'Daily breakfast',
        'Airport transfer on request',
        'Pool & garden access',
        'WiFi',
        'Daily housekeeping',
        'Concierge service',
        'Beach towels & equipment',
      ],
      pricingNotes: [
        '50% deposit required to confirm booking',
        'Free cancellation up to 14 days before arrival',
        'Check-in: 2:00 PM / Check-out: 11:00 AM',
      ],
      locationTitle: 'Location',
      locationSubtitle: 'Southern Sri Lanka',
      locationDescription: 'Located in the peaceful fishing village of Ahangama, our villa offers the perfect balance of seclusion and accessibility. Galle Fort, beaches, and local attractions are all within easy reach.',
      nearbyPlaces: [
        { name: 'Ahangama Beach', distance: '500m', time: '5 min walk' },
        { name: 'Kabalana Surf Point', distance: '1 km', time: '3 min drive' },
        { name: 'Galle Fort (UNESCO)', distance: '20 km', time: '30 min drive' },
        { name: 'Mirissa Beach', distance: '15 km', time: '25 min drive' },
        { name: 'Weligama Bay', distance: '10 km', time: '15 min drive' },
        { name: 'Koggala Lake', distance: '8 km', time: '12 min drive' },
      ],
      gettingHere: {
        fromAirport: 'Bandaranaike International Airport (CMB) is approximately 150 km away. We can arrange private transfer (3-4 hours) or you can take a scenic train journey.',
        byTrain: 'Take the coastal train from Colombo to Ahangama station (4-5 hours). One of the most beautiful train rides in the world!',
        byBus: 'Regular buses run from Colombo and Galle to Ahangama. The bus stop is a short tuk-tuk ride from the villa.',
      },
    })

    // 3. Rooms
    console.log('🛏️ Creating rooms...')
    const rooms = [
      {
        _type: 'room',
        name: 'Master Suite',
        slug: { current: 'master-suite' },
        description: 'Our spacious master suite features a king-size bed, en-suite bathroom with rain shower, and private balcony overlooking the garden and pool. Wake up to tropical birdsong and enjoy your morning coffee with a view.',
        size: '45 m²',
        bedType: 'king',
        capacity: 2,
        features: ['Air conditioning', 'Ceiling fan', 'En-suite bathroom', 'Rain shower', 'Private balcony', 'Wardrobe', 'Safe', 'Mosquito net'],
        order: 1,
      },
      {
        _type: 'room',
        name: 'Garden Room',
        slug: { current: 'garden-room' },
        description: 'A comfortable double room with direct access to the lush tropical garden. Features a queen-size bed and modern en-suite bathroom. Perfect for couples seeking a peaceful retreat.',
        size: '35 m²',
        bedType: 'queen',
        capacity: 2,
        features: ['Air conditioning', 'Ceiling fan', 'En-suite bathroom', 'Garden access', 'Wardrobe', 'Mosquito net'],
        order: 2,
      },
      {
        _type: 'room',
        name: 'Twin Room',
        slug: { current: 'twin-room' },
        description: 'Flexible room with two single beds that can be converted to a king bed upon request. Ideal for friends traveling together or families with children.',
        size: '30 m²',
        bedType: 'twin',
        capacity: 2,
        features: ['Air conditioning', 'Ceiling fan', 'Shared bathroom', 'Wardrobe', 'Mosquito net'],
        order: 3,
      },
    ]

    for (const room of rooms) {
      await client.create(room)
    }

    // 4. Amenity Categories
    console.log('🏠 Creating amenity categories...')
    const amenities = [
      {
        _type: 'amenityCategory',
        name: 'Outdoor Living',
        icon: 'sun',
        items: ['Private infinity pool', 'Tropical garden', 'Outdoor dining area', 'Sun loungers', 'Hammocks', 'BBQ facilities', 'Outdoor shower'],
        order: 1,
      },
      {
        _type: 'amenityCategory',
        name: 'Indoor Comfort',
        icon: 'home',
        items: ['Air conditioning in all rooms', 'Ceiling fans', 'Fully equipped kitchen', 'Living & dining area', 'Smart TV', 'Bluetooth speakers', 'Board games & books'],
        order: 2,
      },
      {
        _type: 'amenityCategory',
        name: 'Services',
        icon: 'bell',
        items: ['Daily housekeeping', 'Breakfast included', 'Laundry service', 'Airport transfers', 'Tour arrangements', '24/7 support'],
        order: 3,
      },
      {
        _type: 'amenityCategory',
        name: 'Wellness',
        icon: 'spa',
        items: ['Yoga mats available', 'Massage on request', 'Meditation space', 'Healthy meal options'],
        order: 4,
      },
    ]

    for (const amenity of amenities) {
      await client.create(amenity)
    }

    // 5. Experiences
    console.log('🧭 Creating experiences...')
    const experiences = [
      {
        _type: 'experience',
        title: 'Surfing at Kabalana',
        description: 'Ahangama is home to some of Sri Lanka\'s best surf breaks. Whether you\'re a beginner or pro, catch perfect waves at Kabalana, The Rock, or Lazy Left. We can arrange lessons and board rentals.',
        duration: 'Half day',
        distance: '1 km',
        tags: ['adventure', 'water-sports'],
        order: 1,
      },
      {
        _type: 'experience',
        title: 'Galle Fort Exploration',
        description: 'Discover the UNESCO World Heritage Galle Fort, a stunning 16th-century colonial fortress. Explore boutique shops, art galleries, and cafes within ancient walls overlooking the Indian Ocean.',
        duration: '3-4 hours',
        distance: '20 km',
        tags: ['culture', 'history'],
        order: 2,
      },
      {
        _type: 'experience',
        title: 'Whale Watching in Mirissa',
        description: 'Embark on an unforgettable morning excursion to spot blue whales, sperm whales, and playful dolphins. Best season: November to April. Early morning departure for best sightings.',
        duration: 'Half day',
        distance: '15 km',
        tags: ['wildlife', 'adventure'],
        order: 3,
      },
      {
        _type: 'experience',
        title: 'Sri Lankan Cooking Class',
        description: 'Learn to prepare authentic Sri Lankan cuisine with our local chef. Visit the market to select fresh ingredients, then create delicious curries, sambols, and hoppers in our kitchen.',
        duration: '3 hours',
        distance: 'On-site',
        tags: ['food-drink', 'culture'],
        order: 4,
      },
      {
        _type: 'experience',
        title: 'Koggala Lake Safari',
        description: 'Glide through the serene waters of Koggala Lake on a traditional boat. Visit cinnamon islands, see stilt fishermen, spot exotic birds, and experience local village life.',
        duration: '2-3 hours',
        distance: '8 km',
        tags: ['wildlife', 'relaxation', 'photography'],
        order: 5,
      },
      {
        _type: 'experience',
        title: 'Temple & Tea Plantation Tour',
        description: 'Combine spirituality and scenery with visits to ancient Buddhist temples and lush tea plantations in the hills. Learn about tea production and enjoy tastings with panoramic views.',
        duration: 'Full day',
        distance: '50 km',
        tags: ['culture', 'history', 'photography'],
        order: 6,
      },
    ]

    for (const exp of experiences) {
      await client.create(exp)
    }

    // 6. Seasons
    console.log('💰 Creating seasons...')
    const seasons = [
      {
        _type: 'season',
        name: 'Green Season',
        period: 'May - October',
        pricePerNight: 250,
        minNights: 2,
        description: 'Lush landscapes, occasional tropical showers, fewer crowds',
        isPopular: false,
        order: 1,
      },
      {
        _type: 'season',
        name: 'High Season',
        period: 'November - April',
        pricePerNight: 350,
        minNights: 3,
        description: 'Perfect weather, ideal for beach and surfing',
        isPopular: true,
        order: 2,
      },
      {
        _type: 'season',
        name: 'Peak Season',
        period: 'December 20 - January 10',
        pricePerNight: 450,
        minNights: 5,
        description: 'Christmas & New Year period',
        isPopular: false,
        order: 3,
      },
    ]

    for (const season of seasons) {
      await client.create(season)
    }

    // 7. Extras
    console.log('➕ Creating extras...')
    const extras = [
      { _type: 'extra', name: 'Airport Transfer', price: 80, unit: 'per_trip', description: 'Private car from/to Colombo Airport', order: 1 },
      { _type: 'extra', name: 'Scooter Rental', price: 15, unit: 'per_day', description: 'Explore the area on two wheels', order: 2 },
      { _type: 'extra', name: 'Surf Lesson', price: 40, unit: 'per_person', description: '2-hour lesson with local instructor', order: 3 },
      { _type: 'extra', name: 'Private Chef Dinner', price: 50, unit: 'per_person', description: '3-course meal with local chef', order: 4 },
      { _type: 'extra', name: 'Yoga Session', price: 25, unit: 'per_person', description: 'Private session with certified instructor', order: 5 },
      { _type: 'extra', name: 'Massage', price: 35, unit: 'per_hour', description: 'Traditional Ayurvedic massage', order: 6 },
      { _type: 'extra', name: 'Laundry Service', price: 10, unit: 'flat', description: 'Wash & fold per load', order: 7 },
      { _type: 'extra', name: 'Babysitting', price: 15, unit: 'per_hour', description: 'Trusted local caregiver', order: 8 },
    ]

    for (const extra of extras) {
      await client.create(extra)
    }

    // 8. FAQ
    console.log('❓ Creating FAQ...')
    const faqs = [
      {
        _type: 'faqItem',
        question: 'How far is Athmaya Villa from the beach?',
        answer: 'The villa is just 500 meters (5 minutes walk) from Ahangama Beach. We provide beach towels and chairs for your convenience.',
        order: 1,
      },
      {
        _type: 'faqItem',
        question: 'Is the villa suitable for families with children?',
        answer: 'Absolutely! We welcome families. The villa has a private pool (not fenced, so supervision required), spacious rooms, and we can arrange a cot or extra bed. The staff loves kids and the beach is great for children.',
        order: 2,
      },
      {
        _type: 'faqItem',
        question: 'What\'s included in the daily rate?',
        answer: 'Our rates include: daily breakfast (Sri Lankan or Western), daily housekeeping, pool and garden access, WiFi, beach towels, and concierge service. Airport transfers can be arranged for an additional fee.',
        order: 3,
      },
      {
        _type: 'faqItem',
        question: 'Is it a good location for surfing?',
        answer: 'Yes! Ahangama is famous for surfing. Kabalana beach (1 km away) offers waves for all levels. We can arrange surf lessons, board rentals, and recommend the best spots based on conditions.',
        order: 4,
      },
      {
        _type: 'faqItem',
        question: 'How do I get to the villa from Colombo Airport?',
        answer: 'The villa is about 150 km from Colombo Airport (3-4 hours by car). We can arrange a private transfer for $80 each way. Alternatively, take the scenic coastal train to Ahangama station (4-5 hours) – one of the world\'s most beautiful train rides!',
        order: 5,
      },
      {
        _type: 'faqItem',
        question: 'What\'s the best time to visit?',
        answer: 'The best weather is from November to April (dry season). December to March is peak season with perfect conditions. May to October (green season) offers lower rates and lush landscapes with occasional rain showers, usually in the afternoon.',
        order: 6,
      },
      {
        _type: 'faqItem',
        question: 'Do you accept pets?',
        answer: 'Yes, we are pet-friendly! Please let us know in advance if you\'re bringing a furry friend so we can prepare accordingly. A small additional cleaning fee may apply.',
        order: 7,
      },
    ]

    for (const faq of faqs) {
      await client.create(faq)
    }

    // 9. Testimonials
    console.log('⭐ Creating testimonials...')
    const testimonials = [
      {
        _type: 'testimonial',
        name: 'Sarah & James',
        location: 'London, UK',
        date: 'December 2024',
        rating: 5,
        text: 'An absolute paradise! The villa exceeded all our expectations. The pool was perfect, breakfast was delicious, and the staff made us feel like family. We\'ll definitely be back!',
        featured: true,
        order: 1,
      },
      {
        _type: 'testimonial',
        name: 'Thomas',
        location: 'Berlin, Germany',
        date: 'February 2024',
        rating: 5,
        text: 'Perfect surf trip! Waves right at the doorstep, amazing food, and the most welcoming hosts. The villa is beautifully designed and incredibly peaceful. Highly recommend for surfers and non-surfers alike.',
        featured: true,
        order: 2,
      },
      {
        _type: 'testimonial',
        name: 'The Martinez Family',
        location: 'Barcelona, Spain',
        date: 'August 2024',
        rating: 5,
        text: 'We stayed with our two kids and had the most wonderful family vacation. The staff arranged everything from cooking classes to whale watching. Kids loved the pool and the beach. A magical place!',
        featured: false,
        order: 3,
      },
      {
        _type: 'testimonial',
        name: 'Emma',
        location: 'Sydney, Australia',
        date: 'January 2024',
        rating: 5,
        text: 'Spent a week here for a digital detox and it was exactly what I needed. The yoga sessions, fresh food, and peaceful atmosphere helped me completely recharge. The sunset views from the pool are unforgettable.',
        featured: false,
        order: 4,
      },
    ]

    for (const testimonial of testimonials) {
      await client.create(testimonial)
    }

    console.log('✅ Seed completed successfully!')
    console.log('')
    console.log('📸 N\'oublie pas d\'ajouter les images manuellement dans Sanity Studio:')
    console.log('   - Hero image (Page d\'accueil)')
    console.log('   - About image (Page d\'accueil)')
    console.log('   - Photos des chambres')
    console.log('   - Photos des expériences')
    console.log('   - Galerie photos')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
