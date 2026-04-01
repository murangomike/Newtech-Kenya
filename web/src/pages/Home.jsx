import { Link } from 'react-router-dom'
import {
  ChevronRight, Code2, Cloud, Smartphone, Brain, Container, Server,
  CheckCircle2, ArrowRight, Globe, Shield, Zap, Star, Users, TrendingUp
} from 'lucide-react'

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Modern, scalable web applications built with cutting-edge technologies.', color: 'blue' },
  { icon: Cloud, title: 'Cloud Engineering', desc: 'AWS, Azure & Google Cloud architecture, migration and management.', color: 'emerald' },
  { icon: Container, title: 'DevOps & Kubernetes', desc: 'CI/CD pipelines, container orchestration and infrastructure automation.', color: 'blue' },
  { icon: Smartphone, title: 'Mobile Development', desc: 'Native and cross-platform mobile apps for iOS and Android.', color: 'emerald' },
  { icon: Brain, title: 'ML & Analytics', desc: 'Machine learning models, data pipelines and business intelligence.', color: 'blue' },
  { icon: Server, title: 'On-Prem Hosting', desc: 'Proxmox & Kubernetes on-premises server setup and bootstrapping.', color: 'emerald' },
]

const stats = [
  { label: 'Projects Delivered', value: '50+', icon: TrendingUp },
  { label: 'Happy Clients', value: '30+', icon: Users },
  { label: 'Years Experience', value: '5+', icon: Star },
  { label: 'Uptime Guarantee', value: '99.9%', icon: Shield },
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
      {/* Hero */}
      <section className="relative bg-gradient-hero hero-pattern min-h-[92vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-emerald-300 text-sm font-medium px-4 py-2 rounded-full border border-white/20 mb-6">
                <Zap className="w-4 h-4" />
                Nairobi's Premier Tech Partner
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Building the
                <span className="block gradient-text mt-1">Digital Future</span>
                of Kenya
              </h1>
              <p className="text-slate-300 text-lg mt-6 leading-relaxed max-w-lg">
                From cloud infrastructure to AI-powered applications — we deliver world-class technology solutions right here from Kilimani, Nairobi.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/signup" className="btn-emerald flex items-center gap-2">
                  Get Started Free <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/services" className="btn-outline flex items-center gap-2">
                  Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                {stats.slice(0,2).map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
                <div className="w-px h-12 bg-white/20" />
                {stats.slice(2).map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating card */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="floating w-80 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 glow-blue">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">NewTech Kenya</div>
                      <div className="text-emerald-400 text-xs">Technology Solutions</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {services.slice(0,4).map((s, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                        <s.icon className={`w-4 h-4 ${s.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'}`} />
                        <span className="text-white text-sm font-medium">{s.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-4">
                    <span>📍 Kilimani, Nairobi</span>
                    <span className="text-emerald-400 font-semibold">● Active</span>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full opacity-60 blur-sm" />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-500 rounded-full opacity-40 blur-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              What We Do
            </div>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              End-to-end technology solutions tailored for businesses across East Africa and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((s, i) => (
              <div key={i} className="card p-6 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  s.color === 'blue'
                    ? 'bg-brand-blue-100 text-brand-blue-600'
                    : 'bg-brand-emerald-100 text-brand-emerald-600'
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-emerald-50 text-brand-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Why NewTech Kenya
              </div>
              <h2 className="section-title text-left">Built for impact, <br /> delivered with excellence</h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                We combine deep technical expertise with an understanding of the African market to deliver solutions that truly work for your business.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                  Start Your Project <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className={`card p-6 text-center ${i % 2 === 1 ? 'mt-6' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                    i % 2 === 0 ? 'bg-brand-blue-100 text-brand-blue-600' : 'bg-brand-emerald-100 text-brand-emerald-600'
                  }`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">{s.value}</div>
                  <div className="text-slate-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join the growing list of businesses using NewTech Kenya's solutions. Let's build something great together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="bg-white text-brand-blue-800 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg">
              Get Started Free
            </Link>
            <a href="tel:+254791303899" className="btn-outline flex items-center gap-2">
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
