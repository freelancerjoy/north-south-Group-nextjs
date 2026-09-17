import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiMapPin, FiPause, FiPlay, FiShield, FiSun, FiWind, FiX } from "react-icons/fi";
import { ContactSection } from "./ConcernPageTemplate";
import styles from "./NirapadValleyLuxury.module.css";

const photo = (id, width = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const architecture = photo("photo-1758193431351-68538bf55ec3");
const interior = photo("photo-1600607687939-ce8a6c25118c");
const residence = photo("photo-1600585154340-be6161a56a0c");
const palette = { darkGradient: "from-[#142b24] via-[#142b24] to-[#213d32]", accentText: "text-[#0f7771]", accentBg: "bg-[#edf7f4]", accentBorder: "border-[#0f7771]/30", buttonGradient: "from-[#0f7771] to-[#0b625d]" };
const lifestyle = [
  { title: "Architecture with intention", text: "Thoughtful residential planning, open perspectives, and a sense of belonging.", image: architecture },
  { title: "Room to slow down", text: "Light-filled interiors and a quieter setting for the moments that matter.", image: interior },
  { title: "Closer to nature", text: "Green surroundings bring a welcome balance to the rhythm of everyday life.", image: residence },
];

export default function NirapadValleyLuxury({ title = "Nirapad Valley Condominium Project", subtitle, heroImage, heroSliderImages = [], aboutImage, aboutTitle, aboutParagraphs = [], galleryImages = [], stats = [], services = [], features = [], highlights = [] }) {
  const slides = [...new Set([...heroSliderImages, heroImage, architecture, residence, interior].filter(Boolean))];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const gallery = [...new Set([...galleryImages, architecture, interior, residence].filter(Boolean))].slice(0, 6);
  const cards = services.some((item) => item.image) ? services : lifestyle;
  const advantages = features.some((item) => item.image) ? features : highlights.filter((item) => !["Reliable", "Professional", "Future-ready", "Client-focused"].includes(item.title));

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
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [lightbox, gallery.length]);

  const changeSlide = (direction) => setCurrent((value) => (value + direction + slides.length) % slides.length);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="Nirapad Valley residences" aria-roledescription="carousel">
        {slides.map((src, index) => <img key={src} src={src} alt={`${title} — residential inspiration ${index + 1}`} className={`${styles.heroImage} ${index === current ? styles.active : ""}`} aria-hidden={index !== current} fetchPriority={index === 0 ? "high" : "auto"} />)}
        <div className={styles.shade} />
        <div className={styles.heroTop}><span> NORTH SOUTH GROUP</span><span><FiMapPin /> PURBACHAL, BANGLADESH</span></div>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>A quieter kind of luxury</span>
          <h1>{title}</h1>
          <p>{subtitle || "An address shaped by nature. A lifestyle defined by thoughtful living."}</p>
          <a className={styles.heroLink} href="#valley-overview">Discover the valley <FiArrowDown /></a>
        </div>
        <div className={styles.sliderControls}>
          <span className={styles.slideCount}>{String(current + 1).padStart(2, "0")} <span>/ {String(slides.length).padStart(2, "0")}</span></span>
          <button onClick={() => changeSlide(-1)} aria-label="Previous slide"><FiChevronLeft /></button>
          <button onClick={() => changeSlide(1)} aria-label="Next slide"><FiChevronRight /></button>
          <button onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <FiPlay /> : <FiPause />}</button>
        </div>
      </section>

      <nav className={styles.projectNav} aria-label="Project sections"><span>NIRAPAD <em>VALLEY</em></span><div><a href="#valley-overview">The vision</a><a href="#valley-lifestyle">Lifestyle</a><a href="#valley-gallery">Gallery</a></div><a href="#concern-contact" className={styles.enquire}>Enquire now <FiArrowUpRight /></a></nav>

      <section id="valley-overview" className={`${styles.section} ${styles.overview}`}>
        <div className={styles.overviewVisual}><img src={aboutImage || architecture} alt="Light-filled residential architecture" loading="lazy" /><div className={styles.imageNote}><span>THE NIRAPAD VALLEY VISION</span><p>A place to call home.<br />A feeling to come home to.</p></div></div>
        <div className={styles.overviewCopy}><span className={styles.eyebrow}>An exceptional everyday</span><h2>{aboutTitle || "Where nature meets refined living."}</h2><div className={styles.accentRule} />{(aboutParagraphs.length ? aboutParagraphs : ["Discover a thoughtfully planned residential destination that brings greenery, community, and daily comfort together."]).map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a className={styles.textLink} href="#concern-contact">Find your future address <FiArrowUpRight /></a></div>
      </section>

      <div className={styles.values}>{(stats.length ? stats : [{ value: "Green", label: "Surroundings" }, { value: "Planned", label: "Community" }, { value: "Connected", label: "Living" }]).map((stat, index) => <div key={index}><span className={styles.valueNumber}>0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

      <section id="valley-lifestyle" className={styles.section}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Life, beautifully considered</span><h2>Space for a better<br /><em>way of living.</em></h2></div><p>A little more calm. A little more connection.<br />Discover the details that make an address feel like home.</p></div><div className={styles.lifestyleGrid}>{cards.map((card, index) => <article className={styles.lifestyleCard} key={index}><div className={styles.cardImage}><img src={card.image || lifestyle[index % lifestyle.length].image} alt={card.title} loading="lazy" /><span>0{index + 1}</span></div><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>

      <section className={styles.statement}><img src={architecture} alt="Contemporary residential building with green balconies" loading="lazy" /><div><span className={styles.eyebrow}>Rooted in nature. Connected to life.</span><h2>Your own retreat.<br /><em>Every single day.</em></h2><a href="#concern-contact" className={styles.heroLink}>Begin your next chapter <FiArrowUpRight /></a></div></section>

      <section className={`${styles.section} ${styles.details}`}><div><span className={styles.eyebrow}>Thoughtful by design</span><h2>Comfort in<br /><em>every detail.</em></h2><p>Discover the project vision and talk with our team about the features, plans, and opportunities available.</p></div><div className={styles.detailGrid}>{(advantages.length ? advantages.slice(0, 4) : [{ title: "A sense of security", text: "Community planning with everyday peace of mind at its heart." }, { title: "Natural surroundings", text: "A greener setting for a more balanced residential lifestyle." }, { title: "Thoughtful planning", text: "An organized approach to space, access, and daily convenience." }, { title: "A connected address", text: "Explore the possibilities of living in the Purbachal area." }]).map((item, index) => { const Icon = [FiShield, FiSun, FiWind, FiMapPin][index % 4]; return <article key={index}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>

      <section id="valley-gallery" className={`${styles.section} ${styles.gallerySection}`}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>A glimpse of the possibilities</span><h2>The valley <em>collection.</em></h2></div><p>Architecture, interiors, and green living.<br />Select an image to explore.</p></div><div className={styles.gallery}>{gallery.map((src, index) => <button key={src} onClick={() => setLightbox(index)} aria-label={`Open residential image ${index + 1}`}><img src={src} alt={`Residential architecture and lifestyle inspiration ${index + 1}`} loading="lazy" /><span>Explore image <FiArrowUpRight /></span></button>)}</div><p className={styles.galleryNote}>Lifestyle and architectural imagery is illustrative. Please contact our team for current project photographs and specifications. <a href="https://unsplash.com/id/foto/bangunan-apartemen-modern-dengan-balkon-dan-tanaman-hijau-B9OMpxCdrlc" target="_blank" rel="noreferrer">Architectural photograph: Aalo Lens / Unsplash</a></p></section>

      <div className={styles.contact}><ContactSection theme={palette} title="Your next chapter starts here." description="Tell us what you are looking for. Our team will guide you through the project details and available opportunities." buttonLabel="Send enquiry" ctaTitle="Let’s find your place in the valley." ctaText="Connect with North South Group to learn more about Nirapad Valley Condominium Project." /></div>

      {lightbox !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Residential image viewer" onClick={() => setLightbox(null)}><button autoFocus className={styles.close} onClick={() => setLightbox(null)} aria-label="Close image viewer"><FiX /></button><button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }} aria-label="Previous image"><FiChevronLeft /></button><img src={gallery[lightbox]} alt="Residential architecture inspiration enlarged" onClick={(event) => event.stopPropagation()} /><button onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label="Next image"><FiChevronRight /></button></div>}
    </main>
  );
}
