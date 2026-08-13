import ConcernPageTemplate from "./ConcernPageTemplate";

const NorthsouthToursTravels = () => {
  return (
    <ConcernPageTemplate
      theme="blue"
      eyebrow="Travel & Experience"
      title="Northsouth Tours & Travels"
      subtitle="Curated journeys, reliable travel support, and memorable experiences designed for individuals, families, corporate clients, and groups."
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75"
      aboutImage="https://plus.unsplash.com/premium_photo-1661955277307-bcc3679bbbdc?auto=format&fit=crop&w=900&q=75"
      aboutTitle="Travel planning with care and confidence"
      aboutParagraphs={[
        "Northsouth Tours & Travels helps clients experience destinations with better planning, clearer support, and less travel stress.",
        "The concern focuses on reliable bookings, thoughtful itinerary design, transportation support, and client-friendly guidance.",
        "From domestic escapes to international experiences, the service is presented with a polished travel identity clients can trust.",
      ]}
      stats={[
        { value: "24/7", label: "Support" },
        { value: "Custom", label: "Packages" },
        { value: "Safe", label: "Travel" },
      ]}
      servicesTitle="Travel services designed around comfort"
      servicesDescription="The page now feels like a premium travel brand, not just a simple information block."
      services={[
        {
          title: "Domestic Tours",
          text: "Well-planned local journeys for families, teams, and group experiences across Bangladesh.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "International Tours",
          text: "Destination planning, itinerary support, and travel coordination for global journeys.",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Hotel Booking",
          text: "Accommodation guidance focused on comfort, convenience, budget, and client preference.",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Transport Support",
          text: "Reliable movement planning that helps keep travel smooth from start to finish.",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="Designed for smoother journeys"
      highlightsDescription="Travel content is now organized with stronger hierarchy, better imagery, and clearer client value."
      highlights={[
        {
          title: "Custom planning",
          text: "Packages can be shaped around client budget, timing, destination, and comfort level.",
        },
        {
          title: "Reliable support",
          text: "Travel assistance keeps customers informed before and during their journey.",
        },
        {
          title: "Destination knowledge",
          text: "Practical guidance helps clients choose better routes, hotels, and experiences.",
        },
        {
          title: "Corporate friendly",
          text: "Team tours, business travel, and group movement can be handled with structure.",
        },
        {
          title: "Safety minded",
          text: "Planning prioritizes secure movement, trusted partners, and smoother logistics.",
        },
        {
          title: "Memorable experience",
          text: "The goal is not only travel, but a trip clients remember for the right reasons.",
        },
      ]}
      processItems={[
        "Understand client travel goals, dates, and budget.",
        "Build a practical itinerary with booking options.",
        "Coordinate transport, hotel, and destination logistics.",
        "Support travelers until the journey is complete.",
      ]}
      ctaTitle="Plan your next journey with us"
      ctaText="Share your destination, travel date, and group size. Our team will help shape the right package."
      ctaLabel="Plan A Trip"
    />
  );
};

export default NorthsouthToursTravels;
