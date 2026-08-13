import { FaSpinner } from "react-icons/fa";
import { MdCheckCircle, MdClose, MdCloudUpload, MdTimer, MdPictureAsPdf, MdOpenInNew } from "react-icons/md";

export const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100";

export const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
export const sectionTitleClass =
  "mb-5 border-b border-emerald-100 pb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-700";
export const cardClass =
  "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6";

const submitThemes = {
  create: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-100 text-emerald-700",
    progress: "from-emerald-500 via-green-500 to-emerald-400",
    activeStep: "border-emerald-200 bg-emerald-50 text-emerald-700",
    completeStep: "border-emerald-100 bg-emerald-50/70 text-emerald-700",
  },
  update: {
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "bg-amber-100 text-amber-700",
    progress: "from-amber-500 via-orange-500 to-amber-400",
    activeStep: "border-amber-200 bg-amber-50 text-amber-700",
    completeStep: "border-amber-100 bg-amber-50/70 text-amber-700",
  },
};

export const genericUpdateSteps = [
  {
    title: "Prepare",
    description: "Checking the latest form values before submitting.",
  },
  {
    title: "Update",
    description: "Sending the changes to the dashboard service.",
  },
  {
    title: "Save",
    description: "Applying the final changes and refreshing the record.",
  },
];

export const mediaUpdateSteps = [
  {
    title: "Prepare",
    description: "Checking the selected files and form values.",
  },
  {
    title: "Upload",
    description: "Sending the replacement media to cloud storage.",
  },
  {
    title: "Save",
    description: "Applying the final changes and refreshing the record.",
  },
];

export const getFileLabel = (value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return "Click to upload";
  return Array.isArray(value) ? `${value.length} file(s)` : value.name;
};

export function ProjectSubmitOverlay({
  active,
  mode = "create",
  title,
  detail,
  step = 0,
  entityLabel = "Project",
  steps = mediaUpdateSteps,
  notice = "Large image sets can take a little longer. Please keep this page open until the success message appears.",
}) {
  if (!active) return null;

  const theme = submitThemes[mode] || submitThemes.create;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_40px_120px_-56px_rgba(15,23,42,0.65)]">
        <div className={`h-1.5 w-full bg-gradient-to-r ${theme.progress}`} />
        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${theme.icon}`}>
              <FaSpinner className="animate-spin" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] ${theme.chip}`}>
                {mode === "update" ? `Updating ${entityLabel}` : `Creating ${entityLabel}`}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {steps.map((item, index) => {
              const isComplete = index < step;
              const isActive = index === step;
              const stateClass = isComplete
                ? theme.completeStep
                : isActive
                  ? theme.activeStep
                  : "border-slate-200 bg-slate-50 text-slate-500";

              return (
                <div key={item.title} className={`rounded-2xl border p-4 transition-all ${stateClass}`}>
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <MdCheckCircle size={18} />
                    ) : isActive ? (
                      <FaSpinner className="animate-spin" size={16} />
                    ) : (
                      <MdTimer size={18} />
                    )}
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-5">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-500">
            {notice}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FileInput({ label, multiple, accept, onChange, value, helperText }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <label className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 px-4 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50">
        <MdCloudUpload className="mb-2 text-slate-400" size={24} />
        <span className="text-sm font-medium text-slate-600">{getFileLabel(value)}</span>
        {helperText ? <span className="mt-1 text-xs text-slate-400">{helperText}</span> : null}
        <input type="file" multiple={multiple} accept={accept} className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}

export function PreviewGrid({ title, previews, onRemove }) {
  if (!previews.length) return null;

  return (
    <div className="space-y-2">
      <p className={labelClass}>{title}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {previews.map((src, index) => (
          <div key={`${title}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img src={src} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-rose-500"
              aria-label={`Remove ${title} ${index + 1}`}
            >
              <MdClose size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SingleImagePreview({ title, preview, onRemove }) {
  if (!preview) return null;

  return (
    <div className="space-y-2">
      <p className={labelClass}>{title}</p>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <img src={preview} alt={title} className="max-h-72 w-full object-contain bg-white" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-rose-500"
          aria-label={`Remove ${title}`}
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
}

export function FeatureSectionEditor({
  field,
  value,
  onTextChange,
  preview,
  onFileChange,
  onRemoveImage,
  reverse = false,
}) {
  const textPanel = (
    <div className="flex flex-col justify-center rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-600">
        Detail Content
      </p>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{field.label}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This text will appear beside the image on the project details page.
      </p>
      <div className="mt-5">
        <label className={labelClass}>{field.label} Description</label>
        <textarea
          value={value}
          onChange={(event) => onTextChange(field.key, event.target.value)}
          className={`${inputClass} min-h-40 resize-none`}
          placeholder={field.placeholder}
        />
      </div>
    </div>
  );

  const imagePanel = (
    <div className="rounded-[24px] border border-emerald-200 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_55%),linear-gradient(135deg,#f8fffb_0%,#effaf4_100%)] p-5 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-600">Section Image</p>
      <h4 className="mt-2 text-xl font-semibold text-slate-900">{field.label} Image</h4>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Upload the image that should appear directly beside this section.
      </p>
      <div className="mt-5">
        {preview ? (
          <SingleImagePreview title={`${field.label} Preview`} preview={preview} onRemove={onRemoveImage} />
        ) : (
          <label className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-white/70 p-6 text-center transition-all hover:border-emerald-500 hover:bg-white">
            <MdCloudUpload className="mb-3 text-slate-400" size={30} />
            <span className="text-sm font-semibold text-slate-700">Upload {field.label} image</span>
            <span className="mt-1 text-xs text-slate-400">PNG, JPG, WEBP accepted</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
        )}
        {preview ? (
          <label className="mt-4 flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm font-medium text-slate-600 transition hover:border-emerald-400 hover:text-emerald-700">
            Replace image
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {reverse ? imagePanel : textPanel}
      {reverse ? textPanel : imagePanel}
    </div>
  );
}

export function BrochurePdfInput({ onChange, file }) {
  return (
    <div>
      <label className={labelClass}>Brochure PDF</label>
      <label className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 px-4 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50">
        <MdPictureAsPdf className="mb-2 text-rose-400" size={26} />
        <span className="text-sm font-medium text-slate-600">
          {file ? file.name : "Click to upload PDF"}
        </span>
        <span className="mt-1 text-xs text-slate-400">Downloadable project brochure</span>
        <input type="file" accept="application/pdf" className="hidden" onChange={onChange} />
      </label>
      {file && (
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          <MdPictureAsPdf size={18} className="shrink-0" />
          <span className="truncate font-medium">{file.name}</span>
          <span className="ml-auto shrink-0 text-xs text-rose-400">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      )}
    </div>
  );
}

export function ExistingBrochureLink({ url }) {
  if (!url) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
      <MdPictureAsPdf size={22} className="shrink-0 text-rose-500" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Current Brochure</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 flex items-center gap-1 truncate text-sm font-medium text-slate-700 hover:text-emerald-700"
        >
          View / Download existing PDF
          <MdOpenInNew size={14} className="shrink-0" />
        </a>
      </div>
    </div>
  );
}
