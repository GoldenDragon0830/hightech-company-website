import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/motion/Reveal';
import ContactCTA from '@/components/shared/ContactCTA';
import '@/styles/capabilities.css';

const services = [
  {
    id: 'ai', title: 'Applied AI', note: 'Useful intelligence. Human oversight.',
    description: 'Find where AI helps, test it against real tasks, and connect it to your product. Start with a focused experiment, not a promise to automate everything.',
    outputs: ['AI feasibility & evaluation', 'Knowledge search & assistants', 'Workflow integrations'],
  },
  {
    id: 'web', title: 'Web applications', note: 'From a browser tab to a working business.',
    description: 'Build the customer-facing product or internal tool your workflow needs. Clear interfaces, dependable APIs, and a codebase your team can keep working with.',
    outputs: ['Customer portals & SaaS', 'Internal tools & dashboards', 'APIs & system integrations'],
  },
  {
    id: 'mobile', title: 'Mobile experiences', note: 'Good software, away from the desk.',
    description: 'Shape focused mobile experiences around the people using them. Work through connectivity, device capabilities, and release requirements from the beginning.',
    outputs: ['Cross-platform applications', 'Mobile UX & prototyping', 'Release preparation'],
  },
  {
    id: 'product', title: 'Product delivery', note: 'A clear path from question to release.',
    description: 'Turn a rough brief into a practical first release. Pair product thinking with design and engineering, then leave room to learn from the people using it.',
    outputs: ['Discovery & technical planning', 'Interface design & prototypes', 'Testing, release & handover'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services / What we do" title={<>Good ideas deserve<br />well-built software.</>} description="A small software studio for the whole journey: a sharper brief, a useful first release, and the engineering to keep it moving.">
        <Link className="button button-primary" to="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
      </PageHero>
      <section className="section paper-section" aria-labelledby="service-catalogue-heading">
        <div className="shell">
          <div className="section-heading-row">
            <div><p className="section-label">01 / Capabilities</p><h2 id="service-catalogue-heading" className="section-heading">What we build</h2></div>
            <p className="section-intro">Four connected disciplines.<br />One team around the problem.</p>
          </div>
          <Reveal className="service-catalogue">
            {services.map((service, index) => (
              <article key={service.id} className="service-row" aria-labelledby={`service-${service.id}`}>
                <span className="cap-index" aria-hidden="true">0{index + 1}</span>
                <div><h3 id={`service-${service.id}`}>{service.title}</h3><p className="service-note">{service.note}</p></div>
                <div className="service-description"><p>{service.description}</p><ul className="service-deliverables">{service.outputs.map(output => <li key={output}>{output}</li>)}</ul></div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section" aria-labelledby="delivery-heading">
        <Reveal className="shell split-layout">
          <div><p className="section-label">02 / How it comes together</p><h2 id="delivery-heading" className="section-heading">Small steps.<br />Visible progress.</h2><p className="section-intro">Agree the scope together. Test the risky parts early. Keep decisions close to the people doing the work.</p></div>
          <ol className="delivery-process" aria-label="Delivery process">
            {[
              ['Frame the problem', 'Understand the users, constraints, and existing systems. Agree what a useful first release needs to do.'],
              ['Make it tangible', 'Use a prototype or technical experiment to test the important assumptions before committing to a full build.'],
              ['Build in the open', 'Review working software together. Keep testing, feedback, and scope decisions part of the same conversation.'],
              ['Launch & hand over', 'Prepare the release with source code, documentation, and a plan for support agreed before handover.'],
            ].map(([title, description], index) => <li key={title}><span className="cap-index" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
          </ol>
        </Reveal>
      </section>
      <ContactCTA title="A problem worth solving?" description="Tell us where you are, what needs to change, and what a useful first step would look like." />
    </>
  );
}
