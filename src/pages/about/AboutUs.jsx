import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaHandshake,
  FaLeaf,
  FaPlay,
  FaShieldAlt,
  FaTimes,
  FaQuoteLeft,
} from "react-icons/fa";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";
import { defaultAboutContent } from "./defaultAboutContent";
import { useAboutStore } from "../../store/about/aboutStore";

/* ── Typography ── */
const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };
const sans = { fontFamily: '"Inter", "Montserrat", system-ui, sans-serif' };

/* ── Icons ── */
const iconRegistry = { FaBuilding, FaLeaf, FaShieldAlt, FaHandshake };

/* ── Animated counter ── */
function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const num = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 35, stiffness: 80 });
  const [d, setD] = useState("0");
  useEffect(() => { if (inView) mv.set(num); }, [inView, num, mv]);
  useEffect(() => spring.on("change", (v) => setD(Math.round(v).toString())), [spring]);
  const suffix = value.replace(/[\d]/g, "").trim();
  return <span ref={ref}>{d}{suffix}</span>;
}

/* ── Reveal on scroll ── */
function Reveal({ children, delay = 0, className = "", y = 50 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Parallax image wrapper ── */
function ParallaxImg({ src, alt, className = "", speed = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} className="h-[120%] w-full object-cover" style={{ y }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
const AboutUs = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const heroRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedCsrImage, setSelectedCsrImage] = useState(null);
  const [activeStrength, setActiveStrength] = useState(0);
  const { aboutContent, loadAboutContent } = useAboutStore();

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);

  useEffect(() => { loadAboutContent().catch(() => {}); }, [loadAboutContent]);

  /* ── Data merge ── */
  const data = {
    ...defaultAboutContent,
    ...(aboutContent || {}),
    heroSlides: Array.isArray(aboutContent?.heroSlides) && aboutContent.heroSlides.length > 0 ? aboutContent.heroSlides : defaultAboutContent.heroSlides,
    stats: Array.isArray(aboutContent?.stats) && aboutContent.stats.length > 0 ? aboutContent.stats : defaultAboutContent.stats,
    strengths: Array.isArray(aboutContent?.strengths) && aboutContent.strengths.length > 0 ? aboutContent.strengths : defaultAboutContent.strengths,
    leaders: Array.isArray(aboutContent?.leaders) && aboutContent.leaders.length > 0 ? aboutContent.leaders : defaultAboutContent.leaders,
    csrImages: Array.isArray(aboutContent?.csrImages) && aboutContent.csrImages.length > 0 ? aboutContent.csrImages : defaultAboutContent.csrImages,
    missionCards: Array.isArray(aboutContent?.missionCards) && aboutContent.missionCards.length > 0 ? aboutContent.missionCards : defaultAboutContent.missionCards,
    overviewParagraphs: Array.isArray(aboutContent?.overviewParagraphs) && aboutContent.overviewParagraphs.length > 0 ? aboutContent.overviewParagraphs : defaultAboutContent.overviewParagraphs,
  };

  const [hero1 = defaultAboutContent.heroSlides[0], hero2 = defaultAboutContent.heroSlides[1]] = data.heroSlides || [];
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
    <main className="overflow-hidden bg-white" style={sans}>

      {/* ═══════════════════════════════════════════════════
          1. HERO — Full-screen cinematic with parallax
      ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[750px]">
        {/* Background with parallax + Ken Burns */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop speed={2000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-full w-full [&_.swiper-slide_img]:transition-transform [&_.swiper-slide_img]:duration-[8000ms] [&_.swiper-slide-active_img]:scale-110"
          >
            {data.heroSlides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <img src={slide} alt="" className="h-full w-full object-cover scale-100" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(22,163,74,0.12),transparent_50%)]" />
          {/* Diagonal lines pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, white 40px, white 41px)",
          }} />
        </div>

        {/* Hero content */}
        <motion.div className="relative z-10 flex h-full items-end" style={{ opacity: heroOpacity }}>
          <div className="w-full pb-20 lg:pb-28">
            <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                {/* Left text */}
                <div>
                  <motion.div
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 h-[3px] w-24 origin-left bg-gradient-to-r from-green-500 to-green-300"
                  />
                  <motion.p
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-[11px] font-semibold uppercase tracking-[0.4em] text-green-400"
                  >
                    {data.heroEyebrow}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-7 text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white"
                    style={serif}
                  >
                    {data.heroTitle}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-8 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg"
                  >
                    {data.heroSubtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="mt-10 flex flex-wrap gap-4"
                  >
                    <a href="#overview" className="group inline-flex items-center gap-3 bg-green-600 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-green-500 hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.5)] hover:translate-y-[-2px]">
                      Discover More <HiOutlineArrowLongRight className="text-lg transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                    <a href="#leadership" className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/5">
                      Our Leaders
                    </a>
                  </motion.div>
                </div>

                {/* Right — Stats overlay card */}
                <motion.div
                  initial={{ opacity: 0, y: 40, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <div className="border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
                    <div className="grid grid-cols-2">
                      {data.stats.map((item, i) => (
                        <div
                          key={item.label}
                          className={`group relative p-7 lg:p-8 transition-colors duration-300 hover:bg-white/[0.04] ${
                            i < 2 ? "border-b border-white/10" : ""
                          } ${i % 2 === 0 ? "border-r border-white/10" : ""}`}
                        >
                          <p className="text-4xl font-bold text-white lg:text-5xl" style={serif}>
                            <Counter value={item.value} />
                          </p>
                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                            {item.label}
                          </p>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-14 w-px bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. OVERVIEW — Luxury editorial split layout
      ═══════════════════════════════════════════════════ */}
      <section id="overview" className="relative">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-green-600 via-green-400 to-emerald-500" />

        <div className="relative bg-[#f8f7f4] py-28 lg:py-36 px-6 lg:px-12 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.025]" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, #166534 80px, #166534 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, #166534 80px, #166534 81px)",
          }} />
          <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-green-100/40 blur-[120px]" />

          <div className="relative mx-auto max-w-[90rem]">
            {/* Eyebrow row */}
            <Reveal>
              <div className="mb-20 flex items-center gap-6">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-green-700 shrink-0">
                  {data.overviewEyebrow}
                </p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
            </Reveal>

            <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
              {/* Left — Big title & image */}
              <div className="lg:col-span-5 space-y-12">
                <Reveal>
                  <h2
                    className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.02em] text-slate-900"
                    style={serif}
                  >
                    {data.overviewTitle}
                  </h2>
                </Reveal>

                <Reveal delay={0.15}>
                  <p className="text-lg leading-relaxed text-slate-500 border-l-[3px] border-green-500 pl-6">
                    {data.overviewText}
                  </p>
                </Reveal>

                {/* Image with overlay */}
                <Reveal delay={0.2}>
                  <div className="group relative overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)]">
                    <div className="aspect-[4/5]">
                      <img src={hero2} alt="Project" className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Badge */}
                    <div className="absolute left-0 top-8">
                      <div className="bg-green-600 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-lg">
                        {data.overviewBadge}
                      </div>
                    </div>

                    {/* Bottom glass card */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="border border-white/15 bg-black/30 p-6 backdrop-blur-2xl">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-green-300">{data.overviewHighlightEyebrow}</p>
                        <h3 className="mt-3 text-xl font-bold leading-snug text-white" style={serif}>{data.overviewHighlightTitle}</h3>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right — Paragraphs + strengths */}
              <div className="lg:col-span-7 space-y-16">
                {/* Paragraphs with drop cap style */}
                <Reveal delay={0.1}>
                  <div className="space-y-8">
                    {data.overviewParagraphs.map((paragraph, index) => (
                      <p key={index} className={`text-[1.05rem] leading-[2] text-slate-600 ${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[3.5rem] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-green-700" : ""}`} style={index === 0 ? serif : undefined}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>

                {/* Divider */}
                <Reveal delay={0.15}>
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-3 rotate-45 border-2 border-green-500" />
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                </Reveal>

                {/* Strengths — Interactive accordion style */}
                <div className="space-y-4">
                  {data.strengths.map((item, i) => {
                    const Icon = iconRegistry[item.iconKey] || FaBuilding;
                    const isActive = activeStrength === i;
                    return (
                      <Reveal key={item.title} delay={i * 0.08}>
                        <button
                          type="button"
                          onClick={() => setActiveStrength(isActive ? -1 : i)}
                          className={`group block w-full text-left transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-[0_20px_60px_-15px_rgba(22,163,74,0.35)]"
                              : "bg-white border border-slate-100 hover:border-green-100 hover:shadow-lg"
                          }`}
                        >
                          <div className="flex items-start gap-5 p-6 lg:p-8">
                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center text-xl transition-all duration-500 ${
                              isActive ? "bg-white/20 text-white" : "bg-green-50 text-green-600 group-hover:bg-green-100"
                            }`}>
                              <Icon />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-4">
                                <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-slate-900"}`}>
                                  {item.title}
                                </h3>
                                <span className={`text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 shrink-0 ${isActive ? "text-white/60" : "text-slate-300"}`}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <p className="mt-3 text-sm leading-relaxed text-white/80">{item.text}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              {!isActive && (
                                <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-1">{item.text}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Stats row */}
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-4 border border-slate-100">
                    {data.stats.map((item, i) => (
                      <div key={item.label} className={`group relative p-6 text-center transition-colors duration-300 hover:bg-green-50 ${i < 3 ? "border-r border-slate-100" : ""}`}>
                        <p className="text-3xl font-bold text-green-700 lg:text-4xl" style={serif}>
                          <Counter value={item.value} />
                        </p>
                        <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. VIDEO — Immersive theater section
      ═══════════════════════════════════════════════════ */}
      {embedUrl && (
        <section className="relative bg-slate-950 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(22,163,74,0.08),transparent)]" />
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />

          <div className="relative py-32 lg:py-40 px-6 lg:px-12">
            <div className="mx-auto max-w-[85rem]">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-20 items-center">
                {/* Left text */}
                <Reveal>
                  <div>
                    <div className="mb-8 h-[3px] w-16 bg-gradient-to-r from-green-500 to-green-300" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-green-400">{data.videoEyebrow}</p>
                    <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl" style={serif}>{data.videoTitle}</h2>
                    <p className="mt-6 text-base leading-relaxed text-slate-400">{data.videoText}</p>
                    <div className="mt-10 flex items-center gap-4 text-green-400">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                        <FaPlay className="ml-1 text-sm" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-[0.15em]">Watch Video</span>
                    </div>
                  </div>
                </Reveal>

                {/* Right video */}
                <Reveal delay={0.2}>
                  <div className="relative">
                    {/* Decorative frame */}
                    <div className="absolute -inset-3 border border-white/[0.06]" />
                    <div className="absolute -inset-6 border border-white/[0.03]" />
                    <div className="relative overflow-hidden bg-black shadow-[0_0_100px_rgba(22,163,74,0.1)]">
                      <div className="aspect-video">
                        <iframe
                          className="h-full w-full"
                          src={embedUrl}
                          title="About North South Group"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          4. LEADERSHIP — Premium portrait gallery
      ═══════════════════════════════════════════════════ */}
      <section id="leadership" className="relative overflow-hidden py-32 lg:py-40 px-6 lg:px-12">
        {/* Decorative watermark */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[28vw] font-black leading-none text-slate-50 pointer-events-none select-none" style={serif}>
          NSG
        </div>
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent lg:left-12" />

        <div className="relative mx-auto max-w-[90rem]">
          <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-green-700">{data.leadershipEyebrow}</p>
                <h2 className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.05] text-slate-900" style={serif}>
                  {data.leadershipTitle}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-500">{data.leadershipText}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-3">
                <button ref={prevRef} className="group flex h-16 w-16 items-center justify-center border border-slate-200 bg-white text-slate-500 transition-all duration-400 hover:border-green-600 hover:bg-green-600 hover:text-white hover:shadow-[0_15px_40px_-10px_rgba(22,163,74,0.4)]" aria-label="Previous">
                  <IoIosArrowBack size={22} />
                </button>
                <button ref={nextRef} className="group flex h-16 w-16 items-center justify-center border border-slate-200 bg-white text-slate-500 transition-all duration-400 hover:border-green-600 hover:bg-green-600 hover:text-white hover:shadow-[0_15px_40px_-10px_rgba(22,163,74,0.4)]" aria-label="Next">
                  <IoIosArrowForward size={22} />
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              spaceBetween={24}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onSwiper={setSwiperInstance}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1400: { slidesPerView: 4 } }}
              className="!pb-16"
            >
              {data.leaders.map((leader, idx) => (
                <SwiperSlide key={leader.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedLeader(leader)}
                    className="group block w-full text-left"
                    aria-label={`View ${leader.name}`}
                  >
                    <div className="relative overflow-hidden bg-slate-50">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img src={leader.img} alt={leader.name} className="h-full w-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110" />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-700 group-hover:translate-y-0">
                        <span className="inline-block border border-white/30 bg-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                          View Profile
                        </span>
                      </div>
                    </div>
                    <div className="p-6 bg-white border-x border-b border-slate-100">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900" style={serif}>{leader.name}</h3>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">{leader.role}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-200">{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. CSR — Masonry bento gallery
      ═══════════════════════════════════════════════════ */}
      <section className="relative bg-[#f8f7f4] py-32 lg:py-40 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(22,163,74,0.04),transparent_40%)]" />

        <div className="relative mx-auto max-w-[90rem]">
          <Reveal>
            <div className="mb-20 flex flex-col items-center text-center">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-green-500" />
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-green-700">{data.csrEyebrow}</p>
                <div className="h-px w-12 bg-green-500" />
              </div>
              <h2 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl" style={serif}>{data.csrTitle}</h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500">{data.csrText}</p>
            </div>
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-[repeat(2,260px)] lg:gap-4">
            {data.csrImages.slice(0, 8).map((item, i) => {
              const span = i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : "";
              return (
                <Reveal key={item.id || item.title} delay={i * 0.04}>
                  <button
                    type="button"
                    onClick={() => setSelectedCsrImage(item)}
                    className={`group relative h-full w-full overflow-hidden ${span}`}
                    aria-label={`View ${item.title}`}
                  >
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 text-left transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-green-400">{data.csrEyebrow}</p>
                      <h3 className="mt-1 text-sm font-bold text-white">{item.title}</h3>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. MISSION / VISION / PROMISE — Dark with typography
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 py-32 lg:py-40 px-6 lg:px-12">
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(22,163,74,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-[90rem]">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-green-400">What Drives Us</p>
              <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl" style={serif}>The Foundation We Build On</h2>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {data.missionCards.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.15}>
                <div className="group relative h-full overflow-hidden border border-white/[0.05] bg-white/[0.02] p-10 lg:p-12 transition-all duration-700 hover:border-green-500/20 hover:bg-white/[0.04]">
                  {/* Giant number */}
                  <div className="absolute -right-6 -top-10 text-[12rem] font-black leading-none text-white/[0.015] transition-colors duration-700 group-hover:text-green-500/[0.06]" style={serif}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative">
                    <div className="mb-8 h-[3px] w-12 bg-gradient-to-r from-green-500 to-green-300 transition-all duration-500 group-hover:w-20" />
                    <FaCheckCircle className="mb-6 text-2xl text-green-500" />
                    <h3 className="text-3xl font-bold text-white lg:text-4xl" style={serif}>{item.title}</h3>
                    <p className="mt-6 text-base leading-[2] text-slate-400">{item.text}</p>
                  </div>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedLeader(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedLeader(null)} className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center bg-white text-slate-600 shadow-lg transition-all hover:bg-slate-50" aria-label="Close">
                <FaTimes />
              </button>
              <div className="grid md:grid-cols-[1fr_1.2fr]">
                <div className="relative min-h-[400px] overflow-hidden">
                  <img src={selectedLeader.img} alt={selectedLeader.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-10 lg:p-14">
                  <div className="mb-6 h-[3px] w-12 bg-green-500" />
                  <h3 className="text-3xl font-bold text-slate-900" style={serif}>{selectedLeader.name}</h3>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-green-600">{selectedLeader.role}</p>
                  {(selectedLeader.description || selectedLeader.text) && (
                    <>
                      <div className="my-8 h-px bg-slate-100" />
                      <div className="relative pl-8">
                        <FaQuoteLeft className="absolute left-0 top-0 text-xl text-slate-200" />
                        <p className="text-base leading-[1.9] text-slate-600">{selectedLeader.description || selectedLeader.text}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCsrImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedCsrImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedCsrImage(null)} className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center bg-black/40 text-white backdrop-blur transition hover:bg-black/70" aria-label="Close">
                <FaTimes />
              </button>
              <img src={selectedCsrImage.img} alt={selectedCsrImage.title} className="max-h-[75vh] w-full bg-slate-100 object-contain" />
              <div className="p-8 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-600">{data.csrEyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900" style={serif}>{selectedCsrImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AboutUs;
