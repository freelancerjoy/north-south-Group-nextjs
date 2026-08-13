import ConcernPageTemplate from "./ConcernPageTemplate";

const NorthsouthFoundation = () => {
  return (
    <ConcernPageTemplate
      theme="emerald"
      eyebrow="Social Impact"
      title="Northsouth Foundation"
      subtitle="A people-focused initiative dedicated to education, healthcare, community upliftment, and long-term social development."
      heroImage="https://images.unsplash.com/photo-1593442808882-775dfcd90699?auto=format&fit=crop&w=1200&q=75"
      aboutImage="https://plus.unsplash.com/premium_photo-1723809828438-94b1351d04c0?auto=format&fit=crop&w=900&q=75"
      aboutTitle="Creating meaningful change for communities"
      aboutParagraphs={[
        "Northsouth Foundation exists to support people through education, healthcare access, community development, and practical social programs.",
        "The foundation works with a long-term mindset, focusing on initiatives that can help individuals and families move toward better opportunities.",
        "By combining compassion with organized action, the foundation strengthens the group's commitment to responsible growth.",
      ]}
      stats={[
        { value: "Care", label: "First" },
        { value: "Impact", label: "Driven" },
        { value: "People", label: "Focused" },
      ]}
      servicesTitle="Programs with purpose"
      servicesDescription="The foundation page now presents social work with dignity, clarity, and premium storytelling."
      services={[
        {
          title: "Education Support",
          text: "Programs that help learners access knowledge, skills, and future opportunities.",
          image: "https://plus.unsplash.com/premium_photo-1742926577749-e05ee300c1ad?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Healthcare Programs",
          text: "Community health support focused on practical care, awareness, and access.",
          image: "https://images.unsplash.com/photo-1659019479972-82d9e3e8cfb7?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Community Development",
          text: "Initiatives that strengthen local capacity, wellbeing, and sustainable improvement.",
          image: "https://plus.unsplash.com/premium_photo-1723672870034-93eb64a3aaae?auto=format&fit=crop&w=1200&q=80",
        },
        {
          title: "Partnership Outreach",
          text: "Collaboration with people and organizations to scale positive social outcomes.",
          image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
        },
      ]}
      highlightsTitle="Impact that feels human"
      highlightsDescription="The redesign makes the foundation page more emotionally clear and client-presentable."
      highlights={[
        {
          title: "Education access",
          text: "Helping learners gain tools and confidence for a better future.",
        },
        {
          title: "Healthcare awareness",
          text: "Supporting healthier communities through practical programs and care.",
        },
        {
          title: "Community upliftment",
          text: "Creating initiatives that improve everyday life and local resilience.",
        },
        {
          title: "Volunteer spirit",
          text: "Encouraging people to contribute time, effort, and compassion.",
        },
        {
          title: "Partnership model",
          text: "Working with stakeholders helps programs reach more people effectively.",
        },
        {
          title: "Responsible brand",
          text: "The foundation strengthens the group's commitment beyond business.",
        },
      ]}
      processItems={[
        "Identify real community needs and program priorities.",
        "Design practical support initiatives with measurable goals.",
        "Work with volunteers, partners, and local stakeholders.",
        "Review impact and continue improving the program model.",
      ]}
      ctaTitle="Join us in making a difference"
      ctaText="Support the foundation through partnership, volunteering, or community-focused collaboration."
      ctaLabel="Get Involved"
    />
  );
};

export default NorthsouthFoundation;
