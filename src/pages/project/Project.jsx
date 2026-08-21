import AOS from "aos";
import { FaBuilding, FaHotel, FaMapMarkedAlt } from "react-icons/fa";
import overviewBg from "../../assets/images/greenCityImg4.jpg";

AOS.init();

const projectOverviews = [
  {
    title: "Hotel",
    icon: FaHotel,
    text: "Premium hospitality opportunities including Titanic Bay Hotel & Resort L.T.D and future 5 Star Hotel & Resort planning.",
  },
  {
    title: "Land",
    icon: FaMapMarkedAlt,
    text: "Planned land projects focused on secure ownership, future connectivity, and long-term investment value.",
  },
  {
    title: "Flat",
    icon: FaBuilding,
    text: "Residential flat and duplex concepts shaped for family comfort, practical planning, and premium living standards.",
  },
];

const Project = () => {
  return (
    <section
      className="need_img w-full bg-gray-50 py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(4, 8, 17, 0.56), rgba(4, 8, 17, 0.56)), url(${overviewBg})`,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="mb-12 animate-fadeIn text-sm font-bold uppercase text-white md:text-2xl lg:text-4xl">
          Our Projects Overview
        </h1>

        <div className="flex w-full items-center justify-center py-12">
          <div className="w-full max-w-5xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {projectOverviews.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} data-aos="fade-up" data-aos-delay={index * 150}>
                    <div className="h-full rounded-lg bg-white p-8 text-left shadow-lg transition-transform duration-500 hover:-translate-y-1">
                      <Icon className="mb-5 text-4xl text-green-700" />
                      <h2 className="mb-3 text-xl font-bold text-gray-950">{item.title}</h2>
                      <p className="text-sm leading-7 text-gray-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
