import type { ImageMetadata } from "astro";
import stanfordUit from "../assets/images/portfolio/stanford-uit.jpg";
import sunlightGiving from "../assets/images/portfolio/sunlight-giving.jpg";
import wildcardGiving from "../assets/images/portfolio/wildcard-giving.jpg";
import byu from "../assets/images/portfolio/byu.jpg";
import rbb from "../assets/images/portfolio/rbb-marketing.jpg";
import givingStanford from "../assets/images/portfolio/giving-stanford.jpg";
import goodGravy from "../assets/images/portfolio/good-gravy-films.jpg";
import clientCenter from "../assets/images/portfolio/client-center-360.jpg";
import speechCloud from "../assets/images/portfolio/speech-cloud.jpg";
import hiscox from "../assets/images/portfolio/hiscox.jpg";
import imagineLearning from "../assets/images/portfolio/imagine-learning.jpg";
import jlCustomHomePlans from "../assets/images/portfolio/jl-custom-home-plans.jpg";

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
    name: "Giving at Stanford",
    url: "https://giving.stanford.edu/",
    image: givingStanford,
    services: "Storyblok · Headless React · Front-end theming",
    description: "Foundational headless research and front-end theming contributions for Stanford’s giving experience.",
    size: "wide",
    imagePosition: "50% 20%",
  },
  {
    name: "RBB Marketing",
    url: "https://rbbmarketing.com/",
    image: rbb,
    services: "Full design · WordPress build · Email marketing · Brand implementation",
    description: "A complete website design and build presenting a broad collection of marketing services and client resources.",
    size: "standard",
  },
  {
    name: "Good Gravy Films",
    url: "https://goodgravyfilms.org/",
    image: goodGravy,
    services: "Design enhancement · Development · Maintenance",
    description: "Website design enhancements and development support for an organization funding independent film.",
    size: "standard",
  },
  {
    name: "ClientCenter360",
    url: "https://clientcenter360.com/",
    image: clientCenter,
    services: "Product design · Development · Client resources",
    description: "Designed and built client resource platform supporting promotional-industry businesses and their customers.",
    size: "wide",
  },
  {
    name: "Imagine Learning",
    url: "https://www.imaginelearning.com/",
    image: imagineLearning,
    services: "Drupal site planning · Theming · Drupal version upgrades",
    description: "Contributed to their customer support website for several years.",
    size: "wide",
  },
  {
    name: "SpeechCloud",
    url: "https://speechcloud.com/",
    image: speechCloud,
    services: "Web assets · Visual design",
    description: "Web assets and visual design shaped to support a consistent, professional product presentation for an earlier version of this website.",
    size: "standard",
  },
  {
    name: "JL Custom Home Plans",
    url: "https://jlcustomhomeplans.com/index.html",
    image: jlCustomHomePlans,
    services: "Web design · Development · Plan gallery",
    description: "A custom house plan website presenting front elevations and floor plans through an interactive plan gallery.",
    size: "standard",
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
];
