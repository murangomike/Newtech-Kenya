import { Link } from 'react-router-dom'
import {
  Code2, Cloud, Container, Smartphone, Brain, Server,
  GitBranch, Database, Lock, ChevronRight, CheckCircle2
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    color: 'blue',
    desc: 'We craft modern, performant web applications using React, Next.js, Vue, and more. From landing pages to full-stack SaaS platforms.',
    features: ['React / Next.js / Vue', 'REST & GraphQL APIs', 'Progressive Web Apps', 'E-commerce platforms'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    color: 'emerald',
    desc: 'Streamline your development lifecycle with automated pipelines, infrastructure as code, and continuous delivery practices.',
    features: ['GitHub Actions / GitLab CI', 'Terraform & Ansible', 'Docker & container registries', 'Monitoring & alerting'],
  },
  {
    icon: Cloud,
    title: 'AWS, Azure & GCP',
    color: 'blue',
    desc: 'Expert cloud architecture, migration, optimization and management across all major cloud platforms.',
    features: ['Cloud migration & lift-shift', 'Cost optimization', 'Multi-cloud strategies', 'Serverless architectures'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    color: 'emerald',
    desc: 'Native and cross-platform mobile applications that delight users on iOS and Android.',
    features: ['React Native', 'Flutter', 'Native iOS & Android', 'App Store deployment'],
  },
  {
    icon: Brain,
    title: 'Machine Learning & Analytics',
    color: 'blue',
    desc: 'Harness the power of data with custom ML models, ETL pipelines, and interactive dashboards.',
    features: ['Predictive analytics', 'NLP & computer vision', 'BI dashboards', 'Data engineering'],
  },
  {
    icon: Container,
    title: 'Kubernetes Development',
    color: 'emerald',
    desc: 'Design and manage production-grade Kubernetes clusters for high-availability workloads.',
    features: ['Cluster design & setup', 'Helm chart development', 'Service mesh (Istio)', 'GitOps with ArgoCD'],
  },
  {
    icon: Server,
    title: 'On-Prem Hosting',
    color: 'blue',
    desc: 'Bootstrap your own private cloud with Proxmox VE and Kubernetes — full control, no vendor lock-in.',
    features: ['Proxmox VE setup', 'Bare-metal Kubernetes', 'Storage (Ceph / NFS)', 'Networking & firewall'],
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    color: 'emerald',
    desc: 'Protect your infrastructure and applications with security audits, penetration testing and compliance readiness.',
    features: ['Security audits', 'Vulnerability scanning', 'SSL/TLS management', 'GDPR & data compliance'],
  },
  {
    icon: Database,
    title: 'Database Engineering',
    color: 'blue',
    desc: 'Design, optimize and manage databases for performance, reliability and scalability.',
    features: ['PostgreSQL / MySQL', 'MongoDB / Redis', 'Database migrations', 'Replication & backups'],
  },
]

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full border border-white/20 mb-5">
            What We Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology Solutions for the Modern Business
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            From idea to production — NewTech Kenya delivers end-to-end engineering excellence across web, mobile, cloud and AI.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card p-6 group flex flex-col">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  s.color === 'blue'
                    ? 'bg-brand-blue-100 text-brand-blue-600'
                    : 'bg-brand-emerald-100 text-brand-emerald-600'
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                        s.color === 'blue' ? 'text-brand-blue-500' : 'text-brand-emerald-500'
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-blue-900 mb-3">
            Need a custom solution?
          </h2>
          <p className="text-slate-500 mb-8">
            Sign up today and submit a service request. Our team will reach out within 24 hours.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
            Request a Service <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
