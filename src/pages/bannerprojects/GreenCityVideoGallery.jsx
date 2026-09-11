import { useState } from "react";
import { FiArrowUpRight, FiPlay, FiVideo } from "react-icons/fi";

const videos = [
  { id: "kobE1ZGqrLc", label: "ভিডিও ০১" },
  { id: "egArrSojupM", label: "ভিডিও ০২" },
  { id: "erghpZwcNGI", label: "ভিডিও ০৩" },
  { id: "h105yN0Ehig", label: "ভিডিও ০৪" },
];

export default function GreenCityVideoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVideo = videos[activeIndex];

  return (
    <section id="green-city-videos" aria-labelledby="green-city-videos-title" className="relative overflow-hidden bg-[#071d16] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200"><FiVideo aria-hidden="true" /> Green City Films</span>
            <h2 id="green-city-videos-title" className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">ভিডিওতে দেখুন গ্রিন সিটি</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-emerald-100/70">এক নজরে আমাদের প্রকল্প। পছন্দের ভিডিও বেছে নিন, আরও কাছ থেকে দেখুন গ্রিন সিটি।</p>
          </div>
          <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-emerald-100">৪টি ভিডিও</span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-2xl shadow-black/20">
            <div className="relative aspect-video bg-black">
              {isPlaying ? (
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={`নর্থ সাউথ গ্রিন সিটি — ${activeVideo.label}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button type="button" onClick={() => setIsPlaying(true)} aria-label={`${activeVideo.label} চালু করুন`} className="group absolute inset-0 h-full w-full overflow-hidden focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-emerald-300">
                  <img src={`https://i.ytimg.com/vi/${activeVideo.id}/hqdefault.jpg`} alt="গ্রিন সিটি ভিডিও প্রিভিউ" loading="lazy" className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur-md transition group-hover:bg-emerald-500 sm:h-20 sm:w-20"><FiPlay className="ml-1 h-7 w-7" aria-hidden="true" /></span>
                    <span className="text-sm font-medium text-white">ভিডিওটি দেখুন</span>
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
              <div aria-live="polite">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">নির্বাচিত ভিডিও · {activeVideo.label}</p>
                <h3 className="mt-2 text-lg font-medium sm:text-xl">নর্থ সাউথ গ্রিন সিটি</h3>
              </div>
              <a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-emerald-200 transition hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300">YouTube-এ দেখুন <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="mb-4 text-sm font-medium text-emerald-100/80">আরও দেখুন</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  aria-pressed={activeIndex === index}
                  aria-label={`${video.label} দেখুন`}
                  onClick={() => { setActiveIndex(index); setIsPlaying(true); }}
                  className={`group flex min-w-0 items-center gap-3 rounded-xl border p-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${activeIndex === index ? "border-emerald-400/60 bg-emerald-400/10" : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5"}`}
                >
                  <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black">
                    <img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60"><FiPlay className="ml-0.5 h-3 w-3" aria-hidden="true" /></span></span>
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-xs ${activeIndex === index ? "text-emerald-300" : "text-white/50"}`}>{video.label}</span>
                    <span className="mt-1 block text-sm font-medium text-white">গ্রিন সিটি</span>
                    <span className="mt-1 block text-xs text-emerald-100/65">{activeIndex === index ? "নির্বাচিত" : "দেখতে ক্লিক করুন"}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
