import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaAward,
  FaBuilding,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
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
import logo from "../../assets/images/logo.png";
import greenCityLogo from "../../assets/images/greenCity.png";
import squareCityLogo from "../../assets/images/squareCityLogo.png";
import industrialCityLogo from "../../assets/images/industrialCityLogo.png";
import { usePartnerStore } from "../../store/partners/partnersStore";

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

export default function AboutUs({ previewData = null }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [workspaceSlide, setWorkspaceSlide] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [selectedGalleryItems, setSelectedGalleryItems] = useState([]);
  const leadershipScrollRef = useRef(null);

  const handleLeadershipWheel = (e) => {
    if (leadershipScrollRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        leadershipScrollRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const { aboutContent, loadAboutContent } = useAboutStore();
  const { partners, loadPartners } = usePartnerStore();

  useEffect(() => {
    if (!previewData) loadAboutContent().catch(() => {});
  }, [loadAboutContent, previewData]);

  useEffect(() => {
    loadPartners().catch(() => {});
  }, [loadPartners]);

  const sourceContent = previewData || aboutContent;

  const concernLogos = useMemo(() => {
    const dynamic = Array.isArray(partners) && partners.length > 0
      ? partners
          .map((p, idx) => ({
            name: p.title || p.name || `Concern ${idx + 1}`,
            logo: p.partnersImage || p.image,
          }))
          .filter((p) => Boolean(p.logo))
      : [];

    const fallback = [
      { name: "Northsouth Green City", logo: greenCityLogo, to: "/greenCity" },
      { name: "Northsouth Industrial City", logo: industrialCityLogo, to: "/industrialCity" },
      { name: "Northsouth Square City", logo: squareCityLogo, to: "/squareCity" },
      { name: "North South Consortium", logo: logo, to: "/northSouthConsortiumLtd" },
      { name: "Daily Adin Media", logo: "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790327081/WhatsApp_Image_2026-09-24_at_5.55.01_PM_1.jpg", to: "/aboutUs" },
      { name: "Nirapad Valley Condominium", logo: logo, to: "/purbachalNirapadValley" },
      { name: "Northsouth Duplex Home", logo: logo, to: "/conceptDetails" },
    ];

    return dynamic.length > 0 ? dynamic : fallback;
  }, [partners]);

  const data = useMemo(
    () => {
      const merged = {
      ...defaultAboutContent,
      ...(sourceContent || {}),
      heroSlides:
        Array.isArray(sourceContent?.heroSlides) && sourceContent.heroSlides.length > 0
          ? sourceContent.heroSlides
          : defaultAboutContent.heroSlides,
      stats:
        Array.isArray(sourceContent?.stats) && sourceContent.stats.length > 0
          ? sourceContent.stats
          : defaultAboutContent.stats,
      strengths:
        Array.isArray(sourceContent?.strengths) && sourceContent.strengths.length > 0
          ? sourceContent.strengths
          : defaultAboutContent.strengths,
      leaders:
        Array.isArray(sourceContent?.leaders) && sourceContent.leaders.length > 0
          ? sourceContent.leaders
          : defaultAboutContent.leaders,
      csrImages:
        Array.isArray(sourceContent?.csrImages) && sourceContent.csrImages.length > 0
          ? sourceContent.csrImages
          : defaultAboutContent.csrImages,
      missionCards:
        Array.isArray(sourceContent?.missionCards) && sourceContent.missionCards.length > 0
          ? sourceContent.missionCards
          : defaultAboutContent.missionCards,
      overviewParagraphs:
        Array.isArray(sourceContent?.overviewParagraphs) &&
        sourceContent.overviewParagraphs.length > 0
          ? sourceContent.overviewParagraphs
          : defaultAboutContent.overviewParagraphs,
      officeImages:
        Array.isArray(sourceContent?.officeImages) && sourceContent.officeImages.length > 0
          ? sourceContent.officeImages
          : TEMPORARY_OFFICE_IMAGES,
      officeGalleryImages:
        Array.isArray(sourceContent?.officeGalleryImages) && sourceContent.officeGalleryImages.length > 0
          ? sourceContent.officeGalleryImages
          : Array.isArray(sourceContent?.officeImages) && sourceContent.officeImages.length > 0
            ? sourceContent.officeImages
            : defaultAboutContent.officeGalleryImages,
      mediaImages:
        Array.isArray(sourceContent?.mediaImages) && sourceContent.mediaImages.length > 0
          ? sourceContent.mediaImages
          : DAILY_ADIN_MEDIA,
      };
      Object.entries(defaultAboutContent).forEach(([key, fallback]) => {
        if (typeof fallback === "string" && !String(merged[key] || "").trim()) merged[key] = fallback;
      });
      return merged;
    },
    [sourceContent]
  );

  const heroSlides =
    Array.isArray(data.heroSlides) && data.heroSlides.length > 0
      ? data.heroSlides
      : TEMPORARY_OFFICE_IMAGES.map((item) => item.img);

  const heroImage = heroSlides[currentSlide] || heroSlides[0];
  const overviewImage =
    data.overviewImage || heroSlides[1] || heroSlides[0] || TEMPORARY_OFFICE_IMAGES[0].img;
  const secondOverviewImage =
    data.overviewSecondImage || heroSlides[2] || data.csrImages?.[0]?.img || TEMPORARY_OFFICE_IMAGES[1].img;

  const embedUrl = getYouTubeEmbedUrl(data.videoUrl);

  const sortedLeaders = useMemo(() => {
    const source = Array.isArray(data.leaders) ? [...data.leaders] : [];

    const rolePriority = (leader = {}) => {
      const id = String(leader.id || "").toLowerCase();
      const role = String(leader.role || "").toLowerCase();
      const value = `${id} ${role}`;

      if (/chairman/.test(value)) return 0;
      if (/managing-director/.test(id) || /^managing director$/i.test(leader.role || "")) return 1;
      if (/deputy.*managing.*director/.test(value)) return 2;
      if (/\bceo\b|chief executive officer/.test(value)) return 3;
      if (/director.*admin|admin.*director|col\.|colonel/.test(value)) return 4;
      if (/^director$/.test(role) || id === "director") return 5;
      if (/hr/.test(value)) return 6;
      return 10;
    };

    return source.sort((a, b) => rolePriority(a) - rolePriority(b));
  }, [data.leaders]);


  const managementTeam = sortedLeaders;

  const workspaceGallery = Array.isArray(data.officeGalleryImages) && data.officeGalleryImages.length > 0
    ? data.officeGalleryImages
    : Array.isArray(data.officeImages) && data.officeImages.length > 0
      ? data.officeImages
      : TEMPORARY_OFFICE_IMAGES;
  const workspacePageCount = Math.max(1, Math.ceil(workspaceGallery.length / 4));
  const activeWorkspaceSlide = workspaceSlide % workspacePageCount;
  const workspaceSlotCount = Math.min(4, workspaceGallery.length);
  const officeGallery = Array.from({ length: workspaceSlotCount }, (_, index) => (
    workspaceGallery[(activeWorkspaceSlide * 4 + index) % workspaceGallery.length]
  ));

  const openGallery = (item, items) => {
    setSelectedGalleryItems(items || []);
    setSelectedGalleryItem(item);
  };

  const closeGallery = () => {
    setSelectedGalleryItem(null);
    setSelectedGalleryItems([]);
  };

  const moveGallery = (direction) => {
    if (selectedGalleryItems.length < 2) return;
    const currentIndex = selectedGalleryItems.findIndex(
      (item) => item.id === selectedGalleryItem?.id || item.img === selectedGalleryItem?.img
    );
    const nextIndex = (Math.max(0, currentIndex) + direction + selectedGalleryItems.length) % selectedGalleryItems.length;
    setSelectedGalleryItem(selectedGalleryItems[nextIndex]);
  };

  // Use the supplied Daily Adin archive images directly so the real
  // newsroom / front-desk / newspaper photos always appear on this page.
  const mediaGallery = Array.isArray(data.mediaImages) && data.mediaImages.length > 0
    ? data.mediaImages
    : DAILY_ADIN_MEDIA;

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    if (workspacePageCount <= 1) return undefined;
    const interval = setInterval(() => {
      setWorkspaceSlide((current) => (current + 1) % workspacePageCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [workspacePageCount]);

  return (
    <main
      className="min-h-screen min-w-0 overflow-x-hidden bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-950"
      style={{ fontFamily: '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');
        .font-about-display { font-family: 'Playfair Display', Georgia, serif; }

        @keyframes concernMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-concern-marquee {
          display: flex;
          width: max-content;
          animation: concernMarquee 24s linear infinite;
        }
        .animate-concern-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================================================================ HERO */}
      <section id="about-hero" className="relative w-full overflow-hidden bg-gradient-to-b from-[#F3F9F5] via-[#FAFCFA] to-white pt-20 pb-10 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-24">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-[550px] w-[550px] rounded-full bg-green-100/50 blur-[140px]" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-[350px] w-[350px] rounded-full bg-amber-100/40 blur-[110px]" />

        {/* Full-width responsive container */}
        <div className="relative w-full min-w-0 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid min-w-0 items-center gap-8 sm:gap-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1fr_1.18fr] xl:gap-16">
            <MotionDiv
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-w-0 max-w-2xl"
            >
              {/* Luxury Eyebrow Badge */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/90 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-900">
                  {data.heroEyebrow || "About North South Group"}
                </span>
              </div>

              {/* Grand Luxury Heading */}
              <h1 className="max-w-full break-words font-about-display text-[38px] font-medium leading-[1.03] tracking-normal text-slate-950 [overflow-wrap:anywhere] sm:text-6xl sm:tracking-[-0.035em] md:text-7xl xl:text-[80px]">
                {data.heroTitle && data.heroTitle.trim().length > 0 ? (
                  data.heroTitle
                ) : (
                  <>
                    Building <span className="italic font-normal text-emerald-800">Planned</span>{" "}
                    Communities For Tomorrow
                  </>
                )}
              </h1>

              {/* Subtitle with refined typography */}
              <p className="mt-6 max-w-xl break-words text-base leading-relaxed text-slate-600 [overflow-wrap:anywhere] sm:text-lg">
                {data.heroSubtitle ||
                  "Building exceptional spaces with innovative design, uncompromising quality, and a commitment to creating lasting value for our communities and customers."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex w-full min-w-0 flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href="#story"
                  className="group inline-flex h-12 w-full min-w-0 items-center justify-center gap-3 rounded-full bg-emerald-800 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_36px_rgba(6,78,59,0.24)] transition-all duration-300 hover:bg-emerald-950 hover:shadow-[0_20px_44px_rgba(6,78,59,0.32)] hover:-translate-y-0.5 active:translate-y-0 sm:h-14 sm:w-auto sm:px-8 sm:text-xs sm:tracking-[0.16em]"
                >
                  <span>{data.heroPrimaryButtonLabel}</span>
                  <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#leadership"
                  className="inline-flex h-12 w-full min-w-0 items-center justify-center rounded-full border border-emerald-200/90 bg-white/90 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-900 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50/80 hover:-translate-y-0.5 sm:h-14 sm:w-auto sm:px-8 sm:text-xs sm:tracking-[0.16em]"
                >
                  {data.heroSecondaryButtonLabel}
                </a>
              </div>

              {/* OUR CONCERNS — Light luxury container with larger cards */}
              <div className="mt-8 sm:mt-10 rounded-[22px] sm:rounded-[26px] border border-emerald-100 bg-white/80 p-4 sm:p-5 shadow-[0_14px_38px_rgba(15,76,58,0.06)] backdrop-blur-md relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between px-1 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-emerald-800">
                        {data.concernsEyebrow}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">
                      {data.concernsLabel}
                    </span>
                  </div>

                  {/* Auto-scrolling running marquee with larger, clear white cards */}
                  <div className="overflow-hidden rounded-xl [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
                    <div className="animate-concern-marquee flex gap-3 sm:gap-4 py-1">
                      {/* Set 1 */}
                      {concernLogos.map((item, index) => (
                        <div
                          key={`c1-${index}`}
                          className="group flex h-16 w-36 sm:h-20 sm:w-44 items-center justify-center rounded-2xl bg-white px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-100/90 transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:scale-105 shrink-0"
                          title={item.name}
                        >
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-10 sm:max-h-12 max-w-[90%] object-contain transition duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}

                      {/* Set 2 (Duplicate for continuous seamless loop) */}
                      {concernLogos.map((item, index) => (
                        <div
                          key={`c2-${index}`}
                          className="group flex h-16 w-36 sm:h-20 sm:w-44 items-center justify-center rounded-2xl bg-white px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-100/90 transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:scale-105 shrink-0"
                          title={item.name}
                        >
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-10 sm:max-h-12 max-w-[90%] object-contain transition duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Visual Showcase - Full depth, elegant curves, multiple interactive layers */}
            <div className="relative w-full py-4 lg:py-0">
              {/* Glow backdrop frame */}
              <div className="absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/10 blur-xl" />

              {/* Main Architectural Canvas */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/12] xl:aspect-[16/11] w-full overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/80 bg-white shadow-[0_36px_90px_rgba(15,76,58,0.18)]">
                <AnimatePresence mode="wait">
                  <MotionImg
                    key={currentSlide}
                    src={heroImage}
                    alt="North South Group Architectural Project"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover object-center"
                  />
                </AnimatePresence>

                {/* Subtle Cinematic Vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-950/15 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-transparent to-transparent" />

                {/* Floating Heritage Badge - Top Right */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/85 px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-md">
                    2019
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-800">
                      Established
                    </p>
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      Trust & Excellence
                    </p>
                  </div>
                </div>

                {/* Bottom Canvas Content */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900/60 px-3 py-1 text-[10px] font-semibold text-emerald-200 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Signature Real Estate
                    </span>
                    <h3 className="mt-2 font-about-display text-xl sm:text-2xl font-semibold text-white drop-shadow-md">
                      {data.overviewHighlightTitle || "Planned projects shaped around trust and long-term value"}
                    </h3>
                  </div>

                  {/* Slide Indicators & Controls */}
                  <div className="flex items-center gap-2 shrink-0 bg-black/35 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? "w-7 bg-emerald-400"
                            : "w-2 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-[10px] font-mono font-medium text-white/80">
                      0{currentSlide + 1}/0{heroSlides.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Media / Daily Adin Card - bottom left overlap with clean card design */}
              <button
                type="button"
                onClick={() => openGallery(mediaGallery[2] || mediaGallery[0], mediaGallery)}
                className="group relative z-30 mt-4 flex w-full items-center gap-3.5 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_20px_50px_rgba(15,76,58,0.16)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,76,58,0.22)] sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-auto sm:p-3.5"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-xl bg-emerald-100 shrink-0">
                  <img
                    src={(mediaGallery[2] || mediaGallery[0])?.img}
                    alt="Daily Adin publication"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-left pr-2">
                  <span className="inline-block rounded-sm bg-emerald-100 px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-emerald-800">
                    Daily Adin
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    News & Publication
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Media Concern</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ STATS */}
      <section className="relative z-20 bg-white">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mt-8 grid overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,76,58,0.09)] sm:grid-cols-2 lg:-mt-8 lg:grid-cols-4">
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
      <section id="about-media" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-green-100/45 blur-3xl" />
        <div className="pointer-events-none absolute right-[-180px] top-16 h-[460px] w-[460px] rounded-full bg-emerald-100/55 blur-3xl" />

        <div className="relative mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <SectionEyebrow>{data.mediaEyebrow}</SectionEyebrow>

              <PremiumHeading className="max-w-4xl">
                {data.mediaTitle}
              </PremiumHeading>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                {data.mediaText}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-[#F6FAF7] px-3.5 py-2">
                <FaRegNewspaper className="text-sm text-emerald-700" />
                <span className="text-[8px] font-extrabold uppercase tracking-[0.17em] text-emerald-800">
                  {data.mediaBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Main editorial composition */}
          <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
            {/* News Desk — strongest office image */}
            <button
              type="button"
              onClick={() => openGallery(mediaGallery[0], mediaGallery)}
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
                onClick={() => openGallery(mediaGallery[1], mediaGallery)}
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
                onClick={() => openGallery(mediaGallery[2], mediaGallery)}
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
                  {data.mediaStripEyebrow}
                </p>
                <h3 className="mt-1 font-about-display text-2xl font-semibold text-slate-950">
                  {data.mediaStripTitle}
                </h3>
              </div>

              <p className="max-w-md text-xs leading-5 text-slate-500">
                {data.mediaStripText}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {mediaGallery.slice(3, 8).map((item, index) => (
                <button
                  key={item?.id || index}
                  type="button"
                  onClick={() => openGallery(item, mediaGallery)}
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

      {/* ================================================================ STORY / COMPANY OVERVIEW */}
      <section id="story" className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-[#F2F8F4] py-16 sm:py-24 lg:py-32">
        {/* Soft background ambient blurs */}
        <div className="pointer-events-none absolute -left-36 top-1/4 h-[480px] w-[480px] rounded-full bg-emerald-100/50 blur-[130px]" />
        <div className="pointer-events-none absolute -right-36 bottom-10 h-[500px] w-[500px] rounded-full bg-green-100/40 blur-[140px]" />

        {/* Full-width responsive container */}
        <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.12fr] xl:gap-20">
            <div>
              {/* Luxury Eyebrow Badge */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/90 bg-emerald-50/70 px-4 py-1.5 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-900">
                  {data.overviewEyebrow || "Company Overview"}
                </span>
              </div>

              {/* Grand Editorial Headline */}
              <h2 className="font-about-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.035em] text-slate-950 leading-[1.08] max-w-2xl">
                {data.overviewTitle || "A trusted name in real estate and urban development"}
              </h2>

              {/* Lead Paragraph */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
                {data.overviewText}
              </p>

              {/* Detailed Paragraphs */}
              <div className="mt-6 space-y-4 border-t border-emerald-100/90 pt-6">
                {data.overviewParagraphs?.slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Strengths Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="group rounded-[22px] border border-emerald-100 bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(15,76,58,0.05)] transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white shadow-2xs">
                    <HiOutlineClock className="text-2xl" />
                  </div>
                  <p className="mt-4 text-base font-bold text-slate-900">
                    {data.strengths?.[0]?.title || "Planned Development"}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {data.strengths?.[0]?.text ||
                      "Residential and industrial communities shaped around long-term value, access, and daily convenience."}
                  </p>
                </div>

                <div className="group rounded-[22px] border border-emerald-100 bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(15,76,58,0.05)] transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white shadow-2xs">
                    <HiOutlineChartBar className="text-2xl" />
                  </div>
                  <p className="mt-4 text-base font-bold text-slate-900">
                    {data.strengths?.[1]?.title || "Sustainable Living"}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {data.strengths?.[1]?.text ||
                      "Green spaces, civic facilities, and organized layouts guide our approach to healthier township growth."}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Composition - Refined layered architectural and workspace photos */}
            <div className="relative min-h-[430px] sm:min-h-[640px] lg:min-h-[680px]">
              {/* Ambient Glow */}
              <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/10 blur-xl" />

              {/* Primary Image (Top Workspace / Office Photo) */}
              <div className="absolute left-0 top-0 h-[76%] w-[75%] overflow-hidden rounded-[30px] sm:rounded-[38px] bg-emerald-50 shadow-[0_28px_70px_rgba(15,76,58,0.14)] border border-white">
                <img
                  src={overviewImage}
                  alt={data.overviewTitle}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/45 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Secondary Image (Bottom Architectural Project Render) */}
              <div className="absolute bottom-0 right-0 h-[60%] w-[56%] overflow-hidden rounded-[26px] sm:rounded-[34px] border-[6px] sm:border-[8px] border-white bg-emerald-50 shadow-[0_26px_70px_rgba(15,76,58,0.18)]">
                <img
                  src={secondOverviewImage}
                  alt="North South Group development"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Luxury Group Vision Badge */}
              <div className="absolute bottom-[6%] left-[4%] sm:left-[6%] z-20 max-w-[310px] rounded-[24px] bg-[#0A1628] p-5 sm:p-6 text-white shadow-[0_24px_60px_rgba(10,22,40,0.40)] border border-slate-700/80 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.20em] text-emerald-400">
                    Group Vision
                  </p>
                </div>
                <p className="mt-2.5 font-about-display text-lg sm:text-xl font-semibold leading-snug text-white">
                  {data.overviewHighlightTitle || "Planned projects shaped around trust and long-term value"}
                </p>
              </div>

              {/* Floating Experience Pill (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl border border-emerald-100 backdrop-blur-md">
                <span className="text-emerald-700 font-bold text-xs">✦ 7+ Sister Concerns</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 text-xs font-semibold">Since 2019</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ OFFICE / WORKSPACES */}
      <section id="about-office" className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionEyebrow>{data.officeEyebrow}</SectionEyebrow>
              <PremiumHeading className="max-w-3xl">
                {data.officeTitle}
              </PremiumHeading>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500 lg:justify-self-end">
              {data.officeText}
            </p>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officeGallery.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openGallery(item, workspaceGallery)}
                className={`group relative overflow-hidden rounded-[24px] bg-emerald-50 text-left shadow-[0_16px_44px_rgba(15,76,58,0.07)] ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                } ${index === 3 ? "lg:col-span-2" : ""}`}
              >
                <AnimatePresence initial={false} mode="sync">
                  <MotionImg
                    key={item.id || item.img}
                    src={item.img}
                    alt={item.title}
                    initial={{ opacity: 0, x: 36, scale: 1.02 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -36, scale: 1.02 }}
                    transition={{ duration: 0.55, ease: "easeInOut", delay: index * 0.06 }}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-emerald-950/4 to-transparent" />

                <AnimatePresence initial={false} mode="wait">
                  <MotionDiv
                    key={`content-${item.id || item.img}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    className="absolute inset-0"
                  >
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
                  </MotionDiv>
                </AnimatePresence>
              </button>
            ))}
          </div>

        </div>
      </section> 

      {/* ================================================================ MANAGEMENT */}
      <section id="leadership" className="relative bg-[#F6FAF7] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-emerald-100/55 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-green-100/45 blur-3xl" />

        {/* Header — padded container aligned to match cards */}
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-9 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SectionEyebrow>{data.leadershipEyebrow || "Leadership"}</SectionEyebrow>
              </MotionDiv>

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
        </div>

        {/* Scroll row — direct child of section, full viewport width, no bottom scrollbar */}
        <div
          ref={leadershipScrollRef}
          onWheel={handleLeadershipWheel}
          className="relative overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-4 sm:px-6 lg:px-10 xl:px-14"
        >
          <div className="flex gap-3 sm:gap-3.5 min-w-max">
            {managementTeam.map((leader, index) => (
              <MotionDiv
                key={leader.id || `${leader.name}-${index}`}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="w-[200px] sm:w-[220px] md:w-[235px] lg:w-[245px] shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="group relative h-[340px] sm:h-[375px] lg:h-[405px] w-full overflow-hidden rounded-[20px] bg-[#E9F3EC] text-left shadow-[0_16px_36px_rgba(15,76,58,0.08)] ring-1 ring-emerald-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(15,76,58,0.14)] hover:ring-emerald-300"
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
        <section id="about-video" className="bg-white py-16 sm:py-20 lg:py-28">
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
        <section id="about-csr" className="relative overflow-hidden bg-[#0a1628] py-20 sm:py-28 lg:py-32">
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

            {/* Magazine masonry grid - fully responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:auto-rows-[220px]">

              {/* Hero — 7 cols × 2 rows on desktop, full width on mobile */}
              {data.csrImages[0] && (
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7 }}
                  className="col-span-1 sm:col-span-7 sm:row-span-2 min-h-[260px] sm:min-h-0 overflow-hidden rounded-[24px]"
                >
                  <button type="button" onClick={() => openGallery(data.csrImages[0], data.csrImages)}
                    className="group relative h-full w-full text-left min-h-[260px] sm:min-h-full">
                    <img src={data.csrImages[0].img} alt={data.csrImages[0].title}
                      className="h-full w-full object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/92 via-[#0a1628]/15 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#f3b128]/40 bg-[#0a1628]/70 px-3 py-1.5 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f3b128]" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#f3b128]">Community</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#f3b128]">Featured Initiative</p>
                      <h3 className="font-about-display mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
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

              {/* Right top + bottom — 5 cols each on desktop, full width on mobile */}
              {[1, 2].map((idx) => data.csrImages[idx] && (
                <MotionDiv key={data.csrImages[idx].id || idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="col-span-1 sm:col-span-5 sm:row-span-1 min-h-[200px] sm:min-h-0 overflow-hidden rounded-[20px]"
                >
                  <button type="button" onClick={() => openGallery(data.csrImages[idx], data.csrImages)}
                    className="group relative h-full w-full text-left min-h-[200px] sm:min-h-full">
                    <img src={data.csrImages[idx].img} alt={data.csrImages[idx].title}
                      className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.055]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#f3b128]">Community</p>
                      <h4 className="font-about-display mt-1 text-base sm:text-lg font-bold text-white lg:text-xl">{data.csrImages[idx].title}</h4>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#f3b128] transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </MotionDiv>
              ))}

              {/* Bottom row — 4 cols each on desktop, full width on mobile */}
              {[3, 4, 5].map((idx) => data.csrImages[idx] && (
                <MotionDiv key={data.csrImages[idx].id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (idx - 3) * 0.1 }}
                  className="col-span-1 sm:col-span-4 sm:row-span-1 min-h-[190px] sm:min-h-0 overflow-hidden rounded-[20px]"
                >
                  <button type="button" onClick={() => openGallery(data.csrImages[idx], data.csrImages)}
                    className="group relative h-full w-full text-left min-h-[190px] sm:min-h-full">
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
      <section id="about-mission" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10">
            <SectionEyebrow>{data.missionEyebrow}</SectionEyebrow>
            <PremiumHeading className="max-w-3xl">{data.missionTitle}</PremiumHeading>
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
              <div className="relative min-h-[320px] sm:min-h-[420px] bg-[#E8F3EB] md:min-h-[640px]">
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
              <div className="flex min-h-0 flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-xl">
                  <SectionEyebrow>Management Profile</SectionEyebrow>

                  <p className="text-[9px] font-extrabold uppercase tracking-[0.21em] text-emerald-700">
                    {selectedLeader.role}
                  </p>

                  <h3 className="mt-3 font-about-display text-3xl font-semibold leading-[1.06] tracking-normal text-slate-950 sm:text-5xl sm:tracking-[-0.035em]">
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
            onClick={closeGallery}
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
                onClick={closeGallery}
                aria-label="Close image"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-emerald-900 shadow-md backdrop-blur-md transition hover:bg-emerald-800 hover:text-white"
              >
                <FaTimes />
              </button>

              {selectedGalleryItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveGallery(-1)}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-emerald-900 shadow-md transition hover:bg-emerald-800 hover:text-white"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGallery(1)}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-emerald-900 shadow-md transition hover:bg-emerald-800 hover:text-white"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

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
