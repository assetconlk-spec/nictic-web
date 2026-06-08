/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text336246304",
        "max": 0,
        "min": 0,
        "name": "page",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number1177347317",
        "max": null,
        "min": null,
        "name": "position",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number1140682086",
        "max": null,
        "min": null,
        "name": "opacity",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "file3309110367",
        "maxSelect": 0,
        "maxSize": 0,
        "mimeTypes": null,
        "name": "image",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": null,
        "type": "file"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text2895943165",
        "max": 0,
        "min": 0,
        "name": "image_url",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_2297924347",
    "indexes": [],
    "listRule": "",
    "name": "page_banners",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\"",
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2297924347");

  return app.delete(collection);
})
