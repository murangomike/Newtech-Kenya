import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusCircle, Clock, CheckCircle2, XCircle, Send, User,
  Inbox, LayoutDashboard, Zap, ArrowRight, RefreshCw
} from 'lucide-react'

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

const statusMap = {
  pending:     { label: 'Pending',     cls: 'bg-yellow-100 text-yellow-700 border border-yellow-200',    icon: Clock,         iconCls: 'text-yellow-500' },
  in_progress: { label: 'In Progress', cls: 'bg-blue-100 text-blue-700 border border-blue-200',          icon: RefreshCw,     iconCls: 'text-blue-500' },
  completed:   { label: 'Completed',   cls: 'bg-emerald-100 text-emerald-700 border border-emerald-200', icon: CheckCircle2,  iconCls: 'text-emerald-500' },
  cancelled:   { label: 'Cancelled',   cls: 'bg-red-100 text-red-600 border border-red-200',             icon: XCircle,       iconCls: 'text-red-400' },
}

export default function Dashboard({ user }) {
  const [requests, setRequests] = useState([])
  const [form, setForm] = useState({ service: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const token = localStorage.getItem('nt_token')

  const fetchRequests = async () => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch(`${API}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to fetch')
      setRequests(await res.json())
    } catch {
      setFetchError('Could not load your requests. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRequests() }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')
    setSuccess('')
    try {
      const res = await fetch(`${API}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess('Request submitted! Our team will reach out within 24 hours.')
      setForm({ service: '', description: '' })
      fetchRequests()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const counts = {
    total:     requests.length,
    pending:   requests.filter(r => r.status === 'pending').length,
    active:    requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header banner ── */}
      <div className="hero-section relative overflow-hidden">
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300 text-sm font-semibold">Client Dashboard</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.name?.split(' ')[0]}</h1>
                <p className="text-slate-300 text-sm mt-0.5">{user.email}</p>
              </div>
            </div>
            <Link to="/services"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/30 self-start sm:self-auto">
              Browse Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mini stat strip */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { label: 'Total Requests', value: counts.total,     color: 'bg-white/10 border-white/20' },
              { label: 'In Progress',    value: counts.active,    color: 'bg-blue-500/20 border-blue-400/30' },
              { label: 'Completed',      value: counts.completed, color: 'bg-emerald-500/20 border-emerald-400/30' },
            ].map((s, i) => (
              <div key={i} className={`${s.color} border rounded-2xl px-5 py-4 backdrop-blur-sm`}>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-slate-300 text-xs mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-5 gap-8">

        {/* Request form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <PlusCircle className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-bold text-slate-800">New Service Request</h2>
            </div>

            <div className="p-6">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                  {formError}
                </div>
              )}
              {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Service</label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Project Description <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    rows={5}
                    placeholder="Describe your project, timeline, budget or any specific requirements..."
                    className="input-field resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  {submitting
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Send className="w-4 h-4" /> Submit Request</>
                  }
                </button>
              </form>

              <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Our team responds within <span className="font-bold text-slate-800 mx-1">24 hours</span> on business days.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests list */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Inbox className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-bold text-slate-800">My Requests</h2>
            {requests.length > 0 && (
              <span className="ml-auto text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                {requests.length}
              </span>
            )}
            <button onClick={fetchRequests} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {fetchError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {fetchError}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-10 h-10 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-sm">Loading your requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg mb-1">No requests yet</h3>
              <p className="text-slate-400 text-sm mb-6">Submit your first service request using the form on the left.</p>
              <Link to="/services"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                Browse our services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map(r => {
                const s = statusMap[r.status] || statusMap.pending
                const Icon = s.icon
                return (
                  <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-bold text-slate-800">{r.service}</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}>
                            <Icon className={`w-3 h-3 ${s.iconCls}`} />
                            {s.label}
                          </span>
                        </div>
                        {r.description && (
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-2">{r.description}</p>
                        )}
                        <p className="text-slate-400 text-xs">
                          Submitted {new Date(r.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        r.status === 'completed'   ? 'bg-emerald-100' :
                        r.status === 'in_progress' ? 'bg-blue-100' :
                        r.status === 'cancelled'   ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${s.iconCls}`} />
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
