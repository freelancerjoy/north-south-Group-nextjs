import ConcernLogo, { includeOfficialConcerns } from "../../components/ConcernLogo";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
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
import { LUXURY_SHOWCASE_SLIDES, getProjectSliderImages } from "../project/projectHeroImages";
import { useProjectStore } from "../../store/project/projectStore";
import { useAboutStore } from "../../store/about/aboutStore";
import logo from "../../assets/images/logo.png";
import greenCityLogo from "../../assets/images/greenCity.png";
import squareCityLogo from "../../assets/images/squareCityLogo.png";
import industrialCityLogo from "../../assets/images/industrialCityLogo.png";
import { usePartnerStore } from "../../store/partners/partnersStore";

import styles from "./AboutEditorial.module.css";

const MotionDiv = motion.div;
const MotionImg = motion.img;
const MotionSpan = motion.span;

const strengthIcons = {
  FaBuilding,
  FaLeaf,
  FaShieldAlt,
  FaHandshake,
};

const defaultStrengthIconList = [FaBuilding, FaLeaf, FaShieldAlt, FaHandshake];
const statIcons = [FaAward, FaCity, FaBuilding, FaCompass];
const purposeIcons = [FaCompass, HiOutlineChartBar, HiOutlineShieldCheck];

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
  const [introSteps, setIntroSteps] = useState(0);
  const [workspaceSlide, setWorkspaceSlide] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [selectedGalleryItems, setSelectedGalleryItems] = useState([]);
  const reduceMotion = useReducedMotion();
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [concernsPlaying, setConcernsPlaying] = useState(true);

  const leadershipSectionRef = useRef(null);
  const leadershipScrollRef = useRef(null);
  const leadershipTrackRef = useRef(null);
  const leadershipDragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const { projects, loadProjects } = useProjectStore();
  const { aboutContent, loadAboutContent } = useAboutStore();
  const { partners, loadPartners } = usePartnerStore();

  useEffect(() => {
    if (!previewData) loadAboutContent().catch(() => {});
  }, [loadAboutContent, previewData]);

  useEffect(() => {
    loadPartners().catch(() => {});
  }, [loadPartners]);

  useEffect(() => {
    if (!previewData) loadProjects();
  }, [loadProjects, previewData]);

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

    return includeOfficialConcerns(dynamic.length > 0 ? dynamic : fallback);
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

  const configuredSlides = [...new Set(data.heroSlides.filter(Boolean))];
  const projectSlides = configuredSlides.length > 1
    ? configuredSlides
    : [...new Set([...configuredSlides, ...defaultAboutContent.heroSlides])];

  const overviewImage =
    data.overviewImage || projectSlides[1] || projectSlides[0] || TEMPORARY_OFFICE_IMAGES[0].img;
  const secondOverviewImage =
    data.overviewSecondImage || projectSlides[2] || data.csrImages?.[0]?.img || TEMPORARY_OFFICE_IMAGES[1].img;

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

  const handleLeadershipPointerDown = (event) => {
    const viewport = leadershipScrollRef.current;
    if (!viewport) return;

    const target = event.target;
    const isInteractiveChild = target instanceof HTMLElement && target.closest("button, a, input, textarea, select, [role='button']");

    if (isInteractiveChild) {
      leadershipDragRef.current = { active: false, startX: 0, startScrollLeft: viewport.scrollLeft };
      return;
    }

    leadershipDragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture?.(event.pointerId);
  };

  const handleLeadershipPointerMove = (event) => {
    const viewport = leadershipScrollRef.current;
    const drag = leadershipDragRef.current;
    if (!viewport || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) viewport.classList.add("cursor-grabbing");
    viewport.scrollLeft = drag.startScrollLeft - distance;
  };

  const handleLeadershipPointerUp = (event) => {
    const viewport = leadershipScrollRef.current;
    leadershipDragRef.current.active = false;
    viewport?.releasePointerCapture?.(event.pointerId);
    viewport?.classList.remove("cursor-grabbing");
  };

  const workspaceGallery = Array.isArray(data.officeGalleryImages) && data.officeGalleryImages.length > 0
    ? data.officeGalleryImages
    : Array.isArray(data.officeImages) && data.officeImages.length > 0
      ? data.officeImages
      : TEMPORARY_OFFICE_IMAGES;
  const workspaceSlides = workspaceGallery
    .filter((item) => item?.img && !item.isPlaceholder)
    .map((item) => item.img);
  const addedWorkspaceSlides = [...new Set(workspaceSlides)]
    .filter((img) => !projectSlides.includes(img))
    .slice(0, 3);
  const uploadedProjectSlides = Array.isArray(projects)
    ? projects.flatMap(getProjectSliderImages)
    : [];
  const heroSlides = [...new Set([
    ...LUXURY_SHOWCASE_SLIDES.map((slide) => slide.image),
    ...uploadedProjectSlides,
    ...addedWorkspaceSlides,
    ...projectSlides,
  ])];
  const isHeroIntro = introSteps < 3;
  const activeHeroSlide = currentSlide % heroSlides.length;
  const heroImage = heroSlides[activeHeroSlide];
  const nextHeroImage = heroSlides[(activeHeroSlide + 1) % heroSlides.length];
  const [heroFrame, setHeroFrame] = useState(() => ({ current: heroImage, previous: null }));

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
  const newsroomGallery = mediaGallery.map((item) => {
    const screenshot = /^https:\/\/res\.cloudinary\.com\/dpsjkcaa\/image\/upload\/v\d+\/WhatsApp_Image_2026-09-24_at_5\.50\.27_PM(?:_1)?\.jpg$/i;
    if (!screenshot.test(item.img)) return item;

    return { ...item, img: item.img.replace("/image/upload/", "/image/upload/c_crop,g_south,h_0.9,w_1.0/") };
  });

  useEffect(() => {
    if (heroFrame.current === heroImage) return undefined;

    let cancelled = false;
    const image = new Image();
    image.src = heroImage;
    image.decode().then(() => {
      if (!cancelled) setHeroFrame(({ current }) => ({ current: heroImage, previous: current }));
    }).catch(() => {});

    return () => { cancelled = true; };
  }, [heroImage, heroFrame.current]);

  useEffect(() => {
    if (reduceMotion || !heroPlaying || nextHeroImage === heroImage) return;
    const image = new Image();
    image.src = nextHeroImage;
  }, [heroPlaying, reduceMotion, nextHeroImage, heroImage]);

  useEffect(() => {
    if (heroSlides.length <= 1 || reduceMotion || !heroPlaying) return undefined;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      if (isHeroIntro) setIntroSteps((step) => step + 1);
    }, isHeroIntro ? 950 : 4200);

    return () => clearTimeout(timer);
  }, [currentSlide, heroSlides.length, reduceMotion, heroPlaying, isHeroIntro]);

  useEffect(() => {
    if (workspacePageCount <= 1 || reduceMotion) return undefined;
    const interval = setInterval(() => {
      setWorkspaceSlide((current) => (current + 1) % workspacePageCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [workspacePageCount, reduceMotion]);

  const repeatCount = Math.ceil(10 / Math.max(1, concernLogos.length));

  const page = (
    <main
      className={styles.page}
      style={{ fontFamily: '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');
        .font-about-display { font-family: 'Playfair Display', Georgia, serif; }

      `}</style>

      <section id="about-hero" className={styles.hero}>
        <div className={styles.heroImage}>
          {heroFrame.previous && !reduceMotion && <img src={heroFrame.previous} alt="" />}
          <MotionImg
            key={heroFrame.current}
            src={heroFrame.current}
            alt=""
            fetchPriority={heroFrame.previous ? "auto" : "high"}
            initial={{ opacity: heroFrame.previous && !reduceMotion ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : isHeroIntro ? 0.2 : 0.6, ease: "easeOut" }}
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className="sr-only">{data.heroEyebrow || defaultAboutContent.heroEyebrow}</h1>
            <p>{data.heroSubtitle || defaultAboutContent.heroSubtitle}</p>
            <div className={styles.heroActions}>
              <a href="#story">{data.heroPrimaryButtonLabel}</a>
              <a href="#leadership">{data.heroSecondaryButtonLabel}</a>
            </div>
          </div>
          <div className={styles.heroFooter}>
            <p>{data.overviewHighlightTitle}</p>
            {heroSlides.length > 1 && (
              <div className={styles.slideControls} role="group" aria-label="Project slideshow">
                <button type="button" aria-label="Previous slide" onClick={() => setCurrentSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}>
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <span>{activeHeroSlide + 1} / {heroSlides.length}</span>
                <button type="button" aria-label="Next slide" onClick={() => setCurrentSlide((current) => (current + 1) % heroSlides.length)}>
                  <FaChevronRight aria-hidden="true" />
                </button>
                {!reduceMotion && (
                  <button type="button" onClick={() => setHeroPlaying((playing) => !playing)}>
                    {heroPlaying ? "Pause" : "Play"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.concerns} aria-label={data.concernsEyebrow}>
        <div className={styles.shell}>
          <div className={styles.concernHeader}>
            <div>
              <SectionEyebrow>{data.concernsEyebrow}</SectionEyebrow>
              <h2 className="font-about-display">{data.concernsLabel}</h2>
            </div>
            <div className={styles.concernActions}>
              <button className={styles.mediaLink} type="button" onClick={() => openGallery(newsroomGallery[0], newsroomGallery)}>
                <FaRegNewspaper aria-hidden="true" />
                Daily Adin - newsroom
              </button>
              <button type="button" className={styles.marqueeToggle} aria-controls="concern-logos" onClick={() => setConcernsPlaying((playing) => !playing)}>
                {concernsPlaying ? "Pause logos" : "Play logos"}
              </button>
            </div>
          </div>
          <div id="concern-logos" className={styles.marquee} data-playing={concernsPlaying}>
            <div className={styles.logoBelt}>
              {Array.from({ length: repeatCount * 2 }, (_, copy) => (
                <ul key={copy} className={styles.logoTrack} aria-hidden={copy > 0 || undefined}>
                  {concernLogos.map((item, index) => (
                    <li key={index} title={item.name}>
                      <ConcernLogo concern={item} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.metrics}>
            {data.stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <MotionDiv
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className={styles.metric}
                >
                  <span className={styles.metricIcon} aria-hidden="true"><Icon /></span>
                  <div>
                    <p className={`font-about-display ${styles.metricValue}`}>{stat.value}</p>
                    <p className={styles.metricLabel}>{stat.label}</p>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about-media" aria-labelledby="daily-adin-title" className={styles.newsroom}>
        <div className={styles.shell}>
          <h2 id="daily-adin-title" className="font-about-display">Daily Adin - newsroom</h2>
          <div className={styles.newsroomGrid}>
            {newsroomGallery.map((item, index) => (
              <button
                key={item.id || `${item.img}-${index}`}
                type="button"
                onClick={() => openGallery(item, newsroomGallery)}
                className={styles.newsroomPhoto}
              >
                <img src={item.img} alt="" loading="lazy" />
                <span>{item.title || "Daily Adin"}</span>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ================================================================ STORY / COMPANY OVERVIEW */}
      <section id="story" className={`relative w-full overflow-hidden py-14 sm:py-18 lg:py-24 ${styles.contentBand}`}>
        {/* Soft background ambient blurs */}

        {/* Full-width responsive container */}
        <div className={styles.shell}>
          <div className={styles.overviewGrid}>
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
              <h2 className={`font-about-display ${styles.overviewTitle}`}>
                {data.overviewTitle || "A trusted name in real estate and urban development"}
              </h2>

              {/* Lead Paragraph */}
              <p className={styles.overviewLead}>
                {data.overviewText}
              </p>

              {/* Detailed Paragraphs */}
              <div className={styles.overviewParagraphs}>
                {data.overviewParagraphs?.slice(0, 2).map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Strengths Cards */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="group rounded-[22px] border border-emerald-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,76,58,0.05)] transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white shadow-2xs">
                    <HiOutlineClock className="text-xl" />
                  </div>
                  <p className="mt-3 text-[0.9375rem] font-bold text-slate-900">
                    {data.strengths?.[0]?.title || "Planned Development"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {data.strengths?.[0]?.text ||
                      "Residential and industrial communities shaped around long-term value, access, and daily convenience."}
                  </p>
                </div>

                <div className="group rounded-[22px] border border-emerald-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,76,58,0.05)] transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white shadow-2xs">
                    <HiOutlineChartBar className="text-xl" />
                  </div>
                  <p className="mt-3 text-[0.9375rem] font-bold text-slate-900">
                    {data.strengths?.[1]?.title || "Sustainable Living"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {data.strengths?.[1]?.text ||
                      "Green spaces, civic facilities, and organized layouts guide our approach to healthier township growth."}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Composition - Refined layered architectural and workspace photos */}
            <div className={styles.overviewPhotos}>
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
              <div className="absolute bottom-[6%] left-[4%] sm:left-[6%] z-20 max-w-[min(82%,250px)] rounded-[18px] bg-[#0A1628] p-4 text-white shadow-[0_24px_60px_rgba(10,22,40,0.40)] border border-slate-700/80 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.20em] text-emerald-400">
                    Group Vision
                  </p>
                </div>
                <p className="mt-2 text-sm sm:text-base font-semibold leading-snug text-white">
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
      <section id="about-office" className={`py-16 sm:py-20 lg:py-28 ${styles.contentBand}`}>
        <div className="mx-auto max-w-[1540px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionEyebrow>{data.officeEyebrow}</SectionEyebrow>
              <h2 className={styles.workspaceTitle}>
                {data.officeTitle}
              </h2>
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
      <section
        id="leadership"
        ref={leadershipSectionRef}
        className="relative bg-[#F6FAF7] overflow-hidden"
      >
        <div
          className="relative w-full flex flex-col py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-emerald-100/55 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-green-100/45 blur-3xl" />

        {/* Header — aligned with cards */}
        <div className="relative w-full mb-8 lg:mb-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
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
                  <MotionSpan
                    key={wi}
                    initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: 0.15 + wi * 0.1 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </MotionSpan>
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

        {/* Full-width Cards Track: 7 columns across on desktop, smooth swipeable on mobile */}
        <div
          ref={leadershipScrollRef}
          onPointerDown={handleLeadershipPointerDown}
          onPointerMove={handleLeadershipPointerMove}
          onPointerUp={handleLeadershipPointerUp}
          onPointerCancel={handleLeadershipPointerUp}
          className="relative w-full cursor-grab touch-pan-x select-none overflow-x-auto min-[1440px]:overflow-visible overscroll-x-contain scrollbar-hide pb-4 pt-2"
        >
          <div
            ref={leadershipTrackRef}
            className={styles.leadershipTrack}
          >
            {managementTeam.map((leader, index) => (
              <MotionDiv
                key={leader.id || `${leader.name}-${index}`}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={styles.leadershipCard}
              >
                <button
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className="group relative h-full w-full overflow-hidden rounded-[18px] bg-[#EAF2EC] text-left shadow-[0_10px_24px_rgba(15,76,58,0.07)] border border-emerald-100/90 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_42px_rgba(15,76,58,0.14)] hover:border-emerald-300"
                  aria-label={`View profile of ${leader.name}`}
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition duration-[800ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 via-30% to-transparent to-60%" />
                  <div className="pointer-events-none absolute inset-2 rounded-[14px] border border-white/20 opacity-70 transition-all duration-500 group-hover:border-emerald-200/90 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-2.5 sm:p-3">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-300 break-words drop-shadow-sm">{leader.role}</p>
                    <h3 className="mt-0.5 font-about-display text-sm sm:text-base font-semibold leading-tight text-white drop-shadow-sm break-words">{leader.name}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="h-px w-4 bg-emerald-300/90 transition-all duration-500 group-hover:w-6" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/80 group-hover:text-emerald-200">View Profile</span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-emerald-400 to-teal-300 transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </MotionDiv>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ================================================================ VIDEO */}
      {embedUrl && (
        <section id="about-video" className={`py-16 sm:py-20 lg:py-28 ${styles.contentBand}`}>
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
        <section id="about-csr" className={`relative overflow-hidden py-20 sm:py-28 lg:py-32 ${styles.contentBand}`}>
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
      <section id="about-mission" className={`py-16 sm:py-20 lg:py-28 ${styles.contentBand}`}>
        <div className="mx-auto grid max-w-[1540px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-10 xl:px-14">
          <MotionDiv
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionEyebrow>{data.missionEyebrow}</SectionEyebrow>
            <PremiumHeading className="max-w-xl">{data.missionTitle}</PremiumHeading>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              The principles that shape our work, guide our decisions, and define the value we create for every client.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
              <span className="h-px w-20 bg-emerald-200" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                North South Group
              </span>
            </div>
          </MotionDiv>

          <div className="overflow-hidden rounded-[26px] border border-emerald-100 bg-[#F8FBF8] sm:rounded-[32px]">
            {data.missionCards.map((card, index) => {
              const PurposeIcon = purposeIcons[index % purposeIcons.length];

              return (
                <MotionDiv
                  key={card.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <article className={`${index > 0 ? "border-t border-emerald-100" : ""} group grid gap-5 p-5 transition-colors duration-300 hover:bg-white sm:p-7 md:grid-cols-[64px_0.62fr_1fr] md:items-center md:gap-7 lg:p-8`}>
                    <div className="flex items-center justify-between md:block">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-emerald-200 bg-white text-emerald-800 shadow-[0_8px_22px_rgba(6,78,59,0.07)] transition duration-300 group-hover:border-emerald-700 group-hover:bg-emerald-800 group-hover:text-white sm:h-14 sm:w-14">
                        <PurposeIcon className="text-lg sm:text-xl" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-emerald-700/45 md:hidden">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <span className="hidden font-mono text-[9px] font-semibold tracking-[0.2em] text-emerald-700/40 md:block">
                        / {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-about-display text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-7 text-slate-500 sm:text-[15px] sm:leading-8">
                      {card.text}
                    </p>
                  </article>
                </MotionDiv>
              );
            })}
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

  return <MotionConfig reducedMotion="user">{page}</MotionConfig>;
}
