import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiCheck, FiClock, FiFileText, FiMail, FiMapPin, FiShield } from "react-icons/fi";
import propertyImage from "../assets/images/realEstateImg2.jpg";
import { useContactInfoStore } from "../store/contactInfo/contactInfoStore";
import styles from "./PrivacyPolicy.module.css";

const sections = [
  {
    number: "01",
    title: "Consent",
    body:
      "By using the North South Group website, you consent to this Privacy Policy and agree to its terms.",
  },
  {
    number: "02",
    title: "Information We Collect",
    body:
      "We collect information only when it is necessary for communication, service delivery, or improving the website experience.",
    bullets: [
      "Name",
      "Email address",
      "Phone number",
      "Company name",
      "Address",
      "Messages, inquiry details, or files you submit",
    ],
  },
  {
    number: "03",
    title: "How We Use Your Information",
    bullets: [
      "Operate and maintain our website",
      "Improve and personalize user experience",
      "Understand website usage and visitor needs",
      "Develop new services, features, and communication flows",
      "Respond to inquiries and support requests",
      "Send updates or service-related communication when appropriate",
      "Help detect misuse, fraud, or security risks",
    ],
  },
  {
    number: "04",
    title: "Log Files",
    body:
      "Like many websites, we may use standard log information such as IP address, browser type, internet service provider, timestamps, referring pages, and click behavior. This information is used for analytics, administration, and security, and is not linked to personally identifiable profiles.",
  },
  {
    number: "05",
    title: "Cookies and Web Beacons",
    body:
      "Our website may use cookies to remember visitor preferences and help us improve navigation, usability, and performance across devices.",
  },
  {
    number: "06",
    title: "Third-Party Privacy Policies",
    body:
      "This Privacy Policy does not apply to third-party websites, advertisers, or services linked from our platform. We encourage users to review the privacy policies of those external services separately.",
  },
  {
    number: "07",
    title: "CCPA Privacy Rights",
    body: "California residents may request to:",
    bullets: [
      "Know what personal data has been collected",
      "Request deletion of personal data",
      "Request that personal data not be sold",
    ],
  },
  {
    number: "08",
    title: "GDPR Data Protection Rights",
    body: "Where applicable, users may have the right to:",
    bullets: [
      "Access personal data",
      "Correct inaccurate data",
      "Request erasure",
      "Restrict processing",
      "Object to processing",
      "Request data portability",
    ],
  },
  {
    number: "09",
    title: "Children's Information",
    body:
      "We do not knowingly collect personal information from children under 13 years of age. If you believe a child has submitted such information, please contact us so we can remove it promptly.",
  },
  {
    number: "10",
    title: "Changes to This Policy",
    body:
      "We may update this Privacy Policy from time to time. Any revisions will be posted on this page with the latest effective date.",
  },
];


