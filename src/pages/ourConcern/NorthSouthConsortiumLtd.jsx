import ConcernPageTemplate from "./ConcernPageTemplate";

const NorthSouthConsortiumLtd = () => {
  return (
    <ConcernPageTemplate
      theme="teal"
      eyebrow="Diversified Business Platform"
      title="North South Consortium L.T.D"
      subtitle="A future-focused concern of North South Group, connecting real estate, business development, investment thinking, and responsible project delivery under one trusted platform."
      heroImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=75"
      aboutImage="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=75"
      aboutTitle="A strategic engine for sustainable growth"
      aboutParagraphs={[
        "North South Consortium L.T.D brings together the group's development vision, operational discipline, and partnership network to build value-driven businesses across multiple sectors.",
        "The company focuses on structured planning, market understanding, reliable execution, and long-term stakeholder confidence. Every initiative is shaped around trust, professionalism, and measurable impact.",
        "From early opportunity mapping to implementation support, the concern works as a bridge between ambitious ideas and practical business outcomes.",
      ]}
      stats={[
        { value: "360", label: "Business View" },
        { value: "Multi", label: "Sector Focus" },
        { value: "Long", label: "Term Value" },
      ]}
      servicesTitle="Integrated business capabilities"
      servicesDescription="A premium operating platform for planning, partnerships, investments, and delivery support."
      services={[
        {
          title: "Business Development",
          text: "Market insight, opportunity mapping, and growth planning for sustainable business expansion.",
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Project Management",
          text: "Coordinated execution support focused on quality, timeline discipline, and accountability.",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Investment Advisory",
          text: "Structured guidance for smarter decisions, stronger partnerships, and lower operational risk.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Strategic Partnerships",
          text: "Collaboration models that help unlock new markets, capital, and long-term business value.",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="Built for clients who value reliability"
      highlightsDescription="The design language is now cleaner and more premium, while the business message stays direct and client-ready."
      highlights={[
        {
          title: "Vision-led planning",
          text: "Every business decision is aligned with long-term growth instead of short-term noise.",
        },
        {
          title: "Professional delivery",
          text: "Organized workflows and clear accountability help projects move with confidence.",
        },
        {
          title: "Partnership mindset",
          text: "The concern is designed to build trust with investors, clients, and operating partners.",
        },
        {
          title: "Sustainable growth",
          text: "Growth plans consider economic value, operational responsibility, and future scalability.",
        },
        {
          title: "Cross-sector strength",
          text: "The platform can support real estate, service, agriculture, apparel, and social impact ventures.",
        },
        {
          title: "Brand confidence",
          text: "A polished presentation strengthens client perception from the first page view.",
        },
      ]}
      processItems={[
        "Identify market opportunities and stakeholder needs.",
        "Design a practical execution plan with measurable priorities.",
        "Coordinate resources, partners, and delivery milestones.",
        "Review outcomes and improve for long-term performance.",
      ]}
      ctaTitle="Start a stronger business conversation"
      ctaText="For partnership, investment, or development discussions, connect with the North South Group team."
    />
  );
};

export default NorthSouthConsortiumLtd;
