import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/motion/Reveal';
import ContactCTA from '@/components/shared/ContactCTA';
import '@/styles/capabilities.css';

const industries = [
  { id: 'healthcare', title: 'Healthcare & life sciences', focus: 'Less friction around care.', description: 'Scheduling, intake, and document workflows that help teams spend less time moving information between systems.', possibilities: ['Patient intake & scheduling', 'Secure document workflows', 'Operational reporting'], validation: 'Data access, consent, retention, and clinical boundaries come first. Any clinical functionality needs qualified domain partners and separate regulatory review.' },
  { id: 'commerce', title: 'Commerce & retail', focus: 'Connect the storefront to the back office.', description: 'Customer experiences and operational tools that keep catalogues, orders, and people working together.', possibilities: ['Storefront & checkout experiences', 'Catalogue & inventory integrations', 'Customer support tools'], validation: 'Start with the existing commerce platform, payment boundaries, and the quality of product data. Test changes with real shopping tasks, not assumed conversion gains.' },
  { id: 'finance', title: 'Finance & operations', focus: 'Make complex workflows legible.', description: 'Tools for reviewing documents, reconciling information, and making decisions with an understandable audit trail.', possibilities: ['Document review workspaces', 'Reconciliation tools', 'Permissioned reporting'], validation: 'Confirm access controls, audit requirements, and data handling with your compliance team. Software should support accountable human decisions, not promise financial outcomes.' },
  { id: 'education', title: 'Education & learning', focus: 'More room for the learner.', description: 'Focused learning experiences that make content easier to navigate and give educators practical tools.', possibilities: ['Learning portals', 'Content authoring workflows', 'Progress & feedback tools'], validation: 'Test accessibility, learner privacy, and how progress is represented. Involve educators before proposing automated feedback or assessment.' },
  { id: 'manufacturing', title: 'Manufacturing & field work', focus: 'Bring the work off the spreadsheet.', description: 'Interfaces that connect people on the floor with the information and maintenance workflows they need.', possibilities: ['Maintenance & inspection logs', 'Equipment data interfaces', 'Mobile work instructions'], validation: 'Understand device constraints, connectivity, and safety procedures. Predictions would need suitable historical data and validation; they are not a default feature.' },
  { id: 'logistics', title: 'Logistics & supply chain', focus: 'A clearer view of what moves next.', description: 'Shared tools for planning, dispatch, and exception handling across a moving operation.', possibilities: ['Dispatch planning workspaces', 'Shipment tracking integrations', 'Delivery exception tools'], validation: 'Check data freshness, mapping licences, and the operational limits behind a route. Keep dispatchers able to review and override suggestions.' },
];

export default function IndustriesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <PageHero eyebrow="Industries / Different contexts. Same care." title={<>Start with the work.<br />Not the buzzwords.</>} description="Every domain has its own constraints. We bring software thinking, ask specific questions, and work with the people who know the field." />
      <section className="section paper-section" aria-labelledby="industry-heading">
        <Reveal className="shell industry-layout">
          <div className="industry-intro"><p className="section-label">01 / Application areas</p><h2 className="section-heading" id="industry-heading">Where software<br />can help</h2><p className="section-intro">These are application areas, not a list of client engagements or claims of specialist certification.</p><p className="industry-hint">Choose an area to see possible starting points and the questions worth asking.</p><Link className="text-link" to="/services">Explore our capabilities <span aria-hidden="true">↗</span></Link></div>
          <div className="industry-list">
            {industries.map((industry, index) => {
              const isExpanded = expanded === industry.id;
              return (
                <article key={industry.id} className="industry-entry">
                  <h3><button type="button" id={`industry-control-${industry.id}`} aria-expanded={isExpanded} aria-controls={`industry-panel-${industry.id}`} onClick={() => setExpanded(isExpanded ? null : industry.id)} className="industry-control"><span className="cap-index" aria-hidden="true">0{index + 1}</span><span>{industry.title}<span className="industry-focus">{industry.focus}</span></span><span className="disclosure-mark" aria-hidden="true">{isExpanded ? '−' : '+'}</span></button></h3>
                  <div id={`industry-panel-${industry.id}`} role="region" aria-labelledby={`industry-control-${industry.id}`} hidden={!isExpanded} className="industry-panel">
                    <p>{industry.description}</p>
                    <ul className="rule-list">{industry.possibilities.map(possibility => <li key={possibility}>{possibility}</li>)}</ul>
                    <h4>What to validate</h4><p>{industry.validation}</p>
                    <Link className="text-link" to="/contact">Talk through your context <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </section>
      <ContactCTA title="Your context comes first." description="Tell us about the workflow, the people, and the constraints. We’ll work out whether we’re a useful fit." />
    </>
  );
}
