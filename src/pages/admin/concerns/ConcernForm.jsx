import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdAdd, MdClose, MdCloudUpload, MdDelete } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useConcernStore } from "../../../store/concern/concernStore";
import { uploadSingle } from "../../../utils/cloudinaryUpload";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-600";

const emptyConcern = {
  slug: "",
  routePath: "",
  theme: "emerald",
  eyebrow: "",
  title: "",
  subtitle: "",
  heroImage: "",
  aboutImage: "",
  aboutTitle: "",
  aboutParagraphs: [""],
  stats: [{ value: "", label: "" }],
  servicesTitle: "",
  servicesDescription: "",
  services: [{ title: "", text: "", image: "" }],
  featuresTitle: "",
  featuresDescription: "",
  features: [{ title: "", text: "", image: "" }],
  highlightsTitle: "",
  highlightsDescription: "",
  highlights: [{ title: "", text: "" }],
  processTitle: "",
  processItems: [""],
  heroSliderImages: [],
  galleryImages: [],
  ctaTitle: "",
  ctaText: "",
  ctaLabel: "Contact Us",
  contactTitle: "",
  contactDescription: "",
  contactButtonLabel: "Send Message",
  isPublished: true,
  sortOrder: 0,
};

const cleanList = (items) => items.map((item) => (typeof item === "string" ? item.trim() : item)).filter(Boolean);
const cleanCards = (items) => items.filter((item) => item.title?.trim() || item.text?.trim() || item.image?.trim());
const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const publicRouteFromSlug = (slug) => `/concern/${slug}`;
const normalizeRoutePath = (value = "") => {
  const routePath = String(value || "").trim();
  if (!routePath) return "";
  return routePath.startsWith("/") ? routePath : `/${routePath}`;
};

function ImageUploadField({ label, value, file, preview, onUrlChange, onFileChange, onRemoveFile }) {
  const displayImage = preview || value;

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-3">
        {displayImage ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img src={displayImage} alt={label} className="h-44 w-full object-cover" />
            {preview ? (
              <button
                type="button"
                onClick={onRemoveFile}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/75 text-white transition hover:bg-rose-500"
                aria-label={`Remove ${label}`}
              >
                <MdClose />
              </button>
            ) : null}
          </div>
        ) : null}

        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-teal-200 bg-teal-50/70 px-4 text-center transition hover:border-teal-400 hover:bg-teal-50">
          <MdCloudUpload className="mb-2 text-slate-400" size={24} />
          <span className="text-sm font-semibold text-slate-600">
            {file ? file.name : "Click to upload image"}
          </span>
          <span className="mt-1 text-xs text-slate-400">PNG, JPG, WEBP accepted</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>

        <input
          className={inputClass}
          value={value || ""}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Or paste image URL"
        />
      </div>
    </div>
  );
}

function TextList({ label, values, onChange, placeholder }) {
  const update = (index, value) => onChange(values.map((item, i) => (i === index ? value : item)));
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <textarea value={value} onChange={(e) => update(index, e.target.value)} className={`${inputClass} min-h-20 resize-y`} placeholder={placeholder} />
            <button type="button" onClick={() => remove(index)} className="h-11 rounded-xl bg-rose-50 px-3 text-rose-600 transition hover:bg-rose-100" title="Remove">
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...values, ""])} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100">
        <MdAdd /> Add item
      </button>
    </div>
  );
}

