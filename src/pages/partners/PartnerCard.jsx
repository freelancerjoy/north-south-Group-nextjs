import React from 'react'

   const PartnerCard = ({ img }) => {
  return (
    <div className="px-2 py-4 box-border">
      <div className="bg-white ring-1 ring-gray-300 rounded-xl p-6
                      transition-all duration-300 hover:ring-[#0f7771] hover:shadow-xl">
        <div className="flex justify-center items-center w-40 h-20 md:w-48 md:h-24 lg:w-56 lg:h-28">
          <img
            src={img}
            alt="Partner"
            className="object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};


export default PartnerCard