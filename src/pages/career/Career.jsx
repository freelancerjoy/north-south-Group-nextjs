import { useEffect, useRef, useState } from "react";
import {
  FiArrowDown, FiArrowUpRight, FiAward, FiBookOpen, FiBriefcase,
  FiCheck, FiCompass, FiFileText, FiHeart, FiMail, FiUsers, FiX,
} from "react-icons/fi";
import { useContactInfoStore } from "../../store/contactInfo/contactInfoStore";
import styles from "./Career.module.css";

const benefits = [
  { icon: FiHeart, title: "A place to belong", text: "A welcoming workplace where different backgrounds, perspectives and experiences are valued." },
  { icon: FiUsers, title: "Better, together", text: "Work alongside people who share ideas, support one another and take pride in a shared result." },
  { icon: FiBookOpen, title: "Room to keep learning", text: "Build your knowledge through hands-on work, collaboration and opportunities to develop your skills." },
  { icon: FiCompass, title: "Space for your ideas", text: "Bring a fresh perspective. Ask thoughtful questions. Help shape the way we work and what we create." },
  { icon: FiBriefcase, title: "Work with purpose", text: "Contribute to the places and experiences that connect people, businesses and communities." },
  { icon: FiAward, title: "A future you can shape", text: "Take ownership of your work, build confidence and explore the next chapter of your professional journey." },
];

const careerAreas = [
  { title: "Design & engineering", detail: "Architecture · Planning · Project delivery", number: "01" },
  { title: "Sales & marketing", detail: "Relationships · Communication · Brand", number: "02" },
  { title: "Business & operations", detail: "Finance · Administration · Team support", number: "03" },
  { title: "Early careers", detail: "Fresh perspectives · Learning · New beginnings", number: "04" },
];

const careerQuestions = [
  { question: "How do I apply?", answer: "Choose a career area or select Start your application. Fill in your details to prepare an email, attach your CV as a PDF, then send it from your email app. You can also use the email address shown in the application form." },
  { question: "Can I apply at the beginning of my career?", answer: "You can select Early careers to introduce yourself. Include your education, projects, relevant skills and the kind of experience you hope to gain. Opportunities depend on current team needs." },
  { question: "What should I include in my CV?", answer: "Include up-to-date contact details, education, relevant experience and a clear summary of your skills. For creative or technical work, add a link to your portfolio or a few relevant projects." },
  { question: "Can I apply for a different area?", answer: "Yes. Choose Introduce yourself and enter your preferred role or department. Tell us how your experience could contribute to the team." },
  { question: "What happens after I send my application?", answer: "Your email gives the team an opportunity to review your background against current needs. If there is a suitable fit, the team can contact you using the details you provide. A general application does not guarantee an interview or a role." },
];

