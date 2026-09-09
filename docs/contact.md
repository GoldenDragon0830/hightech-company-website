# Contact page: an honest email-draft workflow

## What the page does

- Uses the shared `site` contact details and existing Calendly link. The direct email and phone links work without the briefing form.
- Validates a name, email address, selected topic, and a 20–1,200-character project brief. Company and budget are optional. Names are capped at 80 characters, company names at 100, and email addresses at 254. The schema trims surrounding whitespace and restricts topic/budget values to the visible options.
- Prepares an email locally, then shows **Your draft is ready** and **Nothing has been sent**. The user must review and press **Send in their email app**. Opening the mailto link does not change the page to a sent/delivered state.
- Offers an encoded `mailto:` link and a complete, read-only briefing with recipient, subject and body. No API, provider account, server submission, credentials or secret was added.
- Limits encoded mailto URLs to 1,800 characters. If a brief exceeds that threshold, the link includes only recipient and subject, and an explicit notice tells the user to copy/paste the complete briefing. No brief text is silently truncated.
- Copies text only when requested. Denied or unavailable clipboard access produces an alert, a **Select briefing text** button and manual-copy instructions. Late clipboard results cannot claim success for a newer, edited draft.
- Retains form values when editing a draft. Moves focus to the first invalid field, the ready heading after preparation, and the name input after editing. Errors are linked to their fields. FAQs use native `details`/`summary` controls.

## Data handling and limitations

This form holds the brief in React memory, not localStorage/sessionStorage or a backend. Preparing a draft makes no network request and does not automatically open another app. Opening the mailto link passes draft data to the configured email app; copying puts it on the device clipboard. The page explains these transitions, discourages sensitive information and does not claim compliance certifications or a response-time guarantee.

A configured mailto handler is necessary for **Open email app** to work. Clipboard behavior varies by browser, secure-context status and permission. Users can always read/select the briefing. Actual email delivery, attachment handling, inbox monitoring, reply times and Calendly availability cannot be verified by this frontend. No real email was sent or booking created during testing.

## Files

- `src/pages/ContactPage.tsx`: editorial split composition, real contact routes, native FAQs.
- `src/components/contact/ContactForm.tsx`: validation, draft/clipboard/editing UI and data-handling copy.
- `src/lib/contact.ts`: Zod schema, options, limits and pure draft generation.
- `src/styles/contact.css`: page-scoped charcoal/paper/lime composition, responsive form and accessible controls.
- `src/test/contact.test.tsx`: behavioral and boundary regression coverage.
- `docs/contact.md`: workflow, verification and limitations.

App, routing, shared components/data, global CSS, package files and config were not edited by the contact contributor.

## TDD evidence

The first test rendered the original ContactPage and failed because it exposed **Send Message**, not **Prepare email draft**:

```text
FAIL contact draft workflow > prepares an email draft instead of claiming a message was sent
Unable to find an accessible element with the role "button" and name "Prepare email draft"
Test Files  1 failed (1)
Tests       1 failed (1)
```

Each subsequent behavior was exercised red before implementation: linked validation errors; copied briefing; denied/unavailable clipboard fallback; preserving edits and focus; optional company/budget; size/schema boundaries; Unicode/long-link fallback; contact content/FAQs; and protection against stale clipboard completion. A final regression check verifies no network, browser-storage write or automatic window opening on preparation.

Final scoped verification:

```text
RUN v4.1.11 /home/hermes/hightech-company-website
Test Files  1 passed (1)
Tests      22 passed (22)
Duration   9.30s
```

Command: `./node_modules/.bin/vitest run src/test/contact.test.tsx --reporter=dot`.

Project TypeScript checking passed with `./node_modules/.bin/tsc --noEmit -p tsconfig.app.json`. Scoped ESLint passed with an explicit `@typescript-eslint/no-unused-expressions` options object supplied on the command line. Without that override, the repository's current ESLint/plugin combination threw `Cannot read properties of undefined (reading 'allowShortCircuit')`; no config was changed here.

The full-suite check at this handoff had 62 passing tests and one unrelated failing Projects artwork-isolation test in `src/test/capabilities.test.tsx`. Other contributors were actively editing the shared working tree; the contact suite was green.

## Browser QA

- Inspected the rendered split composition at 1440px and the stacked form/ready state at 320px.
- Prepared a local draft in the real browser, confirmed `Your draft is ready`, focus on `contact-ready-heading`, and the encoded recipient/subject/body link. Did not activate the mailto link.
- Confirmed native FAQ activation with Enter in Chromium. JSDOM does not simulate native summary keyboard activation, so the unit test covers disclosure activation by click.
- Contact controls measured approximately 50px high; contact content stayed within the 320px viewport.
- **Shared layout issue for the parent:** at a 320px desktop viewport with a 15px scrollbar, global `body { min-width: 320px }` produces a 320px body inside a 305px client area, creating horizontal scrolling. The contact panel's right edge was 300px, with no contact descendants extending beyond the viewport. Fix the global body minimum-width in the parent-owned CSS, rather than adding a contact-specific override.

The test runner was temporarily unavailable while another contributor ran `npm ci`; tests were rerun after that process completed. Screenshots required bringing the test tab to the foreground. No commit or push was performed by the contact contributor.
