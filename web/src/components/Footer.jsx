import { Link } from 'react-router-dom'
import { Zap, MapPin, Phone, Mail, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">NewTech Kenya</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Delivering cutting-edge technology solutions across East Africa. From cloud infrastructure to AI-powered applications, we transform ideas into reality.
            </p>
            <div className="flex gap-3 mt-5">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/signup', label: 'Sign Up' },
                { to: '/login', label: 'Login' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-brand-emerald-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-emerald-500 mt-0.5 shrink-0" />
                <span>Kilimani, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-emerald-500 shrink-0" />
                <a href="tel:+254791303899" className="hover:text-brand-emerald-400 transition-colors">
                  +254 791 303 899
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-emerald-500 shrink-0" />
                <a href="mailto:info@newtechkenya.co.ke" className="hover:text-brand-emerald-400 transition-colors">
                  info@newtechkenya.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© 2024 NewTech Kenya. All rights reserved.</p>
          <p>Transforming East Africa, one solution at a time.</p>
        </div>
      </div>
    </footer>
  )
}
