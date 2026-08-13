import ConcernPageTemplate from "./ConcernPageTemplate";

const NorthsouthButterfly = () => {
  return (
    <ConcernPageTemplate
      theme="amber"
      eyebrow="Resort & Nature Experience"
      title="Northsouth Butterfly Resort & Park"
      subtitle="A nature-led resort and recreation concept where families can slow down, reconnect, and enjoy open-air experiences with comfort."
      heroImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75"
      aboutImage="https://plus.unsplash.com/premium_photo-1663054229938-005de427370c?auto=format&fit=crop&w=900&q=75"
      aboutTitle="A calm escape shaped around nature"
      aboutParagraphs={[
        "Northsouth Butterfly Resort & Park is envisioned as a refreshing destination where natural beauty, leisure, and family-friendly activities come together.",
        "The concern presents a peaceful experience for guests who want relaxation, greenery, outdoor recreation, and memorable moments away from the city rush.",
        "With a polished resort identity, the page now communicates warmth, premium hospitality, and a more inviting brand story.",
      ]}
      stats={[
        { value: "Nature", label: "Escape" },
        { value: "Family", label: "Friendly" },
        { value: "Leisure", label: "Focused" },
      ]}
      servicesTitle="Resort experiences"
      servicesDescription="The Butterfly page now has a warmer, more premium visual rhythm with destination-style storytelling."
      services={[
        {
          title: "Butterfly Garden",
          text: "A peaceful nature experience designed around color, greenery, and discovery.",
          image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Luxury Cottages",
          text: "Comfortable stays shaped for couples, families, and weekend relaxation.",
          image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Pool & Leisure",
          text: "Relaxed recreation zones for guests to unwind and enjoy the resort atmosphere.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Nature Trails",
          text: "Outdoor movement, green paths, and scenic corners for a slower day out.",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="Made for memorable visits"
      highlightsDescription="The design now feels more like a resort brochure and less like a plain information page."
      highlights={[
        {
          title: "Nature-first mood",
          text: "Greenery, open space, and outdoor calm define the guest experience.",
        },
        {
          title: "Family recreation",
          text: "Activities are shaped for children, families, couples, and groups.",
        },
        {
          title: "Hospitality focus",
          text: "Comfort, cleanliness, and welcoming service remain central to the concept.",
        },
        {
          title: "Photo-worthy spaces",
          text: "The resort identity supports memorable moments and beautiful guest experiences.",
        },
        {
          title: "Weekend escape",
          text: "A destination designed for short breaks, events, and easy relaxation.",
        },
        {
          title: "Premium presentation",
          text: "The updated design makes the concern stronger for client and investor review.",
        },
      ]}
      processItems={[
        "Welcome guests into a calm and nature-rich environment.",
        "Offer activities that balance comfort, recreation, and discovery.",
        "Maintain clean, safe, and guest-friendly facilities.",
        "Create memories that encourage repeat visits and referrals.",
      ]}
      ctaTitle="Plan your visit to Northsouth Butterfly"
      ctaText="Contact the team for resort information, group visits, events, or future booking support."
      ctaLabel="Plan Visit"
    />
  );
};

export default NorthsouthButterfly;
