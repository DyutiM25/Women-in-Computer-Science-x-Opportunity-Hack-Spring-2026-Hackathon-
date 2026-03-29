"use client";

import Image from "next/image";
import { useState } from "react";

type FeatureItem = {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
  accentColor: string;
  image: string;
  imageAlt: string;
};

const featureItems: FeatureItem[] = [
  {
    eyebrow: "Action Learning",
    title: "What is Action Learning?",
    summary:
      "Action Learning is a new way of thinking, doing business, and interacting in teams.",
    href: "/action-learning",
    ctaLabel: "Read More",
    accentColor: "#90aef7",
    image: "/images/image.png",
    imageAlt: "Action Learning group discussion",
  },
  {
    eyebrow: "Solution Spheres",
    title: "Action Learning Solutions?",
    summary:
      "WIAL offers services in five broad categories. How can your business grow with Action Learning?",
    href: "/our-services",
    ctaLabel: "Read More",
    accentColor: "#82d8ab",
    image: "/images/image.png",
    imageAlt: "Action Learning solutions workshop",
  },
  {
    eyebrow: "Benefits",
    title: "Get more out of your business",
    summary:
      "See how Action Learning can benefit individuals, teams and organizations.",
    href: "/action-learning/benefits",
    ctaLabel: "Read More",
    accentColor: "#ff2e2e",
    image: "/images/image.png",
    imageAlt: "Business leader presenting benefits",
  },
  {
    eyebrow: "People",
    title: "Search for Action Learning Coaches",
    summary:
      "Find WIAL Certified Coaches at the click of a button with our directory.",
    href: "/directory",
    ctaLabel: "Read More",
    accentColor: "#1f396e",
    image: "/images/image.png",
    imageAlt: "Coach directory profile visual",
  },
  {
    eyebrow: "Certification",
    title: "WIAL is the world’s leading certifying body for Action Learning",
    summary:
      "Action Learning will impact the way you work, think, and do business.",
    href: "/certification",
    ctaLabel: "Learn More",
    accentColor: "#f3a533",
    image: "/images/image.png",
    imageAlt: "Certification leadership session",
  },
];

export function InteractiveFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = featureItems[activeIndex];

  return (
    <section
      id="home"
      className="grid gap-0 lg:grid-cols-[minmax(0,1.65fr)_355px]"
    >
      <div className="relative min-h-[560px] overflow-hidden bg-white shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <Image
          src={activeItem.image}
          alt={activeItem.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
        />

        <div className="absolute left-6 top-6 max-w-[540px] bg-white px-8 py-10 shadow-[0_14px_34px_rgba(15,34,60,0.12)] sm:left-9 sm:top-9 sm:px-9">
          <p
            className="text-sm uppercase tracking-[0.28em]"
            style={{ color: activeItem.accentColor }}
          >
            {activeItem.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
            {activeItem.title}
          </h1>
          <p className="mt-5 max-w-[430px] text-[1.05rem] font-medium leading-8 text-[#151515]">
            {activeItem.summary}
          </p>
          <a
            href={activeItem.href}
            className="mt-8 inline-flex bg-white px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#666] shadow-[0_10px_18px_rgba(28,40,70,0.12)] transition hover:text-[#cc1f1f]"
          >
            {activeItem.ctaLabel}
          </a>
        </div>
      </div>

      <aside className="bg-white shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        {featureItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            style={
              activeIndex === index
                ? { borderRightColor: item.accentColor }
                : undefined
            }
            className={`block min-h-[112px] w-full border-b border-[#f1f1f1] px-8 py-9 text-left transition hover:bg-[#fbfcff] ${
              activeIndex === index
                ? "border-r-[5px] bg-[#fafcff]"
                : "border-r-[5px] border-transparent bg-white"
            }`}
          >
            <p
              className="text-sm uppercase tracking-[0.2em]"
              style={{
                color:
                  activeIndex === index ? item.accentColor : "#7a8ab0",
              }}
            >
              {item.eyebrow}
            </p>
            <h2
              className={`mt-3 text-[1.15rem] font-semibold leading-9 ${
                activeIndex === index ? "text-[#0b4a9c]" : "text-[#1d3970]"
              }`}
            >
              {item.title}
            </h2>
          </button>
        ))}
      </aside>
    </section>
  );
}
