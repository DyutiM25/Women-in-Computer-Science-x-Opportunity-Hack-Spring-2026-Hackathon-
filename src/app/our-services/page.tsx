import { MarketingPage } from "@/components/marketing/MarketingPage";

export default function OurServicesPage() {
  return (
    <MarketingPage
      eyebrow="Solution Spheres"
      title="Action Learning Solutions"
      intro="WIAL supports organizations with coaching, certification, facilitation, and structured Action Learning programs that help teams improve performance while solving real problems."
      highlights={[
        "Facilitated Action Learning sessions for teams and organizations.",
        "Certification pathways for current and aspiring coaches.",
        "Chapter-led local support with consistent global methodology.",
      ]}
      sections={[
        {
          title: "Facilitation",
          body: "Certified Action Learning coaches lead structured sessions that help groups focus on the right questions, improve communication, and move toward clear next steps.",
        },
        {
          title: "Coach development",
          body: "WIAL provides a pathway for leaders, consultants, and facilitators to become certified and bring Action Learning into their own organizations and client work.",
        },
        {
          title: "Global chapter support",
          body: "Through its global network, WIAL makes it easier for regional chapters to adapt programming locally while staying aligned with the broader brand and practice standards.",
        },
      ]}
      cta={{ href: "/coaches", label: "Find a Coach" }}
    />
  );
}
