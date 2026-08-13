import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useIndustrialCityStore } from "../../../store/industrialCity/industrialCityStore";
import { MdArrowBack, MdCloudUpload, MdDelete, MdSyncAlt } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay } from "../projects/projectFormUi";
import { industrialCityIconRegistry } from "../../bannerprojects/projectShowcaseData";
import { appendOptimizedFile, appendOptimizedFiles, uploadSingleAsset } from "../../../utils/cloudinaryUpload";

const inp = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100";
const lbl = "mb-2 block text-sm font-semibold text-slate-700";
const sectionCard = "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 space-y-5";
const sectionHead = "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-700";
const helperText = "mt-1 text-xs leading-5 text-slate-500";
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
const pageSections = [
  "Hero",
  "Project Overview",
  "Location",
  "Features",
  "Available Plots",
  "Goals",
  "Map & Highlights",
  "Booking",
  "Media",
];
const defaultTextFields = {
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
};
const emptyGoals = [
  "To create a planned industrial zone with organized long-term growth potential.",
  "To respond to rising demand for industrial land near Dhaka's expansion belt.",
  "To combine production space with essential worker and support infrastructure.",
  "To strengthen logistics convenience through strategic road connectivity.",
  "To keep industrial development disciplined through RAJUK-guided planning.",
];
const emptyLocationHighlights = [
  { title: "River Shitalakhya Side", detail: "Strategic edge that supports broader regional access", iconKey: "FaWater" },
  { title: "Jolshiri Abason Nearby", detail: "Positioned opposite a known and expanding development belt", iconKey: "FaMapMarkerAlt" },
  { title: "Purbachal Link Road", detail: "Fast and dependable movement toward the city", iconKey: "FaRoad" },
  { title: "Kanchan Bridge Access", detail: "Useful logistics connection for industrial transport routes", iconKey: "FaBusAlt" },
];
const emptyPlotTabs = [
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

const SectionIntro = ({ step, eyebrow, title, note }) => (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <p className={sectionHead}>{step ? `Section ${step} / ${eyebrow}` : eyebrow}</p>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {note && <p className="max-w-xl text-sm leading-6 text-slate-500">{note}</p>}
  </div>
);

const TextField = ({ label, note, ...props }) => (
  <div>
    <label className={lbl}>{label}</label>
    <input {...props} className={inp} />
    {note && <p className={helperText}>{note}</p>}
  </div>
);

const TextAreaField = ({ label, note, rows = 3, ...props }) => (
  <div>
    <label className={lbl}>{label}</label>
    <textarea {...props} rows={rows} className={inp} />
    {note && <p className={helperText}>{note}</p>}
  </div>
);

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

const UpdateIndustrialCity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { industrialCity, loadIndustrialCity, updateIndustrialCity, isLoading } = useIndustrialCityStore();

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [brochureImage, setBrochureImage] = useState(null);
  const [brochurePreview, setBrochurePreview] = useState(null);
  const [brochurePdf, setBrochurePdf] = useState(null);
  const [brochurePdfLabel, setBrochurePdfLabel] = useState("");
  const [bookingPdf, setBookingPdf] = useState(null);
  const [bookingPdfLabel, setBookingPdfLabel] = useState("");
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
    heroEyebrow: "",
    heroTitle: "",
    locationEyebrow: "",
    locationTitle: "",
    featuresEyebrow: "",
    featuresTitle: "",
    plotsEyebrow: "",
    plotsTitle: "",
    plotIntroText: "",
    goalsEyebrow: "",
    goalsTitle: "",
    mapEyebrow: "",
    mapTitle: "",
    bookingEyebrow: "",
    bookingTitle: "",
    bookingSubtitle: "",
    overviewParagraph1: "",
    overviewParagraph2: "",
    specificationsParagraph1: "",
    specificationsParagraph2: "",
    specificationsParagraph3: "",
    locationBenefitsText: "",
    rulesRegulationText: "",
  });
  const [goals, setGoals] = useState(emptyGoals);
  const [locationHighlights, setLocationHighlights] = useState(emptyLocationHighlights);
  const [plotTabs, setPlotTabs] = useState(emptyPlotTabs);

  const safeRevoke = (url) => {
    if (typeof url === "string" && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const revokeUrls = (urls) => {
    urls.forEach((url) => safeRevoke(url));
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

  useEffect(() => {
    if (!industrialCity) {
      loadIndustrialCity();
      return;
    }

    const item = Array.isArray(industrialCity) ? industrialCity.find((s) => s._id === id) : null;
    if (!item) return;

    setForm({
      heroEyebrow: item.heroEyebrow || defaultTextFields.heroEyebrow,
      heroTitle: item.heroTitle || defaultTextFields.heroTitle,
      locationEyebrow: item.locationEyebrow || defaultTextFields.locationEyebrow,
      locationTitle: item.locationTitle || defaultTextFields.locationTitle,
      featuresEyebrow: item.featuresEyebrow || defaultTextFields.featuresEyebrow,
      featuresTitle: item.featuresTitle || defaultTextFields.featuresTitle,
      plotsEyebrow: item.plotsEyebrow || defaultTextFields.plotsEyebrow,
      plotsTitle: item.plotsTitle || defaultTextFields.plotsTitle,
      plotIntroText: item.plotIntroText || defaultTextFields.plotIntroText,
      goalsEyebrow: item.goalsEyebrow || defaultTextFields.goalsEyebrow,
      goalsTitle: item.goalsTitle || defaultTextFields.goalsTitle,
      mapEyebrow: item.mapEyebrow || defaultTextFields.mapEyebrow,
      mapTitle: item.mapTitle || defaultTextFields.mapTitle,
      bookingEyebrow: item.bookingEyebrow || defaultTextFields.bookingEyebrow,
      bookingTitle: item.bookingTitle || defaultTextFields.bookingTitle,
      bookingSubtitle: item.bookingSubtitle || defaultTextFields.bookingSubtitle,
      overviewParagraph1: item.overviewParagraph1 || "",
      overviewParagraph2: item.overviewParagraph2 || "",
      specificationsParagraph1: item.specificationsParagraph1 || "",
      specificationsParagraph2: item.specificationsParagraph2 || "",
      specificationsParagraph3: item.specificationsParagraph3 || "",
      locationBenefitsText: item.locationBenefitsText || "",
      rulesRegulationText: item.rulesRegulationText || "",
    });

    setVideoPreview(item.industrialCityVideo || null);
    setBrochurePreview(item.brochureImage?.url || null);
    setBrochurePdfLabel(item.brochurePdf?.url ? "Current brochure PDF is saved" : "");
    setBookingPdfLabel(item.bookingPdf?.url ? "Current booking PDF is saved" : "");
    setMapPreview(item.mapImage?.url || null);
    setSectionImagePreviews(
      sectionImageFields.reduce((acc, field) => {
        acc[field.key] = item.sectionImages?.[field.key]?.url || "";
        return acc;
      }, {})
    );
    setSectionImageFiles({});
    setGalleryPreviews(item.galleryImages?.length ? item.galleryImages.map((g) => g.url) : []);
    setGoals(item.goals?.length ? [...item.goals, ...emptyGoals].slice(0, 5) : emptyGoals);
    setLocationHighlights(item.locationHighlights?.length ? item.locationHighlights : emptyLocationHighlights);
    setPlotTabs(item.plotTabs?.length ? item.plotTabs : emptyPlotTabs);
  }, [industrialCity, id, loadIndustrialCity]);

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

  const handlePdfChange = (setterFile, setterLabel) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setterFile(file);
    setterLabel(file.name);
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
    try {
      const mediaCount =
        (video ? 1 : 0) +
        (brochureImage ? 1 : 0) +
        (brochurePdf ? 1 : 0) +
        (bookingPdf ? 1 : 0) +
        (mapImage ? 1 : 0) +
        Object.keys(sectionImageFiles).length +
        galleryFiles.length;
      setSubmissionStage(
        "Preparing Industrial City update",
        "We are checking your replacement files and getting the update request ready.",
        0
      );
      setSubmissionStage(
        "Uploading Industrial City changes",
        `${mediaCount || 1} media item${mediaCount === 1 ? "" : "s"} and the content updates are being processed now.`,
        1
      );

      const formData = new FormData();
      if (video) formData.append("industrialCityVideo", video);
      await appendOptimizedFile(formData, "brochureImage", brochureImage);
      if (brochurePdf) {
        setSubmissionStage(
          "Uploading Industrial City brochure",
          "The PDF is going directly to Cloudinary so the server limit is avoided.",
          1
        );
        const brochurePdfAsset = await uploadSingleAsset(brochurePdf, "industrialCity/pdfs");
        formData.append("brochurePdfAsset", JSON.stringify(brochurePdfAsset));
        formData.append("brochurePdfUrl", brochurePdfAsset.url || "");
        formData.append("brochurePdfPublicId", brochurePdfAsset.public_id || "");
        formData.append("bookingPdfAsset", JSON.stringify(brochurePdfAsset));
        formData.append("bookingPdfUrl", brochurePdfAsset.url || "");
        formData.append("bookingPdfPublicId", brochurePdfAsset.public_id || "");
      }
      if (!brochurePdf && bookingPdf) {
        setSubmissionStage(
          "Uploading Industrial City brochure",
          "The PDF is going directly to Cloudinary so the server limit is avoided.",
          1
        );
        const bookingPdfAsset = await uploadSingleAsset(bookingPdf, "industrialCity/pdfs");
        formData.append("brochurePdfAsset", JSON.stringify(bookingPdfAsset));
        formData.append("brochurePdfUrl", bookingPdfAsset.url || "");
        formData.append("brochurePdfPublicId", bookingPdfAsset.public_id || "");
        formData.append("bookingPdfAsset", JSON.stringify(bookingPdfAsset));
        formData.append("bookingPdfUrl", bookingPdfAsset.url || "");
        formData.append("bookingPdfPublicId", bookingPdfAsset.public_id || "");
      }
      await appendOptimizedFile(formData, "mapImage", mapImage);
      for (const [field, file] of Object.entries(sectionImageFiles)) {
        await appendOptimizedFile(formData, field, file);
      }
      await appendOptimizedFiles(formData, "galleryImages", galleryFiles);
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("goals", JSON.stringify(goals.filter(Boolean)));
      formData.append("locationHighlights", JSON.stringify(locationHighlights));
      formData.append("plotTabs", JSON.stringify(plotTabs));

      setSubmissionStage(
        "Saving Industrial City changes",
        "The dashboard is now saving the uploaded PDF and content updates.",
        2
      );
      await updateIndustrialCity(id, formData);
      toast.success("Industrial City updated successfully!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewIndustrialCity");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || err?.message || "Update failed");
    }
  };

  const renderSectionImageUpload = (field) => {
    if (!field) return null;
    const { key, label, note } = field;
    const preview = sectionImagePreviews[key];
    const file = sectionImageFiles[key];
    return (
      <label
        key={key}
        className="flex cursor-pointer items-stretch overflow-hidden rounded-2xl border border-dashed border-cyan-200 bg-white transition-all hover:border-cyan-400"
      >
        {/* Info side */}
        <div className="flex flex-1 flex-col justify-center gap-1 p-4">
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="text-xs leading-5 text-slate-500">{note}</p>
          {file
            ? <p className="mt-1 truncate text-[11px] font-semibold text-slate-400">{file.name}</p>
            : <p className="mt-1 text-xs font-semibold text-cyan-700">Click to upload →</p>
          }
        </div>
        {/* Preview side */}
        <div className="flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden border-l border-dashed border-cyan-200 bg-cyan-50/50">
          {preview
            ? <img src={preview} alt={label} className="h-full w-full object-cover" />
            : <MdCloudUpload className="text-slate-300" size={22} />
          }
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSectionImageChange(key, e)} />
      </label>
    );
  };

  const imgField = (key) => sectionImageFields.find((f) => f.key === key);

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
      />

      <div className="mx-auto max-w-5xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-cyan-200 bg-[linear-gradient(135deg,#0f172a_0%,#155e75_48%,#ecfeff_48.1%,#f8feff_100%)] shadow-[0_30px_120px_-60px_rgba(15,23,42,0.75)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-100">Edit Industrial City</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Update Media And Content</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100/85">
                  Replace video, brochure image, or gallery items while keeping the same content structure and instant preview flow.
                </p>
              </div>
              <div className="rounded-[28px] border border-cyan-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <MdSyncAlt size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Live Replace</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Existing media is visible here, and newly selected files preview instantly before update.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-[28px] border border-cyan-100 bg-cyan-50/80 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-700">Frontend Section Order</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pageSections.map((section, index) => (
              <span
                key={section}
                className="rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {index + 1}. {section}
              </span>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="01"
            eyebrow="Hero"
            title="Top Banner Text And Video"
            note="These fields appear first on the Industrial City public page. The overview paragraphs below also create the short hero summary."
          />
          {renderSectionImageUpload(imgField("heroImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Small Top Line"
              note="Shown above the main page title."
              name="heroEyebrow"
              value={form.heroEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Main Page Title"
              note="The large title at the very top."
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleFormChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <label className="flex min-h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-cyan-300 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.15),transparent_55%),linear-gradient(135deg,#f0fdff_0%,#ecfeff_100%)] p-6 text-center transition-all hover:border-cyan-500 hover:bg-white">
              <MdCloudUpload className="mb-3 text-slate-400" size={30} />
              <span className="text-base font-semibold text-slate-700">{video ? video.name : "Replace hero video"}</span>
              <span className="mt-1 text-xs text-slate-400">MP4, WebM accepted</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            </label>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-sm">
              {videoPreview ? (
                <video src={videoPreview} controls className="h-full min-h-56 w-full object-cover" />
              ) : (
                <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                  <p className="text-sm font-semibold text-white">No video preview</p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">Current or newly selected hero video appears here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="02"
            eyebrow="Project Overview"
            title="Introduction Beside Hero Video"
            note="This copy appears under Project Overview and is reused to make the short summary under the hero title."
          />
          {renderSectionImageUpload(imgField("overviewImage"))}
          <TextAreaField
            label="Overview Paragraph 1"
            note="Use this for company/project introduction."
            name="overviewParagraph1"
            rows={4}
            value={form.overviewParagraph1}
            onChange={handleFormChange}
            placeholder="North South Group is a market leader..."
          />
          <TextAreaField
            label="Overview Paragraph 2"
            note="Use this for project size, location, and purpose."
            name="overviewParagraph2"
            rows={4}
            value={form.overviewParagraph2}
            onChange={handleFormChange}
            placeholder='"North South Industrial City" is a milestone project...'
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <label className="flex min-h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed border-cyan-200 bg-cyan-50/50 text-center transition-all hover:border-cyan-400 hover:bg-cyan-50">
              {brochurePreview ? (
                <img src={brochurePreview} alt="brochure" className="h-full max-h-64 w-full object-contain bg-white p-3" />
              ) : (
                <div className="py-10">
                  <MdCloudUpload className="mx-auto mb-2 text-slate-400" size={30} />
                  <span className="text-sm font-semibold text-slate-600">Replace brochure cover image</span>
                  <span className="mt-1 block text-xs text-slate-400">Shown in plan/download previews</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleBrochureChange} />
            </label>
            <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
              <p className="text-sm font-bold text-slate-800">Brochure Cover Image</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This image is used around the master plan/download area and modal preview. Leave it unchanged if the current image is correct.
              </p>
            </div>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/50 p-5 transition-all hover:border-cyan-400 hover:bg-cyan-50">
            <div>
              <p className="text-sm font-bold text-slate-800">Brochure PDF</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {brochurePdfLabel || "Used by Project Overview Download Brochure."}
              </p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <MdCloudUpload size={22} />
            </div>
            <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfChange(setBrochurePdf, setBrochurePdfLabel)} />
          </label>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="03"
            eyebrow="Location"
            title="Location Section Text"
            note="This section appears after Project Overview and also feeds the map description."
          />
          {renderSectionImageUpload(imgField("locationImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Location Small Top Line"
              name="locationEyebrow"
              value={form.locationEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Location Title"
              name="locationTitle"
              value={form.locationTitle}
              onChange={handleFormChange}
            />
          </div>
          <TextAreaField
            label="Location Description"
            note="Write the full location advantage text here."
            name="locationBenefitsText"
            rows={6}
            value={form.locationBenefitsText}
            onChange={handleFormChange}
            placeholder="Purbachal Industrial City is located on the eastern side of River Shitalakhya..."
          />
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="04"
            eyebrow="Features"
            title="Feature Heading And Bullet Source"
            note="The public page turns these paragraphs, location text, and rules text into short checkmark bullets."
          />
          {renderSectionImageUpload(imgField("featuresImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Features Small Top Line"
              name="featuresEyebrow"
              value={form.featuresEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Features Title"
              name="featuresTitle"
              value={form.featuresTitle}
              onChange={handleFormChange}
            />
          </div>
          <TextAreaField
            label="Feature Paragraph 1"
            name="specificationsParagraph1"
            rows={3}
            value={form.specificationsParagraph1}
            onChange={handleFormChange}
            placeholder="Eco-friendly layout based on RAJUK rules..."
          />
          <TextAreaField
            label="Feature Paragraph 2"
            name="specificationsParagraph2"
            rows={3}
            value={form.specificationsParagraph2}
            onChange={handleFormChange}
            placeholder="Civic infrastructure, parks, playgrounds..."
          />
          <TextAreaField
            label="Feature Paragraph 3"
            name="specificationsParagraph3"
            rows={3}
            value={form.specificationsParagraph3}
            onChange={handleFormChange}
            placeholder="Zones for education, healthcare..."
          />
          <TextAreaField
            label="Rules And Regulation"
            note="Used for compliance notes and also contributes to the feature bullet list."
            name="rulesRegulationText"
            rows={5}
            value={form.rulesRegulationText}
            onChange={handleFormChange}
            placeholder="RAJUK exercises development control..."
          />
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="05"
            eyebrow="Available Plots"
            title="Plot Section Heading, Tabs, And Cards"
            note="Tabs become the buttons on the public page. Each card is shown inside the selected tab."
          />
          {renderSectionImageUpload(imgField("plotsImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Plots Small Top Line"
              name="plotsEyebrow"
              value={form.plotsEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Plots Title"
              name="plotsTitle"
              value={form.plotsTitle}
              onChange={handleFormChange}
            />
          </div>
          <TextAreaField
            label="Plots Intro Text"
            note="Short paragraph under Available Plots title."
            name="plotIntroText"
            rows={3}
            value={form.plotIntroText}
            onChange={handleFormChange}
          />
          <div className="space-y-5">
            {plotTabs.map((tab, tabIndex) => (
              <div key={tabIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-4 text-sm font-bold text-cyan-700">Tab {tabIndex + 1}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Tab Key"
                    note="Keep this short, lowercase, and unique."
                    value={tab.key}
                    onChange={(e) => handlePlotTabChange(tabIndex, "key", e.target.value)}
                  />
                  <TextField
                    label="Tab Button Text"
                    value={tab.label}
                    onChange={(e) => handlePlotTabChange(tabIndex, "label", e.target.value)}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {tab.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Card {cardIndex + 1}</p>
                      <TextField
                        label="Card Title"
                        value={card.title}
                        onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "title", e.target.value)}
                      />
                      <TextAreaField
                        label="Card Description"
                        rows={3}
                        value={card.description}
                        onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "description", e.target.value)}
                      />
                      <IconPicker
                        label="Card Icon"
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
          <SectionIntro
            step="06"
            eyebrow="Goals"
            title="Investment Goals Section"
            note="Each line becomes one checkmark item in the Goals area."
          />
          {renderSectionImageUpload(imgField("goalsImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Goals Small Top Line"
              name="goalsEyebrow"
              value={form.goalsEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Goals Title"
              name="goalsTitle"
              value={form.goalsTitle}
              onChange={handleFormChange}
            />
          </div>
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <TextField
                key={index}
                label={`Goal ${index + 1}`}
                value={goal}
                onChange={(e) => handleGoalChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="07"
            eyebrow="Map & Highlights"
            title="Map Heading, Image, And Location Cards"
            note="This controls the Industrial City Location Map section and the highlight cards beside it."
          />
          {renderSectionImageUpload(imgField("partnersImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Map Small Top Line"
              name="mapEyebrow"
              value={form.mapEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Map Title"
              name="mapTitle"
              value={form.mapTitle}
              onChange={handleFormChange}
            />
          </div>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-cyan-200 rounded-[24px] cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all bg-cyan-50/50 overflow-hidden">
            {mapPreview ? (
              <img src={mapPreview} alt="map" className="w-full max-h-72 object-contain p-3 bg-white" />
            ) : (
              <div className="py-10 flex flex-col items-center">
                <MdCloudUpload className="text-slate-400 mb-2" size={30} />
                <span className="text-sm text-slate-600 font-semibold">Replace map image</span>
                <span className="text-xs text-slate-400 mt-1">Shown in map and booking plan sections</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleMapChange} />
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {locationHighlights.map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Highlight {index + 1}</p>
                <TextField
                  label="Highlight Title"
                  value={item.title}
                  onChange={(e) => handleHighlightChange(index, "title", e.target.value)}
                />
                <TextAreaField
                  label="Highlight Detail"
                  rows={2}
                  value={item.detail}
                  onChange={(e) => handleHighlightChange(index, "detail", e.target.value)}
                />
                <IconPicker
                  label="Highlight Icon"
                  value={item.iconKey}
                  onChange={(iconKey) => handleHighlightChange(index, "iconKey", iconKey)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="08"
            eyebrow="Booking"
            title="Booking Block Text"
            note="This appears beside the booking form near the bottom of the public page."
          />
          {renderSectionImageUpload(imgField("bookingImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Booking Small Top Line"
              name="bookingEyebrow"
              value={form.bookingEyebrow}
              onChange={handleFormChange}
            />
            <TextField
              label="Booking Title"
              name="bookingTitle"
              value={form.bookingTitle}
              onChange={handleFormChange}
            />
          </div>
          <TextAreaField
            label="Booking Subtitle"
            name="bookingSubtitle"
            rows={3}
            value={form.bookingSubtitle}
            onChange={handleFormChange}
          />
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-5">
            <div>
              <p className="text-sm font-bold text-slate-800">Booking Download PDF</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                This section uses the same Brochure PDF uploaded in Project Overview.
              </p>
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro
            step="09"
            eyebrow="Media"
            title="Slider And Gallery Images"
            note="Upload multiple gallery images. These images power the Best Option slider, Destination slider, and Project Gallery on the frontend."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {galleryPreviews.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={src} alt="" className="w-full h-full object-cover" />
                {galleryFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-rose-500"
                  >
                    <MdDelete size={16} />
                  </button>
                )}
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

        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Ready To Save</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Existing media remains visible, and any new upload is previewed above before updating the Industrial City entry.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitState.active || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/30 transition hover:from-cyan-600 hover:to-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
            {submitState.active || isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateIndustrialCity;
