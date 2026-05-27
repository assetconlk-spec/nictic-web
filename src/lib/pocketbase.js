import PocketBase from 'pocketbase'

// Always use the current origin — Vite proxy (dev) and Vercel rewrite (prod)
// both forward /api/* and /_/* to PocketBase, so no cross-origin request is ever made.
export const pb = new PocketBase(window.location.origin)

export function getFileUrl(record, filename) {
  if (!filename) return ''
  if (filename.startsWith('http')) return filename
  return pb.files.getURL(record, filename)
}
