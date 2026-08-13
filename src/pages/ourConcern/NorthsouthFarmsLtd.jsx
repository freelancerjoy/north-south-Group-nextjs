import ConcernPageTemplate from "./ConcernPageTemplate";

const NorthsouthFarmsLtd = () => {
  return (
    <ConcernPageTemplate
      theme="emerald"
      eyebrow="Sustainable Agriculture"
      title="Northsouth Farms Ltd"
      subtitle="Cultivating healthier food systems through responsible farming, modern practices, community connection, and long-term environmental care."
      heroImage="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=75"
      aboutImage="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=75"
      aboutTitle="Farming with responsibility and innovation"
      aboutParagraphs={[
        "Northsouth Farms Ltd focuses on sustainable agricultural development by combining practical farming knowledge with modern cultivation methods.",
        "The concern supports healthier production, responsible land use, and a future-ready approach to agriculture that respects both people and nature.",
        "Through ethical operations and community-minded practices, the farm concern aims to contribute to food security and greener growth.",
      ]}
      stats={[
        { value: "Eco", label: "Friendly" },
        { value: "Fresh", label: "Production" },
        { value: "Local", label: "Community" },
      ]}
      servicesTitle="Modern farming focus areas"
      servicesDescription="From cultivation to distribution thinking, the page now presents the farm concern with a calm, premium, nature-led identity."
      services={[
        {
          title: "Sustainable Cultivation",
          text: "Eco-conscious farming practices that protect soil, water, and long-term productivity.",
          image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Healthy Produce",
          text: "A focus on freshness, quality, and responsible production for safer consumption.",
          image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Agri Innovation",
          text: "Improved irrigation, monitoring, and cultivation methods for smarter operations.",
          image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Community Value",
          text: "Agricultural growth that supports local people, skills, and shared economic benefit.",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="A greener business promise"
      highlightsDescription="The redesigned page now communicates agriculture, trust, and future readiness in a more polished way."
      highlights={[
        {
          title: "Sustainability",
          text: "Balanced practices protect the land while supporting productive growth.",
        },
        {
          title: "Quality mindset",
          text: "Production decisions are guided by freshness, safety, and consistent standards.",
        },
        {
          title: "Modern methods",
          text: "Technology and practical expertise help improve efficiency across farm operations.",
        },
        {
          title: "Community connection",
          text: "Local involvement keeps the concern grounded in real social and economic value.",
        },
        {
          title: "Ethical production",
          text: "Responsible farming choices strengthen trust with consumers and partners.",
        },
        {
          title: "Future growth",
          text: "The operation is positioned for scalable, long-term agricultural development.",
        },
      ]}
      processItems={[
        "Prepare land and resources with environmental care.",
        "Use practical modern methods for cultivation and monitoring.",
        "Maintain quality standards from production to market readiness.",
        "Improve farming outcomes through continuous learning.",
      ]}
      ctaTitle="Grow with Northsouth Farms"
      ctaText="Connect with us for agricultural partnership, supply, or development opportunities."
    />
  );
};

export default NorthsouthFarmsLtd;
