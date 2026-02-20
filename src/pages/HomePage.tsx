import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  Globe,
  Smartphone,
  Zap,
  Users,
  Target,
  Award,
  CheckCircle2,
  Star,
  Briefcase,
  ChevronRight,
  Code2,
  Cpu,
  BarChart3,
  Shield,
  Sparkles,
  Calendar,
} from 'lucide-react';
import TechSphere from '@/components/TechSphere';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';
import { useEffect, useRef, useState } from 'react';

// Animated counter hook
function useAnimatedCounter(target: string, isVisible: boolean, duration = 1500) {
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericPart = parseInt(target.replace(/[^0-9]/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return display;
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 5,
    driftX: (Math.random() - 0.5) * 150,
    driftY: -(Math.random() * 200 + 100),
    color: ['rgba(99,102,241,0.3)', 'rgba(6,182,212,0.25)', 'rgba(59,130,246,0.3)', 'rgba(139,92,246,0.25)'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
            '--particle-duration': `${p.duration}s`,
            '--particle-delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Multi-image gallery component with auto-rotation
const galleryImages = [
  { src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Team collaboration' },
  { src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Innovation workshop' },
  { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Team meeting' },
  { src: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Engineering at work' },
];

function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % galleryImages.length);
    }, 4000);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    resetAutoPlay();
  };

  const goPrev = () => goTo((activeIndex - 1 + galleryImages.length) % galleryImages.length);
  const goNext = () => goTo((activeIndex + 1) % galleryImages.length);

  return (
    <>
      {/* Sliding track */}
      <div
        className="image-gallery-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {galleryImages.map((img, i) => (
          <div key={i} className="image-gallery-slide" style={{ minHeight: '400px' }}>
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-2xl shadow-xl"
              style={{ minHeight: '400px' }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />

      {/* Arrow buttons */}
      <button className="gallery-arrow left" onClick={goPrev} aria-label="Previous image">
        &#8249;
      </button>
      <button className="gallery-arrow right" onClick={goNext} aria-label="Next image">
        &#8250;
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`gallery-dot ${i === activeIndex ? 'active' : ''}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

// Stat counter component
function AnimatedStat({ value, label, icon: Icon, index, isVisible }: {
  value: string; label: string; icon: React.ElementType; index: number; isVisible: boolean;
}) {
  const display = useAnimatedCounter(value, isVisible);
  return (
    <div
      className="text-center space-y-2 animate-counter"
      style={{ animationDelay: `${index * 150}ms`, animationPlayState: isVisible ? 'running' : 'paused' }}
    >
      <Icon className="h-8 w-8 mx-auto mb-2 opacity-80 stat-icon-bounce" style={{ animationDelay: `${index * 200}ms` }} />
      <p className="text-4xl md:text-5xl font-bold tabular-nums">{display}</p>
      <p className="text-blue-100 text-sm md:text-base">{label}</p>
    </div>
  );
}

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

const teamAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
];

const teamMembers = [
  { name: 'Alex Rivera', role: 'CEO & Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Dr. Maya Patel', role: 'Chief AI Officer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { name: 'James Kim', role: 'VP Engineering', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Sophie Laurent', role: 'Head of Design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = useScrollAnimation();
  const services = useStaggerAnimation(4);
  const projects = useStaggerAnimation(3);
  const whyUs = useScrollAnimation();
  const testimonials = useStaggerAnimation(3);
  const team = useStaggerAnimation(4);
  const techStack = useScrollAnimation();
  const careerCta = useScrollAnimation();
  const finalCta = useScrollAnimation();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
          <FloatingParticles />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Badges — staggered entrance */}
              <div className="flex gap-2 animate-hero-badge">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5 shadow-sm">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Solutions
                </Badge>
                <Badge variant="outline" className="px-4 py-1.5">Since 2020</Badge>
              </div>

              {/* Title — staggered entrance */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-hero-title">
                Transform Your Business with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient inline-block">
                  AI Innovation
                </span>
              </h1>

              {/* Subtitle — staggered entrance */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl animate-hero-subtitle">
                HighTech delivers cutting-edge AI solutions for web and mobile platforms,
                empowering businesses across industries to achieve breakthrough results.
              </p>

              {/* Buttons — staggered entrance */}
              <div className="flex flex-col sm:flex-row gap-4 animate-hero-buttons">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 animate-pulse-glow group"
                  onClick={() => onNavigate('services')}
                >
                  Explore Solutions <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Schedule a Call
                  </a>
                </Button>
              </div>

              {/* Social proof — staggered entrance */}
              <div className="flex items-center gap-6 pt-4 animate-hero-social-proof">
                <div className="flex -space-x-3">
                  {teamAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Team member"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover transition-transform hover:scale-110 hover:z-10 relative"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Trusted by 200+ companies</p>
                </div>
              </div>
            </div>

            {/* 3D Tech Sphere — enhanced entrance */}
            <div className="relative animate-fade-in-right hidden lg:block">
              <TechSphere />
            </div>
          </div>
        </div>
      </section>

      {/* Stats — with animated counting */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>
        <div ref={stats.ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-hidden ${stats.isVisible ? 'scroll-visible' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Clients Worldwide', icon: Users },
              { value: '500+', label: 'Projects Completed', icon: Target },
              { value: '98%', label: 'Client Satisfaction', icon: Award },
              { value: '50+', label: 'AI Models Deployed', icon: Brain },
            ].map((stat, index) => (
              <AnimatedStat key={index} value={stat.value} label={stat.label} icon={stat.icon} index={index} isVisible={stats.isVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">End-to-End AI Solutions</h2>
            <p className="text-lg text-muted-foreground">From strategy to deployment, we provide comprehensive AI services</p>
          </div>
          <div ref={services.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'AI Web Development', description: 'Intelligent web apps with ML, NLP, and predictive analytics', color: 'blue' },
              { icon: Smartphone, title: 'AI Mobile Apps', description: 'Smart mobile experiences with on-device AI and computer vision', color: 'indigo' },
              { icon: Cpu, title: 'AI Consulting', description: 'Strategic guidance for AI adoption and digital transformation', color: 'purple' },
              { icon: Code2, title: 'Custom Solutions', description: 'Bespoke AI systems tailored to your unique business needs', color: 'cyan' },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 cursor-pointer border-2 hover:border-blue-200 hover-lift card-shine stagger-item ${services.visibleItems[index] ? 'stagger-visible' : ''}`}
                onClick={() => onNavigate('services')}
              >
                <CardHeader className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-${service.color}-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <service.icon className={`h-7 w-7 text-${service.color}-600`} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                    Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div className="space-y-4">
              <Badge variant="outline" className="text-sm px-4 py-1">Featured Work</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Recent Projects</h2>
              <p className="text-lg text-muted-foreground max-w-xl">See how we've helped companies transform with AI</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('projects')}>
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div ref={projects.containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'MediScan AI', category: 'Healthcare', description: 'AI-powered medical imaging platform that detects anomalies with 99.2% accuracy', image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Computer Vision', 'Deep Learning', 'Healthcare'], result: '99.2% accuracy' },
              { title: 'ShopSmart Analytics', category: 'E-Commerce', description: 'Predictive analytics engine boosting e-commerce revenue by 45%', image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Predictive Analytics', 'ML', 'Retail'], result: '+45% revenue' },
              { title: 'FinGuard Pro', category: 'Finance', description: 'Real-time fraud detection system processing 10M+ transactions daily', image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Fraud Detection', 'Real-time', 'FinTech'], result: '10M+ txn/day' },
            ].map((project, index) => (
              <Card key={index} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer hover-lift card-shine stagger-item ${projects.visibleItems[index] ? 'stagger-visible' : ''}`} onClick={() => onNavigate('projects')}>
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4"><Badge className="bg-white/90 text-blue-700 backdrop-blur-sm">{project.category}</Badge></div>
                  <div className="absolute bottom-4 right-4"><Badge className="bg-green-500 text-white">{project.result}</Badge></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyUs.ref} className={`grid lg:grid-cols-2 gap-16 items-center scroll-hidden ${whyUs.isVisible ? 'scroll-visible' : ''}`}>
            <div className="space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1">Why HighTech</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">We Build AI That Actually Works</h2>
              <p className="text-lg text-muted-foreground">Our approach combines deep technical expertise with business acumen to deliver AI solutions that create real, measurable impact.</p>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Enterprise-Grade Security', description: 'SOC 2 compliant with end-to-end encryption and data privacy controls' },
                  { icon: BarChart3, title: 'Measurable ROI', description: 'Every project includes KPIs and performance tracking dashboards' },
                  { icon: Zap, title: 'Rapid Deployment', description: 'From concept to production in weeks, not months, with agile methodology' },
                  { icon: Users, title: 'Dedicated Support', description: '24/7 support with dedicated account managers for every client' },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team collaboration" className="rounded-2xl shadow-xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </div>
          <div ref={testimonials.containerRef} className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "HighTech's AI solution increased our diagnostic accuracy by 40%. Their team's expertise in healthcare AI is unmatched.", name: 'Dr. Sarah Chen', role: 'CTO, MediVision Health', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' },
              { quote: "The predictive analytics platform they built transformed our supply chain. We've reduced waste by 60% and improved delivery times significantly.", name: 'Mark Thompson', role: 'VP Operations, GlobalRetail', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face' },
              { quote: "Working with HighTech was a game-changer. Their fraud detection system saves us millions annually and processes transactions in real-time.", name: 'Lisa Nakamura', role: 'Director of Security, FinanceFirst', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face' },
            ].map((testimonial, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-all duration-500 hover-lift testimonial-card stagger-item ${testimonials.visibleItems[index] ? 'stagger-visible' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Team Behind the Innovation</h2>
            <p className="text-lg text-muted-foreground">A diverse group of engineers, researchers, and strategists passionate about AI</p>
          </div>
          <div ref={team.containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className={`text-center group cursor-pointer stagger-item ${team.visibleItems[index] ? 'stagger-visible' : ''}`} onClick={() => onNavigate('about')}>
                <img src={member.avatar} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4 group-hover:scale-110 group-hover:ring-blue-200 transition-all duration-300 shadow-lg ring-4 ring-white" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('about')}>
              Meet the Full Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Our Technology Stack</h2>
            <p className="text-lg text-muted-foreground">We use the latest and most reliable technologies to build scalable solutions</p>
          </div>
          <div ref={techStack.ref} className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 scroll-hidden ${techStack.isVisible ? 'scroll-visible' : ''}`}>
            {['TensorFlow', 'PyTorch', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Python', 'TypeScript', 'PostgreSQL', 'Redis', 'GraphQL'].map((tech, index) => (
              <div key={index} className="flex items-center justify-center p-4 rounded-xl border-2 hover:border-blue-300 transition-all text-sm font-medium text-muted-foreground hover:text-blue-600 tech-grid-item" style={{ transitionDelay: `${index * 50}ms` }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div ref={careerCta.ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-hidden ${careerCta.isVisible ? 'scroll-visible' : ''}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 px-4 py-1">
              <Briefcase className="h-3 w-3 mr-1" />
              We're Hiring
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">Join Our Team of Innovators</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">We're looking for talented engineers, researchers, and designers who want to shape the future of AI. Remote-friendly culture with amazing benefits.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-white text-blue-900 hover:bg-blue-50" onClick={() => onNavigate('careers')}>
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-blue-400 text-blue-100 hover:bg-blue-500/20" onClick={() => onNavigate('about')}>
                Learn About Culture
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-blue-300">
              {['Remote Friendly', 'Unlimited PTO', 'Health & Wellness', 'Equity Options', 'Learning Budget'].map((perk) => (
                <span key={perk} className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />{perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={finalCta.ref} className={`max-w-4xl mx-auto text-center space-y-8 scroll-hidden ${finalCta.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Let's discuss how HighTech can help you leverage AI to achieve your business goals. Our team is ready to bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />Schedule a Free Call
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => onNavigate('contact')}>
                Send a Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
