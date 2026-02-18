import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Code2,
  Coffee,
  Globe2,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

const openPositions = [
  {
    title: 'Senior Machine Learning Engineer',
    department: 'AI Engineering',
    location: 'Remote / Newark, DE',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160K - $220K',
    description: 'Lead the development of production ML models for our healthcare and finance clients. Work with cutting-edge architectures including transformers, GNNs, and diffusion models.',
    requirements: [
      '5+ years of ML engineering experience',
      'Expertise in PyTorch or TensorFlow',
      'Production ML deployment experience',
      'Strong Python and software engineering skills',
    ],
  },
  {
    title: 'Full-Stack AI Developer',
    department: 'Product Engineering',
    location: 'Remote / London, UK',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$130K - $180K',
    description: 'Build end-to-end AI-powered web applications. Combine your frontend expertise with ML integration skills to create intelligent user experiences.',
    requirements: [
      '3+ years full-stack development experience',
      'React/Next.js and Node.js expertise',
      'Experience integrating ML models into applications',
      'Strong TypeScript skills',
    ],
  },
  {
    title: 'Data Scientist - NLP',
    department: 'AI Research',
    location: 'Remote / Singapore',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$140K - $190K',
    description: 'Develop and fine-tune large language models for our enterprise clients. Work on conversational AI, document understanding, and text analytics projects.',
    requirements: [
      '3+ years NLP/ML experience',
      'Experience with transformer models and LLMs',
      'Publication record preferred',
      'Strong Python and data analysis skills',
    ],
  },
  {
    title: 'DevOps / MLOps Engineer',
    department: 'Platform Engineering',
    location: 'Remote / Newark, DE',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$130K - $175K',
    description: 'Build and maintain our ML infrastructure including model training pipelines, serving systems, monitoring, and CI/CD for ML workflows.',
    requirements: [
      '3+ years DevOps/SRE experience',
      'Kubernetes and Docker expertise',
      'Experience with ML pipeline tools (Airflow, Kubeflow)',
      'AWS/GCP/Azure cloud experience',
    ],
  },
  {
    title: 'Product Designer - AI/UX',
    department: 'Design',
    location: 'Remote / London, UK',
    type: 'Full-time',
    level: 'Senior',
    salary: '$120K - $165K',
    description: 'Design intuitive interfaces for complex AI products. Create design systems that make machine learning outputs accessible and actionable for end users.',
    requirements: [
      '5+ years product design experience',
      'Experience designing for AI/ML products',
      'Strong Figma and prototyping skills',
      'Understanding of data visualization',
    ],
  },
  {
    title: 'AI Solutions Consultant',
    department: 'Consulting',
    location: 'Remote / Newark, DE',
    type: 'Full-time',
    level: 'Senior',
    salary: '$140K - $200K',
    description: 'Work directly with clients to understand their challenges and design AI strategies and solutions. Bridge the gap between business needs and technical capabilities.',
    requirements: [
      '5+ years in technology consulting',
      'Strong understanding of AI/ML capabilities',
      'Excellent communication and presentation skills',
      'MBA or technical graduate degree preferred',
    ],
  },
];

const benefits = [
  { icon: Wallet, title: 'Competitive Salary', description: 'Top-of-market compensation with annual reviews and equity options for all employees.' },
  { icon: Home, title: 'Remote-First', description: 'Work from anywhere. We have optional offices in Newark, London, and Singapore.' },
  { icon: Clock, title: 'Unlimited PTO', description: 'Take the time you need. We encourage a minimum of 4 weeks per year.' },
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision insurance. Plus mental health support and gym reimbursement.' },
  { icon: GraduationCap, title: 'Learning Budget', description: '$5,000 annual budget for courses, conferences, books, and professional development.' },
  { icon: TrendingUp, title: 'Equity Options', description: 'Stock options for all employees. Share in the company\'s growth and success.' },
  { icon: Coffee, title: 'Team Retreats', description: 'Annual company retreats in exciting destinations. Past: Costa Rica, Japan, Iceland.' },
  { icon: Shield, title: '401(k) Match', description: '4% employer match on 401(k) contributions. Immediate vesting.' },
  { icon: BookOpen, title: 'Parental Leave', description: '16 weeks paid parental leave for all new parents, regardless of gender.' },
];

