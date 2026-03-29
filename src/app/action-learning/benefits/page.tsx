import { MarketingPage } from "@/components/marketing/MarketingPage";

export default function BenefitsPage() {
  return (
    <MarketingPage
      eyebrow="Benefits"
      title="Get more out of your business"
      intro="Action Learning benefits individuals, teams, and organizations by helping people think more critically, listen more deeply, and respond to complex problems with stronger collaboration."
      highlights={[
        "Improves team communication and shared accountability.",
        "Develops leaders while real work is being done.",
        "Creates a habit of reflection paired with action.",
      ]}
      sections={[
        {
          title: "For individuals",
          body: "Participants improve how they listen, question assumptions, and contribute to teams. The result is more thoughtful leadership and better decision-making.",
        },
        {
          title: "For teams",
          body: "Teams gain a repeatable process for addressing difficult issues together, surfacing hidden assumptions, and staying aligned on commitments.",
        },
        {
          title: "For organizations",
          body: "Organizations can use Action Learning to address complex business challenges while strengthening culture, leadership development, and cross-functional collaboration.",
        },
      ]}
      cta={{ href: "/our-services", label: "View Solutions" }}
    />
  );
}
