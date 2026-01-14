import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '2w8dspai',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateData() {
  console.log('🔄 Updating to The Atrium Hiriketiya...')

  try {
    // Delete all existing documents except singletons
    console.log('🗑️ Cleaning old data...')
    await client.delete({ query: '*[_type == "room"]' })
    await client.delete({ query: '*[_type == "amenityCategory"]' })
    await client.delete({ query: '*[_type == "experience"]' })
    await client.delete({ query: '*[_type == "season"]' })
    await client.delete({ query: '*[_type == "extra"]' })
    await client.delete({ query: '*[_type == "faqItem"]' })
    await client.delete({ query: '*[_type == "testimonial"]' })
    await client.delete({ query: '*[_type == "galleryImage"]' })

    // 1. Site Settings
    console.log('📝 Updating site settings...')
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'The Atrium Hiriketiya',
      tagline: 'Your Tropical Escape in Hiriketiya',
      currency: 'USD',
      email: 'hello@theatriumhiriketiya.com',
      phone: '+94 77 123 4567',
      whatsapp: '94771234567',
      address: {
        line1: 'Kirindagewatta Hiriketiya Beach Road',
        city: 'Hiriketiya',
        country: 'Sri Lanka',
      },
      coordinates: {
        lat: 5.9667,
        lng: 80.7167,
      },
      instagram: 'https://instagram.com/theatriumhiriketiya',
      facebook: 'https://facebook.com/theatriumhiriketiya',
      bookingUrl: 'https://www.booking.com/hotel/lk/the-atrium-hiriketiya.html',
      seoTitle: 'The Atrium Hiriketiya - Boutique Hotel near Hiriketiya Beach, Sri Lanka',
      seoDescription: 'Discover The Atrium Hiriketiya, a boutique hotel just 200m from Hiriketiya Beach. Rooftop pool, lush gardens, and modern comfort in Sri Lanka\'s surf paradise.',
      seoKeywords: ['Hiriketiya hotel', 'Sri Lanka beach hotel', 'surf hotel', 'boutique hotel', 'Hiriketiya Beach', 'Dickwella'],
    })

    // 2. Homepage
    console.log('🏠 Updating homepage content...')
    await client.createOrReplace({
      _id: 'homepage',
      _type: 'homepage',
      heroTitle: 'The Atrium Hiriketiya',
      heroSubtitle: 'Hiriketiya Beach, Sri Lanka',
      heroHeadline: 'Where Paradise Meets Modern Comfort',
      heroDescription: 'Just 200 meters from the famous Hiriketiya Beach, discover a boutique retreat featuring a stunning rooftop pool, lush tropical gardens, and the perfect base for your Sri Lankan adventure.',
      heroCta: 'Book Your Stay',
      heroCtaSecondary: 'Explore The Atrium',
      aboutTitle: 'Welcome to The Atrium',
      aboutSubtitle: 'Your Home in Paradise',
      aboutDescription: 'Nestled in the heart of Hiriketiya, Sri Lanka\'s most beloved surf destination, The Atrium offers a perfect blend of modern comfort and tropical charm. Our boutique hotel features 8 beautifully designed rooms, a spectacular rooftop infinity pool, and is just a 2-minute walk from the pristine Hiriketiya Beach. Whether you\'re here to catch waves, explore ancient temples, or simply unwind under swaying palms, The Atrium is your perfect sanctuary.',
      aboutHighlights: [
        { icon: 'waves', title: 'Beachfront Location', description: '200m walk to Hiriketiya Beach' },
        { icon: 'pool', title: 'Rooftop Pool', description: 'Infinity pool with panoramic views' },
        { icon: 'utensils', title: 'Free Breakfast', description: 'Daily breakfast included' },
        { icon: 'wifi', title: 'Free WiFi', description: 'High-speed internet throughout' },
        { icon: 'car', title: 'Free Parking', description: 'Private parking available' },
        { icon: 'heart', title: 'Highly Rated', description: '9.6/10 location score' },
      ],
      amenitiesTitle: 'Hotel Amenities',
      amenitiesSubtitle: 'Everything You Need',
      experiencesTitle: 'Local Experiences',
      experiencesSubtitle: 'Discover Hiriketiya',
      experiencesDescription: 'From world-class surf breaks to ancient temples and stunning beaches, Hiriketiya offers endless adventures. Let us help you explore the best of Sri Lanka\'s south coast.',
      pricingTitle: 'Rates & Packages',
      pricingSubtitle: 'Transparent Pricing',
      pricingDescription: 'Competitive rates with breakfast included. Your perfect beach vacation starts here.',
      pricingInclusions: [
        'Daily breakfast',
        'Rooftop pool access',
        'Free WiFi',
        'Free private parking',
        'Garden & terrace access',
        'Daily housekeeping',
        'Concierge service',
      ],
      pricingNotes: [
        '50% deposit required to confirm booking',
        'Free cancellation up to 7 days before arrival',
        'Check-in: 2:00 PM / Check-out: 11:00 AM',
      ],
      locationTitle: 'Location',
      locationSubtitle: 'Heart of Hiriketiya',
      locationDescription: 'Perfectly positioned in the center of Hiriketiya, our hotel offers easy access to the beach, restaurants, and bars. Walk to everything while enjoying a peaceful retreat.',
      nearbyPlaces: [
        { name: 'Hiriketiya Beach', distance: '200m', time: '2 min walk' },
        { name: 'Dickwella Beach', distance: '1 km', time: '13 min walk' },
        { name: 'Kudawella Beach', distance: '3 km', time: '8 min drive' },
        { name: 'Hummanaya Blow Hole', distance: '5.6 km', time: '12 min drive' },
        { name: 'Weherahena Buddhist Temple', distance: '19 km', time: '30 min drive' },
        { name: 'Mirissa Beach', distance: '25 km', time: '40 min drive' },
      ],
      gettingHere: {
        fromAirport: 'Bandaranaike International Airport (CMB) is approximately 180 km away. We can arrange private transfer (4-5 hours) or you can take a scenic train journey to Matara, then a short taxi ride.',
        byTrain: 'Take the coastal train from Colombo to Matara station (4-5 hours), then a 20-minute taxi ride to Hiriketiya. One of the most beautiful train rides in the world!',
        byBus: 'Regular buses run from Colombo and Matara to Dickwella. From Dickwella, Hiriketiya is a short tuk-tuk ride away.',
      },
    })

    // 3. Rooms
    console.log('🛏️ Creating rooms...')
    const rooms = [
      {
        _type: 'room',
        name: 'Deluxe Double Room',
        slug: { current: 'deluxe-double' },
        description: 'Our spacious Deluxe Double Room features a comfortable double bed, modern en-suite bathroom with free toiletries, air conditioning, and a private balcony overlooking our tropical garden. Start your day with a coffee from your in-room tea and coffee maker.',
        size: '28 m²',
        bedType: 'queen',
        capacity: 2,
        features: ['Air conditioning', 'Private balcony', 'En-suite bathroom', 'Free toiletries', 'Tea/coffee maker', 'Refrigerator', 'Work desk', 'Free WiFi', 'Daily housekeeping'],
        order: 1,
      },
      {
        _type: 'room',
        name: 'Superior Double Room',
        slug: { current: 'superior-double' },
        description: 'Our Superior Double Room offers extra space and comfort with a king-size bed, stylish bathroom with bidet and rain shower, and a spacious balcony with garden views. Perfect for couples seeking a romantic getaway.',
        size: '32 m²',
        bedType: 'king',
        capacity: 2,
        features: ['Air conditioning', 'Large balcony', 'King-size bed', 'Rain shower', 'Bidet', 'Free toiletries', 'Tea/coffee maker', 'Mini fridge', 'Work desk', 'Free WiFi'],
        order: 2,
      },
      {
        _type: 'room',
        name: 'Twin Room',
        slug: { current: 'twin-room' },
        description: 'Ideal for friends or colleagues, our Twin Room features two comfortable single beds, modern amenities, and a refreshing bathroom. Enjoy easy access to the rooftop pool and all hotel facilities.',
        size: '26 m²',
        bedType: 'twin',
        capacity: 2,
        features: ['Air conditioning', 'Two single beds', 'En-suite bathroom', 'Free toiletries', 'Tea/coffee maker', 'Work desk', 'Free WiFi'],
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
        name: 'Pool & Outdoor',
        icon: 'sun',
        items: ['Rooftop infinity pool', 'Tropical garden', 'Sun terrace', 'Sun loungers', 'Outdoor shower', 'Garden seating area'],
        order: 1,
      },
      {
        _type: 'amenityCategory',
        name: 'Room Comfort',
        icon: 'home',
        items: ['Air conditioning', 'Private balcony', 'Tea/coffee maker', 'Mini refrigerator', 'Work desk', 'Free WiFi', 'Daily housekeeping'],
        order: 2,
      },
      {
        _type: 'amenityCategory',
        name: 'Services',
        icon: 'bell',
        items: ['Free breakfast', 'Airport transfers', 'Bicycle rental', 'Car rental', 'Tour arrangements', '24/7 reception', 'Luggage storage'],
        order: 3,
      },
      {
        _type: 'amenityCategory',
        name: 'Parking & Transport',
        icon: 'car',
        items: ['Free private parking', 'Accessible parking', 'Bicycle rental', 'Car rental service', 'Taxi arrangements'],
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
        title: 'Surfing at Hiriketiya',
        description: 'Hiriketiya is famous for its perfect horseshoe bay with waves for all levels. Beginners love the gentle breaks while advanced surfers can find challenging reef breaks nearby. Board rentals and lessons available.',
        duration: 'Half day',
        distance: '200m',
        tags: ['adventure', 'water-sports'],
        order: 1,
      },
      {
        _type: 'experience',
        title: 'Hummanaya Blow Hole',
        description: 'Visit Sri Lanka\'s only natural blow hole! Watch as powerful jets of water shoot up to 25 meters high. Best viewed during southwest monsoon season (May-October).',
        duration: '2 hours',
        distance: '5.6 km',
        tags: ['adventure', 'photography'],
        order: 2,
      },
      {
        _type: 'experience',
        title: 'Weherahena Temple Visit',
        description: 'Explore the impressive Weherahena Buddhist Temple featuring a massive Buddha statue and underground tunnels decorated with vibrant murals depicting Buddhist stories.',
        duration: '2-3 hours',
        distance: '19 km',
        tags: ['culture', 'history'],
        order: 3,
      },
      {
        _type: 'experience',
        title: 'Whale Watching in Mirissa',
        description: 'Embark on an unforgettable morning excursion to spot blue whales, sperm whales, and dolphins. November to April offers the best sightings. Early morning departure.',
        duration: 'Half day',
        distance: '25 km',
        tags: ['wildlife', 'adventure'],
        order: 4,
      },
      {
        _type: 'experience',
        title: 'Beach Hopping',
        description: 'Explore the stunning beaches of the south coast: Hiriketiya, Dickwella, Kudawella, and the hidden gem Talalla Beach. Each offers unique vibes and beautiful scenery.',
        duration: 'Full day',
        distance: 'Various',
        tags: ['relaxation', 'photography'],
        order: 5,
      },
      {
        _type: 'experience',
        title: 'Yoga & Wellness',
        description: 'Join daily yoga sessions at nearby studios or arrange a private session. Hiriketiya is known for its wellness scene with excellent instructors and peaceful settings.',
        duration: '1-2 hours',
        distance: '500m',
        tags: ['relaxation', 'wellness'],
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
        name: 'Low Season',
        period: 'May - October',
        pricePerNight: 73,
        minNights: 2,
        description: 'Monsoon season with occasional rain, perfect for surfing',
        isPopular: false,
        order: 1,
      },
      {
        _type: 'season',
        name: 'High Season',
        period: 'November - April',
        pricePerNight: 95,
        minNights: 2,
        description: 'Dry season with perfect beach weather',
        isPopular: true,
        order: 2,
      },
      {
        _type: 'season',
        name: 'Peak Season',
        period: 'December 20 - January 10',
        pricePerNight: 120,
        minNights: 4,
        description: 'Christmas & New Year holidays',
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
      { _type: 'extra', name: 'Airport Transfer', price: 90, unit: 'per_trip', description: 'Private car from/to Colombo Airport', order: 1 },
      { _type: 'extra', name: 'Bicycle Rental', price: 8, unit: 'per_day', description: 'Explore the area on two wheels', order: 2 },
      { _type: 'extra', name: 'Surf Board Rental', price: 15, unit: 'per_day', description: 'Quality boards for all levels', order: 3 },
      { _type: 'extra', name: 'Surf Lesson', price: 35, unit: 'per_person', description: '2-hour lesson with local instructor', order: 4 },
      { _type: 'extra', name: 'Scooter Rental', price: 12, unit: 'per_day', description: 'Freedom to explore at your pace', order: 5 },
      { _type: 'extra', name: 'Yoga Session', price: 15, unit: 'per_person', description: 'Group session at nearby studio', order: 6 },
      { _type: 'extra', name: 'Whale Watching Trip', price: 45, unit: 'per_person', description: 'Full experience from Mirissa', order: 7 },
      { _type: 'extra', name: 'Laundry Service', price: 8, unit: 'flat', description: 'Wash & fold per load', order: 8 },
    ]

    for (const extra of extras) {
      await client.create(extra)
    }

    // 8. FAQ
    console.log('❓ Creating FAQ...')
    const faqs = [
      {
        _type: 'faqItem',
        question: 'How far is The Atrium from Hiriketiya Beach?',
        answer: 'The hotel is just 200 meters from Hiriketiya Beach - approximately a 2-minute walk. We provide beach towels for your convenience.',
        order: 1,
      },
      {
        _type: 'faqItem',
        question: 'Is breakfast included in the room rate?',
        answer: 'Yes! A delicious full breakfast is included with every booking. We offer both Western and Sri Lankan options to start your day right.',
        order: 2,
      },
      {
        _type: 'faqItem',
        question: 'Is the hotel good for surfers?',
        answer: 'Absolutely! Hiriketiya is one of Sri Lanka\'s premier surf destinations. The bay offers waves suitable for all levels, and we can arrange board rentals and lessons. Many of our guests are surfers!',
        order: 3,
      },
      {
        _type: 'faqItem',
        question: 'Do you have a swimming pool?',
        answer: 'Yes, we have a beautiful rooftop infinity pool with panoramic views. It\'s the perfect spot to relax after a day at the beach or surfing.',
        order: 4,
      },
      {
        _type: 'faqItem',
        question: 'Is parking available?',
        answer: 'Yes, we offer free private parking for all guests. We also have accessible parking available.',
        order: 5,
      },
      {
        _type: 'faqItem',
        question: 'How do I get to The Atrium from Colombo Airport?',
        answer: 'The hotel is about 180 km from Colombo Airport (4-5 hours by car). We can arrange a private transfer for $90. Alternatively, take the scenic coastal train to Matara (4-5 hours), then a 20-minute taxi.',
        order: 6,
      },
      {
        _type: 'faqItem',
        question: 'Are there restaurants nearby?',
        answer: 'Yes! Hiriketiya has a vibrant food scene. Within walking distance you\'ll find Garlic Cafe, Dots Bay House, Muthu Bar, and many other excellent restaurants and cafes.',
        order: 7,
      },
      {
        _type: 'faqItem',
        question: 'What is the best time to visit?',
        answer: 'The dry season (November to April) offers the best weather for beach activities. However, the monsoon season (May to October) is actually better for surfing with more consistent swells, and offers lower rates.',
        order: 8,
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
        name: 'Sophie & Mark',
        location: 'London, UK',
        date: 'January 2025',
        rating: 5,
        text: 'Really great location - a 2 minute walk to the beach and right in the centre of lots of great restaurants and bars which are nicely lit at night. Lovely spacious, clean and minimalistic room. The rooftop pool was a bonus!',
        featured: true,
        order: 1,
      },
      {
        _type: 'testimonial',
        name: 'Lucas',
        location: 'Berlin, Germany',
        date: 'December 2024',
        rating: 5,
        text: 'Perfect surf trip base! The hotel is walking distance from the beach and the waves were incredible. Breakfast was great and the staff helped arrange everything from board rentals to day trips. Will definitely return!',
        featured: true,
        order: 2,
      },
      {
        _type: 'testimonial',
        name: 'Emma & David',
        location: 'Melbourne, Australia',
        date: 'November 2024',
        rating: 5,
        text: 'We loved everything about The Atrium. The rooftop pool with those views, the comfortable room, the included breakfast, and the amazing location. Hiriketiya is such a special place and this hotel is the perfect home base.',
        featured: false,
        order: 3,
      },
      {
        _type: 'testimonial',
        name: 'Marie',
        location: 'Paris, France',
        date: 'February 2025',
        rating: 5,
        text: 'Un petit paradis! L\'emplacement est parfait, à quelques pas de la plage. La piscine sur le toit est magnifique et le petit-déjeuner délicieux. Le personnel est très attentionné. Je recommande vivement!',
        featured: false,
        order: 4,
      },
    ]

    for (const testimonial of testimonials) {
      await client.create(testimonial)
    }

    console.log('✅ Update completed successfully!')
    console.log('')
    console.log('📸 N\'oublie pas d\'ajouter les images dans Sanity Studio:')
    console.log('   - Hero image (Page d\'accueil)')
    console.log('   - About image (Page d\'accueil)')
    console.log('   - Photos des chambres')
    console.log('   - Photos des expériences')
    console.log('   - Galerie photos')
    console.log('')
    console.log('🔗 Booking.com: https://www.booking.com/hotel/lk/the-atrium-hiriketiya.html')

  } catch (error) {
    console.error('❌ Error updating data:', error)
    process.exit(1)
  }
}

updateData()
