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

          <div className="self-end">
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#f3b128]/25 bg-[#f3b128]/25 backdrop-blur-md sm:grid-cols-4 lg:grid-cols-2">
              {data.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <div key={stat.label} className="bg-[#06211f]/72 p-5">
                    <Icon className="mb-4 text-[#0f7771]" />
                    <p className="about-display text-3xl font-semibold champagne-text">
                      {stat.value}
                    </p>
                    <p className="about-body mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cdece7]">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-3">
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

      <section id="overview" className="bg-[#f4fbf9] py-24 text-[#0a2a66] md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="about-body text-xs font-extrabold uppercase tracking-[0.28em] text-[#0f7771]">
              {data.overviewEyebrow}
            </p>
            <h2 className="about-display mt-4 text-4xl font-semibold uppercase leading-[1.08] sm:text-5xl">
              {data.overviewTitle}
            </h2>
          </div>
          <div className="space-y-7">
            <p className="about-body text-xl leading-9 text-[#0a2a66]">{data.overviewText}</p>
            <div className="grid gap-4">
              {data.overviewParagraphs.map((paragraph, index) => (
                <div key={index} className="grid grid-cols-[52px_1fr] border-t border-[#b7dad4] pt-5">
                  <span className="about-display text-2xl text-[#0f7771]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="about-body leading-8 text-[#315b67]">{paragraph}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              {signatureVentures.map((venture) => (
                <span
                  key={venture}
                  className="about-body border border-[#7bc1b8] bg-white/45 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0a2a66]"
                >
                  {venture}
                </span>
              ))}
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
                  className="group flex h-full w-full flex-col justify-between border border-[#b7dad4] bg-[#ffffff] text-left transition hover:-translate-y-1 hover:border-[#0f7771] hover:shadow-[0_24px_60px_rgba(15,119,113,0.18)]"
                >
                  <div className="relative flex h-[360px] shrink-0 items-center justify-center overflow-hidden bg-[#e8f5f2]">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-0 right-0 top-0 flex justify-between p-4">
                      <span className="about-body bg-[#06211f]/75 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#f3b128] backdrop-blur">
                        Board
                      </span>
                      <span className="about-body bg-[#f4fbf9] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0a2a66]">
                        Profile
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="about-body min-h-[1.25rem] text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0f7771]">
                        {leader.role}
                      </p>
                      <h3 className="about-display mt-2 min-h-[3.75rem] text-2xl font-semibold leading-tight text-[#0a2a66] flex items-start">
                        {leader.name}
                      </h3>
                    </div>
                    <p className="about-body mt-3 line-clamp-2 min-h-[3.5rem] text-sm leading-7 text-[#315b67]">
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
                <p className="about-body mt-6 leading-8 text-[#315b67]">
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

