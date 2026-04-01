import { useState, useEffect } from 'react'
import { PlusCircle, Clock, CheckCircle2, XCircle, Send, User, Inbox } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || '/api'

const SERVICES = [
  'Web Development',
  'DevOps & CI/CD',
  'AWS / Azure / GCP',
  'Mobile Development',
  'Machine Learning & Analytics',
  'Kubernetes Development',
  'On-Prem Hosting (Proxmox)',
  'Security & Compliance',
  'Database Engineering',
  'Other',
]

const statusBadge = {
  pending: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', cls: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-100 text-red-700' },
}

export default function Dashboard({ user }) {
  const [requests, setRequests] = useState([])
  const [form, setForm] = useState({ service: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const token = localStorage.getItem('nt_token')

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRequests(data)
    } catch {
      setError('Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRequests() }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`${API}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess('Service request submitted! We will reach out soon.')
      setForm({ service: '', description: '' })
      fetchRequests()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue-800 to-brand-emerald-700 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, {user.name}</h1>
              <p className="text-blue-200 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-5 gap-8">
        {/* Request form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <PlusCircle className="w-5 h-5 text-brand-blue-600" />
              <h2 className="font-semibold text-slate-800">New Service Request</h2>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>}
            {success && <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-2 rounded-lg mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service</label>
                <select
                  value={form.service}
                  onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                  required
                  className="input-field"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={4}
                  placeholder="Tell us about your project or requirements..."
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><Send className="w-4 h-4" /> Submit Request</>
                }
              </button>
            </form>
          </div>
        </div>

        {/* Requests list */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-5">
            <Inbox className="w-5 h-5 text-brand-blue-600" />
            <h2 className="font-semibold text-slate-800">My Requests</h2>
            <span className="ml-auto badge bg-brand-blue-100 text-brand-blue-700">{requests.length}</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-3 border-brand-blue-200 border-t-brand-blue-600 rounded-full animate-spin" />
            </div>
          ) : requests.length === 0 ? (
            <div className="card p-10 text-center text-slate-400">
              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No requests yet</p>
              <p className="text-sm mt-1">Submit your first service request!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map(r => {
                const s = statusBadge[r.status] || statusBadge.pending
                return (
                  <div key={r.id} className="card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800 text-sm">{r.service}</span>
                          <span className={`badge ${s.cls}`}>{s.label}</span>
                        </div>
                        {r.description && (
                          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-2">{r.description}</p>
                        )}
                        <p className="text-slate-400 text-xs mt-2">
                          {new Date(r.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {r.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {r.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                        {r.status === 'cancelled' && <XCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
