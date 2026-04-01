import { Link } from 'react-router-dom'
import {
  Code2, Cloud, Container, Smartphone, Brain, Server,
  GitBranch, Database, Lock, ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    color: 'blue',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Modern, performant web applications using React, Next.js, Vue and more. From landing pages to full-stack SaaS platforms.',
    features: ['React / Next.js / Vue', 'REST & GraphQL APIs', 'Progressive Web Apps', 'E-commerce platforms'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    color: 'emerald',
    img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Streamline your development lifecycle with automated pipelines, infrastructure as code, and continuous delivery.',
    features: ['GitHub Actions / GitLab CI', 'Terraform & Ansible', 'Docker & container registries', 'Monitoring & alerting'],
  },
  {
    icon: Cloud,
    title: 'AWS, Azure & GCP',
    color: 'blue',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Expert cloud architecture, migration, optimization and management across all major cloud platforms.',
    features: ['Cloud migration & lift-shift', 'Cost optimization', 'Multi-cloud strategies', 'Serverless architectures'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    color: 'emerald',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Native and cross-platform mobile applications that delight users on iOS and Android.',
    features: ['React Native', 'Flutter', 'Native iOS & Android', 'App Store deployment'],
  },
  {
    icon: Brain,
    title: 'Machine Learning & Analytics',
    color: 'blue',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Harness the power of data with custom ML models, ETL pipelines, and interactive dashboards.',
    features: ['Predictive analytics', 'NLP & computer vision', 'BI dashboards', 'Data engineering'],
  },
  {
    icon: Container,
    title: 'Kubernetes Development',
    color: 'emerald',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Design and manage production-grade Kubernetes clusters for high-availability workloads.',
    features: ['Cluster design & setup', 'Helm chart development', 'Service mesh (Istio)', 'GitOps with ArgoCD'],
  },
  {
    icon: Server,
    title: 'On-Prem Hosting',
    color: 'blue',
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Bootstrap your own private cloud with Proxmox VE and Kubernetes — full control, no vendor lock-in.',
    features: ['Proxmox VE setup', 'Bare-metal Kubernetes', 'Storage (Ceph / NFS)', 'Networking & firewall'],
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    color: 'emerald',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Protect your infrastructure and applications with security audits, penetration testing and compliance readiness.',
    features: ['Security audits', 'Vulnerability scanning', 'SSL/TLS management', 'GDPR & data compliance'],
  },
  {
    icon: Database,
    title: 'Database Engineering',
    color: 'blue',
    img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=700&h=280&q=80',
    desc: 'Design, optimize and manage databases for performance, reliability and scalability.',
    features: ['PostgreSQL / MySQL', 'MongoDB / Redis', 'Database migrations', 'Replication & backups'],
  },
]

export default function Services() {
  return (
    <div>
      {/* Header — uses hero-section class to avoid bg conflict */}
      <section className="hero-section relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold px-5 py-2 rounded-full mb-6">
            What We Offer
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Technology Solutions <br />
            <span className="gradient-text">for the Modern Business</span>
          </h1>
          <p className="text-slate-200 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            From idea to production — end-to-end engineering excellence across web, mobile, cloud and AI.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <div key={i} className="card overflow-hidden group flex flex-col">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 opacity-70 ${
                    s.color === 'blue'
                      ? 'bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent'
                      : 'bg-gradient-to-t from-emerald-900/80 via-emerald-900/20 to-transparent'
                  }`} />
                  {/* Icon badge */}
                  <div className={`absolute bottom-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                    s.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'
                  }`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                          s.color === 'blue' ? 'text-blue-500' : 'text-emerald-500'
                        }`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${
                    s.color === 'blue' ? 'text-blue-600' : 'text-emerald-600'
                  } opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Request this service <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Need a custom solution?</h2>
          <p className="text-slate-500 text-lg mb-8">
            Sign up today and submit a request. Our team will reach out within 24 hours.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Request a Service <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
