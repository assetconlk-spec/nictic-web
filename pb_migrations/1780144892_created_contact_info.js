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
        "id": "text1146066909",
        "max": 0,
        "min": 0,
        "name": "phone",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "help": "",
        "hidden": false,
        "id": "email3885137012",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text223244161",
        "max": 0,
        "min": 0,
        "name": "address",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_3035559854",
    "indexes": [],
    "listRule": "",
    "name": "contact_info",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\"",
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3035559854");

  return app.delete(collection);
})
