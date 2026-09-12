import { MdAdd, MdCloudUpload, MdDelete } from "react-icons/md";
import { getYouTubeEmbedUrl } from "../../../components/VideoUtility";

export const createEmptyVideoItem = (index = 0) => ({
  label: `Video ${String(index + 1).padStart(2, "0")}`,
  url: "",
  file: null,
  preview: "",
  public_id: "",
});

export const prepareVideoGalleryFormData = (formData, items = []) => {
  let fileIndex = 0;
  const payload = items
    .filter((item) => item?.preview || item?.url || item?.file)
    .map((item, index) => {
      const next = {
        label: item.label || `Video ${index + 1}`,
        url: item.file ? "" : (item.url || item.preview || "").trim(),
        public_id: item.file ? "" : item.public_id || "",
      };
      if (item.file) {
        next.fileIndex = fileIndex;
        formData.append("videoGalleryVideos", item.file);
        fileIndex += 1;
      }
      return next;
    });

  formData.append("videoGallery", JSON.stringify(payload));
};

const VideoPreview = ({ src, title }) => {
  const embedUrl = getYouTubeEmbedUrl(src);
  if (!src) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center px-4 text-center text-xs font-semibold text-slate-400">
        Preview
      </div>
    );
  }
  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        className="h-full min-h-40 w-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <video src={src} controls className="h-full min-h-40 w-full object-cover" />;
};

export default function VideoGalleryManager({
  items,
  setItems,
  title = "Video Gallery",
  note = "Add YouTube links or upload video files for the public video section.",
  accent = "emerald",
}) {
  const color = accent === "amber" ? "amber" : accent === "cyan" ? "cyan" : "emerald";
  const borderClass = color === "amber" ? "border-amber-200" : color === "cyan" ? "border-cyan-200" : "border-emerald-200";
  const focusClass = color === "amber" ? "focus:border-amber-400 focus:ring-amber-100" : color === "cyan" ? "focus:border-cyan-400 focus:ring-cyan-100" : "focus:border-emerald-400 focus:ring-emerald-100";
  const addClass = color === "amber" ? "bg-amber-600 hover:bg-amber-700" : color === "cyan" ? "bg-cyan-600 hover:bg-cyan-700" : "bg-emerald-600 hover:bg-emerald-700";

  const updateItem = (index, patch) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  };

  const addItem = () => setItems((current) => [...current, createEmptyVideoItem(current.length)]);

  const removeItem = (index) => {
    const item = items[index];
    if (item?.preview?.startsWith("blob:")) URL.revokeObjectURL(item.preview);
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className={`rounded-2xl border ${borderClass} bg-white p-4 shadow-sm space-y-4`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{note}</p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white transition ${addClass}`}
        >
          <MdAdd size={16} />
          Add Video
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const previewSrc = item.preview || item.url;
          return (
            <div key={index} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 lg:grid-cols-[1fr_220px]">
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                  <input
                    value={item.label}
                    onChange={(event) => updateItem(index, { label: event.target.value })}
                    placeholder="Video label"
                    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-4 ${focusClass}`}
                  />
                  <input
                    value={item.file ? "" : item.url}
                    onChange={(event) => updateItem(index, { url: event.target.value, preview: event.target.value, file: null, public_id: "" })}
                    placeholder="Paste YouTube link or direct video URL"
                    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-4 ${focusClass}`}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-slate-400">
                    <MdCloudUpload size={16} />
                    {item.file ? item.file.name : "Upload file"}
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        if (item.preview?.startsWith("blob:")) URL.revokeObjectURL(item.preview);
                        updateItem(index, { file, url: "", preview: URL.createObjectURL(file), public_id: "" });
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100"
                  >
                    <MdDelete size={15} />
                    Remove
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-black">
                <VideoPreview src={previewSrc} title={`Video ${index + 1} preview`} />
              </div>
            </div>
          );
        })}
        {!items.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No videos added yet.
          </div>
        )}
      </div>
    </div>
  );
}
