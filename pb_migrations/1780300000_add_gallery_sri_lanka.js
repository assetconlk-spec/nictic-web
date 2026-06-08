/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const images = [
    // ── Beaches ─────────────────────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=800&q=80", alt: "Mirissa Beach at Sunset", category: "Beach", featured: true },
    { image_url: "https://images.unsplash.com/photo-1525849306000-cc26ceb5c1d7?w=800&q=80", alt: "Trincomalee Turquoise Waters", category: "Beach", featured: true },
    { image_url: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=800&q=80", alt: "Arugam Bay Surf Break", category: "Beach", featured: false },
    { image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Unawatuna Beach Cove", category: "Beach", featured: false },
    { image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Golden Sandy Beach Sri Lanka", category: "Beach", featured: false },
    { image_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", alt: "Whale Watching off Mirissa Coast", category: "Beach", featured: false },

    // ── Mountains & Highlands ───────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80", alt: "Nine Arches Bridge, Ella", category: "Adventure", featured: true },
    { image_url: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=800&q=80", alt: "Nuwara Eliya Tea Hills", category: "Adventure", featured: true },
    { image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Rolling Tea Estates Hill Country", category: "Adventure", featured: false },
    { image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", alt: "Little Adam's Peak Hiking Trail", category: "Adventure", featured: false },
    { image_url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Knuckles Mountain Range Trekking", category: "Adventure", featured: false },

    // ── Cultural & Heritage ─────────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=800&q=80", alt: "Sigiriya Rock Fortress Lion Rock", category: "Cultural", featured: true },
    { image_url: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=800&q=80", alt: "Dambulla Cave Temple", category: "Cultural", featured: true },
    { image_url: "https://images.unsplash.com/photo-1566299589192-bdf059d4b0be?w=800&q=80", alt: "Polonnaruwa Ancient Ruins", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=800&q=80", alt: "Galle Fort Dutch Colonial Walls", category: "Cultural", featured: true },
    { image_url: "https://images.unsplash.com/photo-1562698013-ac13558052cd?w=800&q=80", alt: "Kandy Perahera Festival Dancers", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?w=800&q=80", alt: "Temple of the Tooth, Kandy", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", alt: "Colombo Skyline at Dusk", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=800&q=80", alt: "Sigiriya Frescoes on the Rock", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1623595289196-007a22dd8560?w=800&q=80", alt: "Colombo Lotus Tower", category: "Cultural", featured: false },

    // ── Wildlife ────────────────────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=800&q=80", alt: "Leopard in Yala National Park", category: "Wildlife", featured: true },
    { image_url: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80", alt: "Wild Elephant Udawalawe", category: "Wildlife", featured: true },
    { image_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", alt: "Blue Whale Breach Mirissa", category: "Wildlife", featured: false },

    // ── Tourists & Experiences ──────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80", alt: "Tourists at Nine Arches Bridge", category: "Cultural", featured: false },
    { image_url: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=800&q=80", alt: "Tuk-tuk Tour Through Galle", category: "Cultural", featured: false },

    // ── Culinary ────────────────────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&q=80", alt: "Sri Lankan Street Food Market", category: "Culinary", featured: false },
    { image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Traditional Sri Lankan Rice & Curry", category: "Culinary", featured: true },
    { image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", alt: "Ceylon Tea Tasting Session", category: "Culinary", featured: false },

    // ── Wellness ────────────────────────────────────────────────
    { image_url: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&q=80", alt: "Ayurveda Spa in Sri Lanka", category: "Wellness", featured: true },
    { image_url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80", alt: "Sunrise Yoga on the Beach", category: "Wellness", featured: false },
  ];

  const collection = app.findCollectionByNameOrId("gallery");

  for (const item of images) {
    const record = new Record(collection, item);
    app.save(record);
  }
}, (app) => {
  // Rollback: remove records with matching image_urls
  const toRemove = [
    "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=800&q=80",
    "https://images.unsplash.com/photo-1525849306000-cc26ceb5c1d7?w=800&q=80",
    "https://images.unsplash.com/photo-1583653319049-4db347571740?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80",
    "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=800&q=80",
    "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=800&q=80",
    "https://images.unsplash.com/photo-1566299589192-bdf059d4b0be?w=800&q=80",
    "https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=800&q=80",
    "https://images.unsplash.com/photo-1562698013-ac13558052cd?w=800&q=80",
    "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?w=800&q=80",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=800&q=80",
    "https://images.unsplash.com/photo-1623595289196-007a22dd8560?w=800&q=80",
    "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=800&q=80",
    "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&q=80",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
  ];
  try {
    const records = app.findRecordsByFilter("gallery", `image_url != ""`, "-id", 200, 0);
    for (const r of records) {
      if (toRemove.includes(r.get("image_url"))) app.delete(r);
    }
  } catch (_) {}
});