export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("01");
  const contactInfo = useContactInfoStore((state) => state.contactInfo);
  const loadContactInfo = useContactInfoStore((state) => state.loadContactInfo);
  const email = contactInfo?.emails?.[0] || "info@northsouthgroup.com";
  const readMinutes = Math.ceil(sections.map((section) => [section.title, section.body, ...(section.bullets || [])].filter(Boolean).join(" ")).join(" ").split(/\s+/).length / 200);

  useEffect(() => { loadContactInfo(); }, [loadContactInfo]);

  useEffect(() => {
    const policySections = Array.from(document.querySelectorAll("[data-privacy-section]"));
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const reached = policySections.filter((section) => section.getBoundingClientRect().top <= 150);
        setActiveSection(reached.at(-1)?.dataset.section || "01");
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const contents = <ol className={styles.contentsList}>{sections.map((section) => (
    <li key={section.number}><a href={`#privacy-${section.number}`} aria-current={activeSection === section.number ? "location" : undefined} onClick={() => setActiveSection(section.number)}><span>{section.number}</span>{section.title}</a></li>
  ))}</ol>;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img className={styles.heroImage} src={propertyImage} alt="Residential architecture surrounded by greenery" fetchPriority="high" />
        <div className={styles.heroShade} />
        <div className={styles.container}>
          <div className={styles.heroTop}><span>North South Group</span><span>Trust & transparency</span></div>
          <div className={styles.heroGrid}>
            <div><p className={styles.eyebrow}>Our commitment to clarity</p><h1>Your confidence.<br /><em>Our responsibility.</em></h1><p className={styles.heroDescription}>From your first property enquiry to your next conversation with us, understand how information is handled when you use our website.</p><a href="#privacy-overview" className={styles.heroLink}>Explore our privacy policy <FiArrowDown /></a></div>
            <div className={styles.policySeal}><FiShield aria-hidden="true" /><span>Privacy Policy</span><p>Clear information.<br />Considered decisions.</p><div>North South Group</div></div>
          </div>
        </div>
      </section>

      <div className={styles.documentBar}><div className={styles.container}><span><FiFileText /> Website privacy policy</span><span>Effective <time dateTime="2026-04-28">28 April 2026</time></span><span><FiClock /> {readMinutes} min read</span></div></div>

      <section id="privacy-overview" className={`${styles.container} ${styles.overview}`}>
        <div><p className={styles.eyebrow}>A foundation of trust</p><h2>Before you share,<br /><em>know where you stand.</em></h2></div>
        <div><p>Whether you are exploring a plot, comparing residential projects or contacting our team about a property, this policy explains how information may be collected and used through our website.</p><p>Read the sections below to understand the information you provide, website technologies and how to get in touch with a privacy question.</p></div>
      </section>

      <div className={`${styles.container} ${styles.topicCards}`}>
        <a href="#privacy-02"><FiMapPin /><div><span>01 / Your enquiries</span><h3>Information you share</h3><p>Contact details, messages and enquiry information.</p></div><FiArrowUpRight /></a>
        <a href="#privacy-05"><FiShield /><div><span>02 / Your visit</span><h3>Your website experience</h3><p>Logs, cookies and external services.</p></div><FiArrowUpRight /></a>
        <a href="#privacy-contact"><FiMail /><div><span>03 / Your questions</span><h3>A clear point of contact</h3><p>Reach our team for clarification about this policy.</p></div><FiArrowUpRight /></a>
      </div>

      <div className={`${styles.container} ${styles.documentLayout}`}>
        <aside className={styles.sidebar}>
          <nav className={styles.desktopContents} aria-label="Privacy policy sections"><p className={styles.eyebrow}>In this policy</p>{contents}</nav>
          <details className={styles.mobileContents}><summary>Explore policy sections <FiArrowDown /></summary><nav aria-label="Privacy policy sections">{contents}</nav></details>
          <div className={styles.sideNote}><FiShield /><p>Read at your own pace.</p><span>Each section explains a different part of how this website handles information.</span><a href="#privacy-contact">Have a question? <FiArrowUpRight /></a></div>
        </aside>
        <article className={styles.document} aria-labelledby="policy-document-title">
          <header className={styles.documentHeader}><p className={styles.eyebrow}>The full policy</p><h2 id="policy-document-title">Privacy Policy</h2><p>For visitors to the North South Group website.</p></header>
          {sections.map((section) => (
            <section key={section.number} id={`privacy-${section.number}`} data-privacy-section data-section={section.number} className={styles.policySection} aria-labelledby={`privacy-heading-${section.number}`}>
              <div className={styles.sectionTitle}><span>{section.number}</span><h3 id={`privacy-heading-${section.number}`}>{section.title}</h3></div>
              {section.body && <p>{section.body}</p>}
              {section.bullets && <ul>{section.bullets.map((point) => <li key={point}><FiCheck aria-hidden="true" /><span>{point}</span></li>)}</ul>}
            </section>
          ))}
          <a className={styles.backToContents} href="#privacy-overview">Back to overview <FiArrowUpRight /></a>
        </article>
      </div>

      <section id="privacy-contact" className={styles.contact}>
        <div className={`${styles.container} ${styles.contactGrid}`}>
          <div><p className={styles.eyebrow}>A conversation brings clarity</p><h2>Questions about<br /><em>your information?</em></h2><p>Contact North South Group if you would like clarification about this policy or how your information is handled.</p></div>
          <div className={styles.contactCard}><FiMail /><span className={styles.eyebrow}>Write to our team</span><a href={`mailto:${email}?subject=Privacy%20policy%20enquiry`}>{email}<FiArrowUpRight /></a><p>For a question about a previous enquiry, mention the project name or enquiry date to help explain your request.</p></div>
        </div>
      </section>
    </main>
  );
}
