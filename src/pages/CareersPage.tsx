import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  Coffee,
  GraduationCap,
  Heart,
  Laptop,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';


const openPositions = [
  { title: 'Senior ML Engineer', department: 'AI Research', location: 'San Francisco / Remote', type: 'Full-time', level: 'Senior', posted: '2 days ago', description: 'Lead the development of next-generation ML models for our core AI platform.' },
  { title: 'Full Stack Developer', department: 'Product Engineering', location: 'New York / Remote', type: 'Full-time', level: 'Mid-Senior', posted: '1 week ago', description: 'Build and scale our web applications using React, Node.js, and cloud infrastructure.' },
  { title: 'Data Scientist', department: 'Analytics', location: 'Boston / Remote', type: 'Full-time', level: 'Mid', posted: '3 days ago', description: 'Transform complex datasets into actionable insights that drive client success.' },
  { title: 'DevOps Engineer', department: 'Infrastructure', location: 'Remote', type: 'Full-time', level: 'Senior', posted: '5 days ago', description: 'Design and manage cloud infrastructure for production AI systems at scale.' },
  { title: 'Product Designer', department: 'Design', location: 'San Francisco', type: 'Full-time', level: 'Mid-Senior', posted: '1 week ago', description: 'Craft intuitive user experiences for our AI-powered products and dashboards.' },
  { title: 'AI Research Intern', department: 'AI Research', location: 'San Francisco', type: 'Internship', level: 'Entry', posted: '4 days ago', description: 'Work alongside senior researchers on cutting-edge NLP and computer vision projects.' },
];

const benefits = [
  { icon: Laptop, title: 'Remote-First', description: 'Work from anywhere with flexible hours' },
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive medical, dental, and vision plans' },
  { icon: BookOpen, title: 'Learning Budget', description: '$5,000/year for courses, conferences, and books' },
  { icon: Trophy, title: 'Equity Package', description: 'Meaningful stock options for all employees' },
  { icon: Coffee, title: 'Unlimited PTO', description: 'Take the time you need to recharge' },
  { icon: GraduationCap, title: 'Mentorship', description: 'Dedicated mentors for career growth' },
  { icon: Rocket, title: 'Cutting-Edge Tech', description: 'Work with the latest AI tools and frameworks' },
  { icon: Users, title: 'Team Retreats', description: 'Quarterly in-person meetups worldwide' },
  { icon: Zap, title: 'Fast Growth', description: 'Clear promotion path and regular reviews' },
];

const values = [
  { icon: Target, title: 'Impact-Driven', description: 'We measure success by the real-world impact of our work.' },
  { icon: Sparkles, title: 'Innovation First', description: 'We encourage experimentation and bold ideas at every level.' },
  { icon: Users, title: 'Collaborative', description: 'Great work happens when diverse minds come together.' },
  { icon: Star, title: 'Excellence', description: 'We hold ourselves to the highest standards in everything we do.' },
];

