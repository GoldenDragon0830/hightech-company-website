import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from '@/App';
import { site } from '@/data/site';

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current pathname">{pathname}</output>;
}

function renderRoute(pathname: string) {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('matched route metadata', () => {
  let canonical: HTMLLinkElement;
  let previousTitle: string;

  beforeEach(() => {
    previousTitle = document.title;
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${site.url}/stale`;
    document.head.append(canonical);
  });

  afterEach(() => {
    canonical.remove();
    document.title = previousTitle;
  });

  it.each(['/services', '/Services', '/services/', '/%73ervices'])(
    'uses Services metadata for %s without changing the location',
    async (pathname) => {
      renderRoute(pathname);

      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: /Good ideas deserve well-built software\./,
        }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Current pathname')).toHaveTextContent(pathname);
      expect.soft(document.title).toBe('Software, design & applied AI — HighTech');
      expect.soft(canonical.href).toBe(`${site.url}/services`);
    },
  );

  it('keeps the not-found metadata for a path that does not match a page', async () => {
    renderRoute('/services-extra');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'This page took a different path.',
      }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Page not found — HighTech');
    expect(canonical.href).toBe(`${site.url}/services-extra`);
  });
});
