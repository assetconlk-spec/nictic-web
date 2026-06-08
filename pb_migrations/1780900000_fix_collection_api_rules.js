/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const publicCollections = [
    "itineraries",
    "gallery",
    "slides",
    "categories",
    "page_banners",
    "about_preview",
    "essential_info",
    "contact_info",
  ];

  for (const name of publicCollections) {
    try {
      const col = app.findCollectionByNameOrId(name);
      col.listRule = "";
      col.viewRule = "";
      app.save(col);
    } catch (_) {}
  }
}, (app) => {});
