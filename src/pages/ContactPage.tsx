import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage(props: ContactPageProps) {
  void props;
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="text-sm px-4 py-1">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Our team is here to help you
              every step of the way. Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                value: 'contact@hightech.fit',
                description: 'We respond within 24 hours',
              },
              {
                icon: Phone,
                title: 'Call Us',
                value: '+1 (302) 555-0142',
                description: 'Mon-Fri, 9am - 6pm EST',
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                value: 'Newark, DE 19702',
                description: '24 East Clairmont Drive',
              },
              {
                icon: Calendar,
                title: 'Schedule a Call',
                value: 'Book a Meeting',
                description: '30-min free consultation',
              },
            ].map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-blue-100 flex items-center justify-center">
                    <info.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <p className="font-semibold text-blue-600">{info.value}</p>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="text-sm font-medium block mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="text-sm font-medium block mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="text-sm font-medium block mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="text-sm font-medium block mb-2">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">Select a service...</option>
                          <option value="web">AI Web Development</option>
                          <option value="mobile">AI Mobile Development</option>
                          <option value="consulting">AI Consulting</option>
                          <option value="custom">Custom AI Solutions</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="text-sm font-medium block mb-2">
                          Estimated Budget
                        </label>
                        <select
                          id="budget"
                          className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">Select budget range...</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-250k">$100,000 - $250,000</option>
                          <option value="250k+">$250,000+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="text-sm font-medium block mb-2">
                          Tell Us About Your Project *
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Describe your project goals, challenges, and timeline..."
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Side Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">What to Expect</h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', text: 'We respond within 24 hours' },
                      { step: '2', text: 'Free 30-minute consultation call' },
                      { step: '3', text: 'Custom proposal within 1 week' },
                      { step: '4', text: 'Project kickoff in 2-3 weeks' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <p className="text-muted-foreground pt-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                  <CardHeader>
                    <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Prefer a Quick Chat?</CardTitle>
                    <CardDescription>
                      Schedule a free 30-minute consultation with one of our AI experts.
                      No commitment required.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Call
                    </Button>
                  </CardContent>
                </Card>

                {/* Office Locations */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Our Offices</h3>
                  {[
                    { city: 'Newark, DE (HQ)', address: '24 East Clairmont Drive, Newark, DE 19702', flag: '🇺🇸' },
                    { city: 'London, UK', address: '100 Liverpool Street, London EC2M 2AT', flag: '🇬🇧' },
                    { city: 'Singapore', address: '80 Robinson Road, #10-01, Singapore 068898', flag: '🇸🇬' },
                  ].map((office, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border hover:border-blue-200 transition-colors">
                      <span className="text-2xl">{office.flag}</span>
                      <div>
                        <p className="font-semibold text-sm">{office.city}</p>
                        <p className="text-xs text-muted-foreground">{office.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="text-sm px-4 py-1">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'How long does a typical project take?',
                  a: 'Project timelines vary based on complexity. A focused AI MVP can be delivered in 8-12 weeks, while enterprise-scale solutions typically take 4-8 months. We always provide detailed timelines during our proposal phase.',
                },
                {
                  q: 'What industries do you specialize in?',
                  a: 'We have deep expertise in Healthcare, Finance, E-Commerce, Education, Manufacturing, and Logistics. However, our AI capabilities are adaptable to any industry. We\'ve worked with clients across 15+ sectors.',
                },
                {
                  q: 'Do you work with startups or only enterprise clients?',
                  a: 'We work with companies of all sizes — from funded startups to Fortune 500 enterprises. Our engagement models are flexible to accommodate different budgets and needs.',
                },
                {
                  q: 'What is your pricing model?',
                  a: 'We offer project-based, dedicated team, and retainer engagement models. Pricing depends on project scope, complexity, and duration. We provide transparent, detailed estimates during the proposal phase.',
                },
                {
                  q: 'Do you provide ongoing support after launch?',
                  a: 'Yes! We offer AI retainer packages that include monitoring, model retraining, performance optimization, and priority support. Most of our clients continue working with us after initial project completion.',
                },
                {
                  q: 'Can you work with our existing tech stack?',
                  a: 'Absolutely. We design solutions that integrate seamlessly with your existing infrastructure. Our team has experience with all major cloud providers, databases, and frameworks.',
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{faq.a}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
