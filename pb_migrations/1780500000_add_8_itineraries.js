/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const col = app.findCollectionByNameOrId("itineraries");

  const itineraries = [
    // ── 1. Classic Sri Lanka Loop ────────────────────────────────
    {
      title: "Classic Sri Lanka Loop",
      slug: "classic-sri-lanka-loop",
      category: "Cultural",
      duration: "7 Days / 6 Nights",
      price: "From $620",
      rating: "5.0",
      featured: true,
      popular: true,
      image_url: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=900&q=80",
      description: "The definitive Sri Lanka circuit — ancient rock fortresses, misty tea hills, a colonial fort town, and a whale-watching coastline, all in one seamless week.",
      overview_title: "The Essential Island Circuit",
      difficulty: "Easy",
      minpax: "1",
      maxpax: "12",
      minimum_age: "5",
      vehicle: "Air-conditioned van",
      highlights: JSON.stringify([
        "Climb Sigiriya Lion Rock Fortress",
        "Scenic train ride through tea country",
        "Nine Arches Bridge at dawn, Ella",
        "Whale watching off Mirissa coast",
        "Walk Galle Fort ramparts at sunset",
        "Visit a working tea factory in Nuwara Eliya"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (6 nights, 3★–4★)",
        "Daily breakfast",
        "Private air-conditioned transport throughout",
        "Licensed English-speaking guide",
        "All entrance fees listed in itinerary",
        "Airport pick-up and drop-off",
        "Bottled water in vehicle daily"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Lunches and dinners (unless stated)",
        "Personal expenses and tips",
        "Optional whale watching boat (approx. $25)"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Colombo", description: "Welcome to Sri Lanka! Your guide meets you at Bandaranaike International Airport and transfers you to your Colombo hotel. Evening stroll along Galle Face Green.", overnight: "Colombo", optionalActivities: "City tuk-tuk tour" },
        { day: 2, title: "Colombo → Sigiriya", description: "Drive north to the Cultural Triangle. En route stop at Dambulla Cave Temple, whose five caverns hold over 150 gilded Buddha statues and ancient frescoes. Check in near Sigiriya.", overnight: "Sigiriya area", optionalActivities: "Village cycle tour" },
        { day: 3, title: "Sigiriya Rock Fortress", description: "Early morning ascent of the iconic 200 m Lion Rock — the frescoed Sigiriya Damsels, the Mirror Wall, and summit palace ruins with breathtaking jungle panoramas. Afternoon at leisure.", overnight: "Sigiriya area", optionalActivities: "Pidurangala Rock hike (better view of Sigiriya)" },
        { day: 4, title: "Kandy — Temple City", description: "Drive south to Kandy. Visit the sacred Temple of the Tooth Relic, stroll the Kandy Lake walkway, and explore the Royal Botanical Gardens in Peradeniya.", overnight: "Kandy", optionalActivities: "Kandyan cultural dance show" },
        { day: 5, title: "Train to Ella via Nuwara Eliya", description: "Board the world-famous hill-country train. Stop in Nuwara Eliya for a tea factory tour and misty colonial streetscapes, then continue to Ella.", overnight: "Ella", optionalActivities: "Little Adam's Peak sunrise hike" },
        { day: 6, title: "Ella → Mirissa", description: "Morning walk to Nine Arches Bridge. Drive south through the hill country to Mirissa beach — one of the world's top whale-watching spots.", overnight: "Mirissa", optionalActivities: "Whale and dolphin watching boat trip" },
        { day: 7, title: "Galle Fort & Departure", description: "Morning drive to Galle — wander the UNESCO-listed Dutch Fort, browse boutiques in colonial streets, and photograph the lighthouse. Transfer to Colombo airport for your flight home.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 2. East Coast Beach Escape ───────────────────────────────
    {
      title: "East Coast Beach Escape",
      slug: "east-coast-beach-escape",
      category: "Beach",
      duration: "5 Days / 4 Nights",
      price: "From $420",
      rating: "4.9",
      featured: false,
      popular: true,
      image_url: "https://images.unsplash.com/photo-1525849306000-cc26ceb5c1d7?w=900&q=80",
      description: "Sri Lanka's east coast hides the island's most pristine beaches. Turquoise bays in Trincomalee, the powder sands of Nilaveli, snorkelling at Pigeon Island, and the surf mecca of Arugam Bay.",
      overview_title: "Unspoiled Beaches & Crystal Waters",
      difficulty: "Easy",
      minpax: "1",
      maxpax: "10",
      minimum_age: "5",
      vehicle: "Air-conditioned car / van",
      highlights: JSON.stringify([
        "Snorkel Pigeon Island National Park",
        "Whale shark sightings at Trincomalee",
        "Surfing lessons at Arugam Bay",
        "Fort Frederick and Koneswaram Temple",
        "Sea turtle nesting sites at Rekawa",
        "Sunrise at Arugam Bay main point"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (4 nights, beach hotels)",
        "Daily breakfast",
        "Private transport throughout",
        "Snorkelling gear at Pigeon Island",
        "Airport transfers"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Meals beyond breakfast",
        "Water sports activities (payable on-site)",
        "Personal expenses"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Colombo → Trincomalee", description: "Early morning drive across the island (approx. 5 hrs). Check into your beachfront hotel on Nilaveli beach. Afternoon paddle in the calm turquoise bay.", overnight: "Trincomalee / Nilaveli", optionalActivities: "" },
        { day: 2, title: "Pigeon Island & Trinco Town", description: "Morning boat trip to Pigeon Island National Park — snorkel with blacktip reef sharks, sea turtles, and colourful reef fish. Afternoon: Fort Frederick, the Koneswaram Kovil cliffside temple, and the famous Lover's Leap.", overnight: "Trincomalee / Nilaveli", optionalActivities: "Whale shark diving (seasonal)" },
        { day: 3, title: "Trincomalee → Pasikudah", description: "Drive south to Pasikudah — a shallow, sheltered lagoon with some of the calmest swimming water in Sri Lanka. Perfect for families and non-swimmers.", overnight: "Pasikudah", optionalActivities: "Glass-bottom boat tour" },
        { day: 4, title: "Pasikudah → Arugam Bay", description: "Continue south to Arugam Bay, Asia's top surf destination. Afternoon surfing lesson for beginners or free surf for experienced riders.", overnight: "Arugam Bay", optionalActivities: "Crocodile safari on Crocodile Rock lagoon" },
        { day: 5, title: "Arugam Bay → Departure", description: "Morning free on the beach. Drive to Colombo (approx. 5 hrs) or fly from Batticaloa domestic airport. Transfer to international airport for departure.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 3. Hill Country & Tea Trails ─────────────────────────────
    {
      title: "Hill Country & Tea Trails",
      slug: "hill-country-tea-trails",
      category: "Adventure",
      duration: "4 Days / 3 Nights",
      price: "From $350",
      rating: "4.9",
      featured: false,
      popular: true,
      image_url: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=900&q=80",
      description: "Ride the most scenic railway in Asia, walk through emerald tea estates, discover the world's end at Horton Plains, and watch the sunrise from Little Adam's Peak.",
      overview_title: "Mist, Mountains & Ceylon Tea",
      difficulty: "Moderate",
      minpax: "1",
      maxpax: "8",
      minimum_age: "8",
      vehicle: "Air-conditioned car + train",
      highlights: JSON.stringify([
        "Kandy–Ella scenic train ride",
        "World's End viewpoint at Horton Plains",
        "Tea factory tour and tasting session",
        "Nine Arches Bridge sunrise walk",
        "Little Adam's Peak hike",
        "Colonial Nuwara Eliya town"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (3 nights)",
        "Daily breakfast",
        "Private transport Colombo–Kandy and Ella–Colombo",
        "Train tickets (2nd class reserved)",
        "Tea factory entrance and tasting",
        "Horton Plains entrance fee",
        "Licensed guide throughout"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Lunches and dinners",
        "Personal expenses"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Colombo → Kandy", description: "Drive to Kandy — Sri Lanka's cultural capital. Visit the Temple of the Tooth Relic, walk around the Kandy Lake, and explore the Peradeniya Botanical Gardens. Evening Kandyan dance show.", overnight: "Kandy", optionalActivities: "Kandy cultural dance performance" },
        { day: 2, title: "Scenic Train to Nuwara Eliya", description: "Board the morning train from Kandy. The 3-hour ride through tunnels, waterfalls, and emerald valleys is one of the world's great rail journeys. Arrive in Nanu Oya for Nuwara Eliya. Visit a tea factory and the colonial town centre.", overnight: "Nuwara Eliya", optionalActivities: "Gregory Lake boat hire" },
        { day: 3, title: "Horton Plains → Ella", description: "Very early drive to Horton Plains National Park. Walk to World's End — a sheer 880 m drop with cloud-forest views. Then Baker's Falls. Afternoon drive to Ella.", overnight: "Ella", optionalActivities: "Ella Rock hike (3 hrs)" },
        { day: 4, title: "Nine Arches Bridge & Departure", description: "Sunrise walk to the iconic Nine Arches Bridge — watch a blue train cross the stone viaduct above the jungle. Return to Colombo via A23 highway or board the Ella–Colombo train.", overnight: "", optionalActivities: "Little Adam's Peak morning hike" }
      ])
    },

    // ── 4. Wildlife Safari Adventure ─────────────────────────────
    {
      title: "Wildlife & Safari Adventure",
      slug: "wildlife-safari-adventure",
      category: "Wildlife",
      duration: "6 Days / 5 Nights",
      price: "From $580",
      rating: "5.0",
      featured: true,
      popular: false,
      image_url: "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=900&q=80",
      description: "Sri Lanka has the world's highest density of leopards and one of the best chances on earth to see blue whales. This safari circuit covers Yala, Udawalawe, Minneriya and whale watching off Mirissa.",
      overview_title: "Leopards, Elephants & Blue Whales",
      difficulty: "Easy",
      minpax: "2",
      maxpax: "8",
      minimum_age: "5",
      vehicle: "4WD safari jeep + van",
      highlights: JSON.stringify([
        "Leopard spotting in Yala National Park",
        "Elephant herds at Udawalawe",
        "Blue whale watching off Mirissa",
        "Minneriya elephant gathering (seasonal)",
        "Crocodiles and water buffalo safaris",
        "Sloth bears and sambar deer in Yala"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (5 nights, eco-lodges)",
        "Daily breakfast",
        "All safari jeep hire and park entrance fees",
        "Whale watching boat trip",
        "Licensed wildlife guide",
        "Airport transfers",
        "Private transport between parks"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Lunches and dinners",
        "Personal expenses",
        "Optional bird-watching guide"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival → Minneriya", description: "Arrive Colombo, transfer north to Minneriya. Evening jeep safari in Minneriya National Park — home to the famous 'Gathering' of 200–300 elephants (July–October).", overnight: "Habarana area", optionalActivities: "" },
        { day: 2, title: "Sigiriya & Dambulla", description: "Morning climb of Sigiriya Rock Fortress. Afternoon visit to Dambulla Cave Temple. Enjoy the wildlife-rich Habarana surroundings at dusk.", overnight: "Habarana area", optionalActivities: "Elephant back safari (ethical operators only)" },
        { day: 3, title: "Habarana → Udawalawe", description: "Drive south to Udawalawe National Park — the best place in Sri Lanka to see wild elephants in open grassland. Afternoon and sunset jeep safari.", overnight: "Udawalawe", optionalActivities: "Elephant Transit Home visit" },
        { day: 4, title: "Udawalawe → Yala", description: "Morning safari at Udawalawe, then drive to Yala — Sri Lanka's most famous national park and the leopard capital of the world. Afternoon jeep safari.", overnight: "Yala area", optionalActivities: "" },
        { day: 5, title: "Yala Full Day Safari", description: "Two game drives in Yala (morning and late afternoon) maximise your chances of spotting leopard, sloth bear, elephant, crocodile, and hundreds of bird species. Evening at your safari lodge.", overnight: "Yala / Mirissa area", optionalActivities: "" },
        { day: 6, title: "Whale Watching & Departure", description: "Very early morning whale watching boat from Mirissa — the best spot in the world to see blue whales from November to April. Return to Colombo for departure.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 5. Galle & Southern Coast ────────────────────────────────
    {
      title: "Galle & Southern Coast",
      slug: "galle-southern-coast",
      category: "Beach",
      duration: "5 Days / 4 Nights",
      price: "From $440",
      rating: "4.8",
      featured: false,
      popular: true,
      image_url: "https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=900&q=80",
      description: "Sri Lanka's golden southern coast — colonial Galle Fort, vibrant coral reefs at Hikkaduwa, sea turtle nesting beaches, and the blue whale hotspot of Mirissa, all within easy reach of each other.",
      overview_title: "Fort, Reef & Golden Sands",
      difficulty: "Easy",
      minpax: "1",
      maxpax: "12",
      minimum_age: "5",
      vehicle: "Air-conditioned van",
      highlights: JSON.stringify([
        "UNESCO Galle Fort sunset walk",
        "Snorkel Hikkaduwa coral reef",
        "Sea turtle watch at Rekawa beach",
        "Whale and dolphin watching, Mirissa",
        "Stilt fishermen at Koggala",
        "Jungle beach at Unawatuna"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (4 nights, beachside hotels)",
        "Daily breakfast",
        "Private transport throughout",
        "Snorkel equipment at Hikkaduwa",
        "Guided Galle Fort walking tour",
        "Airport transfers"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Meals beyond breakfast",
        "Whale watching boat (approx. $25/person)",
        "Personal expenses"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Colombo → Hikkaduwa", description: "Drive south along the coastal highway to Hikkaduwa. Afternoon snorkelling on the coral reef — one of Sri Lanka's best, teeming with turtles, rays, and reef fish.", overnight: "Hikkaduwa", optionalActivities: "Surfing lesson" },
        { day: 2, title: "Galle Fort", description: "Morning drive to Galle. Spend the day exploring the UNESCO Dutch Fort — the ramparts, the lighthouse, the 17th-century streets of boutiques, cafés and colonial architecture.", overnight: "Galle / Unawatuna", optionalActivities: "Galle Fort history walking tour" },
        { day: 3, title: "Unawatuna & Jungle Beach", description: "Lazy day at Unawatuna — one of Sri Lanka's most beautiful crescent bays. Afternoon walk to secluded Jungle Beach. Sunset cocktails on the sand.", overnight: "Galle / Unawatuna", optionalActivities: "Glass-bottom boat tour" },
        { day: 4, title: "Koggala → Mirissa", description: "Morning visit to watch the iconic stilt fishermen of Koggala. Continue to Mirissa for a free afternoon on the beach. Optional whale watching available at dusk briefing.", overnight: "Mirissa", optionalActivities: "Whale watching boat trip (pre-book)" },
        { day: 5, title: "Mirissa → Colombo & Departure", description: "Optional sunrise whale watching boat, then drive back to Colombo along the scenic coastal road. Transfer to Bandaranaike International Airport.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 6. Romantic Honeymoon Escape ─────────────────────────────
    {
      title: "Romantic Honeymoon Escape",
      slug: "romantic-honeymoon-escape",
      category: "Wellness",
      duration: "8 Days / 7 Nights",
      price: "From $1,100",
      rating: "5.0",
      featured: true,
      popular: false,
      image_url: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=900&q=80",
      description: "A hand-picked journey through Sri Lanka's most romantic settings — candlelit dinners by the ocean, sunrise at a misty hilltop, a private ayurvedic spa, and a heritage train through emerald valleys.",
      overview_title: "Love, Luxury & Lush Landscapes",
      difficulty: "Easy",
      minpax: "2",
      maxpax: "2",
      minimum_age: "18",
      vehicle: "Private air-conditioned car",
      highlights: JSON.stringify([
        "Private candlelit dinner on Mirissa beach",
        "Sunrise view from Little Adam's Peak",
        "Couples ayurvedic spa treatment",
        "Heritage train through mist and waterfalls",
        "Sunset at Galle Fort ramparts",
        "Whale watching from private catamaran"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (7 nights, boutique hotels & resorts)",
        "Daily breakfast + 2 special dinners",
        "Private transport throughout",
        "Couples spa treatment (60 min)",
        "Train tickets (1st class observation car)",
        "Licensed guide for sightseeing days",
        "Flower decoration and welcome amenity",
        "Airport transfers"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Meals beyond inclusions",
        "Personal expenses",
        "Extra spa treatments"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival & Colombo", description: "Welcome arrival with flower garland at the airport. Check into a boutique city hotel. Romantic dinner on the rooftop overlooking the city lights.", overnight: "Colombo", optionalActivities: "" },
        { day: 2, title: "Colombo → Kandy", description: "Morning drive to Kandy. Visit the Temple of the Tooth, then the Peradeniya Botanical Gardens. Surprise candlelit dinner by the Kandy Lake.", overnight: "Kandy", optionalActivities: "Private heritage boat on Kandy Lake" },
        { day: 3, title: "Kandy → Nuwara Eliya by Train", description: "Board the famous hill-country train from Kandy. 3 hours of dramatic scenery — waterfalls, tea estates, tunnels. Arrive Nuwara Eliya: the 'Little England' of Sri Lanka.", overnight: "Nuwara Eliya", optionalActivities: "Private tea estate picnic" },
        { day: 4, title: "Tea Estates & Ella", description: "Couples ayurvedic massage at your spa. Afternoon tea estate walk. Drive to Ella with sunset views over the Southern Plains.", overnight: "Ella", optionalActivities: "Couples cooking class" },
        { day: 5, title: "Ella Sunrise & Nine Arches", description: "Pre-dawn hike to Little Adam's Peak for a dramatic sunrise above the clouds. Breakfast with valley views. Walk to Nine Arches Bridge — photograph the blue train.", overnight: "Ella", optionalActivities: "" },
        { day: 6, title: "Ella → Mirissa", description: "Drive south through jungle roads to Mirissa — Sri Lanka's most romantic beach. Settle into your beachside villa. Sunset swim and private beach dinner.", overnight: "Mirissa", optionalActivities: "Whale watching boat (book at check-in)" },
        { day: 7, title: "Galle Fort", description: "Morning whale watching (seasonal). Drive to Galle — wander the cobbled fort streets, browse boutiques and galleries, drinks on the fort wall at golden hour.", overnight: "Galle", optionalActivities: "Private sunset catamaran cruise" },
        { day: 8, title: "Galle → Colombo & Departure", description: "Leisurely morning in Galle. Drive to Colombo airport for your onward flight — bringing home memories of paradise.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 7. Family Sri Lanka Adventure ────────────────────────────
    {
      title: "Family Sri Lanka Adventure",
      slug: "family-sri-lanka-adventure",
      category: "Cultural",
      duration: "9 Days / 8 Nights",
      price: "From $980",
      rating: "4.9",
      featured: false,
      popular: false,
      image_url: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80",
      description: "The ultimate family itinerary — ancient rock fortresses kids will love climbing, elephant encounters, a thrilling safari, a scenic train ride, and days on a safe swimmable beach.",
      overview_title: "Culture, Wildlife & Beach for All Ages",
      difficulty: "Easy",
      minpax: "3",
      maxpax: "15",
      minimum_age: "3",
      vehicle: "Air-conditioned family van",
      highlights: JSON.stringify([
        "Climb Sigiriya Rock Fortress (child-friendly)",
        "Elephant orphanage visit in Pinnawala",
        "Jeep safari in Udawalawe",
        "Scenic train ride to hill country",
        "Safe swimming at Bentota beach",
        "Turtle hatchery visit on the south coast"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (8 nights, family rooms)",
        "Daily breakfast",
        "Private family van throughout",
        "All child entrance fees",
        "Safari jeep at Udawalawe",
        "Pinnawala Elephant Orphanage entry",
        "Turtle hatchery entry",
        "Licensed family-friendly guide",
        "Airport transfers"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Meals beyond breakfast",
        "Personal expenses",
        "Camera fees at attractions"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival & Colombo", description: "Arrive Colombo. Short city tour — Gangaramaya Temple, Pettah market, and Galle Face Green for kite flying.", overnight: "Colombo", optionalActivities: "Colombo city bus experience" },
        { day: 2, title: "Pinnawala Elephant Orphanage", description: "Drive to Pinnawala Elephant Orphanage — kids can watch and (at designated times) interact with baby elephants during feeding and bathing in the river. Continue to Kandy.", overnight: "Kandy", optionalActivities: "Kandyan cultural dance show" },
        { day: 3, title: "Kandy & Royal Botanical Gardens", description: "Morning at the Temple of the Tooth. Afternoon in Peradeniya Botanical Gardens — the giant Java fig tree and the orchid house are family favourites.", overnight: "Kandy", optionalActivities: "" },
        { day: 4, title: "Train to Nuwara Eliya", description: "All aboard the famous hill-country train! Kids love the open doors and misty tunnels. Stop in Nuwara Eliya for strawberry picking and a tea factory tour.", overnight: "Nuwara Eliya", optionalActivities: "Pedal boats on Gregory Lake" },
        { day: 5, title: "Nuwara Eliya → Ella", description: "Morning drive to Ella with a stop at Ravana Falls — kids can splash in the base pool. Afternoon walk to Nine Arches Bridge.", overnight: "Ella", optionalActivities: "Little Adam's Peak easy hike" },
        { day: 6, title: "Ella → Udawalawe Safari", description: "Drive to Udawalawe National Park. Afternoon jeep safari — wild elephant herds in open grassland, plus water buffalo, crocodiles, and eagles. Visit the Elephant Transit Home.", overnight: "Udawalawe area", optionalActivities: "" },
        { day: 7, title: "Udawalawe → Mirissa / Unawatuna", description: "Drive to the south coast. Visit a turtle hatchery to learn about conservation. Afternoon beach time — safe swimming in the calm bay.", overnight: "Unawatuna / Mirissa", optionalActivities: "Glass-bottom boat" },
        { day: 8, title: "Galle Fort & Beach Day", description: "Morning walk around child-friendly Galle Fort — the ramparts have low walls and great views. Afternoon free on the beach. Kids' sandcastle competition!", overnight: "Galle area", optionalActivities: "Surfing lesson for older kids" },
        { day: 9, title: "Beach → Colombo & Departure", description: "Leisurely morning. Drive north along the coastal highway to Colombo airport for your departure flight.", overnight: "", optionalActivities: "" }
      ])
    },

    // ── 8. Sri Lanka Grand Island Tour ───────────────────────────
    {
      title: "Sri Lanka Grand Island Tour",
      slug: "sri-lanka-grand-island-tour",
      category: "Cultural",
      duration: "10 Days / 9 Nights",
      price: "From $1,250",
      rating: "5.0",
      featured: true,
      popular: false,
      image_url: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=900&q=80",
      description: "The complete Sri Lanka experience — every region of the island in one grand circuit. Ancient kingdoms, misty highlands, leopard safaris, whale watching, colonial forts and pristine beaches.",
      overview_title: "The Complete Sri Lanka Experience",
      difficulty: "Easy",
      minpax: "1",
      maxpax: "12",
      minimum_age: "5",
      vehicle: "Air-conditioned van",
      highlights: JSON.stringify([
        "Four UNESCO World Heritage Sites",
        "Sigiriya, Dambulla, Polonnaruwa, Anuradhapura",
        "Scenic Kandy–Ella train journey",
        "Leopard safari in Yala National Park",
        "Blue whale watching off Mirissa",
        "Galle Fort sunset and boutique dining",
        "Tea estate walk and factory tour",
        "Elephant herd at Udawalawe"
      ]),
      inclusions: JSON.stringify([
        "Accommodation (9 nights, 3★–4★ hotels)",
        "Daily breakfast + 2 special dinners",
        "Private air-conditioned transport throughout",
        "Licensed English-speaking guide",
        "All entrance fees listed",
        "Safari jeep at Yala and Udawalawe",
        "Whale watching boat ticket",
        "Train tickets (2nd class reserved)",
        "Airport pick-up and drop-off"
      ]),
      exclusions: JSON.stringify([
        "International flights",
        "Travel insurance",
        "Lunches and dinners (beyond inclusions)",
        "Personal expenses and tips",
        "Optional activities not listed"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Colombo", description: "Arrive at Bandaranaike International Airport. Transfer to Colombo hotel. Evening on Galle Face Green, the city's iconic oceanfront promenade.", overnight: "Colombo", optionalActivities: "Colombo city tuk-tuk tour" },
        { day: 2, title: "Colombo → Anuradhapura", description: "Drive north to Anuradhapura — Sri Lanka's first and most sacred ancient capital. The sacred Sri Maha Bodhi tree, Ruwanwelisaya, and Jetavanaramaya dagoba.", overnight: "Anuradhapura", optionalActivities: "Mihintale sacred mountain (evening)" },
        { day: 3, title: "Polonnaruwa", description: "Drive to Polonnaruwa — the medieval capital. The Royal Palace, Gal Vihara monolithic Buddha sculptures, Lotus Pond, and the Parakrama Samudra reservoir.", overnight: "Polonnaruwa / Habarana", optionalActivities: "" },
        { day: 4, title: "Sigiriya & Dambulla", description: "Morning climb of Sigiriya Lion Rock Fortress, then afternoon at the magnificent Dambulla Cave Temples with 150 gilded Buddhas and vibrant frescoes.", overnight: "Sigiriya area", optionalActivities: "Pidurangala Rock sunrise hike" },
        { day: 5, title: "Sigiriya → Kandy", description: "Drive south to Kandy — the cultural heart of Sri Lanka. Temple of the Tooth Relic, Peradeniya Botanical Gardens, Kandy Lake walkway. Evening cultural dance show.", overnight: "Kandy", optionalActivities: "" },
        { day: 6, title: "Kandy → Nuwara Eliya by Train", description: "Board the hill-country train for the most scenic railway ride in Asia — 3 hours through mist, waterfalls, and emerald tea estates. Arrive Nuwara Eliya; tea factory tour.", overnight: "Nuwara Eliya", optionalActivities: "Horton Plains early morning hike" },
        { day: 7, title: "Ella & Nine Arches Bridge", description: "Morning at World's End, Horton Plains (optional). Drive to Ella. Sunset walk to Nine Arches Bridge — watch the train cross the iconic stone viaduct.", overnight: "Ella", optionalActivities: "Little Adam's Peak hike" },
        { day: 8, title: "Ella → Yala Safari", description: "Drive south to Yala National Park. Afternoon and late-evening game drives — the world's highest density of leopards, plus elephants, sloth bears, and crocodiles.", overnight: "Yala area", optionalActivities: "" },
        { day: 9, title: "Udawalawe & Mirissa", description: "Morning safari at Udawalawe to see elephant herds. Drive to Mirissa beach. Afternoon whale watching briefing; enjoy the beach and a special farewell dinner.", overnight: "Mirissa", optionalActivities: "Whale watching boat" },
        { day: 10, title: "Galle Fort & Departure", description: "Morning whale watching (optional). Drive to UNESCO Galle Fort for a final stroll, coffee, and shopping. Transfer to Colombo airport for your flight home.", overnight: "", optionalActivities: "Galle Fort guided walk" }
      ])
    }
  ];

  for (const data of itineraries) {
    const record = new Record(col, data);
    app.save(record);
  }

}, (app) => {
  const slugs = [
    "classic-sri-lanka-loop",
    "east-coast-beach-escape",
    "hill-country-tea-trails",
    "wildlife-safari-adventure",
    "galle-southern-coast",
    "romantic-honeymoon-escape",
    "family-sri-lanka-adventure",
    "sri-lanka-grand-island-tour"
  ];
  try {
    const records = app.findRecordsByFilter("itineraries", `slug != ""`, "-id", 100, 0);
    for (const r of records) {
      if (slugs.includes(r.get("slug"))) app.delete(r);
    }
  } catch (_) {}
});
