import type { ImageMetadata } from "astro";
import stanfordUit from "../assets/images/portfolio/stanford-uit.jpg";
import sunlightGiving from "../assets/images/portfolio/sunlight-giving.jpg";
import wildcardGiving from "../assets/images/portfolio/wildcard-giving.jpg";
import byu from "../assets/images/portfolio/byu.jpg";
import z1 from "../assets/images/portfolio/z1-consultant.svg";
import rbb from "../assets/images/portfolio/rbb-marketing.jpg";
import givingStanford from "../assets/images/portfolio/giving-stanford.jpg";
import stanfordEarth from "../assets/images/portfolio/stanford-earth.jpg";
import goodGravy from "../assets/images/portfolio/good-gravy-films.jpg";
import clientCenter from "../assets/images/portfolio/client-center-360.jpg";
import speechCloud from "../assets/images/portfolio/speech-cloud.jpg";
import familyWholeness from "../assets/images/portfolio/family-wholeness.jpg";
import hiscox from "../assets/images/portfolio/hiscox.jpg";
import boiseDiscovery from "../assets/images/portfolio/boise-discovery.jpg";
import imagineLearning from "../assets/images/portfolio/imagine-learning.jpg";

export type PortfolioProject = {
  name: string;
  url: string;
  image: ImageMetadata;
  services: string;
  description: string;
  size: "wide" | "standard";
  imagePosition?: string;
  historical?: boolean;
};

export const portfolio: PortfolioProject[] = [
  {
    name: "Stanford University IT",
    url: "https://uit.stanford.edu/",
    image: stanfordUit,
    services: "Front-end development · Design systems · Documentation",
    description: "Theme foundations, reusable component work, documentation, and web standards supporting Stanford’s broader digital ecosystem.",
    size: "wide",
    imagePosition: "50% 24%",
  },
  {
    name: "Sunlight Giving",
    url: "https://sunlightgiving.org/",
    image: sunlightGiving,
    services: "Design enhancement · Drupal · Data presentation",
    description: "Design, maintenance, and improvements to grant and grantee information within the Wildcard Giving family.",
    size: "standard",
  },
  {
    name: "Wildcard Giving",
    url: "https://wildcardgiving.org/",
    image: wildcardGiving,
    services: "Web design · Development · Content architecture",
    description: "A cohesive digital experience bringing several philanthropic entities and their shared values together.",
    size: "standard",
  },
  {
    name: "Brigham Young University",
    url: "https://www.byu.edu/",
    image: byu,
    services: "Drupal · Theming · Web components",
    description: "Homepage development, official Drupal themes, reusable web components, and university-wide design standards.",
    size: "wide",
    imagePosition: "50% 25%",
  },
  {
    name: "Z1 Consultant",
    url: "https://z1consultant.com/",
    image: z1,
    services: "WordPress · Redesign · User journey",
    description: "A WordPress redesign and targeted improvements focused on clarity, conversion, and a stronger client journey.",
    size: "wide",
    imagePosition: "50% 10%",
  },
  {
    name: "RBB Marketing",
    url: "https://rbbmarketing.com/",
    image: rbb,
    services: "Full design · WordPress build · Brand implementation",
    description: "A complete website design and build presenting a broad collection of marketing services and client resources.",
    size: "standard",
  },
  {
    name: "Giving at Stanford",
    url: "https://giving.stanford.edu/",
    image: givingStanford,
    services: "Storyblok · Headless React · Front-end theming",
    description: "Foundational headless research and front-end theming contributions for Stanford’s giving experience.",
    size: "standard",
  },
  {
    name: "Stanford Doerr School of Sustainability",
    url: "https://earth.stanford.edu/",
    image: stanfordEarth,
    services: "Drupal · Front-end styling · Maintenance",
    description: "Front-end improvements and ongoing maintenance for Stanford Earth’s earlier digital experience.",
    size: "wide",
    historical: true,
  },
  {
    name: "Good Gravy Films",
    url: "https://goodgravyfilms.org/",
    image: goodGravy,
    services: "Design enhancement · Development · Maintenance",
    description: "Website design enhancements and development support for an organization funding independent film.",
    size: "wide",
  },
  {
    name: "ClientCenter360",
    url: "https://clientcenter360.com/",
    image: clientCenter,
    services: "Product design · Development · Client resources",
    description: "A designed and built client resource platform supporting promotional-industry businesses and their customers.",
    size: "standard",
  },
  {
    name: "SpeechCloud",
    url: "https://speechcloud.com/",
    image: speechCloud,
    services: "Web assets · Visual design · Print collateral",
    description: "Web and print resources shaped to support a consistent, professional product presentation.",
    size: "standard",
  },
  {
    name: "Family Wholeness",
    url: "https://familywholeness.org/",
    image: familyWholeness,
    services: "Web assets · Visual design · Content support",
    description: "Visual and web resources created to clarify the organization’s mission and connect with its audience.",
    size: "wide",
  },
  {
    name: "Hiscox",
    url: "https://www.hiscox.com/",
    image: hiscox,
    services: "Enterprise Drupal development",
    description: "Drupal development contributions within a large-scale business website environment.",
    size: "wide",
    historical: true,
  },
  {
    name: "Boise Discovery",
    url: "https://boisediscovery.com/",
    image: boiseDiscovery,
    services: "Small-business WordPress development",
    description: "A practical WordPress presence built around the needs of a growing local business.",
    size: "standard",
  },
  {
    name: "Imagine Learning",
    url: "https://www.imaginelearning.com/",
    image: imagineLearning,
    services: "Drupal · Vue components · Editorial UX",
    description: "Drupal architecture, reusable components, and editorial-experience improvements for earlier versions of Imagine Learning websites.",
    size: "standard",
    historical: true,
  },
];
