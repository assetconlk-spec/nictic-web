import PocketBase from 'pocketbase'

const pb = new PocketBase('http://localhost:8090')

const ADMIN_EMAIL    = process.argv[2]
const ADMIN_PASSWORD = process.argv[3]

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Usage: node create-collections.mjs <email> <password>')
  process.exit(1)
}

const collections = [
  {
    name: 'slides',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'title',     type: 'text',   required: true  },
      { name: 'subtitle',  type: 'text',   required: false },
      { name: 'order',     type: 'number', required: false },
      { name: 'active',    type: 'bool',   required: false },
      { name: 'image',     type: 'file',   required: false },
      { name: 'image_url', type: 'text',   required: false },
    ],
  },
  {
    name: 'categories',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'name', type: 'text', required: true },
    ],
  },
  {
    name: 'tours',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'title',          type: 'text',   required: true  },
      { name: 'slug',           type: 'text',   required: true  },
      { name: 'category',       type: 'text',   required: false },
      { name: 'duration',       type: 'text',   required: false },
      { name: 'price',          type: 'text',   required: false },
      { name: 'rating',         type: 'text',   required: false },
      { name: 'featured',       type: 'bool',   required: false },
      { name: 'popular',        type: 'bool',   required: false },
      { name: 'image',          type: 'file',   required: false },
      { name: 'image_url',      type: 'text',   required: false },
      { name: 'map_image',      type: 'file',   required: false },
      { name: 'map_image_url',  type: 'text',   required: false },
      { name: 'description',    type: 'text',   required: false },
      { name: 'highlights',     type: 'text',   required: false },
      { name: 'inclusions',     type: 'text',   required: false },
      { name: 'exclusions',     type: 'text',   required: false },
      { name: 'overview_title', type: 'text',   required: false },
      { name: 'minpax',         type: 'text',   required: false },
      { name: 'maxpax',         type: 'text',   required: false },
      { name: 'minimum_age',    type: 'text',   required: false },
      { name: 'vehicle',        type: 'text',   required: false },
      { name: 'difficulty',     type: 'text',   required: false },
      { name: 'itinerary',      type: 'text',   required: false },
    ],
  },
  {
    name: 'gallery',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'image',     type: 'file', required: false },
      { name: 'image_url', type: 'text', required: false },
      { name: 'alt',       type: 'text', required: false },
      { name: 'category',  type: 'text', required: false },
      { name: 'featured',  type: 'bool', required: false },
    ],
  },
  {
    name: 'inquiries',
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'name',    type: 'text',  required: true  },
      { name: 'email',   type: 'email', required: true  },
      { name: 'phone',   type: 'text',  required: false },
      { name: 'subject', type: 'text',  required: false },
      { name: 'message', type: 'text',  required: true  },
      { name: 'read',    type: 'bool',  required: false },
    ],
  },
  {
    name: 'about_preview',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'main_image',              type: 'file', required: false },
      { name: 'main_image_url',          type: 'text', required: false },
      { name: 'overlay_image',           type: 'file', required: false },
      { name: 'overlay_image_url',       type: 'text', required: false },
      { name: 'story_main_image',        type: 'file', required: false },
      { name: 'story_main_image_url',    type: 'text', required: false },
      { name: 'story_overlay_image',     type: 'file', required: false },
      { name: 'story_overlay_image_url', type: 'text', required: false },
    ],
  },
  {
    name: 'contact_info',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'phone',   type: 'text',  required: false },
      { name: 'email',   type: 'email', required: false },
      { name: 'address', type: 'text',  required: false },
    ],
  },
  {
    name: 'essential_info',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'terms_and_conditions',        type: 'text', required: false },
      { name: 'payment_cancellation_policy', type: 'text', required: false },
      { name: 'guest_obligations',           type: 'text', required: false },
      { name: 'important_information',       type: 'text', required: false },
    ],
  },
  {
    name: 'page_banners',
    listRule: '', viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      { name: 'page',      type: 'text',   required: true  },
      { name: 'position',  type: 'number', required: false },
      { name: 'opacity',   type: 'number', required: false },
      { name: 'image',     type: 'file',   required: false },
      { name: 'image_url', type: 'text',   required: false },
    ],
  },
]

async function main() {
  await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
  console.log('Authenticated.')

  // Delete existing collections first, then recreate
  const existing = await pb.collections.getFullList()
  const systemNames = ['users', '_superusers', '_externalAuths', '_authOrigins', '_mfas', '_otps']

  for (const col of collections) {
    const found = existing.find(c => c.name === col.name)
    if (found) {
      await pb.collections.delete(found.id)
      console.log(`- deleted existing ${col.name}`)
    }
  }

  for (const col of collections) {
    try {
      await pb.collections.create({ type: 'base', ...col })
      console.log(`✓ ${col.name}`)
    } catch (e) {
      console.error(`✗ ${col.name}:`, JSON.stringify(e?.response?.data ?? e.message))
    }
  }

  console.log('\nDone.')
}

main()
