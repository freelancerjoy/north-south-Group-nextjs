import { useEffect, useMemo, useState, useCallback } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import realEstateImg1 from "../../assets/realEstateImg1.jpg";
import realEstateImg2 from "../../assets/images/realEstateImg2.jpg";
import realEstateImg3 from "../../assets/realEstateImg3.jpg";

import heroLogo from "../../assets/images/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import ns1 from "../../assets/NSTowerRuningProject/NSTower-24-15.jpg";
import ns2 from "../../assets/NSTowerRuningProject/NSTower-24-05.jpg";
import ns3 from "../../assets/NSTowerRuningProject/NSTower-24-20.jpg";

import ds1 from "../../assets/AppartmentProject/NorthSouthDreamSquare(Upcoming)/bshundharafainalimage2.jpg";
import ds2 from "../../assets/AppartmentProject/NorthSouthDreamSquare(Upcoming)/bshundharafainalimagetop.jpg";
import ds3 from "../../assets/AppartmentProject/NorthSouthDreamSquare(Upcoming)/bshundharafainalfront5.jpg";

import sp1 from "../../assets/AppartmentProject/Showpnabilsh(RuningProject)/Untitled-1-17-14.jpg";
import sp2 from "../../assets/AppartmentProject/NorthSouthDreamSquare(Upcoming)/bshundharafainalimagetop.jpg";
import sp3 from "../../assets/AppartmentProject/NorthSouthDreamSquare(Upcoming)/bshundharafainalfront5.jpg";

import tm1 from "../../assets/AppartmentProject/TarekMansion(RuningProject)/New View 001.jpg";
import tm2 from "../../assets/AppartmentProject/TarekMansion(RuningProject)/night view 2nd op.jpg";
import tm3 from "../../assets/AppartmentProject/TarekMansion(RuningProject)/Top New.jpg";
import ProjectCard from "../project/ProjectCard";

const projects = [
  {
    id: 1,
    title: "NS Tower",
    location: "Sector 13A, Jolshiri",
    image: [ns1, ns2, ns3],
    status: "Ready",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    address: "Plot No-018, Road No-402, Sector-13A,Jolshiri",
  },
  {
    id: 2,
    title: "Riverside Heights",
    location: "Uttara, Dhaka",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

    address: "Plot No-004, Road No-502, Sector-17,Jolshiri",
    image: [ds1, ds2, ds3],
    status: "Ongoing",
  },
  {
    id: 3,
    title: "City Point",
    location: "Banani, Dhaka",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

    address: "Plot: 073, Road: 302, Sector-06, Jolshiri",
    image: [sp1, sp2, sp3],
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Green Valley",
    location: "Mirpur, Dhaka",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Plot No-018, Road No-402, Sector-13A,Jolshiri",

    address: "Plot: 073, Road: 302, Sector-06, Jolshiri",
    image: [tm1, tm2, tm3],
    status: "Ready",
  },
];
const RealEstateProjects = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status"); // upcoming | ongoing | ready
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upcoming");

  // 🔥 Sync URL param → activeTab
  useEffect(() => {
    if (status) {
      setActiveTab(status);
    }
  }, [status]);
  const slides = useMemo(
    () => [realEstateImg1, realEstateImg2, realEstateImg3],
    []
  );

  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Using useCallback reduces unnecessary re-renders
  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  const [showOptions, setShowOptions] = useState(false);
  const options = ["Upcoming", "Ongoing", "Ready"];
  return (
    <div>
      <div className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center">
        <div>
          {/* Center Logo */}
          <div
            className="
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      p-2 sm:p-4 
      z-50 
      bg-white/70 
      border-4 border-dotted border-gray-500 
      rounded-full
    "
          >
            <img
              src={heroLogo}
              alt="Centered"
              className="
          w-24 h-24 
          sm:w-32 sm:h-32 
          md:w-40 md:h-40 
          lg:w-60 lg:h-60
          object-contain 
          rounded-[10px] 
          lg:rounded-[50px] 
          p-1 sm:p-2
        "
            />
          </div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
      mt-[180px]  /* Adjust spacing under the logo */
      p-2 sm:p-4 z-30 flex flex-col items-center justify-center gap-6"
          >
            <div className="flex gap-6">
              <button
                onClick={() => navigate("?status=Upcoming")}
                className={`px-10 py-3 rounded-md font-semibold shadow-lg transition
    ${
      activeTab === "Upcoming"
        ? "bg-green-700 text-white"
        : "bg-black/40 text-white hover:bg-black/60"
    }
  `}
              >
                UPCOMING
              </button>

              <button
                onClick={() => navigate("?status=Ongoing")}
                className={`px-10 py-3 rounded-md font-semibold shadow-lg transition
    ${
      activeTab === "Ongoing"
        ? "bg-green-700 text-white"
        : "bg-black/40 text-white hover:bg-black/60"
    }
  `}
              >
                ONGOING
              </button>

              <button
                onClick={() => navigate("?status=Ready")}
                className={`px-10 py-3 rounded-md font-semibold shadow-lg transition
    ${
      activeTab === "Ready"
        ? "bg-green-700 text-white"
        : "bg-black/40 text-white hover:bg-black/60"
    }
  `}
              >
                READY PROJECT
              </button>
            </div>
            {/* DOWN ARROW */}
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

        {/* Controls */}
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
      <div className="max-w-screen-xl mx-auto py-8">
        {/* FILTER BAR */}
        <div className="bg-white py-8  px-20">
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {/* UPCOMING BUTTON */}
            <div className="relative inline-block">
              {/* Main Button */}
              <button
                className=" bg-green-700 text-white px-6 py-2 rounded-md font-semibold flex items-center justify-between w-60 whitespace-nowrap"
                onClick={() => setShowOptions(!showOptions)}
              >
                {activeTab.toUpperCase()} PROJECT
                <span className="ml-2">&#9662;</span> {/* Down arrow */}
              </button>

              {/* Dropdown Options */}
              {showOptions && (
                <div className="absolute mt-2 bg-white border rounded-md shadow-lg w-full z-10">
                  {options.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-4 py-2 hover:bg-green-100 whitespace-nowrap"
                      onClick={() => {
                        setActiveTab(option);
                        setShowOptions(false); // hide dropdown after selection
                      }}
                    >
                      {option.toUpperCase()} PROJECT
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* CATEGORY */}
            {/* <div className="relative w-60">
              <select className="w-full px-4 py-2 border rounded-md text-gray-700">
                <option>Category</option>
              </select>
            </div> */}

            {/* LOCATION */}
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

            {/* SIZE */}
            <div className="relative w-60">
              <select className="w-full px-4 py-2 border rounded-md text-gray-700">
                <option>Size</option>
                <option>1000-1200 Ft</option>
                  <option>1200-1600 Ft</option>
                   <option>1600-1800 Ft</option>
                    <option>1800-2000 Ft</option>
              </select>
            </div>
            <button className="bg-green-700 rounded-[5px] px-4 py-2 text-white">
              Find More
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects
            .filter(
              (p) =>
                p.status && // ensure status exists
                activeTab && // ensure activeTab exists
                p.status.trim().toLowerCase() === activeTab.trim().toLowerCase()
            )
            .map((p, idx) => (
              <ProjectCard key={idx} project={p} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RealEstateProjects;
