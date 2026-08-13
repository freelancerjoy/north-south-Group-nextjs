import useReveal from "../../components/useReveal";
import greenCityImg5 from "../../assets/images/greenCityImg5.jpg";

const Testimonials = ({ className = "" }) => {
  const ref = useReveal();

  return (
    <section data-aos="fade-up" data-aos-duration="1000" className="bg-white py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="px-4 py-8">
          <p className="p-2 text-base font-bold uppercase leading-relaxed tracking-widest text-gray-500">
            Investment Insight
          </p>
          <h2 ref={ref} className={`slide-title ${className} p-2 text-sm font-bold uppercase text-[#0f7771] md:text-2xl lg:text-4xl`}>
            Why Should You Invest
            <br />
            in North South Group?
          </h2>
        </div>

        <div className="container mx-auto flex flex-col items-start justify-center gap-12 px-5 lg:flex-row lg:justify-between">
          <div className="w-full overflow-hidden rounded-lg shadow-xl lg:w-1/2">
            <video
              src="/videos/projectVideo.mp4"
              controls
              preload="metadata"
              poster={greenCityImg5}
              className="h-60 w-full object-cover md:h-72 lg:h-80"
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-md mb-6 font-bold text-black md:text-xl lg:text-2xl">
              Invest with a trusted, diversified development group
            </h2>

            <p className="mb-4 text-black">
              North South Group presents planned real estate, land, industrial, and hospitality opportunities with a focus on strategic locations, disciplined development, and long-term value.
            </p>

            <div className="py-2">
              <p className="text-md font-bold text-gray-900">North South Group</p>
              <p className="text-md text-gray-900">Project & Investment Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
