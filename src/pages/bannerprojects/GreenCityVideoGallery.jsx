import { useMemo, useState } from "react";
import { FiArrowUpRight, FiPlay, FiVideo } from "react-icons/fi";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";

export const defaultGreenCityVideos = [
  { id: "kobE1ZGqrLc", label: "ভিডিও ০১", url: "https://www.youtube.com/watch?v=kobE1ZGqrLc", preview: "https://www.youtube.com/watch?v=kobE1ZGqrLc", public_id: "", file: null },
  { id: "egArrSojupM", label: "ভিডিও ০২", url: "https://www.youtube.com/watch?v=egArrSojupM", preview: "https://www.youtube.com/watch?v=egArrSojupM", public_id: "", file: null },
  { id: "erghpZwcNGI", label: "ভিডিও ০৩", url: "https://www.youtube.com/watch?v=erghpZwcNGI", preview: "https://www.youtube.com/watch?v=erghpZwcNGI", public_id: "", file: null },
  { id: "h105yN0Ehig", label: "ভিডিও ০৪", url: "https://www.youtube.com/watch?v=h105yN0Ehig", preview: "https://www.youtube.com/watch?v=h105yN0Ehig", public_id: "", file: null },
];

const defaultVideos = defaultGreenCityVideos;

const getYouTubeId = (url = "") => {
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const embedUrl = getYouTubeEmbedUrl(url);
  return embedUrl?.match(/\/embed\/([^?]+)/)?.[1] || "";
};

const normalizeVideos = (items = []) =>
  items
    .map((item, index) => {
      const rawUrl = item?.url || (item?.id ? `https://www.youtube.com/watch?v=${item.id}` : "");
      const youtubeId = getYouTubeId(rawUrl);
      const url = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : rawUrl;
      return {
        label: item?.label || `ভিডিও ${String(index + 1).padStart(2, "0")}`,
        url,
        youtubeId,
      };
    })
    .filter((item) => item.url);

export default function GreenCityVideoGallery({
  videos,
  projectLabel = "গ্রিন সিটি",
  eyebrow = "Green City Films",
  title = "ভিডিওতে দেখুন গ্রিন সিটি",
  intro = "এক নজরে আমাদের প্রকল্প। পছন্দের ভিডিও বেছে নিন, আরও কাছ থেকে দেখুন গ্রিন সিটি।",
  sectionId = "project-videos",
  defaultVideosEnabled = true,
}) {
  const galleryVideos = useMemo(() => {
    const dynamicVideos = normalizeVideos(videos);
    return dynamicVideos.length || !defaultVideosEnabled ? dynamicVideos : normalizeVideos(defaultVideos);
  }, [videos, defaultVideosEnabled]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVideo = galleryVideos[Math.min(activeIndex, galleryVideos.length - 1)];
  const activeEmbed = activeVideo?.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`
    : "";

  if (!activeVideo) return null;

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-title`} className="relative overflow-hidden bg-[#071d16] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200"><FiVideo aria-hidden="true" /> {eyebrow}</span>
            <h2 id={`${sectionId}-title`} className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-emerald-100/70">{intro}</p>
          </div>
          <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-emerald-100">{galleryVideos.length}টি ভিডিও</span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-2xl shadow-black/20">
            <div className="relative aspect-video bg-black">
              {isPlaying ? (
                activeEmbed ? (
                  <iframe
                    key={activeVideo.url}
                    src={activeEmbed}
                    title={`${projectLabel} - ${activeVideo.label}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <video key={activeVideo.url} src={activeVideo.url} controls autoPlay className="absolute inset-0 h-full w-full object-cover" />
                )
              ) : (
                <button type="button" onClick={() => setIsPlaying(true)} aria-label={`${activeVideo.label} চালু করুন`} className="group absolute inset-0 h-full w-full overflow-hidden focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-emerald-300">
                  {activeVideo.youtubeId ? (
                    <img src={`https://i.ytimg.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`} alt={`${projectLabel} ভিডিও প্রিভিউ`} loading="lazy" className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-105" />
                  ) : (
                    <video src={activeVideo.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                  )}
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
                <h3 className="mt-2 text-lg font-medium sm:text-xl">{projectLabel}</h3>
              </div>
              <a href={activeVideo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-emerald-200 transition hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300">নতুন ট্যাবে দেখুন <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="mb-4 text-sm font-medium text-emerald-100/80">আরও দেখুন</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {galleryVideos.map((video, index) => (
                <button
                  key={`${video.url}-${index}`}
                  type="button"
                  aria-pressed={activeIndex === index}
                  aria-label={`${video.label} দেখুন`}
                  onClick={() => { setActiveIndex(index); setIsPlaying(true); }}
                  className={`group flex min-w-0 items-center gap-3 rounded-xl border p-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${activeIndex === index ? "border-emerald-400/60 bg-emerald-400/10" : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5"}`}
                >
                  <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black">
                    {video.youtubeId ? (
                      <img src={`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <video src={video.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60"><FiPlay className="ml-0.5 h-3 w-3" aria-hidden="true" /></span></span>
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-xs ${activeIndex === index ? "text-emerald-300" : "text-white/50"}`}>{video.label}</span>
                    <span className="mt-1 block text-sm font-medium text-white">{projectLabel}</span>
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
