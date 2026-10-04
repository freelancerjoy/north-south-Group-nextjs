import { useEffect, useState } from "react";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFooterStore } from "../../store/footer/footerStore";
import { getUploadErrorMessage, uploadSingle } from "../../utils/cloudinaryUpload";

const defaultForm = {
  isVisible: true, logoUrl: "", brandName: "North South Group", brandDescription: "",
  quickLinksTitle: "Quick Links", quickLinks: [], concernsTitle: "Our Concern", contactTitle: "Contact Us",
  showConcernLinks: true, showContact: true, showSocialLinks: true, socialLinks: [],
  copyrightText: "All Rights Reserved.", designedByLabel: "Designed & Developed with ♥ by", designedBy: "NS Tech Team",
  backgroundColor: "#040811", accentColor: "#0f7771",
};
const input = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500";

function ListEditor({ title, items, setItems, type }) {
  const isSocial = type === "social";
  const update = (index, key, value) => setItems(items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  return <section className="space-y-3 border-t border-slate-100 pt-6">
    <div className="flex items-center justify-between"><h2 className="text-sm font-black uppercase tracking-wider text-slate-700">{title}</h2><button type="button" onClick={() => setItems([...items, isSocial ? { platform: "", url: "", isVisible: true } : { label: "", to: "", href: "", external: false, isVisible: true }])} className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700"><FaPlus /> Add</button></div>
    {items.map((item, index) => <div key={`${type}-${index}`} className="grid gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-[1fr_1.5fr_auto_auto]">
      <input className={input} placeholder={isSocial ? "Platform (Facebook)" : "Label"} value={isSocial ? item.platform : item.label} onChange={(e) => update(index, isSocial ? "platform" : "label", e.target.value)} />
      <input className={input} placeholder={isSocial ? "https://..." : "Route or URL"} value={isSocial ? item.url : (item.external ? item.href : item.to)} onChange={(e) => update(index, isSocial ? "url" : (item.external ? "href" : "to"), e.target.value)} />
      {!isSocial && <label className="flex items-center gap-2 px-2 text-xs font-semibold text-slate-600"><input type="checkbox" checked={!!item.external} onChange={(e) => update(index, "external", e.target.checked)} /> External</label>}
      <label className="flex items-center gap-2 px-2 text-xs font-semibold text-slate-600"><input type="checkbox" checked={item.isVisible !== false} onChange={(e) => update(index, "isVisible", e.target.checked)} /> Visible</label>
      <button type="button" title="Remove" onClick={() => setItems(items.filter((_, i) => i !== index))} className="p-2 text-red-500"><FaTrash size={13} /></button>
    </div>)}
  </section>;
}

export default function FooterSettings() {
  const { footer, loadFooter, updateFooter, isLoading } = useFooterStore();
  const [form, setForm] = useState(defaultForm);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  useEffect(() => { loadFooter().catch(() => toast.error("Could not load footer settings")); }, [loadFooter]);
  useEffect(() => { if (footer) setForm({ ...defaultForm, ...footer, quickLinks: footer.quickLinks || [], socialLinks: footer.socialLinks || [] }); }, [footer]);
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    try {
      const url = await uploadSingle(file, "footer");
      set("logoUrl", url);
      toast.success("Footer logo uploaded. Save changes to publish it.");
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploadingLogo(false);
      event.target.value = "";
    }
  };
  const submit = async (event) => { event.preventDefault(); try { await updateFooter(form); toast.success("Footer updated successfully"); } catch (error) { toast.error(error?.response?.data?.message || "Failed to update footer"); } };

  return <div className="mx-auto max-w-4xl space-y-6">
    <div><h1 className="text-xl font-bold text-slate-800">Footer Settings</h1><p className="text-sm text-slate-400">Manage every visible footer section, link, social profile and bottom-bar text.</p></div>
    <form onSubmit={submit} className="space-y-7 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label}>Brand name</label><input className={input} value={form.brandName} onChange={(e) => set("brandName", e.target.value)} /></div>
        <div className="space-y-2"><label className={label}>Footer logo</label><input type="file" accept="image/*" onChange={handleLogoUpload} disabled={isUploadingLogo} className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-indigo-700`} />{isUploadingLogo && <p className="flex items-center gap-2 text-xs text-indigo-600"><FaSpinner className="animate-spin" /> Uploading logo...</p>}{form.logoUrl && <img src={form.logoUrl} alt="Footer logo preview" className="h-12 max-w-48 object-contain" />}<input className={input} value={form.logoUrl} onChange={(e) => set("logoUrl", e.target.value)} placeholder="Or paste logo URL" /></div>
      </div>
      <div><label className={label}>Brand description</label><textarea className={`${input} min-h-24`} value={form.brandDescription} onChange={(e) => set("brandDescription", e.target.value)} /></div>
      <div className="grid gap-3 sm:grid-cols-3">{[["isVisible", "Show footer"], ["showSocialLinks", "Show social links"], ["showContact", "Show contact"]].map(([key, text]) => <label key={key} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={!!form[key]} onChange={(e) => set(key, e.target.checked)} /> {text}</label>)}</div>
      <ListEditor title="Social links" type="social" items={form.socialLinks} setItems={(value) => set("socialLinks", value)} />
      <div><label className={label}>Quick links heading</label><input className={input} value={form.quickLinksTitle} onChange={(e) => set("quickLinksTitle", e.target.value)} /></div>
      <ListEditor title="Quick links" type="links" items={form.quickLinks} setItems={(value) => set("quickLinks", value)} />
      <div className="grid gap-4 sm:grid-cols-2"><div><label className={label}>Our Concern heading</label><input className={input} value={form.concernsTitle} onChange={(e) => set("concernsTitle", e.target.value)} /></div><div><label className={label}>Contact heading</label><input className={input} value={form.contactTitle} onChange={(e) => set("contactTitle", e.target.value)} /></div></div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={!!form.showConcernLinks} onChange={(e) => set("showConcernLinks", e.target.checked)} /> Show Our Concern links</label>
      <section className="space-y-4 border-t border-slate-100 pt-6"><h2 className="text-sm font-black uppercase tracking-wider text-slate-700">Bottom bar</h2><div className="grid gap-4 sm:grid-cols-2"><div><label className={label}>Copyright text</label><input className={input} value={form.copyrightText} onChange={(e) => set("copyrightText", e.target.value)} /></div><div><label className={label}>Designed by</label><input className={input} value={form.designedBy} onChange={(e) => set("designedBy", e.target.value)} /></div></div><div><label className={label}>Designer label</label><input className={input} value={form.designedByLabel} onChange={(e) => set("designedByLabel", e.target.value)} /></div></section>
      <section className="grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2"><div><label className={label}>Background color</label><input type="color" className="h-11 w-full rounded-lg" value={form.backgroundColor} onChange={(e) => set("backgroundColor", e.target.value)} /></div><div><label className={label}>Accent color</label><input type="color" className="h-11 w-full rounded-lg" value={form.accentColor} onChange={(e) => set("accentColor", e.target.value)} /></div></section>
      <button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">{isLoading && <FaSpinner className="animate-spin" />} {isLoading ? "Saving..." : "Save Footer Changes"}</button>
    </form>
  </div>;
}
