import { useState } from "react";
import useReveal from "../../components/useReveal";
import {
  MdAdd,
  MdArchitecture,
  MdBalance,
  MdCheck,
  MdExpandLess,
  MdHandshake,
  MdHomeRepairService,
  MdOutlineTrendingUp,
  MdTimelapse,
} from "react-icons/md";

const reasons = [
  {
    icon: <MdOutlineTrendingUp />,
    category: "Maximum Return on Investment",
    text: "Aesthetic design, professional construction, and a trusted brand position help landowners unlock stronger long-term value from their property.",
  },
  {
    icon: <MdBalance />,
    category: "In-House Legal and Design Team",
    text: "Our legal and design teams support the journey from documentation review to a development vision that fits the land and the market.",
  },
  {
    icon: <MdArchitecture />,
    category: "RAJUK Approved, BNBC Code Compliant",
    text: "Planning, safety, quality control, and construction supervision are handled with compliance and workmanship at the center.",
  },
  {
    icon: <MdTimelapse />,
    category: "On-Time Handover",
    text: "North South Group values committed delivery timelines and manages projects with disciplined coordination from start to finish.",
  },
  {
    icon: <MdHomeRepairService />,
    category: "After Handover Service",
    text: "Our relationship continues after handover with support for service requests, maintenance guidance, and owner feedback.",
  },
];

const TrustNorthSouth = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useReveal();

  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr,0.86fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-600">Why Landowners Trust Us</p>
          <h2 ref={ref} className="slide-title mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            A complete development partner for your land.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
            From feasibility and design to approval, construction, and post-handover support, the process is built
            to give landowners confidence at every decision point.
          </p>

          <div className="mt-10 space-y-3">
            {reasons.map((section, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={section.category} className="overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 p-5 text-left transition ${
                      isOpen ? "bg-emerald-50 text-emerald-900" : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center text-2xl ${
                          isOpen ? "bg-emerald-500 text-white" : "bg-slate-100 text-emerald-700"
                        }`}
                      >
                        {section.icon}
                      </span>
                      <span className="text-base font-bold sm:text-lg">{section.category}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-700">
                      {isOpen ? <MdExpandLess /> : <MdAdd />}
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-52" : "max-h-0"}`}>
                    <p className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600 sm:text-base">
                      {section.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 sm:p-8 lg:sticky lg:top-24">
          <div className="flex h-14 w-14 items-center justify-center bg-emerald-400 text-3xl text-slate-950">
            <MdHandshake />
          </div>
          <h3 className="mt-7 text-3xl font-black leading-tight">Start your joint venture today.</h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            Talk to our advisor and share the first details. We will guide you through the next step clearly.
          </p>

          <a
            href="tel:01894939226"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-emerald-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-400"
          >
            Call 018 9493 9226
          </a>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-7">
            {["Feasibility review", "Legal document guidance", "Premium project planning"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/78">
                <span className="flex h-7 w-7 items-center justify-center bg-white/10 text-emerald-300">
                  <MdCheck />
                </span>
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default TrustNorthSouth;
