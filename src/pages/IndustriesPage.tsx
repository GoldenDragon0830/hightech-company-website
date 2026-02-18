import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Factory,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

interface IndustriesPageProps {
  onNavigate: (page: string) => void;
}

const industries = [
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    description: 'AI-driven diagnostics, drug discovery, and patient care optimization that save lives and reduce costs.',
    challenges: ['Diagnostic accuracy at scale', 'Patient data privacy & compliance', 'Operational cost management', 'Drug development timelines'],
    solutions: ['AI-powered medical imaging analysis', 'HIPAA-compliant data platforms', 'Predictive patient flow optimization', 'Accelerated discovery pipelines with ML'],
    stats: [{ value: '99.2%', label: 'Diagnostic accuracy' }, { value: '40%', label: 'Faster diagnoses' }, { value: '2M+', label: 'Scans processed' }],
    caseStudy: { title: 'MediScan AI', result: 'Reduced diagnostic errors by 35% and cut radiologist workload by 40%' },
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce & Retail',
    color: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    description: 'Personalization engines and analytics platforms that drive conversions and customer loyalty.',
    challenges: ['High cart abandonment rates', 'Generic shopping experiences', 'Demand forecasting accuracy', 'Customer retention'],
    solutions: ['Real-time recommendation engines', 'Behavioral analytics platforms', 'ML-powered demand forecasting', 'CLV prediction & segmentation'],
    stats: [{ value: '+45%', label: 'AOV increase' }, { value: '-18%', label: 'Cart abandonment' }, { value: '95%', label: 'Forecast accuracy' }],
    caseStudy: { title: 'ShopSmart Analytics', result: 'Increased average order value by 45% and reduced cart abandonment by 18%' },
  },
  {
    id: 'finance',
    icon: ShieldCheck,
    title: 'Finance & Banking',
    color: 'from-emerald-500 to-green-600',
    lightBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    description: 'Fraud detection, risk assessment, and compliance automation for financial institutions.',
    challenges: ['Sophisticated fraud schemes', 'Regulatory compliance burden', 'False-positive avalanche', 'Real-time processing at scale'],
    solutions: ['Multi-layer fraud detection AI', 'Automated compliance monitoring', 'Graph-based anomaly detection', 'Sub-50ms transaction scoring'],
    stats: [{ value: '99.7%', label: 'Fraud detection' }, { value: '$50M+', label: 'Fraud prevented' }, { value: '0.01%', label: 'False positive rate' }],
    caseStudy: { title: 'FinGuard Pro', result: 'Detected 99.7% of fraudulent activity while cutting false positives to 0.01%' },
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & EdTech',
    color: 'from-blue-500 to-cyan-600',
    lightBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    description: 'Adaptive learning platforms and analytics that improve outcomes and engagement.',
    challenges: ['High student drop-out rates', 'One-size-fits-all content', 'Late identification of at-risk students', 'Engagement tracking'],
    solutions: ['Reinforcement-learning adaptive paths', 'Knowledge graph content delivery', 'Early warning ML models', 'Real-time engagement analytics'],
    stats: [{ value: '+25%', label: 'Completion rate' }, { value: '-20%', label: 'Drop-out reduction' }, { value: '50K+', label: 'Students served' }],
    caseStudy: { title: 'EduPath AI', result: 'Improved course completion by 25% and reduced drop-outs by 20%' },
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing & Industry 4.0',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    description: 'Predictive maintenance, quality control, and production optimization for smart factories.',
    challenges: ['Unplanned machine downtime', 'Quality defect detection', 'Equipment lifecycle management', 'Supply chain forecasting'],
    solutions: ['IoT-enabled predictive maintenance', 'Computer vision QC inspection', 'Digital twin modeling', 'ML supply chain optimization'],
    stats: [{ value: '70%', label: 'Less downtime' }, { value: '99.5%', label: 'Defect detection' }, { value: '$12M+', label: 'Savings' }],
    caseStudy: { title: 'PredictLine', result: 'Eliminated 70% of unplanned downtime and achieved 99.5% defect detection' },
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics & Supply Chain',
    color: 'from-sky-500 to-blue-600',
    lightBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    description: 'Route optimization, fleet management, and supply chain intelligence.',
    challenges: ['Rising fuel costs', 'Delivery window compliance', 'Fleet utilization inefficiency', 'Last-mile complexity'],
    solutions: ['Multi-objective route optimization', 'Real-time fleet tracking & analytics', 'Dynamic delivery scheduling', 'ML demand-aware logistics'],
    stats: [{ value: '25%', label: 'Fuel savings' }, { value: '20%', label: 'Faster delivery' }, { value: '$8M', label: 'Annual savings' }],
    caseStudy: { title: 'RouteGenius', result: 'Saved 25% on fuel and achieved 95% ETA accuracy using AI route optimization' },
  },
];

