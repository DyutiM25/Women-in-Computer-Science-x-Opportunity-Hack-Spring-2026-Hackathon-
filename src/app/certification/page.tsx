import { MarketingPage } from "@/components/marketing/MarketingPage";

export default function CertificationPage() {
  return (
    <MarketingPage
      eyebrow="Certification"
      title="Certification pathways for Action Learning coaches"
      intro="WIAL certification is designed for professionals who want to coach Action Learning sessions with confidence and credibility. There are four levels of certification, each with greater education, experience, and responsibility, so the pathway grows with the coach."
      highlights={[
        "CALC is the entry point for coaches completing foundational training.",
        "MALC represents the most advanced level of practice and leadership.",
        "PALC and SALC sit between those levels as coaches deepen experience.",
        "Recertification and continuing education matter across the journey.",
      ]}
      sections={[
        {
          title: "CALC explained",
          body: "Certified Action Learning Coach is the first formal level in the WIAL ladder. CALCs are prepared to coach Action Learning sessions and demonstrate a practical understanding of the WIAL method, its norms, and the role of the coach.",
        },
        {
          title: "PALC and SALC",
          body: "Professional Action Learning Coaches have proven their coaching ability in practice. Senior Action Learning Coaches move further by gaining the standing required to lead WIAL programs and support broader development work across the network.",
        },
        {
          title: "MALC explained",
          body: "Master Action Learning Coach represents the most advanced level in the framework. MALCs are regarded as thought leaders in the Action Learning community and help strengthen the profession through advanced practice, mentoring, and leadership.",
        },
        {
          title: "Requirements and pathway",
          body: "The pathway is progressive: coaches begin with CALC, build experience toward PALC, develop program leadership capability toward SALC, and may ultimately advance to MALC. Across the pathway, continuing education, coaching records, and recertification expectations help keep coaches current and fit for purpose.",
        },
      ]}
      cta={{ href: "/contact", label: "Ask About Certification" }}
    />
  );
}
