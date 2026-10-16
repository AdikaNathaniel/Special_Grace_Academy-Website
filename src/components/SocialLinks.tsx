import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";
import { school } from "@/lib/site";

// Each circle is filled with the platform's brand colour (Instagram's gradient) with the white logo mark on top.
const icons: Record<string, { Icon: IconType; background: string }> = {
  Facebook: { Icon: FaFacebookF, background: "#1877F2" },
  Instagram: {
    Icon: FaInstagram,
    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  },
  TikTok: { Icon: FaTiktok, background: "#000000" },
  YouTube: { Icon: FaYoutube, background: "#FF0000" },
  LinkedIn: { Icon: FaLinkedinIn, background: "#0A66C2" },
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {school.social.map((s) => {
        const icon = icons[s.label];
        if (!icon) return null;
        const { Icon, background } = icon;
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${school.name} on ${s.label}`}
              title={s.label}
              style={{ background }}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <Icon size={22} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
