import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function ProjectFilm({ film }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.3) return;
      observer.disconnect();
      video.play().catch(() => {});
    }, { threshold: 0.3 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => video.focus());
    else video.pause();
  }

  return (
    <section aria-labelledby="project-film-title" className="rounded-2xl bg-[#0e2821] px-5 py-12 text-white sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1320px] items-center gap-9 border-y border-white/20 py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-12">
        <div className="max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.13em] text-[#e1c48a]">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Project video
          </p>
          <h2 id="project-film-title" className="max-w-[19ch] text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl xl:text-[3.5rem]">
            {film.title}
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-pretty text-[#d7e7df] xl:text-xl">
            {film.description}
          </p>
          <button
            type="button"
            onClick={togglePlayback}
            aria-controls="project-film-player"
            className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#e1c48a]/60 px-5 py-2 text-base font-semibold text-[#ffe3ae] transition-colors hover:bg-[#e1c48a] hover:text-[#0e2821] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1c48a]"
          >
            {playing ? <FaPause aria-hidden="true" className="text-xs" /> : <FaPlay aria-hidden="true" className="text-xs" />}
            {playing ? "Pause video" : "Play video"}
          </button>
        </div>
        <div className="mx-auto w-full max-w-[580px] rounded-2xl border border-white/20 bg-[#182f28] p-2 shadow-2xl sm:p-3">
          <video
            id="project-film-player"
            ref={videoRef}
            controls
            muted
            playsInline
            preload="none"
            poster={film.poster}
            src={film.src}
            tabIndex={0}
            aria-label={film.title}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="block aspect-square w-full rounded-xl bg-[#081813] object-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1c48a]"
          >
            <a href={film.src}>Open {film.title} video</a>
          </video>
        </div>
      </div>
    </section>
  );
}
