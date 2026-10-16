import type { PixiesetGallery } from "@/lib/pixieset";

// All school content lives here so it can be updated without touching page layouts.

export const school = {
  name: "Special Grace Academy",
  motto: "Integrity and Excellence",
  founded: 2009,
  levels: ["Preschool", "Primary", "JHS"],
  tagline:
    "Nurturing and empowering every child through holistic education built on discipline, excellence and moral integrity.",
  summary:
    "Special Grace Academy is a forward-thinking Christian school dedicated to raising well-rounded learners through a blend of academic excellence, moral discipline and innovative teaching. We equip students not just for exams, but for life.",
  phone: "+233 54 368 7558",
  phoneHref: "tel:+233543687558",
  email: "specialgrace.academy.edu@gmail.com",
  address: "Tantra Hills, 2nd Lane, Behind Champion Divine Clinic, Accra, Ghana",
  mapQuery: "Champion Divine Clinic, Tantra Hills, Accra",
  heroVideo: { id: "X3YWT9ctXII", start: 4 }, // 2025 Graduation Ceremony, from 0:04
  aboutVideo: { id: "rxxXF7LB0LE", start: 248 }, // 2024 Graduation Ceremony, from 4:08
  social: [
    { label: "Facebook", href: "https://www.facebook.com/specialgraceacademy" },
    { label: "Instagram", href: "https://www.instagram.com/specialgraceacademy/" },
    { label: "TikTok", href: "https://www.tiktok.com/@specialgraceacademy" },
    { label: "YouTube", href: "https://www.youtube.com/@specialgraceacademy" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/specialgraceacademy" },
  ],
  enrollForms: {
    primary: "https://forms.gle/7EWu1NRDAhq6sXGj9",
    jhs: "https://forms.gle/8VKkdxGsMTjqDWh6A",
  },
} as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Admissions", href: "/admissions" },
    ],
  },
  { label: "Student Life", href: "/student-life" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const navLinks: NavLink[] = nav.flatMap((item) => ("children" in item ? item.children : [item]));

export const vision =
  "To raise and develop academically brilliant and God-fearing children who will be useful to society.";

export const mission = [
  "To recruit qualified, disciplined teachers who will carefully train children in a sound and nurturing environment.",
  "To motivate teachers to work hand in hand with parents in the development of every child, at home and at school.",
];

export const values = [
  {
    title: "Faith",
    text: "Biblically grounded teaching that shapes character as much as intellect.",
  },
  {
    title: "Integrity",
    text: "Honesty, respect and responsibility in everything our learners do.",
  },
  {
    title: "Excellence",
    text: "Rigorous academics and high expectations for every child.",
  },
  {
    title: "Partnership",
    text: "Teachers and parents working together for each child's growth.",
  },
];

export type Leader = { name: string; role: string; group: "management" | "academics" };

export const leaders: Leader[] = [
  { name: "Apostle Hannah Etsiakoh", role: "Proprietress", group: "management" },
  { name: "Bishop Thomas Etsiakoh", role: "Director", group: "management" },
  { name: "Samuel Etsiakoh", role: "Director of Operations & Strategy", group: "management" },
  { name: "Mr. Benjamin Osei Boateng", role: "Headmaster", group: "academics" },
  { name: "Ms. Lydia", role: "Assistant Headmistress", group: "academics" },
  { name: "Mr. Bismark", role: "Head of Academics", group: "academics" },
];

export const proprietressMessage = [
  "Welcome to Special Grace Academy. We are committed to providing a nurturing and intellectually stimulating environment where every child receives a comprehensive education.",
  "We believe the best results come when home and school work together. We warmly invite parents to take an active part in their children's education as we build that partnership.",
];

export const headmasterMessage = [
  "Welcome to our departments. Each is led by dedicated educators with expertise and a deep commitment to nurturing excellence.",
  "Together, our departments deliver a rigorous, faith-based education that helps every learner reach their full potential. We invite you to explore how we develop both minds and character.",
];

export type Program = {
  slug: string;
  title: string;
  kind: "level" | "enrichment";
  image?: string;
  summary: string;
  body: string[];
  highlights: string[];
  /** Pixieset gallery whose photos are shown on the programme page. */
  pixieset?: PixiesetGallery;
};

export const programs: Program[] = [
  {
    slug: "preschool",
    title: "Preschool",
    kind: "level",
    image: "/images/preschool.jpg",
    summary:
      "Play-based early learning through storytelling, music and creative activities.",
    body: [
      "Our preschool gives young learners a safe, nurturing environment to grow, explore and build foundational skills.",
      "Through storytelling, music and creative play, children develop early literacy, social skills and a lifelong love of learning.",
    ],
    highlights: ["Early literacy & numeracy", "Storytelling & music", "Social skills", "Creative play"],
  },
  {
    slug: "lower-primary",
    title: "Lower Primary",
    kind: "level",
    image: "/images/classroom-writing.jpg",
    summary:
      "Structured yet flexible learning in reading, writing, mathematics and science.",
    body: [
      "Lower Primary begins formal education with a structured but flexible approach to reading, writing, mathematics and science.",
      "Alongside core subjects, pupils build social-emotional skills, creative expression and problem-solving.",
    ],
    highlights: ["Reading & writing", "Mathematics", "Science", "Social-emotional learning"],
  },
  {
    slug: "upper-primary",
    title: "Upper Primary",
    kind: "level",
    image: "/images/primary-computer.jpg",
    summary:
      "Independent learning, critical thinking and technology, preparing pupils for JHS.",
    body: [
      "Upper Primary builds on earlier foundations with independent learning and critical thinking.",
      "Project-based learning, collaborative problem-solving and technology integration prepare pupils for Junior High School.",
    ],
    highlights: ["Critical thinking", "Project-based learning", "ICT integration", "JHS readiness"],
  },
  {
    slug: "junior-high",
    title: "Junior High School",
    kind: "level",
    image: "/images/jhs-stem.jpg",
    summary:
      "Academic excellence, personal responsibility and global awareness for JHS 1–3.",
    body: [
      "Junior High School (JHS 1–3) offers a well-rounded education that prepares students for senior high school and beyond.",
      "Students study advanced mathematics, sciences, humanities, languages and creative arts, with leadership development, career awareness and mentorship. Our students prepare for the Basic Education Certificate Examination (BECE).",
    ],
    highlights: ["Mathematics & sciences", "Languages & humanities", "BECE preparation", "Leadership & mentorship"],
  },
  {
    slug: "cadet",
    title: "Cadet Programme",
    kind: "enrichment",
    summary: "Discipline, service and leadership through training, drills and outdoor expeditions.",
    body: [
      "Our cadet programme builds discipline, service and leadership through training, drills, outdoor expeditions and community service.",
    ],
    highlights: ["Drills & training", "Outdoor expeditions", "Community service", "Leadership"],
  },
  {
    slug: "music",
    title: "Music Programme",
    kind: "enrichment",
    summary: "Instruments, music reading, ensembles and concerts.",
    body: [
      "Students learn to play instruments, read music and perform in ensembles and concerts, building cognitive ability, discipline and self-esteem.",
    ],
    highlights: ["Instruments", "Music reading", "Ensembles", "Concerts"],
  },
  {
    slug: "young-mogul",
    title: "Young Mogul",
    kind: "enrichment",
    summary: "Entrepreneurship: ideas, business planning, financial literacy and pitching.",
    body: [
      "Young Mogul introduces students to entrepreneurship: idea development, business planning, financial literacy, marketing and presentation skills, through mentorship, workshops and real-world experience.",
    ],
    highlights: ["Idea development", "Financial literacy", "Marketing", "Presentation skills"],
  },
  {
    slug: "stem",
    title: "STEM Club & Community Training",
    kind: "enrichment",
    summary: "Hands-on science, technology, robotics and coding.",
    body: [
      "Our STEM Club explores science and technology through hands-on activities, including robotics, AI and automation, and visits to centres such as the Asustem Robotics Center.",
      "We also run Community STEM Training to share these opportunities beyond our classrooms.",
    ],
    highlights: ["Robotics", "Coding & AI", "Field visits", "Community training"],
    pixieset: { collection: "studentexperience", gallery: "steam" },
  },
];

export const testimonial = {
  quote: "Special Grace Academy shaped my future.",
  by: "Alumna",
};
