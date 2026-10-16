"use client";

import { useState, type FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa6";

const topics = ["Admissions", "School fees", "Book a school visit", "General enquiry"];

const field =
  "mt-2 w-full rounded-xl border border-grace-200 bg-white px-4 py-3 text-grace-950 placeholder:text-grace-950/40 focus:border-grace-500 focus:ring-2 focus:ring-grace-200 focus:outline-none";

/** No server needed: the form composes an email in the visitor's own mail app, addressed to the school. */
export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `${get("topic")}: enquiry from ${get("name")}`;
    const body = [get("message"), "", `Name: ${get("name")}`, `Phone: ${get("phone") || "-"}`].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold text-grace-900">
        Your name
        <input name="name" required autoComplete="name" placeholder="e.g. Ama Mensah" className={field} />
      </label>
      <label className="block text-sm font-semibold text-grace-900">
        Phone number <span className="font-normal text-grace-950/50">(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="e.g. 024 000 0000" className={field} />
      </label>
      <label className="block text-sm font-semibold text-grace-900 sm:col-span-2">
        What is it about?
        <select name="topic" className={field} defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold text-grace-900 sm:col-span-2">
        Message
        <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-purple">
          <FaPaperPlane aria-hidden /> Send message
        </button>
        <p className="text-sm text-grace-950/60" aria-live="polite">
          {sent ? "Your email app should now be open with your message ready to send." : "This opens your email app with your message ready to send."}
        </p>
      </div>
    </form>
  );
}
