"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#home", label: "Action Learning" },
  { href: "/#contact", label: "WIAL’s Team" },
  { href: "/#events", label: "Conferences" },
  { href: "/#events", label: "Our Clients" },
  { href: "/#events", label: "Programs" },
  { href: "/#events", label: "Better World" },
  { href: "/about", label: "About Us" },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: FaTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/96 shadow-sm backdrop-blur">
      <div className="bg-[#d50f45] text-white">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-3 text-sm uppercase tracking-[0.3em] sm:px-8 lg:px-10">
          <span>Home</span>
          <div className="flex items-center gap-3 text-xs tracking-normal">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="transition hover:opacity-80"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b-4 border-[#17a8c4]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-6 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-4" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/wial-usa-placeholder-optimized-removebg-preview.png"
            alt="WIAL USA logo"
            width={220}
            height={113}
            className="h-auto w-[165px] sm:w-[200px]"
            priority
          />
        </Link>

        <nav className="hidden items-center justify-end gap-7 text-[1.05rem] font-medium text-[#107d98] lg:flex">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`transition hover:text-[#d50f45] ${
                item.label === "Home" ? "text-[#d50f45]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:border-[#d50f45] hover:text-[#d50f45] lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

        {menuOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-[1280px] flex-col px-6 py-4 sm:px-8 lg:px-10">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 transition hover:text-[#d50f45]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
      </div>
    </header>
  );
}
