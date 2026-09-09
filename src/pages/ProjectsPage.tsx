import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/motion/Reveal';
import ContactCTA from '@/components/shared/ContactCTA';
import projects from '@/data/projects.json';
import '@/styles/capabilities.css';

const categories = ['All concepts', ...new Set(projects.map(project => project.category))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All concepts');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const visibleProjects = activeCategory === 'All concepts' ? projects : projects.filter(project => project.category === activeCategory);
  return (
    <>
      <PageHero eyebrow="Projects / The concept collection" title={<>Room to explore.<br /><span className="muted">Ideas to build on.</span></>} description="A collection of software directions, framed around useful questions. Browse the possibilities, look under the surface, and imagine what comes next.">
        <Link className="text-link" to="/services">How we build <span aria-hidden="true">↗</span></Link>
      </PageHero>
      <section className="section paper-section" aria-labelledby="concept-heading">
        <div className="shell">
          <div className="concept-intro"><div><p className="section-label">01 / Concept explorations</p><h2 className="section-heading" id="concept-heading">The possibility files.</h2></div><p className="notice">These are illustrative concepts, not client case studies or shipped products. Names and visuals are invented to explore an idea; no client results are claimed.</p></div>
          <div className="project-toolbar">
            <div className="project-filters" role="group" aria-label="Filter concepts">{categories.map(category => <button className="project-filter" key={category} type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setExpandedProject(null); }}>{category}</button>)}</div>
            <p className="project-count" role="status" aria-live="polite" aria-atomic="true">{visibleProjects.length} concepts · {activeCategory}</p>
          </div>
          <div className="project-grid">
            {visibleProjects.map(project => (
              <Reveal key={project.id}>
                <article className="concept-card" aria-labelledby={`concept-${project.id}`}>
                  <div className={`cap-concept-art cap-concept-art--${project.art}`} aria-hidden="true"><span className="art-registration">HT / EXP. 0{projects.indexOf(project) + 1}</span><div className="art-elements">{Array.from({ length: 12 }, (_, i) => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div><span className="art-caption">{project.artLabel}</span><span className="art-plus">+</span></div>
                  <div className="concept-copy"><div className="concept-meta"><span>Concept exploration</span><span>{project.category}</span></div><h3 id={`concept-${project.id}`}>{project.title}</h3><p className="concept-domain">{project.domain}</p><p className="concept-description">{project.description}</p><ul className="tags concept-tags" aria-label={`Concept tags: ${project.title}`}>{project.tags.map(tag => <li className="tag" key={tag}>{tag}</li>)}</ul></div>
                  <button className="project-toggle" type="button" id={`concept-control-${project.id}`} aria-expanded={expandedProject === project.id} aria-controls={`concept-panel-${project.id}`} onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>{expandedProject === project.id ? `Close ${project.title} details` : `Explore ${project.title}`}<span aria-hidden="true">{expandedProject === project.id ? '−' : '+'}</span></button>
                  <div id={`concept-panel-${project.id}`} role="region" aria-labelledby={`concept-control-${project.id}`} className="concept-detail" hidden={expandedProject !== project.id}>
                    <h4>The question</h4><p>{project.question}</p>
                    <h4>A possible direction</h4><p>{project.approach}</p>
                    <h4>Before a real build</h4><p>{project.validation}</p>
                    <Link className="text-link" to="/contact">Discuss a similar idea <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA title="What could your idea become?" description="These concepts are a starting point for a conversation, not a catalogue of ready-made products. Let’s work out what your version needs." />
    </>
  );
}
