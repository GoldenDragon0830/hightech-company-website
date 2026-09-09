import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PageHero from '@/components/shared/PageHero';
import { site } from '@/data/site';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const CareersPage = lazy(() => import('@/pages/CareersPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const titles: Record<string, string> = {
  '/': 'HighTech — Thoughtful software. Human by design.',
  '/about': 'The studio & team — HighTech',
  '/services': 'Software, design & applied AI — HighTech',
  '/industries': 'Industries & applications — HighTech',
  '/projects': 'Project lab — HighTech',
  '/careers': 'Careers & collaboration — HighTech',
  '/contact': 'Start a conversation — HighTech',
};

export default function App() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    document.title = titles[pathname] ?? 'Page not found — HighTech';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${site.url}${pathname}`;
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    if (previousPath.current !== pathname) document.getElementById('main-content')?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, hash]);
  return <><Header /><main id="main-content" tabIndex={-1}><div key={pathname} className="page-transition"><Suspense fallback={<div className="shell route-loading" role="status">Opening the next chapter…</div>}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/industries" element={<IndustriesPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/careers" element={<CareersPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<div className="not-found"><PageHero eyebrow="404 / Off the map" title="This page took a different path." description="The page you’re looking for isn’t here. Let’s get you back to something good."><Link to="/" className="button button-primary">Back to the studio</Link></PageHero></div>} />
  </Routes></Suspense></div></main><Footer /></>;
}
