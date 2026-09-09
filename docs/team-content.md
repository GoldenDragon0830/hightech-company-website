# Editing the sample team

The five cards on the homepage and About page use **one content source**: `src/data/team.json`. The names, roles, biographies, skills, and avatars are fictional samples—not claims about actual HighTech personnel. Every card is labeled **Sample profile**, with a disclosure above the group. No social accounts are supplied or implied.

## Make a content edit

1. Open `src/data/team.json` and edit the existing five objects. Array order controls display order; keep the Founder & CEO first for the featured About card.
2. Use ordinary JSON: double-quoted strings, no comments, no trailing commas. Keep exactly five members, unique `id` values, and at least one role spelled `Founder & CEO`.
3. Keep `isSample: true`. Do not add invented employers, schools, awards, years of experience, clients, or performance figures.
4. Keep avatar assets in `public/avatars/`, referring to them as `/avatars/filename.svg` in the JSON. The provided SVGs are original geometric illustrations in sage, clay, sand, slate, and mauve. They are not photographs or likenesses of actual people. Preserve that distinction in replacements.
5. Run `npx vitest run src/test/team.test.tsx`, then `npm run typecheck`. Preview `/about` and `/` on desktop and a narrow mobile viewport. Run the full project checks before deployment.

Edits are code content changes, not a live CMS. A production site needs a rebuild and redeployment before visitors see changes.

## Schema contract

`src/lib/team.ts` exports `teamMemberSchema`, `teamSchema`, `TeamMember`, `teamMembers`, and `isHttpsUrl`. Zod validates the JSON when the content module is imported. Invalid edits fail with a field-path validation error; they are not silently substituted with different people. The tests exercise the import boundary, so run them before publishing. A Vite build alone does not execute this runtime validation.

| Field | Contract |
| --- | --- |
| `id` | Required; 1–64 characters; lowercase letters/digits separated by single hyphens; unique across the team. |
| `name` | Required nonblank string; at most 80 characters. |
| `role` | Required nonblank string; at most 80 characters. At least one member must be `Founder & CEO`. |
| `bio` | Required nonblank string; at most 500 characters. One or two useful sentences recommended. |
| `skills` | Required array of 1–6 nonblank strings, each at most 52 characters. Use distinct labels. |
| `avatar` | Required local SVG URL matching `/avatars/lowercase-hyphenated-name.svg`. No remote images or parent-directory paths. The file must exist under `public/avatars/`; tests check each supplied asset. |
| `isSample` | Required literal `true`. The sample-only contract deliberately prevents silently relabeling fictional people as real employees. |
| `socials` | Optional array of up to 3 `{ "label": "…", "url": "…" }` objects. Labels must be nonblank and at most 32 characters. |

Unknown fields are rejected rather than ignored. Text is not interpreted as HTML. Values and identifiers are preserved, not silently normalized.

## Optional social links

Omit `socials` or use `[]` when no verified link is available. A blank URL (`"url": ""`) is accepted as an editorial placeholder and produces **no anchor, icon, or empty social row**. Nonblank URLs must be explicit `https://` URLs without embedded credentials or surrounding whitespace. HTTP, `#`, `javascript:`, relative paths, and malformed URLs fail validation.

Only add a link the profile owner has approved. Do not put a plausible-looking social account on a fictional sample. Valid links open in a new tab with `rel="noopener noreferrer"` and an accessible name that identifies the person, destination label, and new-tab behavior. The card also filters unsafe URLs defensively if consumed independently of the JSON loader.

## Reusing the section

```tsx
import TeamSection from '@/components/team/TeamSection';

<TeamSection />         // Featured first profile, then a two-column team grid.
<TeamSection compact /> // Denser homepage composition; still all five complete profiles.
```

Both modes include the names, roles, biographies, skill tags, local illustrations, and sample disclosure. The component imports its own `src/styles/team.css`, uses the shared `paper-section`, `shell`, typography, tag, and link contracts, and has no required props. `TeamCard` is separately reusable with a validated `TeamMember`.

To replace the sample team with actual personnel, first obtain approved names, biographies, avatar/portrait rights, and optional social URLs. Then deliberately review the sample-only schema, disclosure, image alternative text, and badge together. Do not remove the warning while any fictional identity remains.

## Tests

`src/test/team.test.tsx` covers the five-profile requirement, complete JSON-driven cards in both modes, local SVG availability, required fields and unsafe edits, sample labeling, optional HTTPS socials, unique accessible IDs across repeated sections, and the About page's real route links and single-heading/no-nested-main contract.
