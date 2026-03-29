import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { InteractiveFeature } from "@/components/home/InteractiveFeature";

const featureCards = [
  {
    eyebrow: "People",
    title: "WIAL Better World Fund",
    body: "WIAL established the WIAL Better World Fund in 2015 to provide Action Learning services to community-based organizations around the world.",
    accent: "bg-[#274b8d]",
    image: "/images/network-card.jpg",
  },
  {
    eyebrow: "News Letter",
    title: "Join Our Newsletter",
    body: "Want to stay up-to-date on all things Action Learning? Never miss a beat! Join our newsletter.",
    accent: "bg-[#ff5b93]",
    image: "/images/network-card.jpg",
    cta: "Sign up Today",
    ctaHref: "/newsletter",
  },
  {
    eyebrow: "Certifications",
    title: "In-House Programs",
    body: "Want to bring Action Learning to your business? We have In-House programs where a certified coach will conduct Action Learning training.",
    accent: "bg-[#f3a533]",
    image: "/images/network-card.jpg",
  },
];

const mostReadColumns = [
  {
    heading: "WIAL Talk",
    links: ["Scenario: Questions/Answers", "Scenario: Multiple Variables"],
  },
  {
    heading: "Education",
    links: ["Optimizing the Power of Action Learning", "Power of Action Learning"],
  },
  {
    heading: "People",
    links: ["WIAL Better World Fund", "Executive Board"],
  },
  {
    heading: "WIAL Action Learning Brochure",
    links: ["Action Learning Brochure"],
  },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: FaTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 px-4 py-8 sm:px-8 lg:px-10">
      <InteractiveFeature />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#8da7ff]">
            What is Action Learning
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
            A way of thinking, doing business, and interacting in teams.
          </h2>
          <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-[#555]">
            In the WIAL method, small groups work on real problems, take
            action, and learn at the same time. Questions sit at the center of
            the process, and an Action Learning Coach helps the team reflect on
            how it is learning while it solves the challenge in front of it.
          </p>
          <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-[#555]">
            That combination is what makes Action Learning distinct: teams do
            not stop at discussion or brainstorming. They clarify the problem,
            act on it, learn from the action, and strengthen leadership
            capacity in the process.
          </p>
          <Link
            href="/action-learning"
            className="mt-8 inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
          >
            Explore Action Learning
          </Link>
        </article>

        <article className="rounded-[2rem] bg-[#f7f9fd] px-8 py-10 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#f3a533]">
            Certification Teaser
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0b4a9c]">
            WIAL is the world&apos;s leading certifying body for Action Learning.
          </h2>
          <ul className="mt-5 space-y-3 text-[1rem] leading-8 text-[#555]">
            <li>CALCs can coach Action Learning sessions.</li>
            <li>PALCs demonstrate proven coaching ability in practice.</li>
            <li>SALCs are cleared to lead all WIAL programs.</li>
            <li>MALCs are recognized as thought leaders in the field.</li>
          </ul>
          <Link
            href="/certification"
            className="mt-8 inline-flex rounded-xl border border-[#0b4a9c] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0b4a9c] transition hover:bg-[#0b4a9c] hover:text-white"
          >
            View Certification Path
          </Link>
        </article>
      </section>

      <section className="rounded-[2rem] bg-[#d50f45] px-8 py-10 text-white shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-white/70">
          CTA
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight">
          Build one clear front door for a global network of chapters,
          coaches, and future certification journeys.
        </h2>
        <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-white/85">
          This MVP focuses on the brochure-style foundation first: a branded
          home page, a clearer explanation of Action Learning, a stronger
          certification path overview, and a simple contact path for chapter
          leads, coaches, and prospective partners.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
          >
            Learn About WIAL
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-xl border border-white/70 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#d50f45]"
          >
            Contact WIAL
          </Link>
        </div>
      </section>

      <section
        id="events"
        className="grid gap-7 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]"
      >
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden bg-white shadow-[0_12px_36px_rgba(28,40,70,0.08)]"
          >
            <div className="h-[295px] bg-[#e8edf5]">
              <Image
                src={card.image}
                alt={card.title}
                width={420}
                height={295}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className={`h-[5px] w-full ${card.accent}`} />
            <div className="space-y-5 px-9 py-9">
              <p className="text-sm uppercase tracking-[0.24em] text-[#274b8d]">
                {card.eyebrow}
              </p>
              <h2 className="text-[1.15rem] font-semibold leading-10 text-[#5b5b5b] sm:text-[1.3rem]">
                {card.title}
              </h2>
              <p className="text-[1.02rem] leading-10 text-[#676767]">
                {card.body}
              </p>
              {card.cta ? (
                <Link
                  href={card.ctaHref ?? "#"}
                  className="rounded-xl bg-[#0d809b] px-8 py-4 text-xl font-medium text-white"
                >
                  {card.cta}
                </Link>
              ) : null}
            </div>
          </article>
        ))}

        <article className="bg-white px-9 py-9 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#14c9ad]">
            WIAL Video Series
          </p>
          <h2 className="mt-8 text-[1.2rem] font-semibold leading-[1.35] text-[#5b5b5b] sm:text-[1.65rem]">
            Click to see the WHY of Action Learning
          </h2>
          <div className="mt-8 overflow-hidden border border-[#f0f0f0]">
            <Image
              src="/images/network-card.jpg"
              alt="WIAL video preview"
              width={320}
              height={180}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </article>
      </section>

      <section
        id="contact"
        className="grid gap-10 bg-white px-7 py-12 shadow-[0_12px_36px_rgba(28,40,70,0.08)] lg:grid-cols-[1.2fr_0.8fr_1fr]"
      >
        <div className="space-y-8">
          <Image
            src="/images/wial-usa-placeholder-optimized-removebg-preview.png"
            alt="WIAL logo"
            width={330}
            height={169}
            className="h-auto w-[330px]"
            loading="lazy"
          />
          <div>
            <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
              How to Reach Us
            </h2>
            <div className="mt-4 space-y-1 text-[1rem] leading-8 text-[#202020]">
              <p>P.O. Box 7601 #83791</p>
              <p>Washington, DC 20044</p>
            </div>
          </div>
          <div>
            <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
              Follow Us
            </h2>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded bg-[#0d809b] text-white transition hover:bg-[#0a6d84]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
            WIAL Conferences
          </h2>
          <div className="space-y-3 text-[1rem] leading-8 text-[#0d809b]">
            <p>WIAL Global Conference 2021</p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-[1.35rem] font-semibold text-[#d50f45]">
            Most Read
          </h2>
          <div className="space-y-8">
            {mostReadColumns.map((group) => (
              <div key={group.heading}>
                <p className="text-sm uppercase tracking-[0.22em] text-[#404040]">
                  {group.heading}
                </p>
                <div className="mt-2 space-y-1 text-[1rem] leading-8 text-[#0d809b]">
                  {group.links.map((link) => (
                    <p key={link}>{link}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
