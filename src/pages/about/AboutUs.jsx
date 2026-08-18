import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaHandshake,
  FaLeaf,
  FaPlay,
  FaShieldAlt,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";
import { defaultAboutContent } from "./defaultAboutContent";
import { useAboutStore } from "../../store/about/aboutStore";

const displayFont = { fontFamily: '"Montserrat", sans-serif' };
const accentFont = {
  fontFamily: '"Montserrat", sans-serif',
  letterSpacing: "0.16em",
  fontWeight: 700,
};
const bodyFont = { fontFamily: '"Montserrat", sans-serif' };

const iconRegistry = {
  FaBuilding,
  FaLeaf,
  FaShieldAlt,
  FaHandshake,
};

function SectionHeader({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className="text-xs font-bold uppercase text-green-700"
        style={accentFont}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-4 text-4xl font-semibold leading-tight text-gray-950 sm:text-5xl"
        style={displayFont}
      >
        {title}
      </h2>
      {text && (
        <p
          className="mt-5 text-sm leading-8 text-gray-600 sm:text-base"
          style={bodyFont}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`border border-white/80 bg-white/[0.78] shadow-[0_30px_90px_-55px_rgba(22,101,52,0.62)] ring-1 ring-green-100/80 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

const AboutUs = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedCsrImage, setSelectedCsrImage] = useState(null);
  const { aboutContent, loadAboutContent } = useAboutStore();

  useEffect(() => {
    loadAboutContent().catch(() => {});
  }, [loadAboutContent]);

  const data = {
    ...defaultAboutContent,
    ...(aboutContent || {}),
    heroSlides:
      Array.isArray(aboutContent?.heroSlides) && aboutContent.heroSlides.length > 0
        ? aboutContent.heroSlides
        : defaultAboutContent.heroSlides,
    stats:
      Array.isArray(aboutContent?.stats) && aboutContent.stats.length > 0
        ? aboutContent.stats
        : defaultAboutContent.stats,
    strengths:
      Array.isArray(aboutContent?.strengths) && aboutContent.strengths.length > 0
        ? aboutContent.strengths
        : defaultAboutContent.strengths,
    leaders:
      Array.isArray(aboutContent?.leaders) && aboutContent.leaders.length > 0
        ? aboutContent.leaders
        : defaultAboutContent.leaders,
    csrImages:
      Array.isArray(aboutContent?.csrImages) && aboutContent.csrImages.length > 0
        ? aboutContent.csrImages
        : defaultAboutContent.csrImages,
    missionCards:
      Array.isArray(aboutContent?.missionCards) && aboutContent.missionCards.length > 0
        ? aboutContent.missionCards
        : defaultAboutContent.missionCards,
    overviewParagraphs:
      Array.isArray(aboutContent?.overviewParagraphs) && aboutContent.overviewParagraphs.length > 0
        ? aboutContent.overviewParagraphs
        : defaultAboutContent.overviewParagraphs,
  };

  const [hero1 = defaultAboutContent.heroSlides[0], hero2 = defaultAboutContent.heroSlides[1]] =
    data.heroSlides || [];
  const embedUrl = getYouTubeEmbedUrl(data.videoUrl);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <main className="overflow-hidden bg-white text-gray-950" style={bodyFont}>
      <section className="relative isolate min-h-[720px] overflow-hidden">
        <img
          src={hero1}
          alt="North South Group development"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.78)_0%,rgba(3,7,18,0.55)_44%,rgba(3,7,18,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.22),transparent_26%),radial-gradient(circle_at_74%_20%,rgba(243,177,40,0.18),transparent_24%)]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-end px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div className="max-w-4xl">
              <p
                className="text-xs font-bold uppercase text-green-200"
                style={accentFont}
              >
                {data.heroEyebrow}
              </p>
              <h1
                className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[3.9rem]"
                style={displayFont}
              >
                {data.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                {data.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#overview"
                  className="inline-flex items-center gap-3 rounded-full bg-green-600 px-7 py-4 text-xs font-bold uppercase text-white shadow-[0_18px_50px_-24px_rgba(34,197,94,0.9)] transition hover:bg-green-700"
                  style={accentFont}
                >
                  Explore Story <FaArrowRight />
                </a>
                <a
                  href="#leadership"
                  className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-xs font-bold uppercase text-white backdrop-blur transition hover:border-green-200 hover:bg-white/18"
                  style={accentFont}
                >
                  Leadership
                </a>
              </div>
            </div>

            <GlassCard className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-white/25 p-1">
              {data.stats.map((item) => (
                <div key={item.label} className="bg-white/82 p-5">
                  <p
                    className="text-3xl font-semibold text-green-700"
                    style={displayFont}
                  >
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase text-gray-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>

      <section
        id="overview"
        className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,197,94,0.16),transparent_24%),radial-gradient(circle_at_88%_18%,rgba(243,177,40,0.14),transparent_22%),linear-gradient(180deg,#ffffff_0%,#f4fbf3_48%,#ffffff_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            centered
            eyebrow={data.overviewEyebrow}
            title={data.overviewTitle}
            text={data.overviewText}
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <GlassCard className="overflow-hidden rounded-[2rem] p-3 lg:h-full">
              <div className="relative h-full min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#10291d]">
                <img
                  src={hero2}
                  alt="North South Group project site"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.02)_0%,rgba(8,47,30,0.14)_48%,rgba(3,7,18,0.72)_100%)]" />
                <div className="absolute left-5 right-5 top-5 flex justify-end">
                  <div className="rounded-full border border-white/35 bg-black/28 px-5 py-2 text-xs font-bold uppercase text-white shadow-[0_18px_50px_-35px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                    {data.overviewBadge}
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-[1.5rem] border border-white/28 bg-black/35 p-5 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                    <p
                      className="text-xs font-bold uppercase text-green-100"
                      style={accentFont}
                    >
                      {data.overviewHighlightEyebrow}
                    </p>
                    <h3
                      className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl"
                      style={displayFont}
                    >
                      {data.overviewHighlightTitle}
                    </h3>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col justify-center gap-7">
              <div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {data.stats.slice(0, 3).map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.25rem] border border-green-100 bg-white/78 p-4 text-center shadow-[0_18px_55px_-42px_rgba(22,101,52,0.65)]"
                    >
                      <p
                        className="text-3xl font-semibold text-green-700"
                        style={displayFont}
                      >
                        {item.value}
                      </p>
                      <p className="mt-1 text-[0.68rem] font-bold uppercase leading-5 text-gray-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
                  {data.overviewParagraphs.map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {data.strengths.map((item) => {
                  const Icon = iconRegistry[item.iconKey] || FaBuilding;
                  return (
                    <div
                      key={item.title}
                      className="group rounded-[1.25rem] p-1 transition duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-xl text-green-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition group-hover:bg-green-600 group-hover:text-white">
                          <Icon />
                        </div>
                        <div>
                          <h3
                            className="text-2xl font-semibold leading-tight text-gray-950"
                            style={displayFont}
                          >
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-gray-600">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {embedUrl && (
        <section className="relative isolate overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#eef9ef_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeader
              eyebrow={data.videoEyebrow}
              title={data.videoTitle}
              text={data.videoText}
            />
            <GlassCard className="overflow-hidden rounded-[2rem] p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-950">
                <iframe
                  className="aspect-video w-full"
                  src={embedUrl}
                  title="About North South Group"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur">
                  <FaPlay className="ml-1 text-sm" />
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      <section
        id="leadership"
        className="relative isolate overflow-hidden bg-[#f5fbf4] px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(34,197,94,0.12),transparent_24%),radial-gradient(circle_at_84%_8%,rgba(243,177,40,0.12),transparent_22%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={data.leadershipEyebrow}
              title={data.leadershipTitle}
              text={data.leadershipText}
            />
            <div className="flex gap-3">
              <button
                ref={prevRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-white text-green-700 shadow-[0_18px_55px_-35px_rgba(22,101,52,0.7)] transition hover:bg-green-600 hover:text-white"
                aria-label="Previous director"
              >
                <IoIosArrowBack size={22} />
              </button>
              <button
                ref={nextRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-white text-green-700 shadow-[0_18px_55px_-35px_rgba(22,101,52,0.7)] transition hover:bg-green-600 hover:text-white"
                aria-label="Next director"
              >
                <IoIosArrowForward size={22} />
              </button>
            </div>
          </div>

          <div className="mt-12">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={3}
              spaceBetween={24}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={setSwiperInstance}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1.4 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {data.leaders.map((leader) => (
                <SwiperSlide key={leader.id}>
                  <article className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/[0.78] p-3 shadow-[0_28px_85px_-54px_rgba(22,101,52,0.72)] ring-1 ring-green-100/80 backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => setSelectedLeader(leader)}
                      className="relative block w-full overflow-hidden rounded-[1.25rem] text-left"
                      aria-label={`View ${leader.name}`}
                    >
                      <img
                        src={leader.img}
                        alt={leader.name}
                        className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(3,7,18,0.82)_100%)]" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3
                          className="text-3xl font-semibold leading-tight text-white"
                          style={displayFont}
                        >
                          {leader.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold uppercase text-green-100">
                          {leader.role}
                        </p>
                      </div>
                    </button>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbf5_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            centered
            eyebrow={data.csrEyebrow}
            title={data.csrTitle}
            text={data.csrText}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.csrImages.slice(0, 8).map((item, index) => (
              <button
                type="button"
                key={item.id || item.title}
                onClick={() => setSelectedCsrImage(item)}
                className={`group relative overflow-hidden rounded-[1.5rem] shadow-[0_26px_80px_-54px_rgba(22,101,52,0.68)] ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(3,7,18,0.72)_100%)] opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-semibold uppercase text-green-100">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#f4fbf3] px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.14),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(243,177,40,0.12),transparent_22%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {data.missionCards.map((item) => (
            <GlassCard key={item.title} className="rounded-[1.75rem] p-8">
              <FaCheckCircle className="text-3xl text-green-600" />
              <h3
                className="mt-5 text-4xl font-semibold text-gray-950"
                style={displayFont}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-gray-600">
                {item.text}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {selectedLeader && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/82 p-4">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
            <button
              type="button"
              onClick={() => setSelectedLeader(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black"
              aria-label="Close director preview"
            >
              ×
            </button>
            <img
              src={selectedLeader.img}
              alt={selectedLeader.name}
              className="max-h-[82vh] w-full bg-black object-contain"
            />
            <div className="bg-white px-6 py-5">
              <h3 className="text-2xl font-semibold text-gray-950" style={displayFont}>
                {selectedLeader.name}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase text-green-700">
                {selectedLeader.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedCsrImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4">
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
            <button
              type="button"
              onClick={() => setSelectedCsrImage(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black"
              aria-label="Close CSR image preview"
            >
              ×
            </button>
            <img
              src={selectedCsrImage.img}
              alt={selectedCsrImage.title}
              className="max-h-[82vh] w-full bg-black object-contain"
            />
            <div className="bg-white px-6 py-5">
              <h3 className="text-2xl font-semibold text-gray-950" style={displayFont}>
                {selectedCsrImage.title}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase text-green-700">
                {data.csrEyebrow}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutUs;
