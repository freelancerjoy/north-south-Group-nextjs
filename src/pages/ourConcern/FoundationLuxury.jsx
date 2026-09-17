import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiBookOpen, FiHeart, FiUsers, FiGlobe, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiX, FiPlus, FiShield, FiSun } from "react-icons/fi";
import { ContactSection } from "./ConcernPageTemplate";
import luxury from "./NirapadValleyLuxury.module.css";
import styles from "./FoundationLuxury.module.css";

const programs = [
  { title: "Education & opportunity", text: "Supporting access to learning, skills, and the confidence to build a brighter future.", image: "https://plus.unsplash.com/premium_photo-1742926577749-e05ee300c1ad?auto=format&fit=crop&w=1000&q=80", icon: FiBookOpen },
  { title: "Health & wellbeing", text: "Promoting community health awareness, practical care, and access to support.", image: "https://images.unsplash.com/photo-1659019479972-82d9e3e8cfb7?auto=format&fit=crop&w=1000&q=80", icon: FiHeart },
  { title: "Stronger communities", text: "Bringing people together around local needs and opportunities for lasting change.", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80", icon: FiUsers },
];
const palette = { darkGradient: "from-[#142b24] via-[#142b24] to-[#213d32]", buttonGradient: "from-[#0f7771] to-[#0b625d]" };
const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;
const collection = [
  { src: pexels(6646775), category: "Community", label: "Coming together to care" },
  { src: pexels(18449721), category: "Education", label: "Opening doors to learning" },
  { src: pexels(15311442), category: "Community", label: "Support with dignity" },
  { src: pexels(7156162), category: "Volunteers", label: "Every helping hand matters" },
  { src: pexels(6646864), category: "Community", label: "Compassion in action" },
  { src: pexels(6646855), category: "Volunteers", label: "A shared commitment" },
];
const commitments = [
  { icon: FiHeart, title: "Dignity at the centre", text: "An approach to support that respects people, their voices, and their individual circumstances." },
  { icon: FiBookOpen, title: "Opportunity through learning", text: "A focus on knowledge and skills that can help people take their next step." },
  { icon: FiShield, title: "Care with responsibility", text: "Thoughtful conversations around community needs and the support available." },
  { icon: FiUsers, title: "Stronger local connections", text: "Bringing volunteers, partners, and communities into the same conversation." },
  { icon: FiSun, title: "Hope for the everyday", text: "Recognizing that practical acts of kindness can make everyday life feel more supported." },
  { icon: FiGlobe, title: "A shared future", text: "Keeping long-term wellbeing and community opportunity at the heart of our purpose." },
];

export default function FoundationLuxury({ title, subtitle, eyebrow, heroImage, heroSliderImages = [], aboutImage, aboutTitle, aboutParagraphs = [], services = [], stats = [], galleryImages = [], processItems = [] }) {
  const displayTitle = !title || title === "Northsouth Foundation" ? "North South Humanity Aid Foundations" : title;
  const cards = services.some((item) => item.image) ? services : programs;
  const images = [...new Map([...collection, ...galleryImages.filter(Boolean).map((src) => ({ src, category: "Foundation", label: "Our foundation collection" }))].map((image) => [image.src, image])).values()];
  const slides = [...new Set([...heroSliderImages, heroImage, collection[0].src, collection[1].src, collection[3].src].filter(Boolean))].slice(0, 6);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [filter, setFilter] = useState("All");
  const visibleImages = filter === "All" ? images : images.filter((image) => image.category === filter);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const viewerOpen = selected !== null;

  useEffect(() => {
    if (paused || hovering || selected !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused, hovering, selected, slides.length]);

  useEffect(() => {
    if (!viewerOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const opener = openerRef.current;
    const handleKey = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((index) => (index + 1) % visibleImages.length);
      if (event.key === "ArrowLeft") setSelected((index) => (index - 1 + visibleImages.length) % visibleImages.length);
      if (event.key === "Tab") {
        const buttons = [...dialogRef.current.querySelectorAll("button")];
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); opener?.focus(); };
  }, [viewerOpen, visibleImages.length]);
  const steps = processItems.some((item) => /community|volunteer|program/i.test(item)) ? processItems : ["Listen to communities and understand their priorities.", "Plan practical initiatives around the needs that matter.", "Bring volunteers, partners, and local people together.", "Review progress and continue improving our approach."];

  return <main className={`${luxury.page} ${styles.foundation}`}>
    <section className={`${luxury.hero} ${styles.hero}`} aria-label="Foundation visual stories" aria-roledescription="carousel" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {slides.map((src, index) => <img key={src} className={`${luxury.heroImage} ${index === current ? luxury.active : ""}`} src={src} alt="People coming together in support of their community" aria-hidden={index !== current} fetchPriority={index === 0 ? "high" : "auto"} />)}
      <div className={luxury.shade} />
      <div className={luxury.heroTop}><span>NORTH SOUTH GROUP</span><span>COMPASSION IN ACTION</span></div>
      <div className={`${luxury.heroCopy} ${styles.heroCopy}`}><span className={luxury.eyebrow}>{eyebrow || "A shared purpose. A brighter tomorrow."}</span><h1>{displayTitle}</h1><p>{subtitle || "Bringing care, opportunity, and hope closer to the communities that need them."}</p><a href="#foundation-mission" className={luxury.heroLink}>Discover our purpose <FiArrowDown /></a></div>
      <div className={styles.heroAside}><FiHeart /><span>People at the heart.<br />Purpose in every step.</span></div>
      <div className={styles.slideControls}><span>{String(current + 1).padStart(2, "0")} <small>/ {String(slides.length).padStart(2, "0")}</small></span><button aria-label="Previous slide" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}><FiChevronLeft /></button><button aria-label="Next slide" onClick={() => setCurrent((current + 1) % slides.length)}><FiChevronRight /></button><button aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>{paused ? <FiPlay /> : <FiPause />}</button></div>
      <div className={styles.slideProgress}>{slides.map((src, index) => <button key={src} aria-label={`Go to slide ${index + 1}`} aria-current={index === current ? "true" : undefined} onClick={() => setCurrent(index)} className={index === current ? styles.progressActive : ""} />)}</div>
    </section>

    <nav className={luxury.projectNav} aria-label="Foundation sections"><span>HUMANITY <em>& HOPE</em></span><div><a href="#foundation-mission">Our mission</a><a href="#foundation-programs">Our focus</a><a href="#foundation-approach">Our approach</a></div><a className={luxury.enquire} href="#concern-contact">Get involved <FiArrowUpRight /></a></nav>

    <section id="foundation-mission" className={`${luxury.section} ${luxury.overview}`}><div className={luxury.overviewVisual}><img src={aboutImage || programs[2].image} alt="Community support and shared opportunities" loading="lazy" /><div className={luxury.imageNote}><span>HUMANITY COMES FIRST</span><p>Small acts of care.<br />Possibilities that last.</p></div></div><div className={luxury.overviewCopy}><span className={luxury.eyebrow}>Our reason for being</span><h2>{aboutTitle || "A better tomorrow begins with care."}</h2><div className={luxury.accentRule} />{(aboutParagraphs.length ? aboutParagraphs : ["We bring compassion and organized action together to support education, health, and community wellbeing.", "Our purpose is to help people move toward better opportunities, with dignity at the heart of every initiative."]).map((paragraph, index) => <p key={index}>{paragraph}</p>)}<a href="#concern-contact" className={luxury.textLink}>Be part of our purpose <FiArrowUpRight /></a></div></section>

    <div className={luxury.values}>{(stats.length ? stats : [{ value: "Care", label: "At our heart" }, { value: "People", label: "At our centre" }, { value: "Hope", label: "For tomorrow" }]).map((stat, index) => <div key={index}><span className={luxury.valueNumber}>0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>

    <section id="foundation-programs" className={luxury.section}>
      <div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>Where compassion finds purpose</span><h2>Care that opens<br /><em>new possibilities.</em></h2></div><p>Education, wellbeing, and community.<br />Our focus begins with people and their everyday needs.</p></div>
      <div className={styles.storyList}>{cards.map((card, index) => { const Icon = programs[index % programs.length].icon; return <article key={index} className={`${styles.story} ${index % 2 ? styles.storyReverse : ""}`}>
        <div className={styles.storyPhoto}><img src={card.image || programs[index % programs.length].image} alt={card.title} loading="lazy" /><span>0{index + 1} / OUR AREAS OF FOCUS</span></div>
        <div className={styles.storyCopy}><Icon /><span className={luxury.eyebrow}>People. Purpose. Possibility.</span><h3>{card.title}</h3><p>{card.text}</p><div className={styles.storyFeatures}>{["Human dignity", "Community connection", "Thoughtful support"].map((feature) => <span key={feature}><FiPlus />{feature}</span>)}</div><a className={luxury.textLink} href="#concern-contact">Explore ways to contribute <FiArrowUpRight /></a></div>
      </article>; })}</div>
    </section>

    <section className={styles.outreach}>
      <div className={`${luxury.section} ${styles.outreachInner}`}>
        <div className={styles.outreachCopy}><span className={luxury.eyebrow}>A helping hand. A human connection.</span><h2>Essential care.<br /><em>Extraordinary kindness.</em></h2><p>Food, everyday essentials, and a listening ear can be the beginning of a more hopeful tomorrow. Our community-focused purpose brings practical needs into the conversation.</p><div className={styles.outreachDetails}><div><FiHeart /><h3>Support with dignity</h3><p>Respecting individual circumstances and the voices of the people we hope to support.</p></div><div><FiUsers /><h3>Neighbours helping neighbours</h3><p>Connecting people who want to contribute with conversations about local needs.</p></div></div><a href="#concern-contact" className={luxury.heroLink}>Share a community need <FiArrowUpRight /></a></div>
        <div className={styles.outreachVisual}><img src={collection[4].src} alt="Volunteers organizing everyday essentials for community support" loading="lazy" /><div><span>COMPASSION IN ACTION</span><p>Care begins<br />with connection.</p></div></div>
      </div>
    </section>

    <section className={`${luxury.section} ${styles.volunteerStory}`}>
      <div className={styles.volunteerVisual}><img src={collection[3].src} alt="People contributing their time to support others" loading="lazy" /><span>YOUR TIME CAN OPEN NEW POSSIBILITIES</span></div>
      <div className={styles.storyCopy}><span className={luxury.eyebrow}>The people behind the purpose</span><h2>A little of your time.<br /><em>A world of possibility.</em></h2><p>Bring your experience, curiosity, and compassion. Whether you are an individual or an organization, a meaningful contribution starts with understanding how your skills can help.</p><div className={styles.volunteerPaths}><div><strong>01</strong><span>Share your skills</span></div><div><strong>02</strong><span>Explore collaboration</span></div><div><strong>03</strong><span>Connect with our team</span></div></div><a className={luxury.textLink} href="#concern-contact">Find your way to get involved <FiArrowUpRight /></a></div>
    </section>

    <section className={styles.purpose}><span className={luxury.eyebrow}>Dignity. Compassion. Togetherness.</span><FiHeart className={styles.purposeIcon} /><h2>When we care together,<br /><em>possibility grows.</em></h2><p>A stronger community begins with a shared commitment to one another.</p><a href="#concern-contact" className={luxury.heroLink}>Join the conversation <FiArrowUpRight /></a></section>

    <section className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>The values behind our purpose</span><h2>Humanity, in<br /><em>every detail.</em></h2></div><p>A thoughtful foundation for how we connect, listen, and work toward positive change.</p></div><div className={styles.commitments}>{commitments.map((item) => { const { icon: Icon, title, text } = item; return <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>; })}</div></section>

    <section id="foundation-approach" className={`${luxury.section} ${styles.approach}`}><div><span className={luxury.eyebrow}>From intention to action</span><h2>Thoughtful steps.<br /><em>Human connections.</em></h2><p>We believe meaningful support starts by listening and grows through collaboration.</p><FiGlobe className={styles.globe} /></div><div className={styles.steps}>{steps.map((step, index) => <article key={index}><span>0{index + 1}</span><div><h3>{["Understand", "Plan", "Collaborate", "Reflect"][index % 4]}</h3><p>{step}</p></div></article>)}</div></section>

    <section id="foundation-gallery" className={`${luxury.section} ${luxury.gallerySection}`}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>People, purpose, and possibility</span><h2>A window into <em>our world.</em></h2></div><p>Explore moments of care and connection.<br />Select any photograph for a closer look.</p></div><div className={styles.filters} aria-label="Gallery categories">{["All", ...new Set(images.map((image) => image.category))].map((category) => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><div className={styles.galleryGrid}>{visibleImages.map((image, index) => <button className={styles.galleryImage} key={`${image.src}-${index}`} onClick={(event) => { openerRef.current = event.currentTarget; setSelected(index); }} aria-label={`View ${image.label}`}><img src={image.src} alt={image.label} loading="lazy" /><span><small>{image.category}</small>{image.label}<FiPlus /></span></button>)}</div><p className={luxury.galleryNote}>Stock imagery illustrates our areas of focus and does not document Foundation activities. Photography from Pexels and Unsplash.</p></section>

    <section className={luxury.section}><div className={luxury.sectionHeading}><div><span className={luxury.eyebrow}>Your skills. Your time. Your purpose.</span><h2>Find your way<br /><em>to get involved.</em></h2></div><p>Start with a conversation. We will help you explore opportunities that fit your interests.</p></div><div className={styles.involvement}>{[{ title: "Volunteer your time", text: "Share your interests, availability, and the skills you would like to contribute.", icon: FiUsers }, { title: "Build a partnership", text: "Explore how your organization can connect with our community-focused purpose.", icon: FiGlobe }, { title: "Share a community need", text: "Help our team understand the priorities and concerns in your community.", icon: FiHeart }].map((item, index) => { const { title, text, icon: Icon } = item; return <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p><a href="#concern-contact">Start a conversation <FiArrowUpRight /></a></article>; })}</div></section>

    <section className={`${luxury.section} ${styles.faq}`}><div><span className={luxury.eyebrow}>A little more clarity</span><h2>Before you<br /><em>take the next step.</em></h2></div><div>{[{ question: "How can I get involved?", answer: "Use the contact form below to tell us whether you are interested in volunteering, partnership, or sharing a community need. Our team can discuss available opportunities with you." }, { question: "Can my organization explore a partnership?", answer: "Yes. Share your organization’s focus and the kind of collaboration you have in mind through the contact form." }, { question: "Where can I learn about current initiatives?", answer: "Contact our team for up-to-date information about activities, locations, and ways to participate." }, { question: "Are these photographs from Foundation events?", answer: "The online stock photographs are illustrative. Please contact the Foundation for verified photographs and details of current initiatives." }].map(({ question, answer }) => <details key={question}><summary>{question}<FiPlus /></summary><p>{answer}</p></details>)}</div></section>

    <section className={styles.invitation}><span className={luxury.eyebrow}>There is a place for you here</span><h2>Give your time.<br />Share your expertise.<br /><em>Make a connection.</em></h2><p>Speak with our team about volunteering, partnership, or community collaboration.</p><a className={luxury.textLink} href="#concern-contact">Let’s take the first step <FiArrowUpRight /></a></section>
    <div className={luxury.contact}><ContactSection theme={palette} title="Let’s make a difference together." description="Tell us how you would like to get involved. Our team will help you explore the next step." buttonLabel="Send your message" ctaTitle="Every meaningful connection starts with a conversation." ctaText="Connect with North South Humanity Aid Foundations about volunteering, partnership, or community support." /></div>
    {selected !== null && <div ref={dialogRef} className={styles.viewer} role="dialog" aria-modal="true" aria-label="Foundation photograph viewer" onClick={() => setSelected(null)}><button ref={closeRef} className={styles.viewerClose} aria-label="Close image viewer" onClick={() => setSelected(null)}><FiX /></button><button className={styles.viewerPrevious} aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + visibleImages.length) % visibleImages.length); }}><FiChevronLeft /></button><figure onClick={(event) => event.stopPropagation()}><img src={visibleImages[selected].src} alt={visibleImages[selected].label} /><figcaption>{visibleImages[selected].label}<span>{selected + 1} / {visibleImages.length}</span></figcaption></figure><button className={styles.viewerNext} aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % visibleImages.length); }}><FiChevronRight /></button></div>}
  </main>;
}
