import { useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiPause,
  FiPlay,
  FiShield,
  FiSun,
  FiTruck,
  FiWind,
  FiX,
} from "react-icons/fi";
import { ContactSection } from "./ConcernPageTemplate";
import styles from "./NirapadValleyLuxury.module.css";

const palette = {
  darkGradient: "from-[#142b24] via-[#142b24] to-[#213d32]",
  accentText: "text-[#0f7771]",
  accentBg: "bg-[#edf7f4]",
  accentBorder: "border-[#0f7771]/30",
  buttonGradient: "from-[#0f7771] to-[#0b625d]",
};

const icons = [FiShield, FiSun, FiWind, FiBriefcase, FiTruck, FiHome];

export default function ConcernLuxuryPage({
  title,
  subtitle,
  eyebrow,
  heroImage,
  heroSliderImages = [],
  aboutImage,
  aboutTitle,
  aboutParagraphs = [],
  stats = [],
  services = [],
  servicesTitle,
  servicesDescription,
  highlights = [],
  highlightsTitle,
  highlightsDescription,
  galleryImages = [],
  processItems = [],
  ctaTitle,
  ctaText,
  navLabel,
  locationLabel = "NORTH SOUTH GROUP",
  imageNoteTitle = "THE VISION",
  imageNoteText = "Built with purpose.\nDesigned for trust.",
  statementTitle = "A stronger future.\nBeautifully considered.",
  statementEyebrow = "Purpose, precision, and long-term value",
  galleryTitle,
}) {
  const fallbackHero = heroImage || services[0]?.image || aboutImage;
  const slides = [...new Set([...heroSliderImages, fallbackHero, aboutImage, ...services.map((item) => item.image)].filter(Boolean))].slice(0, 6);
  const gallery = [...new Set([...galleryImages, ...slides, ...services.map((item) => item.image)].filter(Boolean))].slice(0, 8);
  const cards = services.length ? services : highlights.slice(0, 3);
  const detailItems = highlights.length ? highlights : processItems.map((text, index) => ({ title: `Step ${index + 1}`, text }));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (paused || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  useEffect(() => {
    if (lightbox === null) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((value) => (value + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((value) => (value - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, gallery.length]);

  const changeSlide = (direction) => setCurrent((value) => (value + direction + slides.length) % slides.length);
  const noteLines = String(imageNoteText).split("\n");

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label={`${title} visual story`} aria-roledescription="carousel">
        {slides.map((src, index) => (
          <img key={src} src={src} alt={`${title} visual ${index + 1}`} className={`${styles.heroImage} ${index === current ? styles.active : ""}`} aria-hidden={index !== current} fetchPriority={index === 0 ? "high" : "auto"} />
        ))}
        <div className={styles.shade} />
        <div className={styles.heroTop}><span>NORTH SOUTH GROUP</span><span>{locationLabel}</span></div>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <a className={styles.heroLink} href="#concern-overview">Explore the vision <FiArrowDown /></a>
        </div>
        <div className={styles.sliderControls}>
          <span className={styles.slideCount}>{String(current + 1).padStart(2, "0")} <span>/ {String(slides.length).padStart(2, "0")}</span></span>
          <button onClick={() => changeSlide(-1)} aria-label="Previous slide"><FiChevronLeft /></button>
          <button onClick={() => changeSlide(1)} aria-label="Next slide"><FiChevronRight /></button>
          <button onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <FiPlay /> : <FiPause />}</button>
        </div>
      </section>

      <nav className={styles.projectNav} aria-label="Concern sections"><span>{navLabel || title} <em>VISION</em></span><div><a href="#concern-overview">The vision</a><a href="#concern-services">Focus</a><a href="#concern-gallery">Gallery</a></div><a href="#concern-contact" className={styles.enquire}>Enquire now <FiArrowUpRight /></a></nav>

      <section id="concern-overview" className={`${styles.section} ${styles.overview}`}>
        <div className={styles.overviewVisual}><img src={aboutImage || slides[0]} alt={`${title} overview`} loading="lazy" /><div className={styles.imageNote}><span>{imageNoteTitle}</span><p>{noteLines.map((line, index) => <span key={index}>{line}{index < noteLines.length - 1 && <br />}</span>)}</p></div></div>
        <div className={styles.overviewCopy}><span className={styles.eyebrow}>A refined North South concern</span><h2>{aboutTitle}</h2><div className={styles.accentRule} />{aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a className={styles.textLink} href="#concern-contact">Start a conversation <FiArrowUpRight /></a></div>
      </section>

      <div className={styles.values}>{stats.map((stat, index) => <div key={index}><span className={styles.valueNumber}>0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

      <section id="concern-services" className={styles.section}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Focused capabilities</span><h2>{servicesTitle || "Built around\nmeaningful work."}</h2></div><p>{servicesDescription}</p></div><div className={styles.lifestyleGrid}>{cards.slice(0, 3).map((card, index) => <article className={styles.lifestyleCard} key={index}><div className={styles.cardImage}><img src={card.image || slides[index % slides.length]} alt={card.title} loading="lazy" /><span>0{index + 1}</span></div><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>

      <section className={styles.statement}><img src={slides[1] || slides[0]} alt={`${title} statement`} loading="lazy" /><div><span className={styles.eyebrow}>{statementEyebrow}</span><h2>{statementTitle.split("\n").map((line, index) => <span key={index}>{line}{index < statementTitle.split("\n").length - 1 && <br />}</span>)}</h2><a href="#concern-contact" className={styles.heroLink}>Connect with us <FiArrowUpRight /></a></div></section>

      <section className={`${styles.section} ${styles.details}`}><div><span className={styles.eyebrow}>Why it matters</span><h2>{highlightsTitle || "Confidence in\nevery detail."}</h2><p>{highlightsDescription}</p></div><div className={styles.detailGrid}>{detailItems.slice(0, 6).map((item, index) => { const Icon = icons[index % icons.length]; return <article key={index}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>

      <section id="concern-gallery" className={`${styles.section} ${styles.gallerySection}`}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Visual identity</span><h2>{galleryTitle || "The collection."}</h2></div><p>Select an image to explore this concern's visual direction.</p></div><div className={styles.gallery}>{gallery.map((src, index) => <button key={src} onClick={() => setLightbox(index)} aria-label={`Open image ${index + 1}`}><img src={src} alt={`${title} gallery ${index + 1}`} loading="lazy" /><span>Explore image <FiArrowUpRight /></span></button>)}</div><p className={styles.galleryNote}>Imagery is used to present the concern's visual direction. Contact our team for current project photographs, availability, and specifications.</p></section>

      <div className={styles.contact}><ContactSection theme={palette} title={ctaTitle} description={ctaText} buttonLabel="Send enquiry" ctaTitle={ctaTitle} ctaText={ctaText} /></div>

      {lightbox !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onClick={() => setLightbox(null)}><button autoFocus className={styles.close} onClick={() => setLightbox(null)} aria-label="Close image viewer"><FiX /></button><button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label="Previous image"><FiChevronLeft /></button><img src={gallery[lightbox]} alt={`${title} enlarged gallery`} onClick={(event) => event.stopPropagation()} /><button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label="Next image"><FiChevronRight /></button></div>}
    </main>
  );
}
