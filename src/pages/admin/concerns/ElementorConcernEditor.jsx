import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdDragIndicator, MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import ConcernLuxuryPage from "../../ourConcern/ConcernLuxuryPage";
import { getUploadErrorMessage, uploadSingle } from "../../../utils/cloudinaryUpload";

const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500";
const names = { hero: "Hero", overview: "Overview", services: "Services", features: "Features", highlights: "Highlights", stats: "Stats", process: "Process", media: "Slider & Gallery", statement: "Statement", contact: "Contact / CTA", settings: "Page settings" };

function MediaField({ label, value, onChange, folder = "concerns" }) {
  const [busy, setBusy] = useState(false);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      onChange(await uploadSingle(file, folder));
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };
  return <div className="space-y-2"><span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">{value ? <div className="relative aspect-[16/9]"><img src={value} alt={label} className="h-full w-full object-cover" /><button type="button" onClick={() => onChange("")} className="absolute right-2 top-2 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-bold text-rose-600 shadow">Remove</button></div> : <div className="flex aspect-[16/9] items-center justify-center text-xs text-slate-400">No image selected</div>}<label className="flex cursor-pointer items-center justify-center gap-2 border-t border-slate-200 bg-white px-3 py-3 text-xs font-bold text-teal-700 hover:bg-teal-50">{busy ? "Uploading..." : value ? "Replace image" : "Upload image"}<input type="file" accept="image/*" className="hidden" disabled={busy} onChange={upload} /></label></div></div>;
}

export default function ElementorConcernEditor({ form, setField, onSubmit, isSaving, isLoading, previewData }) {
  const [active, setActive] = useState("hero");
  const [uploading, setUploading] = useState(false);
  useEffect(() => { const aliases = { overview: "concern-overview", services: "concern-services", features: "concern-features", highlights: "concern-highlights", stats: "concern-stats", process: "concern-process", media: "concern-gallery", statement: "concern-statement", contact: "concern-contact" }; const target = active.startsWith("custom-") ? `concern-custom-${Number(active.slice(7))}` : aliases[active]; document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [active]);
  const uploadList = async (key, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls = await Promise.all(
        files.map((file) => uploadSingle(file, `concerns/${key}`))
      );
      setField(key, [...(form[key] || []), ...urls]);
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  const structure = ["hero", "overview", "services", "features", "highlights", "stats", "process", ...(form.sections || []).map((_, i) => `custom-${i}`), "media", "statement", "contact", "settings"];
  const customIndex = active.startsWith("custom-") ? Number(active.slice(7)) : -1;
  const imageField = (label, key) => <MediaField label={label} value={form[key] || ""} onChange={(value) => setField(key, value)} />;
  const field = (label, key, area = false) => <label className="block space-y-1"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{area ? <textarea className={`${input} min-h-24`} value={form[key] || ""} onChange={(e) => setField(key, e.target.value)} /> : <input className={input} value={form[key] || ""} onChange={(e) => setField(key, e.target.value)} />}</label>;
  const list = (label, key) => <div><span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{(form[key] || []).map((value, i) => <div className="mb-2 flex gap-1" key={i}><input className={input} value={typeof value === "string" ? value : value.url || ""} onChange={(e) => setField(key, form[key].map((v, n) => n === i ? (typeof v === "string" ? e.target.value : { ...v, url: e.target.value }) : v))} /><button type="button" className="rounded bg-rose-50 px-2 text-rose-600" onClick={() => setField(key, form[key].filter((_, n) => n !== i))}><MdDelete /></button></div>)}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField(key, [...(form[key] || []), ""])}>+ Add item</button></div>;
  const imageCollection = (label, key) => <div><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{(form[key] || []).length} images</span></div><label className="mb-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-teal-300 bg-teal-50/60 px-3 py-4 text-center transition hover:border-teal-500 hover:bg-teal-50"><MdAdd className="mb-1 text-xl text-teal-600" /><span className="text-xs font-bold text-teal-700">Upload images</span><span className="mt-1 text-[10px] text-slate-400">PNG, JPG, WEBP · multiple allowed</span><input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => uploadList(key, e)} /></label>{(form[key] || []).length > 0 ? <div className="grid grid-cols-2 gap-2">{form[key].map((url, i) => <div key={`${url}-${i}`} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"><img src={typeof url === "string" ? url : url.url} alt={`${label} ${i + 1}`} className="h-full w-full object-cover" /><button type="button" aria-label={`Remove ${label} image ${i + 1}`} onClick={() => setField(key, form[key].filter((_, n) => n !== i))} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-md bg-white/90 text-rose-600 opacity-0 shadow-sm transition group-hover:opacity-100"><MdDelete size={15} /></button><span className="absolute bottom-1 left-1 rounded bg-slate-950/70 px-1.5 py-0.5 text-[9px] font-bold text-white">{String(i + 1).padStart(2, "0")}</span></div>)}</div> : <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-5 text-center text-xs text-slate-400">No images added yet</div>}</div>;
  const cards = (label, key) => <div><span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{(form[key] || []).map((v, i) => <div className="mb-3 space-y-3 rounded-xl border border-slate-200 p-3" key={i}><input className={input} value={v.title || ""} placeholder="Title" onChange={(e) => setField(key, form[key].map((x, n) => n === i ? { ...x, title: e.target.value } : x))} /><textarea className={`${input} min-h-16`} value={v.text || ""} placeholder="Text" onChange={(e) => setField(key, form[key].map((x, n) => n === i ? { ...x, text: e.target.value } : x))} /><MediaField label="Card image" value={v.image || ""} folder={`concerns/${key}`} onChange={(value) => setField(key, form[key].map((x, n) => n === i ? { ...x, image: value } : x))} /></div>)}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField(key, [...(form[key] || []), { title: "", text: "", image: "" }])}>+ Add card</button></div>;
  const custom = (i) => { const v = form.sections[i]; const update = (key, value) => setField("sections", form.sections.map((x, n) => n === i ? { ...x, [key]: value } : x)); return <div className="space-y-3"><select className={input} value={v.type || "text"} onChange={(e) => update("type", e.target.value)}><option value="text">Text</option><option value="image-text">Image + text</option><option value="cards">Cards</option><option value="quote">Statement</option><option value="cta">CTA</option></select><input className={input} value={v.eyebrow || ""} placeholder="Eyebrow" onChange={(e) => update("eyebrow", e.target.value)} /><input className={input} value={v.title || ""} placeholder="Title" onChange={(e) => update("title", e.target.value)} /><textarea className={`${input} min-h-24`} value={v.text || ""} placeholder="Content" onChange={(e) => update("text", e.target.value)} />{v.type === "image-text" && <MediaField label="Section image" value={v.image || ""} folder="concerns/sections" onChange={(value) => update("image", value)} />}<button type="button" className="text-xs font-bold text-rose-600" onClick={() => { setField("sections", form.sections.filter((_, n) => n !== i)); setActive("hero"); }}>Remove section</button></div>; };
  let controls = customIndex >= 0 ? custom(customIndex) : null;
  if (active === "hero") controls = <div className="space-y-4">{field("Eyebrow", "eyebrow")}{field("Title", "title")}{field("Subtitle", "subtitle", true)}{imageField("Hero image", "heroImage")}{field("Image note title", "imageNoteTitle")}{field("Image note text", "imageNoteText", true)}</div>;
  if (active === "overview") controls = <div className="space-y-4">{field("About title", "aboutTitle")}{imageField("About image", "aboutImage")}{list("About paragraphs", "aboutParagraphs")}</div>;
  if (active === "services") controls = <div className="space-y-4">{field("Services title", "servicesTitle")}{field("Services description", "servicesDescription", true)}{cards("Services", "services")}</div>;
  if (active === "features") controls = <div className="space-y-4">{field("Features title", "featuresTitle")}{field("Features description", "featuresDescription", true)}{cards("Features", "features")}</div>;
  if (active === "highlights") controls = <div className="space-y-4">{field("Highlights title", "highlightsTitle")}{field("Highlights description", "highlightsDescription", true)}{cards("Highlights", "highlights")}</div>;
  if (active === "stats") controls = <div className="space-y-4">{(form.stats || []).map((v, i) => <div className="grid grid-cols-2 gap-2" key={i}><input className={input} value={v.value || ""} placeholder="Value" onChange={(e) => setField("stats", form.stats.map((x, n) => n === i ? { ...x, value: e.target.value } : x))} /><input className={input} value={v.label || ""} placeholder="Label" onChange={(e) => setField("stats", form.stats.map((x, n) => n === i ? { ...x, label: e.target.value } : x))} /></div>)}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField("stats", [...(form.stats || []), { value: "", label: "" }])}>+ Add stat</button></div>;
  if (active === "process") controls = <div className="space-y-4">{field("Process title", "processTitle")}{list("Process items", "processItems")}</div>;
  if (active === "media") controls = <div className="space-y-5">{field("Gallery title", "galleryTitle")}{imageCollection("Hero slider images", "heroSliderImages")}{imageCollection("Gallery images", "galleryImages")}</div>;
  if (active === "statement") controls = <div className="space-y-4">{field("Statement eyebrow", "statementEyebrow")}{field("Statement title", "statementTitle", true)}</div>;
  if (active === "contact") controls = <div className="space-y-4">{field("CTA title", "ctaTitle")}{field("CTA text", "ctaText", true)}{field("CTA button", "ctaLabel")}{field("Contact title", "contactTitle")}{field("Contact description", "contactDescription", true)}{field("Contact button", "contactButtonLabel")}</div>;
  if (active === "settings") controls = <div className="space-y-4">{field("Slug", "slug")}{field("Public route", "routePath")}{field("Navigation label", "navLabel")}{field("Location label", "locationLabel")}</div>;
  const addSection = () => { const next = [...(form.sections || []), { type: "text", title: "New section", text: "", eyebrow: "", image: "" }]; setField("sections", next); setActive(`custom-${next.length - 1}`); };
  return <div className="overflow-hidden rounded-xl border border-slate-300 bg-[#f1f3f6] shadow-sm"><div className="flex min-h-[760px] flex-col lg:flex-row"><aside className="w-full shrink-0 border-b bg-white lg:w-[270px] lg:border-b-0 lg:border-r"><div className="bg-slate-950 px-4 py-4 text-white"><p className="text-xs font-black uppercase tracking-widest text-teal-300">Elementor page builder</p><h2 className="mt-1 font-bold">{form.title || "Concern"}</h2></div><div className="p-3">{structure.map((id) => <button type="button" key={id} onClick={() => setActive(id)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${active === id ? "bg-teal-50 font-bold text-teal-700" : "text-slate-600"}`}><MdDragIndicator className="text-slate-300" />{names[id] || form.sections?.[Number(id.slice(7))]?.title || "Custom section"}</button>)}<button type="button" onClick={addSection} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-teal-300 py-2 text-xs font-bold text-teal-700"><MdAdd /> Add section</button></div></aside><main className="min-w-0 flex-1 bg-[#e9edf1] p-3 lg:p-5"><div className="mb-3 flex justify-between rounded-lg bg-white px-4 py-3 shadow-sm"><span className="text-sm font-bold">{names[active] || "Custom section"}</span><button type="button" onClick={onSubmit} disabled={isSaving || isLoading} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white"><MdSave />{isSaving ? "Saving" : "Save changes"}</button></div><div className="h-[690px] overflow-auto rounded-lg bg-white"><ConcernLuxuryPage {...previewData} /></div></main><aside className="w-full shrink-0 border-t bg-white p-4 lg:w-[320px] lg:border-l lg:border-t-0"><p className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">{customIndex >= 0 ? "Section settings" : "Content settings"}</p>{controls}</aside></div></div>;
}
