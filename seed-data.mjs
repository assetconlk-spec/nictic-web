import PocketBase from 'pocketbase'

const pb = new PocketBase('http://localhost:8090')

const ADMIN_EMAIL    = process.argv[2]
const ADMIN_PASSWORD = process.argv[3]

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Usage: node seed-data.mjs <email> <password>')
  process.exit(1)
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const slides = [
  {
    title: 'Discover the Pearl of the Indian Ocean',
    subtitle: 'Ancient temples, pristine beaches, and lush highlands — all in one island.',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    order: 1,
    active: true,
  },
  {
    title: 'Explore Sacred Ancient Cities',
    subtitle: 'Walk through millennia of history in UNESCO World Heritage sites.',
    image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=1920&q=80',
    order: 2,
    active: true,
  },
  {
    title: 'Unwind on Golden Beaches',
    subtitle: 'Crystal-clear waters and white sand stretch as far as the eye can see.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    order: 3,
    active: true,
  },
  {
    title: 'Journey Through the Tea Highlands',
    subtitle: 'Rolling green hills, colonial charm, and the world\'s finest Ceylon tea.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    order: 4,
    active: true,
  },
]

const categories = [
  { name: 'Cultural' },
  { name: 'Beach' },
  { name: 'Adventure' },
  { name: 'Wildlife' },
  { name: 'Wellness' },
  { name: 'Culinary' },
]

