import { useState } from "react";
import industrialCityMap from "../../assets/images/industrialCityMap.png";
import { IoCloseOutline } from "react-icons/io5";
const IndustrialCityForm = () => {
  const [open, setOpen] = useState(false);
    
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <div> 
      <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center">
    <img src={industrialCityMap}/>
    <div className="py-4">

   
     <button onClick={handleOpen} className="py-2 px-8 bg-[#ffc107] rounded-[5px]">PRIZE LIST</button>
      </div>
       {/* Modal */}
                        {open && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
                              {/* Close Button */}
                              <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-800 hover:text-gray-800 text-4xl"
                              >
                                <IoCloseOutline />
                              </button>
                              <div>
                                {/* Modal Photo */}
                                <img
                                  src='' // use selectedFeature directly
                                  alt="Selected"
                                  className="w-full h-auto rounded-lg object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        )}
</div>
<div className="max-w-screen-xl mx-auto my-10 p-8 bg-white shadow-lg rounded-2xl border">
      <h2 className="text-2xl font-bold text-center mb-2 text-green-700">
        PLOT BOOKING
      </h2>
      <p className="text-center text-gray-600 mb-6">
        A Better Tomorrow Starts with North South Green City Today
      </p>

      <form className="space-y-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Name*</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Block*</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            >
              <option value="">Select Block</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Address*</label>
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Road</label>
            <input
              type="text"
              placeholder="Road"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Phone*</label>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Plot No</label>
            <input
              type="text"
              placeholder="Plot No"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Email*</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Size (Katha)*</label>
            <input
              type="number"
              placeholder="Size of the Plot"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
    </div>
  )
}

export default IndustrialCityForm