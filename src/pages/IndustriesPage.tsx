import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Heart,
  ShoppingCart,
  Truck,
  Zap,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: string) => void;
}

const industries = [
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Life Sciences',
    color: 'red',
    heroDescription: 'Revolutionizing patient care and medical research through AI-powered diagnostics, drug discovery, and personalized medicine solutions.',
    challenges: [
      'Increasing volume of medical imaging data',
      'Need for faster and more accurate diagnoses',
      'Drug discovery timelines exceeding 10+ years',
      'Rising healthcare costs and inefficiencies',
    ],
    solutions: [
      {
        title: 'AI-Powered Medical Imaging',
        description: 'Computer vision models that detect anomalies in X-rays, MRIs, and CT scans with 99%+ accuracy, reducing radiologist workload by 40%.',
      },
      {
        title: 'Clinical Decision Support',
        description: 'ML systems that analyze patient data to recommend treatments, predict outcomes, and identify high-risk patients proactively.',
      },
      {
        title: 'Drug Discovery Acceleration',
        description: 'AI-driven molecular modeling and compound screening that reduces drug discovery timelines by 60%.',
      },
      {
        title: 'Patient Flow Optimization',
        description: 'Predictive models for hospital admission forecasting, bed management, and staff scheduling optimization.',
      },
    ],
    stats: [
      { value: '99.2%', label: 'Diagnostic Accuracy' },
      { value: '40%', label: 'Faster Diagnoses' },
      { value: '60%', label: 'Reduced Discovery Time' },
    ],
    caseStudy: 'Helped a major hospital network reduce misdiagnosis rates by 35% using our AI imaging platform, processing over 2M scans annually.',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce & Retail',
    color: 'orange',
    heroDescription: 'Transforming online and offline retail experiences with personalized recommendations, demand forecasting, and intelligent supply chain management.',
    challenges: [
      'Increasing customer expectations for personalization',
      'Inventory management and demand uncertainty',
      'Cart abandonment exceeding 70%',
      'Intense competition and shrinking margins',
    ],
    solutions: [
      {
        title: 'Personalized Recommendations',
        description: 'Deep learning recommendation engines that increase average order value by 25-45% through hyper-personalized product suggestions.',
      },
      {
        title: 'Demand Forecasting',
        description: 'Time-series ML models that predict demand with 95% accuracy, reducing stockouts by 50% and overstock by 30%.',
      },
      {
        title: 'Dynamic Pricing',
        description: 'Real-time pricing optimization engines that maximize revenue while maintaining competitive positioning.',
      },
      {
        title: 'Customer Analytics',
        description: 'Cohort analysis, churn prediction, and lifetime value modeling for data-driven marketing strategies.',
      },
    ],
    stats: [
      { value: '+45%', label: 'Revenue Increase' },
      { value: '95%', label: 'Forecast Accuracy' },
      { value: '50%', label: 'Fewer Stockouts' },
    ],
    caseStudy: 'Built a recommendation engine for a mid-size retailer that increased average order value by 32% and reduced cart abandonment by 18%.',
  },
  {
    id: 'finance',
    icon: Building2,
    title: 'Financial Services',
    color: 'green',
    heroDescription: 'Securing financial institutions and enhancing operations with real-time fraud detection, risk assessment, and automated compliance solutions.',
    challenges: [
      'Sophisticated fraud attacks growing 25% annually',
      'Complex regulatory compliance requirements',
      'Manual processes in underwriting and risk assessment',
      'Need for real-time transaction monitoring',
    ],
    solutions: [
      {
        title: 'Fraud Detection',
        description: 'Real-time ML models processing 10M+ transactions daily, detecting fraudulent activity with 99.7% accuracy and 0.01% false positive rate.',
      },
      {
        title: 'Credit Risk Assessment',
        description: 'AI-powered credit scoring models that evaluate 500+ data points for more accurate risk assessment and faster approvals.',
      },
      {
        title: 'Regulatory Compliance',
        description: 'Automated compliance monitoring with NLP-powered document analysis and real-time regulatory change tracking.',
      },
      {
        title: 'Algorithmic Trading',
        description: 'Quantitative trading models with real-time market analysis, sentiment tracking, and automated execution.',
      },
    ],
    stats: [
      { value: '99.7%', label: 'Fraud Detection Rate' },
      { value: '10M+', label: 'Daily Transactions' },
      { value: '$50M+', label: 'Savings Generated' },
    ],
    caseStudy: 'Deployed a fraud detection system for a top-20 bank that prevents $50M+ in fraudulent transactions annually while reducing false positives by 80%.',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & EdTech',
    color: 'blue',
    heroDescription: 'Reimagining learning experiences with adaptive platforms, automated assessment, and data-driven student success tools.',
    challenges: [
      'One-size-fits-all curriculum failing diverse learners',
      'Overburdened teachers with grading workloads',
      'Difficulty identifying at-risk students early',
      'Limited personalization at scale',
    ],
    solutions: [
      {
        title: 'Adaptive Learning Platforms',
        description: 'AI-driven content delivery that adjusts difficulty, pacing, and style based on individual student performance and learning patterns.',
      },
      {
        title: 'Automated Grading & Feedback',
        description: 'NLP-powered essay grading and personalized feedback generation, reducing teacher grading time by 70%.',
      },
      {
        title: 'Student Success Prediction',
        description: 'Early warning systems that identify at-risk students using behavioral and academic data with 90% accuracy.',
      },
      {
        title: 'Intelligent Tutoring',
        description: 'AI tutoring assistants that provide personalized explanations, practice problems, and learning path recommendations.',
      },
    ],
    stats: [
      { value: '+30%', label: 'Learning Improvement' },
      { value: '70%', label: 'Less Grading Time' },
      { value: '90%', label: 'At-Risk Detection' },
    ],
    caseStudy: 'Developed an adaptive learning platform for a university system serving 50,000 students, improving course completion rates by 25%.',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    color: 'amber',
    heroDescription: 'Optimizing production lines and supply chains with predictive maintenance, quality control automation, and intelligent resource planning.',
    challenges: [
      'Unplanned downtime costing millions annually',
      'Quality defects increasing warranty costs',
      'Complex supply chain dependencies',
      'Labor shortages in skilled positions',
    ],
    solutions: [
      {
        title: 'Predictive Maintenance',
        description: 'IoT + ML models that predict equipment failures 2-4 weeks in advance, reducing unplanned downtime by 70%.',
      },
      {
        title: 'Automated Quality Control',
        description: 'Computer vision inspection systems that detect defects with 99.5% accuracy at production line speed.',
      },
      {
        title: 'Supply Chain Optimization',
        description: 'AI-driven demand forecasting and inventory optimization reducing carrying costs by 25% and improving fill rates.',
      },
      {
        title: 'Process Optimization',
        description: 'Reinforcement learning models that optimize production parameters for maximum efficiency and minimum waste.',
      },
    ],
    stats: [
      { value: '70%', label: 'Less Downtime' },
      { value: '99.5%', label: 'Detection Accuracy' },
      { value: '25%', label: 'Cost Reduction' },
    ],
    caseStudy: 'Implemented predictive maintenance for an automotive manufacturer, preventing $12M in annual downtime costs across 8 production lines.',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics & Supply Chain',
    color: 'teal',
    heroDescription: 'Streamlining operations with route optimization, fleet management, delivery prediction, and warehouse automation solutions.',
    challenges: [
      'Rising fuel costs and driver shortages',
      'Last-mile delivery efficiency',
      'Warehouse throughput limitations',
      'Real-time visibility across supply chain',
    ],
    solutions: [
      {
        title: 'Route Optimization',
        description: 'AI algorithms processing thousands of variables to find optimal routes, reducing fuel costs by 15-25% and delivery times by 20%.',
      },
      {
        title: 'Fleet Management',
        description: 'Predictive analytics for vehicle maintenance, driver performance scoring, and fleet utilization optimization.',
      },
      {
        title: 'Warehouse Automation',
        description: 'AI-powered pick path optimization, inventory placement, and robotic coordination for 40% throughput improvement.',
      },
      {
        title: 'Delivery Prediction',
        description: 'Customer-facing ETA predictions with 95% accuracy, improving satisfaction and reducing support call volume.',
      },
    ],
    stats: [
      { value: '25%', label: 'Fuel Savings' },
      { value: '40%', label: 'More Throughput' },
      { value: '95%', label: 'ETA Accuracy' },
    ],
    caseStudy: 'Built a route optimization platform for a national delivery service, saving $8M annually in fuel costs across 5,000+ vehicles.',
  },
];

