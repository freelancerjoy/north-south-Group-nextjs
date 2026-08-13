import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSquareCityStore } from "../../../store/squareCity/squareCityStore";
import { MdArrowBack, MdCloudUpload, MdDelete, MdOutlinePermMedia } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay } from "../projects/projectFormUi";
import { appendOptimizedFile, appendOptimizedFiles } from "../../../utils/cloudinaryUpload";

const inp = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100";
const lbl = "mb-2 block text-sm font-semibold text-slate-700";
const sectionCard = "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 space-y-5";
const sectionHead = "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-amber-700";
const maxGalleryImages = 20;

const CreateSquareCity = () => {
  const navigate = useNavigate();
  const { addSquareCity, loadSquareCity, isLoading } = useSquareCityStore();

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [brochureImage, setBrochureImage] = useState(null);
  const [brochurePreview, setBrochurePreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const galleryRef = useRef(null);
  const previewRefs = useRef({ video: null, brochure: null, gallery: [] });
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  const [form, setForm] = useState({
    overviewParagraph1: "",
    overviewParagraph2: "",
    specificationsParagraph1: "",
    specificationsParagraph2: "",
    specificationsParagraph3: "",
    locationBenefitsText: "",
    rulesRegulationText: "",
  });

  const handleFormChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const safeRevoke = (url) => {
    if (typeof url === "string" && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const revokeUrls = (urls) => {
    urls.filter(Boolean).forEach((url) => safeRevoke(url));
  };

  useEffect(() => {
    previewRefs.current = {
      video: videoPreview,
      brochure: brochurePreview,
      gallery: galleryPreviews,
    };
  }, [videoPreview, brochurePreview, galleryPreviews]);

  useEffect(
    () => () => {
      revokeUrls([
        previewRefs.current.video,
        previewRefs.current.brochure,
      ]);
      revokeUrls(previewRefs.current.gallery);
    },
    []
  );

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    safeRevoke(videoPreview);
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    safeRevoke(brochurePreview);
    setBrochureImage(file);
    setBrochurePreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...galleryFiles, ...files].slice(0, maxGalleryImages);
    revokeUrls(galleryPreviews);
    setGalleryFiles(combined);
    setGalleryPreviews(combined.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removeGalleryImage = (idx) => {
    safeRevoke(galleryPreviews[idx]);
    const updated = galleryFiles.filter((_, i) => i !== idx);
    setGalleryFiles(updated);
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const setSubmissionStage = (title, detail, step) => {
    setSubmitState({ active: true, title, detail, step });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (video) formData.append("squareCityVideo", video);
    await appendOptimizedFile(formData, "brochureImage", brochureImage);
    await appendOptimizedFiles(formData, "galleryImages", galleryFiles);
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    try {
      const mediaCount = (video ? 1 : 0) + (brochureImage ? 1 : 0) + galleryFiles.length;
      setSubmissionStage(
        "Preparing Square City upload",
        "We are checking the content and getting the upload request ready.",
        0
      );
      setSubmissionStage(
        "Uploading Square City media",
        `${mediaCount || 1} media item${mediaCount === 1 ? "" : "s"} and the content fields are being processed now.`,
        1
      );
      await addSquareCity(formData);
      setSubmissionStage(
        "Saving Square City entry",
        "The media upload is complete. The dashboard is now finishing the save.",
        2
      );
      toast.success("Square City created successfully!");
      await loadSquareCity();
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewSquareCity");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    }
  };

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="create"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
      />

      <div className="mx-auto max-w-5xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-amber-200 bg-[linear-gradient(135deg,#3a2200_0%,#8a5a00_48%,#fff7ed_48.1%,#fffbeb_100%)] shadow-[0_30px_120px_-60px_rgba(120,53,15,0.7)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100">Banner Project</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Create Square City</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-amber-50/85">
                  Keep the same content flow and get instant previews for video, gallery images, and brochure cover before save.
                </p>
              </div>
              <div className="rounded-[28px] border border-amber-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <MdOutlinePermMedia size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Live Preview</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Selected media now appears inside the form immediately, same like the Green City flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`${sectionCard} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Hero Media</p>
              <h2 className="text-2xl font-bold text-slate-900">Video Upload</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Upload the main Square City hero video and preview it here before creating the entry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <label className="flex min-h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-amber-300 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.15),transparent_55%),linear-gradient(135deg,#fffaf0_0%,#fff1dd_100%)] p-6 text-center transition-all hover:border-amber-500 hover:bg-white">
              <MdCloudUpload className="mb-3 text-slate-400" size={30} />
              <span className="text-base font-semibold text-slate-700">{video ? video.name : "Click to upload hero video"}</span>
              <span className="mt-1 text-xs text-slate-400">MP4, WebM accepted</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            </label>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-sm">
              {videoPreview ? (
                <video src={videoPreview} controls className="h-full min-h-56 w-full object-cover" />
              ) : (
                <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                  <p className="text-sm font-semibold text-white">Video preview will appear here</p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Pick a video from the left side and review it instantly before saving the Square City page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Overview Copy</p>
              <h2 className="text-2xl font-bold text-slate-900">Project Introduction</h2>
            </div>
          </div>
          <div>
            <label className={lbl}>Paragraph 1</label>
            <textarea name="overviewParagraph1" rows={4} value={form.overviewParagraph1} onChange={handleFormChange} className={inp} placeholder="North South Group is a market leader..." />
          </div>
          <div>
            <label className={lbl}>Paragraph 2</label>
            <textarea name="overviewParagraph2" rows={4} value={form.overviewParagraph2} onChange={handleFormChange} className={inp} placeholder='"North South Square City" is a milestone project...' />
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Specifications</p>
              <h2 className="text-2xl font-bold text-slate-900">Key Selling Points</h2>
            </div>
          </div>
          <div>
            <label className={lbl}>Paragraph 1</label>
            <textarea name="specificationsParagraph1" rows={3} value={form.specificationsParagraph1} onChange={handleFormChange} className={inp} placeholder="Eco-friendly layout with RAJUK compliance..." />
          </div>
          <div>
            <label className={lbl}>Paragraph 2</label>
            <textarea name="specificationsParagraph2" rows={3} value={form.specificationsParagraph2} onChange={handleFormChange} className={inp} placeholder="Civic infrastructure, parks, playgrounds..." />
          </div>
          <div>
            <label className={lbl}>Paragraph 3</label>
            <textarea name="specificationsParagraph3" rows={3} value={form.specificationsParagraph3} onChange={handleFormChange} className={inp} placeholder="Zones for education, healthcare..." />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div className={sectionCard}>
            <p className={sectionHead}>Location Benefits</p>
            <h2 className="text-2xl font-bold text-slate-900">Location Advantages</h2>
            <textarea name="locationBenefitsText" rows={7} value={form.locationBenefitsText} onChange={handleFormChange} className={inp} placeholder="Purbachal Square City is easily accessible..." />
          </div>

          <div className={sectionCard}>
            <p className={sectionHead}>Rules &amp; Regulation</p>
            <h2 className="text-2xl font-bold text-slate-900">Compliance Notes</h2>
            <textarea name="rulesRegulationText" rows={7} value={form.rulesRegulationText} onChange={handleFormChange} className={inp} placeholder="RAJUK exercises development control..." />
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Gallery Images</p>
              <h2 className="text-2xl font-bold text-slate-900">Upload Gallery</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Upload multiple images. These images will be used for Best Option slider, Destination slider, and Project Gallery on the frontend.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {galleryPreviews.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-rose-500"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
            {galleryFiles.length < maxGalleryImages && (
              <label className="aspect-square rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all bg-amber-50/60">
                <MdCloudUpload className="text-slate-400" size={24} />
                <span className="text-xs text-slate-500 mt-2 font-medium">Add Image</span>
                <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
              </label>
            )}
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Brochure Image</p>
              <h2 className="text-2xl font-bold text-slate-900">Featured Cover Visual</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Upload the brochure cover image and review it directly inside the form.
            </p>
          </div>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-amber-200 rounded-[24px] cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all bg-amber-50/50 overflow-hidden">
            {brochurePreview ? (
              <img src={brochurePreview} alt="brochure" className="w-full max-h-72 object-contain p-3 bg-white" />
            ) : (
              <div className="py-10 flex flex-col items-center">
                <MdCloudUpload className="text-slate-400 mb-2" size={30} />
                <span className="text-sm text-slate-600 font-semibold">Click to upload brochure image</span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG accepted</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleBrochureChange} />
          </label>
        </div>

        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Ready To Create</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              All selected media stays in the form and shows its preview until you create the Square City record.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitState.active || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:from-amber-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
            {submitState.active || isLoading ? "Creating..." : "Create Square City"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateSquareCity;
