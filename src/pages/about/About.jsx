import { useEffect, useMemo, useState } from "react";
import useReveal from "../../components/useReveal";
import OptimizedImage from "../../components/OptimizedImage";
import logo from "../../assets/images/logo.png";
import greenCityLogo from "../../assets/images/greenCity.png";
import squareCityLogo from "../../assets/images/squareCityLogo.png";
import industrialCityLogo from "../../assets/images/industrialCityLogo.png";
import { usePartnerStore } from "../../store/partners/partnersStore";

const concerns = [
  { name: "North South Consortium Ltd", logo },
  { name: "Northsouth Green City Ltd", logo: greenCityLogo },
  { name: "Northsouth Square City", logo: squareCityLogo },
  { name: "Northsouth Industrial City", logo: industrialCityLogo },
  { name: "Titanic Bay Hotel & Resort Ltd", logo },
  { name: "Nirapad Valley Condominium Project", logo },
  { name: "Northsouth Duplex Home", logo },
  { name: "Northsouth Farms Ltd", logo },
  { name: "Northsouth Foundation", logo },
];

export default function About({ className = "" }) {
  const ref = useReveal();
  const [expanded, setExpanded] = useState(false);
  const { partners, loadPartners } = usePartnerStore();

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const concernLogos = useMemo(() => {
    const dynamicLogos = Array.isArray(partners)
      ? partners
          .map((partner) => partner?.partnersImage)
          .filter(Boolean)
          .map((partnerLogo, index) => ({
            name: `Concern ${index + 1}`,
            logo: partnerLogo,
          }))
      : [];

    return dynamicLogos.length > 0 ? dynamicLogos : concerns;
  }, [partners]);

  return (
    <section id="aboutUs" className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto flex flex-col items-center gap-12 px-5 lg:flex-row">
        <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
          <p className="p-2 text-base font-bold uppercase leading-relaxed tracking-widest text-gray-500">
            About Us
          </p>
          <h2 ref={ref} className={`slide-title ${className} py-4 text-sm font-bold uppercase md:text-2xl lg:text-4xl`}>
            Overview of North South
          </h2>

          <div className="space-y-4 text-base text-gray-300">
            <p className={`leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-10"}`}>
              North South Group is a pioneering housing and real estate company in Bangladesh, dedicated to addressing the accommodation challenges faced by the residents of Dhaka City and its surrounding regions. With a vision to transform lives through exceptional living spaces, our company takes pride in offering a diverse range of residential, land, industrial, and hospitality projects. The group continues to grow through planned communities, trusted project delivery, and sister concerns that support long-term value for clients and investors.
            </p>

            <button className="font-semibold text-blue-500 hover:underline" onClick={() => setExpanded(!expanded)}>
              {expanded ? "See Less" : "See More"}
            </button>
          </div>
        </div>

        <div
          className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl lg:w-1/2"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-green-300">
            Our Concerns
          </p>
          <h3 className="mb-6 text-2xl font-bold text-white">
            A diversified group built around trust and long-term value
          </h3>
          <div className="relative -mx-2 overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-900 to-transparent" />
            <div className="animate-marquee gap-4 py-2">
              {[...concernLogos, ...concernLogos].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="relative flex h-28 w-44 shrink-0 items-center justify-center rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.75)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <OptimizedImage
                    src={item.logo}
                    alt={item.name}
                    objectFit="contain"
                    sizes="176px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
