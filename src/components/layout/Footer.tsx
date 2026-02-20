import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Brain, Calendar, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerAnim = useScrollAnimation({ threshold: 0.1 });

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div ref={footerAnim.ref} className={`grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 ${footerAnim.isVisible ? 'footer-visible' : ''}`}>
          <div className="lg:col-span-2 space-y-4 footer-section">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent header-logo-text">
                HighTech
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Transforming businesses with cutting-edge AI solutions for web and mobile
              platforms. We build the future, one algorithm at a time.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="footer-social-icon p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="footer-social-icon p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="footer-social-icon p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  AI Web Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  AI Mobile Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  AI Consulting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block transform">
                  Custom Solutions
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                contact@hightech.fit
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                +1 (540) 952-9270
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                24 East Clairmont Drive, Newark, DE 19702
              </li>
            </ul>
            <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-1.5 h-4 w-4" /> Schedule a Call
              </a>
            </Button>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 footer-bottom-enter ${footerAnim.isVisible ? 'footer-visible' : ''}`}>
          <p>&copy; 2026 HighTech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
