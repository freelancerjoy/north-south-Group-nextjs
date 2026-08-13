import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import OptimizedImage from "../../components/OptimizedImage";
import useReveal from "../../components/useReveal";
import { entityId, projectDetailsPath } from "../../utils/entity";
import { useProjectStore } from "../../store/project/projectStore";
import { FaSpinner } from "react-icons/fa";

const Consortium = ({ className = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

   const { projects, isLoading,loadProjects } = useProjectStore();

   useEffect(() => {
   loadProjects()
   }, [loadProjects])

  // Assign custom navigation buttons after mount
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const ref = useReveal();
if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div>
          {" "}
          <FaSpinner className="animate-spin" size={50} />
        </div>
      </div>
    );
  }
  return (
  
    <section
      data-aos="fade-up"
      data-aos-duration="3000"
      className="not-only-of-type:bg-[#F8F8F8] py-10 lg:py-20 text-white"
      id="portfolio"
    >
      <div className="w-full px-5 lg:px-10">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
          {/* Section Title */}
          <div className="py-8">
            <p className="uppercase tracking-widest text-gray-500 font-bold text-base leading-relaxed p-2">
              Featured projects
            </p>
            <h2
              ref={ref}
              className={`slide-title ${className} text-sm md:text-2xl lg:text-4xl uppercase font-bold text-[#0f7771] p-2`}
            >
              Bespoke Enclaves with finesse
              <br />
              in architecture and design
            </h2>
          </div>
          {/* Arrow Buttons (Top Right) */}
          <div className="flex gap-8 pb-10 lg:pb-0">
            <button
              ref={prevRef}
              className="bg-green-100 p-4 rounded-full hover:bg-green-600 text-green-700 hover:text-green-100"
            >
              <IoIosArrowBack size={12} />
            </button>
            <button
              ref={nextRef}
              className="bg-green-100 p-4 rounded-full hover:bg-green-600 text-green-700 hover:text-green-100"
            >
              <IoIosArrowForward size={12} />
            </button>
          </div>
        </div>
      </div>
      {/* Swiper Slider - Full Width */}
      <div className="w-full mt-8">
        <div className="w-full px-5 lg:px-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={3.5}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {projects?.map((project) => {
            const id = entityId(project);

            return (
            <SwiperSlide key={id || project.title}>
              <div className="h-[70vh] relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                {/* Image */}
                <OptimizedImage
                  src={project.image?.[0]}
                  alt={project.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="scale-100 brightness-70 transition duration-700 group-hover:scale-105"
                />
                <Link
                    to={projectDetailsPath(project)}
                    state={{ project }}
                    className="absolute inset-0"
                  >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Text + Button */}
                <div className="absolute left-5 bottom-5 w-full flex flex-col items-start">
                  {/* Title & Description Wrapper */}
                  <div className="relative w-full pr-8">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-4">
                      {project.title}
                    </h3>

                    {/* Description + Address */}
                    <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
                      {project.description &&
                        project.description.generalFeature && (
                          <p className="text-white text-sm">
                            {project.description.generalFeature}
                          </p>
                        )}
                      {project.specs && project.specs.address && (
                        <p className="text-white text-sm mt-1 font-bold">
                          {project.specs.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  
                    <button className="slide-hover mt-3 py-2 px-6 border-2 border-white font-bold hover:bg-white hover:text-black transition">
                      <span>View Project</span>
                    </button>
                 
                </div>
</Link>
              </div>
               
            </SwiperSlide>
          );
          })}
        </Swiper>
        </div>
      </div>
    </section>
    
  );
};

export default Consortium;
