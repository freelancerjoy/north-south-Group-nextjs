import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage, { imageSrc } from "../components/OptimizedImage";

const heroLogo = "/images/heroLogo.gif";

export default function Banner({ slides, buttons }) {
  const slideItems = useMemo(
    () =>
      slides
        .map((slide) => ({
          src: imageSrc(typeof slide === "string" ? slide : slide.image),
          objectFit: typeof slide === "string" ? "cover" : slide.objectFit || "cover",
        }))
        .filter((slide) => slide.src),
    [slides]
  );
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slideItems.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slideItems.length]);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="
        relative w-full
        h-[40vh]
        md:h-[70vh]
        lg:h-screen
        overflow-hidden
        flex items-center justify-center
        bg-black
      "
    >
      {/* ── SMOOTH TRANSITION SLIDES (Exact smooth crossfade & gentle scale as in AboutUs) ── */}
      <AnimatePresence mode="sync">
        {slideItems[current] && (
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full max-h-screen"
          >
            <OptimizedImage
              src={slideItems[current].src}
              alt="banner"
              priority
              sizes="100vw"
              objectFit={slideItems[current].objectFit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CENTER LOGO (Original Design Preserved) ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48 lg:h-60 lg:w-60
          p-3 sm:p-4 md:p-6 lg:p-7 z-50 bg-white/70 border-4 border-dotted
          border-gray-500 rounded-full pointer-events-none"
      >
        <img
          src={heroLogo}
          alt="Centered"
          className="
            h-full w-full
            object-contain
          "
        />
      </div>

      {/* ── ACTION BUTTONS (Original Design Preserved) ── */}
      <div
        className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2
          z-30 flex flex-nowrap justify-center gap-3 sm:gap-5"
      >
        {buttons.map((btn, i) => (
          <Link key={i} to={btn.link}>
            <button
              className="bg-black/70 border-2 border-green-500 text-white
                font-semibold px-4 py-2
                whitespace-nowrap
                text-xs sm:text-sm md:text-lg lg:text-lg
                rounded-lg shadow-lg hover:scale-110 transition-all"
            >
              {btn.text}
            </button>
          </Link>
        ))}
      </div>

      {/* ── RIGHT SLIDE DOT INDICATORS (Original Design Preserved) ── */}
      <div className="absolute right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
        {slideItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300
              ${current === i ? "bg-white scale-125 shadow-md" : "bg-gray-400 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
