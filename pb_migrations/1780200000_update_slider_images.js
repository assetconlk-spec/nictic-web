/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const updates = [
    {
      id: "auxcbtehj1k9tdl",
      image_url: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=1920&q=80",
    },
    {
      id: "q8xralwvem4q4xl",
      image_url: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=1920&q=80",
    },
    {
      id: "bbuoelbh1i8w7x3",
      image_url: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=1920&q=80",
    },
    {
      id: "tq78o8qioqa2t1h",
      image_url: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=1920&q=80",
    },
  ];

  for (const { id, image_url } of updates) {
    try {
      const record = app.findRecordById("slides", id);
      record.set("image_url", image_url);
      app.save(record);
    } catch (_) {}
  }
}, (app) => {
  const rollback = [
    { id: "auxcbtehj1k9tdl", image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
    { id: "q8xralwvem4q4xl", image_url: "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=1920&q=80" },
    { id: "bbuoelbh1i8w7x3", image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" },
    { id: "tq78o8qioqa2t1h", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" },
  ];

  for (const { id, image_url } of rollback) {
    try {
      const record = app.findRecordById("slides", id);
      record.set("image_url", image_url);
      app.save(record);
    } catch (_) {}
  }
});
