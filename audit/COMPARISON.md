# Current site and Astro rebuild comparison

The folders linked below contain top, middle, and bottom captures at desktop and mobile widths. The current-site set is the migration reference; the rebuilt-site set is regenerated from the production Astro output.

| Page | Current site | Rebuilt site | Result |
| --- | --- | --- | --- |
| Home | [desktop](current-site/screenshots/home/desktop/top.jpg) / [mobile](current-site/screenshots/home/mobile/top.jpg) | [desktop](rebuilt-site/screenshots/home/desktop/top.jpg) / [mobile](rebuilt-site/screenshots/home/mobile/top.jpg) | Preserves the brand, services, mission, pricing, credentials, and testimonials; adds a proper H1, working calls to action, stronger hierarchy, and a single-column mobile layout. |
| About | [desktop](current-site/screenshots/about-us/desktop/top.jpg) / [mobile](current-site/screenshots/about-us/mobile/top.jpg) | [desktop](rebuilt-site/screenshots/about-us/desktop/top.jpg) / [mobile](rebuilt-site/screenshots/about-us/mobile/top.jpg) | Preserves all four team members and portraits; improves reading width, spacing, and mobile presentation. |
| Pricing | [desktop](current-site/screenshots/pricing/desktop/top.jpg) / [mobile](current-site/screenshots/pricing/mobile/top.jpg) | [desktop](rebuilt-site/screenshots/pricing/desktop/top.jpg) / [mobile](rebuilt-site/screenshots/pricing/mobile/top.jpg) | Preserves the published packages, prices, and custom-development inclusions; makes every inquiry action functional. |
| Contact | [desktop](current-site/screenshots/contact-us/desktop/top.jpg) / [mobile](current-site/screenshots/contact-us/mobile/top.jpg) | [desktop](rebuilt-site/screenshots/contact-us/desktop/top.jpg) / [mobile](rebuilt-site/screenshots/contact-us/mobile/top.jpg) | Keeps the requested email-only approach; improves prominence and supplies pre-addressed mail links. |
| Portfolio | Not present | [desktop top](rebuilt-site/screenshots/portfolio/desktop/top.jpg) / [desktop middle](rebuilt-site/screenshots/portfolio/desktop/middle.jpg) / [mobile](rebuilt-site/screenshots/portfolio/mobile/top.jpg) | Adds the requested editorial masonry portfolio with 15 qualified project entries and responsive image treatment. |
| Testimonials | [example desktop](current-site/screenshots/testimonial-bryan-o/desktop/top.jpg) / [example mobile](current-site/screenshots/testimonial-bryan-o/mobile/top.jpg) | [example desktop](rebuilt-site/screenshots/testimonial-bryan-o/desktop/top.jpg) / [example mobile](rebuilt-site/screenshots/testimonial-bryan-o/mobile/top.jpg) | Preserves five full testimonial pages; adds consistent navigation, readable mobile cards, and inquiry actions. |

## Other changes checked

- Replaced duplicated WordPress page furniture with one shared layout, header, footer, and centralized data modules.
- Removed WordPress, Elementor, jQuery, comments, slider code, author/category listings, and the sample post.
- Redirected the three retired public URLs to retained pages.
- Kept Google Analytics ID `G-V89GHWN541`.
- Added unique metadata, canonical URLs, social metadata, structured data, sitemap, robots file, and a useful 404 page.
- Stored public source assets locally and generates optimized responsive image variants during the build.
- Corrected broken `#` calls to action and old Pantheon-preview footer URLs.
- Added keyboard focus treatment, a skip link, descriptive alternatives, reduced-motion support, and improved contrast.

The machine-readable inventories are [current-site/site-inventory.json](current-site/site-inventory.json) and [rebuilt-site/site-inventory.json](rebuilt-site/site-inventory.json). The final automated browser audit is [rebuilt-site/accessibility-report.json](rebuilt-site/accessibility-report.json).
