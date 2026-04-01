import { Link } from 'react-router-dom'
import {
  ChevronRight, Code2, Cloud, Smartphone, Brain, Container, Server,
  CheckCircle2, ArrowRight, Globe, Shield, Zap, Star, Users, TrendingUp,
  MapPin, Phone, Sparkles
} from 'lucide-react'

const services = [
  { icon: Code2,      title: 'Web Development',      desc: 'Modern, scalable web apps using React, Next.js, and cutting-edge stacks.', color: 'blue' },
  { icon: Cloud,      title: 'Cloud Engineering',     desc: 'AWS, Azure & Google Cloud — architecture, migration and management.', color: 'emerald' },
  { icon: Container,  title: 'DevOps & Kubernetes',   desc: 'CI/CD pipelines, container orchestration and infrastructure automation.', color: 'blue' },
  { icon: Smartphone, title: 'Mobile Development',    desc: 'Native and cross-platform mobile apps for iOS and Android.', color: 'emerald' },
  { icon: Brain,      title: 'ML & Analytics',        desc: 'Machine learning models, data pipelines and business intelligence.', color: 'blue' },
  { icon: Server,     title: 'On-Prem Hosting',       desc: 'Proxmox & Kubernetes on-premises server setup and bootstrapping.', color: 'emerald' },
]

const stats = [
  { label: 'Projects Delivered', value: '50+', icon: TrendingUp },
  { label: 'Happy Clients',      value: '30+', icon: Users },
  { label: 'Years Experience',   value: '5+',  icon: Star },
  { label: 'Uptime Guarantee',   value: '99.9%', icon: Shield },
]

const features = [
  'Enterprise-grade infrastructure',
  'Agile delivery methodology',
  '24/7 technical support',
  'Security-first approach',
  'Scalable cloud solutions',
  'Dedicated engineering team',
]

export default function Home() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section relative min-h-screen flex items-center overflow-hidden">

        {/* Dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Extra glow orbs on top */}
        <div className="absolute -top-20 left-1/4 w-[420px] h-[420px] bg-blue-500 rounded-full opacity-20 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-emerald-400 rounded-full opacity-20 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* ── LEFT ── */}
            <div className="animate-fade-in-up">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold px-5 py-2 rounded-full mb-7 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Nairobi's Premier Tech Partner
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                Building the
                <span className="block gradient-text py-1">Digital Future</span>
                <span className="text-white">of Kenya</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-slate-200 text-xl mt-7 leading-relaxed max-w-lg font-light">
                From cloud infrastructure to AI-powered applications — we deliver world-class tech solutions right here from{' '}
                <span className="text-emerald-300 font-semibold">Kilimani, Nairobi</span>.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mt-9">
                <Link to="/signup"
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-1 text-base">
                  Get Started Free <ChevronRight className="w-5 h-5" />
                </Link>
                <Link to="/services"
                  className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 text-base backdrop-blur-sm">
                  Our Services <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Contact strip */}
              <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-white/15">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">Kilimani, Nairobi</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <a href="tel:+254791303899" className="flex items-center gap-2 text-slate-300 text-sm hover:text-emerald-300 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-white font-medium">0791 303 899</span>
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mt-8">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-extrabold text-white">{s.value}</div>
                    <div className="text-slate-300 text-xs mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — floating service card ── */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-[360px]">
                {/* Main card */}
                <div className="floating bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl shadow-blue-900/40">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">NewTech Kenya</div>
                      <div className="text-emerald-300 text-xs font-medium">Technology Solutions</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
                      <span className="text-emerald-300 text-xs font-semibold">Live</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {services.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors group">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          s.color === 'blue' ? 'bg-blue-500/30' : 'bg-emerald-500/30'
                        }`}>
                          <s.icon className={`w-4 h-4 ${s.color === 'blue' ? 'text-blue-300' : 'text-emerald-300'}`} />
                        </div>
                        <span className="text-white text-sm font-semibold">{s.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>

                  <div className="glow-line mt-6 mb-4" />

                  <div className="flex items-center justify-between">
                    <div className="text-slate-300 text-xs">📍 Kilimani, Nairobi</div>
                    <Link to="/signup" className="text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1">
                      Request Service <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Floating accent chips */}
                <div className="absolute -top-5 -right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/40 flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Cloud Ready
                </div>
                <div className="absolute -bottom-4 -left-5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-600/40 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> 99.9% Uptime
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-bold px-5 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" /> What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Core Services</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              End-to-end technology solutions tailored for businesses across East Africa and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card p-7 group cursor-default">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                  s.color === 'blue'
                    ? 'bg-blue-600 text-white group-hover:shadow-blue-400/40'
                    : 'bg-emerald-600 text-white group-hover:shadow-emerald-400/40'
                }`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <div className={`mt-5 flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  s.color === 'blue' ? 'text-blue-600 group-hover:text-blue-700' : 'text-emerald-600 group-hover:text-emerald-700'
                }`}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Explore All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-bold px-5 py-2 rounded-full mb-6">
                Why NewTech Kenya
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Built for impact, <br />
                <span className="text-blue-700">delivered with</span>{' '}
                <span className="text-emerald-600">excellence</span>
              </h2>
              <p className="text-slate-500 text-lg mt-5 leading-relaxed">
                We combine deep technical expertise with an understanding of the African market to deliver solutions that truly work for your business.
              </p>
              <div className="grid sm:grid-cols-2 gap-3.5 mt-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-9">
                <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                  Start Your Project <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <div key={i} className={`card p-7 text-center group ${i % 2 === 1 ? 'mt-8' : ''}`}>
                  <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all group-hover:scale-110 ${
                    i % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    <s.icon className="w-7 h-7" />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="text-slate-500 text-sm mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="hero-section relative py-24 overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400 rounded-full opacity-20 blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-emerald-300 text-sm font-bold px-5 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> Let's Build Together
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Ready to transform <br /> your business?
          </h2>
          <p className="text-slate-200 text-xl mb-10 max-w-xl mx-auto font-light">
            Join the growing list of businesses using NewTech Kenya. We'll reach out within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup"
              className="flex items-center gap-2 bg-white text-blue-900 font-bold px-9 py-4 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-1 shadow-xl text-base">
              Get Started Free <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+254791303899"
              className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white hover:text-blue-900 font-semibold px-9 py-4 rounded-xl transition-all hover:-translate-y-1 text-base backdrop-blur-sm">
              📞 0791 303 899
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
