import { useEffect, useMemo, useRef, useState } from "react";
import { MdAdd, MdDelete, MdDragIndicator, MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import AboutUs from "../../about/AboutUs";
import { defaultAboutContent } from "../../about/defaultAboutContent";
import { useAboutStore } from "../../../store/about/aboutStore";
import { getUploadErrorMessage, uploadSingle } from "../../../utils/cloudinaryUpload";

const input = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500";
const sectionNames = {
  hero: "Hero & concerns",
  media: "Daily Adin media",
  overview: "Company overview",
  office: "Office / workspaces",
  leadership: "Leadership",
  video: "Video",
  csr: "CSR gallery",
  mission: "Mission cards",
};
const sectionIds = {
  hero: "about-hero",
  media: "about-media",
  overview: "story",
  office: "about-office",
  strengths: "about-strengths",
  leadership: "leadership",
  video: "about-video",
  csr: "about-csr",
  mission: "about-mission",
};
const collectionFields = ["heroSlides", "overviewParagraphs", "stats", "strengths", "leaders", "officeImages", "officeGalleryImages", "mediaImages", "csrImages", "missionCards"];
const mergeAboutContent = (content = {}) => {
  const merged = { ...defaultAboutContent, ...content };
  Object.entries(defaultAboutContent).forEach(([key, fallback]) => {
    if (typeof fallback === "string" && !String(merged[key] || "").trim()) merged[key] = fallback;
  });
  collectionFields.forEach((key) => {
    if (!Array.isArray(content[key]) || content[key].length === 0) merged[key] = defaultAboutContent[key] || [];
  });
  return merged;
};

function MediaField({ label, value, folder, onChange }) {
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
  return <div className="space-y-2"><span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">{value ? <div className="relative aspect-video"><img src={value} alt={label} className="h-full w-full object-cover" /><button type="button" onClick={() => onChange("")} className="absolute right-2 top-2 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-bold text-rose-600 shadow">Remove</button></div> : <div className="flex aspect-video items-center justify-center text-xs text-slate-400">No image selected</div>}<label className="flex cursor-pointer items-center justify-center border-t border-slate-200 bg-white px-3 py-3 text-xs font-bold text-teal-700 hover:bg-teal-50">{busy ? "Uploading..." : value ? "Replace image" : "Upload image"}<input type="file" accept="image/*" className="hidden" disabled={busy} onChange={upload} /></label></div></div>;
}

export default function ElementorAboutEditor() {
  const { aboutContent, loadAboutContent, updateAboutContent, isLoading } = useAboutStore();
  const [form, setForm] = useState(defaultAboutContent);
  const [active, setActive] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const previewViewportRef = useRef(null);

  useEffect(() => { loadAboutContent().catch(() => toast.error("Could not load About page content")); }, [loadAboutContent]);
  useEffect(() => { if (aboutContent) setForm(mergeAboutContent(aboutContent)); }, [aboutContent]);
  useEffect(() => {
    const viewport = previewViewportRef.current;
    if (!viewport) return undefined;
    const updateScale = () => setPreviewScale(Math.min(1, Math.max(0.3, (viewport.clientWidth - 16) / 1440)));
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const previewData = useMemo(() => mergeAboutContent(form), [form]);
  const selectSection = (section) => {
    setActive(section);
    setTimeout(() => document.getElementById(sectionIds[section])?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  const save = async () => {
    setSaving(true);
    try {
      await updateAboutContent(form);
      toast.success("About page updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update About page");
    } finally {
      setSaving(false);
    }
  };
  const field = (label, key, area = false) => <label className="block space-y-1"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{area ? <textarea className={`${input} min-h-24 resize-y`} value={form[key] || ""} onChange={(event) => setField(key, event.target.value)} /> : <input className={input} value={form[key] || ""} onChange={(event) => setField(key, event.target.value)} />}</label>;
  const stringList = (label, key) => <div><span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{(form[key] || []).map((value, index) => <div className="mb-2 flex gap-1" key={index}><textarea className={`${input} min-h-16`} value={value} onChange={(event) => setField(key, form[key].map((item, i) => i === index ? event.target.value : item))} /><button type="button" className="rounded bg-rose-50 px-2 text-rose-600" onClick={() => setField(key, form[key].filter((_, i) => i !== index))}><MdDelete /></button></div>)}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField(key, [...(form[key] || []), ""])}>+ Add item</button></div>;
  const textCards = (label, key, stat = false) => <div><span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>{(form[key] || []).map((item, index) => <div key={index} className="mb-3 space-y-2 rounded-xl border border-slate-200 p-3"><input className={input} value={stat ? item.value || "" : item.title || ""} placeholder={stat ? "Value" : "Title"} onChange={(event) => setField(key, form[key].map((card, i) => i === index ? { ...card, [stat ? "value" : "title"]: event.target.value } : card))} />{stat ? <input className={input} value={item.label || ""} placeholder="Label" onChange={(event) => setField(key, form[key].map((card, i) => i === index ? { ...card, label: event.target.value } : card))} /> : <textarea className={`${input} min-h-16`} value={item.text || ""} placeholder="Text" onChange={(event) => setField(key, form[key].map((card, i) => i === index ? { ...card, text: event.target.value } : card))} />}<button type="button" className="text-xs font-bold text-rose-600" onClick={() => setField(key, form[key].filter((_, i) => i !== index))}>Remove</button></div>)}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField(key, [...(form[key] || []), stat ? { value: "", label: "" } : { title: "", text: "" }])}>+ Add {stat ? "stat" : "card"}</button></div>;
  const uploadMany = async (key, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadSingle(file, `about/${key}`)));
      setField(key, [...(form[key] || []), ...urls]);
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  const imageList = (label, key) => <div><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{(form[key] || []).length} images</span></div><label className="mb-3 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-teal-300 bg-teal-50/60 px-3 py-4 text-xs font-bold text-teal-700"><MdAdd size={20} />{uploading ? "Uploading..." : "Upload images"}<input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(event) => uploadMany(key, event)} /></label><div className="grid grid-cols-2 gap-2">{(form[key] || []).map((url, index) => <div key={`${url}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg border bg-slate-100"><img src={url} alt="" className="h-full w-full object-cover" /><button type="button" onClick={() => setField(key, form[key].filter((_, i) => i !== index))} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded bg-white/90 text-rose-600"><MdDelete /></button></div>)}</div></div>;
  const uploadGalleryMany = async (key, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadSingle(file, `about/${key}`)));
      const uploadedAt = Date.now();
      const cards = urls.map((url, index) => ({
        id: `${key}-${uploadedAt}-${index}`,
        title: files[index].name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        subtitle: "",
        img: url,
      }));
      setForm((current) => ({ ...current, [key]: [...(current[key] || []), ...cards] }));
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  const galleryCards = (label, key, leaders = false, multiple = false) => <div><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{(form[key] || []).length} images</span></div>{multiple && <label className="mb-3 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-teal-300 bg-teal-50/60 px-3 py-4 text-xs font-bold text-teal-700"><MdAdd size={20} />{uploading ? "Uploading..." : "Upload multiple images"}<input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(event) => uploadGalleryMany(key, event)} /></label>}{(form[key] || []).map((item, index) => { const update = (fieldName, value) => setField(key, form[key].map((card, i) => i === index ? { ...card, [fieldName]: value } : card)); return <div key={item.id || index} className="mb-3 space-y-2 rounded-xl border border-slate-200 p-3"><input className={input} value={leaders ? item.name || "" : item.title || ""} placeholder={leaders ? "Name" : "Title"} onChange={(event) => update(leaders ? "name" : "title", event.target.value)} /><input className={input} value={leaders ? item.role || "" : item.subtitle || ""} placeholder={leaders ? "Role" : "Subtitle"} onChange={(event) => update(leaders ? "role" : "subtitle", event.target.value)} />{leaders && <textarea className={`${input} min-h-16`} value={item.description || ""} placeholder="Description" onChange={(event) => update("description", event.target.value)} />}<MediaField label="Image" value={item.img || ""} folder={`about/${key}`} onChange={(value) => update("img", value)} /><button type="button" className="text-xs font-bold text-rose-600" onClick={() => setField(key, form[key].filter((_, i) => i !== index))}>Remove</button></div>; })}<button type="button" className="text-xs font-bold text-teal-700" onClick={() => setField(key, [...(form[key] || []), leaders ? { id: `leader-${Date.now()}`, name: "", role: "", description: "", img: "" } : { id: `image-${Date.now()}`, title: "", subtitle: "", img: "" }])}>+ Add {leaders ? "leader" : "image"}</button></div>;

  let controls;
  if (active === "hero") controls = <div className="space-y-4">{field("Eyebrow", "heroEyebrow")}{field("Title", "heroTitle", true)}{field("Subtitle", "heroSubtitle", true)}{field("Primary button", "heroPrimaryButtonLabel")}{field("Secondary button", "heroSecondaryButtonLabel")}{field("Concerns eyebrow", "concernsEyebrow")}{field("Concerns label", "concernsLabel")}{imageList("Hero slider images", "heroSlides")}</div>;
  if (active === "media") controls = <div className="space-y-4">{field("Eyebrow", "mediaEyebrow")}{field("Title", "mediaTitle", true)}{field("Description", "mediaText", true)}{field("Badge", "mediaBadge")}{field("Strip eyebrow", "mediaStripEyebrow")}{field("Strip title", "mediaStripTitle")}{field("Strip text", "mediaStripText", true)}{galleryCards("Media images", "mediaImages")}</div>;
  if (active === "overview") controls = <div className="space-y-4">{field("Eyebrow", "overviewEyebrow")}{field("Title", "overviewTitle", true)}{field("Intro", "overviewText", true)}{field("Badge", "overviewBadge")}{field("Highlight eyebrow", "overviewHighlightEyebrow")}{field("Highlight title", "overviewHighlightTitle", true)}{stringList("Paragraphs", "overviewParagraphs")}<MediaField label="Main overview image" value={form.overviewImage || ""} folder="about/overview" onChange={(value) => setField("overviewImage", value)} /><MediaField label="Second overview image" value={form.overviewSecondImage || ""} folder="about/overview" onChange={(value) => setField("overviewSecondImage", value)} />{textCards("Stats", "stats", true)}{textCards("Overview cards", "strengths")}</div>;
  if (active === "office") controls = <div className="space-y-4">{field("Eyebrow", "officeEyebrow")}{field("Title", "officeTitle", true)}{field("Description", "officeText", true)}{galleryCards("Featured workspace images", "officeImages")}{galleryCards("Full workspace gallery", "officeGalleryImages", false, true)}</div>;
  if (active === "leadership") controls = <div className="space-y-4">{field("Eyebrow", "leadershipEyebrow")}{field("Title", "leadershipTitle")}{field("Description", "leadershipText", true)}{galleryCards("Leadership team", "leaders", true)}</div>;
  if (active === "video") controls = <div className="space-y-4">{field("Eyebrow", "videoEyebrow")}{field("Title", "videoTitle")}{field("Description", "videoText", true)}{field("YouTube URL", "videoUrl")}</div>;
  if (active === "csr") controls = <div className="space-y-4">{field("Eyebrow", "csrEyebrow")}{field("Title", "csrTitle")}{field("Description", "csrText", true)}{galleryCards("CSR images", "csrImages")}</div>;
  if (active === "mission") controls = <div className="space-y-4">{field("Eyebrow", "missionEyebrow")}{field("Title", "missionTitle")}{textCards("Mission cards", "missionCards")}</div>;

  return <div className="overflow-hidden rounded-xl border border-slate-300 bg-[#f1f3f6] shadow-sm"><div className="flex min-h-[760px] flex-col lg:flex-row"><aside className="w-full shrink-0 border-b bg-white lg:w-[230px] lg:border-b-0 lg:border-r"><div className="bg-slate-950 px-4 py-4 text-white"><p className="text-xs font-black uppercase tracking-widest text-teal-300">Elementor page builder</p><h2 className="mt-1 font-bold">About Us</h2></div><div className="p-3">{Object.keys(sectionNames).map((section) => <button type="button" key={section} onClick={() => selectSection(section)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${active === section ? "bg-teal-50 font-bold text-teal-700" : "text-slate-600"}`}><MdDragIndicator className="text-slate-300" />{sectionNames[section]}</button>)}</div></aside><main className="min-w-0 flex-1 bg-[#e9edf1] p-3 lg:p-4"><div className="mb-3 flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm"><div><span className="block text-sm font-bold">{sectionNames[active]}</span><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Desktop preview · {Math.round(previewScale * 100)}%</span></div><button type="button" onClick={save} disabled={saving || isLoading} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"><MdSave />{saving ? "Saving" : "Save changes"}</button></div><div ref={previewViewportRef} className="h-[690px] overflow-auto rounded-lg bg-slate-200 p-2"><div className="origin-top-left bg-white shadow-sm" style={{ width: 1440, zoom: previewScale }}><AboutUs previewData={previewData} /></div></div></main><aside className="w-full shrink-0 border-t bg-white p-4 lg:w-[290px] lg:border-l lg:border-t-0"><p className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Content settings</p><div className="max-h-[700px] overflow-y-auto pr-1">{controls}</div></aside></div></div>;
}
