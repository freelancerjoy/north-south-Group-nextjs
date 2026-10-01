import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  FaRegNewspaper,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import {
  HiOutlineBuildingOffice2,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";
import { defaultAboutContent } from "./defaultAboutContent";
import { useAboutStore } from "../../store/about/aboutStore";
import mojamelHokImg from "../../assets/images/MojamelHok.jpg";
import avatarPlaceholderImg from "../../assets/images/avatarPlaceholder.png";

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

/*
 * DAILY ADIN MEDIA ARCHIVE
 * Real newsroom, front-desk, print-edition and circulation images.
 */
const DAILY_ADIN_MEDIA = [
  {
    id: "daily-adin-news-desk",
    title: "Daily Adin News Desk",
    subtitle: "Editorial newsroom, reporting desk & digital news operations",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327080/WhatsApp_Image_2026-09-24_at_5.50.27_PM_1.jpg",
    isPlaceholder: false,
    type: "office",
  },
  {
    id: "daily-adin-front-desk",
    title: "Daily Adin Front Desk",
    subtitle: "Reception, coordination & publication operations",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327081/WhatsApp_Image_2026-09-24_at_5.50.27_PM.jpg",
    isPlaceholder: false,
    type: "office",
  },
  {
    id: "daily-adin-print-edition",
    title: "Daily Adin Print Edition",
    subtitle: "The Daily Adin alongside Bangladesh's daily newspaper circulation",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327085/WhatsApp_Image_2026-09-24_at_5.55.00_PM.jpg",
    isPlaceholder: false,
    type: "paper",
  },
  {
    id: "daily-adin-newsstand",
    title: "Daily Adin At The Newsstand",
    subtitle: "Print presence at a local newspaper and magazine point",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327081/WhatsApp_Image_2026-09-24_at_5.55.01_PM_1.jpg",
    isPlaceholder: false,
    type: "distribution",
  },
  {
    id: "daily-adin-reader-reach",
    title: "Daily Adin In The Community",
    subtitle: "Connecting print journalism with readers across the city",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327083/WhatsApp_Image_2026-09-24_at_5.55.01_PM.jpg",
    isPlaceholder: false,
    type: "distribution",
  },
  {
    id: "daily-adin-paper-stack",
    title: "Print & Distribution",
    subtitle: "Daily newspapers prepared for retail circulation and readership",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327084/WhatsApp_Image_2026-09-24_at_5.55.02_PM_1.jpg",
    isPlaceholder: false,
    type: "distribution",
  },
  {
    id: "daily-adin-retail-display",
    title: "Daily Print Presence",
    subtitle: "Daily Adin displayed among newspapers at a retail point",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327085/WhatsApp_Image_2026-09-24_at_5.55.02_PM.jpg",
    isPlaceholder: false,
    type: "distribution",
  },
  {
    id: "daily-adin-print-spread",
    title: "Publication & Circulation",
    subtitle: "Print editions presented within Bangladesh's newspaper ecosystem",
    img: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327082/WhatsApp_Image_2026-09-24_at_5.55.01_PM_2.jpg",
    isPlaceholder: false,
    type: "paper",
  },
];

/*
 * TEMPORARY OFFICE IMAGES
 * Replace with your actual Site Office / Corporate Office / meeting-space photos later.
 */
const TEMPORARY_OFFICE_IMAGES = [
  {
    id: "site-office",
    title: "Site Office",
    subtitle: "Project operations, site coordination & client service",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88",
    isPlaceholder: true,
  },
  {
    id: "corporate-office",
    title: "Corporate Office",
    subtitle: "Management, planning & business operations",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=88",
    isPlaceholder: true,
  },
  {
    id: "meeting-space",
    title: "Meeting & Planning",
    subtitle: "Presentation, collaboration & project review",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=88",
    isPlaceholder: true,
  },
  {
    id: "client-lounge",
    title: "Client Experience",
    subtitle: "A welcoming environment for visitors & partners",
    img: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1800&q=88",
    isPlaceholder: true,
  },
];

const PLACEHOLDER_LEADER_IMAGES = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=88",
];

