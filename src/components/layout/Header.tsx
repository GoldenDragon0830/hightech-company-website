import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X } from 'lucide-react';

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

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNav('home')}
          >
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HighTech
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-foreground/70 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={() => handleNav('contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Get Started
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-1 border-t animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() => handleNav('contact')}
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
