import type { ImageMetadata } from "astro";
import katria from "../assets/images/team/katria.png";
import jared from "../assets/images/team/jared.png";
import richard from "../assets/images/team/richard.png";
import lance from "../assets/images/team/lance.jpg";
import ben from "../assets/images/team/ben.jpg";

export type TeamMember = {
  name: string;
  title: string;
  image: ImageMetadata;
  imagePosition?: string;
  biography: string[];
};

export const team: TeamMember[] = [
  {
    name: "Katria Lesser",
    title: "Owner, Web Developer & Designer",
    image: katria,
    imagePosition: "50% 35%",
    biography: [
      "Katria Lesser directs the team and is the lead front-end developer. Her work with universities and companies has led to a strong network in the Drupal community. She attended Brigham Young University and expanded her web design and development skills. She began working with Drupal in 2011 and has enjoyed learning other technologies. Her years at Brigham Young University involved her in many activities with the web community, including building the official BYU themes in Drupal. Katria was active in the Design Group tasked with defining a new standard BYU web identity. She then developed the BYU Web Components with the BYU Web Engineering Group and helped establish web standards and a cross-platform coding approach across campus.",
      "Katria also worked remotely for Stanford University. Her position at Stanford Web Services involved helping different departments and doing front-end development with Drupal and other technologies. She helped establish base themes used by multiple sites and explored new technologies to prepare for headless projects. Her team now does contract work with several teams at Stanford.",
      "Katria has been involved with the Drupal Utah group and has assisted with training and educational events. She has also worked freelance with companies including Imagine Learning and Sure Leader.",
      "She enjoys theming and web design because they connect with her creative interests. She enjoys acrylic and watercolor painting, scrapbooking, and playing with her daughter. On a Saturday afternoon, you might find her crocheting, watching cooking shows, or making home décor projects. She believes you can find art in any part of life. She lives with her husband and daughter in Vineyard, Utah.",
    ],
  },
  {
    name: "Jared Hale",
    title: "AI Specialist Web Developer & Creative Technologist",
    image: jared,
    biography: [
      "Jared is a multidisciplinary web developer and creative technologist with experience across WordPress, Drupal, custom HTML and JavaScript, analytics, and interactive development. He uses modern AI-powered workflows to accelerate research, implementation, debugging, and optimization while keeping project goals, sound architecture, and careful review at the center of the work.",
      "His background also includes GA4 and Google Tag Manager instrumentation, data visualization, local and hosted language-model workflows, Unreal Engine development, and hands-on technical troubleshooting. He enjoys turning complex technical needs into efficient, maintainable digital experiences.",
    ],
  },
  {
    name: "Richard Dworianyn",
    title: "Drupal Developer, Back-End Developer",
    image: richard,
    biography: [
      "Richard has over 17 years of experience in web development using Drupal, PHP, MySQL, and JavaScript. His focus and specialties lie in data architecture and design for small to medium-sized businesses. He primarily works on back-end Drupal development and server management. He has a bachelor’s degree in Management Information Systems and a master’s degree in Library and Information Science. During his free time, he enjoys baking, table tennis, and video games.",
    ],
  },
  {
    name: "Lance Hale",
    title: "Web Developer",
    image: lance,
    imagePosition: "50% 38%",
    biography: [
      "Lance enjoys creating elegant solutions to present data and automate tasks. He has an engineering background with over twenty years of software and web development experience. Lance worked for networking giant Novell, Inc., doing technical support, product testing, and software engineering. He polished his skills working at Extended Systems before founding Print Tracker, a company with customers on six continents. Lance enjoys research and development, troubleshooting, and taking on challenges.",
      "Lance lives with his family in Boise, Idaho, where he enjoys outdoor activities and caring for his chickens. He enjoys setting up zip lines and go-kart arenas in their large yard for the kids.",
    ],
  },
  {
    name: "Ben Hall",
    title: "Full-Stack Drupal Developer",
    image: ben,
    imagePosition: "50% 55%",
    biography: [
      "Ben is a full-stack web developer with 13 years of Drupal experience across full-time and freelance roles. His work in university and nonprofit environments spans site building, front-end development, and support for back-end and server-side systems. He increasingly specializes in custom Drupal modules and solutions tailored to each project’s needs.",
      "Ben enjoys the problem-solving side of web development and learning new technologies as projects evolve. Outside of work, he enjoys reading, playing video games, and spending time with his wife.",
    ],
  },
];
