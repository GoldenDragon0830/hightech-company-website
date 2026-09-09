import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactBudgets, contactSchema, contactTopics, createContactDraft, MAX_BRIEF_LENGTH, type ContactBrief } from '@/lib/contact';

export default function ContactForm({ recipient }: { recipient: string }) {
  const [brief, setBrief] = useState<ContactBrief>({ name: '', email: '', topic: '', message: '', budget: '', company: '' });
  const [draft, setDraft] = useState<ReturnType<typeof createContactDraft> | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactBrief, string[]>>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const readyRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const hasPrepared = useRef(false);
  const copyVersion = useRef(0);

  useEffect(() => {
    if (draft) readyRef.current?.focus();
    else if (hasPrepared.current) nameRef.current?.focus();
  }, [draft]);

  async function copyBriefing() {
    if (!draft) return;
    const version = ++copyVersion.current;
    setCopyStatus('');
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(draft.briefing);
      if (version !== copyVersion.current) return;
      setCopyStatus('Briefing copied. Paste it into your email app, then press Send.');
    } catch {
      if (version !== copyVersion.current) return;
      setCopyFailed(true);
    }
  }

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse(brief);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      const firstField = Object.keys(fieldErrors)[0];
      const control = event.currentTarget.elements.namedItem(firstField);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    setErrors({});
    copyVersion.current += 1;
    setCopyStatus('');
    setCopyFailed(false);
    hasPrepared.current = true;
    setDraft(createContactDraft(result.data, recipient));
  }

  function fieldProps(field: keyof ContactBrief) {
    return {
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': [field === 'message' ? 'contact-message-help' : '', errors[field] ? `contact-${field}-error` : ''].filter(Boolean).join(' ') || undefined,
    };
  }

  return (
    <div className="contact-form-panel">
      <p className="section-label">Your project / Email briefing</p>
      <h2 id="contact-form-heading">A little context goes a long way.</h2>
      <p id="contact-draft-help">This form prepares a draft. You still need to press Send in your email app.</p>
      {draft ? (
        <section className="contact-ready" aria-labelledby="contact-ready-heading">
          <h3 ref={readyRef} tabIndex={-1} id="contact-ready-heading">Your draft is ready</h3>
          <p>Nothing has been sent. Review your draft and press Send in your email app.</p>
          {draft.needsManualPaste && <p className="contact-copy-fallback">This brief is too long for a reliable email link. Copy the briefing below, open your email app, then paste it before sending. The link will fill only the recipient and subject.</p>}
          <div className="contact-ready-actions">
            <a className="button button-primary" href={draft.href}>Open email app</a>
            <button className="button button-outline" type="button" onClick={copyBriefing}>Copy briefing</button>
          </div>
          <p>No email app configured? Copy the briefing and paste it into a new message in your preferred email service.</p>
          <p role="status">{copyStatus}</p>
          {copyFailed && (
            <div className="contact-copy-fallback">
              <p role="alert">Automatic copy is unavailable. Select the briefing below, then use your device’s Copy command. Paste it into your email app and press Send.</p>
              <button type="button" className="text-link" onClick={() => { previewRef.current?.focus(); previewRef.current?.select(); }}>Select briefing text</button>
            </div>
          )}
          <div className="contact-field">
            <label htmlFor="contact-preview">Email briefing</label>
            <textarea ref={previewRef} id="contact-preview" readOnly rows={10} value={draft.briefing} />
          </div>
          <button className="text-link" type="button" onClick={() => { copyVersion.current += 1; setDraft(null); }}>Edit brief</button>
        </section>
      ) : (
        <form noValidate onSubmit={prepareDraft} aria-labelledby="contact-form-heading" aria-describedby="contact-draft-help">
          {Object.keys(errors).length > 0 && <p role="alert" className="contact-error-summary">Check the highlighted fields before preparing your draft.</p>}
          <div className="contact-field">
            <label htmlFor="contact-name">Your name (required)</label>
            <input ref={nameRef} required maxLength={80} {...fieldProps('name')} id="contact-name" name="name" autoComplete="name" value={brief.name} onChange={(event) => setBrief({ ...brief, name: event.target.value })} />
            {errors.name && <p id="contact-name-error" className="contact-error">{errors.name[0]}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email address (required)</label>
            <input required maxLength={254} {...fieldProps('email')} id="contact-email" name="email" type="email" autoComplete="email" value={brief.email} onChange={(event) => setBrief({ ...brief, email: event.target.value })} />
            {errors.email && <p id="contact-email-error" className="contact-error">{errors.email[0]}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-topic">Topic (required)</label>
            <select required {...fieldProps('topic')} id="contact-topic" name="topic" value={brief.topic} onChange={(event) => setBrief({ ...brief, topic: event.target.value })}>
              <option value="">Choose a topic</option>
              {contactTopics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>
            {errors.topic && <p id="contact-topic-error" className="contact-error">{errors.topic[0]}</p>}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-budget">Budget in USD (optional)</label>
            <select {...fieldProps('budget')} id="contact-budget" name="budget" value={brief.budget} onChange={(event) => setBrief({ ...brief, budget: event.target.value })}>
              <option value="">Prefer not to say</option>
              {contactBudgets.map((budget) => <option key={budget}>{budget}</option>)}
            </select>
            {errors.budget && <p id="contact-budget-error" className="contact-error">{errors.budget[0]}</p>}
          </div>
          <div className="contact-field contact-field-wide">
            <label htmlFor="contact-company">Company (optional)</label>
            <input maxLength={100} {...fieldProps('company')} id="contact-company" name="company" autoComplete="organization" value={brief.company} onChange={(event) => setBrief({ ...brief, company: event.target.value })} />
            {errors.company && <p id="contact-company-error" className="contact-error">{errors.company[0]}</p>}
          </div>
          <div className="contact-field contact-field-wide">
            <label htmlFor="contact-message">Project brief (required)</label>
            <textarea required minLength={20} maxLength={MAX_BRIEF_LENGTH} {...fieldProps('message')} id="contact-message" name="message" rows={6} value={brief.message} onChange={(event) => setBrief({ ...brief, message: event.target.value })} />
            <p id="contact-message-help" className="contact-field-help">Your goal, who it is for, and any timing or technical constraints. 20 characters minimum. 1,200 characters maximum. <span className="contact-count">{brief.message.length} / {MAX_BRIEF_LENGTH}</span></p>
            {errors.message && <p id="contact-message-error" className="contact-error">{errors.message[0]}</p>}
          </div>
          <button className="button button-primary" type="submit">Prepare email draft</button>
        </form>
      )}
      <div className="contact-privacy" id="contact-privacy">
        <p><strong>Your details, your choice.</strong> This form does not send or save your details to a server. The brief is held in this page’s memory. Copy anything you want to keep before leaving.</p>
        <p>Opening your email app passes the draft to that app. Copying puts the briefing on your device’s clipboard. Your email provider handles the message when you send it.</p>
        <p>Do not include passwords, access keys, payment details or sensitive personal data.</p>
      </div>
    </div>
  );
}
