import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '@/components/layout/Header';

describe('site navigation', () => {
  it('provides real page URLs and a persistent motion pause control', async () => {
    localStorage.clear();
    render(<MemoryRouter><Header /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    await userEvent.click(screen.getByRole('button', { name: 'Pause animations' }));
    expect(document.documentElement).toHaveAttribute('data-motion', 'paused');
    expect(localStorage.getItem('hightech-motion')).toBe('paused');
    await userEvent.click(screen.getByRole('button', { name: 'Play animations' }));
    expect(document.documentElement).toHaveAttribute('data-motion', 'playing');
  });
});
