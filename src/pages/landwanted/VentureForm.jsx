import { useState } from "react";
import { FiArrowUpRight, FiPhone, FiCheckCircle } from "react-icons/fi";
import { createContact } from "../../store/contact/contactApi";
import s from "./LandWanted.module.css";

export default function VentureForm() {
  const [status, setStatus] = useState("idle");
  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "pending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("pending");
    try {
      await createContact({ name: data.name, number: data.phone, email: data.email, address: data.address, message: `Land joint venture enquiry\nCategory: ${data.category}\nLocation: ${data.location}\nLand size: ${data.size} Katha\nAdditional notes: ${data.notes || "Not provided"}` });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return <section id="joint-venture-form" className={s.enquiry}><div className={`${s.container} ${s.enquiryGrid}`}>
    <div className={s.enquiryIntro}><p className={s.eyebrow}>Let’s begin a conversation</p><h2>The next chapter<br />starts with<br /><em>your land.</em></h2><p>Tell us a little about your property. Our team will review the details and get in touch to explore the possibilities with you.</p><div className={s.advisor}><span className={s.eyebrow}>Prefer a personal conversation?</span><a href="tel:01894939226"><FiPhone /> 018 9493 9226 <FiArrowUpRight /></a><p>Speak with our land development team.</p></div><div className={s.enquiryNote}><FiCheckCircle /><p>An initial enquiry is a starting point for discussion, with no commitment to a partnership.</p></div></div>
    <form className={s.form} onSubmit={handleSubmit} aria-busy={status === "pending"}>
      <div className={s.formHeading}><h3>Tell us about your land</h3><p>Fields marked * are required.</p></div>
      <fieldset disabled={status === "pending"}><legend><span>01</span> Your details</legend><div className={s.fieldGrid}>
        <label htmlFor="land-name">Full name *<input id="land-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={120} /></label>
        <label htmlFor="land-phone">Phone number *<input id="land-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required maxLength={30} /></label>
        <label htmlFor="land-email">Email address *<input id="land-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
        <label htmlFor="land-address">Present address *<input id="land-address" name="address" autoComplete="street-address" placeholder="Your current address" required maxLength={300} /></label>
      </div></fieldset>
      <fieldset disabled={status === "pending"}><legend><span>02</span> Property details</legend><div className={s.fieldGrid}>
        <label htmlFor="land-category">Land category *<select id="land-category" name="category" defaultValue="" required><option value="" disabled>Select category</option><option>Residential</option><option>Commercial</option><option>Mixed Use</option></select></label>
        <label htmlFor="land-location">Location *<select id="land-location" name="location" defaultValue="" required><option value="" disabled>Select location</option><option>Gulshan</option><option>Banani</option><option>Dhanmondi</option><option>Uttara</option><option>Other Dhaka Area</option></select></label>
        <label className={s.fullField} htmlFor="land-size">Land size (Katha) *<input id="land-size" name="size" type="number" min="0.01" step="any" placeholder="e.g. 5" required /></label>
        <label className={s.fullField} htmlFor="land-notes">Anything else we should know?<textarea id="land-notes" name="notes" rows={3} maxLength={3000} placeholder="Exact location, road width, ownership details or your vision for the land…" /></label>
      </div></fieldset>
      <p className={s.formDisclaimer}>We’ll use these details to respond to your land enquiry.</p>
      <button type="submit" className={s.submitButton} disabled={status === "pending"}>{status === "pending" ? "Sending your enquiry…" : "Send partnership enquiry"}<FiArrowUpRight /></button>
      <div aria-live="polite" role="status">{status === "success" && <p className={s.success}>Thank you. Your enquiry has been sent to our team.</p>}{status === "error" && <p className={s.error}>Your enquiry could not be sent. Please try again or call 018 9493 9226. Your details are still here.</p>}</div>
    </form>
  </div></section>;
}
