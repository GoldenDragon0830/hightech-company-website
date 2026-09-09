import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import { site } from '@/data/site';
import '@/styles/contact.css';

const faqs = [
  {
    question: 'Does preparing a draft send you a message?',
    answer: 'No. Preparing a draft only formats your brief on this page. Open your email app, review the recipient, subject and message, then press Send. This website cannot confirm whether you sent an email or whether it was delivered.',
  },
  {
    question: 'What should I include in a first message?',
    answer: 'Tell us what you want to make or improve, who will use it, and what exists today. A rough timeline and any technical constraints help. Budget is optional, and the ranges in this form are context for a conversation—not a quote or a minimum project size.',
  },
  {
    question: 'Can I attach files?',
    answer: 'Add attachments in your email app after opening the draft. This form does not upload files. Start with a short, non-confidential overview; agree a suitable sharing process with us before sending proprietary code, credentials or personal data.',
  },
  {
    question: 'What if the email link does not open?',
    answer: 'Your browser needs a configured email app to open mailto links. Use Copy briefing instead, open your preferred email service, and paste the text into a new message. The briefing includes our email address and a suggested subject. If automatic copying is blocked, use Select briefing text and your device’s Copy command.',
  },
  {
    question: 'How soon can a project start?',
    answer: 'Timing depends on the scope and current availability. Share any deadline in your brief so it can be discussed before agreeing on work. Submitting an email or scheduling a conversation does not reserve a start date or create a project agreement.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Start a conversation"
        title={<>Good work starts with<br /> a conversation.</>}
        description="A new product, a difficult technical question, or a system that needs to work better. Tell us where you want to go."
      >
        <a className="text-link" href={site.calendly} target="_blank" rel="noopener noreferrer">
          Schedule a conversation <span aria-hidden="true">↗</span>
        </a>
      </PageHero>

      <section className="section paper-section contact-composition" aria-label="Get in touch">
        <div className="shell contact-layout">
          <aside className="contact-info" aria-labelledby="contact-info-heading">
            <p className="section-label">01 / Make the introduction</p>
            <h2 id="contact-info-heading">Bring the problem.<br />Not just the spec.</h2>
            <p className="section-intro">You do not need a finished brief to begin. A useful question and a little context are enough to start talking.</p>
            <dl className="contact-directory">
              <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>Phone</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd></div>
              <div><dt>Address</dt><dd><address>{site.address}</address></dd></div>
            </dl>
            <div className="contact-next">
              <p className="section-label">Prefer to talk?</p>
              <p>The scheduling link opens Calendly in a new tab. Available times and booking details are shown there; Calendly handles the information you enter on its site.</p>
            </div>
            <Link className="text-link" to="/services">Explore our services <span aria-hidden="true">↗</span></Link>
          </aside>
          <ContactForm recipient={site.email} />
        </div>
      </section>

      <section className="section contact-faq" aria-labelledby="contact-faq-heading">
        <div className="shell contact-faq-layout">
          <div>
            <p className="section-label">02 / Before you reach out</p>
            <h2 id="contact-faq-heading" className="section-heading">A few useful<br />details.</h2>
            <p className="section-intro">What this form does, what it does not, and how to make the first conversation useful.</p>
          </div>
          <div className="contact-faq-list">
            {faqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<span className="contact-faq-symbol" aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
