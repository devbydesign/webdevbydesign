export type Testimonial = {
  slug: string;
  name: string;
  excerpt: string;
  quote: string[];
  role: string;
  organization: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    slug: "bryan-o",
    name: "Bryan O.",
    excerpt: "Katria is an awesome Drupal developer and front-end developer. She can build and maintain Drupal sites as well as build them out as headless web services and web component development...",
    quote: [
      "Katria is an awesome Drupal developer and front end developer. She can build and maintain Drupal sites as well as build them out as headless web services and web component development which is a-typical for a single person to be able to manage all aspects of the development stack to do this.",
      "Just as important, Katria is able to convey the complexities of Drupal and front-end development technologies to non-technical and technical team members with ease. She is welcoming, inviting, fun to work with, and I’d take 10 Katrias at my work!",
    ],
    role: "Drupal Developer",
    organization: "Penn State University",
    date: "April 2018",
  },
  {
    slug: "sherwin-h",
    name: "Sherwin H.",
    excerpt: "Katria is knowledgeable and diligent in her work habits. She spends all the necessary time to make sure she is providing a complete product that people are happy to use. I would recommend her highly...",
    quote: [
      "I really enjoyed working with Katria. She is knowledgeable and diligent in her work habits. She spends all the necessary time to make sure she is providing a complete product that people are happy to use. I would recommend her highly for any development job, even if she doesn’t have experience in a specific language or technology. She will put in the time to learn it and use those skills well.",
      "Katria has demonstrated her ability to learn and master new technologies like SASS, Web Components and even Drupal 8 (including PHP and theming changes) since I first posted her recommendation. She has also demonstrated great skill and understanding of UI/UX principles. All of these new skills with her fantastic design skills have really made Katria a rare find in the web development world: a web developer that can also create and implement a usable, nice-looking design. Updated: 9 Apr 2018",
    ],
    role: "Web Developer",
    organization: "Brigham Young University",
    date: "Updated April 2018",
  },
  {
    slug: "vicki-r",
    name: "Vicki R.",
    excerpt: "Katria has a positive 'can-do' attitude and is great to work with on all types of projects. She doesn't shy away from learning new technologies, and is very comfortable conducting any research...",
    quote: [
      "Katria has a positive 'can-do' attitude and is great to work with. She doesn’t shy away from learning new technologies, and is very comfortable conducting any research and/or training necessary to complete ambitious projects.",
    ],
    role: "Program Manager—Web Development",
    organization: "Imagine Learning",
    date: "October 2018",
  },
  {
    slug: "john-l",
    name: "John L.",
    excerpt: "Katria is one of my favorite people that I've worked with over the years. She is a creative developer with both back-end and front-end skills. Katria drives for customer success...",
    quote: [
      "Katria is one of my favorite people that I’ve worked with throughout the years. She is a creative developer with both back-end and front-end skills. Katria drives for customer success and dedicates herself to achieving results. She knows Drupal inside and out, and she makes great recommendations. Most importantly she’s consistently been friendly, kind, and dependable. I’ve enjoyed working with her, and I’m confident you will too.",
    ],
    role: "IT Communications Manager",
    organization: "Brigham Young University",
    date: "October 2018",
  },
  {
    slug: "rebecca-b",
    name: "Rebecca B.",
    excerpt: "Katria is an exceptional Drupal developer. Ever since I started working at BYU, she has provided resources and mentored me personally to help me understand the Drupal...",
    quote: [
      "Katria is an exceptional Drupal developer. Ever since I started working at BYU, she has provided resources and mentored me personally to help me understand the Drupal interface and back-end including theming, GitHub integration, module development, best practices, and efficient backups/updates.",
      "The majority of Drupal themes, modules, and trainings on campus are due to her efforts and expertise, including the integration of web components. She is more than competent in both the front-end styling and the back-end PHP. Additionally, she has an excellent eye for composition and color. Her artistic abilities are evident in both manual mediums and her skills with Photoshop, Illustrator, and web design. She has trained in User Experience and continues to build websites and themes that are flexible, responsive, and user-friendly. She is easily my go-to person for any information about web development.",
    ],
    role: "Graphic Designer · Web Developer · UX/UI Designer",
    organization: "BYU Office of Information Technology",
    date: "April 2018",
  },
];

export const getTestimonials = (slugs?: string[]) =>
  slugs ? slugs.map((slug) => testimonials.find((item) => item.slug === slug)).filter(Boolean) as Testimonial[] : testimonials;
