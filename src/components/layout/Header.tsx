import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from './Brand';
import MotionControl from '@/components/motion/MotionControl';
const items = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/industries', 'Industries'], ['/projects', 'Projects'], ['/careers', 'Careers'], ['/contact', 'Contact']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 961px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="shell header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav">{items.map(([path, label]) => <NavLink to={path} end={path === '/'} key={path}>{label}</NavLink>)}</nav><div className="header-actions"><MotionControl /><Link to="/contact" className="header-cta">Let’s talk <ArrowUpRight size={17} /></Link><button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>
    {open && <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Mobile navigation">{items.map(([path, label], i) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)} style={{ animationDelay: `${i * 30}ms` }}><span className="mobile-nav-index">0{i + 1}</span>{label}<ArrowUpRight size={19} /></NavLink>)}</nav>}
  </header>;
}
