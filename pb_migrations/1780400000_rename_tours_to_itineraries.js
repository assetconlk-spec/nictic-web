/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3830217189");
  collection.name = "itineraries";
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3830217189");
  collection.name = "tours";
  app.save(collection);
});
