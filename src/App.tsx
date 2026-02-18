import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  Smartphone,
  Globe,
  Rocket,
  Users,
  Mail,
  Menu,
  X,
  ArrowRight,
  Zap,
  Building2,
  Heart,
  ShoppingCart,
  GraduationCap,
  Factory,
} from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">HighTech</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#industries" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Industries
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden md:block">
              <Button>Get Started</Button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2">
              <a href="#home" className="block py-2 text-sm font-medium hover:text-blue-600">
                Home
              </a>
              <a href="#about" className="block py-2 text-sm font-medium hover:text-blue-600">
                About
              </a>
              <a href="#services" className="block py-2 text-sm font-medium hover:text-blue-600">
                Services
              </a>
              <a href="#industries" className="block py-2 text-sm font-medium hover:text-blue-600">
                Industries
              </a>
              <a href="#contact" className="block py-2 text-sm font-medium hover:text-blue-600">
                Contact
              </a>
              <Button className="w-full mt-4">Get Started</Button>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  AI-Powered Solutions
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Transform Your Business with{' '}
                  <span className="text-blue-600">AI Innovation</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  HighTech delivers cutting-edge AI solutions for web and mobile platforms,
                  empowering businesses across industries to achieve breakthrough results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg">
                    Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="AI Technology"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <Badge variant="outline" className="text-sm">About HighTech</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Leading the Future of AI Development
              </h2>
              <p className="text-lg text-muted-foreground">
                We are a team of passionate innovators dedicated to creating intelligent
                solutions that drive real business value. Our expertise spans across web and
                mobile platforms, delivering AI-powered applications that transform industries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-blue-600 transition-all">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Expert Team</CardTitle>
                  <CardDescription>
                    Skilled AI engineers and developers with years of experience in cutting-edge
                    technologies
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-blue-600 transition-all">
                <CardHeader>
                  <Rocket className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Innovation First</CardTitle>
                  <CardDescription>
                    We stay ahead of the curve, implementing the latest AI advancements in every
                    project
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-blue-600 transition-all">
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>Proven Results</CardTitle>
                  <CardDescription>
                    Track record of delivering high-impact solutions that exceed client
                    expectations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <Badge variant="outline" className="text-sm">Our Services</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                AI-Powered Solutions for Every Platform
              </h2>
              <p className="text-lg text-muted-foreground">
                From intelligent web applications to smart mobile experiences, we build
                AI solutions that scale with your business.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Web Development"
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <Globe className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-2xl">AI Web Development</CardTitle>
                  <CardDescription className="text-base">
                    Build intelligent web applications with machine learning capabilities,
                    natural language processing, and predictive analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Custom AI-powered web platforms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Real-time data processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Intelligent automation systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Mobile Development"
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <Smartphone className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-2xl">AI Mobile Development</CardTitle>
                  <CardDescription className="text-base">
                    Create smart mobile applications with on-device AI, computer vision, and
                    personalized user experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>iOS and Android AI apps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Computer vision & AR integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                      <span>Voice and image recognition</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="industries" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <Badge variant="outline" className="text-sm">Industries We Serve</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforming Multiple Industries with AI
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI solutions are tailored to meet the unique challenges of various sectors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Heart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Healthcare</CardTitle>
                  <CardDescription>
                    AI-powered diagnostics, patient management, and medical imaging solutions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>E-Commerce</CardTitle>
                  <CardDescription>
                    Personalized recommendations, inventory optimization, and customer analytics
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Finance</CardTitle>
                  <CardDescription>
                    Fraud detection, risk assessment, and automated financial planning
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Adaptive learning platforms, automated grading, and student analytics
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Factory className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Manufacturing</CardTitle>
                  <CardDescription>
                    Predictive maintenance, quality control, and supply chain optimization
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Retail</CardTitle>
                  <CardDescription>
                    Customer behavior analysis, demand forecasting, and smart inventory
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Logistics</CardTitle>
                  <CardDescription>
                    Route optimization, fleet management, and delivery prediction
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:border-blue-600 transition-all cursor-pointer">
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Energy</CardTitle>
                  <CardDescription>
                    Smart grid management, consumption prediction, and efficiency optimization
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <Badge variant="outline" className="text-sm">Get In Touch</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Let's discuss how HighTech can help you leverage AI to achieve your business
                    goals. Our team is ready to bring your vision to life.
                  </p>

                  <div className="space-y-4 pt-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground">contact@hightech-ai.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Building2 className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">
                          123 Innovation Drive, Tech Valley, CA 94000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="text-sm font-medium block mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium block mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">HighTech</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming businesses with cutting-edge AI solutions for web and mobile
                platforms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-foreground transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-foreground transition-colors">
                    Industries
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Web Development</li>
                <li>Mobile Development</li>
                <li>AI Consulting</li>
                <li>Custom Solutions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@hightech-ai.com</li>
                <li>123 Innovation Drive</li>
                <li>Tech Valley, CA 94000</li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 HighTech. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
