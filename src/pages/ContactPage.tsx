import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/use-scroll-animation';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

const contactMethods = [
  { icon: Mail, title: 'Email Us', description: 'hello@hightechai.com', detail: 'We reply within 24 hours', color: 'bg-blue-100 text-blue-600' },
  { icon: Phone, title: 'Call Us', description: '+1 (555) 123-4567', detail: 'Mon–Fri, 9 AM – 6 PM EST', color: 'bg-green-100 text-green-600' },
  { icon: MapPin, title: 'Visit Us', description: 'San Francisco, CA', detail: 'By appointment only', color: 'bg-purple-100 text-purple-600' },
  { icon: Calendar, title: 'Schedule a Call', description: 'Book a 30-min slot', detail: 'Pick a time that works for you', color: 'bg-amber-100 text-amber-600', link: CALENDLY_URL },
];

const offices = [
  { city: 'San Francisco', address: '100 AI Innovation Blvd, Suite 500', country: 'United States', timezone: 'PST (UTC-8)' },
  { city: 'New York', address: '250 Tech Avenue, Floor 12', country: 'United States', timezone: 'EST (UTC-5)' },
  { city: 'London', address: '45 Silicon Roundabout, EC2A', country: 'United Kingdom', timezone: 'GMT (UTC+0)' },
];

const services = ['AI & Machine Learning', 'Data Analytics', 'Computer Vision', 'Natural Language Processing', 'Predictive Maintenance', 'Custom AI Solutions'];
const budgets = ['< $50K', '$50K – $100K', '$100K – $250K', '$250K – $500K', '$500K+'];

const faqs = [
  { q: 'How quickly can you start a project?', a: 'We can typically begin discovery within 1-2 weeks of signing. A dedicated team is assembled based on your project requirements.' },
  { q: 'Do you work with startups or only enterprises?', a: 'We work with companies of all sizes. Our engagement models are flexible — from small proof-of-concept projects to enterprise-scale deployments.' },
  { q: 'What industries do you specialize in?', a: 'We have deep expertise in Healthcare, Finance, E-Commerce, Education, Manufacturing, and Logistics. However, our AI capabilities apply across any domain.' },
  { q: 'How do you handle data security and privacy?', a: 'Security is foundational to everything we build. We are SOC 2 compliant, support HIPAA and GDPR requirements, and follow industry best practices for data encryption and access control.' },
  { q: 'What does a typical engagement look like?', a: 'Most projects begin with a 2-4 week discovery phase, followed by iterative development sprints. We provide weekly progress updates and demos throughout.' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ContactPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const contactAnim = useScrollAnimation();
  const contactStagger = useStaggerAnimation(contactMethods.length);
  const formAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const officesAnim = useScrollAnimation();
  const officesStagger = useStaggerAnimation(offices.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <Badge variant="outline" className="text-sm px-4 py-1 animate-hero-badge">Get in Touch</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-hero-title">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Extraordinary</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-hero-subtitle">
              Whether you have a clear project in mind or just want to explore possibilities, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactAnim.ref} className={`text-center mb-12 scroll-hidden ${contactAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Reach Out Your Way</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose your preferred way to connect with us.</p>
          </div>
          <div ref={contactStagger.containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((m, i) => {
              const Icon = m.icon;
              const inner = (
                <Card className={`p-6 text-center hover-lift card-shine cursor-pointer stagger-bubble-item ${contactStagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                  <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-1">{m.description}</p>
                  <p className="text-xs text-muted-foreground">{m.detail}</p>
                </Card>
              );
              return m.link ? (
                <a key={i} href={m.link} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Quick Chat */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={formAnim.ref} className={`grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-blur-zoom ${formAnim.isVisible ? 'scroll-visible' : ''}`}>
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Tell Us About Your Project</h2>
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto"><CheckCircle2 className="h-8 w-8 text-green-600" /></div>
                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Thank you for reaching out. Our team will review your message and get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', company: '', service: '', budget: '', message: '' }); }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">First Name *</label>
                        <input required type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
                        <input required type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Work Email *</label>
                        <input required type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Company</label>
                        <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Service Needed</label>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                          <option value="">Select a service</option>
                          {services.map((s) => (<option key={s} value={s}>{s}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Budget Range</label>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
                          <option value="">Select budget</option>
                          {budgets.map((b) => (<option key={b} value={b}>{b}</option>))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Project Details *</label>
                      <textarea required rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="Tell us about your project, goals, and timeline..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <Button type="submit" size="lg" className="w-full text-lg">
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Quick Chat Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <MessageSquare className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-2">Prefer a Quick Chat?</h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">Book a free 30-minute consultation with one of our AI experts. No commitment required.</p>
                <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" /> Schedule a Call
                  </a>
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'We Review', desc: 'Our team reviews your message within 24 hours.' },
                    { step: '2', title: 'Discovery Call', desc: 'We schedule a call to understand your needs.' },
                    { step: '3', title: 'Proposal', desc: 'You receive a tailored proposal with timeline and pricing.' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                      <div>
                        <p className="font-medium text-sm">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={faqAnim.ref} className={`text-center mb-12 scroll-hidden-flip ${faqAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Quick answers to common questions about working with us.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (<FaqItem key={i} faq={faq} />))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={officesAnim.ref} className={`text-center mb-12 scroll-hidden ${officesAnim.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Offices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find us around the globe.</p>
          </div>
          <div ref={officesStagger.containerRef} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {offices.map((o, i) => (
              <Card key={i} className={`p-6 hover-lift card-shine stagger-item ${officesStagger.visibleItems[i] ? 'stagger-visible' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"><Globe className="h-5 w-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-semibold">{o.city}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{o.address}</p>
                    <p className="text-sm text-muted-foreground">{o.country}</p>
                    <Badge variant="secondary" className="mt-2 text-xs"><Clock className="h-3 w-3 mr-1" />{o.timezone}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  const itemAnim = useScrollAnimation();

  return (
    <Card ref={itemAnim.ref} className={`overflow-hidden cursor-pointer transition-all duration-300 scroll-hidden-scale ${itemAnim.isVisible ? 'scroll-visible' : ''} ${open ? 'shadow-lg ring-1 ring-blue-100' : 'hover:shadow-md'}`} onClick={() => setOpen(!open)}>
      <div className="p-6 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-sm md:text-base">{faq.q}</h3>
        {open ? <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
      </div>
      {open && (
        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
          <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
        </div>
      )}
    </Card>
  );
}
