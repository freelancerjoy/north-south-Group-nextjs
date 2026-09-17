import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiX, FiLayers, FiShield, FiCompass, FiCheckCircle } from "react-icons/fi";
import { ContactSection } from "./ConcernPageTemplate";
import luxury from "./NirapadValleyLuxury.module.css";
import styles from "./ConstructionLuxury.module.css";

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=85`;
const collection = [
  { src: photo("photo-1503387762-592deb58ef4e"), title: "Architecture & perspective" },
  { src: photo("photo-1486406146926-c627a92ad1ab"), title: "Commercial architecture" },
  { src: photo("photo-1541888946425-d81bb19240f5"), title: "The construction process" },
  { src: photo("photo-1600585154340-be6161a56a0c"), title: "Residential spaces" },
  { src: photo("photo-1600607687939-ce8a6c25118c"), title: "Interior detail" },
];
const capabilities = [
  { title: "Residential construction", text: "A considered approach to homes and residential spaces, bringing project requirements, practical planning, and everyday comfort into the same conversation.", image: collection[3].src, label: "SPACES TO CALL HOME" },
  { title: "Commercial buildings", text: "Explore spaces shaped around business needs, circulation, usability, and the way people work. Start with a clear understanding of your site and project scope.", image: collection[1].src, label: "SPACES FOR WHAT COMES NEXT" },
  { title: "Planning & project coordination", text: "From the first conversation to the proposed construction stages, thoughtful coordination helps keep priorities, responsibilities, and communication clear.", image: collection[2].src, label: "DETAILS THAT MAKE A DIFFERENCE" },
];
const principles = [
  { icon: FiCompass, title: "Purposeful planning", text: "Begin with the site, your priorities, and a clear understanding of what the project needs." },
  { icon: FiLayers, title: "Attention to detail", text: "Consider how materials, spaces, and construction stages come together." },
  { icon: FiShield, title: "Responsible coordination", text: "Keep project requirements and practical site considerations part of the conversation." },
  { icon: FiCheckCircle, title: "Clear communication", text: "Discuss scope, milestones, and expectations with the team as your project progresses." },
];
const palette = { darkGradient: "from-[#142b24] via-[#142b24] to-[#213d32]", buttonGradient: "from-[#0f7771] to-[#0b625d]" };

export default function ConstructionLuxury({ title = "North South Building Construction", subtitle, eyebrow, heroImage, heroSliderImages = [], aboutImage, aboutTitle, aboutParagraphs = [], services = [], stats = [], galleryImages = [], processItems = [] }) {
  const slides = [...new Set([...heroSliderImages, heroImage, collection[2].src, collection[1].src].filter(Boolean))];
  const cards = services.length ? services : capabilities;
  const gallery = [...new Map([...galleryImages.filter(Boolean).map((src) => ({ src, title: "Project collection" })), ...collection].map((item) => [item.src, item])).values()];
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
    <section className={`${luxury.hero} ${styles.hero}`} aria-label="Construction and architectural collection" aria-roledescription="carousel" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {slides.map((src, index) => <img key={src} src={src} alt={`Construction and architecture inspiration ${index + 1}`} className={`${luxury.heroImage} ${current === index ? luxury.active : ""}`} aria-hidden={current !== index} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className={luxury.shade} />
      <div className={luxury.heroTop}><span>NORTH SOUTH GROUP</span><span>VISION INTO STRUCTURE</span></div>
      <div className={`${luxury.heroCopy} ${styles.heroCopy}`}><span className={luxury.eyebrow}>{eyebrow || "Building & construction"}</span><h1>{title}</h1><p>{subtitle || "Thoughtful planning. Purposeful spaces. A considered approach to bringing your building vision to life."}</p><a href="#construction-vision" className={luxury.heroLink}>Explore our approach <FiArrowDown /></a></div>
      <div className={styles.controls}><span>{String(current + 1).padStart(2, "0")} <small>/ {String(slides.length).padStart(2, "0")}</small></span><button aria-label="Previous slide" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}><FiChevronLeft /></button><button aria-label="Next slide" onClick={() => setCurrent((current + 1) % slides.length)}><FiChevronRight /></button><button aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>{paused ? <FiPlay /> : <FiPause />}</button></div>
      <div className={styles.progress}>{slides.map((src, index) => <button key={src} aria-label={`Go to slide ${index + 1}`} aria-current={current === index ? "true" : undefined} onClick={() => setCurrent(index)} />)}</div>
    </section>
    <nav className={luxury.projectNav} aria-label="Construction sections"><span>BUILDING <em>WITH PURPOSE</em></span><div><a href="#construction-vision">Our vision</a><a href="#construction-services">Capabilities</a><a href="#construction-gallery">Collection</a></div><a href="#concern-contact" className={luxury.enquire}>Discuss your project <FiArrowUpRight /></a></nav>

    <section id="construction-vision" className={`${luxury.section} ${luxury.overview}`}><div className={luxury.overviewVisual}><img src={aboutImage || collection[1].src} alt="Architectural lines and contemporary building design" loading="lazy" /><div className={luxury.imageNote}><span>BUILT AROUND YOUR VISION</span><p>Considered spaces.<br />Lasting possibilities.</p></div></div><div className={luxury.overviewCopy}><span className={luxury.eyebrow}>From the ground up</span><h2>{aboutTitle || "Great spaces begin with a clear vision."}</h2><div className={luxury.accentRule} />{(aboutParagraphs.length ? aboutParagraphs : ["Bring your ideas, your priorities, and your project requirements. Our team will help you explore the practical next steps."]).map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a href="#concern-contact" className={luxury.textLink}>Let’s talk about your project <FiArrowUpRight /></a></div></section>
    <div className={luxury.values}>{(stats.length ? stats : [{ value: "Plan", label: "With intention" }, { value: "Build", label: "With care" }, { value: "Deliver", label: "With purpose" }]).map((stat, index) => <div key={index}><span className={luxury.valueNumber}>0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

    <section id="construction-services" className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>Our capabilities</span><h2>Ideas take shape.<br /><em>Spaces find purpose.</em></h2></div><p>Residential, commercial, and project planning.<br />Explore the possibilities with our team.</p></div><div className={styles.services}>{cards.map((card, index) => <article className={`${styles.service} ${index % 2 ? styles.reverse : ""}`} key={index}><div className={styles.serviceImage}><img src={card.image || capabilities[index % capabilities.length].image} alt={card.title} loading="lazy" /><span>0{index + 1}</span></div><div className={styles.serviceCopy}><span className={luxury.eyebrow}>{card.label || "Thoughtful by design"}</span><h3>{card.title}</h3><p>{card.text}</p><a className={luxury.textLink} href="#concern-contact">Explore your requirements <FiArrowUpRight /></a></div></article>)}</div></section>

    <section className={`${luxury.statement} ${styles.statement}`}><img src={collection[2].src} alt="Construction site and structural work" loading="lazy" /><div><span className={luxury.eyebrow}>A foundation for what comes next</span><h2>Every great building<br />starts with <em>intention.</em></h2><a href="#concern-contact" className={luxury.heroLink}>Start your project conversation <FiArrowUpRight /></a></div></section>

    <section className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>The details behind the vision</span><h2>A considered approach.<br /><em>At every stage.</em></h2></div><p>Clarity, coordination, and attention to the details that shape your project.</p></div><div className={styles.principles}>{principles.map((item) => { const { icon: Icon, title: heading, text } = item; return <article key={heading}><Icon /><h3>{heading}</h3><p>{text}</p></article>; })}</div></section>

    <section className={styles.process}><div className={`${luxury.section} ${styles.processInner}`}><div><span className={luxury.eyebrow}>From conversation to completion</span><h2>Your vision.<br /><em>A thoughtful path forward.</em></h2><p>Discuss each stage with our team, from early requirements to the proposed handover.</p></div><div className={styles.steps}>{(processItems.length ? processItems : ["Discuss your requirements.", "Define the proposed scope.", "Coordinate the construction stages.", "Review the handover requirements."]).map((step, index) => <article key={index}><span>0{index + 1}</span><div><h3>{["Discover", "Define", "Coordinate", "Review"][index % 4]}</h3><p>{step}</p></div></article>)}</div></div></section>

    <section id="construction-gallery" className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>Form. Structure. Detail.</span><h2>The architectural <em>collection.</em></h2></div><p>Select a photograph to explore it here.</p></div><div className={styles.gallery}>{gallery.map((image, index) => <button key={image.src} aria-label={`View ${image.title}`} onClick={(event) => { openerRef.current = event.currentTarget; setSelected(index); }}><img src={image.src} alt={image.title} loading="lazy" /><span>{image.title}<FiArrowUpRight /></span></button>)}</div><p className={luxury.galleryNote}>Architectural and construction stock imagery is illustrative. Contact our team for verified project photographs and specifications.</p></section>

    <div className={luxury.contact}><ContactSection theme={palette} title="Let’s bring your vision into focus." description="Share your site, project type, and priorities. Our team will help you explore scope and the next steps." buttonLabel="Send project enquiry" ctaTitle="Your next project starts with a conversation." ctaText="Connect with North South Building Construction about your residential or commercial building requirements." /></div>
    {viewerOpen && <div ref={dialogRef} className={styles.viewer} role="dialog" aria-modal="true" aria-label="Architectural photograph viewer" onClick={() => setSelected(null)}><button className={styles.close} aria-label="Close image viewer" onClick={() => setSelected(null)}><FiX /></button><button className={styles.previous} aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + gallery.length) % gallery.length); }}><FiChevronLeft /></button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[selected].src} alt={gallery[selected].title} /><figcaption>{gallery[selected].title}<span>{selected + 1} / {gallery.length}</span></figcaption></figure><button className={styles.next} aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % gallery.length); }}><FiChevronRight /></button></div>}
  </main>;
}
