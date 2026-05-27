import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import { Categories } from "../data/commonData";

// Fallback list without "All"
const FALLBACK = Categories.filter((c) => c !== "All");

export function useCategories() {
  const [categories, setCategories] = useState(FALLBACK);

  useEffect(() => {
    pb.collection("categories")
      .getFullList({ sort: "+created", requestKey: null })
      .then((records) => {
        if (records.length > 0) {
          setCategories(records.map((r) => r.name));
        }
      })
      .catch((err) => {
        console.warn("useCategories fetch failed:", err.message);
      });
  }, []);

  return categories; // does NOT include "All" — add it where needed
}
