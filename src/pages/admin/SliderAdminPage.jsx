import { useEffect, useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2'
import { pb } from '../../lib/pocketbase'
import { compressImage } from '../../lib/compressImage'
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal'

const emptyForm = {
  title: '',
  subtitle: '',
  order: '0',
  active: true,
  image: '',
}

function Modal({ slide, onClose, onSaved }) {
  const [form, setForm] = useState(slide ? { ...slide, order: String(slide.order ?? 0) } : emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setForm((f) => ({ ...f, image: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required.'); return }
    setError('')
    setSaving(true)
    try {
      // Step 1: save text fields as plain JSON (avoids CORS preflight rejection on FormData PATCH)
      const data = {
        title: form.title,
        subtitle: form.subtitle,
        order: Number(form.order) || 0,
        active: form.active,
      }

      let record
      if (slide) {
        record = await pb.collection('slides').update(slide.id, data)
      } else {
        record = await pb.collection('slides').create(data)
      }

      // Step 2: upload file separately only if needed
      const hasNewImage = imageFile ||
        (form.image && form.image.startsWith('http') && !form.image.includes('/api/files/'))

      if (hasNewImage) {
        const fd = new FormData()
        if (imageFile) {
          fd.append('image', await compressImage(imageFile, 'slider'))
          fd.append('image_url', '')
        } else {
          fd.append('image_url', form.image)
        }
        await pb.collection('slides').update(record.id, fd)
      }

      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-bold text-gray-900">{slide ? 'Edit Slide' : 'Add Slide'}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:text-gray-700 cursor-pointer">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="input"
              placeholder="Discover the Pearl of the Indian Ocean"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Subtitle</label>
            <input
              value={form.subtitle}
              onChange={(e) => set('subtitle', e.target.value)}
              className="input"
              placeholder="Explore ancient wonders, pristine beaches, and vibrant culture"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Order</label>
              <input
                type="number"
                min="0"
                value={form.order}
                onChange={(e) => set('order', e.target.value)}
                className="input"
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={(e) => set('active', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 cursor-pointer"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700 cursor-pointer">
                Active (show on homepage)
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            />
            {form.image && (
              <img src={form.image} alt="preview" className="mt-2 h-36 w-full rounded-lg object-cover" />
            )}
            <p className="mt-1 text-xs text-gray-400">Or paste an image URL:</p>
            <input
              type="url"
              value={imageFile ? '' : form.image}
              onChange={(e) => { setImageFile(null); set('image', e.target.value) }}
              className="input mt-1"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Saving…' : slide ? 'Save Changes' : 'Add Slide'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function normalizeSlide(record) {
  return {
    ...record,
    image: record.image
      ? pb.files.getURL(record, record.image)
      : (record.image_url || ''),
  }
}

export default function SliderAdminPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchSlides = async () => {
    const data = await pb.collection('slides').getFullList({ sort: 'order' })
    setSlides(data.map(normalizeSlide))
    setLoading(false)
  }

  useEffect(() => { fetchSlides() }, [])

  const handleDelete = (slide) => {
    setDeleteTarget(slide)
  }

  const confirmDelete = async () => {
    await pb.collection('slides').delete(deleteTarget.id)
    setSlides((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const handleSaved = () => {
    setModal(null)
    fetchSlides()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Homepage Slider</h1>
        <button
          onClick={() => setModal('add')}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 cursor-pointer"
        >
          <HiOutlinePlus className="h-4 w-4" />
          Add Slide
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : slides.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
          <p className="font-medium">No slides yet</p>
          <p className="mt-1 text-sm">Click &quot;Add Slide&quot; to create your first homepage slide</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Slide</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Subtitle</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Order</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {slides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {slide.image && (
                        <img src={slide.image} alt={slide.title} className="h-12 w-20 rounded-lg object-cover shrink-0" />
                      )}
                      <span className="font-medium text-gray-900 line-clamp-2">{slide.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 max-w-xs">
                    <span className="line-clamp-1">{slide.subtitle}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{slide.order}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      slide.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {slide.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setModal(slide)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                      >
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slide)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal
          slide={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Slide"
          message={`Delete the slide "${deleteTarget.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
