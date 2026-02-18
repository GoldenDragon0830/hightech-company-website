import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Globe2,
  Heart,
  Lightbulb,
  Linkedin,
  Mail,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

const teamMembers = [
  { name: 'Alex Rivera', role: 'CEO & Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', bio: 'Former Google AI researcher with 15+ years in machine learning and business strategy.', linkedin: '#' },
  { name: 'Dr. Maya Patel', role: 'Chief AI Officer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', bio: 'PhD in Computer Science from MIT. Published 30+ papers on deep learning and NLP.', linkedin: '#' },
  { name: 'James Kim', role: 'VP of Engineering', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', bio: 'Led engineering teams at Amazon and Microsoft. Expert in scalable distributed systems.', linkedin: '#' },
  { name: 'Sophie Laurent', role: 'Head of Design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', bio: 'Award-winning UX designer focused on human-centered AI interfaces and accessibility.', linkedin: '#' },
  { name: 'David Okafor', role: 'Head of Data Science', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face', bio: 'Former Netflix data scientist specializing in recommendation systems and predictive models.', linkedin: '#' },
  { name: 'Emily Zhang', role: 'Director of Operations', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', bio: 'MBA from Wharton. 10+ years optimizing tech company operations and client delivery.', linkedin: '#' },
  { name: 'Carlos Mendez', role: 'Lead Mobile Engineer', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face', bio: 'Built AI-powered apps with 10M+ downloads. Expert in React Native and on-device ML.', linkedin: '#' },
  { name: 'Aisha Hassan', role: 'ML Research Lead', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', bio: 'Specializes in computer vision and medical AI. Former researcher at DeepMind.', linkedin: '#' },
];

const timeline = [
  { year: '2020', title: 'Founded', description: 'HighTech was founded with a vision to democratize AI for businesses of all sizes.' },
  { year: '2021', title: 'First Major Client', description: 'Secured our first enterprise contract with a Fortune 500 healthcare company.' },
  { year: '2022', title: 'Team Growth', description: 'Expanded to 50+ team members across 3 continents. Opened second office.' },
  { year: '2023', title: 'Industry Recognition', description: 'Named "Top 10 AI Startup" by TechCrunch. Launched our proprietary AI platform.' },
  { year: '2024', title: '100th Project', description: 'Completed our 100th project milestone. Entered healthcare and finance verticals.' },
  { year: '2025', title: 'Global Expansion', description: 'Opened offices in London and Singapore. Partnership with major cloud providers.' },
  { year: '2026', title: 'Current', description: '200+ clients worldwide, 500+ projects completed, and continuing to innovate.' },
];

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const missionAnim = useStaggerAnimation(3);
  const storyAnim = useScrollAnimation();
  const valuesAnim = useStaggerAnimation(6);
  const timelineAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const teamAnim = useStaggerAnimation(8);
  const cultureAnim = useScrollAnimation();
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
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="text-sm px-4 py-1">About HighTech</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Intelligent Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a team of world-class engineers, researchers, and designers united by a passion for making AI accessible and impactful for every business.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={missionAnim.containerRef} className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', color: 'blue', desc: 'To empower businesses of all sizes with cutting-edge AI solutions that drive measurable growth, operational efficiency, and competitive advantage in an increasingly digital world.' },
              { icon: Lightbulb, title: 'Our Vision', color: 'indigo', desc: 'To be the world\'s most trusted AI partner, known for creating technology that is not only powerful but ethical, transparent, and designed to enhance human capabilities.' },
              { icon: Heart, title: 'Our Values', color: 'purple', desc: 'Innovation with integrity. We believe in pushing boundaries while maintaining the highest standards of ethics, quality, and client partnership in everything we build.' },
            ].map((item, index) => (
              <Card key={index} className={`border-2 hover:border-${item.color}-600 transition-all group hover-lift stagger-item ${missionAnim.visibleItems[index] ? 'stagger-visible' : ''}`}>
                <CardHeader className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-${item.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={storyAnim.ref} className={`grid lg:grid-cols-2 gap-16 items-center scroll-hidden ${storyAnim.isVisible ? 'scroll-visible' : ''}`}>
            <div className="space-y-6">
              <Badge variant="outline" className="text-sm px-4 py-1">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">From Startup to Industry Leader</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>HighTech was founded in 2020 by Alex Rivera, a former Google AI researcher who saw a massive gap between the potential of artificial intelligence and its practical application in business.</p>
                <p>Starting with just a small team of 5 engineers working out of a co-working space in Newark, Delaware, we set out on a mission to make advanced AI accessible to companies of all sizes — not just tech giants.</p>
                <p>In just six years, we've grown to a team of 120+ professionals across three continents, serving 200+ clients from Fortune 500 enterprises to innovative startups.</p>
                <p>Today, HighTech stands at the forefront of applied AI, building solutions that don't just impress in demos but deliver real, measurable business value in production environments.</p>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="HighTech team" className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 z-10 animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Founded</p>
                    <p className="text-sm text-muted-foreground">2020 · Newark, DE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">What Drives Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Principles</h2>
          </div>
          <div ref={valuesAnim.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: 'Innovation First', description: 'We invest 20% of our revenue in R&D, ensuring we stay at the cutting edge of AI technology.' },
              { icon: Shield, title: 'Ethical AI', description: 'Every model we build is audited for bias, fairness, and transparency. We follow strict AI ethics guidelines.' },
              { icon: Users, title: 'Client Partnership', description: 'We don\'t just deliver projects — we become an extension of your team, deeply understanding your challenges.' },
              { icon: Award, title: 'Excellence', description: 'We maintain a 98% client satisfaction rate through rigorous quality processes and continuous improvement.' },
              { icon: Globe2, title: 'Global Perspective', description: 'Our diverse, distributed team brings perspectives from 15+ countries, enriching every solution we create.' },
              { icon: TrendingUp, title: 'Continuous Growth', description: 'Every team member gets a $5,000 annual learning budget. We grow together through knowledge sharing.' },
            ].map((value, index) => (
              <div key={index} className={`flex gap-4 items-start group stagger-item ${valuesAnim.visibleItems[index] ? 'stagger-visible' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Company Timeline</h2>
          </div>
          <div ref={timelineAnim.ref} className={`max-w-3xl mx-auto scroll-hidden ${timelineAnim.isVisible ? 'scroll-visible' : ''}`}>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-8 pb-12 last:pb-0" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm z-10 flex-shrink-0 shadow-lg shadow-blue-600/25 hover:scale-110 transition-transform">
                    {item.year}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div ref={statsAnim.ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 scroll-hidden ${statsAnim.isVisible ? 'scroll-visible' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '120+', label: 'Team Members' },
              { value: '200+', label: 'Clients Served' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '15+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2" style={{ transitionDelay: `${index * 100}ms` }}>
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Leadership Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Leaders</h2>
            <p className="text-lg text-muted-foreground">The brilliant minds driving HighTech's innovation and growth</p>
          </div>
          <div ref={teamAnim.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className={`text-center hover:shadow-xl transition-all duration-300 group hover-lift stagger-item ${teamAnim.visibleItems[index] ? 'stagger-visible' : ''}`}>
                <CardHeader className="space-y-4">
                  <img src={member.avatar} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover group-hover:scale-110 transition-transform shadow-lg ring-4 ring-white" />
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{member.bio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={member.linkedin} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={cultureAnim.ref} className={`grid lg:grid-cols-2 gap-16 items-center scroll-hidden ${cultureAnim.isVisible ? 'scroll-visible' : ''}`}>
            <div>
              <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team culture" className="rounded-2xl shadow-xl" />
            </div>
            <div className="space-y-6">
              <Badge variant="outline" className="text-sm px-4 py-1">Our Culture</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">A Culture of Growth & Innovation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At HighTech, we believe that great AI is built by diverse, empowered teams. Our culture is designed to attract and retain the best talent while fostering creativity and collaboration.
              </p>
              <div className="space-y-4">
                {[
                  'Remote-first with optional offices in 3 cities',
                  'Weekly tech talks and monthly hackathons',
                  '$5,000 annual learning & development budget',
                  'Unlimited PTO with minimum 4 weeks encouraged',
                  'Diversity & inclusion programs with ERGs',
                  'Annual company retreats in exciting destinations',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={() => onNavigate('careers')}>
                Join Our Team <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ctaAnim.ref} className={`max-w-4xl mx-auto text-center space-y-8 scroll-hidden ${ctaAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Work With Us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Let's discuss how our team can bring your AI vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" /> Schedule a Call
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => onNavigate('contact')}>
                <Mail className="mr-2 h-5 w-5" /> Send a Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
