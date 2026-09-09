import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServicesPage from '@/pages/ServicesPage';
import IndustriesPage from '@/pages/IndustriesPage';
import userEvent from '@testing-library/user-event';
import ProjectsPage from '@/pages/ProjectsPage';
import CareersPage from '@/pages/CareersPage';
import { readFileSync } from 'node:fs';
const capabilitiesStyles = readFileSync('src/styles/capabilities.css', 'utf8');

it('provides a pause control contract and reduced-motion override for decorative artwork', () => {
  expect(capabilitiesStyles).toMatch(
    /\.cap-concept-art \.art-elements\s*\{[^}]*animation:\s*concept-drift/,
  );
  expect(capabilitiesStyles).toMatch(
    /html\[data-motion=['"]paused['"]\] \.cap-concept-art \.art-elements\s*\{[^}]*animation-play-state:\s*paused/,
  );
  expect(capabilitiesStyles).toMatch(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.cap-concept-art \.art-elements\s*\{[^}]*animation:\s*none/,
  );
});

describe('Careers', () => {
  it('invites talent-network introductions by real email without inventing vacancies or benefits', () => {
    render(
      <MemoryRouter>
        <CareersPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', { name: 'A conversation, not a job posting.' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/no open roles are currently listed/i)).toBeInTheDocument();
    const introduction = screen.getByRole('link', { name: /Introduce yourself/ });
    expect(introduction).toHaveAttribute(
      'href',
      'mailto:contact@hightech.fit?subject=Talent%20network%20introduction',
    );
    expect(screen.getByRole('link', { name: /Meet the studio/ })).toHaveAttribute('href', '/about');
    expect(document.body.textContent).not.toMatch(
      /Apply Now|We're Hiring|\$5,000|Unlimited PTO|Equity Package|world-class|Senior ML Engineer/,
    );
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });
});

// jsdom lacks matchMedia; refresh the browser shim after the shared mock cleanup.
beforeEach(() => {
  window.matchMedia = vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('Projects', () => {
  it('isolates collection artwork from the homepage concept-art styles', () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(container.querySelectorAll('.concept-art')).toHaveLength(0);
    expect(container.querySelectorAll('.cap-concept-art')).toHaveLength(6);
  });

  it('clears expanded details when changing filters', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Explore Fieldnote' }));
    await user.click(screen.getByRole('button', { name: 'Web apps' }));
    await user.click(screen.getByRole('button', { name: 'All concepts' }));
    expect(screen.getByRole('button', { name: 'Explore Fieldnote' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it.each(['Fieldnote', 'Shelf', 'Trace', 'Openbook', 'Shift', 'Wayline'])(
    'opens and closes %s by keyboard with explicit validation boundaries',
    async (title) => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <ProjectsPage />
        </MemoryRouter>,
      );

      const button = screen.getByRole('button', { name: `Explore ${title}` });
      expect(button).toHaveAttribute('aria-expanded', 'false');
      act(() => button.focus());
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const panel = document.getElementById(button.getAttribute('aria-controls')!);
      expect(panel).toBeVisible();
      expect(within(panel!).getByRole('heading', { name: 'The question' })).toBeInTheDocument();
      expect(
        within(panel!).getByRole('heading', { name: 'Before a real build' }),
      ).toBeInTheDocument();
      expect(within(panel!).getByRole('link', { name: /Discuss a similar idea/ })).toHaveAttribute(
        'href',
        '/contact',
      );
      expect(button).toHaveAccessibleName(`Close ${title} details`);
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(panel).not.toBeVisible();
      expect(button).toHaveFocus();
    },
  );

  it('filters concepts by delivery type and announces the current result count', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    const filters = screen.getByRole('group', { name: 'Filter concepts' });
    expect(screen.getByRole('status')).toHaveTextContent('6 concepts');
    for (const [category, titles] of [
      ['AI systems', ['Fieldnote', 'Trace']],
      ['Web apps', ['Shelf', 'Openbook']],
      ['Mobile apps', ['Shift', 'Wayline']],
    ] as const) {
      const button = within(filters).getByRole('button', { name: category });
      act(() => button.focus());
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getAllByRole('article')).toHaveLength(2);
      expect(screen.getByRole('status')).toHaveTextContent(`2 concepts · ${category}`);
      for (const title of titles)
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    await user.click(within(filters).getByRole('button', { name: 'All concepts' }));
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(within(filters).getByRole('button', { name: 'All concepts' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('labels every project as a concept rather than presenting invented client work', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/not client case studies or shipped products/i)).toBeInTheDocument();
    const concepts = screen.getAllByRole('article');
    expect(concepts).toHaveLength(6);
    for (const concept of concepts) {
      expect(within(concept).getByText('Concept exploration')).toBeInTheDocument();
      expect(within(concept).getByRole('list', { name: /Concept tags/ })).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toMatch(
      /MediVision|GlobalRetail|SecureBank|Projects Delivered|Client Satisfaction|99\.2%|\$100M|12 engineers/,
    );
  });
});

describe('Industries', () => {
  it('lets keyboard users inspect six possible application areas without outcome claims', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <IndustriesPage />
      </MemoryRouter>,
    );
    const areas = screen.getByRole('region', { name: 'Where software can help' });
    const controls = within(areas).getAllByRole('button');
    expect(controls).toHaveLength(6);
    for (const button of controls) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      act(() => button.focus());
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const panel = document.getElementById(button.getAttribute('aria-controls')!);
      expect(panel).toBeVisible();
      expect(within(panel!).getByRole('heading', { name: 'What to validate' })).toBeInTheDocument();
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(panel).not.toBeVisible();
    }
    expect(
      screen.getByText(/application areas, not a list of client engagements/i),
    ).toBeInTheDocument();
    expect(areas.textContent).not.toMatch(/99\.2%|\$50M|HIPAA-compliant|deep domain expertise/);
  });
});

describe('Services', () => {
  it('offers four clearly scoped delivery disciplines with a real project enquiry link', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );
    const catalogue = screen.getByRole('region', { name: 'What we build' });
    expect(within(catalogue).getAllByRole('article')).toHaveLength(4);
    for (const name of [
      'Applied AI',
      'Web applications',
      'Mobile experiences',
      'Product delivery',
    ]) {
      expect(within(catalogue).getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /Discuss your project/ })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it('explains delivery as an ordered process with a tangible handover', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>,
    );
    const process = screen.getByRole('list', { name: 'Delivery process' });
    expect(within(process).getAllByRole('listitem')).toHaveLength(4);
    expect(
      within(process)
        .getAllByRole('heading')
        .map((heading) => heading.textContent),
    ).toEqual(['Frame the problem', 'Make it tangible', 'Build in the open', 'Launch & hand over']);
    expect(
      within(process).getByText(/source code, documentation, and a plan/i),
    ).toBeInTheDocument();
  });
});
