import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useCommercialProjectStore } from "../../store/commercialProject/commercialProjectStore";

/* ---------------------------------------------------------
   North South Group Signature Luxury Palette
   Canvas Deep    : #0E231C (Deep Forest Jade)
   Surface Dark   : #15342B (Subtle Pine Stone)
   Surface Raised : #1C4438 (Elevated Moss Container)
   Brand Accent   : #9EBC3A (Signature Olive-Lime Glow)
   Gold Accent    : #C5A869 (Warm Champagne Gold)
   Linen Light    : #F5F2EB (Warm Alabaster Typography)
   Sage Muted     : #B2C0B9 (Soft Cashmere Gray)
----------------------------------------------------------- */

const heroSliderImages = [
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    caption: "Tower Exterior Perspective",
    tag: "25 Stories Landmark",
  },
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    caption: "Parametric Glazed Facade",
    tag: "Double-Glazed Low-E Glass",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    caption: "Executive Corporate Suites",
    tag: "Column-Free Modular Layout",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    caption: "Sky Lounge & Terrace Level",
    tag: "Panoramic Rooftop Deck",
  },
];

const floorPlans = [
  {
    level: "Levels 04–12",
    title: "Corporate Enterprise Suites",
    area: "18,500 Sq.Ft",
    ceiling: "4.2m Height",
    layout: "Column-free modular grid",
  },
  {
    level: "Levels 13–20",
    title: "Executive Headquarters",
    area: "22,000 Sq.Ft",
    ceiling: "4.8m Height",
    layout: "360° Panoramic glass perimeter",
  },
  {
    level: "Levels 21–24",
    title: "Crown Penthouse Offices",
    area: "14,200 Sq.Ft",
    ceiling: "6.0m Double Height",
    layout: "Private sky garden & boardroom",
  },
];

const luxuryAmenities = [
  {
    icon: "⚡",
    title: "100% Power Redundancy",
    desc: "Dual-source grid interconnectivity alongside synchronized tier-1 diesel generators.",
  },
  {
    icon: "🛗",
    title: "Destination-Dispatch Lifts",
    desc: "8 high-speed vertical units (4 m/s) with AI floor-optimization algorithms.",
  },
  {
    icon: "🌿",
    title: "LEED Gold Certified",
    desc: "Low-E facade insulation, integrated solar harvesting, and greywater recycling.",
  },
  {
    icon: "🛡️",
    title: "Multi-Tier Access Control",
    desc: "Biometric tourniquets, license-plate recognition, and 24/7 concierge security.",
  },
  {
    icon: "🚗",
    title: "Automated Basement Parking",
    desc: "450+ secure multi-level bays featuring dedicated EV high-power fast charging.",
  },
  {
    icon: "🍸",
    title: "Sky Lounge & Boardrooms",
    desc: "Private level-24 executive meeting facilities with dedicated culinary services.",
  },
];

