// News posts, newest first. To add a post, copy an entry and put its photos in /public/images/news.

export type NewsPost = {
  slug: string;
  title: string;
  date?: string; // ISO yyyy-mm-dd
  time?: string;
  venue?: string;
  excerpt: string;
  body: string[];
  images: string[];
};

export const news: NewsPost[] = [
  {
    slug: "safety-awareness-day-with-the-police",
    title: "Safety & Awareness Day with the Police",
    date: "2025-05-30",
    time: "1:00 pm",
    venue: "Special Grace Academy School Auditorium",
    excerpt:
      "Officers from the Ghana Police Service visited to talk with students about safety, discipline and civic responsibility.",
    body: [
      "As part of our ongoing efforts to strengthen community relationships and promote student safety, officers from the Ghana Police Service visited Special Grace Academy.",
      "The visit featured interactive sessions on safety, discipline and civic responsibility, followed by a question-and-answer time where students could speak directly with the officers.",
      "We are grateful to the officers for this meaningful engagement with our students.",
    ],
    images: [
      "/images/police-visit-talk.png",
      "/images/police-visit-arrival.png",
      "/images/police-visit-group.png",
    ],
  },
  {
    slug: "career-workshop-day",
    title: "Career Workshop Day: “My Story, Your Inspiration”",
    date: "2025-03-21",
    time: "11:00 am",
    venue: "Special Grace Academy School Auditorium",
    excerpt:
      "A career seminar where guests who overcame challenges shared their journeys to success.",
    body: [
      "All students took part in our career workshop, “My Story, Your Inspiration”.",
      "Guests who have overcome challenges and found success in their careers shared their experiences to inspire our students to dream big and work hard.",
    ],
    images: ["/images/career-day-nurse.jpg"],
  },
  {
    slug: "african-day-celebration",
    title: "African Day Celebration",
    date: "2025-03-05",
    time: "7:00 am",
    venue: "Special Grace Academy Premises",
    excerpt:
      "Students and staff celebrated our heritage in traditional attire with performances and traditional food.",
    body: [
      "Students and staff celebrated African Day dressed in traditional and cultural attire.",
      "The day was filled with activities, performances and traditional foods celebrating the richness of African culture.",
    ],
    images: ["/images/face-paint.jpg"],
  },
  {
    slug: "stem-club-visit-asustem-robotics",
    title: "STEM Club Visits the Asustem Robotics Center",
    excerpt:
      "Our STEM Club explored robotics, AI and automation with hands-on activities and industry experts.",
    body: [
      "Our STEM Club visited the Asustem Robotics Center to explore robotics, artificial intelligence and automation.",
      "Members took part in hands-on activities and met industry experts. Students who are passionate about science and technology are warmly invited to join the club.",
    ],
    images: ["/images/jhs-stem.jpg"],
  },
  {
    slug: "phyllisangel-excels-in-2024-bece",
    title: "Phyllisangel Excels in the 2024 BECE",
    excerpt:
      "Phyllisangel Frema Jingles earned an outstanding aggregate 7 in the 2024 BECE.",
    body: [
      "Congratulations to Phyllisangel Frema Jingles, who earned an aggregate of 7 in the 2024 Basic Education Certificate Examination (BECE).",
      "We celebrate her dedication, discipline and determination, and wish her every success in the next phase of her education.",
    ],
    images: [],
  },
  {
    slug: "visit-to-kwame-nkrumah-memorial-park",
    title: "A Visit to the Kwame Nkrumah Memorial Park & Museum",
    excerpt:
      "Students explored the rich history of Ghana at the Kwame Nkrumah Memorial Park and Museum.",
    body: [
      "Our students explored the rich history of Ghana at the Kwame Nkrumah Memorial Park and Museum, learning about Osagyefo Dr. Kwame Nkrumah and the story of independence.",
    ],
    images: [
      "/images/trip-nkrumah-mausoleum.jpg",
      "/images/trip-nkrumah-park.jpg",
      "/images/trip-group-steps.jpg",
    ],
  },
  {
    slug: "new-school-prefects",
    title: "New School Prefects Elected",
    excerpt: "A message from Darryl Obodai, our School Prefect Elect.",
    body: [
      "Our new school prefects have been elected. School Prefect Elect Darryl Obodai thanked everyone who voted for him.",
      "He shared that his goal is to foster unity and cooperation across the school, and to promote respect and kindness among all students.",
    ],
    images: [],
  },
  {
    slug: "a-visit-from-colgate",
    title: "A Visit from Colgate",
    excerpt: "The Colgate team taught our students about good oral hygiene.",
    body: [
      "The Colgate team visited Special Grace Academy as part of their community outreach programme to teach students about oral hygiene.",
      "We thank Colgate for the visit and look forward to more education on healthy habits.",
    ],
    images: [],
  },
];

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
