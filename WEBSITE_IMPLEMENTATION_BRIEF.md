# Personal Website Implementation Brief

## 1. Purpose of this document

This document is the implementation contract for redesigning Parag Amrutkar's personal website. An AI coding agent should be able to use it to plan, implement, and verify the work without inventing requirements or portfolio claims.

Before changing code, inspect the current repository and preserve unrelated or uncommitted work. If this document conflicts with a later explicit instruction from the website owner, the later instruction takes precedence.

## 2. Product goal

The website exists to show Parag's work in two distinct forms:

1. **Products** — things Parag has built, prototyped, or designed.
2. **Analysis** — structured thinking Parag has produced about a business, market, product, or technology topic.

The website should help a visitor quickly understand:

- who Parag is;
- what kinds of problems he works on;
- what he personally contributed;
- what evidence supports each claim; and
- how to explore the work or contact him.

The intended experience is professional, credible, concise, and easy to scan. The work and its evidence should be more prominent than decorative effects.

## 3. Primary audiences

Design for these audiences without creating separate versions of the site:

- hiring managers and recruiters evaluating product, strategy, operations, and technical judgment;
- potential collaborators or clients evaluating relevant experience;
- peers who want to read or discuss Parag's work.

## 4. Core positioning

Use the following as provisional positioning copy until Parag approves final wording:

> I build technology products and analyze complex growth, operations, and market problems.

Do not add unsupported claims such as years of experience, revenue impact, company relationships, customer adoption, or shipped-product status.

## 5. Information architecture

Use this primary navigation:

- **Home** — `/`
- **Work** — `/work`
- **About** — `/about`
- **Contact** — `/contact`

The Work page must expose two clearly labeled collections:

- **Products**
- **Analysis**

Tabs, segmented controls, or anchored sections are acceptable. Both collections must remain discoverable without relying on query parameters alone.

Recommended detail routes:

- Product: `/work/products/:slug`
- Analysis: `/work/analysis/:slug`

Preserve compatibility with existing `/projects` links by redirecting them to `/work` or by keeping a non-duplicative compatibility route. Do not leave existing internal links broken.

Terminal Mode is not central to the portfolio goal. Keep it only if it works and does not compete with the primary navigation. It may be moved to the footer or treated as a secondary feature. Do not expand it during this implementation.

## 6. Page requirements

### 6.1 Home

The Home page must contain, in this order:

1. **Hero**
   - Parag's name.
   - A concise positioning statement.
   - Primary action: `View my work` linking to `/work`.
   - Secondary action: `About me` or `Get in touch`.
2. **Selected products**
   - Two or three featured product cards when enough valid entries exist.
   - Each card must show its name, one-line description, status, and a link to its detail page.
3. **Selected analysis**
   - Three to five featured analysis cards when enough valid entries exist.
   - Each card must show its topic/title, short thesis or question, publication date, and a link to its detail page.
4. **Short introduction**
   - A short, factual summary with a link to About.
5. **Contact call to action**
   - One clear invitation to contact Parag.

If there are not enough approved entries for a section, show fewer entries. Never generate filler portfolio pieces.

### 6.2 Work index

The Work page replaces the current Projects concept.

It must:

- introduce the two kinds of work in one or two sentences;
- let visitors switch or navigate between Products and Analysis;
- visually distinguish the two content types;
- render cards from structured data rather than hard-coded repeated markup;
- display an honest status label on every product;
- display a publication date on every analysis; and
- remain usable with JavaScript-supported keyboard navigation and on small screens.

Initial filtering beyond the two content types is optional and should not be added unless the content volume makes it useful.

### 6.3 Product detail

Every product detail page must support these sections:

1. **Name**
2. **One-line description** — who it is for and what it does
3. **Status** — one of the controlled values defined below
4. **Problem** — the specific user or business problem
5. **Solution** — what was built, designed, or proposed
6. **My role** — what Parag personally owned or contributed
7. **Key decisions and tradeoffs** — important choices and rejected alternatives
8. **Evidence** — screenshots, diagrams, research, repository, prototype, demo, or other artifacts
9. **Outcome** — verified results or a factual statement of current status
10. **Relevant links** — only links that exist and have been verified

Omit optional sections cleanly when data is unavailable. Do not render empty headings, empty arrays, placeholder links, or invented copy.

### 6.4 Analysis detail

Every analysis detail page must support these sections:

1. **Topic or title**
2. **Question or thesis**
3. **Why it matters**
4. **Method and sources**
5. **Analysis**
6. **Key findings**
7. **Recommendation or implications**
8. **Publication date**
9. **Last updated date**, when applicable