const values = [
  {
    icon: Sparkles,
    title: 'Innovation Is in Our DNA',
    description: 'We dedicate 20% of our time to research and experimentation. Weekly tech talks and monthly hackathons keep us sharp and creative.',
  },
  {
    icon: Users,
    title: 'Diversity & Inclusion',
    description: 'Our team spans 15+ countries and backgrounds. We actively promote D&I through ERGs, inclusive hiring, and cultural celebrations.',
  },
  {
    icon: Rocket,
    title: 'Growth Mindset',
    description: 'We believe in continuous learning. Every team member has a personalized development plan and mentorship from senior leaders.',
  },
  {
    icon: Globe2,
    title: 'Impact-Driven Work',
    description: 'Our AI solutions help doctors diagnose diseases, protect consumers from fraud, and educate the next generation. Your work matters.',
  },
];

export default function CareersPage({ onNavigate }: CareersPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 px-4 py-1">
              <Briefcase className="h-3 w-3 mr-1" />
              We're Hiring
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build the Future of{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI With Us
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Join a world-class team working on AI solutions that transform healthcare,
              finance, education, and more. Remote-friendly. Impact-driven. Growth-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg bg-white text-blue-900 hover:bg-blue-50"
                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-blue-400 text-blue-100 hover:bg-blue-500/20"
                onClick={() => onNavigate('about')}
              >
                Learn About Us
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-blue-300">
              {['120+ Team Members', '15+ Countries', '3 Offices', 'Remote-First'].map((stat) => (
                <span key={stat} className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Our Culture</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Why People Love Working Here</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <value.icon className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Spotlight */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Employee Spotlight</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Hear From Our Team</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Senior ML Engineer',
                tenure: '3 years',
                initials: 'PS',
                quote: "The learning culture here is unmatched. I've grown more in 3 years at HighTech than in my previous 8 years combined. The work is challenging, meaningful, and the team is incredibly supportive.",
              },
              {
                name: 'Tom Rodriguez',
                role: 'Product Designer',
                tenure: '2 years',
                initials: 'TR',
                quote: "Designing for AI products is fascinating. Every project presents unique challenges, and I love that my designs directly impact how doctors, analysts, and educators interact with AI. Plus, the remote flexibility is amazing.",
              },
              {
                name: 'Yuki Tanaka',
                role: 'Data Scientist',
                tenure: '1.5 years',
                initials: 'YT',
                quote: "I joined HighTech from academia, and the transition was seamless. Here I get to do real research that ships to production and impacts millions of people. The hackathons and tech talks keep us constantly inspired.",
              },
            ].map((employee, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                      {employee.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{employee.name}</p>
                      <p className="text-sm text-blue-600">{employee.role}</p>
                      <p className="text-xs text-muted-foreground">{employee.tenure} at HighTech</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed text-sm">
                    "{employee.quote}"
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Benefits & Perks</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">We Take Care of Our People</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive benefits designed to support your well-being, growth, and happiness
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">How We Hire</h2>
            <p className="text-lg text-muted-foreground">
              A transparent, respectful process designed to be completed in 2-3 weeks
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Application', description: 'Submit your application. We review all submissions within 48 hours and aim to respond within a week.', icon: Code2 },
              { step: '02', title: 'Initial Screen', description: '30-minute video call with our recruiting team to learn about your experience and share more about the role.', icon: Users },
              { step: '03', title: 'Technical Interview', description: 'A practical assessment relevant to the role. No trick questions — we test real-world problem solving.', icon: Zap },
              { step: '04', title: 'Team & Offer', description: 'Meet your future team, discuss culture fit, and receive a competitive offer — all within the same week.', icon: Rocket },
            ].map((phase, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/25">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold">{phase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-sm px-4 py-1">Open Positions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Current Openings</h2>
            <p className="text-lg text-muted-foreground">
              {openPositions.length} positions across engineering, design, and consulting
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {position.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{position.level}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{position.salary}</p>
                      <p className="text-xs text-muted-foreground">+ equity & benefits</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{position.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Requirements:</h4>
                    <ul className="space-y-1">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and we'll
              reach out when we have a position that matches your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg bg-white text-blue-600 hover:bg-blue-50">
                Send Your Resume <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-white/50 text-white hover:bg-white/10"
                onClick={() => onNavigate('contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