const employees = [
  { name: 'Priya Sharma', role: 'Senior ML Engineer', tenure: '3 years', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face', quote: "The freedom to explore new approaches and the support from leadership make this the best place I've ever worked. I've grown more in 3 years here than in 8 years elsewhere." },
  { name: 'Tom Rodriguez', role: 'Full Stack Developer', tenure: '2 years', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', quote: "What I love most is the impact. Every project we deliver genuinely changes how our clients operate. Plus, the remote-first culture is incredible." },
  { name: 'Yuki Tanaka', role: 'Data Scientist', tenure: '1.5 years', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', quote: "The learning culture here is unmatched. From the generous education budget to weekly knowledge-sharing sessions, growth is built into the DNA." },
];

const hiringSteps = [
  { step: 1, title: 'Apply Online', description: 'Submit your resume and tell us about yourself. We review every application.', duration: '1-2 days' },
  { step: 2, title: 'Recruiter Chat', description: 'A friendly 30-minute conversation about the role and your background.', duration: '30 min' },
  { step: 3, title: 'Technical Interview', description: 'A hands-on session focused on real-world problems, not trick questions.', duration: '60-90 min' },
  { step: 4, title: 'Team Meet & Offer', description: 'Meet your future team, ask questions, and receive a competitive offer.', duration: '1 day' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CareersPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const positionsAnim = useScrollAnimation();
  const benefitsAnim = useScrollAnimation();
  const benefitsStagger = useStaggerAnimation(benefits.length);
  const valuesAnim = useScrollAnimation();
  const valuesStagger = useStaggerAnimation(values.length);
  const spotlightAnim = useScrollAnimation();
  const spotlightStagger = useStaggerAnimation(employees.length);
  const processAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-sm px-4 py-1 animate-hero-badge">We're Hiring</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-hero-title">
              Build the Future of{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI With Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-hero-subtitle">
              Join a team of world-class engineers, researchers, and designers solving the hardest problems in AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero-buttons">
              <Button size="lg" className="text-lg animate-pulse-glow">
                <Briefcase className="mr-2 h-5 w-5" /> View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" /> Schedule a Chat
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={valuesAnim.ref} className={`text-center mb-12 scroll-hidden ${valuesAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div ref={valuesStagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Card key={i} className={`p-6 text-center hover-lift card-shine stagger-bubble-item ${valuesStagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4"><Icon className="h-6 w-6 text-purple-600" /></div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={positionsAnim.ref} className={`text-center mb-12 scroll-hidden ${positionsAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find the perfect role for your skills and ambitions.</p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {openPositions.map((pos, i) => (
              <PositionCard key={i} position={pos} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={benefitsAnim.ref} className={`text-center mb-12 scroll-hidden ${benefitsAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We invest in our people so they can do their best work.</p>
          </div>
          <div ref={benefitsStagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Card key={i} className={`p-6 hover-lift card-shine stagger-item ${benefitsStagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"><Icon className="h-5 w-5 text-blue-600" /></div>
                    <div>
                      <h3 className="font-semibold mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Employee Spotlight */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={spotlightAnim.ref} className={`text-center mb-12 scroll-hidden ${spotlightAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">What our people say about working at HighTech AI.</p>
          </div>
          <div ref={spotlightStagger.containerRef} className="grid md:grid-cols-3 gap-8">
            {employees.map((emp, i) => (
              <Card key={i} className={`p-8 hover-lift testimonial-card stagger-item ${spotlightStagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                <div className="flex items-start gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (<Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />))}
                </div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed">"{emp.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow" />
                  <div>
                    <p className="font-semibold text-sm">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role} · {emp.tenure}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={processAnim.ref} className={`text-center mb-12 scroll-hidden-flip ${processAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Hiring Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Transparent, respectful, and designed to find the best fit — for both sides.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-0">
              {hiringSteps.map((step, i) => (
                <div key={i} className="flex gap-6 relative">
                  {i < hiringSteps.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-blue-200" />
                  )}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg process-step-number">{step.step}</div>
                  </div>
                  <div className="pb-10">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="secondary" className="text-xs"><Clock className="h-3 w-3 mr-1" />{step.duration}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl cta-bg-orb" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl cta-bg-orb" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={ctaAnim.ref} className={`max-w-4xl mx-auto text-center space-y-8 scroll-hidden ${ctaAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Make an Impact?</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">Join us and help shape the future of artificial intelligence. Your next chapter starts here.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-white text-purple-900 hover:bg-purple-50">
                <Briefcase className="mr-2 h-5 w-5" /> Browse All Positions
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-purple-400 text-purple-100 hover:bg-purple-500/20" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" /> Talk to Recruiting
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PositionCard({ position }: { position: typeof openPositions[0] }) {
  const cardAnim = useScrollAnimation();

  return (
    <Card ref={cardAnim.ref} className={`p-6 hover-lift cursor-pointer transition-all duration-300 scroll-hidden-scale ${cardAnim.isVisible ? 'scroll-visible' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{position.title}</h3>
            <Badge variant="secondary" className="text-xs">{position.level}</Badge>
            <Badge className="bg-green-100 text-green-700 text-xs">{position.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{position.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Code2 className="h-3.5 w-3.5" /> {position.department}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {position.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {position.posted}</span>
          </div>
        </div>
        <Button className="flex-shrink-0">
          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
