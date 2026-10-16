import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { getHeroPhotos } from "@/lib/pixieset";

export const metadata: Metadata = {
  title: "Student Life",
  description: "Field trips, celebrations, competitions, cadets and more at Special Grace Academy.",
};

const highlights = [
  {
    title: "Safety & Awareness Day with the Police",
    text: "Officers from the Ghana Police Service spoke with students about safety, discipline and civic responsibility.",
    image: "/images/police-visit-talk.png",
    href: "/news/safety-awareness-day-with-the-police",
  },
  {
    title: "Exploring Ghana's history",
    text: "A visit to the Kwame Nkrumah Memorial Park and Museum brought the story of independence to life.",
    image: "/images/trip-nkrumah-mausoleum.jpg",
    href: "/news/visit-to-kwame-nkrumah-memorial-park",
  },
  {
    title: "Celebrating African Day",
    text: "Students and staff celebrated our heritage in traditional attire with performances and food.",
    image: "/images/face-paint.jpg",
    href: "/news/african-day-celebration",
  },
  {
    title: "A week of artistic exploration",
    text: "Pupils unleashed their creativity with drawing, colouring and craft throughout art week.",
    image: "/images/art-week.jpg",
  },
  {
    title: "Reading & library visits",
    text: "Our pupils were celebrated at the Ghana Library Authority's Children & Mobile Library.",
    image: "/images/library-award.jpg",
  },
  {
    title: "Career day",
    text: "Students dressed for their dream careers and heard inspiring stories from guests.",
    image: "/images/career-day-nurse.jpg",
    href: "/news/career-workshop-day",
  },
];

const activities = [
  { title: "School Cadets", text: "Discipline, drills and service.", href: "/academics/cadet" },
  { title: "STEM Club", text: "Robotics, coding and field visits.", href: "/academics/stem" },
  { title: "Music", text: "Instruments, ensembles and concerts.", href: "/academics/music" },
  { title: "Young Mogul", text: "Entrepreneurship and financial literacy.", href: "/academics/young-mogul" },
  { title: "Quiz Competitions", text: "Our Lower Primary shines in quizzes." },
  { title: "Excursions", text: "Learning at Ghana's historic sites, including the James Town Lighthouse." },
];

const heroPhrases = [
  "Learning that goes beyond the classroom.",
  "Field trips that bring history to life.",
  "Celebrating our heritage together.",
  "Clubs where every talent can shine.",
  "Building confidence, one day at a time.",
  "Cadets learning discipline and service.",
  "Young scientists exploring STEM.",
  "Music, art and creativity every week.",
  "Friendships that last a lifetime.",
  "Growing in faith, character and joy.",
];

export default async function StudentLifePage() {
  const heroPhotos = await getHeroPhotos("student-life");
  return (
    <>
      <PageHero
        phrases={heroPhrases}
        image="/images/trip-group-steps.jpg"
        images={heroPhotos}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Highlights" title="Recent experiences" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => {
              const inner = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={h.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-grace-900">{h.title}</h3>
                  <p className="mt-2 text-grace-950/70">{h.text}</p>
                </>
              );
              return h.href ? (
                <Link key={h.title} href={h.href} className="group">{inner}</Link>
              ) : (
                <div key={h.title} className="group">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-grace-900 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading light eyebrow="Clubs & activities" title="Something for every student" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => {
              const cls = "block rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition";
              const inner = (
                <>
                  <h3 className="font-display text-lg font-bold text-gold-500">{a.title}</h3>
                  <p className="mt-1 text-grace-100">{a.text}</p>
                </>
              );
              return a.href ? (
                <Link key={a.title} href={a.href} className={`${cls} hover:bg-white/10`}>{inner}</Link>
              ) : (
                <div key={a.title} className={cls}>{inner}</div>
              );
            })}
          </div>
          <div className="mt-12">
            <Link href="/gallery" className="btn-gold">View the Gallery</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
