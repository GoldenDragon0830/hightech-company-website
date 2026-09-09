import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
export default function ContactCTA({
  title = 'Your next chapter starts with a conversation.',
  description = 'Bring the ambition. We’ll bring the questions, the craft, and a clear way forward.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="contact-cta section">
      <Reveal className="shell contact-cta-inner">
        <div>
          <span className="section-label">Have something in mind?</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Link to="/contact" className="cta-arrow" aria-label="Start a conversation">
          <ArrowUpRight strokeWidth={1} />
          <span>Let’s talk</span>
        </Link>
      </Reveal>
    </section>
  );
}
