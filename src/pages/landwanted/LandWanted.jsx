import { useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import image1 from "../../assets/images/realEstateImg1.jpg";
import image2 from "../../assets/images/realEstateImg2.jpg";
import image3 from "../../assets/images/realEstateImg3.jpg";
import land from "../../assets/images/land1.jpg";
import TrustNorthSouth from "./TrustNorthSouth";
import VentureForm from "./VentureForm";
import s from "./LandWanted.module.css";

const slides = [image1, image2, image3];
const steps = [
  ["Share your land", "Tell us about the location, size and ownership of your property."],
  ["Explore the potential", "We review the site, documents and development possibilities together."],
  ["Shape the partnership", "Discuss the proposed design, responsibilities and joint venture terms."],
  ["Build a lasting legacy", "Move forward with agreed plans, construction and handover milestones."],
];

export default function LandWanted() {
  const [current, setCurrent] = useState(0);
  return (
    <main className={s.page}>
      <section className={s.hero} aria-label="Land development inspiration" aria-roledescription="carousel">
        {slides.map((src, index) => <img key={src} src={src} alt={`Residential architecture inspiration ${index + 1}`} aria-hidden={current !== index} fetchPriority={index === 0 ? "high" : "auto"} className={`${s.heroImage} ${current === index ? s.activeImage : ""}`} />)}
        <div className={s.heroShade} />
        <div className={`${s.container} ${s.heroInner}`}>
          <div className={s.heroTop}><span>North South Group</span><span><FiMapPin /> Dhaka, Bangladesh</span></div>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Land wanted · Joint venture opportunities</p>
            <h1>Your land.<br />An extraordinary<br /><em>new beginning.</em></h1>
            <p className={s.heroDescription}>A place full of possibility. A partnership built on trust. Together, let’s turn your land into a thoughtfully crafted address.</p>
            <div className={s.actions}><a className={s.goldButton} href="#joint-venture-form">Explore a partnership <FiArrowUpRight /></a><a className={s.textLink} href="#partnership">Discover our approach <FiArrowDown /></a></div>
          </div>
          <div className={s.heroBottom}><p>Considered design. Shared ambition. Lasting value.</p><div className={s.sliderControls}><span aria-live="polite">0{current + 1} <span className={s.slideTotal}>/ 03</span></span><button type="button" aria-label="Previous architectural image" onClick={() => setCurrent((current + 2) % 3)}><FiChevronLeft /></button><button type="button" aria-label="Next architectural image" onClick={() => setCurrent((current + 1) % 3)}><FiChevronRight /></button></div></div>
        </div>
      </section>
      <div className={s.locationBand}><div className={s.container}><span className={s.eyebrow}>Seeking prime land in</span><div><span>Gulshan</span><span>Banani</span><span>Dhanmondi</span><span>Uttara</span><span>& beyond</span></div></div></div>
      <section id="partnership" className={`${s.container} ${s.introduction}`}>
        <div className={s.introVisual}><img src={land} alt="Architectural inspiration for a residential land partnership" loading="lazy" /><div className={s.imageCaption}><span>Our shared vision</span><p>More than a property.<br />A legacy to call your own.</p></div><span className={s.imageNote}>Residential development inspiration</span></div>
        <div className={s.introCopy}><p className={s.eyebrow}>A partnership with purpose</p><h2>Every remarkable<br />address begins with<br /><em>the right foundation.</em></h2><p>Your land holds more than opportunity. It holds years of ambition, memories and possibility. We approach that responsibility with care.</p><p>North South Group brings planning, design, legal guidance and construction expertise together, helping you explore what your land can become through a joint venture.</p><div className={s.introDetails}><div><span>01 / The location</span><p>Prime land across Dhaka</p></div><div><span>02 / The opportunity</span><p>A considered joint venture</p></div></div><a href="#joint-venture-form" className={s.darkLink}>Let’s discuss your land <FiArrowUpRight /></a></div>
      </section>
      <TrustNorthSouth />
      <section className={`${s.container} ${s.process}`}><div className={s.sectionHeading}><div><p className={s.eyebrow}>The journey, made clear</p><h2>From possibility<br />to <em>partnership.</em></h2></div><p>A thoughtful process, with room for your questions and clarity at every step.</p></div><ol className={s.steps}>{steps.map(([title, text], index) => <li key={title}><span className={s.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <VentureForm />
    </main>
  );
}
