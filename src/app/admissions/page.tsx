import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { school } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply to Special Grace Academy: Preschool, Primary and Junior High School.",
};

const steps = [
  { title: "Get in touch", text: "Call, email or visit us to ask questions and arrange a school tour." },
  { title: "Complete the form", text: "Fill in the online application form for your child's level below." },
  { title: "Hear from us", text: "Our admissions team will contact you about next steps and available places." },
];

const forms = [
  {
    level: "Preschool",
    text: "A safe, nurturing start where young learners grow, explore and build foundational skills.",
    href: school.enrollForms.primary,
  },
  {
    level: "Primary (Lower & Upper)",
    text: "Formal education for children aged about 6 to 12, building strong foundations in every subject.",
    href: school.enrollForms.primary,
  },
  {
    level: "Junior High School",
    text: "JHS 1–3: a well-rounded education preparing students for the BECE, senior high school and beyond.",
    href: school.enrollForms.jhs,
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Join the Special Grace family."
        intro="We are excited to welcome your child. Admissions are open for Preschool, Primary and Junior High School."
        image="/images/enroll-banner.jpg"
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow="How to apply" title="Three simple steps" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-grace-50 p-8">
                <span className="font-display text-5xl font-extrabold text-gold-500">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-grace-900">{s.title}</h3>
                <p className="mt-2 text-grace-950/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="scroll-mt-28 bg-grace-900 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading light center eyebrow="Apply online" title="Choose your child's level" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {forms.map((f) => (
              <div key={f.level} className="flex flex-col rounded-3xl bg-white p-8">
                <h3 className="font-display text-xl font-bold text-grace-900">{f.level}</h3>
                <p className="mt-3 flex-1 text-grace-950/70">{f.text}</p>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
                  Open Application Form ↗
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-grace-200">Forms open in Google Forms in a new tab.</p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-10 rounded-3xl bg-gold-100 p-10 md:grid-cols-2 sm:p-14">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-grace-900">Questions about fees or requirements?</h2>
            <p className="mt-4 text-lg text-grace-950/75">
              Our admissions team is happy to talk you through requirements, fees and available places.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a href={school.phoneHref} className="btn-purple">Call {school.phone}</a>
            <Link href="/contact" className="btn border-2 border-grace-900 text-grace-900 hover:bg-grace-900 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
