import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { teamMemberSchema, teamMembers } from '@/lib/team';
import TeamCard from '@/components/team/TeamCard';

describe('replacing examples with approved real team content', () => {
  it('accepts a real profile and a local photo through JSON', () => {
    const result = teamMemberSchema.safeParse({
      ...teamMembers[0],
      isSample: false,
      avatar: '/avatars/founder.webp',
    });
    expect(result.success).toBe(true);
  });
  it('does not label an approved real profile as fictional', () => {
    render(<TeamCard member={{ ...teamMembers[0], isSample: false }} />);
    expect(screen.queryByText('Sample profile')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      `${teamMembers[0].name} — ${teamMembers[0].role}`,
    );
  });
});
