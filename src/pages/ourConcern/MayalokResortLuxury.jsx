import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiX, FiSun, FiWind, FiHeart, FiCompass } from "react-icons/fi";
import { ContactSection } from "./ConcernPageTemplate";
import luxury from "./NirapadValleyLuxury.module.css";
import shared from "./ConstructionLuxury.module.css";
import styles from "./MayalokResortLuxury.module.css";

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=85`;
const scenes = [
  { src: photo("photo-1540541338287-41700207dee6"), title: "Resort living" },
  { src: photo("photo-1571896349842-33c89424de2d"), title: "Restful surroundings" },
  { src: photo("photo-1500534623283-312aade485b7"), title: "Nature and open space" },
  { src: photo("photo-1441974231531-c6227db76b6e"), title: "A greener perspective" },
  { src: photo("photo-1566073771259-6a8506099945"), title: "Hospitality inspiration" },
];
const experiences = [
  { title: "A slower rhythm", text: "Step away from the everyday and imagine time with more space to breathe, unwind, and reconnect.", image: scenes[1].src, label: "TIME TO UNWIND" },
  { title: "Nature all around", text: "Green surroundings and open views set the tone for a stay that feels calm, grounded, and refreshing.", image: scenes[2].src, label: "ROOM TO RECONNECT" },
  { title: "Moments together", text: "A resort vision shaped around shared experiences, meaningful conversations, and memories made at your own pace.", image: scenes[4].src, label: "TIME WELL SPENT" },
];
const values = [
  { icon: FiWind, title: "Space to breathe", text: "An invitation to slow down and enjoy a quieter pace." },
  { icon: FiSun, title: "Natural light", text: "Open surroundings that bring warmth to the day." },
  { icon: FiHeart, title: "Shared moments", text: "A setting imagined for connection and togetherness." },
  { icon: FiCompass, title: "A new perspective", text: "The pleasure of stepping away and discovering something different." },
];
const palette = { darkGradient: "from-[#142b24] via-[#142b24] to-[#213d32]", buttonGradient: "from-[#0f7771] to-[#0b625d]" };

export default function MayalokResortLuxury({ title = "Mayalok Resort", subtitle, eyebrow, heroImage, heroSliderImages = [], aboutImage, aboutTitle, aboutParagraphs = [], services = [], stats = [], galleryImages = [] }) {
  const slides = [...new Set([...heroSliderImages, heroImage, scenes[0].src, scenes[2].src].filter(Boolean))];
  const cards = services.length ? services : experiences;
  const gallery = [...new Map([...galleryImages.filter(Boolean).map((src) => ({ src, title: "Mayalok visual collection" })), ...scenes].map((item) => [item.src, item])).values()];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [selected, setSelected] = useState(null);
  const viewerOpen = selected !== null;
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (paused || hovering || viewerOpen || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, hovering, viewerOpen, slides.length]);

  useEffect(() => {
    if (!viewerOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setSelected((index) => (index - 1 + gallery.length) % gallery.length);
      if (event.key === "Tab") {
        const buttons = [...dialogRef.current.querySelectorAll("button")];
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); opener?.focus(); };
  }, [viewerOpen, gallery.length]);

  return <main className={`${luxury.page} ${styles.page}`}>
    <section className={`${luxury.hero} ${shared.hero}`} aria-label="Mayalok Resort visual collection" aria-roledescription="carousel" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {slides.map((src, index) => <img key={src} src={src} alt={`Resort and nature inspiration ${index + 1}`} className={`${luxury.heroImage} ${current === index ? luxury.active : ""}`} aria-hidden={current !== index} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className={luxury.shade} /><div className={luxury.heroTop}><span>NORTH SOUTH GROUP</span><span>AN ESCAPE TO REMEMBER</span></div>
      <div className={`${luxury.heroCopy} ${shared.heroCopy}`}><span className={luxury.eyebrow}>{eyebrow || "A nature-inspired escape"}</span><h1>{title}</h1><p>{subtitle || "A quiet escape imagined around nature, open space, and moments worth sharing."}</p><a href="#mayalok-vision" className={luxury.heroLink}>Discover Mayalok <FiArrowDown /></a></div>
      <div className={shared.controls}><span>{String(current + 1).padStart(2, "0")} <small>/ {String(slides.length).padStart(2, "0")}</small></span><button aria-label="Previous slide" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}><FiChevronLeft /></button><button aria-label="Next slide" onClick={() => setCurrent((current + 1) % slides.length)}><FiChevronRight /></button><button aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>{paused ? <FiPlay /> : <FiPause />}</button></div>
      <div className={shared.progress}>{slides.map((src, index) => <button key={src} aria-label={`Go to slide ${index + 1}`} aria-current={current === index ? "true" : undefined} onClick={() => setCurrent(index)} />)}</div>
    </section>
    <nav className={luxury.projectNav} aria-label="Resort sections"><span>MAYALOK <em>RESORT</em></span><div><a href="#mayalok-vision">The vision</a><a href="#mayalok-experiences">Experience</a><a href="#mayalok-gallery">Gallery</a></div><a href="#concern-contact" className={luxury.enquire}>Make an enquiry <FiArrowUpRight /></a></nav>

    <section id="mayalok-vision" className={`${luxury.section} ${luxury.overview}`}><div className={luxury.overviewVisual}><img src={aboutImage || scenes[1].src} alt="Peaceful resort setting" loading="lazy" /><div className={luxury.imageNote}><span>THE MAYALOK VISION</span><p>A place to pause.<br />A place to belong.</p></div></div><div className={luxury.overviewCopy}><span className={luxury.eyebrow}>A world away from ordinary</span><h2>{aboutTitle || "A little closer to what matters."}</h2><div className={luxury.accentRule} />{(aboutParagraphs.length ? aboutParagraphs : ["Mayalok Resort is envisioned as a place to pause, reconnect, and enjoy a slower rhythm surrounded by nature."]).map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a href="#concern-contact" className={luxury.textLink}>Explore the resort vision <FiArrowUpRight /></a></div></section>
    <div className={luxury.values}>{(stats.length ? stats : [{ value: "Nature", label: "Inspired" }, { value: "Rest", label: "Reimagined" }, { value: "Moments", label: "Together" }]).map((stat, index) => <div key={index}><span className={luxury.valueNumber}>0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

    <section id="mayalok-experiences" className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>An invitation to slow down</span><h2>Make room for<br /><em>the memorable.</em></h2></div><p>Nature, stillness, and time together.<br />Discover the feeling behind Mayalok.</p></div><div className={shared.services}>{cards.map((card, index) => <article className={`${shared.service} ${index % 2 ? shared.reverse : ""}`} key={index}><div className={shared.serviceImage}><img src={card.image || experiences[index % experiences.length].image} alt={card.title} loading="lazy" /><span>0{index + 1}</span></div><div className={shared.serviceCopy}><span className={luxury.eyebrow}>{card.label || "A considered experience"}</span><h3>{card.title}</h3><p>{card.text}</p><a className={luxury.textLink} href="#concern-contact">Ask about Mayalok <FiArrowUpRight /></a></div></article>)}</div></section>

    <section className={`${luxury.statement} ${shared.statement}`}><img src={scenes[2].src} alt="Open landscape in warm evening light" loading="lazy" /><div><span className={luxury.eyebrow}>The beauty of getting away</span><h2>Take a moment.<br /><em>Stay a little longer.</em></h2><a href="#concern-contact" className={luxury.heroLink}>Start a conversation <FiArrowUpRight /></a></div></section>

    <section className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>Designed around the feeling</span><h2>Simple pleasures.<br /><em>Beautifully considered.</em></h2></div><p>What makes a getaway feel like your own.</p></div><div className={shared.principles}>{values.map((item) => { const Icon = item.icon; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>

    <section className={styles.interlude}><div className={`${luxury.section} ${styles.interludeInner}`}><div><span className={luxury.eyebrow}>A destination to imagine</span><h2>The art of<br /><em>doing less, feeling more.</em></h2><p>Plan a quiet break, share time with family, or simply explore the Mayalok vision. Our team can answer questions about current plans and opportunities.</p><a href="#concern-contact" className={luxury.heroLink}>Connect with our team <FiArrowUpRight /></a></div><img src={scenes[3].src} alt="Sunlight filtering through a green woodland" loading="lazy" /></div></section>

    <section id="mayalok-gallery" className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>A visual escape</span><h2>The Mayalok <em>collection.</em></h2></div><p>Select an image to explore it here.</p></div><div className={shared.gallery}>{gallery.map((image, index) => <button key={image.src} aria-label={`View ${image.title}`} onClick={(event) => { openerRef.current = event.currentTarget; setSelected(index); }}><img src={image.src} alt={image.title} loading="lazy" /><span>{image.title}<FiArrowUpRight /></span></button>)}</div><p className={luxury.galleryNote}>Resort and nature stock imagery is illustrative. Contact our team for verified project photographs, availability, and specifications.</p></section>

    <div className={luxury.contact}><ContactSection theme={palette} title="Your Mayalok story starts here." description="Ask our team about the resort vision, current plans, and available opportunities." buttonLabel="Send enquiry" ctaTitle="A place for moments that matter." ctaText="Connect with North South Group to learn more about Mayalok Resort." /></div>
    {viewerOpen && <div ref={dialogRef} className={shared.viewer} role="dialog" aria-modal="true" aria-label="Mayalok image viewer" onClick={() => setSelected(null)}><button className={shared.close} aria-label="Close image viewer" onClick={() => setSelected(null)}><FiX /></button><button className={shared.previous} aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + gallery.length) % gallery.length); }}><FiChevronLeft /></button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[selected].src} alt={gallery[selected].title} /><figcaption>{gallery[selected].title}<span>{selected + 1} / {gallery.length}</span></figcaption></figure><button className={shared.next} aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % gallery.length); }}><FiChevronRight /></button></div>}
  </main>;
}
