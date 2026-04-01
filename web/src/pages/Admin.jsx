import { useState, useEffect } from 'react'
import {
  Users, Inbox, RefreshCw, CheckCircle2, Clock, XCircle, PlayCircle,
  Mail, Send, X, MailCheck, Phone
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL || '/api'

const statusBadge = {
  pending:     { label: 'Pending',     cls: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
  completed:   { label: 'Completed',   cls: 'bg-emerald-100 text-emerald-700' },
  cancelled:   { label: 'Cancelled',   cls: 'bg-red-100 text-red-700' },
}

// ── Email compose modal ──────────────────────────────────────────────────────
function EmailModal({ target, onClose }) {
  const [form, setForm] = useState({
    to:       target?.email || '',
    to_name:  target?.name  || '',
    subject:  target?.service ? `Re: ${target.service} Request` : '',
    message:  target?.service
      ? `Hi ${target?.name || 'there'},\n\nThank you for your interest in our ${target.service} services.\n\n`
      : '',
    request_id: target?.request_id || null,
  })
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const token = localStorage.getItem('nt_token')

  const send = async e => {
    e.preventDefault()
    setSending(true)
    setResult(null)
    try {
      const res = await fetch(`${API}/admin/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult({ ok: true, msg: data.message })
    } catch (err) {
      setResult({ ok: false, msg: err.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">Email Customer</div>
              <div className="text-xs text-slate-400">{form.to}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {result ? (
          <div className="p-8 text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${result.ok ? 'bg-emerald-100' : 'bg-red-100'}`}>
              {result.ok
                ? <MailCheck className="w-7 h-7 text-emerald-600" />
                : <XCircle className="w-7 h-7 text-red-500" />}
            </div>
            <p className={`font-semibold text-lg mb-1 ${result.ok ? 'text-emerald-700' : 'text-red-600'}`}>
              {result.ok ? 'Email sent!' : 'Failed to send'}
            </p>
            <p className="text-slate-500 text-sm mb-6">{result.msg}</p>
            <button onClick={onClose} className="btn-primary px-8">Close</button>
          </div>
        ) : (
          <form onSubmit={send} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">To Name</label>
                <input
                  value={form.to_name}
                  onChange={e => setForm(p => ({ ...p, to_name: e.target.value }))}
                  placeholder="Customer name"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">To Email</label>
                <input
                  type="email"
                  value={form.to}
                  onChange={e => setForm(p => ({ ...p, to: e.target.value }))}
                  required
                  className="input-field text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Subject</label>
              <input
                value={form.subject}
                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                required
                placeholder="Email subject"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                required
                rows={7}
                placeholder="Write your message..."
                className="input-field text-sm resize-none"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose}
                className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                Cancel
              </button>
              <button type="submit" disabled={sending}
                className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-60">
                {sending
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><Send className="w-4 h-4" /> Send Email</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Main Admin component ────────────────────────────────────────────────────
export default function Admin({ user }) {
  const [tab, setTab] = useState('requests')
  const [requests, setRequests]   = useState([])
  const [users, setUsers]         = useState([])
  const [sentEmails, setSentEmails] = useState([])
  const [loading, setLoading]     = useState(false)
  const [emailTarget, setEmailTarget] = useState(null)   // opens modal
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
  const fetchEmails = async () => {
    setLoading(true)
    const res = await fetch(`${API}/admin/emails`, { headers: { Authorization: `Bearer ${token}` } })
    setSentEmails(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    if (tab === 'requests') fetchRequests()
    else if (tab === 'users') fetchUsers()
    else fetchEmails()
  }, [tab])

  const updateStatus = async (id, status) => {
    await fetch(`${API}/admin/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  const refresh = () => {
    if (tab === 'requests') fetchRequests()
    else if (tab === 'users') fetchUsers()
    else fetchEmails()
  }

  const counts = {
    total:       requests.length,
    pending:     requests.filter(r => r.status === 'pending').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed:   requests.filter(r => r.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-300 text-sm mt-1">Manage requests, clients and communications</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Requests', value: counts.total,       accent: 'border-l-blue-500' },
            { label: 'Pending',        value: counts.pending,     accent: 'border-l-yellow-400' },
            { label: 'In Progress',    value: counts.in_progress, accent: 'border-l-blue-400' },
            { label: 'Completed',      value: counts.completed,   accent: 'border-l-emerald-500' },
          ].map((s, i) => (
            <div key={i} className={`card p-4 border-l-4 ${s.accent}`}>
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-6">
          {[
            { key: 'requests', label: 'Service Requests', icon: Inbox },
            { key: 'users',    label: 'Users',            icon: Users },
            { key: 'emails',   label: 'Sent Emails',      icon: MailCheck },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
          <button onClick={refresh} className="p-2 text-slate-400 hover:text-slate-600">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ── Compose button (always visible) ── */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setEmailTarget({})}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            <Mail className="w-4 h-4" /> Compose Email
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>

        ) : tab === 'requests' ? (
          <div className="space-y-3">
            {requests.length === 0 && <div className="card p-10 text-center text-slate-400">No requests yet.</div>}
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
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="font-semibold text-slate-700">{r.user_name}</span>
                        <span>{r.user_email}</span>
                        {r.user_phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />{r.user_phone}
                          </span>
                        )}
                        <span>{new Date(r.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap shrink-0">
                      <button onClick={() => setEmailTarget({ email: r.user_email, name: r.user_name, service: r.service, request_id: r.id })}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </button>
                      <button onClick={() => updateStatus(r.id, 'in_progress')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                        <PlayCircle className="w-3.5 h-3.5" /> In Progress
                      </button>
                      <button onClick={() => updateStatus(r.id, 'completed')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                      </button>
                      <button onClick={() => updateStatus(r.id, 'cancelled')}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        ) : tab === 'users' ? (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Joined', 'Action'].map(h => (
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
                    <td className="px-5 py-3">
                      <button
                        onClick={() => setEmailTarget({ email: u.email, name: u.name })}
                        className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">No users yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>

        ) : (
          /* ── Sent emails log ── */
          <div className="space-y-3">
            {sentEmails.length === 0 && (
              <div className="card p-10 text-center text-slate-400">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No emails sent yet.</p>
              </div>
            )}
            {sentEmails.map(e => (
              <div key={e.id} className="card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MailCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-800 text-sm">{e.subject}</span>
                    </div>
                    <div className="text-slate-500 text-xs mb-2">
                      To: <span className="font-medium text-slate-700">{e.to_name || e.to}</span> &lt;{e.to}&gt;
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">{e.message}</p>
                  </div>
                  <div className="text-xs text-slate-400 shrink-0">
                    {new Date(e.sent_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email compose modal */}
      {emailTarget !== null && (
        <EmailModal target={emailTarget} onClose={() => setEmailTarget(null)} />
      )}
    </div>
  )
}
