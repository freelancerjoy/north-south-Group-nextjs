import React, { useState } from "react";
import greenCityMap from "../../assets/images/greenCityMap.png";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { usePlotBookingStore } from "../../store/plotbooking/plotBookingStore";

const GreenCityForm = () => {
  const [open, setOpen] = useState(false);
  const { addBooking, isLoading } = usePlotBookingStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Individual state variables
  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [address, setAddress] = useState("");
  const [road, setRoad] = useState("");
  const [phone, setPhone] = useState("");
  const [plotNo, setPlotNo] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, block, address, road, phone, plotNo, email, size };

    try {
      await addBooking(payload);
      toast.success("Plot booked successfully!");

      // Clear fields
      setName("");
      setBlock("");
      setAddress("");
      setRoad("");
      setPhone("");
      setPlotNo("");
      setEmail("");
      setSize("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book plot");
    }
  };

  return (
    <div>
      {/* Map & Prize List Button */}
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
        <img src={greenCityMap} alt="Green City Map" />
        <div className="py-4">
          <button
            onClick={handleOpen}
            className="py-2 px-8 bg-[#ffc107] rounded-[5px]"
          >
            PRIZE LIST
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-800 hover:text-gray-800 text-4xl"
              >
                <IoCloseOutline />
              </button>
              <div>
                <img
                  src="" // optional: use selected feature
                  alt="Selected"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plot Booking Form */}
      <div className="max-w-screen-xl mx-auto my-10 p-8 bg-white shadow-lg rounded-2xl border">
        <h2 className="text-2xl font-bold text-center mb-2 text-green-700">
          PLOT BOOKING
        </h2>
        <p className="text-center text-gray-600 mb-6">
          A Better Tomorrow Start Today
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Name*</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Block*</label>
              <select
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              >
                <option value="">Select Block</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Road</label>
              <input
                type="text"
                placeholder="Road"
                value={road}
                onChange={(e) => setRoad(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Plot No</label>
              <input
                type="text"
                placeholder="Plot No"
                value={plotNo}
                onChange={(e) => setPlotNo(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Size (Katha)*</label>
              <input
                type="number"
                placeholder="Size of the Plot"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-green-700 text-white font-semibold py-3 px-16 rounded-lg hover:bg-green-800 transition"
            >
              {isLoading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GreenCityForm;
