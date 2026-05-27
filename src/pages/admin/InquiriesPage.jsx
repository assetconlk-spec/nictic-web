import { useEffect, useState } from 'react'
import { HiOutlineEnvelope, HiOutlineEnvelopeOpen, HiOutlineTrash, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import { pb } from '../../lib/pocketbase'
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal'

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    pb.collection('inquiries').getFullList({ sort: '-created' }).then((data) => {
      setInquiries(data)
      setLoading(false)
    })
  }, [])

  const toggleExpand = async (inquiry) => {
    if (expanded === inquiry.id) {
      setExpanded(null)
      return
    }
    setExpanded(inquiry.id)
    if (!inquiry.read) {
      await pb.collection('inquiries').update(inquiry.id, { read: true })
      setInquiries((prev) =>
        prev.map((i) => (i.id === inquiry.id ? { ...i, read: true } : i))
      )
    }
  }

  const handleDelete = (inquiry) => {
    setDeleteTarget(inquiry)
  }

  const confirmDelete = async () => {
    await pb.collection('inquiries').delete(deleteTarget.id)
    setInquiries((prev) => prev.filter((i) => i.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const unread = inquiries.filter((i) => !i.read).length

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900">Inquiries</h1>
        {unread > 0 && (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
            {unread} unread
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
          <HiOutlineEnvelope className="mx-auto mb-3 h-10 w-10" />
          <p className="font-medium">No inquiries yet</p>
          <p className="mt-1 text-sm">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                !inquiry.read ? 'border-primary-200' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => toggleExpand(inquiry)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-50 cursor-pointer"
              >
                <div className="shrink-0 text-gray-400">
                  {inquiry.read
                    ? <HiOutlineEnvelopeOpen className="h-5 w-5" />
                    : <HiOutlineEnvelope className="h-5 w-5 text-primary-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${!inquiry.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {inquiry.name}
                    </span>
                    {!inquiry.read && (
                      <span className="h-2 w-2 rounded-full bg-primary-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="truncate">{inquiry.email}</span>
                    {inquiry.subject && (
                      <span className="hidden sm:inline truncate">— {inquiry.subject}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-gray-400">{formatDate(inquiry.created)}</p>
                </div>
                <div className="shrink-0 ml-2 text-gray-400">
                  {expanded === inquiry.id
                    ? <HiOutlineChevronUp className="h-4 w-4" />
                    : <HiOutlineChevronDown className="h-4 w-4" />
                  }
                </div>
              </button>

              {expanded === inquiry.id && (
                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div><span className="font-medium text-gray-700">Email: </span><a href={`mailto:${inquiry.email}`} className="text-primary-600 hover:underline">{inquiry.email}</a></div>
                    {inquiry.phone && <div><span className="font-medium text-gray-700">Phone: </span>{inquiry.phone}</div>}
                    {inquiry.subject && <div><span className="font-medium text-gray-700">Subject: </span>{inquiry.subject}</div>}
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {inquiry.message}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <a
                      href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || 'Your inquiry'}`}
                      className="text-sm font-medium text-primary-600 hover:underline"
                    >
                      Reply via email
                    </a>
                    <button
                      onClick={() => handleDelete(inquiry)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 cursor-pointer"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Inquiry"
          message={`Delete the inquiry from "${deleteTarget.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
