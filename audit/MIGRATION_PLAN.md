# Dev By Design static migration plan

## Approved scope

Retain:

- `/`
- `/about-us/`
- `/portfolio/`
- `/pricing/`
- `/contact-us/`
- Five testimonial routes under `/testimonial/`

Retire and redirect:

- `/author/katrialesser/` → `/about-us/`
- `/category/uncategorized/` → `/`
- `/2023/06/07/hello-world/` → `/`

## Architecture

1. Astro statically prerenders every page.
2. `BaseLayout.astro` owns document structure, canonical metadata, social metadata, structured data, favicon, analytics, header, and footer.
3. Repeated content lives in typed data modules rather than page templates.
4. Shared components render the header, footer, and testimonial bands.
5. CSS custom properties in `global.css` are the master design tokens for color, typography, spacing, widths, shadows, and radii.
6. Astro’s image pipeline generates appropriately sized WebP assets.
7. No WordPress, database, PHP, form processor, or client-side framework is shipped.

## Header

- One reusable header component across all pages.
- Local logo asset with meaningful home-page label.
- Five primary routes: Home, About, Portfolio, Pricing, Contact.
- Current-page state and visible keyboard focus.
- Desktop navigation converts to a keyboard-operable disclosure menu on smaller screens.
- Sticky mobile header keeps navigation available without consuming excessive space.

## Home page

1. Local hero image with a real H1 and two useful calls to action.
2. Three service cards drawn from a consistent visual system.
3. Mission statement and three value pillars with lightweight inline icons.
4. Pricing summary with mail and pricing actions.
5. Vendor credentials using local source images and corrected external links.
6. Featured testimonials from the shared testimonial dataset.

## About page

1. Introductory statement with improved readable line length.
2. Alternating team layout generated from one data collection.
3. Responsive single-column treatment on mobile.
4. Local portraits with descriptive alternative text and optimized output sizes.
5. Featured testimonials and shared footer.

## Portfolio page

1. Strong introductory statement explaining the breadth and nature of the work.
2. Dense three-column layout with alternating two-column and one-column cards.
3. Single-column mobile layout.
4. Current website captures used as visual references and linked to their live destinations.
5. Each card states the type and scope of work without implying sole ownership of team projects.
6. Earlier-version work is explicitly labeled.
7. Z1 Consultant blocks automated screenshots, so its card uses a custom CRM-strategy illustration rather than displaying a misleading 403 page.
8. Portfolio source details came from the user-provided resume; personal contact information from the resume was not copied into the repository.

## Pricing page

1. Preserve all service categories and current published prices.
2. Separate development, specialist, and design packages into scannable sections.
3. Preserve the custom-development feature list.
4. Link package actions directly to pre-addressed email messages.
5. Use a responsive one-column layout on narrow screens.

## Contact page

- No form or data collection.
- Visible, clickable email address.
- Pre-addressed `mailto:` action.
- Shared featured testimonials and footer.

## Testimonial pages

- Five static pages generated from the centralized testimonial data.
- Preserve full quote, role, organization, and date.
- Add previous/next navigation and an inquiry call to action.
- Exclude WordPress author links and dates that do not help a prospective client.

## Footer

- One reusable footer component.
- Correct internal About link.
- “Schedule a Call” and “Contact Us” open email with useful subjects.
- Preserve LinkedIn.
- Automatic copyright year.
- Keyboard-accessible back-to-top link.

## Accessibility and performance

- Semantic headings and landmarks, one H1 per page.
- Skip link, focus indicators, descriptive alt text, and keyboard-operable navigation.
- Improved contrast and line length.
- Reduced-motion support.
- No external font downloads.
- Responsive image generation and lazy loading below the fold.
- No unnecessary WordPress, Elementor, jQuery, slider, comment, or icon-library assets.

## SEO and analytics

- Unique title and description for every page.
- Canonical URLs on the non-`www` domain.
- Open Graph and Twitter metadata.
- ProfessionalService structured data.
- XML sitemap and `robots.txt`.
- Existing Google Analytics measurement ID `G-V89GHWN541` retained.

## Review and deployment sequence

1. Build and validate locally.
2. Capture desktop and mobile screenshots of every retained route.
3. Compare key sections with `audit/current-site/` references.
4. Initialize Git and connect the user-provided GitHub repository.
5. Push to `main` and enable GitHub Actions as the Pages source.
6. Review the temporary GitHub Pages URL.
7. Document current DNS, particularly MX/TXT records for `webdevmail.com`.
8. Add the custom domain and `CNAME` only after approval.
9. Change website DNS records while preserving mail records.
10. Verify apex/`www`, HTTPS, analytics, internal links, email links, and 404 behavior.
11. Keep Pantheon available until DNS propagation and final acceptance are complete.
