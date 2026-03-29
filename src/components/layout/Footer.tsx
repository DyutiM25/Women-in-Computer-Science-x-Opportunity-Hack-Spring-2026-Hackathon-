import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: FaTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export function Footer() {
  return (
    <footer className="mt-8 bg-[#d50f45] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-6 text-sm sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p>© Copyright 2025 WIAL | Privacy Policy</p>
          <div className="flex gap-4 text-base">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="transition hover:opacity-80"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <nav className="flex flex-wrap gap-8 text-base">
          <Link href="/">Home</Link>
          <Link href="/#home">Action Learning</Link>
          <Link href="/#contact">WIAL’s Team</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