export default function IndustriesPage({ onNavigate }: IndustriesPageProps) {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const ctaAnim = useScrollAnimation();

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="text-sm px-4 py-1">Industries We Serve</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              AI Solutions Across{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Every Industry</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We bring deep domain expertise and cutting-edge AI to solve the toughest challenges across six key industry verticals.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} expanded={expandedIndustry === industry.id} onToggle={() => setExpandedIndustry(expandedIndustry === industry.id ? null : industry.id)} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Cross-Industry Differentiators */}
      <CrossIndustrySection />

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ctaAnim.ref} className={`max-w-4xl mx-auto text-center space-y-8 scroll-hidden ${ctaAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold">Don't See Your Industry?</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">Our AI expertise transcends verticals. Let's discuss your unique challenges and build a custom solution tailored to your domain.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-white text-blue-900 hover:bg-blue-50" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" /> Schedule a Call
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-blue-400 text-blue-100 hover:bg-blue-500/20" onClick={() => onNavigate('projects')}>
                View Our Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function IndustryCard({ industry, expanded, onToggle, onNavigate }: { industry: typeof industries[0]; expanded: boolean; onToggle: () => void; onNavigate: (page: string) => void }) {
  const cardAnim = useScrollAnimation();
  const Icon = industry.icon;

  return (
    <Card ref={cardAnim.ref} className={`overflow-hidden transition-all duration-300 scroll-hidden ${cardAnim.isVisible ? 'scroll-visible' : ''} ${expanded ? 'shadow-2xl ring-2 ring-blue-200' : 'hover:shadow-xl'}`}>
      <div className="cursor-pointer p-8" onClick={onToggle}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className={`w-14 h-14 rounded-xl ${industry.lightBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-7 w-7 ${industry.iconColor}`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">{industry.title}</h3>
              <p className="text-muted-foreground max-w-xl leading-relaxed">{industry.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-6">
              {industry.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-blue-600">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0">
              {expanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="border-t animate-in slide-in-from-top-2 duration-300">
          <div className="p-8 space-y-8">
            <div className="lg:hidden grid grid-cols-3 gap-4">
              {industry.stats.map((s, i) => (
                <div key={i} className="text-center p-3 rounded-lg bg-blue-50">
                  <p className="text-xl font-bold text-blue-600">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><BarChart3 className="h-4 w-4 text-amber-600" /></span> Industry Challenges</h4>
                <ul className="space-y-3">
                  {industry.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground"><span className="h-2 w-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-green-600" /></span> Our Solutions</h4>
                <ul className="space-y-3">
                  {industry.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border">
              <h4 className="font-semibold mb-2">Featured: {industry.caseStudy.title}</h4>
              <p className="text-muted-foreground">{industry.caseStudy.result}</p>
              <Button variant="link" className="mt-2 p-0 text-blue-600" onClick={() => onNavigate('projects')}>
                View Full Case Study <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function CrossIndustrySection() {
  const sectionAnim = useScrollAnimation();
  const stagger = useStaggerAnimation(4);

  const differentiators = [
    { icon: Brain, title: 'Domain Expertise', description: 'Our teams include subject-matter experts from each industry who understand the nuances of your business.' },
    { icon: ShieldCheck, title: 'Compliance First', description: 'We build with security, privacy, and regulatory compliance baked in from day one — HIPAA, SOC 2, PCI-DSS.' },
    { icon: BarChart3, title: 'Measurable Outcomes', description: 'Every project is scoped around clear KPIs with transparent tracking from kickoff to deployment.' },
    { icon: Factory, title: 'Production-Ready AI', description: 'Our solutions go beyond proof-of-concept — we deliver scalable, production-grade systems.' },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionAnim.ref} className={`text-center mb-12 scroll-hidden ${sectionAnim.isVisible ? 'scroll-visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Teams Choose Us Across Industries</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Regardless of your vertical, our approach delivers results.</p>
        </div>
        <div ref={stagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <Card key={i} className={`p-6 text-center hover-lift stagger-item ${stagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4"><Icon className="h-6 w-6 text-blue-600" /></div>
                <h3 className="font-semibold mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
