# Verification

## Local production candidate

- `npm run format:check`: passed.
- `npm test`: 70 tests passed across eight suites.
- `npm run typecheck`: passed.
- `npm run lint`: zero errors; five existing Fast Refresh warnings in retained shadcn UI primitives.
- `npm run build`: passed with Vite 7.3.6.
- `npm run test:e2e`: all 11 Chromium tests passed against the production build.
- `npm audit`: zero reported vulnerabilities.
- Static added-code scan: no hardcoded-token, dynamic-code execution, shell-execution or unsafe-deserialization hits.

## Browser coverage

All seven routes (`/`, `/about`, `/services`, `/industries`, `/projects`, `/careers`, `/contact`) checked on desktop and at 390px / 320px widths. Automated axe checks run for WCAG 2 A/AA and WCAG 2.1 AA tags on desktop and narrow mobile. No violations reported by those checks; this is not a claim of exhaustive accessibility certification.

Additional checks cover direct links, refresh, browser back, not-found route, keyboard Escape/focus in the mobile menu, desktop resizing, actual changing canvas frames, pause persistence, system reduced-motion preference, offscreen/resume animation lifecycle, and route-metadata variants.

A separate screenshot pass produced 14 desktop/mobile captures across seven routes, with no failed page responses, broken images or settled-layout overflow. Home and About each render exactly five team cards. Manual inspection covered homepage, About/team and overview compositions.

The Contact form was exercised in Chromium: preparing a brief produces a correctly encoded `mailto:contact@hightech.fit` draft and the explicit “Nothing has been sent” notice. **No email was sent and no calendar appointment was booked.** Actual email delivery is handled by the visitor’s email app; no backend provider is configured.

## Content status

All five team profiles and illustrations are examples, labeled in the UI. `src/data/team.json` supports replacement with approved real profiles and local portraits; set `isSample: false` only for real, approved details. Project lab items are explicitly illustrative concepts, not client case studies. Careers does not advertise unverified vacancies.

## Deployment gate

Local verification does not prove production deployment. Before calling the release live, verify the pushed commit on `master`, its Vercel deployment status, the public homepage bundle, and direct page URLs. Preserve the existing Git history.
