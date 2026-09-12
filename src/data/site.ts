export const site = {
  name: "Dev By Design",
  legalName: "Dev By Design LLC",
  url: "https://webdevbydesign.com",
  email: "Katria.Lesser@WebDevByDesign.com",
  analyticsId: "G-V89GHWN541",
  salesIqWidgetUrl: "https://salesiq.zohopublic.com/widget?wc=siq80849ebe0a0989eaba6fdf41558f7acdd9f5788d236d14d2d74b8ce1c7241aea",
  description: "Professional web design, development, accessibility testing, and content services for businesses, nonprofits, and universities.",
  linkedIn: "https://www.linkedin.com/company/dev-by-design/about/",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us/" },
    { label: "Portfolio", href: "/portfolio/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Contact", href: "/contact-us/" },
  ],
} as const;

export const emailHref = (subject = "Website project inquiry") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