Sources must be clickable and associated with the claims they support when possible. Clearly distinguish sourced facts, calculations, assumptions, and Parag's interpretation.

### 6.5 About

The About page should provide context that is not already evident from the work:

- a concise professional narrative;
- the types of problems Parag enjoys working on;
- relevant capabilities or working style; and
- links to Work and Contact.

Avoid a long generic skills inventory. Prefer evidence-backed capabilities demonstrated by the portfolio.

### 6.6 Contact

Preserve the existing public contact routes unless Parag requests changes. The page must offer at least one dependable way to contact him. If the contact form remains, preserve its current behavior and provide a direct email fallback.

## 7. Content model

Store Products and Analysis as separate collections. They may share presentation components, but they must not share one ambiguous schema.

Suggested JavaScript shape for a product:

```js
{
  slug: "example-product",
  type: "product",
  name: "Example Product",
  summary: "A one-line description of the user and value.",
  status: "prototype",
  featured: true,
  year: "2026",
  problem: ["Paragraph or structured content"],
  solution: ["Paragraph or structured content"],
  role: ["Specific contribution"],
  decisions: [
    {
      decision: "Decision made",
      rationale: "Why it was made",
      tradeoff: "What was given up or deferred"
    }
  ],
  evidence: [
    {
      type: "image",
      label: "Prototype screenshot",
      url: "/images/example.png",
      alt: "Descriptive alternative text"
    }
  ],
  outcomes: ["Verified outcome or current-state statement"],
  links: [
    { "label": "View prototype", "url": "https://..." }
  ],
  tags: ["Product strategy", "AI"]
}
```

Suggested JavaScript shape for an analysis:

```js
{
  slug: "example-analysis",
  type: "analysis",
  title: "Example Analysis",
  summary: "The question or thesis in one or two sentences.",
  featured: true,
  publishedAt: "2026-08-04",
  updatedAt: null,
  topic: "Topic name",
  whyItMatters: ["Paragraph or structured content"],
  method: ["Method, scope, and limitations"],
  analysis: ["Paragraph or structured content"],
  findings: ["Finding supported by the analysis"],
  recommendations: ["Recommendation or implication"],
  sources: [
    {
      title: "Source title",
      publisher: "Publisher",
      url: "https://...",
      accessedAt: "2026-08-04"
    }
  ],
  tags: ["Pricing", "Strategy"]
}
```

The exact storage format can change if needed, but the semantic distinction and required fields must remain.

## 8. Controlled product status labels

Use only these public-facing product statuses unless Parag approves another:

- **Live** — publicly available and functioning.
- **Built** — implemented but not necessarily publicly hosted.
- **Prototype** — an interactive or testable representation exists.
- **Concept** — a proposed product or product-design exercise.
- **Archived** — previously built but no longer active.
- **Professional work** — work exists but public details or artifacts are restricted.

Do not describe something as launched, used, adopted, or successful without supporting evidence.

## 9. Existing-content migration

The current repository uses a single `projects` collection in `frontend/src/data/mock.js` and routes all entries through a shared Project Detail page.

Before migrating each existing item, determine its honest content type and status from available evidence:

| Existing item | Provisional destination | Required verification |
| --- | --- | --- |
| Disney+ ML Case Study | Analysis | Confirm that it is independent analysis and verify all claims and sources. |
| Etsy SmartList | Product Concept or Analysis | Confirm whether a prototype exists and whether stated outcomes are measured, projected, or hypothetical. |
| Basecamp Pricing Strategy | Analysis | Confirm the analysis basis, sources, and whether recommendations were implemented. |

These destinations are provisional, not factual declarations. If evidence is insufficient, retain the content only after rewriting unsupported claims as clearly labeled hypotheses or projections. Otherwise, exclude it until Parag supplies the missing facts.

In particular, do not present work about a named company as commissioned by, implemented for, or endorsed by that company unless that relationship is verified and approved for publication.

## 10. Content integrity rules

These rules are mandatory:

- Do not invent portfolio entries, dates, employers, clients, roles, metrics, testimonials, links, or outcomes.
- Do not convert projections into measured results.
- Do not imply employment, partnership, endorsement, or access to private company data without verification.
- Label estimates, assumptions, recommendations, concepts, and prototypes accurately.
- Preserve uncertainty when information is incomplete.
- Ask Parag for missing facts when the answer would materially change how an entry is represented.
- Use real artifacts when available; do not manufacture screenshots that imply a product exists.
- Use stock imagery only as decorative imagery, never as evidence of a product or outcome.

## 11. Visual and interaction direction

Continue the existing warm, modern, professional direction described in `Prd.txt`, while prioritizing clarity and evidence.

- Maintain a consistent type scale and spacing system.
- Use one visual treatment for Product cards and a related but distinct treatment for Analysis cards.
- Keep body text readable and detail pages comfortable for long-form reading.
- Use diagrams, screenshots, tables, or charts only when they improve understanding.
- Keep animation subtle and respect `prefers-reduced-motion`.
- Avoid interactions that hide essential content behind hover states.
- Do not redesign unrelated components solely for novelty.

## 12. Accessibility and responsive behavior

The implementation must:

- use semantic landmarks and heading order;
- be fully usable by keyboard;
- include visible focus states;
- provide meaningful alternative text for informative images;
- use empty alt text for purely decorative images;
- meet WCAG AA color contrast for text and controls;
- respect reduced-motion preferences;
- avoid horizontal overflow at 320 CSS pixels wide;
- work at common mobile, tablet, and desktop widths; and
- retain understandable content when images fail to load.

## 13. Technical constraints

The current frontend is a Create React App application using React Router and CSS files. Work with the current stack unless a migration is explicitly approved.

- Prefer small, reusable components for work cards, status labels, evidence blocks, and source lists.
- Keep portfolio content separate from page layout code.
- Avoid adding a content-management system, database, authentication, analytics, or new network service in this phase.
- Do not alter the existing contact-form service unless required by the approved scope.
- Avoid adding dependencies for behavior that can be implemented cleanly with the current stack.
- Provide a clear not-found state for unknown work slugs.
- Preserve existing working routes or add intentional redirects.

## 14. Suggested implementation sequence

1. Inspect the current code, content, assets, routes, and uncommitted changes.
2. Inventory each existing portfolio entry and identify missing facts.
3. Create separate Product and Analysis data models.
4. Add shared presentation components where appropriate.
5. Implement the Work index and detail routes.
6. Update Home to feature both content types.
7. Update navigation, internal links, and compatibility routes.
8. Refine About and Contact only as required by this brief.
9. Verify accessibility, responsiveness, and empty or missing-data states.
10. Run the available automated checks and perform a production build.

Do not block structural implementation on final copy. If approved content is missing, use visibly neutral editorial markers in the data source such as `CONTENT NEEDED: confirm product status`; do not show those markers on the public UI.

## 15. Out of scope

Unless separately requested, do not add:

- a blog, newsletter, comments, likes, or social feed;
- user accounts or authentication;
- a CMS or database;
- site search;
- advanced multi-tag filtering;
- new analytics or tracking;
- expanded Terminal Mode features;
- fabricated demo products or analyses;
- deployment, domain, or hosting changes; or
- a wholesale framework migration.

## 16. Acceptance criteria

Implementation is complete only when all of the following are true:

- The primary navigation contains Home, Work, About, and Contact.
- The Home page visibly presents Products and Analysis as different kinds of work.
- The Work page makes both collections easy to find and understand.
- Product and Analysis entries use distinct schemas and detail templates.
- Every public product displays an approved status.
- Every public analysis displays a publication date.
- No optional section renders empty UI.
- No unsupported metric, outcome, relationship, or launch claim has been added.
- Existing internal project links resolve or redirect intentionally.
- All external links used in portfolio content have been checked.
- All interactive elements work with keyboard navigation.
- The site has no horizontal overflow at 320px width.
- Reduced-motion preferences are respected.
- Informative images have meaningful alt text.
- The production build completes successfully.
- Existing automated tests pass; update or add focused tests for changed routing and conditional content where practical.
- The browser console has no errors during the primary user journeys.

Primary user journeys to verify:

1. Home → selected Product → Product detail → Work.
2. Home → selected Analysis → Analysis detail → Work.
3. Work → switch between Products and Analysis.
4. Any primary page → Contact.
5. Legacy `/projects` URL → intentional compatible destination.

## 17. Decisions that require owner input

An implementing agent should request clarification rather than guess when any of these decisions become blocking:

- final positioning statement;
- which entries should be publicly visible or featured;
- whether each existing entry is a Product, Product Concept, or Analysis;
- the verified status of each product;
- Parag's exact role and contribution to each entry;
- whether any outcome metrics are measured, projected, or hypothetical;
- which screenshots, repositories, demos, and sources may be published; and
- whether Terminal Mode should remain visible in the navigation.

The agent may complete reversible structural work before these answers arrive, but must not publish invented substitutes.

## 18. Definition of a successful result

The finished site should feel like a curated body of work, not a list of generic projects. A visitor should be able to distinguish what Parag built from what he analyzed, understand his specific contribution, inspect the supporting evidence, and decide whether to continue the conversation.
