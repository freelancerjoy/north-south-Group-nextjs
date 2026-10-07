import useReveal from "../../components/useReveal";
import greenCityImg5 from "../../assets/images/greenCityImg5.jpg";

const Testimonials = ({ className = "", content }) => {
  const ref = useReveal();

  return (
    <section data-aos="fade-up" data-aos-duration="1000" className="bg-white py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="px-4 py-8">
          <p className="p-2 text-base font-bold uppercase leading-relaxed tracking-widest text-gray-500">
            {content.eyebrow}
          </p>
          <h2 ref={ref} className={`slide-title ${className} p-2 text-sm font-bold uppercase text-[#0f7771] md:text-2xl lg:text-4xl`}>
            {content.titleLineOne}
            <br />
            {content.titleLineTwo}
          </h2>
        </div>

        <div className="container mx-auto flex flex-col items-start justify-center gap-12 px-5 lg:flex-row lg:justify-between">
          <div className="w-full overflow-hidden rounded-lg shadow-xl lg:w-1/2">
            <video
              src={content.videoUrl}
              controls
              preload="metadata"
              poster={content.posterUrl || greenCityImg5}
              className="h-60 w-full object-cover md:h-72 lg:h-80"
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-md mb-6 font-bold text-black md:text-xl lg:text-2xl">
              {content.heading}
            </h2>

            <p className="mb-4 text-black">
              {content.text}
            </p>

            <div className="py-2">
              <p className="text-md font-bold text-gray-900">{content.author}</p>
              <p className="text-md text-gray-900">{content.authorRole}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
