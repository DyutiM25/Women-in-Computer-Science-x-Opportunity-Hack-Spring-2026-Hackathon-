import { MarketingPage } from "@/components/marketing/MarketingPage";

export default function ActionLearningPage() {
  return (
    <MarketingPage
      eyebrow="Action Learning"
      title="What is Action Learning?"
      intro="Action Learning is a disciplined process that helps groups solve real business challenges while building stronger leaders, deeper reflection, and more accountable teams."
      highlights={[
        "Works on live business challenges, not abstract exercises.",
        "Builds leadership capability while solving meaningful problems.",
        "Encourages questioning, listening, and measurable action.",
      ]}
      sections={[
        {
          title: "A practical learning method",
          body: "Instead of separating learning from work, Action Learning combines the two. Teams work on pressing issues, reflect together, and commit to next steps in real time.",
        },
        {
          title: "Built for teams",
          body: "The method helps participants think more clearly, collaborate more intentionally, and create a culture where strong questions lead to stronger decisions.",
        },
        {
          title: "Used worldwide",
          body: "WIAL chapters and certified coaches help organizations around the world use Action Learning in leadership development, organizational change, and team performance.",
        },
      ]}
      cta={{ href: "/certification", label: "Explore Certification" }}
    />
  );
}
