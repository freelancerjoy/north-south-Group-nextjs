import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { MdCloudUpload, MdClose, MdInfoOutline } from "react-icons/md";
import { uploadSingle } from "../../../utils/cloudinaryUpload";
import { useAboutStore } from "../../../store/about/aboutStore";
import { defaultAboutContent } from "../../about/defaultAboutContent";

const inp =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100";
const lbl = "mb-2 block text-sm font-semibold text-slate-700";
const sectionCard =
  "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 space-y-5";
const sectionHead = "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-700";
const helperText = "mt-1 text-xs leading-5 text-slate-500";
const iconOptions = ["FaBuilding", "FaLeaf", "FaShieldAlt", "FaHandshake"];
const pageSections = [
  "Hero",
  "Overview",
  "Stats & Strengths",
  "Video",
  "Leadership",
  "CSR Gallery",
  "Mission Cards",
];

const SectionIntro = ({ step, eyebrow, title, note }) => (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <p className={sectionHead}>{step ? `Section ${step} / ${eyebrow}` : eyebrow}</p>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {note ? <p className="max-w-xl text-sm leading-6 text-slate-500">{note}</p> : null}
  </div>
);

const TextField = ({ label, note, ...props }) => (
  <div>
    <label className={lbl}>{label}</label>
    <input {...props} className={inp} />
    {note ? <p className={helperText}>{note}</p> : null}
  </div>
);

const TextAreaField = ({ label, note, rows = 3, ...props }) => (
  <div>
    <label className={lbl}>{label}</label>
    <textarea {...props} rows={rows} className={inp} />
    {note ? <p className={helperText}>{note}</p> : null}
  </div>
);

const ImageListField = ({ label, note, items, onChange }) => {
  const [urlInput, setUrlInput] = useState("");

  const addFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange([...items, { url: "", file, preview: URL.createObjectURL(file) }]);
    event.target.value = "";
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    onChange([...items, { url: urlInput.trim(), file: null, preview: null }]);
    setUrlInput("");
  };

  const remove = (index) => {
    const item = items[index];
    if (item?.preview) URL.revokeObjectURL(item.preview);
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={lbl}>{label}</label>
        {note ? <p className="-mt-1 mb-2 text-xs leading-5 text-slate-500">{note}</p> : null}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <img src={item.preview || item.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/75 text-white transition hover:bg-rose-500"
              >
                <MdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="grid gap-3 lg:grid-cols-[1.1fr,1fr]">
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/70 px-4 py-4 hover:border-cyan-400 hover:bg-cyan-50">
          <MdCloudUpload className="text-cyan-600" size={22} />
          <div>
            <p className="text-sm font-semibold text-slate-700">Add image from file</p>
            <p className="text-xs text-slate-500">Upload and preview before saving.</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={addFile} />
        </label>
        <div className="flex gap-2">
          <input
            className={inp}
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
            placeholder="Or paste image URL"
          />
          <button
            type="button"
            onClick={addUrl}
            className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

const TextListField = ({ label, note, values, onChange, placeholder = "Write here..." }) => {
  const update = (index, value) => onChange(values.map((item, i) => (i === index ? value : item)));
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      <label className={lbl}>{label}</label>
      {note ? <p className="-mt-1 mb-3 text-xs leading-5 text-slate-500">{note}</p> : null}
      <div className="space-y-3">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              className={`${inp} min-h-24 resize-y`}
              value={value}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-2xl bg-rose-50 px-3 text-rose-600 transition hover:bg-rose-100"
            >
              <FaTrash size={13} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
      >
        <FaPlus size={12} /> Add item
      </button>
    </div>
  );
};

const StatListField = ({ values, onChange }) => {
  const update = (index, field, value) =>
    onChange(values.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      <label className={lbl}>Stats</label>
      <p className="-mt-1 mb-3 text-xs leading-5 text-slate-500">Small highlight counters shown in the overview area.</p>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-[1fr,1fr,auto]">
            <input
              className={inp}
              value={item.value || ""}
              onChange={(event) => update(index, "value", event.target.value)}
              placeholder="Value"
            />
            <input
              className={inp}
              value={item.label || ""}
              onChange={(event) => update(index, "label", event.target.value)}
              placeholder="Label"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-2xl bg-rose-50 px-3 text-rose-600 transition hover:bg-rose-100"
            >
              <FaTrash size={13} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, { value: "", label: "" }])}
        className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
      >
        <FaPlus size={12} /> Add stat
      </button>
    </div>
  );
};

