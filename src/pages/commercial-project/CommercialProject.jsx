import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { useCommercialProjectStore } from "../../store/commercialProject/commercialProjectStore";

import fallbackImage from "../../assets/images/bannerProjectImg2.jpg";
import heroImageFallback from "../../assets/images/realEstateImg3.jpg";
import extImg1Fallback from "../../assets/images/realEstateImg1.jpg";
import extImg2Fallback from "../../assets/images/realEstateImg2.jpg";

/* ---------------------------------------------------------
   Luxury Brand Palette (Based on Logo + Cinematic Design)
   Ink         : #0A0A0A (Cinematic Dark Background)
   Ivory       : #F5F0E6 (Warm Premium Light Background)
   Brand Green : #006253 (Logo's Primary Dark Green)
   Brand Olive : #9EBC3A (Logo's Secondary Green - glowing accents)
----------------------------------------------------------- */

const Marquee = ({ text, dark = false }) => (
  <div className={`overflow-hidden py-4 border-y ${dark ? "bg-[#0A0A0A] border-white/10" : "bg-[#006253] border-black/10"}`}>
    <div className="marquee-track flex whitespace-nowrap">
      {[0, 1].map((i) => (
        <span key={i} className={`font-tech text-sm font-bold uppercase tracking-[0.3em] pr-8 ${dark ? "text-[#9EBC3A]" : "text-[#F5F0E6]"}`}>
          {Array.from({ length: 6 }).map((_, j) => (
            <span key={j} className="mx-8">{text}</span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

const SunArc = ({ title = "ZENITH" }) => (
  <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto" fill="none">
    <path d="M 20 180 A 280 280 0 0 1 580 180" stroke="#333333" strokeWidth="1.5" strokeDasharray="2 8" />
    <circle cx="300" cy="20" r="16" fill="#9EBC3A" opacity="0.25" />
    <circle cx="300" cy="20" r="10" fill="#9EBC3A" />
    <text x="300" y="70" textAnchor="middle" className="font-tech" fill="#9EBC3A" fontSize="12" letterSpacing="2">{title.toUpperCase()}</text>
    <text x="20" y="196" className="font-tech" fill="#666666" fontSize="11">SUNRISE</text>
    <text x="580" y="196" textAnchor="end" className="font-tech" fill="#666666" fontSize="11">SUNSET</text>
  </svg>
);

const CommercialProject = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const { commercialProject: data, loadCommercialProject, isLoading } = useCommercialProjectStore();

  useEffect(() => {
    loadCommercialProject();
  }, [loadCommercialProject]);

  // ── Fallback defaults (shown while loading or if no data in DB yet) ──
  const heroTitle = data?.heroTitle || "Zenith";
  const heroSubtitle = data?.heroSubtitle || "Tower";
  const heroDescription = data?.heroDescription || "";
  const heroBadge = data?.heroBadge || "Commercial Development";
  const heroMarqueeText = data?.heroMarqueeText || "Downtown BD — 25 Stories — Est. 2028 — Premium Commercial —";
  const heroImg = data?.heroImage?.url || heroImageFallback;

  const statsData = data?.stats?.length > 0
    ? data.stats
    : [
        { value: "25", label: "Stories" },
        { value: "500K", label: "Sq. Ft." },
        { value: "120", label: "Offices" },
        { value: "400+", label: "Parking" },
      ];

  const overviewTitle = data?.overviewTitle || "A Landmark\nof Excellence";
  const overviewDescription = data?.overviewDescription || "Situated in the heart of the business district, The Zenith Tower offers state-of-the-art commercial spaces designed for forward-thinking enterprises — setting a new standard for corporate environments.";
  const overviewStatusBadge = data?.overviewStatusBadge || "Ongoing";
  const overviewStatusLabel = data?.overviewStatusLabel || "Construction Status";
  const overviewImg = data?.overviewImage?.url || fallbackImage;

  const signatureSubtitle = data?.signatureSubtitle || "The Name";
  const signatureTitle = data?.signatureTitle || 'Why "Zenith"';
  const signatureDescription = data?.signatureDescription || "The zenith is the sun's highest point in the sky — the peak of light, visibility, and reach. It's the vantage point this tower was built to command.";

  const highlightsTitle = data?.highlightsTitle || "Unmatched\nFeatures";
  const highlightsSubtitle = data?.highlightsSubtitle || "Scroll to explore";
  const highlightsData = data?.highlights?.length > 0
    ? data.highlights
    : [
        { title: "Prime Location", desc: "Strategically located with excellent connectivity to major transport hubs." },
        { title: "Modern Architecture", desc: "Contemporary design with a stunning glass facade and ample natural light." },
        { title: "Premium Spaces", desc: "Flexible floor plans catering to diverse business needs and retail outlets." },
        { title: "Smart Facilities", desc: "Integrated building management systems, high-speed elevators, and smart security." },
        { title: "Sustainable Design", desc: "Energy-efficient systems, green spaces, and eco-friendly construction materials." },
        { title: "Dedicated Parking", desc: "Multi-level automated parking facility for tenants and visitors." },
      ];

  const architectureTitle = data?.architectureTitle || "Architectural\nBrilliance";
  const architectureDescription = data?.architectureDescription || "The exterior boasts a dynamic geometric design that reflects the sky, creating a visually striking landmark — with triple-height lobby ceilings and premium finishes.";
  const architectureImg1 = data?.architectureImage1?.url || extImg1Fallback;
  const workspaceTitle = data?.workspaceTitle || "Innovative\nWorkspaces";
  const workspaceDescription = data?.workspaceDescription || "Column-free office floors built for productivity and well-being, with panoramic windows framing breathtaking views of the skyline.";
  const architectureImg2 = data?.architectureImage2?.url || extImg2Fallback;

  const galleryTitle = data?.galleryTitle || "Project\nGallery";
  const galleryImagesData = data?.galleryImages?.length > 0
    ? data.galleryImages.map((img) => ({ src: img.url, title: img.title || "Project View" }))
    : [
        { src: heroImageFallback, title: "Exterior View" },
        { src: fallbackImage, title: "Modern Lobby" },
        { src: extImg1Fallback, title: "Office Space" },
        { src: extImg2Fallback, title: "Conference Hall" },
        { src: heroImageFallback, title: "Night View" },
      ];

  const videoTitle = data?.videoTitle || "Experience\nThe Zenith";
  const videoDescription = data?.videoDescription || "Watch our cinematic showcase to get a feel for the unparalleled luxury and scale of this development.";
  const videoUrl = data?.videoUrl || "";
  const videoThumbnail = data?.videoThumbnail?.url || heroImageFallback;

  const specsTitle = data?.specsTitle || "Specifications";
  const specsData = data?.specs?.length > 0
    ? data.specs
    : [
        { label: "Land Area", value: "45 Katha" },
        { label: "Built-up Area", value: "500,000 Sq. Ft." },
        { label: "Total Floors", value: "3B + G + 24F" },
        { label: "Commercial Units", value: "120 Offices" },
        { label: "Retail Spaces", value: "3 Floors" },
        { label: "Parking", value: "400+ Cars" },
        { label: "Elevators", value: "8 High-Speed" },
        { label: "Completion", value: "Q4 2028" },
      ];

  const locationTitle = data?.locationTitle || "Prime\nLocation";
  const locationDescription = data?.locationDescription || "Centrally located in the premier business district, offering unparalleled convenience for businesses, employees, and clients alike.";
  const locationBenefits = data?.locationBenefits?.length > 0
    ? data.locationBenefits
    : ["5 mins from Central Metro Station", "15 mins from International Airport", "Adjacent to 5-Star Hotels", "Walking distance to Major Banks"];
  const mapImg = data?.mapImage?.url || null;

  const ctaTitle = data?.ctaTitle || "Claim Your\nSpace Today";
  const ctaDescription = data?.ctaDescription || "Contact our sales team for detailed floor plans, pricing, and availability.";

  if (isLoading) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#9EBC3A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F5F0E6] overflow-x-hidden pt-[72px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500&display=swap');
        .font-display { font-family: 'Anton', sans-serif; }
        .font-tech { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .marquee-track { animation: marquee 26s linear infinite; width: max-content; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* 1. Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img src={heroImg} alt="Commercial Project Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
        </motion.div>

        <div className="absolute top-8 left-6 md:left-12 z-10 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9EBC3A]" />
          <span className="font-tech text-xs tracking-[0.3em] uppercase text-white">{heroBadge}</span>
        </div>

        <motion.div style={{ y: titleY }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display uppercase text-white leading-[0.85] text-[18vw] md:text-[13vw] lg:text-[11vw] tracking-tight"
          >
            {heroTitle}
            <span className="block text-[#9EBC3A]">{heroSubtitle}</span>
          </motion.h1>
          {heroDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-body font-light text-white/70 mt-6 max-w-xl text-base md:text-lg"
            >
              {heroDescription}
            </motion.p>
          )}
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Marquee text={heroMarqueeText} />
        </div>
      </section>

      {/* 2. Stat strip */}
      <section className="bg-[#006253] py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <p className="font-display text-[#F5F0E6] text-5xl md:text-6xl leading-none">{s.value}</p>
              <p className="font-tech text-[#9EBC3A] text-xs uppercase tracking-[0.25em] mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Overview */}
      <section id="overview" className="relative py-28 md:py-36 bg-[#0A0A0A]">
        <span className="font-display absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 text-[26vw] text-white/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
          ASCEND
        </span>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
            <h2 className="lg:col-span-8 font-display uppercase text-4xl md:text-6xl leading-[0.95] text-white whitespace-pre-line">
              {overviewTitle}
            </h2>
            <p className="lg:col-span-4 font-body font-light text-[#B8B3A6] leading-relaxed">
              {overviewDescription}
            </p>
          </div>

          <div className="relative h-[70vh] min-h-[420px] w-full">
            <img src={overviewImg} alt="Project Overview" className="w-full h-full object-cover" />
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#006253] text-[#F5F0E6] px-8 py-6 md:px-10 md:py-8 shadow-xl">
              <p className="font-display text-3xl md:text-4xl leading-none">{overviewStatusBadge}</p>
              <p className="font-tech text-[#9EBC3A] text-xs uppercase tracking-[0.2em] mt-2">{overviewStatusLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Arc */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-[#9EBC3A] mb-4">{signatureSubtitle}</p>
          <h2 className="font-display uppercase text-3xl md:text-4xl text-white mb-2">{signatureTitle}</h2>
          <p className="font-body font-light text-[#9C978C] max-w-xl mx-auto mb-12">
            {signatureDescription}
          </p>
          <SunArc title={heroTitle} />
        </div>
      </section>

      {/* 5. Highlights */}
      <section className="py-24 md:py-32 bg-[#F5F0E6] text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16 gap-6">
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-none whitespace-pre-line">{highlightsTitle}</h2>
            <span className="font-tech text-xs uppercase tracking-[0.25em] text-[#8A8578] hidden md:block">{highlightsSubtitle}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightsData.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-8 border border-black/10 transition-colors duration-300 ${i === 1 ? "bg-[#006253] text-[#F5F0E6]" : "bg-transparent hover:bg-white"}`}
              >
                <h3 className="font-display uppercase text-2xl mb-3">{f.title}</h3>
                <p className={`font-body font-light leading-relaxed text-sm ${i === 1 ? "text-white/80" : "text-[#4A4844]"}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Architecture Showcase */}
      <section className="relative bg-[#0A0A0A]">
        <div className="flex flex-col lg:flex-row min-h-[75vh]">
          <div className="lg:w-3/5 relative h-[50vh] lg:h-auto overflow-hidden group">
            <img src={architectureImg1} alt="Architecture Detail" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
          </div>
          <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center bg-[#006253] text-[#F5F0E6]">
            <h2 className="font-display uppercase text-3xl lg:text-4xl leading-tight mb-6 whitespace-pre-line">{architectureTitle}</h2>
            <p className="font-body leading-relaxed text-[#F5F0E6]/80">{architectureDescription}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row min-h-[75vh]">
          <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 border-white/10">
            <h2 className="font-display uppercase text-3xl lg:text-4xl leading-tight mb-6 text-white whitespace-pre-line">{workspaceTitle}</h2>
            <p className="font-body text-[#B8B3A6] font-light leading-relaxed">{workspaceDescription}</p>
          </div>
          <div className="lg:w-3/5 relative h-[50vh] lg:h-auto overflow-hidden group">
            <img src={architectureImg2} alt="Workspace Layout" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* 7. Gallery */}
      <section id="gallery" className="py-24 md:py-32 bg-[#F5F0E6] text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-display uppercase text-4xl md:text-6xl leading-none mb-16 whitespace-pre-line">{galleryTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
            {galleryImagesData.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ rotate: i % 2 === 0 ? -1 : 1, scale: 1.02 }}
                className={`relative overflow-hidden group cursor-pointer shadow-lg ${i === 0 ? "md:col-span-2 lg:row-span-2 lg:h-[616px]" : ""}`}
                onClick={() => setSelectedImage(img.src)}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#0A0A0A]/10 group-hover:bg-[#0A0A0A]/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display uppercase text-[#9EBC3A] text-2xl">View</span>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-tech text-[#F5F0E6] text-sm uppercase tracking-[0.2em]">{img.title}</h4>
                </div>
              </motion.div>
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
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-[#F5F0E6] hover:text-[#9EBC3A] p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedImage} alt="Fullscreen View" className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Video */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h2 className="font-display uppercase text-4xl md:text-6xl text-white mb-6 whitespace-pre-line">{videoTitle}</h2>
          <p className="font-body text-[#9C978C] mb-12 max-w-2xl mx-auto font-light">{videoDescription}</p>

          <div className="relative aspect-video bg-black overflow-hidden group cursor-pointer shadow-2xl">
            <img src={videoThumbnail} alt="Video Thumbnail" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              {videoUrl ? (
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="w-24 h-24 rounded-full bg-[#006253] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#F5F0E6] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#006253] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#F5F0E6] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Specifications */}
      <section className="py-24 md:py-32 bg-[#F5F0E6] text-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="font-display uppercase text-4xl md:text-6xl leading-none mb-16">{specsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0A0A0A]/10">
            {specsData.map((spec) => (
              <div key={spec.label} className="bg-[#F5F0E6] p-8">
                <p className="font-tech text-xs uppercase tracking-[0.2em] text-[#8A8578] mb-3">{spec.label}</p>
                <p className="font-display text-2xl">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Location */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display uppercase text-4xl md:text-5xl leading-none mb-8 text-white whitespace-pre-line">{locationTitle}</h2>
              <p className="font-body text-[#9C978C] leading-relaxed mb-10 font-light text-lg">{locationDescription}</p>
              <ul className="space-y-4">
                {locationBenefits.map((item) => (
                  <li key={item} className="flex items-center text-white font-body">
                    <span className="w-2 h-2 bg-[#9EBC3A] mr-4 flex-shrink-0" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[420px] bg-[#151515] relative overflow-hidden border border-white/10">
              {mapImg ? (
                <img src={mapImg} alt="Location Map" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display uppercase text-white/10 text-6xl">Map</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="relative bg-[#006253] text-[#F5F0E6] py-28 md:py-40 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] mb-8 text-white whitespace-pre-line">
            {ctaTitle}
          </h2>
          <p className="font-body text-lg font-light mb-12 max-w-xl mx-auto text-[#F5F0E6]/90">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="font-tech w-full sm:w-auto px-10 py-4 bg-[#F5F0E6] text-[#006253] hover:bg-white hover:text-[#0A0A0A] text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-lg">
              Contact Us
            </Link>
            <button className="font-tech w-full sm:w-auto px-10 py-4 border-2 border-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#006253] text-xs font-bold uppercase tracking-[0.2em] transition-colors">
              Request Details
            </button>
          </div>
        </div>
        <Marquee text={heroMarqueeText} dark />
      </section>
    </div>
  );
};

export default CommercialProject;