const CommercialProject = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFloor, setActiveFloor] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const { commercialProject: data, loadCommercialProject, isLoading } =
    useCommercialProjectStore();

  useEffect(() => {
    loadCommercialProject();
  }, [loadCommercialProject]);

  // Fast and smooth auto-slide interval (3.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const heroTitle = data?.heroTitle || "ZENITH";
  const heroSubtitle = data?.heroSubtitle || "TOWER";
  const heroBadge = data?.heroBadge || "Grade A+ Commercial Landmark";

  const overviewImg = data?.overviewImage?.url || heroSliderImages[1].url;
  const architectureImg1 =
    data?.architectureImage1?.url || heroSliderImages[0].url;
  const architectureImg2 =
    data?.architectureImage2?.url || heroSliderImages[2].url;

  const galleryImages =
    data?.galleryImages?.length > 0
      ? data.galleryImages.map((img) => ({
          src: img.url,
          title: img.title || "Architectural Detail",
        }))
      : [
          { src: heroSliderImages[1].url, title: "Parametric Glazed Facade" },
          {
            src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
            title: "Triple-Height Grand Atrium",
          },
          { src: heroSliderImages[2].url, title: "Executive Floor Span" },
          {
            src: heroSliderImages[3].url,
            title: "Skyline Lounge & Boardroom",
          },
          {
            src: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop",
            title: "Nocturnal Illumination",
          },
        ];

  const specs =
    data?.specs?.length > 0
      ? data.specs
      : [
          { label: "Site Footprint", value: "45 Katha Prime" },
          { label: "Total Gross Area", value: "500,000 Sq.Ft" },
          { label: "Structure", value: "3B + Ground + 24 Floors" },
          { label: "Floor-to-Ceiling", value: "4.2m Clear Height" },
          { label: "Automated Parking", value: "450 Executive Bays" },
          { label: "Vertical Transit", value: "8 High-Speed (4 m/s)" },
          { label: "Green Standard", value: "LEED Gold Certified" },
          { label: "Project Handover", value: "Q4 2028" },
        ];

  if (isLoading) {
    return (
      <div className="bg-[#0E231C] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#9EBC3A]/20 border-t-[#9EBC3A] animate-spin" />
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A]">
            Loading Project Dossier...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0E231C] text-[#F5F2EB] min-h-screen selection:bg-[#9EBC3A] selection:text-[#0E231C] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .font-serif-luxury { font-family: 'Cormorant Garamond', serif; }
        .font-tech { font-family: 'Space Grotesk', sans-serif; }
        .ns-gold-text {
          background: linear-gradient(135deg, #F5F2EB 0%, #C5A869 50%, #9EBC3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* 1. FAST SMOOTH SLIDER WITH CLEAR VIEW & BOTTOM-LEFT HIGHLIGHT */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[720px] flex items-end justify-start overflow-hidden"
      >
        {/* Crystal Clear Image Container */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroSliderImages[currentSlide].url}
                alt={heroSliderImages[currentSlide].caption}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Targeted Vignette Only at Top and Bottom to Preserve Clear Architecture Center */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E231C]/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#0E231C] via-[#0E231C]/60 to-transparent pointer-events-none" />
        </div>

        {/* Top-Right Badge Indicator */}
        <div className="absolute top-28 right-6 md:right-14 z-20 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-[#9EBC3A]/40 bg-[#0E231C]/70 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#9EBC3A] animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] uppercase text-[#F5F2EB]/90">
            {heroBadge}
          </span>
        </div>

        {/* Minimal Bottom-Left Highlight */}
        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 max-w-2xl px-6 md:px-14 pb-14 md:pb-16 flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#9EBC3A]" />
            <span className="font-tech text-xs tracking-[0.3em] uppercase text-[#9EBC3A] font-semibold">
              {heroSliderImages[currentSlide].tag}
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-7xl leading-tight text-[#F5F2EB] uppercase mb-2">
            {heroTitle}{" "}
            <span className="font-light italic ns-gold-text">
              {heroSubtitle}
            </span>
          </h1>

          <p className="font-tech text-sm md:text-base text-[#B2C0B9] max-w-lg mb-6 tracking-wide">
            {heroSliderImages[currentSlide].caption}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#inquire"
              className="font-tech px-7 py-3 bg-[#9EBC3A] text-[#0E231C] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#C5A869] transition duration-300 shadow-[0_0_20px_rgba(158,188,58,0.3)]"
            >
              Acquire Floorplate
            </a>
            <a
              href="#floorplans"
              className="font-tech px-7 py-3 border border-[#9EBC3A]/40 bg-[#15342B]/60 backdrop-blur-md text-[#F5F2EB] text-xs uppercase tracking-[0.2em] rounded-full hover:border-[#9EBC3A] hover:text-[#9EBC3A] transition duration-300"
            >
              Floorplans
            </a>
          </div>
        </motion.div>

        {/* Bottom-Right Fast Slide Indicators */}
        <div className="absolute bottom-10 right-6 md:right-14 z-20 flex items-center gap-3 bg-[#0E231C]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {heroSliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? "w-8 bg-[#9EBC3A]"
                  : "w-2.5 bg-[#B2C0B9]/40 hover:bg-[#B2C0B9]"
              }`}
            />
          ))}
           
        </div>
      </section>

      {/* 2. STATS BAR */}
      <div className="border-y border-[#1C4438] bg-[#15342B] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif-luxury text-3xl md:text-4xl ns-gold-text">
              25
            </p>
            <p className="font-tech text-xs tracking-widest text-[#B2C0B9] uppercase mt-1">
              Stories Monument
            </p>
          </div>
          <div>
            <p className="font-serif-luxury text-3xl md:text-4xl text-[#F5F2EB]">
              500K
            </p>
            <p className="font-tech text-xs tracking-widest text-[#B2C0B9] uppercase mt-1">
              Sq.Ft Usable Space
            </p>
          </div>
          <div>
            <p className="font-serif-luxury text-3xl md:text-4xl ns-gold-text">
              LEED
            </p>
            <p className="font-tech text-xs tracking-widest text-[#B2C0B9] uppercase mt-1">
              Gold Standard
            </p>
          </div>
          <div>
            <p className="font-serif-luxury text-3xl md:text-4xl text-[#F5F2EB]">
              100%
            </p>
            <p className="font-tech text-xs tracking-widest text-[#B2C0B9] uppercase mt-1">
              Power Redundancy
            </p>
          </div>
        </div>
      </div>

      {/* 3. ARCHITECTURAL OVERVIEW */}
      <section className="py-28 md:py-36 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-px bg-[#9EBC3A]" />
              <span className="font-tech text-xs tracking-[0.3em] uppercase text-[#9EBC3A]">
                Design Philosophy
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-[#F5F2EB] leading-tight">
              An Icon Crafted for <br />
              <span className="italic font-light ns-gold-text">
                Global Industry Leaders
              </span>
            </h2>
            <p className="text-[#B2C0B9] leading-relaxed font-light text-base md:text-lg">
              Zenith Tower stands at the intersection of structural grace and high-yield efficiency. Designed with double-glazed acoustic curtain walls and dynamic air purification, creating an optimal setting for executive productivity.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#1C4438]">
              <div>
                <h4 className="font-tech text-sm uppercase tracking-wider text-[#F5F2EB]">
                  Zero Column Spans
                </h4>
                <p className="text-xs text-[#B2C0B9] mt-1 font-light">
                  Maximized open layout planning with 360° natural sunlight penetration.
                </p>
              </div>
              <div>
                <h4 className="font-tech text-sm uppercase tracking-wider text-[#F5F2EB]">
                  Thermal Control
                </h4>
                <p className="text-xs text-[#B2C0B9] mt-1 font-light">
                  Energy-optimized low-E glass facade reducing UV heat load significantly.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#1C4438] group">
              <img
                src={overviewImg}
                alt="Overview"
                className="w-full h-[520px] object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#15342B]/85 backdrop-blur-md border border-[#1C4438]">
                <p className="font-tech text-xs uppercase tracking-widest text-[#9EBC3A]">
                  Master Architecture
                </p>
                <p className="font-serif-luxury text-2xl text-[#F5F2EB] mt-1">
                  Triple-Glazed Panoramic Curtain Walls
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPANDED FEATURE: AMENITIES & INFRASTRUCTURE */}
      <section className="py-24 bg-[#15342B] border-y border-[#1C4438]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-tech text-xs tracking-[0.3em] uppercase text-[#9EBC3A] block mb-2">
              World-Class Facilities
            </span>
            <h2 className="font-serif-luxury text-4xl md:text-5xl text-[#F5F2EB]">
              Corporate Infrastructure & Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {luxuryAmenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0E231C] border border-[#1C4438] hover:border-[#9EBC3A]/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#15342B] border border-[#1C4438] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {amenity.icon}
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB] mb-2 group-hover:text-[#9EBC3A] transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-sm text-[#B2C0B9] font-light leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLOOR PLANS / BLUEPRINTS */}
      <section id="floorplans" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-tech text-xs tracking-[0.3em] uppercase text-[#9EBC3A] block mb-2">
            Space Allocation
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl text-[#F5F2EB]">
            Bespoke Commercial Floorplates
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            {floorPlans.map((plan, idx) => (
              <div
                key={plan.level}
                onClick={() => setActiveFloor(idx)}
                className={`p-6 rounded-xl cursor-pointer border transition-all duration-300 ${
                  activeFloor === idx
                    ? "bg-[#1C4438] border-[#9EBC3A] shadow-[0_0_25px_rgba(158,188,58,0.15)]"
                    : "bg-[#15342B] border-[#1C4438] hover:border-[#9EBC3A]/50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-tech text-xs uppercase tracking-widest text-[#9EBC3A]">
                    {plan.level}
                  </span>
                  <span className="font-tech text-xs text-[#B2C0B9]">
                    {plan.area}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB] mb-2">
                  {plan.title}
                </h3>
                <p className="text-xs text-[#B2C0B9]">
                  {plan.layout} • {plan.ceiling}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#1C4438] bg-[#15342B] p-8 text-center">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop"
                alt="Blueprint Plan"
                className="w-full h-[380px] object-cover rounded-lg filter invert opacity-75"
              />
              <div className="mt-6 flex justify-between items-center text-left border-t border-[#1C4438] pt-4">
                <div>
                  <p className="font-tech text-xs uppercase text-[#9EBC3A]">
                    Active Schematic
                  </p>
                  <p className="font-serif-luxury text-xl text-[#F5F2EB]">
                    {floorPlans[activeFloor].title}
                  </p>
                </div>
                <a
                  href="#inquire"
                  className="font-tech text-xs uppercase tracking-widest text-[#9EBC3A] hover:underline"
                >
                  Request CAD Files ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUAL ARCHITECTURAL SHOWCASE */}
      <section className="grid lg:grid-cols-2 border-y border-[#1C4438]">
        <div className="relative h-[540px] overflow-hidden group">
          <img
            src={architectureImg1}
            alt="Facade Detail"
            className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/95 via-[#0E231C]/30 to-transparent p-12 flex flex-col justify-end">
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A]">
              Material Selection
            </span>
            <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#F5F2EB] mt-1">
              Anodized Framing & Travertine Accents
            </h3>
            <p className="text-sm text-[#B2C0B9] mt-2 max-w-md font-light">
              Sustainable materials engineered to withstand ambient weathering while reflecting changing daylight hues.
            </p>
          </div>
        </div>

        <div className="relative h-[540px] overflow-hidden group border-t lg:border-t-0 lg:border-l border-[#1C4438]">
          <img
            src={architectureImg2}
            alt="Interior Executive"
            className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E231C]/95 via-[#0E231C]/30 to-transparent p-12 flex flex-col justify-end">
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A]">
              Spatial Experience
            </span>
            <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#F5F2EB] mt-1">
              Column-Free Executive Headquarters
            </h3>
            <p className="text-sm text-[#B2C0B9] mt-2 max-w-md font-light">
              Engineered for seamless spatial modularity, optimal acoustics, and personalized climate zoning.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL SPECIFICATIONS MATRIX */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-tech text-xs tracking-[0.3em] uppercase text-[#9EBC3A] block mb-2">
            Technical Dossier
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl text-[#F5F2EB]">
            Engineering Specifications
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-[#15342B] p-8 rounded-xl border border-[#1C4438] hover:border-[#9EBC3A]/50 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9EBC3A] block mb-4" />
              <p className="font-tech text-xs uppercase tracking-widest text-[#B2C0B9] mb-2">
                {spec.label}
              </p>
              <p className="font-serif-luxury text-2xl text-[#F5F2EB]">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CURATED GALLERY */}
      <section className="py-24 bg-[#15342B] border-t border-[#1C4438]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A] block mb-2">
                Visual Showcase
              </span>
              <h2 className="font-serif-luxury text-4xl md:text-5xl text-[#F5F2EB]">
                Project Gallery
              </h2>
            </div>
            <span className="font-tech text-xs text-[#B2C0B9] uppercase tracking-widest hidden md:block">
              Click to Expand
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative rounded-xl overflow-hidden border border-[#1C4438] cursor-pointer group ${
                  idx === 0
                    ? "md:col-span-2 md:row-span-2 h-[500px]"
                    : "h-[238px]"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0E231C]/40 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-tech text-xs uppercase tracking-widest text-[#F5F2EB] drop-shadow-md">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-[#0E231C]/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button className="absolute top-8 right-8 text-[#F5F2EB] font-tech text-sm tracking-widest uppercase hover:text-[#9EBC3A]">
              Close [ESC]
            </button>
            <img
              src={selectedImage.src}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-[#1C4438]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. INQUIRY / PRIVATE APPOINTMENT CTA */}
      <section
        id="inquire"
        className="py-32 relative bg-gradient-to-b from-[#15342B] to-[#0E231C] border-t border-[#1C4438] text-center"
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="font-tech text-xs uppercase tracking-[0.35em] text-[#9EBC3A] block mb-4">
            Confidential Allocation
          </span>
          <h2 className="font-serif-luxury text-5xl md:text-7xl text-[#F5F2EB] mb-6">
            Schedule a Private Presentation
          </h2>
          <p className="text-[#B2C0B9] font-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Direct discussions for full floorplate acquisition, naming rights, and customized architectural provisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="font-tech w-full sm:w-auto px-10 py-4 bg-[#9EBC3A] text-[#0E231C] font-semibold text-xs uppercase tracking-[0.25em] rounded-full hover:bg-[#C5A869] transition duration-300 shadow-[0_0_30px_rgba(158,188,58,0.25)]"
            >
              Contact Sales Advisory
            </Link>
            <a
              href="tel:+8801894801923"
              className="font-tech w-full sm:w-auto px-10 py-4 border border-[#9EBC3A]/40 text-[#F5F2EB] font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:border-[#9EBC3A] hover:text-[#9EBC3A] transition duration-300"
            >
              Direct Line: +880 1894-801-923
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialProject;