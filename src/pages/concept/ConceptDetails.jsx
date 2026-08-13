import { useState } from "react";
import duplex from "../../assets/images/duplex.jpg";
import photo1 from "../../assets/images/gallery1.jpg";
import photo2 from "../../assets/images/gallery2.jpg";
import photo3 from "../../assets/images/gallery3.jpg";
import photo4 from "../../assets/images/gallery4.jpg";
import photo5 from "../../assets/images/gallery5.jpg";
import photo6 from "../../assets/images/gallery6.jpg";
import photo7 from "../../assets/images/gallery7.jpg";
import photo8 from "../../assets/images/gallery8.jpg";

import basement from "../../assets/images/basement.jpg";
import groundFloor from "../../assets/images/groundFloor.jpg";
import typicalFloor from "../../assets/images/typicalFloor.jpg";
import roofFloor from "../../assets/images/roofFloor.jpg";

import { IoCloseOutline } from "react-icons/io5";
import { FiCheckCircle, FiGrid, FiHome, FiMapPin } from "react-icons/fi";
import LocationMap from "./locationMap/LocationMap";

const displayFont = { fontFamily: '"Cormorant Garamond", serif' };
const accentFont = { fontFamily: '"Cinzel", serif', letterSpacing: "0.14em" };
const bodyFont = { fontFamily: '"Manrope", sans-serif' };

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];
const keyPhotos = [basement, groundFloor, typicalFloor, roofFloor];

const specs = [
  { label: "Project Address", value: "NSGC Block-VIP1, Rupganj, Narayanganj" },
  { label: "Land Area", value: "100 Bigha" },
  { label: "Apartment Size", value: "3600 SFT" },
  { label: "Total Units", value: "1" },
  { label: "Number of Lifts", value: "0" },
  { label: "Date of Completion", value: "2024-09-26" },
  { label: "Building Type", value: "Luxurious Duplex Home" },
  { label: "Levels / Stories", value: "G + 1" },
  { label: "Parking", value: "2" },
  { label: "Stairs", value: "1" },
];

const amenitiesData = [
  {
    category: "GENERAL FEATURES",
    items: [
      "A framed structure as per BNBC.",
      "5 inch thick first class brick wall/as-cast wall/concrete hollow block/concrete solid block.",
      "Stone aggregate used for all structural components.",
      "60/72.5 grade deformed bar used in all structural members.",
      "Good quality cement used.",
    ],
  },
  {
    category: "BATHROOM FEATURES",
    items: [
      "Floor tiles: 12 inch x 12 inch (Sheltech Ceramics/Equivalent).",
      "Wall tiles up to 7 feet height: 12 inch x 24 inch (Equivalent).",
      "Sanitary wares in toilets (Charu/Equivalent) except maid's toilet.",
      "Cabinet basin (Charu/Equivalent) with marble top in master toilet, subject to space availability.",
      "Pedestal basin (Charu/Equivalent) in toilet-2 and common toilet.",
    ],
  },
  {
    category: "ELEVATOR",
    items: [
      "Three international standard lifts from Sakura/Fuji/Schneider or equivalent.",
      "2 no 13-passenger lifts.",
      "1 no 10-passenger lift.",
    ],
  },
  {
    category: "KITCHEN DOORS",
    items: [
      "Aluminum top sliding glass door for kitchen. Verandah door uses aluminum sliding shutter/Formica laminated door shutter/equivalent depending on design.",
    ],
  },
  {
    category: "MAIDS TOILET (IF ANY)",
    items: [
      "Door of solid PVC/equivalent door shutter and PVC frame/equivalent. Door frame size may change in case of concrete hollow/solid block.",
    ],
  },
];

const keyPlanButtons = ["Basement", "Ground Floor", "Typical Floor", "Roof Floor"];