export default function Career() {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const contactInfo = useContactInfoStore((state) => state.contactInfo);
  const loadContactInfo = useContactInfoStore((state) => state.loadContactInfo);
  const email = contactInfo?.emails?.[0] || "northsouthgroupbd@gmail.com";

  useEffect(() => { loadContactInfo(); }, [loadContactInfo]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function openApplication(area = "") {
    setPosition(area);
    setDraftOpened(false);
    setOpen(true);
    dialogRef.current.showModal();
  }

  function closeApplication() {
    dialogRef.current.close();
    setOpen(false);
  }

  function prepareApplication(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const subject = `Career enquiry — ${data.position || "General application"}`;
    const body = [
      "Hello North South Group,", "", "I would like to express my interest in joining your team.", "",
      `Name: ${data.fullName}`, `Email: ${data.email}`, `Phone: ${data.phone}`,
      `Area of interest: ${data.position || "General application"}`, `Address: ${data.address}`,
      "", "A little about me:", data.message || "", "", "Please find my CV attached.", "", `Kind regards,\n${data.fullName}`,
    ].join("\n");
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img className={styles.heroBackdrop} src="/images/careers/teamwork.jpg" alt="Professionals connecting and collaborating around a meeting table" width="1000" height="667" fetchPriority="high" />
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> Careers at North South Group</p>
            <h1>A remarkable<br />future.<br /><em>Begins with you.</em></h1>
            <p className={styles.heroDescription}>Bring your ambition. Find your people. Build a meaningful career with a team shaping the places we call tomorrow.</p>
            <div className={styles.heroActions}>
              <a href="#career-opportunities" className={styles.primaryButton}>Find your direction <FiArrowUpRight /></a>
              <a href="#life-at-north-south" className={styles.textLink}>Life at North South <FiArrowDown /></a>
            </div>
            <div className={styles.heroFootnote}><span>People first.</span> Possibilities ahead.</div>
          </div>
          <aside className={styles.heroSignature}><span className={styles.eyebrow}>The North South spirit</span><p>Different minds.<br /><em>Shared ambition.</em></p><span className={styles.signatureLine} /></aside>
        </div>
        <div className={`${styles.container} ${styles.heroBottom}`}><span>Build with purpose</span><span>Grow with people</span><span>Make a difference</span></div>
      </section>

      <section id="life-at-north-south" className={`${styles.container} ${styles.culture}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>More than a workplace</p><h2>A place to contribute.<br /><em>A place to become.</em></h2></div>
          <p>Behind every project is a team of people who care. We believe the best work happens when people feel supported, heard and inspired to grow.</p>
        </div>
        <div className={styles.cultureGallery}>
          <figure className={styles.galleryFeature}>
            <img src="/images/careers/team-meeting.jpg" alt="Professionals sharing ideas during a collaborative work session" width="1200" height="1800" loading="lazy" decoding="async" />
            <figcaption><span className={styles.eyebrow}>Connection & collaboration</span><h3>Good people.<br /><em>Even better possibilities.</em></h3></figcaption>
          </figure>
          <figure className={styles.galleryPortrait}>
            <img src="/images/careers/collaboration.jpg" alt="A professional sharing a report during a team discussion" width="1100" height="733" loading="lazy" decoding="async" />
            <figcaption><span className={styles.eyebrow}>Ideas & initiative</span><h3>Bring your perspective.<br /><em>Make it count.</em></h3></figcaption>
          </figure>
        </div>
        <div className={styles.benefitHeading}><span className={styles.eyebrow}>The things that matter</span><p>Purpose in your work. Support along the way.</p></div>
        <div className={styles.benefitGrid}>
          {benefits.map(({ icon, title, text }, index) => {
            const Icon = icon;
            return (
            <article className={styles.benefit} key={title}>
              <div className={styles.benefitTop}><Icon aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
            );
          })}
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>One team. A shared sense of purpose.</p>
          <h2>We build places for people.<br /><em>It starts with our own.</em></h2>
          <p>Curiosity, care and collaboration. The foundations of how we work.</p>
        </div>
        <span className={styles.statementMark} aria-hidden="true">N/S</span>
      </section>

      <section id="career-opportunities" className={`${styles.container} ${styles.opportunities}`}>
        <div className={styles.opportunityIntro}>
          <p className={styles.eyebrow}>Find your direction</p>
          <h2>Different talents.<br /><em>Shared possibilities.</em></h2>
          <p>Explore areas of interest for a general application. Specific roles depend on current team needs.</p>
          <div className={styles.generalApplication}><FiCompass /><div><h3>Your path looks a little different?</h3><p>We’d still like to hear what you can bring.</p><button type="button" onClick={() => openApplication()}>Introduce yourself <FiArrowUpRight /></button></div></div>
        </div>
        <div className={styles.careerAreas}>
          {careerAreas.map((area) => (
            <button type="button" key={area.title} className={styles.area} onClick={() => openApplication(area.title)} aria-label={`Express interest in ${area.title}`}>
              <span className={styles.areaNumber}>{area.number}</span>
              <span className={styles.areaCopy}><span>{area.title}</span><small>{area.detail}</small></span>
              <span className={styles.areaArrow}><FiArrowUpRight /></span>
            </button>
          ))}
          <p className={styles.areaNote}><FiFileText /> Have your CV ready and tell us where you’d like to contribute.</p>
        </div>
      </section>

      <section className={styles.preparation}>
        <div className={`${styles.container} ${styles.preparationGrid}`}>
          <div>
            <p className={styles.eyebrow}>Make a thoughtful first impression</p>
            <h2>Your experience.<br /><em>Your story to tell.</em></h2>
            <p>A good application helps us understand both what you have done and what you would love to do next.</p>
            <button type="button" className={styles.preparationLink} onClick={() => openApplication()}>Ready to introduce yourself? <FiArrowUpRight /></button>
          </div>
          <div className={styles.preparationCard}>
            <div className={styles.preparationTitle}><FiFileText /><h3>Before you apply</h3></div>
            <ul>
              <li><FiCheck /><div><strong>Keep your CV clear and current</strong><p>Highlight the experience, skills and projects most relevant to your interests.</p></div></li>
              <li><FiCheck /><div><strong>Show us what you can do</strong><p>Add portfolio or project links if they help explain your work.</p></div></li>
              <li><FiCheck /><div><strong>Make it easy to reach you</strong><p>Check your phone number and email, then attach your CV as a PDF before sending.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <div className={`${styles.container} ${styles.applicationGrid}`}>
          <div><p className={styles.eyebrow}>A simple first step</p><h2>Good things begin<br /><em>with a conversation.</em></h2><p className={styles.applicationDescription}>Tell us who you are, what inspires you and where you want to go next.</p><button type="button" className={styles.primaryButton} onClick={() => openApplication()}>Start your application <FiArrowUpRight /></button></div>
          <ol className={styles.applicationSteps}>
            <li><span>01</span><div><h3>Introduce yourself</h3><p>Share your details and the area you’re interested in.</p></div></li>
            <li><span>02</span><div><h3>Send your story</h3><p>Open your email draft, attach your CV as a PDF and send it to our team.</p></div></li>
            <li><span>03</span><div><h3>Explore the fit</h3><p>If your experience matches a team need, we can take the conversation further.</p></div></li>
          </ol>
        </div>
      </section>

      <section className={`${styles.container} ${styles.faqSection}`} aria-labelledby="career-faq-heading">
        <div className={styles.faqIntro}><p className={styles.eyebrow}>A little more clarity</p><h2 id="career-faq-heading">Before your<br /><em>next step.</em></h2><p>A few useful answers as you prepare to introduce yourself.</p></div>
        <div className={styles.faqList}>
          {careerQuestions.map(({ question, answer }) => (
            <details key={question} className={styles.faqItem} name="career-questions"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <dialog ref={dialogRef} className={styles.dialog} onClose={() => setOpen(false)} aria-labelledby="career-application-title" aria-describedby="career-application-description">
        <div className={styles.dialogHeader}><div><p className={styles.eyebrow}>Your next chapter</p><h2 id="career-application-title">Let’s get to know you.</h2></div><button type="button" onClick={closeApplication} className={styles.closeButton} aria-label="Close application"><FiX /></button></div>
        <form className={styles.form} onSubmit={prepareApplication}>
          <p id="career-application-description" className={styles.formIntro}>Prepare an application email. Attach your CV and send it from your email app. Fields marked * are required.</p>
          <div className={styles.fieldGrid}>
            <label htmlFor="career-name">Full name *<input id="career-name" name="fullName" autoComplete="name" placeholder="Your full name" maxLength={100} required /></label>
            <label htmlFor="career-phone">Phone number *<input id="career-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={30} required /></label>
            <label className={styles.fullField} htmlFor="career-email">Email address *<input id="career-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={150} required /></label>
            <label className={styles.fullField} htmlFor="career-position">Area of interest<input id="career-position" name="position" value={position} onChange={(event) => setPosition(event.target.value)} placeholder="Your preferred role or department" maxLength={100} /></label>
            <label className={styles.fullField} htmlFor="career-address">Contact address *<input id="career-address" name="address" autoComplete="street-address" placeholder="Your current address" maxLength={180} required /></label>
            <label className={styles.fullField} htmlFor="career-message">A little about you<textarea id="career-message" name="message" rows={3} placeholder="Your experience, interests or what you’d love to work on…" maxLength={600} /></label>
          </div>
          <div className={styles.cvNote}><FiFileText /><p><strong>Bring your story with you.</strong><br />Attach your CV as a PDF in the email draft before sending.</p></div>
          <button type="submit" className={styles.submitButton}>Open application email <FiArrowUpRight /></button>
          <div className={styles.draftStatus} role="status" aria-live="polite">{draftOpened && <p><FiCheck /> Your email draft has been requested. Attach your CV and send it to complete your application. If no email app opens, use the address below.</p>}</div>
          <p className={styles.emailFallback}><FiMail /> You can also email your CV directly:<br /><a href={`mailto:${email}`}>{email}</a></p>
        </form>
      </dialog>
    </main>
  );
}
