/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Map: record id → new Sri Lankan image_url (all verified Unsplash SL photos)
  const updates = {
    // Ancient Cities & Cultural Triangle — Dambulla Cave Temple golden interior
    "e3hcsu241l6v8bf": "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=900&q=80",
    // Southern Coast Beach Retreat — Mirissa golden beach
    "vibzy793zfidsh2": "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=900&q=80",
    // Kandy & Hill Country Explorer — Kandy Lake & Temple
    "uv7jl0b4wyda3e1": "https://images.unsplash.com/photo-1562698013-ac13558052cd?w=900&q=80",
    // Wildlife Safari Adventure (old) — Yala leopard
    "4u2ok2zabl8poml": "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=900&q=80",
    // Ayurveda & Wellness Retreat — peaceful tea estate hills
    "7rcad9nposcneay": "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=900&q=80",
    // Sri Lanka Highlights 10 Days — Sigiriya Rock Fortress aerial
    "ycyozo3cc5l8vwm": "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=900&q=80",
    // Classic Sri Lanka Loop — Sigiriya from ground (different angle)
    "8refir9g2kr464k": "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=900&q=80",
    // East Coast Beach Escape — Trincomalee turquoise bay
    "9gq196wxa4v819v": "https://images.unsplash.com/photo-1525849306000-cc26ceb5c1d7?w=900&q=80",
    // Hill Country & Tea Trails — tea estate rolling hills
    "s5lflj3ntpfwovk": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    // Wildlife & Safari Adventure (new) — whale watching Mirissa
    "9mk529hpb08r21m": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80",
    // Galle & Southern Coast — Galle Fort Dutch walls
    "lcryhk3mkazvwx8": "https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=900&q=80",
    // Romantic Honeymoon Escape — Mirissa sunset beach
    "qdtmk16g2y82h40": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    // Family Sri Lanka Adventure — Polonnaruwa ancient ruins
    "ufcek9jjkorqh7i": "https://images.unsplash.com/photo-1566299589192-bdf059d4b0be?w=900&q=80",
    // Sri Lanka Grand Island Tour — Nine Arches Bridge Ella
    "yrwonntszo4kn6z": "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=900&q=80",
  };

  for (const [id, imageUrl] of Object.entries(updates)) {
    try {
      const record = app.findRecordById("itineraries", id);
      record.set("image_url", imageUrl);
      record.set("image", ""); // clear any uploaded file so image_url is used
      app.save(record);
    } catch (e) {
      // record not found — skip silently
    }
  }
}, (_app) => {
  // No rollback needed — images can be re-edited via admin
});
