import { useState } from "react";
import career1 from "../../assets/images/career1.jpg";
import { IoCloseOutline } from "react-icons/io5";
import {
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaGraduationCap,
  FaHandshake,
  FaBalanceScale,
  FaArrowRight,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaBalanceScale,
    title: "Equal Employment Opportunity",
    desc: "North South Group offers a wide range of equal employment opportunities for undergraduate and graduate students, ensuring fair treatment for every applicant regardless of background.",
  },
  {
    icon: FaBriefcase,
    title: "Excellent Work Environment",
    desc: "We provide an outstanding workplace culture built on mutual respect, open communication, and a supportive team atmosphere that helps everyone do their best work.",
  },
  {
    icon: FaGraduationCap,
    title: "Training & Skill Development",
    desc: "Extensive training programs help employees grow their technical and soft skills continuously, giving them the tools to thrive in their current role and beyond.",
  },
  {
    icon: FaHandshake,
    title: "Dynamic Corporate Culture",
    desc: "A professional yet positive environment where innovation is encouraged, ideas are valued, and every employee plays an active part in shaping the company's direction.",
  },
  {
    icon: FaUsers,
    title: "Versatile Team Collaboration",
    desc: "Working within a multicultural team opens up new perspectives, fresh problem-solving approaches, and opportunities to build skills that a homogeneous team cannot offer.",
  },
  {
    icon: FaChartLine,
    title: "Rapid Career Progress",
    desc: "North South Group offers some of the fastest career advancement paths in the industry, recognising and rewarding talent, dedication, and results consistently.",
  },
];

const inp =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-[#0f7771] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f7771]/20";
const lbl = "mb-1.5 block text-sm font-semibold text-gray-700";

const Career = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    address: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setFormData({ fullName: "", email: "", phone: "", position: "", address: "", cv: null });
    }, 2200);
  };

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <div className="relative h-64 w-full overflow-hidden md:h-80 lg:h-[70vh]">
        <img src={career1} alt="Career at North South" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[5px] text-green-300">
            Join Our Team
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Build Your Career With<br className="hidden md:block" /> North South Group
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            Be part of a team that is shaping the future of real estate and urban development in Bangladesh.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0f7771] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#0a5e5a]"
          >
            Apply Now <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── Why Join Us ── */}
      <section className="bg-gray-50 px-5 py-20 md:px-10">
        <div className="mx-auto max-w-screen-xl">
          {/* heading */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-[#0f7771]">
              Why North South Group
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Why You Should Join Us
            </h2>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#0f7771]" />
          </div>

          {/* cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f7771]/30 hover:shadow-lg"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-[#0f7771]/10 text-[#0f7771] transition group-hover:bg-[#0f7771] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-800">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-[#0f7771] px-5 py-20 text-center md:px-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-green-200">
            We Are Hiring
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Help North South Build A Better Tomorrow
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75">
            We are always looking for talented, passionate, and driven individuals to join our growing team across departments.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0f7771] shadow-lg transition hover:bg-transparent hover:text-white"
          >
            Submit Your CV <FaArrowRight size={12} />
          </button>
        </div>
      </section>

      {/* ── Modal ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* modal header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-[#0f7771]">
                  Career Application
                </p>
                <h3 className="mt-0.5 text-xl font-extrabold text-gray-900">Submit Your CV</h3>
              </div>
              <button
                onClick={() => { setOpen(false); setSubmitted(false); }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            {/* success state */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <FaCheckCircle className="mb-4 text-[#0f7771]" size={48} />
                <h4 className="text-xl font-bold text-gray-800">Application Received!</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for applying. Our team will review your CV and get back to you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={lbl}>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inp}
                        required
                      />
                    </div>
                    <div>
                      <label className={lbl}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 ..."
                        className={inp}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={lbl}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={inp}
                      required
                    />
                  </div>

                  <div>
                    <label className={lbl}>Position Applying For</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g. Sales Executive, Architect..."
                      className={inp}
                    />
                  </div>

                  <div>
                    <label className={lbl}>Contact Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      rows={3}
                      onChange={handleChange}
                      placeholder="Your current address"
                      className={inp}
                      required
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className={lbl}>
                      Upload CV <span className="font-normal text-gray-400">(PDF only) *</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-4 transition hover:border-[#0f7771] hover:bg-[#0f7771]/5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0f7771]/10 text-[#0f7771]">
                        <FaUpload size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-700">
                          {formData.cv ? formData.cv.name : "Click to upload your CV"}
                        </p>
                        <p className="text-xs text-gray-400">PDF format, max 5MB</p>
                      </div>
                      <input
                        type="file"
                        name="cv"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-[#0f7771] py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-md transition hover:bg-[#0a5e5a]"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
