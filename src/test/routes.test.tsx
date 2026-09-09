import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('page routes', () => {
  it('honors a deep link and exposes a main landmark', () => {
    render(<MemoryRouter initialEntries={['/services']}><App /></MemoryRouter>);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(document.querySelector('nav[aria-label="Main navigation"] a[href="/services"]')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('heading', { level: 1, name: /Good ideas/ })).not.toBeInTheDocument();
  });
});
