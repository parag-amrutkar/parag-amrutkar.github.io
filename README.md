# Parag Amrutkar — Products & Analysis

Personal site for [Parag Amrutkar](https://parag-amrutkar.github.io/): product concepts and structured analysis of growth, operations, and market problems.

Live site: **[parag-amrutkar.github.io](https://parag-amrutkar.github.io/)**

## What the site is

The portfolio is split into two kinds of work on purpose:

- **Products** — things built, prototyped, or designed, each with an honest status (`Concept`, `Prototype`, `Built`, `Live`, `Archived`, or `Professional work`).
- **Analysis** — independent case studies with method, findings, and recommendations.

Pages are driven by structured data in `frontend/src/data/portfolio.js`, not by a CMS. Empty optional fields are omitted rather than filled with placeholders. Claims that cannot be evidenced are labeled as hypotheses, concepts, or independent interpretation.

| Route | Page |
| --- | --- |
| `/` | Home — featured products and analysis |
| `/work` | Work index — both collections |
| `/work/products/:slug` | Product detail |
| `/work/analysis/:slug` | Analysis detail |
| `/about` | About |
| `/contact` | Contact form (FormKeep) plus email |
| `/terminal` | Optional terminal-mode UI |

Legacy `/projects` URLs redirect to `/work` or the matching detail page.

## Stack

- React 19 on Create React App, customized with CRACO
- React Router 7
- Tailwind CSS plus page-level CSS
- Yarn 1
- GitHub Pages via [`.github/workflows/pages.yml`](.github/workflows/pages.yml)

The app lives entirely under `frontend/`. The repository root is the GitHub Pages project; the workflow builds `frontend` and publishes `frontend/build`.

## Local development

Requires Node 20+ and Yarn 1.

```bash
cd frontend
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000).

```bash
yarn test     # content-contract tests in src/data/portfolio.test.js
yarn build    # production bundle in frontend/build
```

`yarn build` is the same command GitHub Actions runs. The workflow also copies `index.html` to `404.html` so client-side routes resolve on GitHub Pages.

## Editing content

Portfolio copy, status, evidence, and links all live in one file:

[`frontend/src/data/portfolio.js`](frontend/src/data/portfolio.js)

- `profile` — name, positioning, email, LinkedIn, GitHub
- `products` — product entries (`type: "product"`)
- `analyses` — analysis entries (`type: "analysis"`)

To add a product, append an object to `products` with at least `slug`, `type`, `name`, `summary`, and a `status` from `productStatuses`. To add an analysis, append to `analyses` with at least `slug`, `type`, `title`, `publishedAt`, `method`, and `findings`. Set `featured: true` to appear on Home.

If you replace an old `/projects/:id` slug, add `legacySlug` (analyses) or keep the same `slug` (products) so `getLegacyWorkPath` still resolves.

The tests in `portfolio.test.js` check those required fields. Run `yarn test` after content edits.

The longer implementation contract, including content-integrity rules, is in [`WEBSITE_IMPLEMENTATION_BRIEF.md`](WEBSITE_IMPLEMENTATION_BRIEF.md).

## Illustrations

Specimen plates (hero, work cards, OG image) live in `frontend/public/illustrations/`. `Figure` expects a `.webp` / `.png` pair at 1x and `@2x`. Missing files fall back to an empty plate frame rather than a broken image.

These scripts are optional and only needed when regenerating plates:

```bash
cd frontend
yarn illustrations              # Gemini / Vertex image generation
yarn palette-check              # measure plates against site colour tokens
yarn regrade                    # snap generated colours onto those tokens
```

`yarn illustrations` needs either `GEMINI_API_KEY` or `VERTEX_PROJECT`. Do not commit API keys.

## Deploy

Push to `main`. The Pages workflow installs with Yarn, builds the frontend, and deploys the artifact. Manual runs are available from the Actions tab (`workflow_dispatch`).
