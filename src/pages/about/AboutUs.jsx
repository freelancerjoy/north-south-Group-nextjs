import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FaArrowRight,
  FaAward,
  FaBuilding,
  FaCheckCircle,
  FaCity,
  FaCompass,
  FaHandshake,
  FaLeaf,
  FaPlay,
  FaQuoteLeft,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineBuildingOffice2,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";
import { defaultAboutContent } from "./defaultAboutContent";
import { useAboutStore } from "../../store/about/aboutStore";

import "swiper/css";
import "swiper/css/navigation";

const MotionDiv = motion.div;
const MotionImg = motion.img;

const strengthIcons = {
  FaBuilding,
  FaLeaf,
  FaShieldAlt,
  FaHandshake,
};

const defaultStrengthIconList = [FaBuilding, FaLeaf, FaShieldAlt, FaHandshake];
const statIcons = [FaAward, FaCity, FaBuilding, FaCompass];

const signatureVentures = [
  "Green City Ltd.",
  "Industrial City",
  "Nirapad Valley",
  "Duplex Home",
  "Auto Rice Mill",
  "Agro Farm",
];

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedCsrImage, setSelectedCsrImage] = useState(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { aboutContent, loadAboutContent } = useAboutStore();

  useEffect(() => {
    loadAboutContent().catch(() => {});
  }, [loadAboutContent]);

  const data = useMemo(
    () => ({
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
        Array.isArray(aboutContent?.overviewParagraphs) &&
        aboutContent.overviewParagraphs.length > 0
          ? aboutContent.overviewParagraphs
          : defaultAboutContent.overviewParagraphs,
    }),
    [aboutContent]
  );

  const [hero1 = defaultAboutContent.heroSlides[0]] = data.heroSlides || [];
  const overviewImage = data.heroSlides?.[1] || hero1;
  const overviewGallery = [
    overviewImage,
    data.csrImages?.[0]?.img,
    data.csrImages?.[2]?.img,
  ].filter(Boolean);
  const embedUrl = getYouTubeEmbedUrl(data.videoUrl);
  const sortedLeaders = useMemo(() => {
    return [...data.leaders].sort((a, b) => {
      const aIsChairman = /chairman/i.test(`${a.role || ""} ${a.id || ""}`);
      const bIsChairman = /chairman/i.test(`${b.role || ""} ${b.id || ""}`);
      if (aIsChairman === bIsChairman) return 0;
      return aIsChairman ? -1 : 1;
    });
  }, [data.leaders]);

  useEffect(() => {
    if (!data.heroSlides || data.heroSlides.length <= 1) return undefined;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [data.heroSlides]);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperReady]);

  return (
    <div className="min-h-screen bg-[#06211f] text-[#f4fbf9] selection:bg-[#f3b128] selection:text-[#0a2a66]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .about-display { font-family: 'Cinzel', Georgia, serif; }
        .about-body { font-family: 'Manrope', sans-serif; }
        .champagne-text {
          background: linear-gradient(120deg, #ffffff 0%, #f3b128 45%, #0f7771 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#06211f] pt-24">
        <AnimatePresence mode="wait">
          <MotionImg
            key={currentSlide}
            src={data.heroSlides[currentSlide] || hero1}
            alt="North South Group development"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06211f]/92 via-[#06211f]/52 to-[#06211f]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06211f] via-transparent to-[#06211f]/55" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f3b128]/70 to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-10 sm:px-6 md:pb-16 lg:grid-cols-[1.1fr_0.7fr] lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 border-y border-[#f3b128]/35 bg-[#06211f]/30 py-2 pr-4 backdrop-blur-sm">
              <span className="h-px w-10 bg-[#0f7771]" />
              <span className="about-body text-[11px] font-bold uppercase tracking-[0.32em] text-[#f3b128]">
                {data.heroEyebrow}
              </span>
            </div>
            <h1 className="about-display max-w-5xl text-4xl font-semibold uppercase leading-[1.04] text-[#ffffff] sm:text-6xl lg:text-7xl">
              {data.heroTitle}
            </h1>
            <p className="about-body mt-6 max-w-2xl text-base leading-8 text-[#d8f3ee] sm:text-lg">
              {data.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#overview"
                className="about-body inline-flex items-center gap-3 bg-[#f3b128] px-7 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0a2a66] shadow-[0_18px_60px_rgba(15,119,113,0.28)] transition hover:bg-[#ffe4a3]"
              >
                Explore Legacy <FaArrowRight className="text-[11px]" />
              </a>
              <a
                href="#leadership"
                className="about-body inline-flex items-center gap-3 border border-[#f3b128]/50 bg-[#06211f]/35 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ffffff] backdrop-blur-sm transition hover:border-[#f3b128] hover:text-[#f3b128]"
              >
                Leadership
              </a>
            </div>
          </MotionDiv>

          <div className="self-end justify-self-start lg:justify-self-end">
            <div className="border-l-2 border-[#f3b128] bg-[#06211f]/55 p-5 backdrop-blur-md">
              <p className="about-body text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#f3b128]">
                {data.overviewBadge}
              </p>
              <p className="about-display mt-2 max-w-sm text-2xl font-semibold uppercase leading-tight text-white">
                {data.overviewHighlightTitle}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {data.heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Show slide ${idx + 1}`}
                  className={`h-1.5 transition-all ${
                    currentSlide === idx ? "w-14 bg-[#f3b128]" : "w-7 bg-white/40 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#06211f] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-8 grid overflow-hidden border border-[#0f7771]/35 bg-[#082b28] shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:grid-cols-2 lg:grid-cols-4">
            {data.stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <div
                  key={stat.label}
                  className="group relative min-h-[150px] border-b border-[#0f7771]/20 p-6 transition hover:bg-[#0b3a36] sm:border-r lg:border-b-0"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#f3b128] opacity-0 transition group-hover:opacity-100" />
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="text-2xl text-[#0f7771]" />
                    <span className="about-body text-[11px] font-bold uppercase tracking-[0.18em] text-[#7bc1b8]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="about-display text-4xl font-semibold leading-none champagne-text">
                    {stat.value}
                  </p>
                  <p className="about-body mt-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#cdece7]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="overview" className="bg-white py-20 lg:py-28 text-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* ── ROW 1: Solution 1 (Text Left, Image Right) ── */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5">
              <div>
                <span className="inline-block rounded bg-[#0f7771]/10 px-3 py-1 font-brand-body text-[11px] font-bold uppercase tracking-wider text-[#0f7771]">
                  {data.overviewEyebrow}
                </span>
              </div>
              <h2 className="font-brand-body text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
                {data.overviewTitle}
              </h2>
              <p className="font-brand-body text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                {data.overviewText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-4 border-t border-slate-100">
                <div>
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0f7771]/10 text-[#0f7771]">
                    <HiOutlineClock size={19} />
                  </div>
                  <h4 className="font-brand-body text-sm font-bold text-slate-900">
                    {data.strengths?.[0]?.title || "Planned Development"}
                  </h4>
                  <p className="font-brand-body mt-1 text-xs leading-relaxed text-slate-500 font-light">
                    {data.strengths?.[0]?.text || "Residential and industrial communities shaped around long-term value, access, and daily convenience."}
                  </p>
                </div>
                <div>
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0f7771]/10 text-[#0f7771]">
                    <HiOutlineChartBar size={19} />
                  </div>
                  <h4 className="font-brand-body text-sm font-bold text-slate-900">
                    {data.strengths?.[1]?.title || "Sustainable Living"}
                  </h4>
                  <p className="font-brand-body mt-1 text-xs leading-relaxed text-slate-500 font-light">
                    {data.strengths?.[1]?.text || "Green spaces, civic facilities, and organized layouts guide our approach to healthier township growth."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Rounded Image with 2 Floating Stat Cards */}
            <div className="relative">
              <div className="relative h-[360px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-2xl">
                <img
                  src={overviewGallery[0] || hero2}
                  alt={data.overviewTitle}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-slate-900/10" />

                {/* Floating Card 1 (Top right) */}
                <div className="absolute right-6 top-6 sm:right-8 sm:top-8 flex min-w-[160px] items-start justify-between gap-4 rounded-2xl border border-slate-100/90 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
                  <div>
                    <p className="font-brand-body text-2xl sm:text-3xl font-black leading-none text-slate-900">
                      {data.stats?.[1]?.value || "7+"}
                    </p>
                    <p className="font-brand-body mt-1 text-xs font-medium text-slate-500">
                      {data.stats?.[1]?.label || "Sister Concerns"}
                    </p>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0f7771]" />
                </div>

                {/* Floating Card 2 (Bottom right) */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex min-w-[175px] items-start justify-between gap-4 rounded-2xl border border-slate-100/90 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
                  <div>
                    <p className="font-brand-body text-2xl sm:text-3xl font-black leading-none text-slate-900">
                      {data.stats?.[3]?.value || "600+"}
                    </p>
                    <p className="font-brand-body mt-1 text-xs font-medium text-slate-500">
                      {data.stats?.[3]?.label || "Acres Planned"}
                    </p>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* ── SUBTLE DOTTED DIVIDER ── */}
          <div className="my-16 lg:my-24 border-t border-dashed border-slate-200" />

          {/* ── ROW 2: Solution 2 (Image Left, Text Right — Zigzag) ── */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Rounded Image with Testimonial/Quote Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative h-[360px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-2xl">
                <img
                  src={overviewGallery[1] || overviewGallery[0] || hero1}
                  alt={data.overviewHighlightTitle}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-slate-900/10" />

                {/* Floating Quote Card at bottom */}
                <div className="absolute bottom-5 left-5 right-5 sm:max-w-md rounded-2xl border border-slate-100/90 bg-white/95 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
                  <p className="font-brand-body text-xs sm:text-sm font-medium leading-relaxed text-slate-700 italic">
                    "{data.overviewHighlightTitle || data.heroSubtitle}"
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0f7771] text-xs font-bold text-white shadow-sm">
                        NS
                      </div>
                      <div>
                        <p className="font-brand-body text-xs font-bold uppercase tracking-wider text-slate-900">
                          {data.overviewHighlightEyebrow || "North South Group"}
                        </p>
                        <p className="font-brand-body text-[10px] text-slate-400">
                          Corporate Development
                        </p>
                      </div>
                    </div>
                    <span className="font-brand-body text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-[#0f7771]/10 text-[#0f7771]">
                      {data.overviewBadge || "Since 2019"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content, Solution Tag, Title, Paragraph, Stacked List */}
            <div className="space-y-5 order-1 lg:order-2">
              <div>
                <span className="inline-block rounded bg-[#0f7771]/10 px-3 py-1 font-brand-body text-[11px] font-bold uppercase tracking-wider text-[#0f7771]">
                  {data.overviewHighlightEyebrow || "North South Group"}
                </span>
              </div>
              <h2 className="font-brand-body text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
                {data.overviewHighlightTitle || "Planned Projects Shaped Around Trust & Long-term Value"}
              </h2>
              <p className="font-brand-body text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                {data.overviewParagraphs?.[0]}
              </p>

              {data.overviewParagraphs?.[1] && (
                <p className="font-brand-body text-sm sm:text-base leading-relaxed text-slate-600 font-light">
                  {data.overviewParagraphs[1]}
                </p>
              )}

              <div className="space-y-5 pt-3">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f7771]/10 text-[#0f7771]">
                    <HiOutlineBuildingOffice2 size={19} />
                  </div>
                  <div>
                    <h4 className="font-brand-body text-sm sm:text-base font-bold text-slate-900">
                      {data.strengths?.[2]?.title || "Reliable Governance"}
                    </h4>
                    <p className="font-brand-body mt-1 text-xs sm:text-sm leading-relaxed text-slate-500 font-light">
                      {data.strengths?.[2]?.text || "Disciplined project planning and professional leadership keep delivery aligned with client confidence."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f7771]/10 text-[#0f7771]">
                    <HiOutlineShieldCheck size={19} />
                  </div>
                  <div>
                    <h4 className="font-brand-body text-sm sm:text-base font-bold text-slate-900">
                      {data.strengths?.[3]?.title || "Client Commitment"}
                    </h4>
                    <p className="font-brand-body mt-1 text-xs sm:text-sm leading-relaxed text-slate-500 font-light">
                      {data.strengths?.[3]?.text || "We focus on trust, transparent communication, and real estate solutions that fit buyer needs."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature Group Ventures Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {signatureVentures.map((venture) => (
                  <span
                    key={venture}
                    className="font-brand-body border border-[#0f7771]/30 bg-[#0f7771]/5 px-3 py-1 text-xs font-semibold text-[#0f7771] rounded-full"
                  >
                    {venture}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-[#082b28] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-[#0d3b38] pb-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#f3b128]">
                Institutional Capabilities
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight text-[#ffffff] sm:text-5xl">
                Core Pillars of Excellence
              </h2>
            </div>
            <p className="about-body max-w-md text-sm leading-7 text-[#cdece7]">
              Disciplined planning, client trust, and long-term community value guide every concern of the group.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#0d3b38] bg-[#0d3b38] sm:grid-cols-2 lg:grid-cols-4">
            {data.strengths.map((item, idx) => {
              const IconComp =
                strengthIcons[item.iconKey] || defaultStrengthIconList[idx % defaultStrengthIconList.length];
              return (
                <div key={item.title} className="group bg-[#06211f] p-8 transition hover:bg-[#0b3a36]">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="about-display text-sm text-[#7bc1b8]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center border border-[#f3b128]/35 text-xl text-[#f3b128] transition group-hover:bg-[#f3b128] group-hover:text-[#0a2a66]">
                      <IconComp />
                    </span>
                  </div>
                  <h3 className="about-display text-2xl text-[#ffffff]">{item.title}</h3>
                  <p className="about-body mt-4 text-sm leading-7 text-[#cdece7]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-[#f4fbf9] py-24 text-[#0a2a66] md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#0f7771]">
                {data.leadershipEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                {data.leadershipTitle}
              </h2>
              <p className="about-body mt-4 max-w-2xl leading-8 text-[#315b67]">{data.leadershipText}</p>
            </div>
            <div className="flex gap-3">
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous leader"
                className="flex h-12 w-12 items-center justify-center border border-[#0f7771] bg-transparent text-[#0a2a66] transition hover:bg-[#0a2a66] hover:text-[#f4fbf9]"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next leader"
                className="flex h-12 w-12 items-center justify-center border border-[#0f7771] bg-transparent text-[#0a2a66] transition hover:bg-[#0a2a66] hover:text-[#f4fbf9]"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={18}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setSwiperReady(true);
            }}
            breakpoints={{
              700: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            className="!pb-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide]:flex"
          >
            {sortedLeaders.map((leader) => (
              <SwiperSlide key={leader.id || leader.name} className="!h-auto flex">
                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="group flex h-full w-full flex-col justify-between border border-[#b7dad4] bg-[#ffffff] text-left transition hover:-translate-y-1 hover:border-[#0f7771] hover:shadow-[0_20px_50px_rgba(15,119,113,0.16)]"
                >
                  <div className="relative flex h-[280px] sm:h-[300px] shrink-0 items-center justify-center overflow-hidden bg-[#e8f5f2]">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <p className="about-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0f7771]">
                      {leader.role}
                    </p>
                    <h3 className="about-display mt-1.5 min-h-[3.2rem] text-xl sm:text-2xl font-semibold leading-tight text-[#0a2a66] flex items-start">
                      {leader.name}
                    </h3>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {embedUrl && (
        <section className="bg-[#0a2a66] py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:px-8">
            <div>
              <p className="about-body inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.28em] text-[#f3b128]">
                <FaPlay className="text-[10px]" /> {data.videoEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight text-[#ffffff] sm:text-5xl">
                {data.videoTitle}
              </h2>
              <p className="about-body mt-5 leading-8 text-[#cdece7]">{data.videoText}</p>
            </div>
            <div className="border border-[#12504a] bg-[#06211f] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="aspect-video overflow-hidden bg-black">
                <iframe
                  className="h-full w-full"
                  src={embedUrl}
                  title="Inside North South Group"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#f4fbf9] py-24 text-[#0a2a66] md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#0f7771]">
                {data.csrEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                {data.csrTitle}
              </h2>
            </div>
            <p className="about-body max-w-2xl text-lg leading-9 text-[#315b67] lg:justify-self-end">
              {data.csrText}
            </p>
          </div>

          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.csrImages.slice(0, 8).map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setSelectedCsrImage(item)}
                className={`group relative overflow-hidden bg-[#0a2a66] text-left ${
                  idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                } ${idx === 5 ? "lg:col-span-2" : ""}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06211f]/90 via-[#06211f]/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="about-body text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#f3b128]">
                    Community
                  </p>
                  <h3 className="about-display mt-1 text-xl leading-tight text-[#ffffff]">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06211f] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden border border-[#0d3b38] bg-[#0d3b38] md:grid-cols-3">
            {data.missionCards.map((card, index) => (
              <div key={card.title} className="bg-[#082b28] p-8 md:p-10">
                <div className="mb-10 flex items-start justify-between">
                  <FaCheckCircle className="text-2xl text-[#0f7771]" />
                  <span className="about-display text-sm text-[#7bc1b8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="about-display text-3xl font-semibold text-[#ffffff]">{card.title}</h3>
                <p className="about-body mt-5 text-sm leading-8 text-[#cdece7]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedLeader && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedLeader(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="relative grid w-full max-w-4xl overflow-hidden bg-[#f4fbf9] text-[#0a2a66] shadow-2xl sm:grid-cols-[0.85fr_1.15fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                aria-label="Close leader profile"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-[#0a2a66] text-[#f4fbf9] transition hover:bg-[#f3b128] hover:text-[#0a2a66]"
              >
                <FaTimes />
              </button>
              <div className="min-h-[320px] bg-[#0a2a66]">
                <img
                  src={selectedLeader.img}
                  alt={selectedLeader.name}
                  className="h-full max-h-[560px] w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <FaQuoteLeft className="mb-7 text-3xl text-[#0f7771]" />
                <p className="about-body text-xs font-extrabold uppercase tracking-[0.2em] text-[#0f7771]">
                  {selectedLeader.role}
                </p>
                <h3 className="about-display mt-3 text-4xl font-semibold leading-tight">
                  {selectedLeader.name}
                </h3>
                {(selectedLeader.description || selectedLeader.text) && (
                  <p className="about-body mt-6 leading-8 text-[#315b67]">
                    {selectedLeader.description || selectedLeader.text}
                  </p>
                )}
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCsrImage && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedCsrImage(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden bg-[#06211f] p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedCsrImage(null)}
                aria-label="Close image"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center bg-[#f4fbf9] text-[#0a2a66] transition hover:bg-[#f3b128]"
              >
                <FaTimes />
              </button>
              <img
                src={selectedCsrImage.img}
                alt={selectedCsrImage.title}
                className="max-h-[78vh] w-full object-contain"
              />
              <div className="px-4 py-5 text-center">
                <h4 className="about-display text-2xl text-[#ffffff]">{selectedCsrImage.title}</h4>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