function SectionEyebrow({ children, light = false }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`h-px w-9 sm:w-11 ${light ? "bg-emerald-300" : "bg-emerald-600"}`} />
      <span
        className={`text-[9px] font-extrabold uppercase tracking-[0.26em] sm:text-[10px] ${
          light ? "text-emerald-200" : "text-emerald-700"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function PrimaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-emerald-800 px-6 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_14px_34px_rgba(6,78,59,0.20)] transition hover:bg-emerald-950 sm:h-12 sm:px-7 sm:text-[11px]"
    >
      {children}
      <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function PremiumHeading({ children, className = "" }) {
  return (
    <h2
      className={`font-about-display text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

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
      officeImages:
        Array.isArray(aboutContent?.officeImages) && aboutContent.officeImages.length > 0
          ? aboutContent.officeImages
          : TEMPORARY_OFFICE_IMAGES,
      mediaImages:
        Array.isArray(aboutContent?.mediaImages) && aboutContent.mediaImages.length > 0
          ? aboutContent.mediaImages
          : DAILY_ADIN_MEDIA,
    }),
    [aboutContent]
  );

  const heroSlides =
    Array.isArray(data.heroSlides) && data.heroSlides.length > 0
      ? data.heroSlides
      : TEMPORARY_OFFICE_IMAGES.map((item) => item.img);

  const heroImage = heroSlides[currentSlide] || heroSlides[0];
  const overviewImage = heroSlides[1] || heroSlides[0] || TEMPORARY_OFFICE_IMAGES[0].img;
  const secondOverviewImage =
    heroSlides[2] || data.csrImages?.[0]?.img || TEMPORARY_OFFICE_IMAGES[1].img;

  const embedUrl = getYouTubeEmbedUrl(data.videoUrl);

  const sortedLeaders = useMemo(() => {
    const source = Array.isArray(data.leaders) ? [...data.leaders] : [];

    const rolePriority = (leader = {}) => {
      const id = String(leader.id || "").toLowerCase();
      const role = String(leader.role || "").toLowerCase();
      const value = `${id} ${role}`;

      if (/managing-director/.test(id) || /^managing director$/i.test(leader.role || "")) return 0;
      if (/chairman/.test(value)) return 1;
      if (/deputy.*managing.*director/.test(value)) return 2;
      if (/\bceo\b|chief executive officer/.test(value)) return 3;
      if (/^director$/.test(role) || id === "director") return 4;
      if (/hr|admin/.test(value)) return 5;
      return 20;
    };

    return source.sort((a, b) => rolePriority(a) - rolePriority(b));
  }, [data.leaders]);

  const managementTeam = useMemo(() => {
    const actualLeaders = sortedLeaders.map((leader) => ({
      ...leader,
      isPlaceholder: false,
    }));

    // Always inject Khandoker Mojammel Hoque with real photo
    const mojamelHok = {
      id: "daily-adin-editor",
      name: "Khandoker Mojammel Hoque",
      role: "Executive Editor",
      img: mojamelHokImg,
      description:
        "Executive Editor of North South Daily Adin Pressmedia Ltd., leading editorial operations, journalism standards and media outreach across Bangladesh.",
      isPlaceholder: false,
    };
    const hasHok = actualLeaders.some((l) => l.id === "daily-adin-editor");
    const withHok = hasHok ? actualLeaders : [...actualLeaders, mojamelHok];

    // Add a single "No Name" avatar placeholder at the end
    const noNamePlaceholder = {
      id: "no-name-placeholder",
      name: "No Name",
      role: "Management Team",
      img: avatarPlaceholderImg,
      description: "Profile details will be updated when available.",
      isPlaceholder: true,
    };

    return [...withHok, noNamePlaceholder];
  }, [sortedLeaders]);

  const officeGallery =
    Array.isArray(data.officeImages) && data.officeImages.length > 0
      ? data.officeImages.slice(0, 4)
      : TEMPORARY_OFFICE_IMAGES;

  // Use the supplied Daily Adin archive images directly so the real
  // newsroom / front-desk / newspaper photos always appear on this page.
  const mediaGallery = DAILY_ADIN_MEDIA;

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-950"
      style={{ fontFamily: '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');
        .font-about-display { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      {/* ================================================================ HERO */}
      <section className="relative overflow-hidden bg-[#F7FAF7] pt-20 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-8 h-[420px] w-[420px] rounded-full bg-green-100/60 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1650px] items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-16 xl:px-14">
          <MotionDiv
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-2xl"
          >
            <SectionEyebrow>{data.heroEyebrow || "About North South Group"}</SectionEyebrow>

            <h1 className="font-about-display max-w-3xl text-[42px] font-medium leading-[0.96] tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl xl:text-[82px]">
              {data.heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              {data.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="#story">Discover Our Story</PrimaryButton>

              <a
                href="#leadership"
                className="inline-flex h-11 items-center justify-center rounded-full border border-emerald-200 bg-white/80 px-6 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-900 transition hover:border-emerald-800 hover:bg-emerald-50 sm:h-12 sm:px-7 sm:text-[11px]"
              >
                Management
              </a>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 border-t border-emerald-100 pt-6 sm:grid-cols-4">
              {signatureVentures.slice(0, 4).map((venture, index) => (
                <div key={venture}>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-emerald-500">
                    0{index + 1}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-[0.10em] text-slate-600">
                    {venture}
                  </p>
                </div>
              ))}
            </div>
          </MotionDiv>

          <div className="relative min-h-[500px] sm:min-h-[610px] lg:min-h-[680px]">
            <div className="absolute left-[8%] top-[4%] h-[88%] w-[82%] rounded-[32px] border border-emerald-100 bg-white shadow-[0_34px_90px_rgba(15,76,58,0.14)] sm:rounded-[40px]" />

            <AnimatePresence mode="wait">
              <MotionImg
                key={currentSlide}
                src={heroImage}
                alt="North South Group"
                initial={{ opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, ease: "easeInOut" }}
                className="absolute left-[10%] top-[6%] h-[84%] w-[78%] rounded-[28px] object-cover sm:rounded-[36px]"
              />
            </AnimatePresence>

            <div className="absolute left-[10%] top-[6%] h-[84%] w-[78%] rounded-[28px] bg-gradient-to-t from-emerald-950/45 via-transparent to-transparent sm:rounded-[36px]" />

            {/* editorial/news card */}
            <button
              type="button"
              onClick={() => setSelectedGalleryItem(mediaGallery[2] || mediaGallery[0])}
              className="group absolute bottom-[2%] left-0 z-20 w-[46%] max-w-[270px] rotate-[-3deg] overflow-hidden rounded-[18px] border border-white bg-white p-2 shadow-[0_24px_60px_rgba(15,76,58,0.20)] transition hover:rotate-0 sm:bottom-[4%] sm:rounded-[22px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-emerald-50 sm:rounded-[18px]">
                <img
                  src={(mediaGallery[2] || mediaGallery[0])?.img}
                  alt="Daily Adin publication"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                  <p className="text-[7px] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                    Daily Adin
                  </p>
                  <p className="mt-1 text-xs font-bold leading-snug text-white sm:text-sm">
                    News & Publication
                  </p>
                </div>
              </div>
            </button>

            <div className="absolute right-0 top-[14%] z-20 rounded-[18px] border border-emerald-100 bg-white/92 px-4 py-4 shadow-[0_20px_50px_rgba(15,76,58,0.12)] backdrop-blur-xl sm:px-5">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.20em] text-emerald-700">
                Group Perspective
              </p>
              <p className="mt-2 max-w-[170px] font-about-display text-lg font-semibold leading-tight text-slate-950 sm:text-xl">
                {data.overviewHighlightTitle}
              </p>
            </div>

            <div className="absolute bottom-[8%] right-[4%] z-20 flex items-center gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/55 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ STATS */}
      <section className="relative z-20 bg-white">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="-mt-3 grid overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,76,58,0.09)] sm:grid-cols-2 lg:-mt-8 lg:grid-cols-4">
            {data.stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <MotionDiv
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="group relative min-h-[142px] border-b border-emerald-100 p-5 transition hover:bg-[#F8FBF8] sm:border-r sm:p-6 lg:border-b-0"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-emerald-700 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-lg text-emerald-700">
                      <Icon />
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.16em] text-slate-300">0{index + 1}</span>
                  </div>
                  <div className="mt-6">
                    <p className="font-about-display text-4xl font-semibold tracking-[-0.035em] text-slate-950">{stat.value}</p>
                    <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ DAILY ADIN FEATURE */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-green-100/45 blur-3xl" />
        <div className="pointer-events-none absolute right-[-180px] top-16 h-[460px] w-[460px] rounded-full bg-emerald-100/55 blur-3xl" />

        <div className="relative mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <SectionEyebrow>Media & Publication</SectionEyebrow>

              <PremiumHeading className="max-w-4xl">
                Daily Adin — newsroom, print journalism and circulation in one media ecosystem.
              </PremiumHeading>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                A closer look at Daily Adin's newsroom operations, front desk, print editions
                and real-world newspaper distribution.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-[#F6FAF7] px-3.5 py-2">
                <FaRegNewspaper className="text-sm text-emerald-700" />
                <span className="text-[8px] font-extrabold uppercase tracking-[0.17em] text-emerald-800">
                  Daily Adin · Media Wing
                </span>
              </div>
            </div>
          </div>

          {/* Main editorial composition */}
          <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
            {/* News Desk — strongest office image */}
            <button
              type="button"
              onClick={() => setSelectedGalleryItem(mediaGallery[0])}
              className="group relative min-h-[440px] overflow-hidden rounded-[28px] bg-emerald-950 text-left shadow-[0_30px_85px_rgba(15,76,58,0.14)] sm:min-h-[520px] lg:min-h-[650px]"
            >
              <img
                src={mediaGallery[0]?.img}
                alt={mediaGallery[0]?.title || "Daily Adin News Desk"}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1100ms] group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/88 via-emerald-950/8 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur-md sm:left-6 sm:top-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                News Desk
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.21em] text-emerald-200 sm:text-[9px]">
                  Inside Daily Adin
                </p>

                <h3 className="mt-3 max-w-2xl font-about-display text-3xl font-semibold leading-[1.02] text-white sm:text-4xl lg:text-5xl">
                  {mediaGallery[0]?.title || "Daily Adin News Desk"}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
                  {mediaGallery[0]?.subtitle}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/82 sm:text-[9px]">
                  View Full Image
                  <FaArrowRight className="text-[9px] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* Right editorial stack */}
            <div className="grid gap-4">
              {/* Front Desk */}
              <button
                type="button"
                onClick={() => setSelectedGalleryItem(mediaGallery[1])}
                className="group relative min-h-[300px] overflow-hidden rounded-[26px] bg-emerald-950 text-left shadow-[0_20px_55px_rgba(15,76,58,0.10)] sm:min-h-[320px]"
              >
                <img
                  src={mediaGallery[1]?.img}
                  alt={mediaGallery[1]?.title || "Daily Adin Front Desk"}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/84 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                    Front Desk
                  </p>
                  <h4 className="mt-2 font-about-display text-2xl font-semibold text-white sm:text-3xl">
                    {mediaGallery[1]?.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    {mediaGallery[1]?.subtitle}
                  </p>
                </div>
              </button>

              {/* Print Edition */}
              <button
                type="button"
                onClick={() => setSelectedGalleryItem(mediaGallery[2])}
                className="group relative min-h-[300px] overflow-hidden rounded-[26px] border border-emerald-100 bg-[#F4F9F5] text-left shadow-[0_18px_50px_rgba(15,76,58,0.08)] sm:min-h-[314px]"
              >
                <img
                  src={mediaGallery[2]?.img}
                  alt={mediaGallery[2]?.title || "Daily Adin Print Edition"}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/82 via-emerald-950/3 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                    Print Edition
                  </p>
                  <h4 className="mt-2 font-about-display text-2xl font-semibold text-white sm:text-3xl">
                    {mediaGallery[2]?.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    {mediaGallery[2]?.subtitle}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Distribution / readership strip */}
          <div className="mt-5 rounded-[28px] border border-emerald-100 bg-[#F7FAF7] p-3 sm:p-4 lg:p-5">
            <div className="mb-4 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.20em] text-emerald-700">
                  Print Presence
                </p>
                <h3 className="mt-1 font-about-display text-2xl font-semibold text-slate-950">
                  From publication to the reader.
                </h3>
              </div>

              <p className="max-w-md text-xs leading-5 text-slate-500">
                Newspaper display, circulation and community reach captured through Daily Adin's print presence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {mediaGallery.slice(3, 8).map((item, index) => (
                <button
                  key={item?.id || index}
                  type="button"
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group relative h-[190px] overflow-hidden rounded-[18px] bg-emerald-50 text-left shadow-[0_10px_28px_rgba(15,76,58,0.06)] sm:h-[220px] lg:h-[235px]"
                >
                  <img
                    src={item?.img}
                    alt={item?.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <p className="text-[6px] font-extrabold uppercase tracking-[0.15em] text-emerald-200 sm:text-[7px]">
                      {item?.type === "paper" ? "Print Media" : "Circulation"}
                    </p>
                    <h4 className="mt-1 font-about-display text-sm font-semibold leading-tight text-white sm:text-base">
                      {item?.title}
                    </h4>
                  </div>

                  <div className="pointer-events-none absolute inset-2 rounded-[13px] border border-white/15 opacity-0 transition duration-500 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ STORY */}
      <section id="story" className="bg-[#F6FAF7] py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1540px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-10 xl:px-14">
          <div>
            <SectionEyebrow>{data.overviewEyebrow || "Our Story"}</SectionEyebrow>

            <PremiumHeading className="max-w-2xl">{data.overviewTitle}</PremiumHeading>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {data.overviewText}
            </p>

            <div className="mt-7 space-y-4 border-t border-emerald-100 pt-6">
              {data.overviewParagraphs?.slice(0, 2).map((paragraph, index) => (
                <p key={index} className="text-sm leading-7 text-slate-500">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] border border-emerald-100 bg-white p-5">
                <HiOutlineClock className="text-2xl text-emerald-700" />
                <p className="mt-4 text-sm font-bold text-slate-900">
                  {data.strengths?.[0]?.title || "Planned Development"}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {data.strengths?.[0]?.text}
                </p>
              </div>

              <div className="rounded-[20px] border border-emerald-100 bg-white p-5">
                <HiOutlineChartBar className="text-2xl text-emerald-700" />
                <p className="mt-4 text-sm font-bold text-slate-900">
                  {data.strengths?.[1]?.title || "Sustainable Growth"}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {data.strengths?.[1]?.text}
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] sm:min-h-[660px]">
            <div className="absolute left-0 top-0 h-[74%] w-[72%] overflow-hidden rounded-[30px] bg-emerald-50 shadow-[0_28px_70px_rgba(15,76,58,0.11)]">
              <img
                src={overviewImage}
                alt={data.overviewTitle}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 h-[58%] w-[54%] overflow-hidden rounded-[26px] border-[8px] border-[#F6FAF7] bg-emerald-50 shadow-[0_24px_60px_rgba(15,76,58,0.12)]">
              <img
                src={secondOverviewImage}
                alt="North South Group development"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-[8%] left-[7%] z-10 max-w-[270px] rounded-[22px] bg-emerald-950 p-5 text-white shadow-[0_24px_60px_rgba(6,78,59,0.20)] sm:p-6">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.20em] text-emerald-200">
                Group Vision
              </p>
              <p className="mt-3 font-about-display text-xl font-semibold leading-snug">
                {data.overviewHighlightTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ OFFICE / WORKSPACES */}
      {/* <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionEyebrow>Our Workspaces</SectionEyebrow>
              <PremiumHeading className="max-w-3xl">
                From project sites to management spaces, our work is built around coordination and service.
              </PremiumHeading>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end">
              Replace these temporary previews with your actual Site Office and corporate office
              photographs when available.
            </p>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officeGallery.map((item, index) => (
              <button
                key={item.id || index}
                type="button"
                onClick={() => setSelectedGalleryItem(item)}
                className={`group relative overflow-hidden rounded-[24px] bg-emerald-50 text-left shadow-[0_16px_44px_rgba(15,76,58,0.07)] ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                } ${index === 3 ? "lg:col-span-2" : ""}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-emerald-950/4 to-transparent" />

                {item.isPlaceholder && (
                  <span className="absolute right-3 top-3 rounded-full border border-white/35 bg-white/82 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.14em] text-emerald-800 backdrop-blur-md">
                    Preview
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                    Workspace
                  </p>
                  <h3 className="mt-1 font-about-display text-xl font-semibold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/72">{item.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================================================================ STRENGTHS */}
      <section className="bg-emerald-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionEyebrow light>Institutional Capabilities</SectionEyebrow>
              <h2 className="font-about-display text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Core pillars behind the group.
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-emerald-100/68 lg:justify-self-end">
              Disciplined planning, client confidence, sustainable thinking and long-term value
              guide every concern of the group.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {data.strengths.map((item, index) => {
              const IconComp =
                strengthIcons[item.iconKey] ||
                defaultStrengthIconList[index % defaultStrengthIconList.length];
              return (
                <MotionDiv
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.11 }}
                >
                  <article className="group border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.07] sm:p-6 h-full">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-lg text-emerald-200 transition group-hover:bg-emerald-300 group-hover:text-emerald-950">
                        <IconComp />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-white/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-about-display text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-emerald-100/65">{item.text}</p>
                  </article>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ MANAGEMENT */}
      <section id="leadership" className="relative overflow-hidden bg-[#F6FAF7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-emerald-100/55 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-green-100/45 blur-3xl" />

        <div className="relative mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-9 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              {/* Eyebrow slide-in */}
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SectionEyebrow>{data.leadershipEyebrow || "Leadership"}</SectionEyebrow>
              </MotionDiv>

              {/* Typewriter word-by-word heading */}
              <h2 className="font-about-display mt-3 max-w-3xl text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {(data.leadershipTitle || "Board of Directors").split(" ").map((word, wi) => (
                  <MotionDiv
                    key={wi}
                    initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.15 + wi * 0.1 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </MotionDiv>
                ))}
              </h2>
            </div>

            {/* Description fade-up */}
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end">
                {data.leadershipText}
              </p>
            </MotionDiv>
          </div>

          {/* Clean luxury portrait cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {managementTeam.map((leader, index) => (
              <MotionDiv
                key={leader.id || `${leader.name}-${index}`}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="group relative h-[340px] w-full overflow-hidden rounded-[20px] bg-[#E9F3EC] text-left shadow-[0_16px_36px_rgba(15,76,58,0.08)] ring-1 ring-emerald-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(15,76,58,0.14)] hover:ring-emerald-300 sm:h-[380px] lg:h-[410px] xl:h-[430px]"
                  aria-label={`View profile of ${leader.name}`}
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="absolute inset-0 h-full w-full object-cover object-top scale-[0.93] transition duration-[1000ms] ease-out group-hover:scale-[1.0]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/76 via-emerald-950/8 to-transparent" />
                  <div className="pointer-events-none absolute inset-3 rounded-[15px] border border-white/18 opacity-65 transition-all duration-500 group-hover:inset-3.5 group-hover:border-emerald-200/90 group-hover:opacity-100 sm:inset-4 sm:rounded-[16px]" />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                    <p className="text-[7px] font-extrabold uppercase tracking-[0.18em] text-emerald-200 sm:text-[8px]">{leader.role}</p>
                    <h3 className="mt-1.5 font-about-display text-lg font-semibold leading-tight text-white drop-shadow-sm sm:text-xl lg:text-[22px]">{leader.name}</h3>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-px w-7 bg-emerald-300/90 transition-all duration-500 group-hover:w-11" />
                      <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-white/72 sm:text-[7px]">View Profile</span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-emerald-300 transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ VIDEO */}
      {embedUrl && (
        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1540px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:px-10 xl:px-14">
            <div>
              <SectionEyebrow>
                <span className="inline-flex items-center gap-2">
                  <FaPlay className="text-[8px]" />
                  {data.videoEyebrow}
                </span>
              </SectionEyebrow>

              <PremiumHeading>{data.videoTitle}</PremiumHeading>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                {data.videoText}
              </p>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-emerald-100 bg-[#F6FAF7] p-2.5 shadow-[0_24px_70px_rgba(15,76,58,0.10)] sm:rounded-[32px] sm:p-3">
              <div className="aspect-video overflow-hidden rounded-[20px] bg-black sm:rounded-[26px]">
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

      {/* ================================================================ COMMUNITY */}
      {Array.isArray(data.csrImages) && data.csrImages.length > 0 && (
        <section className="relative overflow-hidden bg-[#0a1628] py-20 sm:py-28 lg:py-32">
          <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-900/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#f3b128]/8 blur-[100px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#f3b128]/50 to-transparent" />

          <div className="relative mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end"
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-[#f3b128]/30 bg-[#f3b128]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#f3b128]">
                    {data.csrEyebrow}
                  </span>
                </div>
                <h2 className="font-about-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {data.csrTitle}
                </h2>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-[#f3b128] to-[#ffd26d]" />
                  <div className="h-0.5 w-4 rounded-full bg-[#f3b128]/40" />
                </div>
              </div>
              <p className="max-w-sm text-sm font-light leading-7 text-white/50 lg:pb-2">{data.csrText}</p>
            </MotionDiv>

            {/* Magazine masonry grid */}
            <div className="grid grid-cols-12 gap-3" style={{ gridTemplateRows: "220px 220px 220px" }}>

              {/* Hero — 7 cols × 2 rows */}
              {data.csrImages[0] && (
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7 }}
                  className="col-span-12 row-span-2 overflow-hidden rounded-[24px] sm:col-span-7"
                >
                  <button type="button" onClick={() => setSelectedGalleryItem(data.csrImages[0])}
                    className="group relative h-full w-full text-left">
                    <img src={data.csrImages[0].img} alt={data.csrImages[0].title}
                      className="h-full w-full object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/92 via-[#0a1628]/15 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#f3b128]/40 bg-[#0a1628]/70 px-3 py-1.5 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f3b128]" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#f3b128]">Community</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#f3b128]">Featured Initiative</p>
                      <h3 className="font-about-display mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                        {data.csrImages[0].title}
                      </h3>
                      <div className="mt-5 flex items-center gap-3">
                        <div className="h-0.5 w-8 rounded-full bg-[#f3b128] transition-all duration-500 group-hover:w-14" />
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55">View Photo</span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#f3b128] to-[#ffd26d] transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </MotionDiv>
              )}

              {/* Right top + bottom — 5 cols each */}
              {[1, 2].map((idx) => data.csrImages[idx] && (
                <MotionDiv key={data.csrImages[idx].id || idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="col-span-12 row-span-1 overflow-hidden rounded-[20px] sm:col-span-5"
                >
                  <button type="button" onClick={() => setSelectedGalleryItem(data.csrImages[idx])}
                    className="group relative h-full w-full text-left">
                    <img src={data.csrImages[idx].img} alt={data.csrImages[idx].title}
                      className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.055]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#f3b128]">Community</p>
                      <h4 className="font-about-display mt-1 text-lg font-bold text-white sm:text-xl">{data.csrImages[idx].title}</h4>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#f3b128] transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </MotionDiv>
              ))}

              {/* Bottom row — 3 equal */}
              {[3, 4, 5].map((idx) => data.csrImages[idx] && (
                <MotionDiv key={data.csrImages[idx].id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (idx - 3) * 0.1 }}
                  className="col-span-12 row-span-1 overflow-hidden rounded-[20px] sm:col-span-4"
                >
                  <button type="button" onClick={() => setSelectedGalleryItem(data.csrImages[idx])}
                    className="group relative h-full w-full text-left">
                    <img src={data.csrImages[idx].img} alt={data.csrImages[idx].title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-[#f3b128]/0 transition-all duration-500 group-hover:border-[#f3b128]/60" />
                    <div className="pointer-events-none absolute bottom-12 right-3 h-6 w-6 border-b-2 border-r-2 border-[#f3b128]/0 transition-all duration-500 group-hover:border-[#f3b128]/60" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#f3b128]">NSG Initiative</p>
                      <h4 className="font-about-display mt-1 text-base font-bold text-white sm:text-lg">{data.csrImages[idx].title}</h4>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#f3b128] to-[#ffd26d] transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </MotionDiv>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#f3b128]/30 to-transparent" />
        </section>
      )}

      {/* ================================================================ MISSION */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10">
            <SectionEyebrow>Purpose & Direction</SectionEyebrow>
            <PremiumHeading className="max-w-3xl">Built around a clear purpose.</PremiumHeading>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {data.missionCards.map((card, index) => (
              <article
                key={card.title}
                className="group rounded-[24px] border border-emerald-100 bg-[#F8FBF8] p-5 transition hover:border-emerald-300 hover:bg-white hover:shadow-[0_18px_50px_rgba(15,76,58,0.09)] sm:p-6 lg:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-800 text-white">
                    <FaCheckCircle className="text-sm" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 font-about-display text-2xl font-semibold text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ CTA */}
      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-18 lg:px-10 lg:pb-20 xl:px-14">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-6 rounded-[28px] bg-emerald-950 px-5 py-9 text-white shadow-[0_30px_90px_rgba(6,78,59,0.18)] sm:rounded-[34px] sm:px-8 sm:py-11 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200">
              North South Group
            </p>
            <h2 className="mt-2 max-w-3xl font-about-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Building confidence through thoughtful development, service and communication.
            </h2>
          </div>

          <a
            href="#story"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-emerald-100"
          >
            Explore More
            <FaArrowRight className="text-[9px]" />
          </a>
        </div>
      </section>

      {/* ================================================================ LEADER MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/88 p-3 backdrop-blur-md sm:p-5 lg:p-8"
            onClick={() => setSelectedLeader(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 22, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.975 }}
              transition={{ duration: 0.28 }}
              className="relative grid max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[26px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:grid-cols-[0.92fr_1.08fr] md:overflow-hidden lg:rounded-[34px]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                aria-label="Close leader profile"
                className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-emerald-100 bg-white/92 text-emerald-950 shadow-md backdrop-blur-md transition hover:bg-emerald-800 hover:text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
              >
                <FaTimes />
              </button>

              {/* LEFT: PORTRAIT */}
              <div className="relative min-h-[420px] bg-[#E8F3EB] md:min-h-[680px]">
                <img
                  src={selectedLeader.img}
                  alt={selectedLeader.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/68 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7 lg:p-8">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.20em] text-emerald-200">
                    Leadership · North South Group
                  </p>
                  <p className="mt-2 font-about-display text-2xl font-semibold sm:text-3xl">
                    {selectedLeader.name}
                  </p>
                </div>
              </div>

              {/* RIGHT: DETAILS */}
              <div className="flex min-h-[520px] flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-xl">
                  <SectionEyebrow>Management Profile</SectionEyebrow>

                  <p className="text-[9px] font-extrabold uppercase tracking-[0.21em] text-emerald-700">
                    {selectedLeader.role}
                  </p>

                  <h3 className="mt-3 font-about-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-slate-950 sm:text-5xl">
                    {selectedLeader.name}
                  </h3>

                  <div className="mt-6 h-px w-16 bg-emerald-500" />

                  <FaQuoteLeft className="mt-7 text-2xl text-emerald-100 sm:text-3xl" />

                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {selectedLeader.description ||
                      selectedLeader.text ||
                      "Leadership profile details will be added here."}
                  </p>

                  {!selectedLeader.isPlaceholder && (
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[18px] border border-emerald-100 bg-[#F6FAF7] p-4">
                        <p className="text-[7px] font-bold uppercase tracking-[0.17em] text-slate-400">
                          Organization
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">
                          North South Group
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-emerald-100 bg-[#F6FAF7] p-4">
                        <p className="text-[7px] font-bold uppercase tracking-[0.17em] text-slate-400">
                          Position
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-emerald-800">
                          {selectedLeader.role}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedLeader.isPlaceholder && (
                    <div className="mt-7 rounded-[18px] border border-emerald-100 bg-[#F5FAF6] p-4">
                      <p className="text-xs leading-6 text-slate-500">
                        This is a temporary management profile. Replace the name, designation,
                        photograph and description with the official information when available.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedLeader(null)}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-emerald-800 px-6 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-emerald-950"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* ================================================================ IMAGE MODAL */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 p-3 backdrop-blur-md sm:p-5"
            onClick={() => setSelectedGalleryItem(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[24px] bg-white p-2.5 shadow-2xl sm:rounded-[30px] sm:p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedGalleryItem(null)}
                aria-label="Close image"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-emerald-900 shadow-md backdrop-blur-md transition hover:bg-emerald-800 hover:text-white"
              >
                <FaTimes />
              </button>

              <img
                src={selectedGalleryItem.img}
                alt={selectedGalleryItem.title}
                className="max-h-[76vh] w-full rounded-[18px] object-contain sm:rounded-[24px]"
              />

              <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
                <h4 className="font-about-display text-xl font-semibold text-slate-950 sm:text-2xl">
                  {selectedGalleryItem.title}
                </h4>

                {selectedGalleryItem.subtitle && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    {selectedGalleryItem.subtitle}
                  </p>
                )}

                {selectedGalleryItem.isPlaceholder && (
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                    Temporary preview image
                  </p>
                )}
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </main>
  );
}
