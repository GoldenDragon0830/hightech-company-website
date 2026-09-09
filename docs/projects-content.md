# Project collection: content boundaries

## What this page represents

The Projects page is a collection of **illustrative concept explorations**, not a portfolio of verified client work. No shipped products, client engagements, delivery dates, team allocations, endorsements, certifications, or measured outcomes have been supplied for these entries.

The collection makes that distinction visible above the filters and on every card. Each expanded brief presents a question, a possible direction, and validation needed before a real build. Abstract CSS compositions are illustrations of the idea, not product screenshots.

## Entries

| Concept   | Delivery category | Application context        |
| --------- | ----------------- | -------------------------- |
| Fieldnote | AI systems        | Healthcare workflows       |
| Shelf     | Web apps          | Commerce & retail          |
| Trace     | AI systems        | Finance & operations       |
| Openbook  | Web apps          | Education & learning       |
| Shift     | Mobile apps       | Manufacturing & field work |
| Wayline   | Mobile apps       | Logistics & supply chain   |

All six names are invented for this collection. No claim is made that these names are unique or available as product trademarks.

The previous fictional case studies (MediScan AI, ShopSmart Analytics, FinGuard Pro, EduPath AI, PredictLine, RouteGenius) and their fabricated clients, testimonials, impact figures, team sizes, and deployment claims have been removed rather than republished as evidence.

## Editing source

- Content: `src/data/projects.json`.
- Presentation and interaction: `src/pages/ProjectsPage.tsx`.
- Specialty styles: `src/styles/capabilities.css`.
- Regression coverage: `src/test/capabilities.test.tsx`.

Every entry needs a stable `id`, `title`, `category`, `domain`, `description`, `tags`, an abstract `art` variant and `artLabel`, plus `question`, `approach`, and `validation` text. Filters are derived from the data. Keep claims conditional and describe unknowns plainly.

The `cap-concept-art` prefix deliberately avoids the homepage's separate `concept-art` styles. Do not merge them: fixed homepage artwork heights can create width overflow when combined with the collection's aspect ratio. The Shelf grid explicitly stretches its tile items; centering zero-content grid items collapses the illustration to lines.

## Interaction and accessibility

- Filters are real buttons with `aria-pressed`; the result count is a polite live status.
- Each concept has a separately named expand/collapse button, `aria-expanded`, and `aria-controls` pointing at a persistent, hidden-when-collapsed panel.
- Enter and Space operate disclosures. Changing filters clears expanded details.
- Internal navigation uses React Router `Link`.
- Decorative artwork is hidden from assistive technology; its motion pauses under `html[data-motion="paused"]` and is removed by `prefers-reduced-motion: reduce`.
- All four specialty pages were checked at a 320px client width without horizontal overflow. Project filter heights exceed the 44px minimum.

## Before publishing a real case study

Obtain permission to name the client and show the work. Verify the scope, contributors, timing, and production status. Support any claimed result with an attributable measurement and its limitations. Verify testimonial wording and publication consent. Do not merely replace the concept badge with “Live.”

Healthcare concepts do not imply clinical capability or compliance certification. Financial concepts do not promise financial outcomes. Predictive or AI functionality requires suitable data, evaluation, failure handling, and accountable human review.

## Careers and industry boundaries

The Industries page describes six possible application areas, not a client roster or specialist certifications. Careers invites future talent-network introductions, explicitly lists no current vacancies, and does not invent salaries or benefits. The introduction link opens an email to the existing studio address, `contact@hightech.fit`.
