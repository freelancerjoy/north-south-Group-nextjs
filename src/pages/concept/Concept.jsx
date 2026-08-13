import { Link } from "react-router-dom";
import duplex from "../../assets/images/realEstateImg2.jpg";
import AOS from "aos";
import { useEffect, useRef, useState } from "react";
import useReveal from "../../components/useReveal";

AOS.init();

const Concept = ({ className = "" }) => {
 const ref = useReveal();

  return (
    <section className="max-w-7xl mx-auto pt-8 md:pt-16 lg:pt-30">
      <div className="mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-start gap-2 lg:gap-12">
        {/* Text Section */}
        <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
          <h1 ref={ref}
              className={`slide-title ${className} text-sm md:text-2xl lg:text-4xl uppercase font-bold text-green-700  mb-6`}>
            Concept & Idea
          </h1>
          <p className="text-[#212529] text-base leading-relaxed text-justify ">
            We want the house to be built in a way that nature will be felt at
            every level. The feeling of which will play the sweet wave of the
            mind of the person living. Nature will surround every person as soon
            as they leave the house. The sweet children will wake up with the
            sound of the cold morning breeze. The calm breeze will flow through
            the open windows. There will be separate rooms for the people living
            in the house, allowing them to feel the touch of nature from each
            room. The open veranda gives a sense of paradise in nature. 
          </p>
          <p className="text-[#212529] text-base leading-relaxed">
            Wake up
            in the morning and walk barefoot in the grass with joy. The elderly
            will move freely in the house with grandchildren. The physical
            structure of children will develop, and the peace of the residents
            will increase. Every person can immerse themselves in nature to get
            rid of fatigue.
          </p>
           <div className="mt-2 mb-15">
              <Link to="/conceptDetails">
              <button className="slide-hover mt-2 px-12 py-3 font-semibold text-green-700 text-[16px] border-2 border-green-700">
              <span>
                 More Details
              </span>
               </button>
              </Link>
            </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-start items-start lg:justify-end" data-aos="fade-left"
          data-aos-duration="1000">
          <div>
            <img
              src={duplex}
              alt="duplex"
              className="shadow-lg object-cover w-full max-w-md lg:max-w-full h-auto mg:h-90 lg:h-90 transition-transform duration-500 hover:scale-105"
            />
           
          </div>
        </div>
      </div>

    </section>
  );
};

export default Concept;
