import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  Settings,
  Smartphone,
  Users,
} from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'AI Web Development',
    subtitle: 'Intelligent Web Platforms That Scale',
    heroImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'We build AI-powered web applications that transform how businesses operate. From intelligent dashboards to automated workflows, our web platforms leverage machine learning, natural language processing, and predictive analytics to deliver exceptional user experiences.',
    features: [
      {
        title: 'Custom AI Platforms',
        description: 'Full-stack web applications with integrated ML models for real-time predictions, recommendations, and automation.',
      },
      {
        title: 'Real-time Data Processing',
        description: 'Stream processing pipelines that handle millions of events per second with sub-millisecond latency.',
      },
      {
        title: 'Intelligent Dashboards',
        description: 'Interactive visualization platforms with AI-driven insights, anomaly detection, and automated reporting.',
      },
      {
        title: 'NLP & Chatbots',
        description: 'Conversational AI interfaces with natural language understanding, sentiment analysis, and multi-language support.',
      },
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'AWS'],
    process: [
      { step: '01', title: 'Discovery', description: 'Deep dive into your business needs, data landscape, and technical requirements.' },
      { step: '02', title: 'Architecture', description: 'Design scalable system architecture with AI integration points and data pipelines.' },
      { step: '03', title: 'Development', description: 'Agile development with 2-week sprints, continuous integration, and testing.' },
      { step: '04', title: 'Deployment', description: 'Production deployment with monitoring, A/B testing, and performance optimization.' },
    ],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'AI Mobile Development',
    subtitle: 'Smart Mobile Experiences',
    heroImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Create intelligent mobile applications that leverage on-device AI, computer vision, and personalized experiences. Our mobile solutions work seamlessly across iOS and Android, delivering AI capabilities even without internet connectivity.',
    features: [
      {
        title: 'Cross-Platform AI Apps',
        description: 'React Native and Flutter apps with integrated AI models for iOS and Android with shared codebase.',
      },
      {
        title: 'Computer Vision',
        description: 'Object detection, image classification, OCR, and AR features powered by on-device ML models.',
      },
      {
        title: 'Voice & Speech AI',
        description: 'Voice commands, speech-to-text, text-to-speech, and voice biometrics integration.',
      },
      {
        title: 'Offline AI',
        description: 'On-device ML inference for real-time predictions without requiring internet connectivity.',
      },
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Core ML', 'TensorFlow Lite', 'Firebase', 'AWS Amplify'],
    process: [
      { step: '01', title: 'Research', description: 'User research, competitive analysis, and AI feasibility assessment.' },
      { step: '02', title: 'Prototype', description: 'Interactive prototypes with AI feature demonstrations and user testing.' },
      { step: '03', title: 'Build', description: 'Native performance development with on-device model optimization.' },
      { step: '04', title: 'Launch', description: 'App store submission, monitoring setup, and iterative improvement.' },
    ],
  },
  {
    id: 'consulting',
    icon: Brain,
    title: 'AI Consulting',
    subtitle: 'Strategic AI Transformation',
    heroImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Our AI consulting services help organizations navigate the complex landscape of artificial intelligence. We assess your readiness, identify high-impact opportunities, and create a roadmap for successful AI adoption that aligns with your business strategy.',
    features: [
      {
        title: 'AI Readiness Assessment',
        description: 'Comprehensive evaluation of your data infrastructure, team capabilities, and organizational readiness for AI.',
      },
      {
        title: 'Strategy & Roadmap',
        description: 'Custom AI strategy aligned with business goals, including technology selection and implementation timeline.',
      },
      {
        title: 'Data Strategy',
        description: 'Data governance frameworks, pipeline design, and quality assurance processes for AI-ready data.',
      },
      {
        title: 'Team Training',
        description: 'Workshops and training programs to upskill your team in AI/ML concepts and tools.',
      },
    ],
    technologies: ['Jupyter', 'Python', 'R', 'Tableau', 'Power BI', 'Snowflake', 'Databricks', 'MLflow'],
    process: [
      { step: '01', title: 'Assess', description: 'Evaluate current state, data maturity, and identify AI opportunities.' },
      { step: '02', title: 'Strategize', description: 'Develop a prioritized roadmap with clear milestones and success metrics.' },
      { step: '03', title: 'Pilot', description: 'Execute proof-of-concept projects to validate approach and demonstrate value.' },
      { step: '04', title: 'Scale', description: 'Expand successful pilots into production systems with ongoing support.' },
    ],
  },
  {
    id: 'custom',
    icon: Code2,
    title: 'Custom AI Solutions',
    subtitle: 'Bespoke AI Systems',
    heroImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'When off-the-shelf solutions don\'t fit, we build custom AI systems from the ground up. Our team designs and implements proprietary algorithms, custom ML models, and specialized AI infrastructure tailored to your unique business challenges.',
    features: [
      {
        title: 'Custom ML Models',
        description: 'Purpose-built machine learning models trained on your data for maximum accuracy and relevance.',
      },
      {
        title: 'AI Infrastructure',
        description: 'Scalable ML pipelines, model serving infrastructure, and automated retraining systems.',
      },
      {
        title: 'Integration & APIs',
        description: 'Seamless integration of AI capabilities into existing systems via well-designed APIs and SDKs.',
      },
      {
        title: 'MLOps & Monitoring',
        description: 'Continuous model monitoring, automated retraining, and performance tracking dashboards.',
      },
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Kubernetes', 'Docker', 'Airflow', 'Kafka', 'Spark', 'Ray'],
    process: [
      { step: '01', title: 'Define', description: 'Define problem space, success criteria, and data requirements.' },
      { step: '02', title: 'Experiment', description: 'Rapid experimentation with multiple approaches and model architectures.' },
      { step: '03', title: 'Engineer', description: 'Production-grade engineering with comprehensive testing and documentation.' },
      { step: '04', title: 'Operate', description: 'Ongoing monitoring, maintenance, and model improvement.' },
    ],
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const quickNavStagger = useStaggerAnimation(4);
  const engagementAnim = useScrollAnimation();
  const engagementStagger = useStaggerAnimation(3);
  const ctaAnim = useScrollAnimation();

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
            <Badge variant="outline" className="text-sm px-4 py-1 animate-hero-badge">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-hero-title">
              AI-Powered Solutions for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Every Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-hero-subtitle">
              From intelligent web applications to smart mobile experiences, we build
              AI solutions that scale with your business and deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Services Quick Nav */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={quickNavStagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <a
                key={service.id}
                href={`#service-${service.id}`}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 hover:border-blue-300 hover:bg-blue-50/50 transition-all group card-shine stagger-item ${quickNavStagger.visibleItems[i] ? 'stagger-visible' : ''}`}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, serviceIndex) => (
        <ServiceSection key={service.id} service={service} serviceIndex={serviceIndex} onNavigate={onNavigate} />
      ))}

      {/* Engagement Models */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={engagementAnim.ref} className={`max-w-3xl mx-auto text-center space-y-4 mb-16 scroll-hidden ${engagementAnim.isVisible ? 'scroll-visible' : ''}`}>
            <Badge variant="outline" className="text-sm px-4 py-1">Engagement Models</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Flexible Engagement Options</h2>
            <p className="text-lg text-muted-foreground">
              Choose the model that best fits your needs and budget
            </p>
          </div>

          <div ref={engagementStagger.containerRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Project-Based',
                description: 'Fixed scope, timeline, and budget. Ideal for well-defined projects with clear deliverables.',
                features: ['Fixed price', 'Defined timeline', 'Clear milestones', 'Full documentation'],
                icon: Layers,
                popular: false,
              },
              {
                title: 'Dedicated Team',
                description: 'A full team embedded in your organization. Perfect for ongoing development and complex programs.',
                features: ['Scalable team', 'Monthly billing', 'Daily standups', 'Full integration'],
                icon: Users,
                popular: true,
              },
              {
                title: 'AI Retainer',
                description: 'Ongoing AI support and optimization. Great for companies that need continuous AI improvement.',
                features: ['Priority support', 'Model monitoring', 'Regular updates', 'Performance reports'],
                icon: Settings,
                popular: false,
              },
            ].map((model, index) => (
              <Card
                key={index}
                className={`relative engagement-card hover-lift stagger-item ${engagementStagger.visibleItems[index] ? 'stagger-visible' : ''} ${
                  model.popular ? 'border-2 border-blue-600 scale-105' : ''
                }`}
              >
                {model.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 animate-bubble">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <model.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{model.title}</CardTitle>
                  <CardDescription className="text-base">{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      model.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : ''
                    }`}
                    variant={model.popular ? 'default' : 'outline'}
                    onClick={() => onNavigate('contact')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
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
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Tell us about your project, and we'll help you choose the right service and
              engagement model to achieve your goals.
            </p>
            <Button
              size="lg"
              className="text-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => onNavigate('contact')}
            >
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Sub-component for each service section with its own scroll animations */
function ServiceSection({ service, serviceIndex, onNavigate }: { service: typeof services[0]; serviceIndex: number; onNavigate: (page: string) => void }) {
  const headerAnim = useScrollAnimation();
  const featuresStagger = useStaggerAnimation(4);
  const processAnim = useScrollAnimation();
  const processStagger = useStaggerAnimation(4);
  const techAnim = useScrollAnimation();

  return (
    <section
      id={`service-${service.id}`}
      className={`py-24 ${serviceIndex % 2 === 0 ? 'bg-muted/30' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Header */}
        <div ref={headerAnim.ref} className={`grid lg:grid-cols-2 gap-16 items-center mb-16 ${serviceIndex % 2 === 0 ? 'scroll-hidden' : 'scroll-hidden-right'} ${headerAnim.isVisible ? 'scroll-visible' : ''}`}>
          <div className={`space-y-6 ${serviceIndex % 2 !== 0 ? 'lg:order-2' : ''}`}>
            <Badge variant="outline" className="text-sm px-4 py-1">
              <service.icon className="h-3 w-3 mr-1" />
              {service.title}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">{service.subtitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => onNavigate('contact')}
            >
              Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className={serviceIndex % 2 !== 0 ? 'lg:order-1' : ''}>
            <img
              src={service.heroImage}
              alt={service.title}
              className="rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Features */}
        <div ref={featuresStagger.containerRef} className="grid sm:grid-cols-2 gap-6 mb-16">
          {service.features.map((feature, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover-lift card-shine stagger-item ${featuresStagger.visibleItems[index] ? 'stagger-visible' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Process */}
        <div className="mb-16">
          <div ref={processAnim.ref} className={`scroll-hidden ${processAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h3 className="text-2xl font-bold text-center mb-10">Our Process</h3>
          </div>
          <div ref={processStagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className={`relative stagger-item ${processStagger.visibleItems[index] ? 'stagger-visible' : ''}`}>
                <div className="text-5xl font-bold text-blue-100 mb-3 process-step-number inline-block rounded-lg px-2">{step.step}</div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {index < service.process.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-3 h-5 w-5 text-blue-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div ref={techAnim.ref} className={`scroll-hidden ${techAnim.isVisible ? 'scroll-visible' : ''}`}>
          <h3 className="text-lg font-semibold mb-4 text-center">Technologies We Use</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech, i) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm transition-all duration-300 hover:scale-110 hover:bg-blue-100 hover:text-blue-700 cursor-default" style={{ animationDelay: `${i * 80}ms` }}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
