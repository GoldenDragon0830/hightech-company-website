import { z } from 'zod';

export const contactTopics = [
  'Web application',
  'Mobile application',
  'AI & automation',
  'Technical discovery',
  'Something else',
] as const;
export const contactBudgets = [
  'Not sure yet',
  'Under $10,000',
  '$10,000–$25,000',
  '$25,000–$50,000',
  '$50,000+',
] as const;
export const MAX_BRIEF_LENGTH = 1200;
export const MAX_MAILTO_LENGTH = 1800;

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(80, 'Keep your name to 80 characters.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(254, 'Keep your email address to 254 characters.'),
  topic: z.enum(contactTopics, { errorMap: () => ({ message: 'Choose a topic.' }) }),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little about your project (at least 20 characters).')
    .max(MAX_BRIEF_LENGTH, 'Keep your brief to 1,200 characters.'),
  budget: z.enum(['', ...contactBudgets], {
    errorMap: () => ({ message: 'Choose a budget option or leave it blank.' }),
  }),
  company: z.string().trim().max(100, 'Keep your company name to 100 characters.'),
});

export interface ContactBrief {
  name: string;
  email: string;
  topic: string;
  message: string;
  budget: string;
  company: string;
}

export function createContactDraft(brief: ContactBrief, recipient: string) {
  const subject = `Project enquiry — ${brief.topic}`;
  const body = [
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    `Company: ${brief.company || 'Not specified'}`,
    `Topic: ${brief.topic}`,
    `Budget: ${brief.budget || 'Not specified'}`,
    '',
    'Project brief:',
    brief.message,
  ].join('\n');
  // URLSearchParams safely encodes user text (including malformed Unicode).
  // Mailto clients expect percent-encoded spaces rather than form-style '+'.
  const parameters = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20');
  const completeHref = `mailto:${recipient}?${parameters}`;
  const needsManualPaste = completeHref.length > MAX_MAILTO_LENGTH;
  const subjectOnly = new URLSearchParams({ subject }).toString().replace(/\+/g, '%20');

  return {
    subject,
    body,
    briefing: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
    needsManualPaste,
    href: needsManualPaste ? `mailto:${recipient}?${subjectOnly}` : completeHref,
  };
}
