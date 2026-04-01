import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-emerald-600 flex items-center justify-center shadow-md group-hover:shadow-brand-blue-500/30 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-brand-blue-900">NewTech</span>
              <span className="font-bold text-lg text-brand-emerald-600"> Kenya</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  pathname === l.to
                    ? 'bg-brand-blue-50 text-brand-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue-700'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-brand-blue-700 transition-colors">
                  Hi, {user.name?.split(' ')[0]}
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-sm font-medium text-brand-emerald-600 hover:text-brand-emerald-700 transition-colors">
                    Admin
                  </Link>
                )}
                <button onClick={onLogout} className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-brand-blue-700 transition-colors px-4 py-2">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5 flex items-center gap-1">
                  Get Started <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-brand-blue-50 hover:text-brand-blue-700"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700">Dashboard</Link>
                {user.isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium text-brand-emerald-600">Admin</Link>
                )}
                <button onClick={() => { onLogout(); setOpen(false) }} className="px-4 py-2 text-sm font-medium text-red-500 text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
