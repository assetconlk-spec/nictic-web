/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const slides = [
    {
      id: "auxcbtehj1k9tdl",
      title: "Discover the Pearl of the Indian Ocean",
      subtitle: "Ancient temples, pristine beaches, and lush highlands — all in one island.",
      order: 1,
      active: true,
      image_url: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=1920&q=80",
    },
    {
      id: "q8xralwvem4q4xl",
      title: "Explore Sacred Ancient Cities",
      subtitle: "Walk through millennia of history in UNESCO World Heritage sites.",
      order: 2,
      active: true,
      image_url: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=1920&q=80",
    },
    {
      id: "bbuoelbh1i8w7b3",
      title: "Unwind on Golden Beaches",
      subtitle: "Crystal-clear waters and white sand stretch as far as the eye can see.",
      order: 3,
      active: true,
      image_url: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=1920&q=80",
    },
    {
      id: "tq78o8qioqa2t1h",
      title: "Journey Through the Tea Highlands",
      subtitle: "Rolling green hills, colonial charm, and the world's finest Ceylon tea.",
      order: 4,
      active: true,
      image_url: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=1920&q=80",
    },
  ];

  const collection = app.findCollectionByNameOrId("slides");

  for (const data of slides) {
    try {
      app.findRecordById("slides", data.id);
    } catch (_) {
      const record = new Record(collection);
      record.id = data.id;
      record.set("title", data.title);
      record.set("subtitle", data.subtitle);
      record.set("order", data.order);
      record.set("active", data.active);
      record.set("image_url", data.image_url);
      app.save(record);
    }
  }
}, (app) => {
  const ids = ["auxcbtehj1k9tdl", "q8xralwvem4q4xl", "bbuoelbh1i8w7b3", "tq78o8qioqa2t1h"];
  for (const id of ids) {
    try {
      const record = app.findRecordById("slides", id);
      app.delete(record);
    } catch (_) {}
  }
});
