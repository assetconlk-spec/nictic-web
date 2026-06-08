/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Keep only one record per image_url — delete extras sorted by id desc (newest duplicate)
  const records = app.findRecordsByFilter("gallery", `image_url != ""`, "+id", 200, 0);
  const seen = {};
  for (const r of records) {
    const url = r.get("image_url");
    if (seen[url]) {
      app.delete(r);
    } else {
      seen[url] = true;
    }
  }
}, (_app) => {
  // no rollback needed for dedup
});
