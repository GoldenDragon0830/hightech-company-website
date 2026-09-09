import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ContactPage from '@/pages/ContactPage';
import { contactSchema, createContactDraft } from '@/lib/contact';

function renderContact() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  );
}

async function fillBrief(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByLabelText(/^Your name/));
  await user.paste('Ada Lovelace');
  await user.click(screen.getByLabelText(/^Email address/));
  await user.paste('ada@example.com');
  await user.selectOptions(screen.getByLabelText(/^Topic/), 'Web application');
  await user.click(screen.getByLabelText(/^Project brief/));
  await user.paste('We need an accessible customer portal. Target launch: autumn.');
}

describe('contact draft workflow', () => {
  it('keeps preparation local without network transmission or browser storage', async () => {
    const user = userEvent.setup();
    const fetch = vi.spyOn(globalThis, 'fetch');
    const xhr = vi.spyOn(XMLHttpRequest.prototype, 'send');
    const storage = vi.spyOn(Storage.prototype, 'setItem');
    const openWindow = vi.spyOn(window, 'open');
    const { unmount } = renderContact();
    await fillBrief(user);
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(fetch).not.toHaveBeenCalled();
    expect(xhr).not.toHaveBeenCalled();
    expect(storage).not.toHaveBeenCalled();
    expect(openWindow).not.toHaveBeenCalled();
    unmount();
    renderContact();
    expect(screen.getByLabelText(/^Your name/)).toHaveValue('');
    expect(screen.queryByRole('heading', { name: 'Your draft is ready' })).not.toBeInTheDocument();
  });

  it('does not report an earlier clipboard operation as success for an edited draft', async () => {
    const user = userEvent.setup();
    let resolveCopy!: () => void;
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveCopy = resolve;
        }),
    );
    renderContact();
    await fillBrief(user);
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    await user.click(screen.getByRole('button', { name: 'Copy briefing' }));
    await user.click(screen.getByRole('button', { name: 'Edit brief' }));
    fireEvent.change(screen.getByLabelText(/^Project brief/), {
      target: { value: 'A different brief for a different product.' },
    });
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    await act(async () => {
      resolveCopy();
    });
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('shows verified contact routes, clear data handling and native disclosure FAQs', async () => {
    const user = userEvent.setup();
    renderContact();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Good work starts with a conversation.',
    );
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'contact@hightech.fit' })).toHaveAttribute(
      'href',
      'mailto:contact@hightech.fit',
    );
    expect(screen.getByRole('link', { name: '+1 (540) 952-9270' })).toHaveAttribute(
      'href',
      'tel:+15409529270',
    );
    expect(screen.getByText('24 East Clairmont Drive, Newark, DE 19702')).toBeVisible();
    expect(screen.getByRole('link', { name: /Schedule a conversation/ })).toHaveAttribute(
      'href',
      'https://calendly.com/goldendragon0830-hightech/30min',
    );
    expect(screen.getByRole('link', { name: /Explore our services/ })).toHaveAttribute(
      'href',
      '/services',
    );
    expect(
      screen.getByText(/This form does not send or save your details to a server/),
    ).toBeVisible();
    expect(screen.getByText(/Do not include passwords/)).toBeVisible();
    const summary = screen.getByText('Can I attach files?');
    // JSDOM does not implement native summary keyboard activation; browser QA covers Enter.
    await user.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
    expect(screen.getByText(/Add attachments in your email app/)).toBeVisible();
    expect(
      screen.queryByText(/SOC 2 compliant|reply within 24 hours|San Francisco|London/),
    ).not.toBeInTheDocument();
  });

  it('keeps a long Unicode brief intact in the copy fallback rather than an oversized mailto URL', async () => {
    const user = userEvent.setup();
    renderContact();
    await fillBrief(user);
    const message = '界'.repeat(600);
    fireEvent.change(screen.getByLabelText(/^Project brief/), { target: { value: message } });
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(screen.getByText(/This brief is too long for a reliable email link/)).toBeVisible();
    const href = screen.getByRole('link', { name: 'Open email app' }).getAttribute('href')!;
    expect(href.length).toBeLessThanOrEqual(1800);
    expect(new URL(href).searchParams.has('body')).toBe(false);
    expect(
      (screen.getByRole('textbox', { name: 'Email briefing' }) as HTMLTextAreaElement).value,
    ).toContain(message);
  });

  it('encodes email body data without allowing extra mail headers, even with malformed Unicode', () => {
    const message = 'Portal needs: A&B? #1 + 日本語\n&bcc=other@example.com \ud800';
    const draft = createContactDraft(
      {
        name: 'Ada',
        email: 'ada+studio@example.com',
        company: '',
        topic: 'Web application',
        budget: '',
        message,
      },
      'contact@hightech.fit',
    );
    const mail = new URL(draft.href);
    expect([...mail.searchParams.keys()]).toEqual(['subject', 'body']);
    expect(mail.searchParams.get('body')).toContain('ada+studio@example.com');
    expect(mail.searchParams.get('body')).toContain('A&B? #1 + 日本語\n&bcc=other@example.com');
  });

  it('caps the brief with an accessible character count and validates oversized input', async () => {
    const user = userEvent.setup();
    renderContact();
    await fillBrief(user);
    const message = screen.getByLabelText(/^Project brief/);
    expect(message).toHaveAttribute('maxlength', '1200');
    expect(message).toHaveAccessibleDescription(/1,200 characters maximum/);
    fireEvent.change(message, { target: { value: 'x'.repeat(1201) } });
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(message).toHaveAccessibleDescription(/Keep your brief to 1,200 characters/);
    expect(message).toHaveFocus();
    expect(screen.queryByRole('link', { name: 'Open email app' })).not.toBeInTheDocument();
  });

  it.each([
    ['name', 'a'.repeat(81)],
    ['company', 'a'.repeat(101)],
    ['email', 'invalid-email'],
    ['name', '   '],
    ['message', '   '],
    ['message', 'Too short'],
    ['message', 'a'.repeat(1201)],
    ['topic', 'Invented topic'],
    ['budget', 'Invented budget'],
  ])('rejects invalid %s values before drafting', (field, value) => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      company: '',
      topic: 'Web application',
      budget: '',
      message: 'A customer portal for our existing product.',
      [field]: value,
    });
    expect(result.success).toBe(false);
  });

  it('includes optional company and budget in a topic-specific draft', async () => {
    const user = userEvent.setup();
    renderContact();
    const company = screen.getByLabelText('Company (optional)');
    const budget = screen.getByLabelText('Budget in USD (optional)');
    expect(company).not.toBeRequired();
    expect(budget).not.toBeRequired();
    await fillBrief(user);
    await user.type(company, 'Lovelace & Co.');
    await user.selectOptions(budget, '$25,000–$50,000');
    await user.selectOptions(screen.getByLabelText(/^Topic/), 'AI & automation');
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    const mail = new URL(
      screen.getByRole('link', { name: 'Open email app' }).getAttribute('href')!,
    );
    expect(mail.searchParams.get('subject')).toBe('Project enquiry — AI & automation');
    expect(mail.searchParams.get('body')).toContain('Company: Lovelace & Co.');
    expect(mail.searchParams.get('body')).toContain('Budget: $25,000–$50,000');
  });

  it('preserves the brief when editing a prepared draft with keyboard focus restored', async () => {
    const user = userEvent.setup();
    renderContact();
    await fillBrief(user);
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(screen.getByRole('heading', { name: 'Your draft is ready' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Edit brief' }));
    const name = screen.getByLabelText(/^Your name/);
    expect(name).toHaveValue('Ada Lovelace');
    expect(name).toHaveFocus();
    expect(screen.getByLabelText(/^Topic/)).toHaveValue('Web application');
    const message = screen.getByLabelText(/^Project brief/);
    await user.clear(message);
    await user.type(message, 'Updated brief: improve our existing portal.');
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(
      (screen.getByRole('textbox', { name: 'Email briefing' }) as HTMLTextAreaElement).value,
    ).toContain('Updated brief: improve our existing portal.');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it.each(['denied', 'unavailable'] as const)(
    'offers selectable text when clipboard is %s',
    async (mode) => {
      const user = userEvent.setup();
      if (mode === 'denied')
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
          new Error('Permission denied'),
        );
      else
        vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined as unknown as Clipboard);
      renderContact();
      await fillBrief(user);
      await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
      await user.click(screen.getByRole('button', { name: 'Copy briefing' }));
      expect(await screen.findByRole('alert')).toHaveTextContent('Automatic copy is unavailable');
      expect(screen.getByRole('status')).not.toHaveTextContent('Briefing copied');
      await user.click(screen.getByRole('button', { name: 'Select briefing text' }));
      const preview = screen.getByRole('textbox', {
        name: 'Email briefing',
      }) as HTMLTextAreaElement;
      expect(preview).toHaveFocus();
      expect(preview.selectionStart).toBe(0);
      expect(preview.selectionEnd).toBe(preview.value.length);
      expect(screen.getByRole('link', { name: 'Open email app' })).toBeVisible();
    },
  );

  it('copies a complete briefing without claiming email delivery', async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    renderContact();
    await fillBrief(user);
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    const preview = screen.getByRole('textbox', { name: 'Email briefing' });
    expect(preview).toHaveAttribute('readonly');
    await user.click(screen.getByRole('button', { name: 'Copy briefing' }));
    expect(copy).toHaveBeenCalledWith((preview as HTMLTextAreaElement).value);
    expect(copy.mock.calls[0][0]).toContain('To: contact@hightech.fit');
    expect(copy.mock.calls[0][0]).toContain('Subject: Project enquiry — Web application');
    expect(screen.getByRole('status')).toHaveTextContent(
      'Briefing copied. Paste it into your email app, then press Send.',
    );
    expect(screen.getByText(/Nothing has been sent/)).toBeVisible();
  });

  it('blocks incomplete briefs with linked inline errors and focus on the first field', async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Check the highlighted fields');
    const name = screen.getByLabelText(/^Your name/);
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Enter your name.');
    expect(screen.getByLabelText(/^Email address/)).toHaveAccessibleDescription(
      'Enter a valid email address.',
    );
    expect(screen.getByLabelText(/^Topic/)).toHaveAccessibleDescription('Choose a topic.');
    expect(screen.getByLabelText(/^Project brief/)).toHaveAccessibleDescription(
      /Tell us a little about your project/,
    );
    expect(screen.queryByRole('link', { name: 'Open email app' })).not.toBeInTheDocument();
    await fillBrief(user);
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your draft is ready' })).toBeVisible();
  });

  it('prepares an email draft instead of claiming a message was sent', async () => {
    const user = userEvent.setup();
    renderContact();
    const prepare = screen.getByRole('button', { name: 'Prepare email draft' });
    expect(screen.getByText(/You still need to press Send in your email app/)).toBeVisible();
    await fillBrief(user);
    await user.click(prepare);
    expect(screen.getByRole('heading', { name: 'Your draft is ready' })).toBeVisible();
    expect(screen.getByText(/Nothing has been sent/)).toBeVisible();
    expect(screen.queryByText(/Message Sent!/i)).not.toBeInTheDocument();
    const mail = new URL(
      screen.getByRole('link', { name: 'Open email app' }).getAttribute('href')!,
    );
    expect(mail.protocol).toBe('mailto:');
    expect(mail.pathname).toBe('contact@hightech.fit');
    expect(mail.searchParams.get('subject')).toBe('Project enquiry — Web application');
    expect(mail.searchParams.get('body')).toContain('Ada Lovelace');
    expect(mail.searchParams.get('body')).toContain('ada@example.com');
    expect(mail.searchParams.get('body')).toContain('Budget: Not specified');
    expect(mail.searchParams.get('body')).toContain(
      'We need an accessible customer portal. Target launch: autumn.',
    );
  });
});