const CardListField = ({ label, note, values, onChange, withIcon = false, withImage = false, imageLabel = "Card Image" }) => {
  const update = (index, field, value) =>
    onChange(values.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  const remove = (index) => {
    const item = values[index];
    if (item?.preview) {
      URL.revokeObjectURL(item.preview);
    }
    onChange(values.filter((_, i) => i !== index));
  };
  const updateImage = (index, file) => {
    if (!file) return;
    onChange(
      values.map((item, i) => {
        if (i !== index) return item;
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return {
          ...item,
          file,
          preview: URL.createObjectURL(file),
        };
      })
    );
  };
  const clearImage = (index) => {
    onChange(
      values.map((item, i) => {
        if (i !== index) return item;
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return {
          ...item,
          img: "",
          image: "",
          file: null,
          preview: null,
        };
      })
    );
  };

  return (
    <div>
      <label className={lbl}>{label}</label>
      {note ? <p className="-mt-1 mb-3 text-xs leading-5 text-slate-500">{note}</p> : null}
      <div className="space-y-4">
        {values.map((item, index) => (
          <div key={index} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inp}
                value={item.title || ""}
                onChange={(event) => update(index, "title", event.target.value)}
                placeholder="Title"
              />
              {withIcon ? (
                <select
                  className={inp}
                  value={item.iconKey || iconOptions[0]}
                  onChange={(event) => update(index, "iconKey", event.target.value)}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              ) : null}
              {withImage ? (
                <div className="md:col-span-2 space-y-3">
                  <label className={lbl}>{imageLabel}</label>
                  {(item.preview || item.img || item.image) ? (
                    <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      <img src={item.preview || item.img || item.image} alt={item.title || "Card"} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => clearImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/75 text-white transition hover:bg-rose-500"
                      >
                        <MdClose size={16} />
                      </button>
                    </div>
                  ) : null}
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/70 px-4 py-4 hover:border-cyan-400 hover:bg-cyan-50">
                    <MdCloudUpload className="text-cyan-600" size={22} />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Upload card image</p>
                      <p className="text-xs text-slate-500">Choose an image from your device.</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        updateImage(index, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                  </label>
                </div>
              ) : null}
            </div>
            <textarea
              className={`${inp} mt-3 min-h-24 resize-y`}
              value={item.text || ""}
              onChange={(event) => update(index, "text", event.target.value)}
              placeholder="Text"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <FaTrash size={13} /> Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onChange([
            ...values,
            withImage
              ? { title: "", text: "", img: "", file: null, preview: null }
              : withIcon
                ? { title: "", text: "", iconKey: iconOptions[0] }
                : { title: "", text: "" },
          ])
        }
        className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
      >
        <FaPlus size={12} /> Add card
      </button>
    </div>
  );
};

const LeaderListField = ({ values, onChange }) => {
  const update = (index, field, value) =>
    onChange(values.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  const remove = (index) => {
    const item = values[index];
    if (item?.preview) {
      URL.revokeObjectURL(item.preview);
    }
    onChange(values.filter((_, i) => i !== index));
  };
  const updateImage = (index, file) => {
    if (!file) return;
    onChange(
      values.map((item, i) => {
        if (i !== index) return item;
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return {
          ...item,
          file,
          preview: URL.createObjectURL(file),
        };
      })
    );
  };
  const clearImage = (index) => {
    onChange(
      values.map((item, i) => {
        if (i !== index) return item;
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return {
          ...item,
          img: "",
          file: null,
          preview: null,
        };
      })
    );
  };

  return (
    <div>
      <label className={lbl}>Leadership Team</label>
      <p className="-mt-1 mb-3 text-xs leading-5 text-slate-500">Manage executive names, roles, and profile images for the public page.</p>
      <div className="space-y-4">
        {values.map((item, index) => (
          <div key={index} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inp}
                value={item.name || ""}
                onChange={(event) => update(index, "name", event.target.value)}
                placeholder="Name"
              />
              <input
                className={inp}
                value={item.role || ""}
                onChange={(event) => update(index, "role", event.target.value)}
                placeholder="Role"
              />
              <div className="md:col-span-2 space-y-3">
                <label className={lbl}>Leader Image</label>
                {(item.preview || item.img) ? (
                  <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <img src={item.preview || item.img} alt={item.name || "Leader"} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => clearImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/75 text-white transition hover:bg-rose-500"
                    >
                      <MdClose size={16} />
                    </button>
                  </div>
                ) : null}
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-cyan-200 bg-cyan-50/70 px-4 py-4 hover:border-cyan-400 hover:bg-cyan-50">
                  <MdCloudUpload className="text-cyan-600" size={22} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Upload leader image</p>
                    <p className="text-xs text-slate-500">Choose a portrait image from your device.</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      updateImage(index, event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <FaTrash size={13} /> Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...values, { id: "", name: "", role: "", img: "", file: null, preview: null }])}
        className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
      >
        <FaPlus size={12} /> Add leader
      </button>
    </div>
  );
};

const AboutPageSettings = () => {
  const { aboutContent, loadAboutContent, updateAboutContent, isLoading } = useAboutStore();
  const [form, setForm] = useState(defaultAboutContent);
  const [heroSlides, setHeroSlides] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAboutContent().catch(() => {});
  }, [loadAboutContent]);

  useEffect(() => {
    if (!aboutContent) return;
    const merged = { ...defaultAboutContent, ...aboutContent };
    setHeroSlides((merged.heroSlides || []).map((url) => ({ url, file: null, preview: null })));
    setForm({
      ...merged,
      leaders: (merged.leaders || []).map((leader) => ({
        ...leader,
        file: null,
        preview: null,
      })),
      csrImages: (merged.csrImages || []).map((item) => ({
        ...item,
        file: null,
        preview: null,
      })),
    });
  }, [aboutContent]);

  useEffect(
    () => () => {
      heroSlides.forEach((item) => {
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
      (form.leaders || []).forEach((leader) => {
        if (leader?.preview) {
          URL.revokeObjectURL(leader.preview);
        }
      });
      (form.csrImages || []).forEach((item) => {
        if (item?.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    },
    [heroSlides, form.leaders, form.csrImages]
  );

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const heroSlideUrls = (
        await Promise.all(
          heroSlides.map((item) => (item.file ? uploadSingle(item.file, "about/hero") : Promise.resolve(item.url)))
        )
      ).filter(Boolean);
      const leaderPayload = (
        await Promise.all(
          (form.leaders || []).map(async (leader) => ({
            ...leader,
            img: leader.file ? await uploadSingle(leader.file, "about/leaders") : leader.img || "",
            file: undefined,
            preview: undefined,
          }))
        )
      ).filter((item) => item.name || item.role || item.img);
      const csrPayload = (
        await Promise.all(
          (form.csrImages || []).map(async (item) => ({
            ...item,
            img: item.file ? await uploadSingle(item.file, "about/csr") : item.img || item.image || "",
            image: undefined,
            file: undefined,
            preview: undefined,
          }))
        )
      ).filter((item) => item.title || item.img);

      const payload = {
        ...form,
        heroSlides: heroSlideUrls,
        overviewParagraphs: (form.overviewParagraphs || []).filter(Boolean),
        guidancePoints: (form.guidancePoints || []).filter(Boolean),
        stats: (form.stats || []).filter((item) => item.value || item.label),
        strengths: (form.strengths || []).filter((item) => item.title || item.text),
        leaders: leaderPayload,
        csrImages: csrPayload,
        missionCards: (form.missionCards || []).filter((item) => item.title || item.text),
      };

      await updateAboutContent(payload);
      toast.success("About page updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to update about page.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-1 pb-10">
      <div className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.32),_transparent_34%),linear-gradient(135deg,#020617_0%,#0f172a_52%,#164e63_100%)] p-6 text-white shadow-[0_30px_90px_-50px_rgba(8,145,178,0.85)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              <MdInfoOutline className="text-sm" />
              About Page CMS
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Edit About Page</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                Keep the About Us page polished from one place. This form now follows the same design language as the
                Industrial City editor so the admin experience stays consistent.
              </p>
            </div>
          </div>
          <div className="grid gap-3 rounded-[28px] border border-white/12 bg-white/8 p-4 text-sm text-slate-100 sm:min-w-[280px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/80">Live Modules</p>
              <p className="mt-1 text-lg font-bold text-white">{pageSections.length} frontend sections</p>
            </div>
            <p className="text-sm leading-6 text-slate-200">
              Hero, overview, strengths, leadership, CSR, and mission cards can all be updated from here.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6">
        <p className={sectionHead}>Frontend Section Order</p>
        <div className="flex flex-wrap gap-2">
          {pageSections.map((section, index) => (
            <span
              key={section}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600"
            >
              {index + 1}. {section}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className={sectionCard}>
          <SectionIntro
            step="01"
            eyebrow="Hero"
            title="Top banner content"
            note="These fields control the opening message and slider visuals shown on the public About page."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Hero Eyebrow" value={form.heroEyebrow || ""} onChange={(event) => setField("heroEyebrow", event.target.value)} />
            <TextField label="Hero Title" value={form.heroTitle || ""} onChange={(event) => setField("heroTitle", event.target.value)} />
          </div>
          <TextAreaField
            label="Hero Subtitle"
            rows={4}
            value={form.heroSubtitle || ""}
            onChange={(event) => setField("heroSubtitle", event.target.value)}
          />
          <ImageListField
            label="Hero Slider Images"
            note="Add multiple visuals for the hero slider. Upload from file or paste direct image URLs."
            items={heroSlides}
            onChange={setHeroSlides}
          />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="02"
            eyebrow="Overview"
            title="Company introduction copy"
            note="Use this block to shape the story, highlight badge text, and long-form overview paragraphs."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Overview Eyebrow" value={form.overviewEyebrow || ""} onChange={(event) => setField("overviewEyebrow", event.target.value)} />
            <TextField label="Overview Title" value={form.overviewTitle || ""} onChange={(event) => setField("overviewTitle", event.target.value)} />
          </div>
          <TextAreaField
            label="Overview Intro Text"
            rows={4}
            value={form.overviewText || ""}
            onChange={(event) => setField("overviewText", event.target.value)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Overview Badge" value={form.overviewBadge || ""} onChange={(event) => setField("overviewBadge", event.target.value)} />
            <TextField
              label="Overview Highlight Eyebrow"
              value={form.overviewHighlightEyebrow || ""}
              onChange={(event) => setField("overviewHighlightEyebrow", event.target.value)}
            />
          </div>
          <TextField
            label="Overview Highlight Title"
            value={form.overviewHighlightTitle || ""}
            onChange={(event) => setField("overviewHighlightTitle", event.target.value)}
          />
          <TextListField
            label="Overview Paragraphs"
            note="Each item becomes a separate paragraph in the About page overview content."
            values={form.overviewParagraphs || [""]}
            onChange={(value) => setField("overviewParagraphs", value)}
          />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="03"
            eyebrow="Stats & Strengths"
            title="Numbers and trust builders"
            note="These content blocks support the overview with counters, guidance points, and visual strength cards."
          />
          <StatListField values={form.stats || []} onChange={(value) => setField("stats", value)} />
          <CardListField
            label="Strength Cards"
            note="Use a short title, supporting text, and one of the preset icons."
            values={form.strengths || []}
            onChange={(value) => setField("strengths", value)}
            withIcon
          />
          <TextListField
            label="Guidance Points"
            note="Short bullet-style support copy shown alongside overview highlights."
            values={form.guidancePoints || [""]}
            onChange={(value) => setField("guidancePoints", value)}
          />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="04"
            eyebrow="Video"
            title="About video block"
            note="Keep the embed and supporting text fresh so the video section feels active and relevant."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Video Eyebrow" value={form.videoEyebrow || ""} onChange={(event) => setField("videoEyebrow", event.target.value)} />
            <TextField label="Video Title" value={form.videoTitle || ""} onChange={(event) => setField("videoTitle", event.target.value)} />
          </div>
          <TextAreaField
            label="Video Description"
            rows={4}
            value={form.videoText || ""}
            onChange={(event) => setField("videoText", event.target.value)}
          />
          <TextField
            label="YouTube Video URL"
            note="Paste the full YouTube link that should be embedded on the public page."
            value={form.videoUrl || ""}
            onChange={(event) => setField("videoUrl", event.target.value)}
          />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="05"
            eyebrow="Leadership"
            title="Leadership team presentation"
            note="Manage the section heading and each leader card from here."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Leadership Eyebrow" value={form.leadershipEyebrow || ""} onChange={(event) => setField("leadershipEyebrow", event.target.value)} />
            <TextField label="Leadership Title" value={form.leadershipTitle || ""} onChange={(event) => setField("leadershipTitle", event.target.value)} />
          </div>
          <TextAreaField
            label="Leadership Description"
            rows={4}
            value={form.leadershipText || ""}
            onChange={(event) => setField("leadershipText", event.target.value)}
          />
          <LeaderListField values={form.leaders || []} onChange={(value) => setField("leaders", value)} />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="06"
            eyebrow="CSR Gallery"
            title="CSR headline and showcase cards"
            note="Use this section to update the community impact gallery content."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="CSR Eyebrow" value={form.csrEyebrow || ""} onChange={(event) => setField("csrEyebrow", event.target.value)} />
            <TextField label="CSR Title" value={form.csrTitle || ""} onChange={(event) => setField("csrTitle", event.target.value)} />
          </div>
          <TextAreaField
            label="CSR Description"
            rows={4}
            value={form.csrText || ""}
            onChange={(event) => setField("csrText", event.target.value)}
          />
          <CardListField
            label="CSR Gallery Cards"
            note="Each card supports title, text, and image URL."
            values={form.csrImages || []}
            onChange={(value) => setField("csrImages", value)}
            withImage
          />
        </section>

        <section className={sectionCard}>
          <SectionIntro
            step="07"
            eyebrow="Mission Cards"
            title="Mission, vision, and promise cards"
            note="Add or refine the final message cards shown near the bottom of the About page."
          />
          <CardListField
            label="Mission / Vision / Promise Cards"
            note="Each card needs a title and supporting text."
            values={form.missionCards || []}
            onChange={(value) => setField("missionCards", value)}
          />
        </section>

        <section className="overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#020617_0%,#0f172a_55%,#164e63_100%)] p-6 text-white shadow-[0_28px_100px_-52px_rgba(8,145,178,0.95)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-100">Ready To Save</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Publish the latest About page content</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Saving will update the public About Us page content from the backend-managed CMS data.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving || isLoading}
              className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving || isLoading ? <FaSpinner className="animate-spin" /> : null}
              {saving || isLoading ? "Saving..." : "Save About Page"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AboutPageSettings;
