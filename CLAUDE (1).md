# CLAUDE.md — The Scarlet Cord Architects & Builders Ltd

> Project instructions for AI assistants and developers working on this codebase.

---

## Project Overview

Marketing website for **The Scarlet Cord Architects & Builders Ltd**, an architectural and building construction firm based in Lagos, Nigeria. The site must communicate who they are, what they do, showcase their portfolio, and drive quote/consultation requests.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** TailwindCSS
- **UI:** Custom components — no heavy UI libraries (no MUI, Chakra, etc.)
- **Data:** All project/service/team content lives in `/lib/content.ts` (single source of truth, easy for client to edit)
- **Images:** Placeholder structure in `/public/images/projects/`, `/public/images/team/`
- **Deployment:** Vercel-compatible (`next build` must pass cleanly)

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx            # Root layout, metadata, fonts
│   ├── page.tsx              # Homepage
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── projects/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── WhyUs.tsx
│   │   └── CTABand.tsx
│   ├── projects/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectFilter.tsx
│   │   └── ProjectModal.tsx
│   ├── services/
│   │   └── ServiceCard.tsx
│   ├── about/
│   │   └── TeamCard.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── SectionTag.tsx
│       ├── FadeIn.tsx         # Scroll-triggered animation wrapper
│       └── Button.tsx
├── lib/
│   └── content.ts            # ALL site content: services, projects, team, contact info
├── public/
│   ├── images/
│   │   ├── projects/         # Project photos (placeholder structure)
│   │   ├── team/             # Team headshots
│   │   └── hero/             # Hero background images
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.js
└── CLAUDE.md                 # ← This file
```

---

## Brand Identity

| Property | Value |
|----------|-------|
| **Company name** | The Scarlet Cord Architects & Builders Ltd |
| **Tagline** | "Design. Build. Refine." |
| **Vision** | To be the leading architectural and building construction firm in Africa |
| **Mission** | Meet clients' architectural and building construction needs in a qualitative, cost-effective way that maximizes value for stakeholders |
| **Tone** | Confident, premium, straightforward, trust-building |

### Colors (Tailwind custom config)

```
scarlet:        #B22234    (primary accent)
scarlet-dark:   #8B1A29    (hover states)
scarlet-light:  #D4394B    (highlights on dark backgrounds)
charcoal:       #1A1A1A    (dark backgrounds, text)
graphite:       #2D2D2D    (secondary dark)
warm-grey:      #8A8680    (body text, muted)
light-grey:     #F5F3F0    (section backgrounds)
cream:          #FAF9F7    (page background)
```

### Typography

- **Display / Headings:** DM Serif Display (Google Fonts)
- **Body:** Outfit (Google Fonts)
- Never use Inter, Roboto, Arial, or system fonts

---

## Pages & Sections

### Homepage (`/`)

Sections in order:

1. **Hero** — Headline: "Architectural Design & Construction in Lagos". Subtext from mission. CTAs: "Request a Quote" → `/contact`, "View Projects" → `/projects`. Stats strip: years, projects, client focus.
2. **Trust Strip** — "CAC Registered (2021)" • "Design" • "Build" • "Renovate" • "Interior Finishing"
3. **Services** — 6 cards from `content.ts`
4. **Featured Projects** — 4–6 cards from portfolio with hover overlay. "View All" button → `/projects`
5. **Why Us** — 5 numbered items (integrity, client focus, end-to-end, detail, 3D visualization)
6. **CTA Band** — "Let's Build Your Next Project" + contact button. Scarlet background.

### About (`/about`)

- Company story (indigenous firm, CAC registered March 24 2021, based in Ojodu Berger Lagos)
- Vision & Mission block
- Team grid (3 members — see content below)

### Services (`/services`)

- 6 service cards with icons and descriptions

### Projects (`/projects`)

- Filter bar: All / Residential / Commercial / Interiors / Renovation
- Grid of project cards with hover overlay showing title, location, year
- Click opens detail modal with: title, description, client, location, year, category, image placeholder

### Contact (`/contact`)

- Contact details (address, phones, email, socials)
- Contact form: Name*, Email*, Phone, Service needed (dropdown), Message*
- Front-end validation required. Submit handler stub (console.log or toast).

---

## Content Data (for `lib/content.ts`)

### Services

```
1. Architectural Design      — Full design with 3D visualization
2. Landscape Design          — Outdoor spaces, gardens, hardscapes
3. Construction              — End-to-end residential & commercial building
4. Renovation & Refurbishment — Restoring and upgrading existing structures
5. MEP Works                 — Mechanical, Electrical and Plumbing systems
6. Interior Design           — Curated interiors from concept to styling
```

### Team

```
Arc. Sina Akomolede          — Executive Director
Arc. Seun Adeyanju           — Head of Operations (B.Sc., M.Sc., Arch. OAU Ife)
Emife Stella Akinbulejo      — Admin Manager
```

### Projects

| # | Title | Client | Location | Year | Category |
|---|-------|--------|----------|------|----------|
| 1 | Renovation of Four Points by Sheraton Hotel Reception Hall | Spazio Ideale / Marriott International | Oniru Estate, Victoria Island, Lagos | 2022 | Renovation |
| 2 | Construction of 40 units of 4-bedroom duplex with BQ | Dillion Consultant Ltd | 19A MacDonald Road, Ikoyi, Lagos | 2022 | Residential |
| 3 | Construction of 15 units of 4-bedroom duplex with BQ | Dillion Consultant Ltd | Millennium Estate, Oniru, Lagos | 2018 | Residential |
| 4 | Fit-out interior works — Space Finish Africa / GTCO | Space Finish Africa / GTCO | Moshood Olugbani, Victoria Island, Lagos | 2021 | Interiors |
| 5 | Design of 4-bedroom duplex | Dr. Lekan Abioye | Ilawe-Ekiti, Ekiti | 2021 | Residential |
| 6 | Interior design — Horizon Estate | Mr. Blossom | Horizon Estate, Lekki, Lagos | 2022 | Interiors |
| 7 | Interior design — VGC Residence | Mr. Aduro Matthew | Victoria Garden City, Lagos | 2022 | Interiors |
| 8 | Design of 16 units of 3-bedroom duplex | Mr. Amos Gagar | Sangotedo, Lekki, Lagos | 2022 | Residential |
| 9 | Design of 4-bedroom duplex | Mrs Emife Akomolede | Epe, Lagos | 2022 | Residential |

### Contact Info

```
Address:    Plot 1 Oladejo Street, Ojodu Berger, Lagos
Phone 1:    +234 806 734 3333
Phone 2:    0805-332-7555
Email:      thescarltcordltd@gmail.com
Instagram:  @thescarletcordarchitects
Facebook:   The Scarlet Cord Architect and Builders
```

---

## Design Rules

- **Mobile-first** — all layouts must work on 320px+ screens
- **Whitespace** — generous spacing; let content breathe
- **Images** — lazy-loaded, use `next/image` with placeholder blur
- **Animations** — scroll-triggered fade-ins using Intersection Observer. Staggered delays on grids. CSS transitions preferred; keep it subtle and premium.
- **No emoji in UI** — icons only (use simple geometric symbols or Lucide)
- **Cards** — subtle hover lift + top-border accent reveal on service cards
- **Portfolio** — dark overlay on hover revealing title/location/year
- **Modals** — backdrop blur, click-outside-to-close

---

## Functional Requirements

- SEO: unique `<title>` and `<meta description>` per page, OpenGraph tags
- Accessibility: WCAG AA contrast, keyboard navigation, alt text on all images
- Portfolio filtering with smooth transitions (no page reload)
- Contact form validation (required fields marked with `*`)
- All contact details must match the company profile exactly
- Company name must be used exactly as written: "The Scarlet Cord Architects & Builders Ltd"

---

## Constraints

- Do NOT add services, projects, or team members not listed above
- Do NOT alter contact details, company name, or registration facts
- Do NOT use heavy component libraries (Material UI, Ant Design, Chakra, etc.)
- Do NOT use stock photos — use styled placeholders until real assets are provided
- Keep copy short, benefit-led, professional. No long paragraphs. Use Lagos context naturally.
- `next build` must complete with zero errors before any PR

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Local dev server (localhost:3000)
npm run build        # Production build (must pass clean)
npm run lint         # ESLint check
```
