import { useState, useEffect, useCallback, useMemo } from "react";
import realEstateImg1 from "../../assets/images/realEstateImg1.jpg";
import realEstateImg2 from "../../assets/images/realEstateImg2.jpg";
import realEstateImg3 from "../../assets/images/realEstateImg3.jpg";
import map from "../../assets/images/map.jpg";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import {
  MdApartment,
  MdAssuredWorkload,
  MdCall,
  MdLocationOn,
  MdOutlineHandshake,
  MdVerified,
} from "react-icons/md";
import TrustNorthSouth from "./TrustNorthSouth";
import VentureForm from "./VentureForm";

const highlights = [
  { icon: <MdVerified />, value: "Prime", label: "Dhaka locations" },
  { icon: <MdAssuredWorkload />, value: "Legal", label: "Due diligence support" },
  { icon: <MdApartment />, value: "Design", label: "Premium development plan" },
];

const LandWanted = () => {
  const slides = useMemo(() => [realEstateImg1, realEstateImg2, realEstateImg3], []);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-slate-950">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`North South land development ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/48 to-emerald-950/20" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/20" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:px-10 lg:pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-emerald-200 backdrop-blur">
                <MdOutlineHandshake className="text-lg" />
                Joint Venture Development
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Land Wanted
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Partner with North South Group for premium residential development in prime Dhaka locations,
                backed by design, legal, construction, and handover expertise.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#joint-venture-form"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-emerald-950/30 transition hover:bg-emerald-400"
                >
                  Submit Land
                  <IoIosArrowDown />
                </a>
                <a
                  href="tel:01894939226"
                  className="inline-flex items-center justify-center gap-2 border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                >
                  <MdCall />
                  Call Advisor
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/15 bg-white/10 p-5 text-white shadow-2xl shadow-slate-950/20 backdrop-blur"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-emerald-400 text-2xl text-slate-950">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-black">{item.value}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/12 pt-6">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`h-1.5 transition-all ${current === index ? "w-12 bg-emerald-400" : "w-6 bg-white/35"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">Any Prime Location Of Dhaka</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              We are ready for selective, high-potential land partnerships.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
              Share your land details and our team will review the development potential, documentation,
              surrounding access, and partnership scope with care.
            </p>
            <div className="mt-7 flex items-center gap-3 text-emerald-200">
              <span className="flex h-11 w-11 items-center justify-center bg-white/10 text-2xl">
                <MdLocationOn />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Dhaka Metropolitan Growth Zones</span>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden border border-white/10 bg-white/5">
            <img src={map} alt="Dhaka land wanted map" className="h-full min-h-[340px] w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/70 via-transparent to-emerald-950/25" />
            <div className="absolute bottom-5 left-5 right-5 border border-white/15 bg-slate-950/72 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Development Focus</p>
              <p className="mt-2 text-2xl font-black">Joint Venture Residential Projects</p>
            </div>
          </div>
        </div>
      </section>

      <TrustNorthSouth />
      <VentureForm />
    </main>
  );
};

export default LandWanted;
