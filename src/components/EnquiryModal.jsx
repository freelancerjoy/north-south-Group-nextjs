import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

export default function EnquiryModal({ isOpen, onClose, projectTitle, brochureUrl }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    setLoading(false);
    setSubmitted(true);

    if (brochureUrl) {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `${projectTitle || "Brochure"}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", address: "" });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="h-1.5 w-full bg-gradient-to-r from-green-400 to-green-600" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl text-gray-400 transition hover:text-gray-700"
          aria-label="Close brochure enquiry"
        >
          <IoCloseOutline />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Download Brochure
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please share your details to download the{" "}
                  <span className="font-semibold text-green-600">
                    {projectTitle}
                  </span>{" "}
                  brochure.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg disabled:bg-green-400"
                >
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <MdDownload className="text-xl" />
                      Download Brochure
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl text-green-500">
                &#10003;
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Download Started!
              </h3>
              <p className="text-sm text-gray-500">
                Thank you{" "}
                <span className="font-semibold text-gray-700">{form.name}</span>!
                <br />
                Your brochure is downloading now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
