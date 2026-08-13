import { useState, useEffect } from "react";
import meeting from "../../assets/images/2.jpg";
import AOS from "aos";
import useReveal from "../../components/useReveal";
import { toast } from "react-toastify";
import { useContactStore } from "../../store/contact/contactStore";

AOS.init();

const Meeting = ({ className = "" }) => {
  const ref = useReveal();
  const { addContact, isLoading } = useContactStore();

  // Only the required fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name: fullName, number: phone, address }; // only these fields

    try {
      await addContact(payload);
      toast.success("Contact added successfully!");

      // Clear form
      setFullName("");
      setPhone("");
      setAddress("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create contact");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="max-w-screen-xl mx-auto py-10 px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* Image Section */}
        <div
          className="lg:w-1/2 w-full flex justify-center"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            src={meeting}
            alt="duplex"
            className="shadow-lg w-full h-auto mg:h-90 lg:h-110 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Form Section */}
        <div
          className="lg:w-1/2 w-full bg-white p-6 sm:p-8"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <h1
            ref={ref}
            className={`slide-title ${className} text-center sm:text-left text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-green-700 mb-6`}
          >
            Schedule a Meeting
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-500 font-medium mb-1">
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-medium mb-1">
                Address*
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-700"
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="slide-hover mt-4 px-12 py-3 font-semibold text-green-700 border-2 border-green-700 hover:text-white hover:bg-green-700 transition-colors"
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Meeting;
