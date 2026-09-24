import { useState } from "react";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";
import s from "./LandWanted.module.css";

const reasons = [
  ["A vision for long-term value", "Thoughtful architecture and careful planning help create a residential experience that considers both your land’s potential and the needs of future residents."],
  ["Legal & design guidance", "From ownership documentation to site planning, our teams help you understand the decisions involved in a joint venture."],
  ["Care at every stage of construction", "Planning, coordination and construction supervision bring attention to quality throughout the development journey."],
  ["Clear milestones & communication", "Discuss project responsibilities, delivery milestones and progress updates as part of an agreed development plan."],
  ["Support beyond handover", "Our relationship continues with service requests, maintenance guidance and a listening ear for owner feedback."],
];

export default function TrustNorthSouth() {
  const [openIndex, setOpenIndex] = useState(0);
  return <section className={s.trust}><div className={`${s.container} ${s.trustGrid}`}>
    <div className={s.trustIntro}><p className={s.eyebrow}>Why North South Group</p><h2>Good partnerships<br />are built on<br /><em>confidence.</em></h2><p>A dedicated development partner, from the first conversation to the finishing details.</p><a className={s.textLink} href="tel:01894939226">Speak with our team <FiArrowUpRight /></a><div className={s.trustSignature}>Your land. Our expertise.<br /><span>A shared future.</span></div></div>
    <div className={s.accordion}>{reasons.map(([title, text], index) => {
      const isOpen = openIndex === index;
      return <div key={title} className={`${s.accordionItem} ${isOpen ? s.openItem : ""}`}><h3><button type="button" aria-expanded={isOpen} aria-controls={`land-reason-${index}`} id={`land-reason-button-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}><span className={s.reasonNumber}>0{index + 1}</span><span>{title}</span>{isOpen ? <FiMinus /> : <FiPlus />}</button></h3><div id={`land-reason-${index}`} role="region" aria-labelledby={`land-reason-button-${index}`} hidden={!isOpen}><p>{text}</p></div></div>;
    })}</div>
  </div></section>;
}
