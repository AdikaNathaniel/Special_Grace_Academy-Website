import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import ContactForm from "@/components/ContactForm";
import { PageHero, SectionHeading } from "@/components/ui";
import { getHeroPhotos } from "@/lib/pixieset";
import { school } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, email or visit Special Grace Academy in Tantra Hills, Accra.",
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(school.mapQuery)}`;

const cards: { icon: IconType; label: string; value: string; action: string; href: string; external?: boolean }[] = [
  { icon: FaLocationDot, label: "Visit us", value: school.address, action: "Get directions", href: directionsUrl, external: true },
  { icon: FaPhone, label: "Call us", value: school.phone, action: "Call now", href: school.phoneHref },
  { icon: FaEnvelope, label: "Email us", value: school.email, action: "Send an email", href: `mailto:${school.email}` },
];

export default async function ContactPage() {
  const heroPhotos = await getHeroPhotos(24);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        intro="Questions about admissions, fees or a school visit? Reach out and our team will get back to you."
        image="/images/student-smile.jpg"
        images={heroPhotos}
      />

      {/* Contact cards overlap the banner */}
      <section className="relative z-10 -mt-12 sm:-mt-16">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, action, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-w-0 flex-col rounded-3xl bg-white p-7 shadow-xl ring-1 shadow-grace-900/10 ring-grace-100 transition hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-grace-900">
                <Icon size={24} aria-hidden />
              </span>
              <p className="eyebrow mt-6">{label}</p>
              <p
                className={`mt-2 flex-1 font-display leading-snug font-bold wrap-break-word text-grace-900 ${
                  label === "Email us" ? "text-base sm:text-lg lg:text-base xl:text-lg" : "text-lg"
                }`}
              >
                {/* Let long email addresses wrap after the @ rather than mid-word. */}
                {value.includes("@") ? (
                  <>
                    {value.split("@")[0]}@<wbr />
                    {value.split("@")[1]}
                  </>
                ) : (
                  value
                )}
              </p>
              <span className="mt-5 text-sm font-bold text-grace-500 group-hover:text-grace-900">{action} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Message form + map */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Ask us anything"
              intro="Tell us a little about what you need and we'll get back to you as soon as possible."
            />
            <div className="mt-10">
              <ContactForm email={school.email} />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative min-h-[26rem] flex-1 overflow-hidden rounded-3xl shadow-xl ring-1 shadow-grace-900/10 ring-grace-100">
              <iframe
                title="Map to Special Grace Academy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(school.mapQuery)}&z=16&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-2xl bg-grace-900/95 p-5 text-white shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display font-bold">Find us in Tantra Hills</p>
                  <p className="text-sm text-grace-100">2nd Lane, behind Champion Divine Clinic</p>
                </div>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold shrink-0 py-2.5">
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