const ConceptDetails = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [keyPlanOpen, setKeyPlanOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleOpen = (photo) => {
    setSelectedFeature(photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeature(null);
  };

  const handleKeyPlanOpen = (photo) => {
    setSelectedKey(photo);
    setKeyPlanOpen(true);
  };

  const handleKeyPlanClose = () => {
    setKeyPlanOpen(false);
    setSelectedKey(null);
  };

  return (
    <main id="concept" className="min-h-screen overflow-hidden bg-[#f7f5ef] text-slate-900">
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-slate-950 px-6 pt-28 text-white">
        <img
          src={duplex}
          alt="North South Duplex Home"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.26),transparent_28%),linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.76)_52%,rgba(2,6,23,0.48)_100%)]" />
        <div className="absolute -right-28 top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute bottom-20 left-8 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto grid min-h-[calc(92vh-7rem)] max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.82fr]">
          <div>
            <span
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-white/82 backdrop-blur"
              style={accentFont}
            >
              Luxury Duplex Residence
            </span>
            <h1
              className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-tight md:text-7xl"
              style={displayFont}
            >
              North South Duplex Home
            </h1>
            <p
              className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg"
              style={bodyFont}
            >
              A private, premium duplex concept in NSGC Block-VIP1, crafted for
              quiet luxury, generous space, family comfort, and long-term value.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#duplexSpecs"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-7 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-900/20 transition duration-300 hover:-translate-y-1"
                style={bodyFont}
              >
                View Specification
              </a>
              <a
                href="#duplexGallery"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/18"
                style={bodyFont}
              >
                Photo Gallery
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src={photo1}
                alt="North South Duplex interior"
                className="h-[320px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="grid gap-3 pt-5 sm:grid-cols-3">
              {[
                { value: "3600", label: "SFT" },
                { value: "G + 1", label: "Levels" },
                { value: "2", label: "Parking" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-2xl font-semibold text-white" style={displayFont}>
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/58" style={accentFont}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="duplexSpecs" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span
              className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-emerald-600"
              style={accentFont}
            >
              Technical Specification
            </span>
            <h2
              className="mt-5 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl"
              style={displayFont}
            >
              Private residence details
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
              Key project information is now presented like a premium brochure,
              clean, scannable, and client-friendly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {specs.map((item) => (
              <div
                key={item.label}
                className="group rounded-[1.4rem] border border-emerald-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100"
              >
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400" style={accentFont}>
                  {item.label}
                </p>
                <p className="mt-3 text-base font-bold leading-6 text-slate-900" style={bodyFont}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <span
              className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-emerald-600"
              style={accentFont}
            >
              Floor Planning
            </span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl" style={displayFont}>
              Key plan
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
              Review each plan visually in a focused preview modal. The layout now
              feels premium without changing the existing plan assets.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {keyPlanButtons.map((btn, index) => (
              <button
                key={btn}
                onClick={() => handleKeyPlanOpen(keyPhotos[index])}
                className="group flex items-center justify-between rounded-[1.4rem] border border-slate-100 bg-[#f8faf7] p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-xl"
                type="button"
              >
                <span className="font-bold text-slate-900" style={bodyFont}>
                  {btn}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <FiGrid />
                </span>
              </button>
            ))}
          </div>
        </div>

        {keyPlanOpen && selectedKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
              <button
                onClick={handleKeyPlanClose}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-emerald-600"
                type="button"
                aria-label="Close key plan"
              >
                <IoCloseOutline size={24} />
              </button>
              <img
                src={selectedKey}
                alt="Selected floor plan"
                className="max-h-[82vh] w-full object-contain"
              />
            </div>
          </div>
        )}
      </section>

      <section id="duplexGallery" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span
              className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-emerald-600"
              style={accentFont}
            >
              Visual Tour
            </span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl" style={displayFont}>
              Photo gallery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
              Gallery presentation has been upgraded with larger cards, softer
              shadows, and a cleaner image preview.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo, index) => (
              <button
                onClick={() => handleOpen(photo)}
                key={photo}
                className={`group relative overflow-hidden rounded-[1.4rem] bg-slate-900 shadow-xl ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
                type="button"
              >
                <img
                  src={photo}
                  alt={`North South Duplex gallery ${index + 1}`}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/72 via-transparent to-transparent opacity-70 transition group-hover:opacity-95" />
                <div className="absolute bottom-5 left-5 text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/64" style={accentFont}>
                    Gallery
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white" style={displayFont}>
                    View {index + 1}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {open && selectedFeature && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
              <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.6rem] bg-white shadow-2xl">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-emerald-600"
                  type="button"
                  aria-label="Close gallery preview"
                >
                  <IoCloseOutline size={24} />
                </button>
                <img
                  src={selectedFeature}
                  alt="Selected duplex gallery"
                  className="max-h-[84vh] w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span
              className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-emerald-600"
              style={accentFont}
            >
              Features & Amenities
            </span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl" style={displayFont}>
              Built for refined living
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
              Specification details remain available, now inside cleaner premium
              accordion cards.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {amenitiesData.map((section, index) => (
              <div
                key={section.category}
                className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-[#f8faf7] shadow-sm"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  onClick={() => toggle(index)}
                  type="button"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      {index % 2 === 0 ? <FiHome /> : <FiCheckCircle />}
                    </span>
                    <span className="font-bold text-slate-900" style={bodyFont}>
                      {section.category}
                    </span>
                  </span>
                  <span className="text-2xl font-light text-emerald-600">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-500 ${
                    openIndex === index ? "max-h-[520px] p-6" : "max-h-0 p-0"
                  }`}
                >
                  <ul className="space-y-3 text-sm leading-7 text-slate-600" style={bodyFont}>
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <FiCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-emerald-600"
                style={accentFont}
              >
                Location
              </span>
              <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl" style={displayFont}>
                Find the project
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-500" style={bodyFont}>
              Map section retained and wrapped in a cleaner presentation so the
              page ends with a polished project-location experience.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl ring-1 ring-slate-100">
            <div className="mb-4 flex items-center gap-3 px-2 pt-2 text-sm font-bold text-slate-700" style={bodyFont}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <FiMapPin />
              </span>
              NSGC Block-VIP1, Rupganj, Narayanganj
            </div>
            <LocationMap />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConceptDetails;
