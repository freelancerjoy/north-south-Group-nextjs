import { useEffect, useMemo, useRef, useState } from "react";
import { MdAdd, MdDelete, MdDragIndicator, MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import Home from "../Home";
import { useHomeContentStore } from "../../store/homeContent/homeContentStore";
import { mergeHomeContent } from "../home/defaultHomeContent";
import { getUploadErrorMessage, uploadSingle } from "../../utils/cloudinaryUpload";

const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500";
const sections = { hero: "Hero buttons", about: "About", featured: "Featured projects", investment: "Investment insight", projectOverview: "Project overview", gallery: "Gallery", meeting: "Meeting form", partners: "Partners", contact: "Contact" };
const sectionIds = { hero: "home-hero", about: "aboutUs", featured: "portfolio", investment: "home-investment", projectOverview: "home-project-overview", gallery: "home-gallery", meeting: "home-meeting", partners: "partner", contact: "contact" };

function MediaField({ label, value, folder, onChange }) {
  const [busy, setBusy] = useState(false);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try { onChange(await uploadSingle(file, folder)); }
    catch (error) { toast.error(getUploadErrorMessage(error)); }
    finally { setBusy(false); event.target.value = ""; }
  };
  return <div className="space-y-2"><span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">{value ? <div className="relative aspect-video"><img src={value} alt={label} className="h-full w-full object-cover" /><button type="button" onClick={() => onChange("")} className="absolute right-2 top-2 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-bold text-rose-600 shadow">Remove</button></div> : <div className="flex aspect-video items-center justify-center text-xs text-slate-400">Using current default image</div>}<label className="flex cursor-pointer items-center justify-center border-t border-slate-200 bg-white px-3 py-3 text-xs font-bold text-teal-700 hover:bg-teal-50">{busy ? "Uploading..." : value ? "Replace image" : "Upload image"}<input type="file" accept="image/*" className="hidden" disabled={busy} onChange={upload} /></label></div></div>;
}

function VideoField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadSingle(file, "home/investment-video"));
      toast.success("Video uploaded. Save changes to publish it.");
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };
  return <div className="space-y-2"><span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">Investment video</span><div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950">{value ? <div className="relative"><video src={value} controls preload="metadata" className="aspect-video w-full bg-black object-contain" /><button type="button" onClick={() => onChange("")} className="absolute right-2 top-2 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-bold text-rose-600 shadow">Remove</button></div> : <div className="flex aspect-video items-center justify-center text-xs text-slate-400">No video selected</div>}<label className="flex cursor-pointer items-center justify-center border-t border-slate-700 bg-white px-3 py-3 text-xs font-bold text-teal-700 hover:bg-teal-50">{busy ? "Uploading video..." : value ? "Replace video" : "Upload video"}<input type="file" accept="video/mp4,video/webm,video/quicktime,video/*" className="hidden" disabled={busy} onChange={upload} /></label></div><p className="text-[10px] leading-4 text-slate-400">MP4 or WebM recommended. The uploaded video appears immediately in the live preview.</p></div>;
}

export default function HomePageSettings() {
  const { content, loadHomeContent, updateHomeContent, isLoading } = useHomeContentStore();
  const [form, setForm] = useState(() => mergeHomeContent(content));
  const [active, setActive] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const previewViewportRef = useRef(null);

  useEffect(() => { loadHomeContent().catch(() => toast.error("Could not load home page content")); }, [loadHomeContent]);
  useEffect(() => { if (content) setForm(mergeHomeContent(content)); }, [content]);
  useEffect(() => {
    const viewport = previewViewportRef.current;
    if (!viewport) return undefined;
    const resize = () => setPreviewScale(Math.min(1, Math.max(0.28, (viewport.clientWidth - 16) / 1440)));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const previewData = useMemo(() => mergeHomeContent(form), [form]);
  const setSection = (section, key, value) => setForm((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const selectSection = (section) => { setActive(section); setTimeout(() => document.getElementById(sectionIds[section])?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const save = async () => {
    setSaving(true);
    try { await updateHomeContent(form); toast.success("Home page updated successfully"); }
    catch (error) { toast.error(error?.response?.data?.message || "Failed to update home page"); }
    finally { setSaving(false); }
  };
  const field = (section, label, key, area = false) => <label className="block space-y-1"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{area ? <textarea className={`${input} min-h-24 resize-y`} value={form[section][key] || ""} onChange={(event) => setSection(section, key, event.target.value)} /> : <input className={input} value={form[section][key] || ""} onChange={(event) => setSection(section, key, event.target.value)} />}</label>;

  let controls;
  if (active === "hero") controls = <div className="space-y-3">{form.heroButtons.map((button, index) => <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-3"><input className={input} value={button.text} placeholder="Button label" onChange={(event) => setForm((current) => ({ ...current, heroButtons: current.heroButtons.map((item, i) => i === index ? { ...item, text: event.target.value } : item) }))} /><input className={input} value={button.link} placeholder="/route" onChange={(event) => setForm((current) => ({ ...current, heroButtons: current.heroButtons.map((item, i) => i === index ? { ...item, link: event.target.value } : item) }))} /><button type="button" className="text-xs font-bold text-rose-600" onClick={() => setForm((current) => ({ ...current, heroButtons: current.heroButtons.filter((_, i) => i !== index) }))}><MdDelete className="inline" /> Remove</button></div>)}<button type="button" className="flex items-center gap-1 text-xs font-bold text-teal-700" onClick={() => setForm((current) => ({ ...current, heroButtons: [...current.heroButtons, { text: "", link: "" }] }))}><MdAdd /> Add button</button></div>;
  if (active === "about") controls = <div className="space-y-4">{field("about", "Eyebrow", "eyebrow")}{field("about", "Title", "title")}{field("about", "Description", "text", true)}{field("about", "See more label", "moreLabel")}{field("about", "See less label", "lessLabel")}{field("about", "Concerns eyebrow", "concernsEyebrow")}{field("about", "Concerns title", "concernsTitle", true)}</div>;
  if (active === "featured") controls = <div className="space-y-4">{field("featured", "Eyebrow", "eyebrow")}{field("featured", "Title line 1", "titleLineOne")}{field("featured", "Title line 2", "titleLineTwo")}{field("featured", "Button label", "buttonLabel")}</div>;
  if (active === "investment") controls = <div className="space-y-4">{field("investment", "Eyebrow", "eyebrow")}{field("investment", "Title line 1", "titleLineOne")}{field("investment", "Title line 2", "titleLineTwo")}{field("investment", "Heading", "heading")}{field("investment", "Description", "text", true)}{field("investment", "Author", "author")}{field("investment", "Author role", "authorRole")}<VideoField value={form.investment.videoUrl} onChange={(value) => setSection("investment", "videoUrl", value)} />{field("investment", "Or paste video URL", "videoUrl")}<MediaField label="Video poster" value={form.investment.posterUrl} folder="home/investment" onChange={(value) => setSection("investment", "posterUrl", value)} /></div>;
  if (active === "projectOverview") controls = <div className="space-y-4">{field("projectOverview", "Title", "title")}<MediaField label="Background image" value={form.projectOverview.backgroundUrl} folder="home/project-overview" onChange={(value) => setSection("projectOverview", "backgroundUrl", value)} />{form.projectOverview.cards.map((card, index) => <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-3"><select className={input} value={card.icon} onChange={(event) => setSection("projectOverview", "cards", form.projectOverview.cards.map((item, i) => i === index ? { ...item, icon: event.target.value } : item))}><option value="hotel">Hotel icon</option><option value="land">Land icon</option><option value="flat">Building icon</option></select><input className={input} value={card.title} onChange={(event) => setSection("projectOverview", "cards", form.projectOverview.cards.map((item, i) => i === index ? { ...item, title: event.target.value } : item))} /><textarea className={`${input} min-h-20`} value={card.text} onChange={(event) => setSection("projectOverview", "cards", form.projectOverview.cards.map((item, i) => i === index ? { ...item, text: event.target.value } : item))} /></div>)}</div>;
  if (active === "gallery") controls = <div className="space-y-4">{field("gallery", "Eyebrow", "eyebrow")}{field("gallery", "Title", "title")}{field("gallery", "View albums label", "buttonLabel")}{field("gallery", "Description", "description", true)}{field("gallery", "Gallery badge", "badge")}{field("gallery", "Open eyebrow", "openEyebrow")}{field("gallery", "Open title", "openTitle")}{field("gallery", "Explore label", "exploreLabel")}{field("gallery", "Album label", "albumLabel")}</div>;
  if (active === "meeting") controls = <div className="space-y-4">{field("meeting", "Title", "title")}<MediaField label="Meeting image" value={form.meeting.imageUrl} folder="home/meeting" onChange={(value) => setSection("meeting", "imageUrl", value)} />{field("meeting", "Name label", "fullNameLabel")}{field("meeting", "Name placeholder", "fullNamePlaceholder")}{field("meeting", "Phone label", "phoneLabel")}{field("meeting", "Phone placeholder", "phonePlaceholder")}{field("meeting", "Address label", "addressLabel")}{field("meeting", "Address placeholder", "addressPlaceholder")}{field("meeting", "Submit label", "submitLabel")}{field("meeting", "Sending label", "sendingLabel")}</div>;
  if (active === "partners") controls = <label className="block space-y-1"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Section title</span><input className={input} value={form.partnersTitle || ""} onChange={(event) => setForm((current) => ({ ...current, partnersTitle: event.target.value }))} /></label>;
  if (active === "contact") controls = <div className="space-y-4">{field("contact", "Eyebrow", "eyebrow")}{field("contact", "Title", "titleBeforeAccent")}{field("contact", "Accent title", "titleAccent")}{field("contact", "Description", "description", true)}{field("contact", "Form title", "formTitle")}{field("contact", "Submit label", "submitLabel")}{field("contact", "Sending label", "sendingLabel")}</div>;

  return <div className="overflow-hidden rounded-xl border border-slate-300 bg-[#f1f3f6] shadow-sm"><div className="flex min-h-[760px] flex-col lg:flex-row"><aside className="w-full shrink-0 border-b bg-white lg:w-[230px] lg:border-b-0 lg:border-r"><div className="bg-slate-950 px-4 py-4 text-white"><p className="text-xs font-black uppercase tracking-widest text-teal-300">Elementor page builder</p><h2 className="mt-1 font-bold">Home Page</h2></div><div className="p-3">{Object.keys(sections).map((section) => <button type="button" key={section} onClick={() => selectSection(section)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${active === section ? "bg-teal-50 font-bold text-teal-700" : "text-slate-600"}`}><MdDragIndicator className="text-slate-300" />{sections[section]}</button>)}</div></aside><main className="min-w-0 flex-1 bg-[#e9edf1] p-3 lg:p-4"><div className="mb-3 flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"><div><span className="block text-sm font-bold">{sections[active]}</span><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Desktop preview · {Math.round(previewScale * 100)}%</span></div><button type="button" onClick={save} disabled={saving || isLoading} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"><MdSave />{saving ? "Saving" : "Save changes"}</button></div><div ref={previewViewportRef} className="h-[690px] overflow-auto rounded-lg bg-slate-200 p-2"><div className="home-editor-preview origin-top-left bg-white shadow-sm" style={{ width: 1440, zoom: previewScale }}><Home previewContent={previewData} /></div></div></main><aside className="w-full shrink-0 border-t bg-white p-4 lg:w-[300px] lg:border-l lg:border-t-0"><p className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Content settings</p><div className="max-h-[700px] overflow-y-auto pr-1">{controls}</div></aside></div></div>;
}
