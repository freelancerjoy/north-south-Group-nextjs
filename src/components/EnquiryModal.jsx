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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 font-shurjo">
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
                <h3 className="text-2xl font-bold text-slate-900">
                  ব্রোশিওর ডাউনলোড
                </h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  <span className="font-semibold text-green-700">
                    {projectTitle}
                  </span>{" "}
                  প্রকল্পের ব্রোশিওর ডাউনলোড করতে আপনার তথ্য প্রদান করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-base font-semibold text-slate-800">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="সম্পূর্ণ নাম লিখুন"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-base font-semibold text-slate-800">
                    ফোন নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-base font-semibold text-slate-800">
                    ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="আপনার বর্তমান ঠিকানা লিখুন"
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-base text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg disabled:bg-green-400"
                >
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <MdDownload className="text-xl" />
                      ব্রোশিওর ডাউনলোড করুন
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
              <h3 className="text-2xl font-bold text-slate-900">
                ডাউনলোড শুরু হয়েছে!
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                ধন্যবাদ{" "}
                <span className="font-semibold text-slate-900">{form.name}</span>!
                <br />
                আপনার ব্রোশিওরটি ডাউনলোড হচ্ছে।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
