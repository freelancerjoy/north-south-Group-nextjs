import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import realEstateImg1 from "../../assets/images/realEstateImg1.jpg";
import realEstateImg2 from "../../assets/images/realEstateImg2.jpg";
import realEstateImg3 from "../../assets/images/realEstateImg3.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Projects from "../project/Projects";

const heroLogo = "/images/heroLogo.gif";

export default function RealEstate() {
  const slides = useMemo(
    () => [realEstateImg1, realEstateImg2, realEstateImg3],
    []
  );
  const [projectType, setProjectType] = useState("all");
  const featuredProjectsRef = useRef(null);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  const scrollToFeaturedProjects = () => {
    requestAnimationFrame(() => {
      featuredProjectsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleProjectTypeChange = (value) => {
    setProjectType(value);
    scrollToFeaturedProjects();
  };

  return (
    <>
      <div className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center">
        <div>
          <div
            className="
  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  p-3 sm:p-4 md:p-5 lg:p-6
  z-10
  bg-white/70
  border-4 border-dotted border-gray-500
  rounded-full
"
          >
            <img
              src={heroLogo}
              alt="Centered"
              className="
      w-20 h-20
      sm:w-24 sm:h-24
      md:w-32 md:h-32
      lg:w-40 lg:h-40
      object-contain
    "
            />
          </div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2
  mt-[140px] md:mt-[160px]
  p-2 sm:p-4 z-10 flex flex-col items-center justify-center gap-6"
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <button
                onClick={() => handleProjectTypeChange("upcoming")}
                className="slow-bounce bg-black/70 border-2 border-green-500 text-white font-semibold
      px-6 sm:px-10 py-3 rounded-lg shadow-lg animate-slowBounce hover:scale-110 transition duration-300 ease-in-out"
              >
                UPCOMING
              </button>

              <button
                onClick={() => handleProjectTypeChange("ongoing")}
                className="slow-bounce bg-black/70 border-2 border-green-500 text-white font-semibold
      px-6 sm:px-10 py-3 rounded-lg shadow-lg animate-slowBounce hover:scale-110 transition duration-300 ease-in-out"
              >
                ONGOING
              </button>

              <button
                onClick={() => handleProjectTypeChange("ready")}
                className="slow-bounce bg-black/70 border-2 border-green-500 text-white font-semibold
      px-6 sm:px-8 py-3 rounded-lg shadow-lg animate-slowBounce hover:scale-110 transition duration-300 ease-in-out"
              >
                READY PROJECT
              </button>
            </div>

            <div className="mt-2 animate-bounce">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <IoIosArrowDown size={24} className="text-blue-700" />
              </div>
            </div>
          </div>
        </div>
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            loading="lazy"
            decoding="async"
            className={`
      absolute inset-0
      w-full
      h-full
      object-cover
      transition-opacity duration-700 ease-linear
      ${current === index ? "opacity-100" : "opacity-0"}

      sm:object-cover
      md:object-cover
      lg:object-fill
    `}
            style={{ willChange: "opacity" }}
          />
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 active:scale-90 transition-all"
        >
          <IoIosArrowBack size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60 active:scale-90 transition-all"
        >
          <IoIosArrowForward size={22} />
        </button>
      </div>

      <div
        ref={featuredProjectsRef}
        id="featured-projects"
        className="w-full scroll-mt-24 py-8"
      >
        <div className=" bg-white py-2">
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <div className="relative w-60">
              <select
                value={projectType}
                onChange={(e) => handleProjectTypeChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
              >
                <option value="all">All Project</option>
                <option value="upcoming">Upcoming Project</option>
                <option value="ongoing">Ongoing Project</option>
                <option value="ready">Ready Project</option>
              </select>
            </div>

            <div className="relative w-60">
              <select
                className="w-full px-4 py-2 border rounded-md text-gray-700"
                onChange={(e) =>
                  console.log("Selected Division:", e.target.value)
                }
              >
                <option value="">Select Division</option>
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
                <option value="khulna">Khulna</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="barishal">Barishal</option>
                <option value="sylhet">Sylhet</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
              </select>
            </div>

            <div className="relative w-60">
              <select className="w-full px-4 py-2 border rounded-md text-gray-700">
                <option>Size</option>
                <option>1000-1200 Ft</option>
                <option>1200-1600 Ft</option>
                <option>1600-1800 Ft</option>
                <option>1800-2000 Ft</option>
              </select>
            </div>
            <div>
              <button className="bg-green-700 rounded-[5px] px-4 py-2 text-white">
                Find More
              </button>
            </div>
          </div>
        </div>
        <Projects type={projectType} fullWidth />
      </div>
    </>
  );
}