const tours = [
  {
    title: 'Ancient Cities & Cultural Triangle',
    slug: 'ancient-cities-cultural-triangle',
    category: 'Cultural',
    duration: '5 Days / 4 Nights',
    price: 'From $480',
    rating: '4.9',
    featured: true,
    popular: true,
    image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=800&q=80',
    description: 'Explore the heart of ancient Sri Lanka — Sigiriya Rock Fortress, Polonnaruwa, Dambulla Cave Temple, and the sacred city of Anuradhapura. A journey through 2,500 years of history.',
    highlights: '["Sigiriya Lion Rock Fortress","Dambulla Golden Cave Temple","Ancient city of Polonnaruwa","Anuradhapura Sacred City","Minneriya National Park elephant gathering"]',
    inclusions: '["Accommodation (4 nights)","All breakfasts","Air-conditioned transport","Licensed national guide","All entrance fees","Airport transfers"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Lunch and dinner","Tips and gratuities"]',
    overview_title: 'Step Back in Time',
    minpax: '1',
    maxpax: '12',
    minimum_age: '5',
    vehicle: 'Air-conditioned minivan',
    difficulty: 'Easy to Moderate',
    itinerary: '[{"day":1,"title":"Arrival & Dambulla","description":"Arrive at Colombo, transfer to Dambulla. Visit the Golden Cave Temple with its 150 Buddha statues and ancient frescoes."},{"day":2,"title":"Sigiriya Rock Fortress","description":"Climb the iconic 200m Lion Rock Fortress, marvel at the ancient frescoes and panoramic views of the jungle below."},{"day":3,"title":"Polonnaruwa","description":"Explore the medieval capital — the Royal Palace, Gal Vihara rock temples, and the stunning Parakrama Samudra reservoir."},{"day":4,"title":"Anuradhapura","description":"The first ancient capital of Sri Lanka. Visit the sacred Sri Maha Bodhi tree, Ruwanwelisaya stupa, and Jetavanaramaya."},{"day":5,"title":"Departure","description":"Morning at leisure, transfer to Colombo airport for your onward journey."}]',
  },
  {
    title: 'Southern Coast Beach Retreat',
    slug: 'southern-coast-beach-retreat',
    category: 'Beach',
    duration: '6 Days / 5 Nights',
    price: 'From $550',
    rating: '4.8',
    featured: true,
    popular: true,
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    description: 'Unwind along Sri Lanka\'s stunning southern coastline — from the colonial charm of Galle Fort to the surf beaches of Arugam Bay and the whale-watching haven of Mirissa.',
    highlights: '["UNESCO Galle Fort","Whale watching in Mirissa","Stilt fishermen of Koggala","Turtle hatchery visit","Sea turtle nesting beach","Sunset at Tangalle"]',
    inclusions: '["Accommodation (5 nights)","All breakfasts","Whale watching boat trip","Air-conditioned transport","Licensed guide","Airport transfers"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Lunch and dinner","Tips"]',
    overview_title: 'Sun, Sea & Serenity',
    minpax: '1',
    maxpax: '10',
    minimum_age: '3',
    vehicle: 'Air-conditioned van',
    difficulty: 'Easy',
    itinerary: '[{"day":1,"title":"Colombo to Galle","description":"Drive south along the coastal highway. Explore the UNESCO-listed Galle Fort — Dutch colonial architecture, boutique shops, and ocean views."},{"day":2,"title":"Koggala & Weligama","description":"See the iconic stilt fishermen at Koggala. Afternoon in Weligama for surfing lessons or just relaxing on the beach."},{"day":3,"title":"Mirissa Whale Watching","description":"Early morning whale watching cruise to spot blue and sperm whales. Afternoon free on Mirissa beach."},{"day":4,"title":"Tangalle & Rekawa","description":"Slow morning at Tangalle beach. Evening turtle watching at Rekawa beach — one of Sri Lanka\'s best nesting sites."},{"day":5,"title":"Mulkirigala & Leisure","description":"Visit the rock temple monastery of Mulkirigala. Afternoon at leisure."},{"day":6,"title":"Departure","description":"Transfer to Colombo airport for your onward journey."}]',
  },
  {
    title: 'Kandy & Hill Country Explorer',
    slug: 'kandy-hill-country-explorer',
    category: 'Cultural',
    duration: '4 Days / 3 Nights',
    price: 'From $380',
    rating: '4.9',
    featured: true,
    popular: false,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Journey into Sri Lanka\'s misty highlands. Visit the sacred Temple of the Tooth Relic, ride the iconic Ella train through tea country, and explore Nuwara Eliya\'s colonial charm.',
    highlights: '["Temple of the Tooth Relic, Kandy","Scenic Kandy to Ella train ride","Nuwara Eliya tea plantation visit","Nine Arch Bridge, Ella","Royal Botanical Gardens, Peradeniya"]',
    inclusions: '["Accommodation (3 nights)","All breakfasts","Train tickets (Kandy to Ella)","Air-conditioned transport","Licensed guide","All entrance fees"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Meals (except breakfast)","Tips"]',
    overview_title: 'Highlands & Heritage',
    minpax: '1',
    maxpax: '8',
    minimum_age: '5',
    vehicle: 'Air-conditioned car/van',
    difficulty: 'Easy',
    itinerary: '[{"day":1,"title":"Kandy","description":"Visit the Temple of the Tooth Relic, Peradeniya Botanical Gardens, and watch a cultural Kandyan dance show in the evening."},{"day":2,"title":"Nuwara Eliya","description":"Drive through lush tea plantations to Nuwara Eliya. Visit a working tea factory and garden. Explore the colonial hill station."},{"day":3,"title":"Ella by Train","description":"Board the scenic train from Nanu Oya to Ella. Hike to Little Adam\'s Peak and admire the famous Nine Arch Bridge."},{"day":4,"title":"Departure","description":"Morning at leisure. Transfer back to Colombo for your onward journey."}]',
  },
  {
    title: 'Wildlife Safari Adventure',
    slug: 'wildlife-safari-adventure',
    category: 'Wildlife',
    duration: '5 Days / 4 Nights',
    price: 'From $520',
    rating: '4.8',
    featured: false,
    popular: true,
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    description: 'Experience Sri Lanka\'s incredible wildlife — leopards at Yala, elephants at Minneriya, and exotic birds at Bundala. The island has one of the highest leopard densities on earth.',
    highlights: '["Yala National Park leopard safari","Minneriya elephant gathering","Bundala bird sanctuary","Udawalawa elephant transit home","Whale watching optional add-on"]',
    inclusions: '["Accommodation (4 nights)","All breakfasts","3 safari game drives","4WD safari jeep","Licensed naturalist guide","All park entrance fees","Airport transfers"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Meals (except breakfast)","Tips","Whale watching (optional extra)"]',
    overview_title: 'Into the Wild',
    minpax: '2',
    maxpax: '6',
    minimum_age: '8',
    vehicle: '4WD safari jeep',
    difficulty: 'Easy to Moderate',
    itinerary: '[{"day":1,"title":"Arrival & Minneriya","description":"Arrive in Colombo, transfer to Minneriya. Afternoon safari to witness the famous elephant gathering — hundreds of elephants at the reservoir."},{"day":2,"title":"Udawalawe","description":"Visit the Elephant Transit Home, then afternoon game drive in Udawalawa National Park — great for elephant herds and water buffalo."},{"day":3,"title":"Yala National Park","description":"Full day in Yala — two game drives to spot leopards, sloth bears, crocodiles, and hundreds of bird species."},{"day":4,"title":"Bundala Bird Sanctuary","description":"Morning birding safari at Bundala — a Ramsar wetland with flamingos, painted storks, and migratory species."},{"day":5,"title":"Departure","description":"Transfer to Colombo airport for your onward journey."}]',
  },
  {
    title: 'Ayurveda & Wellness Retreat',
    slug: 'ayurveda-wellness-retreat',
    category: 'Wellness',
    duration: '7 Days / 6 Nights',
    price: 'From $750',
    rating: '5.0',
    featured: false,
    popular: false,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    description: 'Restore mind, body, and soul with an authentic Ayurvedic retreat in Sri Lanka. Daily treatments, yoga sessions, herbal cuisine, and meditation guided by experienced practitioners.',
    highlights: '["Daily Ayurvedic treatments","Morning yoga & meditation","Herbal garden walk","Spice garden visit in Matale","Cooking class — Ayurvedic cuisine","Sound healing session"]',
    inclusions: '["Accommodation (6 nights — wellness resort)","All meals (Ayurvedic diet)","Daily 90-min treatments","Yoga & meditation classes","Spice garden tour","Cooking class","Airport transfers"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Additional treatments","Tips"]',
    overview_title: 'Heal, Rest & Restore',
    minpax: '1',
    maxpax: '4',
    minimum_age: '18',
    vehicle: 'Air-conditioned car',
    difficulty: 'Easy',
    itinerary: '[{"day":1,"title":"Arrival & Consultation","description":"Welcome at the resort with a fresh herbal drink. Ayurvedic consultation with the resident physician to tailor your treatment plan."},{"day":2,"title":"Begin Treatments","description":"Morning yoga, breakfast, first Abhyanga (oil massage) session. Afternoon herbal steam bath and guided meditation."},{"day":3,"title":"Spice Garden Visit","description":"Morning treatment session. Afternoon excursion to a spice garden in Matale — cinnamon, cardamom, pepper and more."},{"day":4,"title":"Full Wellness Day","description":"Full day at the resort — treatments, yoga, cooking class learning to prepare Ayurvedic meals."},{"day":5,"title":"Temple of the Tooth","description":"Morning treatment. Afternoon cultural visit to the Temple of the Tooth Relic in Kandy."},{"day":6,"title":"Sound Healing & Reflection","description":"Sound healing bowl session, final treatment, and wellness review with your doctor."},{"day":7,"title":"Departure","description":"Farewell herbal tea ceremony, transfer to airport."}]',
  },
  {
    title: 'Sri Lanka Highlights — 10 Days',
    slug: 'sri-lanka-highlights-10-days',
    category: 'Cultural',
    duration: '10 Days / 9 Nights',
    price: 'From $1,100',
    rating: '5.0',
    featured: true,
    popular: true,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'The ultimate Sri Lanka experience — ancient cities, wildlife safaris, hill country train rides, pristine beaches, and the warmth of Sri Lankan hospitality. Everything in one unforgettable journey.',
    highlights: '["Sigiriya Rock Fortress","Kandy Temple of the Tooth","Ella scenic train ride","Yala leopard safari","Galle Fort","Southern beaches","Tea plantation visit","Whale watching"]',
    inclusions: '["Accommodation (9 nights)","All breakfasts","All transport","Licensed national guide","Safari jeep","All entrance fees","Train tickets","Airport transfers"]',
    exclusions: '["International flights","Travel insurance","Personal expenses","Lunch and dinner","Tips and gratuities","Optional whale watching"]',
    overview_title: 'The Complete Sri Lanka',
    minpax: '2',
    maxpax: '12',
    minimum_age: '5',
    vehicle: 'Air-conditioned minivan + safari jeep',
    difficulty: 'Easy to Moderate',
    itinerary: '[{"day":1,"title":"Arrival — Colombo","description":"Arrive at Bandaranaike International Airport. Transfer to your hotel. Evening walk along Galle Face Green."},{"day":2,"title":"Sigiriya & Dambulla","description":"Climb Sigiriya Rock Fortress in the morning. Afternoon visit the Dambulla Golden Cave Temple."},{"day":3,"title":"Polonnaruwa","description":"Explore the medieval ancient capital — palaces, stupas, and the famous Gal Vihara rock sculptures."},{"day":4,"title":"Kandy","description":"Transfer to Kandy via Matale Spice Garden. Evening visit to the Temple of the Tooth Relic and cultural dance show."},{"day":5,"title":"Nuwara Eliya","description":"Drive through tea country to Nuwara Eliya. Tea factory visit. Explore the Little England of Sri Lanka."},{"day":6,"title":"Ella by Train","description":"Scenic train journey to Ella. Afternoon hike to Nine Arch Bridge and Little Adam\'s Peak."},{"day":7,"title":"Yala National Park","description":"Transfer to Yala. Afternoon game drive — leopards, elephants, crocodiles, and 200+ bird species."},{"day":8,"title":"Southern Coast","description":"Transfer to Mirissa via Udawalawa elephant transit home. Afternoon at Mirissa beach."},{"day":9,"title":"Galle & Bentota","description":"Morning at Galle Fort — Dutch colonial architecture and boutique cafés. Afternoon at Bentota beach."},{"day":10,"title":"Departure","description":"Transfer to Colombo airport for your onward journey home."}]',
  },
]

