import NirapadValley from "../../assets/images/ns4.jpg";
import ConcernPageTemplate from "./ConcernPageTemplate";

const PurbachalNirapadValley = () => {
  return (
    <ConcernPageTemplate
      theme="emerald"
      eyebrow="Secure Residential Destination"
      title="Purbachal Nirapad Valley"
      subtitle="A planned, green, and secure living destination shaped for families, professionals, and long-term investors who want confidence in every square foot."
      heroImage={NirapadValley}
      aboutImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75"
      aboutTitle="Peaceful living with planned urban comfort"
      aboutParagraphs={[
        "Purbachal Nirapad Valley is designed around safety, greenery, road access, and a more organized residential lifestyle.",
        "The project gives residents a calm environment while keeping connectivity, daily convenience, and investment value in focus.",
        "From wide internal movement to secured entry planning, every detail supports a safer and more comfortable address.",
      ]}
      stats={[
        { value: "Safe", label: "Community" },
        { value: "Green", label: "Lifestyle" },
        { value: "Smart", label: "Investment" },
      ]}
      servicesTitle="Project lifestyle advantages"
      servicesDescription="Modern residential value presented through a cleaner and more premium client-facing layout."
      services={[
        {
          title: "Gated Community",
          text: "Controlled access and thoughtful community planning support everyday peace of mind.",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Planned Layout",
          text: "Wide roads, organized blocks, and smart zoning create a more comfortable living pattern.",
          image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Green Open Spaces",
          text: "Open surroundings and landscaped planning help families enjoy a healthier environment.",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Location Value",
          text: "Purbachal growth potential makes the project attractive for both living and investment.",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="A better residential promise"
      highlightsDescription="The page now highlights safety, future value, and family-friendly planning with a sharper premium interface."
      highlights={[
        {
          title: "Security first",
          text: "The project identity is built around controlled living and everyday resident confidence.",
        },
        {
          title: "Family comfort",
          text: "A calm, organized environment supports families looking for long-term settlement.",
        },
        {
          title: "Road connectivity",
          text: "Convenient movement keeps daily travel and future accessibility in focus.",
        },
        {
          title: "Investment potential",
          text: "Purbachal's development momentum creates strong long-term ownership value.",
        },
        {
          title: "Balanced lifestyle",
          text: "Green space, planning, and access combine into a more complete residential experience.",
        },
        {
          title: "Trust-backed delivery",
          text: "The concern carries the North South Group promise of disciplined presentation and service.",
        },
      ]}
      processItems={[
        "Plan secure entry, movement, and living zones.",
        "Maintain a residential environment that feels calm and organized.",
        "Support buyer confidence with clear project positioning.",
        "Protect long-term value through thoughtful development.",
      ]}
      ctaTitle="Explore a safer future address"
      ctaText="Talk with our team to learn more about Purbachal Nirapad Valley and available opportunities."
      ctaLabel="Explore Project"
    />
  );
};

export default PurbachalNirapadValley;
