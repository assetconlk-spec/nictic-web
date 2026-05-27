import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HiOutlineMap, HiOutlinePhoto, HiOutlineEnvelope, HiOutlineArrowRight, HiOutlineSquares2X2 } from 'react-icons/hi2'
import { pb } from '../../lib/pocketbase'

export default function DashboardPage() {
  const [stats, setStats] = useState({ tours: 0, gallery: 0, inquiries: 0, unread: 0, slides: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const fallback = { totalItems: 0 }
        const [tours, gallery, inquiries, unread, slides] = await Promise.all([
          pb.collection('tours').getList(1, 1, { requestKey: 'dash-tours' }).catch(() => fallback),
          pb.collection('gallery').getList(1, 1, { requestKey: 'dash-gallery' }).catch(() => fallback),
          pb.collection('inquiries').getList(1, 1, { requestKey: 'dash-inq-total' }).catch(() => fallback),
          pb.collection('inquiries').getList(1, 1, { filter: 'read=false', requestKey: 'dash-inq-unread' }).catch(() => fallback),
          pb.collection('slides').getList(1, 1, { requestKey: 'dash-slides' }).catch(() => fallback),
        ])
        setStats({
          tours: tours.totalItems,
          gallery: gallery.totalItems,
          inquiries: inquiries.totalItems,
          unread: unread.totalItems,
          slides: slides.totalItems,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      label: 'Slider Slides',
      value: stats.slides,
      icon: HiOutlineSquares2X2,
      color: 'bg-purple-50 text-purple-600',
      to: '/admin/slider',
    },
    {
      label: 'Tours',
      value: stats.tours,
      icon: HiOutlineMap,
      color: 'bg-primary-50 text-primary-600',
      to: '/admin/tours',
    },
    {
      label: 'Gallery Images',
      value: stats.gallery,
      icon: HiOutlinePhoto,
      color: 'bg-blue-50 text-blue-600',
      to: '/admin/gallery',
    },
    {
      label: 'Inquiries',
      value: stats.inquiries,
      icon: HiOutlineEnvelope,
      color: 'bg-amber-50 text-amber-600',
      to: '/admin/inquiries',
      badge: stats.unread > 0 ? `${stats.unread} unread` : null,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Dashboard</h1>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, color, to, badge }) => (
            <Link
              key={label}
              to={to}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <HiOutlineArrowRight className="h-4 w-4 text-gray-300 transition group-hover:text-gray-500" />
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-sm text-gray-500">{label}</p>
                  {badge && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-2 font-semibold text-gray-900">Quick links</h2>
        <ul className="space-y-2 text-sm text-primary-600">
          <li><Link to="/admin/slider" className="hover:underline">+ Manage homepage slides</Link></li>
          <li><Link to="/admin/tours" className="hover:underline">+ Add a new tour</Link></li>
          <li><Link to="/admin/gallery" className="hover:underline">+ Upload gallery images</Link></li>
          <li><Link to="/admin/inquiries" className="hover:underline">View latest inquiries</Link></li>
        </ul>
      </div>
    </div>
  )
}
