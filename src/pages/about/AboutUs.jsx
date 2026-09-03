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
  const embedUrl = getYouTubeEmbedUrl(data.videoUrl);

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
    <div className="min-h-screen bg-[#080706] text-[#f8f1e6] selection:bg-[#d7b46a] selection:text-[#15100a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .about-display { font-family: 'Cinzel', Georgia, serif; }
        .about-body { font-family: 'Manrope', sans-serif; }
        .champagne-text {
          background: linear-gradient(120deg, #fff8ea 0%, #d7b46a 45%, #8fae52 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#080706] pt-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b46a]/70 to-transparent" />
        <div className="mx-auto grid min-h-[86vh] max-w-[1500px] grid-cols-1 items-stretch gap-0 px-4 pb-8 sm:px-6 lg:grid-cols-[0.95fr_1.25fr] lg:px-8">
          <div className="relative z-10 flex flex-col justify-center py-16 lg:pr-12">
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-3 border-y border-[#d7b46a]/30 py-2">
                <span className="h-px w-10 bg-[#8fae52]" />
                <span className="about-body text-[11px] font-bold uppercase tracking-[0.32em] text-[#d7b46a]">
                  {data.heroEyebrow}
                </span>
              </div>
              <h1 className="about-display max-w-4xl text-4xl font-semibold uppercase leading-[1.04] text-[#fff8ea] sm:text-6xl lg:text-7xl">
                {data.heroTitle}
              </h1>
              <p className="about-body mt-6 max-w-2xl text-base leading-8 text-[#cfc5b3] sm:text-lg">
                {data.heroSubtitle}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#overview"
                  className="about-body inline-flex items-center gap-3 bg-[#d7b46a] px-7 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#15100a] shadow-[0_18px_60px_rgba(215,180,106,0.22)] transition hover:bg-[#fff1c9]"
                >
                  Explore Legacy <FaArrowRight className="text-[11px]" />
                </a>
                <a
                  href="#leadership"
                  className="about-body inline-flex items-center gap-3 border border-[#8fae52]/50 bg-[#1a2119]/70 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#fff8ea] transition hover:border-[#d7b46a] hover:text-[#d7b46a]"
                >
                  Leadership
                </a>
              </div>
            </MotionDiv>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-[#2d281e] bg-[#2d281e] sm:grid-cols-4">
              {data.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <div key={stat.label} className="bg-[#10110d] p-5">
                    <Icon className="mb-4 text-[#8fae52]" />
                    <p className="about-display text-3xl font-semibold champagne-text">
                      {stat.value}
                    </p>
                    <p className="about-body mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a99d8a]">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden border border-[#2d281e] bg-[#14120e] lg:min-h-[760px]">
            <AnimatePresence mode="wait">
              <MotionImg
                key={currentSlide}
                src={data.heroSlides[currentSlide] || hero1}
                alt="North South Group development"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/45" />
            <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[#080706] to-transparent lg:block" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <div className="max-w-md border-l border-[#d7b46a] bg-[#080706]/72 p-5 backdrop-blur-md">
                <p className="about-body text-[11px] font-bold uppercase tracking-[0.25em] text-[#8fae52]">
                  {data.overviewBadge}
                </p>
                <p className="about-display mt-2 text-2xl leading-snug text-[#fff8ea]">
                  {data.overviewHighlightTitle}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                {data.heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Show slide ${idx + 1}`}
                    className={`h-1.5 transition-all ${
                      currentSlide === idx ? "w-14 bg-[#d7b46a]" : "w-7 bg-white/35 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="bg-[#f8f1e6] py-24 text-[#15100a] md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#8a6a2d]">
              {data.overviewEyebrow}
            </p>
            <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-[1.08] sm:text-5xl">
              {data.overviewTitle}
            </h2>
          </div>
          <div className="space-y-7">
            <p className="about-body text-xl leading-9 text-[#403726]">{data.overviewText}</p>
            <div className="grid gap-4">
              {data.overviewParagraphs.map((paragraph, index) => (
                <div key={index} className="grid grid-cols-[52px_1fr] border-t border-[#d8c7a4] pt-5">
                  <span className="about-display text-2xl text-[#8a6a2d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="about-body leading-8 text-[#5b503b]">{paragraph}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              {signatureVentures.map((venture) => (
                <span
                  key={venture}
                  className="about-body border border-[#c3a665] bg-white/45 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#2f291d]"
                >
                  {venture}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#10110d] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-[#2d281e] pb-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#d7b46a]">
                Institutional Capabilities
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight text-[#fff8ea] sm:text-5xl">
                Core Pillars of Excellence
              </h2>
            </div>
            <p className="about-body max-w-md text-sm leading-7 text-[#b7ac99]">
              Disciplined planning, client trust, and long-term community value guide every concern of the group.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#2d281e] bg-[#2d281e] sm:grid-cols-2 lg:grid-cols-4">
            {data.strengths.map((item, idx) => {
              const IconComp =
                strengthIcons[item.iconKey] || defaultStrengthIconList[idx % defaultStrengthIconList.length];
              return (
                <div key={item.title} className="group bg-[#080706] p-8 transition hover:bg-[#141812]">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="about-display text-sm text-[#6f6145]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center border border-[#d7b46a]/35 text-xl text-[#d7b46a] transition group-hover:bg-[#d7b46a] group-hover:text-[#15100a]">
                      <IconComp />
                    </span>
                  </div>
                  <h3 className="about-display text-2xl text-[#fff8ea]">{item.title}</h3>
                  <p className="about-body mt-4 text-sm leading-7 text-[#b7ac99]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-[#f8f1e6] py-24 text-[#15100a] md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#8a6a2d]">
                {data.leadershipEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                {data.leadershipTitle}
              </h2>
              <p className="about-body mt-4 max-w-2xl leading-8 text-[#5b503b]">{data.leadershipText}</p>
            </div>
            <div className="flex gap-3">
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous leader"
                className="flex h-12 w-12 items-center justify-center border border-[#b99a55] bg-transparent text-[#15100a] transition hover:bg-[#15100a] hover:text-[#f8f1e6]"
              >
                <IoIosArrowBack size={20} />
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next leader"
                className="flex h-12 w-12 items-center justify-center border border-[#b99a55] bg-transparent text-[#15100a] transition hover:bg-[#15100a] hover:text-[#f8f1e6]"
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
            className="!pb-2"
          >
            {data.leaders.map((leader) => (
              <SwiperSlide key={leader.id || leader.name}>
                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="group block w-full border border-[#d8c7a4] bg-[#fffaf0] text-left transition hover:-translate-y-1 hover:border-[#8a6a2d] hover:shadow-[0_24px_60px_rgba(45,36,18,0.14)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#17130d]">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-0 right-0 top-0 flex justify-between p-4">
                      <span className="about-body bg-[#080706]/75 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#d7b46a] backdrop-blur">
                        Board
                      </span>
                      <span className="about-body bg-[#f8f1e6] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#15100a]">
                        Profile
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="about-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8a6a2d]">
                      {leader.role}
                    </p>
                    <h3 className="about-display mt-2 text-2xl font-semibold leading-tight text-[#15100a]">
                      {leader.name}
                    </h3>
                    <p className="about-body mt-4 line-clamp-2 text-sm leading-7 text-[#655943]">
                      {leader.description ||
                        leader.text ||
                        "Distinguished executive guiding North South Group's strategic urban planning and corporate vision."}
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {embedUrl && (
        <section className="bg-[#15100a] py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:px-8">
            <div>
              <p className="about-body inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.28em] text-[#d7b46a]">
                <FaPlay className="text-[10px]" /> {data.videoEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight text-[#fff8ea] sm:text-5xl">
                {data.videoTitle}
              </h2>
              <p className="about-body mt-5 leading-8 text-[#cfc5b3]">{data.videoText}</p>
            </div>
            <div className="border border-[#3a3122] bg-[#080706] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
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

      <section className="bg-[#f8f1e6] py-24 text-[#15100a] md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#8a6a2d]">
                {data.csrEyebrow}
              </p>
              <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                {data.csrTitle}
              </h2>
            </div>
            <p className="about-body max-w-2xl text-lg leading-9 text-[#5b503b] lg:justify-self-end">
              {data.csrText}
            </p>
          </div>

          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.csrImages.slice(0, 8).map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setSelectedCsrImage(item)}
                className={`group relative overflow-hidden bg-[#15100a] text-left ${
                  idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                } ${idx === 5 ? "lg:col-span-2" : ""}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/90 via-[#080706]/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="about-body text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#d7b46a]">
                    Community
                  </p>
                  <h3 className="about-display mt-1 text-xl leading-tight text-[#fff8ea]">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080706] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden border border-[#2d281e] bg-[#2d281e] md:grid-cols-3">
            {data.missionCards.map((card, index) => (
              <div key={card.title} className="bg-[#10110d] p-8 md:p-10">
                <div className="mb-10 flex items-start justify-between">
                  <FaCheckCircle className="text-2xl text-[#8fae52]" />
                  <span className="about-display text-sm text-[#6f6145]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="about-display text-3xl font-semibold text-[#fff8ea]">{card.title}</h3>
                <p className="about-body mt-5 text-sm leading-8 text-[#b7ac99]">{card.text}</p>
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
              className="relative grid w-full max-w-4xl overflow-hidden bg-[#f8f1e6] text-[#15100a] shadow-2xl sm:grid-cols-[0.85fr_1.15fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                aria-label="Close leader profile"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-[#15100a] text-[#f8f1e6] transition hover:bg-[#d7b46a] hover:text-[#15100a]"
              >
                <FaTimes />
              </button>
              <div className="min-h-[320px] bg-[#15100a]">
                <img
                  src={selectedLeader.img}
                  alt={selectedLeader.name}
                  className="h-full max-h-[560px] w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <FaQuoteLeft className="mb-7 text-3xl text-[#b99a55]" />
                <p className="about-body text-xs font-extrabold uppercase tracking-[0.2em] text-[#8a6a2d]">
                  {selectedLeader.role}
                </p>
                <h3 className="about-display mt-3 text-4xl font-semibold leading-tight">
                  {selectedLeader.name}
                </h3>
                <p className="about-body mt-6 leading-8 text-[#5b503b]">
                  {selectedLeader.description ||
                    selectedLeader.text ||
                    "Distinguished executive guiding North South Group's long-term institutional vision and community developments."}
                </p>
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
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden bg-[#080706] p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedCsrImage(null)}
                aria-label="Close image"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center bg-[#f8f1e6] text-[#15100a] transition hover:bg-[#d7b46a]"
              >
                <FaTimes />
              </button>
              <img
                src={selectedCsrImage.img}
                alt={selectedCsrImage.title}
                className="max-h-[78vh] w-full object-contain"
              />
              <div className="px-4 py-5 text-center">
                <h4 className="about-display text-2xl text-[#fff8ea]">{selectedCsrImage.title}</h4>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
