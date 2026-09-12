# WebDevByDesign.com

Static Astro website for Dev By Design LLC, designed for deployment to GitHub Pages at `https://webdevbydesign.com`.

## Local development

Requirements: Node.js 24 and npm.

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

The generated static website is written to `dist/`.

Validate generated metadata and local links, then run the browser accessibility audit against a local preview:

```sh
npm run check:built
npm run preview
npm run audit:a11y
```

## Content maintenance

- Global business information and navigation: `src/data/site.ts`
- Google Analytics and Zoho SalesIQ identifiers: `src/data/site.ts`
- Team biographies: `src/data/team.ts`
- Testimonials: `src/data/testimonials.ts`
- Portfolio projects: `src/data/portfolio.ts`
- Shared header and footer: `src/components/`
- Brand and layout tokens: `src/styles/global.css`
- Page-specific content: `src/pages/`

## Deployment

The workflow at `.github/workflows/deploy.yml` builds and publishes the site whenever the `main` branch is pushed. In GitHub, select **Settings → Pages → Source: GitHub Actions**.

The custom domain is intentionally not activated in the repository yet. After the GitHub Pages preview has been reviewed:

1. Add `webdevbydesign.com` as the custom domain in GitHub Pages settings.
2. Add a `public/CNAME` file containing only `webdevbydesign.com`.
3. Update the website DNS records without removing the existing mail records.
4. Verify both the apex and `www` addresses, then enable **Enforce HTTPS**.

Do not cancel the current hosting or change nameservers until the existing `webdevmail.com` email configuration has been documented and recreated.

## Audits

- `audit/current-site/`: live WordPress reference screenshots and machine-readable inventory.
- `audit/rebuilt-site/`: desktop/mobile screenshots and inventory from the local Astro build.
- `audit/MIGRATION_PLAN.md`: architecture, page plan, QA, and domain-cutover procedure.
- `audit/COMPARISON.md`: page-by-page visual migration comparison and links to the reference captures.

Audit screenshots contain only material that was already publicly served by the current website.
