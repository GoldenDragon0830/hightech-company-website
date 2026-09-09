# Editing the five-person team

The homepage and About page share **`src/data/team.json`**. Exactly five profiles are required, including a `Founder & CEO`. Array order determines display order; the first card is featured on the About page.

## Replace samples with your actual team

1. Edit each member’s `name`, `role`, `bio`, and `skills` in the JSON. Use approved, truthful details.
2. Add their approved portrait to `public/avatars/`, and set `avatar` to `/avatars/their-name.webp` (SVG, WebP, AVIF, PNG, JPG and JPEG are supported). Use lowercase, hyphenated filenames.
3. Once a profile’s name, biography and image are real and approved, set **`isSample: false`**. Its sample badge disappears automatically; when all five are real, the section-wide sample notice disappears too. Leave fictional profiles marked `true`.
4. Optionally add approved social links, or omit `socials` completely. Blank URLs render nothing. Nonblank URLs must be credential-free `https://` URLs.
5. Run `npm test`, `npm run typecheck`, and `npm run build`; commit and push to redeploy.

```json
{
  "id": "founder",
  "name": "Your approved public name",
  "role": "Founder & CEO",
  "bio": "A short, factual description of your focus and responsibilities.",
  "skills": ["Product strategy", "Software engineering"],
  "avatar": "/avatars/founder.webp",
  "isSample": false,
  "socials": [{ "label": "GitHub", "url": "" }]
}
```

Keep five objects in the top-level array. IDs must be unique lowercase hyphenated identifiers. Do not add invented employers, awards, education, years of experience, clients or performance metrics.

## Validation

`src/lib/team.ts` validates JSON with Zod when imported. Names/roles are nonblank strings up to 80 characters; bios up to 500; skills 1–6 strings up to 52 characters. Unknown fields, unsafe social URLs and parent-directory image paths are rejected. There must be exactly five members and at least one role spelled `Founder & CEO`.

Local image paths must point to an existing file in `public/avatars/`. Changing JSON requires a build/deployment; this is not a remote CMS. Tests validate the content boundary, so run them before publishing. A Vite build alone does not execute runtime validation.

## Components

```tsx
import TeamSection from '@/components/team/TeamSection';
<TeamSection />         // Featured founder + remaining people
<TeamSection compact /> // Homepage composition, all five profiles
```

Both variants include role, biography, skills, avatar, optional social links, conditional sample labeling, and accessible unique IDs. The provided illustrations are original geometric avatars, not photographs or likenesses of actual people.
