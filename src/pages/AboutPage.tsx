import { Link } from 'react-router-dom';
import Reveal from '@/components/motion/Reveal';
import PageHero from '@/components/shared/PageHero';
import ContactCTA from '@/components/shared/ContactCTA';
import TeamSection from '@/components/team/TeamSection';
import '@/styles/team.css';

const principles = [
  {
    title: 'Make the problem clear.',
    description: 'Start with the people using the product. Agree on the problem, the constraints, and what useful progress looks like before choosing the technology.',
  },
  {
    title: 'Build in the open.',
    description: 'Use working software and direct conversations to make decisions visible. Share the trade-offs, invite feedback, and keep the next step understandable.',
  },
  {
    title: 'Leave something maintainable.',
    description: 'Prefer readable code, considered interfaces, and tests that protect the important things. Make room for documentation and the people who will take the work forward.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About / Independent software studio"
        title={<>Small team.<br /><span className="muted">Serious craft.</span></>}
        description="HighTech brings product thinking, design, and engineering into the same conversation. Our focus is straightforward: useful software, thoughtfully made."
      >
        <Link to="/services" className="text-link">Explore our capabilities <span aria-hidden="true">↗</span></Link>
      </PageHero>

      <section className="section paper-section about-perspective" aria-labelledby="about-perspective-heading">
        <Reveal className="shell about-perspective__layout">
          <div>
            <p className="section-label">Our point of view</p>
            <h2 className="section-heading" id="about-perspective-heading">Software should<br />earn its place.</h2>
          </div>
          <div className="about-perspective__copy">
            <p className="about-perspective__lead">Not more technology for its own sake. The right tools, applied with intention.</p>
            <p>A good product makes a difficult task feel simpler. It respects the people using it, works within real constraints, and stays understandable as it grows.</p>
            <p>That is the standard we want to build around. From an early product idea to a focused improvement, the work starts with listening—not a predetermined stack.</p>
          </div>
        </Reveal>
      </section>

      <section className="section about-principles" aria-labelledby="about-principles-heading">
        <div className="shell about-principles__layout">
          <Reveal className="about-principles__intro">
            <p className="section-label">Working principles</p>
            <h2 className="section-heading" id="about-principles-heading">Less ceremony.<br />More shared understanding.</h2>
            <p className="section-intro">A few practical principles to keep the work clear, collaborative, and grounded.</p>
            <Link to="/careers" className="text-link">Connect with the team <span aria-hidden="true">↗</span></Link>
          </Reveal>
          <Reveal>
            <ol className="about-principles__list">
              {principles.map((principle, index) => (
                <li key={principle.title}>
                  <span className="about-principles__number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{principle.title}</h3><p>{principle.description}</p></div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <TeamSection />
      <ContactCTA
        title="Good work starts with a clear conversation."
        description="Tell us what you are exploring, what is getting in the way, and where you want to go next."
      />
    </>
  );
}
