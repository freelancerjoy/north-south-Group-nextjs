import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    if (!images.length) return undefined;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec for smoother perception

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[360px] md:h-[520px] lg:h-[82vh] overflow-hidden bg-slate-900">

      {/* SLIDES WRAPPER */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-full w-full flex-shrink-0"
          >
            <OptimizedImage
              src={img}
              alt="Project slide"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* VERTICAL DOTS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300
              ${current === i ? "bg-white scale-125" : "bg-transparent"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
