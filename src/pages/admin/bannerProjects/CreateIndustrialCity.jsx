import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIndustrialCityStore } from "../../../store/industrialCity/industrialCityStore";
import { MdArrowBack, MdCloudUpload, MdDelete, MdOutlinePermMedia } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay } from "../projects/projectFormUi";
import { industrialCityIconRegistry } from "../../bannerprojects/projectShowcaseData";
import { appendOptimizedFile, appendOptimizedFiles } from "../../../utils/cloudinaryUpload";

const inp = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100";
const lbl = "mb-2 block text-sm font-semibold text-slate-700";
const sectionCard = "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 space-y-5";
const sectionHead = "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-700";
const maxGalleryImages = 20;
const iconOptions = ["FaIndustry", "FaWarehouse", "FaRoad", "FaPlug", "FaStore", "FaBuilding", "FaSchool", "FaHospitalAlt", "FaWater", "FaMapMarkerAlt", "FaBusAlt"];
const iconLabels = {
  FaIndustry: "Industry",
  FaWarehouse: "Warehouse",
  FaRoad: "Road",
  FaPlug: "Utility",
  FaStore: "Store",
  FaBuilding: "Building",
  FaSchool: "School",
  FaHospitalAlt: "Hospital",
  FaWater: "Water",
  FaMapMarkerAlt: "Location",
  FaBusAlt: "Transport",
};
const sectionImageFields = [
  { key: "heroImage", label: "Hero Background", note: "Top section background image." },
  { key: "overviewImage", label: "Overview Media", note: "Project Overview visual beside the text." },
  { key: "locationImage", label: "Location Visual", note: "Location section background and preview image." },
  { key: "featuresImage", label: "Features Visual", note: "Features section image." },
  { key: "plotsImage", label: "Plots Visual", note: "Available Plots background and round preview image." },
  { key: "goalsImage", label: "Goals Visual", note: "Goals section image." },
  { key: "partnersImage", label: "Partners Background", note: "Our Concern/partners section background." },
  { key: "bookingImage", label: "Booking Background", note: "Bottom booking section background." },
];

