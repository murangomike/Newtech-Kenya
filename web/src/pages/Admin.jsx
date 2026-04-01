import { useState, useEffect } from 'react'
import { Users, Inbox, RefreshCw, CheckCircle2, Clock, XCircle, PlayCircle } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || '/api'

const statusBadge = {
  pending: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', cls: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-100 text-red-700' },
}

export default function Admin({ user }) {
  const [tab, setTab] = useState('requests')
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('nt_token')

  const fetchRequests = async () => {
    setLoading(true)
    const res = await fetch(`${API}/admin/requests`, { headers: { Authorization: `Bearer ${token}` } })
    setRequests(await res.json())
    setLoading(false)
  }

  const fetchUsers = async () => {
    setLoading(true)
    const res = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
    setUsers(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    if (tab === 'requests') fetchRequests()
    else fetchUsers()
  }, [tab])

  const updateStatus = async (id, status) => {
    await fetch(`${API}/admin/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  const counts = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-300 text-sm mt-1">Manage service requests and clients</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Requests', value: counts.total, cls: 'border-l-brand-blue-500' },
            { label: 'Pending', value: counts.pending, cls: 'border-l-yellow-400' },
            { label: 'In Progress', value: counts.in_progress, cls: 'border-l-blue-400' },
            { label: 'Completed', value: counts.completed, cls: 'border-l-emerald-500' },
          ].map((s, i) => (
            <div key={i} className={`card p-4 border-l-4 ${s.cls}`}>
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-6">
          {[
            { key: 'requests', label: 'Service Requests', icon: Inbox },
            { key: 'users', label: 'Users', icon: Users },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key ? 'bg-white text-brand-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
          <button onClick={() => tab === 'requests' ? fetchRequests() : fetchUsers()} className="p-2 text-slate-400 hover:text-slate-600">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-brand-blue-200 border-t-brand-blue-600 rounded-full animate-spin" />
          </div>
        ) : tab === 'requests' ? (
          <div className="space-y-3">
            {requests.length === 0 && (
              <div className="card p-10 text-center text-slate-400">No requests yet.</div>
            )}
            {requests.map(r => {
              const s = statusBadge[r.status] || statusBadge.pending
              return (
                <div key={r.id} className="card p-5">
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-slate-800">{r.service}</span>
                        <span className={`badge ${s.cls}`}>{s.label}</span>
                      </div>
                      {r.description && <p className="text-slate-500 text-sm mb-2">{r.description}</p>}
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="font-medium text-slate-600">{r.user_name}</span>
                        <span>{r.user_email}</span>
                        <span>{new Date(r.created_at).toLocaleDateString('en-KE')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap shrink-0">
                      <button
                        onClick={() => updateStatus(r.id, 'in_progress')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <PlayCircle className="w-3.5 h-3.5" /> In Progress
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'completed')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'cancelled')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Joined'].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">{u.name}</td>
                    <td className="px-5 py-3 text-slate-600">{u.email}</td>
                    <td className="px-5 py-3 text-slate-500">{u.phone || '—'}</td>
                    <td className="px-5 py-3 text-slate-400">{new Date(u.created_at).toLocaleDateString('en-KE')}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-400">No users yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
