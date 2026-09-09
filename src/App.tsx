import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link, matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
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
const pages = [
  {
    path: '/',
    title: 'HighTech — Thoughtful software. Human by design.',
    element: <HomePage />,
  },
  { path: '/about', title: 'The studio & team — HighTech', element: <AboutPage /> },
  {
    path: '/services',
    title: 'Software, design & applied AI — HighTech',
    element: <ServicesPage />,
  },
  {
    path: '/industries',
    title: 'Industries & applications — HighTech',
    element: <IndustriesPage />,
  },
  { path: '/projects', title: 'Project lab — HighTech', element: <ProjectsPage /> },
  { path: '/careers', title: 'Careers & collaboration — HighTech', element: <CareersPage /> },
  { path: '/contact', title: 'Start a conversation — HighTech', element: <ContactPage /> },
];

export default function App() {
  const { pathname, hash } = useLocation();
  const matchedPage = matchRoutes(pages, pathname)?.[0]?.route;
  const previousPath = useRef(pathname);
  useEffect(() => {
    document.title = matchedPage?.title ?? 'Page not found — HighTech';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${site.url}${matchedPage?.path ?? pathname}`;
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    if (previousPath.current !== pathname)
      document.getElementById('main-content')?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, hash, matchedPage]);
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div key={pathname} className="page-transition">
          <Suspense
            fallback={
              <div className="shell route-loading" role="status">
                Opening the next chapter…
              </div>
            }
          >
            <Routes>
              {pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <PageHero
                      eyebrow="404 / Off the map"
                      title="This page took a different path."
                      description="The page you’re looking for isn’t here. Let’s get you back to something good."
                    >
                      <Link to="/" className="button button-primary">
                        Back to the studio
                      </Link>
                    </PageHero>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