const IconPicker = ({ label, value, onChange }) => (
  <div>
    <label className={lbl}>{label}</label>
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {iconOptions.map((iconKey) => {
        const Icon = industrialCityIconRegistry[iconKey];
        const selected = value === iconKey;

        return (
          <button
            key={iconKey}
            type="button"
            onClick={() => onChange(iconKey)}
            className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center text-xs font-semibold transition ${
              selected
                ? "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-cyan-50/60"
            }`}
            title={iconLabels[iconKey]}
          >
            {Icon && <Icon className="text-2xl" />}
            <span>{iconLabels[iconKey]}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const defaultGoals = [
  "To create a planned industrial zone with organized long-term growth potential.",
  "To respond to rising demand for industrial land near Dhaka's expansion belt.",
  "To combine production space with essential worker and support infrastructure.",
  "To strengthen logistics convenience through strategic road connectivity.",
  "To keep industrial development disciplined through RAJUK-guided planning.",
];

const defaultLocationHighlights = [
  { title: "River Shitalakhya Side", detail: "Strategic edge that supports broader regional access", iconKey: "FaWater" },
  { title: "Jolshiri Abason Nearby", detail: "Positioned opposite a known and expanding development belt", iconKey: "FaMapMarkerAlt" },
  { title: "Purbachal Link Road", detail: "Fast and dependable movement toward the city", iconKey: "FaRoad" },
  { title: "Kanchan Bridge Access", detail: "Useful logistics connection for industrial transport routes", iconKey: "FaBusAlt" },
];

const defaultPlotTabs = [
  {
    key: "industrial",
    label: "Industrial Plots",
    cards: [
      { title: "Factory Plots", description: "Production-ready parcels prepared for future manufacturing and processing facilities.", iconKey: "FaIndustry" },
      { title: "Warehouse Zone", description: "Large-format spaces suited for storage, inventory flow, and distribution planning.", iconKey: "FaWarehouse" },
      { title: "Logistics Yard", description: "Transport-friendly plots created for truck movement and industrial support operations.", iconKey: "FaRoad" },
      { title: "Utility Support Block", description: "Ideal for service facilities that keep industrial activity running smoothly every day.", iconKey: "FaPlug" },
    ],
  },
  {
    key: "commercial",
    label: "Commercial Support",
    cards: [
      { title: "Showroom & Trade Hub", description: "A visible commercial layer for industrial sales, display, and client meetings.", iconKey: "FaStore" },
      { title: "Business Center", description: "Office-focused blocks for administration, finance, and support teams.", iconKey: "FaBuilding" },
      { title: "Training Institute", description: "Dedicated spaces for technical training, workforce development, and learning support.", iconKey: "FaSchool" },
      { title: "Healthcare & Services", description: "Service-oriented plots for clinics and facilities that support daily industrial activity.", iconKey: "FaHospitalAlt" },
    ],
  },
];

const CreateIndustrialCity = () => {
  const navigate = useNavigate();
  const { addIndustrialCity, loadIndustrialCity, isLoading } = useIndustrialCityStore();

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [brochureImage, setBrochureImage] = useState(null);
  const [brochurePreview, setBrochurePreview] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [mapPreview, setMapPreview] = useState(null);
  const [sectionImageFiles, setSectionImageFiles] = useState({});
  const [sectionImagePreviews, setSectionImagePreviews] = useState({});
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const galleryRef = useRef(null);
  const previewRefs = useRef({ video: null, brochure: null, map: null, gallery: [], sectionImages: {} });
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  const [form, setForm] = useState({
    heroEyebrow: "BUILT FOR INDUSTRIAL PROGRESS",
    heroTitle: "North South Industrial City Project",
    locationEyebrow: "LOCATION OF NORTH SOUTH INDUSTRIAL CITY",
    locationTitle: "Prepared for logistics, production, and strong future connectivity",
    featuresEyebrow: "FUTURE READY INDUSTRIAL HUB",
    featuresTitle: "Features of North South Industrial City",
    plotsEyebrow: "CHOOSE PROPERTY BASED ON YOUR NEED",
    plotsTitle: "Available Plots",
    plotIntroText: "The master plan keeps residential, commercial, and support zones in balance so the project can grow in a more organized way.",
    goalsEyebrow: "A DESTINATION WORTH INVESTING IN",
    goalsTitle: "Goals of North South Industrial City",
    mapEyebrow: "EXPLORE THE FUTURE",
    mapTitle: "Industrial City Location Map",
    bookingEyebrow: "MASTER PLAN & BROCHURE",
    bookingTitle: "Review industrial blocks and request your preferred allocation",
    bookingSubtitle: "Download the project brochure for complete details.",
    overviewParagraph1: "",
    overviewParagraph2: "",
    specificationsParagraph1: "",
    specificationsParagraph2: "",
    specificationsParagraph3: "",
    locationBenefitsText: "",
    rulesRegulationText: "",
  });
  const [goals, setGoals] = useState(defaultGoals);
  const [locationHighlights, setLocationHighlights] = useState(defaultLocationHighlights);
  const [plotTabs, setPlotTabs] = useState(defaultPlotTabs);

  const handleFormChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleGoalChange = (index, value) =>
    setGoals((items) => items.map((item, i) => (i === index ? value : item)));
  const handleHighlightChange = (index, key, value) =>
    setLocationHighlights((items) =>
      items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  const handlePlotCardChange = (tabIndex, cardIndex, key, value) =>
    setPlotTabs((tabs) =>
      tabs.map((tab, i) =>
        i === tabIndex
          ? {
              ...tab,
              cards: tab.cards.map((card, c) =>
                c === cardIndex ? { ...card, [key]: value } : card
              ),
            }
          : tab
      )
    );
  const handlePlotTabChange = (tabIndex, key, value) =>
    setPlotTabs((tabs) =>
      tabs.map((tab, i) => (i === tabIndex ? { ...tab, [key]: value } : tab))
    );

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
      map: mapPreview,
      gallery: galleryPreviews,
      sectionImages: sectionImagePreviews,
    };
  }, [videoPreview, brochurePreview, mapPreview, galleryPreviews, sectionImagePreviews]);

  useEffect(
    () => () => {
      revokeUrls([
        previewRefs.current.video,
        previewRefs.current.brochure,
        previewRefs.current.map,
      ]);
      revokeUrls(previewRefs.current.gallery);
      revokeUrls(Object.values(previewRefs.current.sectionImages || {}));
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

  const handleMapChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    safeRevoke(mapPreview);
    setMapImage(file);
    setMapPreview(URL.createObjectURL(file));
  };

  const handleSectionImageChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    safeRevoke(sectionImagePreviews[field]);
    setSectionImageFiles((current) => ({ ...current, [field]: file }));
    setSectionImagePreviews((current) => ({
      ...current,
      [field]: URL.createObjectURL(file),
    }));
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
    if (video) formData.append("industrialCityVideo", video);
    await appendOptimizedFile(formData, "brochureImage", brochureImage);
    await appendOptimizedFile(formData, "mapImage", mapImage);
    for (const [field, file] of Object.entries(sectionImageFiles)) {
      await appendOptimizedFile(formData, field, file);
    }
    await appendOptimizedFiles(formData, "galleryImages", galleryFiles);
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    formData.append("goals", JSON.stringify(goals.filter(Boolean)));
    formData.append("locationHighlights", JSON.stringify(locationHighlights));
    formData.append("plotTabs", JSON.stringify(plotTabs));

    try {
      const mediaCount =
        (video ? 1 : 0) +
        (brochureImage ? 1 : 0) +
        (mapImage ? 1 : 0) +
        Object.keys(sectionImageFiles).length +
        galleryFiles.length;
      setSubmissionStage(
        "Preparing Industrial City upload",
        "We are checking the content and getting the upload request ready.",
        0
      );
      setSubmissionStage(
        "Uploading Industrial City media",
        `${mediaCount || 1} media item${mediaCount === 1 ? "" : "s"} and the content fields are being processed now.`,
        1
      );
      await addIndustrialCity(formData);
      setSubmissionStage(
        "Saving Industrial City entry",
        "The media upload is complete. The dashboard is now finishing the save.",
        2
      );
      toast.success("Industrial City created successfully!");
      await loadIndustrialCity();
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewIndustrialCity");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    }
  };

  const renderSectionImageUpload = ({ key, label, note }) => {
    const preview = sectionImagePreviews[key];
    const file = sectionImageFiles[key];

    return (
      <label
        key={key}
        className="group flex min-h-52 cursor-pointer flex-col overflow-hidden rounded-[24px] border-2 border-dashed border-cyan-200 bg-cyan-50/50 transition-all hover:border-cyan-400 hover:bg-cyan-50"
      >
        <div className="flex flex-1 items-center justify-center bg-white">
          {preview ? (
            <img src={preview} alt={label} className="h-44 w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center px-4 py-8 text-center">
              <MdCloudUpload className="mb-2 text-slate-400" size={28} />
              <span className="text-sm font-semibold text-slate-600">Upload image</span>
            </div>
          )}
        </div>
        <div className="border-t border-cyan-100 bg-white/85 p-4">
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{file?.name || note}</p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSectionImageChange(key, e)} />
      </label>
    );
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
        <div className="overflow-hidden rounded-[32px] border border-cyan-200 bg-[linear-gradient(135deg,#082f49_0%,#155e75_48%,#ecfeff_48.1%,#f8feff_100%)] shadow-[0_30px_120px_-60px_rgba(8,47,73,0.7)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-100">Banner Project</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Create Industrial City</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-50/85">
                  Keep the same content flow and get instant previews for hero video, gallery images, and brochure cover before save.
                </p>
              </div>
              <div className="rounded-[28px] border border-cyan-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <MdOutlinePermMedia size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Live Preview</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Selected media now appears inside the form immediately, same like the Green City and Square City flow.
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
              Upload the main Industrial City hero video and preview it here before creating the entry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <label className="flex min-h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-cyan-300 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.15),transparent_55%),linear-gradient(135deg,#f0fdff_0%,#ecfeff_100%)] p-6 text-center transition-all hover:border-cyan-500 hover:bg-white">
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
                    Pick a video from the left side and review it instantly before saving the Industrial City page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <div>
            <p className={sectionHead}>Page Sequence</p>
            <h2 className="text-2xl font-bold text-slate-900">Section Headings</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["heroEyebrow", "Hero Eyebrow"],
              ["heroTitle", "Hero Title"],
              ["locationEyebrow", "Location Eyebrow"],
              ["locationTitle", "Location Title"],
              ["featuresEyebrow", "Features Eyebrow"],
              ["featuresTitle", "Features Title"],
              ["plotsEyebrow", "Plots Eyebrow"],
              ["plotsTitle", "Plots Title"],
              ["goalsEyebrow", "Goals Eyebrow"],
              ["goalsTitle", "Goals Title"],
              ["mapEyebrow", "Map Eyebrow"],
              ["mapTitle", "Map Title"],
              ["bookingEyebrow", "Booking Eyebrow"],
              ["bookingTitle", "Booking Title"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className={lbl}>{label}</label>
                <input name={name} value={form[name]} onChange={handleFormChange} className={inp} />
              </div>
            ))}
          </div>
          <div>
            <label className={lbl}>Available Plots Intro</label>
            <textarea name="plotIntroText" rows={3} value={form.plotIntroText} onChange={handleFormChange} className={inp} />
          </div>
          <div>
            <label className={lbl}>Booking Subtitle</label>
            <textarea name="bookingSubtitle" rows={3} value={form.bookingSubtitle} onChange={handleFormChange} className={inp} />
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Section Images</p>
              <h2 className="text-2xl font-bold text-slate-900">Dynamic Frontend Images</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Upload section-wise images so the Industrial City details page does not depend on fallback gallery images.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sectionImageFields.map(renderSectionImageUpload)}
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
            <textarea name="overviewParagraph2" rows={4} value={form.overviewParagraph2} onChange={handleFormChange} className={inp} placeholder='"North South Industrial City" is a milestone project...' />
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
            <textarea name="specificationsParagraph1" rows={3} value={form.specificationsParagraph1} onChange={handleFormChange} className={inp} placeholder="Eco-friendly layout based on RAJUK rules..." />
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
            <textarea name="locationBenefitsText" rows={7} value={form.locationBenefitsText} onChange={handleFormChange} className={inp} placeholder="Purbachal Industrial City is located on the eastern side of River Shitalakhya..." />
          </div>

          <div className={sectionCard}>
            <p className={sectionHead}>Rules &amp; Regulation</p>
            <h2 className="text-2xl font-bold text-slate-900">Compliance Notes</h2>
            <textarea name="rulesRegulationText" rows={7} value={form.rulesRegulationText} onChange={handleFormChange} className={inp} placeholder="RAJUK exercises development control..." />
          </div>
        </div>

        <div className={sectionCard}>
          <div>
            <p className={sectionHead}>Investment Goals</p>
            <h2 className="text-2xl font-bold text-slate-900">Goals List</h2>
          </div>
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div key={index}>
                <label className={lbl}>Goal {index + 1}</label>
                <input value={goal} onChange={(e) => handleGoalChange(index, e.target.value)} className={inp} />
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <div>
            <p className={sectionHead}>Location Map Cards</p>
            <h2 className="text-2xl font-bold text-slate-900">Highlight Cards</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {locationHighlights.map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className={lbl}>Title</label>
                <input value={item.title} onChange={(e) => handleHighlightChange(index, "title", e.target.value)} className={inp} />
                <label className={`${lbl} mt-3`}>Detail</label>
                <textarea rows={2} value={item.detail} onChange={(e) => handleHighlightChange(index, "detail", e.target.value)} className={inp} />
                <IconPicker
                  label="Icon"
                  value={item.iconKey}
                  onChange={(iconKey) => handleHighlightChange(index, "iconKey", iconKey)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <div>
            <p className={sectionHead}>Available Plot Cards</p>
            <h2 className="text-2xl font-bold text-slate-900">Plot Tabs And Cards</h2>
          </div>
          <div className="space-y-5">
            {plotTabs.map((tab, tabIndex) => (
              <div key={tabIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={lbl}>Tab Key</label>
                    <input value={tab.key} onChange={(e) => handlePlotTabChange(tabIndex, "key", e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Tab Label</label>
                    <input value={tab.label} onChange={(e) => handlePlotTabChange(tabIndex, "label", e.target.value)} className={inp} />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {tab.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                      <label className={lbl}>Card Title</label>
                      <input value={card.title} onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "title", e.target.value)} className={inp} />
                      <label className={`${lbl} mt-3`}>Description</label>
                      <textarea rows={3} value={card.description} onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "description", e.target.value)} className={inp} />
                      <IconPicker
                        label="Icon"
                        value={card.iconKey}
                        onChange={(iconKey) => handlePlotCardChange(tabIndex, cardIndex, "iconKey", iconKey)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              <label className="aspect-square rounded-2xl border-2 border-dashed border-cyan-200 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all bg-cyan-50/60">
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
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-cyan-200 rounded-[24px] cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all bg-cyan-50/50 overflow-hidden">
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

        <div className={sectionCard}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionHead}>Location Map Image</p>
              <h2 className="text-2xl font-bold text-slate-900">Master Plan / Map Visual</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Upload the map image shown in the location map and master plan sections.
            </p>
          </div>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-cyan-200 rounded-[24px] cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all bg-cyan-50/50 overflow-hidden">
            {mapPreview ? (
              <img src={mapPreview} alt="map" className="w-full max-h-72 object-contain p-3 bg-white" />
            ) : (
              <div className="py-10 flex flex-col items-center">
                <MdCloudUpload className="text-slate-400 mb-2" size={30} />
                <span className="text-sm text-slate-600 font-semibold">Click to upload map image</span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG accepted</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleMapChange} />
          </label>
        </div>

        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Ready To Create</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              All selected media stays in the form and shows its preview until you create the Industrial City record.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitState.active || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/30 transition hover:from-cyan-600 hover:to-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
            {submitState.active || isLoading ? "Creating..." : "Create Industrial City"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateIndustrialCity;
