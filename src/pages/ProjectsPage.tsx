import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

const categories = ['All', 'Healthcare', 'E-Commerce', 'Finance', 'Education', 'Manufacturing', 'Logistics'];

const projects = [
  {
    id: 1,
    title: 'MediScan AI',
    category: 'Healthcare',
    client: 'MediVision Health Network',
    duration: '8 months',
    team: '12 engineers',
    year: '2025',
    status: 'Live',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An AI-powered medical imaging platform that assists radiologists in detecting anomalies across X-rays, MRIs, and CT scans. The system processes thousands of images daily, flagging potential issues for review.',
    challenge: 'MediVision Health needed to process a growing volume of medical images while maintaining diagnostic accuracy. Radiologists were overwhelmed, leading to delayed diagnoses and increased error rates.',
    solution: 'We developed a deep learning pipeline using convolutional neural networks trained on millions of annotated medical images. The system provides real-time overlay annotations, confidence scores, and priority queuing for radiologists.',
    results: [
      { metric: '99.2%', description: 'Diagnostic accuracy across all imaging types' },
      { metric: '40%', description: 'Reduction in radiologist review time' },
      { metric: '2M+', description: 'Scans processed annually' },
      { metric: '35%', description: 'Reduction in misdiagnosis rates' },
    ],
    technologies: ['PyTorch', 'DICOM', 'React', 'AWS SageMaker', 'PostgreSQL', 'Docker', 'Kubernetes'],
    testimonial: {
      quote: "MediScan AI has fundamentally changed how our radiologists work. It's not replacing them — it's making them superhuman.",
      author: 'Dr. Sarah Chen',
      role: 'CTO, MediVision Health',
    },
    features: [
      'Multi-modality support (X-ray, MRI, CT, Ultrasound)',
      'Real-time anomaly detection with confidence scoring',
      'HIPAA-compliant cloud infrastructure',
      'Integration with existing PACS/RIS systems',
      'Automated reporting and clinical decision support',
      'Continuous learning from radiologist feedback',
    ],
  },
  {
    id: 2,
    title: 'ShopSmart Analytics',
    category: 'E-Commerce',
    client: 'GlobalRetail Inc.',
    duration: '6 months',
    team: '8 engineers',
    year: '2024',
    status: 'Live',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A comprehensive analytics and personalization platform for e-commerce businesses. ShopSmart uses deep learning to provide hyper-personalized product recommendations, demand forecasting, and customer behavior analysis.',
    challenge: 'GlobalRetail was losing market share due to generic shopping experiences. Cart abandonment exceeded 72%, and their existing recommendation system had low accuracy and engagement.',
    solution: 'We built a real-time recommendation engine using collaborative filtering and deep learning. The system processes user behavior streams, purchase history, and contextual signals to generate personalized experiences.',
    results: [
      { metric: '+45%', description: 'Increase in average order value' },
      { metric: '-18%', description: 'Reduction in cart abandonment' },
      { metric: '95%', description: 'Demand forecast accuracy' },
      { metric: '+32%', description: 'Customer engagement improvement' },
    ],
    technologies: ['TensorFlow', 'Apache Kafka', 'React', 'Node.js', 'Redis', 'Elasticsearch', 'GCP'],
    testimonial: {
      quote: "ShopSmart Analytics transformed our entire retail strategy. The ROI was visible within the first month of deployment.",
      author: 'Mark Thompson',
      role: 'VP Operations, GlobalRetail',
    },
    features: [
      'Real-time personalized recommendations',
      'Multi-touch attribution modeling',
      'A/B testing framework with automatic winner detection',
      'Customer lifetime value prediction',
      'Dynamic pricing optimization',
      'Cohort analysis and segmentation',
    ],
  },
  {
    id: 3,
    title: 'FinGuard Pro',
    category: 'Finance',
    client: 'SecureBank Corp.',
    duration: '10 months',
    team: '15 engineers',
    year: '2025',
    status: 'Live',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A real-time fraud detection and prevention platform that analyzes millions of financial transactions daily using ensemble machine learning models and graph neural networks.',
    challenge: 'SecureBank was losing $75M+ annually to fraud while existing rule-based systems generated excessive false positives (5%+), degrading customer experience and requiring manual review of thousands of legitimate transactions.',
    solution: 'We developed an ensemble ML system combining gradient boosting, graph neural networks, and anomaly detection models. The system evaluates 200+ features per transaction in real-time, with adaptive thresholds that learn from analyst feedback.',
    results: [
      { metric: '99.7%', description: 'Fraud detection accuracy' },
      { metric: '0.01%', description: 'False positive rate' },
      { metric: '10M+', description: 'Transactions processed daily' },
      { metric: '$50M+', description: 'Fraud prevented annually' },
    ],
    technologies: ['PyTorch', 'Apache Flink', 'Neo4j', 'Kafka', 'Python', 'Kubernetes', 'AWS'],
    testimonial: {
      quote: "FinGuard Pro saves us millions while dramatically improving our customer experience. The reduction in false positives alone justified the investment.",
      author: 'Lisa Nakamura',
      role: 'Director of Security, SecureBank',
    },
    features: [
      'Sub-50ms transaction scoring',
      'Graph-based relationship analysis',
      'Adaptive model retraining pipeline',
      'Regulatory compliance dashboard',
      'Analyst workflow and case management',
      'Real-time alerting and escalation',
    ],
  },
  {
    id: 4,
    title: 'EduPath AI',
    category: 'Education',
    client: 'National University System',
    duration: '12 months',
    team: '10 engineers',
    year: '2024',
    status: 'Live',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An adaptive learning platform that personalizes educational content delivery based on individual student performance, learning patterns, and cognitive strengths.',
    challenge: 'The university system was struggling with a 30% drop-out rate and declining student engagement. Traditional one-size-fits-all curricula were failing to address diverse learning needs across 50,000+ students.',
    solution: 'We built an adaptive learning engine using reinforcement learning and knowledge graphs. The system continuously adjusts content difficulty, format, and pacing based on real-time student performance data.',
    results: [
      { metric: '+25%', description: 'Course completion rate improvement' },
      { metric: '-20%', description: 'Drop-out rate reduction' },
      { metric: '50K+', description: 'Students served' },
      { metric: '90%', description: 'At-risk student identification accuracy' },
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'GraphQL', 'PostgreSQL', 'Redis', 'Azure'],
    testimonial: {
      quote: "EduPath AI has been transformative for our students. We're seeing engagement levels we've never achieved before.",
      author: 'Prof. Robert Davis',
      role: 'Dean of Academic Innovation',
    },
    features: [
      'Adaptive content delivery with 4 learning styles',
      'Real-time student progress dashboards',
      'Early warning system for at-risk students',
      'Automated quiz generation and grading',
      'Peer learning group optimization',
      'Integration with major LMS platforms',
    ],
  },
  {
    id: 5,
    title: 'PredictLine',
    category: 'Manufacturing',
    client: 'AutoMotive Global',
    duration: '9 months',
    team: '11 engineers',
    year: '2025',
    status: 'Live',
    image: 'https://images.pexels.com/photos/3846508/pexels-photo-3846508.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A predictive maintenance and quality control platform for manufacturing lines that combines IoT sensor data with machine learning to prevent equipment failures and detect defects in real-time.',
    challenge: 'AutoMotive Global was experiencing $12M+ in annual losses from unplanned downtime across 8 production lines, with quality defects adding another $5M in warranty costs.',
    solution: 'We deployed IoT sensors across critical equipment and built ML models using time-series analysis and anomaly detection. The system predicts failures 2-4 weeks in advance and uses computer vision for inline quality inspection.',
    results: [
      { metric: '70%', description: 'Reduction in unplanned downtime' },
      { metric: '99.5%', description: 'Defect detection accuracy' },
      { metric: '$12M+', description: 'Annual savings in downtime' },
      { metric: '$5M', description: 'Annual savings in warranty costs' },
    ],
    technologies: ['Python', 'TensorFlow', 'Apache Spark', 'InfluxDB', 'React', 'Docker', 'Azure IoT'],
    testimonial: {
      quote: "PredictLine has paid for itself multiple times over. We can now predict failures weeks before they happen.",
      author: 'Hans Mueller',
      role: 'VP Manufacturing Operations',
    },
    features: [
      'IoT sensor integration (vibration, temperature, pressure)',
      '2-4 week failure prediction window',
      'Inline computer vision quality inspection',
      'Digital twin visualization',
      'Automated maintenance scheduling',
      'Root cause analysis with explainable AI',
    ],
  },
  {
    id: 6,
    title: 'RouteGenius',
    category: 'Logistics',
    client: 'SwiftDelivery National',
    duration: '7 months',
    team: '9 engineers',
    year: '2024',
    status: 'Live',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An AI-powered route optimization and fleet management platform that processes thousands of variables in real-time to find optimal delivery routes, predict ETAs, and manage fleet operations.',
    challenge: 'SwiftDelivery was spending $32M+ annually on fuel with inefficient routing. Customer complaints about missed and late deliveries were increasing, and manual dispatch decisions were creating bottlenecks.',
    solution: 'We built a multi-objective optimization engine that considers traffic patterns, weather, vehicle capacity, driver schedules, and delivery windows simultaneously. The system recalculates routes in real-time as conditions change.',
    results: [
      { metric: '25%', description: 'Reduction in fuel costs' },
      { metric: '20%', description: 'Faster delivery times' },
      { metric: '$8M', description: 'Annual fuel cost savings' },
      { metric: '95%', description: 'ETA prediction accuracy' },
    ],
    technologies: ['Python', 'OR-Tools', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Google Maps API'],
    testimonial: {
      quote: "RouteGenius has transformed our logistics operations. The fuel savings alone make it the best technology investment we've ever made.",
      author: 'Jennifer Park',
      role: 'COO, SwiftDelivery',
    },
    features: [
      'Multi-variable route optimization engine',
      'Real-time route recalculation',
      'Driver performance analytics',
      'Customer-facing ETA predictions',
      'Fleet maintenance scheduling',
      'Carbon emission tracking and optimization',
    ],
  },
];

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const statsAnim = useScrollAnimation();
  const filterAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-sm px-4 py-1 animate-hero-badge">Our Portfolio</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-hero-title">
              Projects That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Deliver Results
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-hero-subtitle">
              Explore our portfolio of AI solutions that have transformed businesses
              and delivered measurable impact across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div ref={statsAnim.ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 scroll-hidden ${statsAnim.isVisible ? 'scroll-visible' : ''}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '6+', label: 'Industry Verticals' },
              { value: '$100M+', label: 'Client Value Generated' },
            ].map((stat, i) => (
              <div key={i} style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div ref={filterAnim.ref} className={`flex items-center gap-2 mb-12 overflow-x-auto pb-2 scroll-hidden ${filterAnim.isVisible ? 'scroll-visible' : ''}`}>
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedProject(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} expanded={expandedProject === project.id} onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl cta-bg-orb" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl cta-bg-orb" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={ctaAnim.ref} className={`max-w-4xl mx-auto text-center space-y-8 scroll-hidden ${ctaAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Let's discuss your project and how we can help you achieve breakthrough results with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                onClick={() => onNavigate('contact')}
              >
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-blue-400 text-blue-100 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105"
                onClick={() => onNavigate('services')}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project, expanded, onToggle }: { project: typeof projects[0]; expanded: boolean; onToggle: () => void }) {
  const cardAnim = useScrollAnimation();

  return (
    <Card
      ref={cardAnim.ref}
      className={`overflow-hidden transition-all duration-500 card-shine scroll-hidden-scale ${cardAnim.isVisible ? 'scroll-visible' : ''} ${
        expanded ? 'shadow-2xl ring-2 ring-blue-200' : 'hover:shadow-xl'
      }`}
    >
      {/* Project Summary */}
      <div
        className="cursor-pointer"
        onClick={onToggle}
      >
        <div className="grid md:grid-cols-3 gap-0">
          <div className="relative overflow-hidden group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full min-h-[240px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm">
                {project.category}
              </Badge>
              <Badge className="bg-green-500 text-white">
                {project.status}
              </Badge>
            </div>
          </div>

          <div className="md:col-span-2 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {project.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {project.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {project.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-4 w-4" /> {project.team}
                  </span>
                </div>
              </div>

              {/* Key Results Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.results.map((result, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-blue-50 transition-transform duration-300 hover:scale-105">
                    <p className="text-xl font-bold text-blue-600">{result.metric}</p>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t animate-in slide-in-from-top-2 duration-300">
          <div className="p-8 space-y-10">
            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                  </span>
                  The Challenge
                </h4>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </span>
                  Our Solution
                </h4>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Key Features</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ animationDelay: `${i * 80}ms` }}>
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 transition-all duration-300 hover:scale-110 hover:bg-blue-100 hover:text-blue-700">{tech}</Badge>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border testimonial-card">
              <div className="flex items-start gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-4 leading-relaxed">
                "{project.testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-sm">{project.testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
