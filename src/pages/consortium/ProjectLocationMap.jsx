import { useState } from "react";
import location from "../../assets/images/location.jpg";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProjectLocationMap = ({ project, brochureUrl }) => {

   if (!project) return <p>Card not found</p>;
console.log(project)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = brochureUrl || "/nspdf.pdf";
    link.download = `${project.title || "Brochure"}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute bottom-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 sm:p-4 z-50 flex gap-2">
          <button
            onClick={handleOpen} // pass the clicked photo
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-sm shadow-lg
                     animate-bounce hover:scale-110 transition duration-300 ease-in-out"
          >
            Enquiry
          </button>
          
  <a
    href="/nspdf.pdf"
    download
   className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-sm shadow-lg
                     animate-bounce hover:scale-110 transition duration-300 ease-in-out"
  >
    Download Brochure
  </a>
 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-100">
          {/* Image 1 */}
          <a
              href={project.location}
              target="_blank">
          <div >
            {/* <h5 className="text-2xl font-bold text-green-600 mb-4">
              Location Map
            </h5>
            <a
              href={project.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 transition-colors"
            >
              View on Google Maps
            </a> */}
            <img
              src={location}
              alt="Photo 3"
              className="w-full h-100 object-cover"
            />
          </div>
          </a>
          {/* {project.mapLocation?.map((project, index) => (
<div key={index}> */}
          {/* Image 1 */}
          <div className="relative overflow-hidden">
            <img
              src={project.mapLocation[0]}
              alt="Photo 1"
              className="w-full h-100 object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="relative overflow-hidden">
            <img
              src={project.mapLocation[1]}
              alt="Photo 3"
              className="w-full h-100 object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="relative overflow-hidden">
            <img
              src={project.mapLocation[2]}
              alt="Photo 4"
              className="w-full h-100 object-cover"
            />
          </div>
        </div>
               {/* ))}
        </div> */}
  
      </div>

       {/* Modal */}
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative h-screen overflow-auto scrollbar-hide">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-800 text-4xl"
                >
                  <IoCloseOutline />
                </button>

                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-16 px-4">
                  <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 animate-fadeIn">
                    <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                      Enquiry Form <br />
                      <span className="text-gray-700 text-lg">
                        For North South Duplex Home
                      </span>
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Full Name */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                        />
                      </div>

                      {/* Contact Address */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                          Contact Address
                        </label>
                        <textarea
                          placeholder="Enter your contact address"
                          rows="3"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:bg-green-700 hover:scale-105"
                        >
                          Submit Enquiry
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default ProjectLocationMap;
