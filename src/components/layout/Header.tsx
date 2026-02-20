import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Calendar, Menu, X } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/goldendragon0830-hightech/30min';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Industries', page: 'industries' },
  { label: 'Projects', page: 'projects' },
  { label: 'Careers', page: 'careers' },
  { label: 'Contact', page: 'contact' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNav('home')}
          >
            <Brain className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent header-logo-text">
              HighTech
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`nav-item-animated nav-active-indicator px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50 active'
                    : 'text-foreground/70 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-1.5 h-4 w-4" /> Schedule a Call
              </a>
            </Button>
            <Button
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get Started
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="transition-transform duration-300">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-1 border-t animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item, i) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`mobile-nav-item block w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'hover:text-blue-600 hover:bg-blue-50/50'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
            <Button
              className="w-full mt-2 border-blue-200 text-blue-600 mobile-nav-item"
              variant="outline"
              asChild
              style={{ animationDelay: `${navItems.length * 50}ms` }}
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-1.5 h-4 w-4" /> Schedule a Call
              </a>
            </Button>
            <Button
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 mobile-nav-item"
              onClick={() => handleNav('contact')}
              style={{ animationDelay: `${(navItems.length + 1) * 50}ms` }}
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
