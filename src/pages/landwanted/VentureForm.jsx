import land1 from "../../assets/images/land1.jpg";
import land2 from "../../assets/images/land2.jpg";
import {
  MdArrowForward,
  MdCall,
  MdEmail,
  MdLocationOn,
  MdOutlineRealEstateAgent,
  MdPerson,
  MdStraighten,
} from "react-icons/md";

const imageCards = [
  { src: land1, title: "Gulshan Premium Residence", location: "Gulshan" },
  { src: land2, title: "Elegant Corner Development", location: "Banani" },
  { src: land1, title: "Boutique Urban Address", location: "Dhanmondi" },
  { src: land2, title: "Future Ready Apartment Plan", location: "Uttara" },
];

const inputClass =
  "w-full border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-500";

const FieldIcon = ({ children }) => (
  <span className="pointer-events-none absolute right-4 top-[43px] text-xl text-slate-300">{children}</span>
);

const VentureForm = () => {
  return (
    <section id="joint-venture-form" className="bg-linear-to-b from-slate-50 to-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-600">Land Submission</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Start your joint venture request.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end">
            Submit owner and land information below. Our team will review the location, land size,
            and development scope before reaching out with the next steps.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <form className="border border-slate-200 bg-white p-5 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.45)] sm:p-8">
            <div className="mb-8 flex items-start gap-4 border-b border-slate-100 pb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-emerald-500 text-2xl text-white">
                <MdOutlineRealEstateAgent />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">Owner & Land Details</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Fields marked with * help us respond faster.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">Owner Information</p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="relative">
                    <label className={labelClass}>Name*</label>
                    <input type="text" placeholder="Your full name" className={inputClass} />
                    <FieldIcon><MdPerson /></FieldIcon>
                  </div>
                  <div className="relative">
                    <label className={labelClass}>Phone*</label>
                    <input type="tel" placeholder="Phone number" className={inputClass} />
                    <FieldIcon><MdCall /></FieldIcon>
                  </div>
                  <div className="relative md:col-span-2">
                    <label className={labelClass}>Email*</label>
                    <input type="email" placeholder="Email address" className={inputClass} />
                    <FieldIcon><MdEmail /></FieldIcon>
                  </div>
                  <div className="relative md:col-span-2">
                    <label className={labelClass}>Address*</label>
                    <input type="text" placeholder="Present address" className={inputClass} />
                    <FieldIcon><MdLocationOn /></FieldIcon>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">Land Information</p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Category*</label>
                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>Select category</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Mixed Use</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Location*</label>
                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>Select location</option>
                      <option>Gulshan</option>
                      <option>Banani</option>
                      <option>Dhanmondi</option>
                      <option>Uttara</option>
                      <option>Other Prime Dhaka Area</option>
                    </select>
                  </div>
                  <div className="relative md:col-span-2">
                    <label className={labelClass}>Size (Katha)*</label>
                    <input type="text" placeholder="Size of the land" className={inputClass} />
                    <FieldIcon><MdStraighten /></FieldIcon>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Additional Notes</label>
                    <textarea
                      rows="4"
                      placeholder="Road width, ownership details, preferred partnership notes"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-slate-950 px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-600"
            >
              Submit Request
              <MdArrowForward />
            </button>
          </form>

          <div className="space-y-5">
            <div className="bg-emerald-600 p-7 text-white shadow-xl shadow-emerald-100">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-emerald-100">Development Portfolio</p>
              <h3 className="mt-3 text-3xl font-black leading-tight">Premium outcomes start with the right land.</h3>
              <p className="mt-4 text-sm leading-7 text-emerald-50/85">
                These visual references show the kind of refined residential experience we aim to create
                through thoughtful planning and strong execution.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {imageCards.map((card) => (
                <article key={`${card.title}-${card.location}`} className="group relative min-h-64 overflow-hidden bg-slate-900">
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/88 via-slate-950/18 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="mb-2 inline-flex bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-950">
                      {card.location}
                    </p>
                    <h4 className="text-xl font-black leading-tight">{card.title}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VentureForm;
