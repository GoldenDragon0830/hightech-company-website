import { useId } from 'react';
import { teamMembers as team } from '@/lib/team';
import TeamCard from './TeamCard';
import '@/styles/team.css';

export default function TeamSection({ compact = false }: { compact?: boolean }) {
  const headingId = useId();
  const hasSamples = team.some((member) => member.isSample);
  return (
    <section
      className={`section paper-section team-section${compact ? ' team-section--compact' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="shell">
        <div className="team-section__heading">
          <div>
            <p className="section-label">The team{hasSamples ? ' / Sample profiles' : ''}</p>
            <h2 className="section-heading" id={headingId}>
              The people behind
              <br />
              the process.
            </h2>
          </div>
          <p className="section-intro">
            Different disciplines. A shared attention to the details that make software work for
            people.
          </p>
        </div>
        {hasSamples && (
          <p className="team-section__notice">
            Profiles marked “Sample profile” are fictional examples with illustrated avatars, not
            actual HighTech personnel.
          </p>
        )}
        <div className="team-grid">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
