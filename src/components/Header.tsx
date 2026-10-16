"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, school, type NavLink } from "@/lib/site";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition ${open ? "rotate-180" : ""}`} aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Dropdown({ label, items, active, isActive }: { label: string; items: NavLink[]; active: boolean; isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`px-3 py-2 font-display text-sm font-semibold transition ${
          active || open ? "text-grace-900" : "text-grace-900/75 hover:text-grace-900"
        }`}
      >
        {label}
      </button>
      {open && (
        // pt-2 bridges the gap so the menu stays open while the pointer moves down to it.
        <div className="absolute top-full left-0 pt-2">
          <ul className="w-52 overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-grace-100">
            {items.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 font-display text-sm font-semibold transition ${
                    isActive(child.href) ? "bg-grace-50 text-grace-900" : "text-grace-900/75 hover:bg-grace-50 hover:text-grace-900"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    `rounded-full px-3 py-2 font-display text-sm font-semibold transition ${
      active ? "bg-grace-50 text-grace-900" : "text-grace-900/75 hover:text-grace-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-grace-100 bg-white/95 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/crest.png" alt="" width={44} height={48} preload />
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold tracking-wide text-grace-900 sm:text-lg">
              SPECIAL GRACE ACADEMY
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap text-gold-600 uppercase min-[400px]:text-[11px] min-[400px]:tracking-[0.18em]">
              {school.motto}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              "children" in item ? (
                <Dropdown
                  key={item.label}
                  label={item.label}
                  items={item.children}
                  active={item.children.some((c) => isActive(c.href))}
                  isActive={isActive}
                />
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass(isActive(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li className="ml-2">
              <Link href="/admissions#apply" className="btn-gold py-2.5">
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-grace-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-grace-100 bg-white lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {nav.map((item) => {
              const mobileLink = (link: NavLink, nested = false) => (
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 font-display font-semibold ${nested ? "pl-6 text-sm" : ""} ${
                    isActive(link.href) ? "bg-grace-50 text-grace-900" : "text-grace-900/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
              if (!("children" in item)) return <li key={item.href}>{mobileLink(item)}</li>;
              const expanded = mobileGroup === item.label;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileGroup(expanded ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-display font-semibold text-grace-900/80"
                  >
                    {item.label}
                    <Chevron open={expanded} />
                  </button>
                  {expanded && (
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>{mobileLink(c, true)}</li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="pt-2">
              <Link href="/admissions#apply" onClick={() => setOpen(false)} className="btn-gold w-full">
                Apply Now
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