export default function IndustriesPage({ onNavigate }: IndustriesPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="text-sm px-4 py-1">Industries We Serve</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transforming Industries with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Solutions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We bring deep domain expertise and advanced AI capabilities to solve the most
              critical challenges across multiple industries.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Quick Nav */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <a
                key={industry.id}
                href={`#industry-${industry.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-medium"
              >
                <industry.icon className="h-4 w-4 text-blue-600" />
                {industry.title.split(' & ')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      {industries.map((industry, index) => (
        <section
          key={industry.id}
          id={`industry-${industry.id}`}
          className={`py-24 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Industry Header */}
            <div className="max-w-3xl mb-16">
              <Badge variant="outline" className="text-sm px-4 py-1 mb-4">
                <industry.icon className="h-3 w-3 mr-1" />
                {industry.title}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{industry.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {industry.heroDescription}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-16">
              {industry.stats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border">
                  <p className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Challenges & Solutions */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Challenges */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Industry Challenges
                </h3>
                <div className="space-y-4">
                  {industry.challenges.map((challenge, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100">
                      <span className="text-amber-600 font-bold text-sm mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-amber-900">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Our Solutions
                </h3>
                <div className="space-y-4">
                  {industry.solutions.map((solution, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{solution.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <Badge className="bg-white/20 text-white border-white/30">Case Study</Badge>
                  <p className="text-lg leading-relaxed">{industry.caseStudy}</p>
                </div>
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-50 flex-shrink-0"
                  onClick={() => onNavigate('projects')}
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Don't See Your Industry?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We work across many more sectors. Our AI expertise is adaptable to any domain.
              Let's discuss your specific industry challenges.
            </p>
            <Button
              size="lg"
              className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() => onNavigate('contact')}
            >
              Discuss Your Industry <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