function CardList({ label, values, onChange, withImage = false, imageFiles = {}, imagePreviews = {}, onImageFileChange, onRemoveImageFile, onRemoveCard }) {
  const update = (index, field, value) => onChange(values.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  const remove = (index) => {
    if (onRemoveCard) onRemoveCard(index);
    else onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-4">
        {values.map((item, index) => (
          <div key={index} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <input value={item.title || ""} onChange={(e) => update(index, "title", e.target.value)} className={inputClass} placeholder="Title" />
              {withImage && (
                <div className="md:col-span-1">
                  <ImageUploadField
                    label="Service Image"
                    value={item.image || ""}
                    file={imageFiles[index]}
                    preview={imagePreviews[index]}
                    onUrlChange={(value) => update(index, "image", value)}
                    onFileChange={(e) => onImageFileChange?.(index, e)}
                    onRemoveFile={() => onRemoveImageFile?.(index)}
                  />
                </div>
              )}
            </div>
            <textarea value={item.text || ""} onChange={(e) => update(index, "text", e.target.value)} className={`${inputClass} mt-3 min-h-24 resize-y`} placeholder="Text" />
            <button type="button" onClick={() => remove(index)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100">
              <MdDelete /> Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...values, { title: "", text: "", image: "" }])} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100">
        <MdAdd /> Add block
      </button>
    </div>
  );
}

function ImageListField({ label, items, onItemsChange }) {
  const [urlInput, setUrlInput] = useState("");

  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const nextItems = files.map((file) => ({
      url: "",
      file,
      preview: URL.createObjectURL(file),
    }));
    onItemsChange([...items, ...nextItems]);
    e.target.value = "";
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    onItemsChange([...items, { url: urlInput.trim(), file: null, preview: null }]);
    setUrlInput("");
  };

  const handleRemove = (index) => {
    const item = items[index];
    if (item.preview) URL.revokeObjectURL(item.preview);
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      {items.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img src={item.preview || item.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-rose-500"
              >
                <MdClose size={14} />
              </button>
              <span className="absolute bottom-1 left-1.5 rounded bg-slate-950/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-teal-200 bg-teal-50/70 px-4 py-3 transition hover:border-teal-400 hover:bg-teal-50">
          <MdCloudUpload className="shrink-0 text-teal-500" size={20} />
          <span className="text-sm font-semibold text-slate-600">Click to add images from files</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileAdd} />
        </label>
        <div className="flex gap-2">
          <input
            className={inputClass}
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Or paste image URL and press Enter / Add"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleUrlAdd(); } }}
          />
          <button
            type="button"
            onClick={handleUrlAdd}
            className="shrink-0 rounded-xl bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatList({ values, onChange }) {
  const update = (index, field, value) => onChange(values.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      <label className={labelClass}>Stats</label>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-[1fr,1fr,auto]">
            <input value={item.value || ""} onChange={(e) => update(index, "value", e.target.value)} className={inputClass} placeholder="Value, e.g. 24/7" />
            <input value={item.label || ""} onChange={(e) => update(index, "label", e.target.value)} className={inputClass} placeholder="Label, e.g. Support" />
            <button type="button" onClick={() => remove(index)} className="h-11 rounded-xl bg-rose-50 px-3 text-rose-600 transition hover:bg-rose-100" title="Remove">
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...values, { value: "", label: "" }])} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100">
        <MdAdd /> Add stat
      </button>
    </div>
  );
}

const ConcernForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { concern, isLoading, createConcern, updateConcern, loadConcernById } = useConcernStore();
  const [form, setForm] = useState(emptyConcern);
  const [booting, setBooting] = useState(isEdit);
  const [imageFiles, setImageFiles] = useState({ heroImage: null, aboutImage: null });
  const [imagePreviews, setImagePreviews] = useState({ heroImage: null, aboutImage: null });
  const [serviceImageFiles, setServiceImageFiles] = useState({});
  const [serviceImagePreviews, setServiceImagePreviews] = useState({});
  const [featureImageFiles, setFeatureImageFiles] = useState({});
  const [featureImagePreviews, setFeatureImagePreviews] = useState({});
  const [sliderItems, setSliderItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const safeRevoke = (url) => {
    if (typeof url === "string" && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  useEffect(
    () => () => {
      Object.values(imagePreviews).forEach(safeRevoke);
      Object.values(serviceImagePreviews).forEach(safeRevoke);
      Object.values(featureImagePreviews).forEach(safeRevoke);
      sliderItems.forEach((item) => { if (item.preview) URL.revokeObjectURL(item.preview); });
      galleryItems.forEach((item) => { if (item.preview) URL.revokeObjectURL(item.preview); });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!isEdit) return;
    loadConcernById(id).finally(() => setBooting(false));
  }, [id, isEdit, loadConcernById]);

  useEffect(() => {
    if (isEdit && concern?._id === id) {
      setForm({ ...emptyConcern, ...concern });
      setImageFiles({ heroImage: null, aboutImage: null });
      setImagePreviews({ heroImage: null, aboutImage: null });
      setServiceImageFiles({});
      setServiceImagePreviews({});
      setFeatureImageFiles({});
      setFeatureImagePreviews({});
      setSliderItems((concern.heroSliderImages || []).map((url) => ({ url, file: null, preview: null })));
      setGalleryItems((concern.galleryImages || []).map((url) => ({ url, file: null, preview: null })));
    }
  }, [concern, id, isEdit]);

  const title = useMemo(() => (isEdit ? "Update Concern" : "Create Concern"), [isEdit]);
  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageFileChange = (field, event) => {
    const file = event.target.files?.[0] || null;
    safeRevoke(imagePreviews[field]);
    setImageFiles((prev) => ({ ...prev, [field]: file }));
    setImagePreviews((prev) => ({ ...prev, [field]: file ? URL.createObjectURL(file) : null }));
    event.target.value = "";
  };

  const removeImageFile = (field) => {
    safeRevoke(imagePreviews[field]);
    setImageFiles((prev) => ({ ...prev, [field]: null }));
    setImagePreviews((prev) => ({ ...prev, [field]: null }));
  };

  const handleServiceImageFileChange = (index, event) => {
    const file = event.target.files?.[0] || null;
    safeRevoke(serviceImagePreviews[index]);
    setServiceImageFiles((prev) => ({ ...prev, [index]: file }));
    setServiceImagePreviews((prev) => ({ ...prev, [index]: file ? URL.createObjectURL(file) : null }));
    event.target.value = "";
  };

  const removeServiceImageFile = (index) => {
    safeRevoke(serviceImagePreviews[index]);
    setServiceImageFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setServiceImagePreviews((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const removeServiceCard = (index) => {
    safeRevoke(serviceImagePreviews[index]);
    setForm((prev) => ({ ...prev, services: (prev.services || []).filter((_, i) => i !== index) }));
    setServiceImageFiles((prev) =>
      Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => Number(key) !== index)
          .map(([key, value]) => [Number(key) > index ? Number(key) - 1 : Number(key), value])
      )
    );
    setServiceImagePreviews((prev) =>
      Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => Number(key) !== index)
          .map(([key, value]) => [Number(key) > index ? Number(key) - 1 : Number(key), value])
      )
    );
  };

  const handleFeatureImageFileChange = (index, event) => {
    const file = event.target.files?.[0] || null;
    safeRevoke(featureImagePreviews[index]);
    setFeatureImageFiles((prev) => ({ ...prev, [index]: file }));
    setFeatureImagePreviews((prev) => ({ ...prev, [index]: file ? URL.createObjectURL(file) : null }));
    event.target.value = "";
  };

  const removeFeatureImageFile = (index) => {
    safeRevoke(featureImagePreviews[index]);
    setFeatureImageFiles((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setFeatureImagePreviews((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const removeFeatureCard = (index) => {
    safeRevoke(featureImagePreviews[index]);
    setForm((prev) => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    setFeatureImageFiles((prev) =>
      Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => Number(key) !== index)
          .map(([key, value]) => [Number(key) > index ? Number(key) - 1 : Number(key), value])
      )
    );
    setFeatureImagePreviews((prev) =>
      Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => Number(key) !== index)
          .map(([key, value]) => [Number(key) > index ? Number(key) - 1 : Number(key), value])
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const [heroImageUrl, aboutImageUrl] = await Promise.all([
        imageFiles.heroImage ? uploadSingle(imageFiles.heroImage, "concerns") : Promise.resolve(form.heroImage),
        imageFiles.aboutImage ? uploadSingle(imageFiles.aboutImage, "concerns") : Promise.resolve(form.aboutImage),
      ]);

      const serviceImageEntries = await Promise.all(
        (form.services || []).map(async (service, index) => [
          index,
          serviceImageFiles[index] ? await uploadSingle(serviceImageFiles[index], "concerns/services") : service.image,
        ])
      );
      const serviceImageUrls = Object.fromEntries(serviceImageEntries);

      const featureImageEntries = await Promise.all(
        (form.features || []).map(async (feature, index) => [
          index,
          featureImageFiles[index] ? await uploadSingle(featureImageFiles[index], "concerns/features") : feature.image,
        ])
      );
      const featureImageUrls = Object.fromEntries(featureImageEntries);

      const heroSliderImages = (
        await Promise.all(
          sliderItems.map((item) =>
            item.file ? uploadSingle(item.file, "concerns/slider") : Promise.resolve(item.url)
          )
        )
      ).filter(Boolean);

      const galleryImages = (
        await Promise.all(
          galleryItems.map((item) =>
            item.file ? uploadSingle(item.file, "concerns/gallery") : Promise.resolve(item.url)
          )
        )
      ).filter(Boolean);

      const normalizedSlug = slugify(form.slug);
      const payload = {
        ...form,
        slug: normalizedSlug,
        routePath: normalizeRoutePath(form.routePath) || publicRouteFromSlug(normalizedSlug),
        heroImage: heroImageUrl,
        aboutImage: aboutImageUrl,
        heroSliderImages,
        galleryImages,
        sortOrder: Number(form.sortOrder || 0),
        aboutParagraphs: cleanList(form.aboutParagraphs),
        processItems: cleanList(form.processItems),
        stats: (form.stats || []).filter((item) => item.value?.trim() || item.label?.trim()),
        services: cleanCards((form.services || []).map((service, index) => ({ ...service, image: serviceImageUrls[index] || service.image }))),
        features: cleanCards((form.features || []).map((feature, index) => ({ ...feature, image: featureImageUrls[index] || feature.image }))),
        highlights: cleanCards(form.highlights),
      };

      if (isEdit) await updateConcern(id, payload);
      else await createConcern(payload);
      navigate("/adminDashboard/viewConcerns");
    } catch (error) {
      console.error("Concern save failed:", error);
      toast.error(error?.message || "Concern image upload failed. Please try a JPG, PNG, or WEBP image.");
    } finally {
      setIsSaving(false);
    }
  };

  if (booting) {
    return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-teal-600" size={28} /></div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50">
          <MdArrowBack size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
          <p className="text-sm text-slate-400">Edit public concern page content, sections, images, and CTA.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Slug *</label><input className={inputClass} value={form.slug} onChange={(e) => setField("slug", e.target.value)} placeholder="northsouth-garments" required /></div>
          <div><label className={labelClass}>Public Route</label><input className={inputClass} value={form.routePath || ""} onChange={(e) => setField("routePath", e.target.value)} placeholder="/northsouthGarments" /></div>
          <div><label className={labelClass}>Theme</label><select className={inputClass} value={form.theme} onChange={(e) => setField("theme", e.target.value)}><option value="emerald">Emerald</option><option value="teal">Teal</option><option value="blue">Blue</option><option value="amber">Amber</option></select></div>
          <div><label className={labelClass}>Sort Order</label><input type="number" className={inputClass} value={form.sortOrder || 0} onChange={(e) => setField("sortOrder", e.target.value)} /></div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Eyebrow</label><input className={inputClass} value={form.eyebrow || ""} onChange={(e) => setField("eyebrow", e.target.value)} /></div>
          <div><label className={labelClass}>Title *</label><input className={inputClass} value={form.title || ""} onChange={(e) => setField("title", e.target.value)} required /></div>
        </div>
        <div><label className={labelClass}>Subtitle</label><textarea className={`${inputClass} min-h-24 resize-y`} value={form.subtitle || ""} onChange={(e) => setField("subtitle", e.target.value)} /></div>

        <ImageListField
          label="Hero Slider Images (shown in hero carousel — add multiple for a slideshow)"
          items={sliderItems}
          onItemsChange={setSliderItems}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <ImageUploadField
            label="Hero Image (fallback — used if no slider images above)"
            value={form.heroImage || ""}
            file={imageFiles.heroImage}
            preview={imagePreviews.heroImage}
            onUrlChange={(value) => setField("heroImage", value)}
            onFileChange={(event) => handleImageFileChange("heroImage", event)}
            onRemoveFile={() => removeImageFile("heroImage")}
          />
          <ImageUploadField
            label="About Image"
            value={form.aboutImage || ""}
            file={imageFiles.aboutImage}
            preview={imagePreviews.aboutImage}
            onUrlChange={(value) => setField("aboutImage", value)}
            onFileChange={(event) => handleImageFileChange("aboutImage", event)}
            onRemoveFile={() => removeImageFile("aboutImage")}
          />
        </div>
        <div><label className={labelClass}>About Title</label><input className={inputClass} value={form.aboutTitle || ""} onChange={(e) => setField("aboutTitle", e.target.value)} /></div>
        <TextList label="About Paragraphs" values={form.aboutParagraphs || []} onChange={(value) => setField("aboutParagraphs", value)} placeholder="Write paragraph..." />

        <StatList values={form.stats || []} onChange={(value) => setField("stats", value)} />

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Services Title</label><input className={inputClass} value={form.servicesTitle || ""} onChange={(e) => setField("servicesTitle", e.target.value)} /></div>
          <div><label className={labelClass}>Services Description</label><input className={inputClass} value={form.servicesDescription || ""} onChange={(e) => setField("servicesDescription", e.target.value)} /></div>
        </div>
        <CardList
          label="Service Cards"
          values={form.services || []}
          onChange={(value) => setField("services", value)}
          withImage
          imageFiles={serviceImageFiles}
          imagePreviews={serviceImagePreviews}
          onImageFileChange={handleServiceImageFileChange}
          onRemoveImageFile={removeServiceImageFile}
          onRemoveCard={removeServiceCard}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Features Title</label><input className={inputClass} value={form.featuresTitle || ""} onChange={(e) => setField("featuresTitle", e.target.value)} /></div>
          <div><label className={labelClass}>Features Description</label><input className={inputClass} value={form.featuresDescription || ""} onChange={(e) => setField("featuresDescription", e.target.value)} /></div>
        </div>
        <CardList
          label="Feature Cards"
          values={form.features || []}
          onChange={(value) => setField("features", value)}
          withImage
          imageFiles={featureImageFiles}
          imagePreviews={featureImagePreviews}
          onImageFileChange={handleFeatureImageFileChange}
          onRemoveImageFile={removeFeatureImageFile}
          onRemoveCard={removeFeatureCard}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Highlights Title</label><input className={inputClass} value={form.highlightsTitle || ""} onChange={(e) => setField("highlightsTitle", e.target.value)} /></div>
          <div><label className={labelClass}>Highlights Description</label><input className={inputClass} value={form.highlightsDescription || ""} onChange={(e) => setField("highlightsDescription", e.target.value)} /></div>
        </div>
        <CardList label="Highlight Cards" values={form.highlights || []} onChange={(value) => setField("highlights", value)} />

        <div><label className={labelClass}>Process Title</label><input className={inputClass} value={form.processTitle || ""} onChange={(e) => setField("processTitle", e.target.value)} /></div>
        <TextList label="Process Items" values={form.processItems || []} onChange={(value) => setField("processItems", value)} placeholder="Process step..." />

        <ImageListField
          label="Gallery Images (shown in the gallery section grid)"
          items={galleryItems}
          onItemsChange={setGalleryItems}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div><label className={labelClass}>CTA Title</label><input className={inputClass} value={form.ctaTitle || ""} onChange={(e) => setField("ctaTitle", e.target.value)} /></div>
          <div><label className={labelClass}>CTA Label</label><input className={inputClass} value={form.ctaLabel || ""} onChange={(e) => setField("ctaLabel", e.target.value)} /></div>
          <label className="flex items-center gap-3 pt-7 text-sm font-semibold text-slate-600"><input type="checkbox" checked={form.isPublished !== false} onChange={(e) => setField("isPublished", e.target.checked)} /> Published</label>
        </div>
        <div><label className={labelClass}>CTA Text</label><textarea className={`${inputClass} min-h-20 resize-y`} value={form.ctaText || ""} onChange={(e) => setField("ctaText", e.target.value)} /></div>

        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass}>Contact Form Title</label><input className={inputClass} value={form.contactTitle || ""} onChange={(e) => setField("contactTitle", e.target.value)} /></div>
          <div><label className={labelClass}>Contact Button Label</label><input className={inputClass} value={form.contactButtonLabel || ""} onChange={(e) => setField("contactButtonLabel", e.target.value)} /></div>
        </div>
        <div><label className={labelClass}>Contact Form Description</label><textarea className={`${inputClass} min-h-20 resize-y`} value={form.contactDescription || ""} onChange={(e) => setField("contactDescription", e.target.value)} /></div>

        <button type="submit" disabled={isLoading || isSaving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-teal-800 disabled:opacity-60">
          {(isLoading || isSaving) && <FaSpinner className="animate-spin" />}
          {isLoading || isSaving ? "Saving..." : title}
        </button>
      </form>
    </div>
  );
};

export default ConcernForm;
