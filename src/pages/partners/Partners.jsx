// import { useEffect, useRef } from 'react';
// import partner1 from '../../assets/partner1.png';
// import partner2 from '../../assets/partner2.png';
// import partner3 from '../../assets/partner3.png';
// import partner4 from '../../assets/partner4.png';
// import partner5 from '../../assets/partner5.png';
// import partner6 from '../../assets/partner6.png';
// import partner7 from '../../assets/partner7.png';
// import "../../index.css";
// import { FaSpinner } from "react-icons/fa";
// import { usePartnerStore } from '../../store/partners/partnersStore';


// const Partners = () => {

//   const { partners,loadPartners,isLoading } = usePartnerStore();
    
//        useEffect(() => {
//        loadPartners()
//        }, [loadPartners])
    
//         if (isLoading) {
//       return (
//         <div className="flex justify-center items-center h-[400px]">
//          <div> <FaSpinner className="animate-spin" size={50}/></div>
//         </div>
//       );
//     }

//   return (
// <div className="mx-auto px-5 py-2 lg:py-10">
//   <h2
//   id="partner"
//     className="w-full text-center text-sm md:text-2xl lg:text-4xl uppercase font-bold text-[#0f7771] mb-6"
//   >
//     Our concern
//   </h2>

//   <div className="overflow-hidden relative">
//     <div className="flex animate-marquee gap-8">
//       {[partner1, partner2, partner3, partner4, partner5, partner6, partner7].map((partner, i) => (
//         <div key={i} className="flex justify-center items-center">
//           <img
//             src={partner}
//             alt={`Partner ${i + 1}`}
//             className="w-40 h-20 md:w-48 md:h-24 lg:w-56 lg:h-28 rounded-lg object-contain transition-transform transform hover:scale-105"
//           />
//         </div>
//       ))}
//       {/* Duplicate images for seamless loop */}
//       {[partner1, partner2, partner3, partner4, partner5, partner6, partner7].map((partner, i) => (
//         <div key={partner._id || partner} className="flex justify-center items-center">
//   <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-md p-6 transition-shadow duration-300 hover:shadow-xl">
//     <div className="flex justify-center items-center w-40 h-20 md:w-48 md:h-24 lg:w-56 lg:h-28">
//       <img
//         src={partner}
//         alt={`Partner ${i + 1}`}
//         className="object-contain transition-transform duration-300 hover:scale-110"
//       />
//     </div>
//   </div>
// </div>



//       ))}
//     </div>
//   </div>
// </div>



//   )
// }

// export default Partners

// import partner1 from '../../assets/partner1.png';
// import partner2 from '../../assets/partner2.png';
// import partner3 from '../../assets/partner3.png';
// import partner4 from '../../assets/partner4.png';
// import partner5 from '../../assets/partner5.png';
// import partner6 from '../../assets/partner6.png';
// import partner7 from '../../assets/partner7.png';
import { useEffect } from "react";
import { usePartnerStore } from "../../store/partners/partnersStore";
import PartnerCard from './PartnerCard';
import { FaSpinner } from "react-icons/fa";

// const partners = [
//   partner1,
//   partner2,
//   partner3,
//   partner4,
//   partner5,
//   partner6,
//   partner7,
// ];

const Partners = () => {

  const { partners,loadPartners,isLoading } = usePartnerStore();
       useEffect(() => {
       loadPartners()
       }, [loadPartners])
    
        if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[400px]">
         <div> <FaSpinner className="animate-spin" size={50}/></div>
        </div>
      );
    }

  return (
    <div className="mx-auto px-5 py-6 lg:py-12">
      <h2
        id="partner"
        className="text-center text-sm md:text-2xl lg:text-4xl uppercase font-bold text-[#0f7771] mb-8"
      >
        Our Concern
      </h2>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-8 w-max">

          {/* FIRST SET */}
          {partners.map((partner, i) => (
            <PartnerCard key={`p1-${i}`} img={partner.partnersImage} />
          ))}

          {/* DUPLICATE SET */}
          {partners.map((partner, i) => (
            <PartnerCard key={`p2-${i}`} img={partner.partnersImage} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Partners;
