import ProjectCard from "./ProjectCard";
import { useProjectStore } from "../../store/project/projectStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import hotelImage from "../../assets/images/bannerProjectImg2.jpg";
import { entityId } from "../../utils/entity";

const fallbackProjects = [
  {
    _id: "titanic-bay-project",
    title: "Titanic Bay Hotel & Resort Ltd",
    status: "upcoming",
    image: [hotelImage],
    description: {
      generalFeature:
        "A premium 5 Star Hotel & Resort opportunity planned for hospitality, leisure, and long-term investment value.",
    },
    specs: {
      address: "Bangladesh",
    },
  },
];

export default function Projects({ type = "all", fullWidth = false }) {
  const { projects, loadProjects, isLoading } = useProjectStore();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const filteredProjects = useMemo(() => {
    const projectList = Array.isArray(projects) ? projects : [];
    const hasTitanicBay = projectList.some((project) =>
      project.title?.toLowerCase().includes("titanic bay")
    );
    const mergedProjects = hasTitanicBay ? projectList : [...projectList, ...fallbackProjects];

    if (type === "all") return mergedProjects;
    return mergedProjects.filter((p) => p.status?.toLowerCase() === type);
  }, [projects, type]);
  const shouldLoop = filteredProjects.length > 3;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <FaSpinner className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="w-full px-5">
        {/* Header */}
        <div className={`${fullWidth ? "w-full" : "max-w-7xl mx-auto"} flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6`}>
          <div>
            <p className="uppercase tracking-[0.25em] text-green-600 font-bold text-xs mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-green-500 inline-block"></span>
              Featured Projects
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Bespoke Enclaves with finesse
              <br />
              <span className="text-green-600">in architecture and design</span>
            </h2>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full border border-gray-200 bg-gray-50 hover:bg-green-500 hover:border-green-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <IoIosArrowBack size={16} />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full border border-gray-200 bg-gray-50 hover:bg-green-500 hover:border-green-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <IoIosArrowForward size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No projects found</p>
        ) : (
          <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto"}>
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              loop={shouldLoop}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3.2 },
                1280: { slidesPerView: 3.5 },
              }}
            >
              {filteredProjects.map((p) => (
                <SwiperSlide key={entityId(p) || p.title}>
                  <ProjectCard project={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