const galleryImages = [
  { image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=800&q=80', alt: 'Sigiriya Rock Fortress', category: 'Cultural', featured: true },
  { image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Southern Sri Lanka beach', category: 'Beach', featured: true },
  { image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Tea plantations in Nuwara Eliya', category: 'Cultural', featured: true },
  { image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80', alt: 'Sri Lanka wildlife safari', category: 'Wildlife', featured: true },
  { image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Sri Lanka highlands panorama', category: 'Adventure', featured: true },
  { image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', alt: 'Ayurveda and wellness', category: 'Wellness', featured: false },
  { image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Surfing in Sri Lanka', category: 'Adventure', featured: false },
  { image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', alt: 'Mirissa whale watching', category: 'Wildlife', featured: false },
  { image_url: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?w=800&q=80', alt: 'Kandy Temple of the Tooth', category: 'Cultural', featured: false },
  { image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80', alt: 'Colombo city skyline', category: 'Cultural', featured: false },
]

const aboutPreview = {
  main_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  overlay_image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=400&q=80',
  story_main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  story_overlay_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
}

const contactInfo = {
  phone: '+94 70 748 5177',
  email: 'hello@nictic.travel',
  address: '42 Temple Road, Colombo 03, Sri Lanka',
}

const essentialInfo = {
  terms_and_conditions: `<h2>Terms &amp; Conditions</h2>
<p>By booking with nictic.travel, you agree to the following terms and conditions. Please read them carefully before confirming your reservation.</p>
<h3>Bookings</h3>
<p>A booking is confirmed upon receipt of a 30% deposit. The remaining balance is due 30 days before the tour departure date. For bookings made within 30 days of departure, full payment is required at the time of booking.</p>
<h3>Pricing</h3>
<p>All prices are quoted in USD. nictic.travel reserves the right to adjust prices due to changes in fuel costs, government taxes, or exchange rates. Any price changes will be communicated before confirmation.</p>
<h3>Age &amp; Health</h3>
<p>Guests are responsible for ensuring they meet the minimum age and health requirements for each tour. nictic.travel cannot be held liable for any health issues arising during a tour.</p>`,
  payment_cancellation_policy: `<h2>Payment &amp; Cancellation Policy</h2>
<h3>Payment</h3>
<ul>
<li>30% deposit required to confirm booking</li>
<li>Full balance due 30 days before departure</li>
<li>Accepted: Bank transfer, credit card (Visa/Mastercard)</li>
</ul>
<h3>Cancellation by Guest</h3>
<ul>
<li>More than 30 days before departure: Full refund of deposit</li>
<li>15–30 days before departure: 50% cancellation fee</li>
<li>7–14 days before departure: 75% cancellation fee</li>
<li>Less than 7 days before departure: No refund</li>
</ul>
<h3>Cancellation by nictic.travel</h3>
<p>In the unlikely event nictic.travel cancels a tour, you will receive a full refund or the option to rebook on an alternative date.</p>`,
  guest_obligations: `<h2>Guest Obligations</h2>
<p>To ensure the best experience for all guests and respect for local culture, please observe the following:</p>
<ul>
<li>Dress modestly when visiting temples and religious sites (cover shoulders and knees)</li>
<li>Remove shoes before entering temples and homes as directed</li>
<li>Do not touch or disturb wildlife during safaris</li>
<li>Follow your guide's instructions at all times for safety</li>
<li>Carry your passport or a copy of your ID at all times</li>
<li>Respect local customs, traditions, and communities</li>
<li>Do not litter — help us protect Sri Lanka's natural environment</li>
</ul>
<p>nictic.travel reserves the right to remove guests from a tour without refund if behavior is deemed disrespectful or endangers others.</p>`,
  important_information: `<h2>Important Information</h2>
<h3>Visa</h3>
<p>Most nationalities require an Electronic Travel Authorization (ETA) to enter Sri Lanka. Apply online at <strong>eta.gov.lk</strong> before travel. Cost is approximately USD 35–50.</p>
<h3>Health &amp; Vaccinations</h3>
<p>Consult your doctor or travel health clinic before visiting. Recommended vaccinations include Hepatitis A, Typhoid, and routine vaccinations. Malaria prophylaxis may be recommended for some regions.</p>
<h3>Weather</h3>
<p>Sri Lanka has two monsoon seasons. The southwest monsoon affects the south and west (May–September). The northeast monsoon affects the north and east (October–February). The Cultural Triangle and Hill Country are generally accessible year-round.</p>
<h3>Currency</h3>
<p>The local currency is the Sri Lankan Rupee (LKR). USD, GBP, and EUR are widely accepted at hotels and tourist sites. ATMs are available in all major cities and tourist areas.</p>
<h3>Safety</h3>
<p>Sri Lanka is generally a safe destination for tourists. Exercise normal precautions, secure your valuables, and follow your guide's advice at all times.</p>`,
}

const pageBanners = [
  { page: 'tours',         position: 50, opacity: 55, image_url: 'https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=1920&q=80' },
  { page: 'gallery',       position: 50, opacity: 55, image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80' },
  { page: 'about',         position: 40, opacity: 55, image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80' },
  { page: 'contact',       position: 50, opacity: 55, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80' },
  { page: 'essential-info',position: 50, opacity: 55, image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&q=80' },
]

// ─── SEED ────────────────────────────────────────────────────────────────────

async function seed() {
  await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
  console.log('✓ Authenticated\n')

  console.log('── Slides ──')
  for (const s of slides) {
    await pb.collection('slides').create(s)
    console.log(`  ✓ ${s.title.substring(0, 50)}`)
  }

  console.log('\n── Categories ──')
  for (const c of categories) {
    await pb.collection('categories').create(c)
    console.log(`  ✓ ${c.name}`)
  }

  console.log('\n── Tours ──')
  for (const t of tours) {
    await pb.collection('tours').create(t)
    console.log(`  ✓ ${t.title}`)
  }

  console.log('\n── Gallery ──')
  for (const g of galleryImages) {
    await pb.collection('gallery').create(g)
    console.log(`  ✓ ${g.alt}`)
  }

  console.log('\n── About Preview ──')
  await pb.collection('about_preview').create(aboutPreview)
  console.log('  ✓ Created')

  console.log('\n── Contact Info ──')
  await pb.collection('contact_info').create(contactInfo)
  console.log('  ✓ Created')

  console.log('\n── Essential Info ──')
  await pb.collection('essential_info').create(essentialInfo)
  console.log('  ✓ Created')

  console.log('\n── Page Banners ──')
  for (const b of pageBanners) {
    await pb.collection('page_banners').create(b)
    console.log(`  ✓ ${b.page}`)
  }

  console.log('\n✅ All data seeded successfully!')
}

seed().catch((e) => {
  console.error('Error:', e?.response?.data ?? e.message)
  process.exit(1)
})
