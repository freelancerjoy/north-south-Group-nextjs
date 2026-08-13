import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowBack, MdCloudUpload, MdDelete, MdSyncAlt } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay } from "../projects/projectFormUi";
import { industrialCityIconRegistry } from "../../bannerprojects/projectShowcaseData";
import { appendOptimizedFile, appendOptimizedFiles, uploadSingleAsset } from "../../../utils/cloudinaryUpload";

const colorMap = {
  emerald: {
    focus: "focus:border-emerald-400 focus:ring-emerald-100",
    sectionHead: "text-emerald-700",
    heroBg: "bg-[linear-gradient(135deg,#06291f_0%,#0f5132_48%,#ecfdf3_48.1%,#f8fffb_100%)]",
    border: "border-emerald-200",
    paleBorder: "border-emerald-200",
    paleBg: "bg-emerald-50/50",
    hoverBorder: "hover:border-emerald-400",
    hoverBg: "hover:bg-emerald-50",
    selected: "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100",
    button: "from-emerald-500 to-green-700 hover:from-emerald-600 hover:to-green-800",
    readyText: "text-emerald-300",
    cardIconBg: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    focus: "focus:border-amber-400 focus:ring-amber-100",
    sectionHead: "text-amber-700",
    heroBg: "bg-[linear-gradient(135deg,#1f2937_0%,#4b5563_48%,#fff7ed_48.1%,#fffbeb_100%)]",
    border: "border-amber-200",
    paleBorder: "border-amber-200",
    paleBg: "bg-amber-50/50",
    hoverBorder: "hover:border-amber-400",
    hoverBg: "hover:bg-amber-50",
    selected: "border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-100",
    button: "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    readyText: "text-amber-300",
    cardIconBg: "bg-amber-100 text-amber-700",
  },
};

const iconOptions = [
  "FaHome",
  "FaCity",
  "FaLeaf",
  "FaIndustry",
  "FaWarehouse",
  "FaRoad",
  "FaPlug",
  "FaStore",
  "FaBuilding",
  "FaSchool",
  "FaUniversity",
  "FaHospitalAlt",
  "FaWater",
  "FaMapMarkerAlt",
  "FaBusAlt",
];

const iconLabels = {
  FaHome: "Home",
  FaCity: "City",
  FaLeaf: "Leaf",
  FaIndustry: "Industry",
  FaWarehouse: "Warehouse",
  FaRoad: "Road",
  FaPlug: "Utility",
  FaStore: "Store",
  FaBuilding: "Building",
  FaSchool: "School",
  FaUniversity: "University",
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

const textKeys = [
  "heroEyebrow",
  "heroTitle",
  "locationEyebrow",
  "locationTitle",
  "featuresEyebrow",
  "featuresTitle",
  "plotsEyebrow",
  "plotsTitle",
  "plotIntroText",
  "goalsEyebrow",
  "goalsTitle",
  "mapEyebrow",
  "mapTitle",
  "bookingEyebrow",
  "bookingTitle",
  "bookingSubtitle",
];

const buildInitialForm = (config) => ({
  heroEyebrow: config.heroEyebrow || "",
  heroTitle: config.heroTitle || "",
  locationEyebrow: config.locationEyebrow || "",
  locationTitle: config.locationTitle || "",
  featuresEyebrow: config.featuresEyebrow || "",
  featuresTitle: config.featuresTitle || "",
  plotsEyebrow: config.plotsEyebrow || "",
  plotsTitle: config.plotsTitle || "",
  plotIntroText: "The master plan keeps residential, commercial, and support zones in balance so the project can grow in a more organized way.",
  goalsEyebrow: config.goalsEyebrow || "",
  goalsTitle: config.goalsTitle || "",
  mapEyebrow: config.mapEyebrow || "",
  mapTitle: config.mapTitle || "",
  bookingEyebrow: config.bookingEyebrow || "",
  bookingTitle: config.bookingTitle || "",
  bookingSubtitle: config.bookingSubtitle || "",
  overviewParagraph1: "",
  overviewParagraph2: "",
  specificationsParagraph1: "",
  specificationsParagraph2: "",
  specificationsParagraph3: "",
  locationBenefitsText: "",
  rulesRegulationText: "",
});

const maxGalleryImages = 20;

const pdfFolderByVideoField = {
  greenCityVideo: "greenCity/pdfs",
  squareCityVideo: "squareCity/pdfs",
  industrialCityVideo: "industrialCity/pdfs",
};

const ProjectCityUpdateForm = ({
  projectName,
  videoField,
  listPath,
  collection,
  loadCollection,
  updateItem,
  isLoading,
  theme = "emerald",
  config,
  defaultGoals,
  defaultLocationHighlights,
  defaultPlotTabs,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const colors = colorMap[theme];

  const inp = `w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${colors.focus}`;
  const lbl = "mb-2 block text-sm font-semibold text-slate-700";
  const sectionCard = "rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 space-y-5";
  const sectionHead = `mb-3 text-xs font-bold uppercase tracking-[0.28em] ${colors.sectionHead}`;

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
  const [submitState, setSubmitState] = useState({ active: false, title: "", detail: "", step: 0 });
  const [form, setForm] = useState(buildInitialForm(config));
  const [goals, setGoals] = useState(defaultGoals);
  const [locationHighlights, setLocationHighlights] = useState(defaultLocationHighlights);
  const [plotTabs, setPlotTabs] = useState(defaultPlotTabs);

  const safeRevoke = (url) => {
    if (typeof url === "string" && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };
  const revokeUrls = (urls) => urls.filter(Boolean).forEach((url) => safeRevoke(url));

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
      revokeUrls([previewRefs.current.video, previewRefs.current.brochure, previewRefs.current.map]);
      revokeUrls(previewRefs.current.gallery);
      revokeUrls(Object.values(previewRefs.current.sectionImages || {}));
    },
    []
  );

  useEffect(() => {
    if (!collection) {
      loadCollection();
      return;
    }

    const item = Array.isArray(collection) ? collection.find((entry) => entry._id === id) : null;
    if (!item) return;

    const baseForm = buildInitialForm(config);
    const nextForm = { ...baseForm };
    textKeys.forEach((key) => {
      nextForm[key] = item[key] || baseForm[key];
    });
    nextForm.overviewParagraph1 = item.overviewParagraph1 || "";
    nextForm.overviewParagraph2 = item.overviewParagraph2 || "";
    nextForm.specificationsParagraph1 = item.specificationsParagraph1 || "";
    nextForm.specificationsParagraph2 = item.specificationsParagraph2 || "";
    nextForm.specificationsParagraph3 = item.specificationsParagraph3 || "";
    nextForm.locationBenefitsText = item.locationBenefitsText || "";
    nextForm.rulesRegulationText = item.rulesRegulationText || "";
    setForm(nextForm);

    setVideoPreview(item[videoField] || null);
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
    setGalleryPreviews(item.galleryImages?.length ? item.galleryImages.map((image) => image.url) : []);
    setGoals(item.goals?.length ? [...item.goals, ...defaultGoals].slice(0, 5) : defaultGoals);
    setLocationHighlights(item.locationHighlights?.length ? item.locationHighlights : defaultLocationHighlights);
    setPlotTabs(item.plotTabs?.length ? item.plotTabs : defaultPlotTabs);
  }, [collection, id, loadCollection, config, defaultGoals, defaultLocationHighlights, defaultPlotTabs, videoField]);

  const handleFormChange = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  const handleGoalChange = (index, value) => setGoals((items) => items.map((item, i) => (i === index ? value : item)));
  const handleHighlightChange = (index, key, value) =>
    setLocationHighlights((items) => items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  const handlePlotCardChange = (tabIndex, cardIndex, key, value) =>
    setPlotTabs((tabs) =>
      tabs.map((tab, i) =>
        i === tabIndex
          ? { ...tab, cards: tab.cards.map((card, c) => (c === cardIndex ? { ...card, [key]: value } : card)) }
          : tab
      )
    );
  const handlePlotTabChange = (tabIndex, key, value) =>
    setPlotTabs((tabs) => tabs.map((tab, i) => (i === tabIndex ? { ...tab, [key]: value } : tab)));

  const handleFilePreview = (setterFile, setterPreview, currentPreview) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    safeRevoke(currentPreview);
    setterFile(file);
    setterPreview(URL.createObjectURL(file));
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
    setSectionImagePreviews((current) => ({ ...current, [field]: URL.createObjectURL(file) }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...galleryFiles, ...files].slice(0, maxGalleryImages);
    if (galleryFiles.length + files.length > maxGalleryImages) {
      toast.info(`Maximum ${maxGalleryImages} gallery images can be uploaded at once.`);
    }
    revokeUrls(galleryPreviews);
    setGalleryFiles(combined);
    setGalleryPreviews(combined.map((file) => URL.createObjectURL(file)));
    e.target.value = "";
  };

  const removeGalleryImage = (idx) => {
    safeRevoke(galleryPreviews[idx]);
    setGalleryFiles((files) => files.filter((_, i) => i !== idx));
    setGalleryPreviews((previews) => previews.filter((_, i) => i !== idx));
  };

  const setSubmissionStage = (title, detail, step) => setSubmitState({ active: true, title, detail, step });

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
      setSubmissionStage(`Preparing ${projectName} update`, "We are checking your replacement files and getting the update request ready.", 0);
      setSubmissionStage(`Uploading ${projectName} changes`, `${mediaCount || 1} media item${mediaCount === 1 ? "" : "s"} and the content updates are being processed now.`, 1);

      const formData = new FormData();
      if (video) formData.append(videoField, video);
      await appendOptimizedFile(formData, "brochureImage", brochureImage);
      const pdfFolder = pdfFolderByVideoField[videoField] || "city/pdfs";
      if (brochurePdf) {
        setSubmissionStage(`Uploading ${projectName} brochure`, "The PDF is going directly to Cloudinary so the server limit is avoided.", 1);
        const brochurePdfAsset = await uploadSingleAsset(brochurePdf, pdfFolder);
        formData.append("brochurePdfAsset", JSON.stringify(brochurePdfAsset));
        formData.append("brochurePdfUrl", brochurePdfAsset.url || "");
        formData.append("brochurePdfPublicId", brochurePdfAsset.public_id || "");
        formData.append("bookingPdfAsset", JSON.stringify(brochurePdfAsset));
        formData.append("bookingPdfUrl", brochurePdfAsset.url || "");
        formData.append("bookingPdfPublicId", brochurePdfAsset.public_id || "");
      }
      if (!brochurePdf && bookingPdf) {
        setSubmissionStage(`Uploading ${projectName} brochure`, "The PDF is going directly to Cloudinary so the server limit is avoided.", 1);
        const bookingPdfAsset = await uploadSingleAsset(bookingPdf, pdfFolder);
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
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("goals", JSON.stringify(goals.filter(Boolean)));
      formData.append("locationHighlights", JSON.stringify(locationHighlights));
      formData.append("plotTabs", JSON.stringify(plotTabs));

      setSubmissionStage(`Saving ${projectName} changes`, "The dashboard is now saving the uploaded PDF and content updates.", 2);
      await updateItem(id, formData);
      toast.success(`${projectName} updated successfully!`);
      setSubmitState((current) => ({ ...current, active: false }));
      navigate(listPath);
    } catch (err) {
      setSubmitState((current) => ({ ...current, active: false }));
      toast.error(err?.response?.data?.message || err?.message || "Update failed");
    }
  };

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
      {note && <p className="mt-1 text-xs leading-5 text-slate-500">{note}</p>}
    </div>
  );

  const TextAreaField = ({ label, note, rows = 3, ...props }) => (
    <div>
      <label className={lbl}>{label}</label>
      <textarea {...props} rows={rows} className={inp} />
      {note && <p className="mt-1 text-xs leading-5 text-slate-500">{note}</p>}
    </div>
  );

  const IconPicker = ({ label, value, onChange }) => (
    <div>
      <label className={lbl}>{label}</label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {iconOptions.map((iconKey) => {
          const Icon = industrialCityIconRegistry[iconKey];
          const selected = value === iconKey;
          return (
            <button
              key={iconKey}
              type="button"
              onClick={() => onChange(iconKey)}
              className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center text-xs font-semibold transition ${
                selected ? colors.selected : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
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

  const renderSectionImageUpload = ({ key, label, note }) => {
    const preview = sectionImagePreviews[key];
    const file = sectionImageFiles[key];
    return (
      <label
        key={key}
        className={`flex cursor-pointer items-stretch overflow-hidden rounded-2xl border border-dashed ${colors.paleBorder} bg-white transition-all ${colors.hoverBorder}`}
      >
        {/* Info side */}
        <div className="flex flex-1 flex-col justify-center gap-1 p-4">
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="text-xs leading-5 text-slate-500">{note}</p>
          {file
            ? <p className="mt-1 truncate text-[11px] font-semibold text-slate-400">{file.name}</p>
            : <p className={`mt-1 text-xs font-semibold ${colors.sectionHead}`}>Click to upload →</p>
          }
        </div>
        {/* Preview side */}
        <div className={`flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden border-l border-dashed ${colors.paleBorder} ${colors.paleBg}`}>
          {preview
            ? <img src={preview} alt={label} className="h-full w-full object-cover" />
            : <MdCloudUpload className="text-slate-300" size={22} />
          }
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={(event) => handleSectionImageChange(key, event)} />
      </label>
    );
  };

  const imgField = (key) => sectionImageFields.find((f) => f.key === key);

  return (
    <>
      <ProjectSubmitOverlay active={submitState.active} mode="update" title={submitState.title} detail={submitState.detail} step={submitState.step} />

      <div className="mx-auto max-w-5xl space-y-8 pb-10">
        <div className={`overflow-hidden rounded-[32px] border ${colors.border} ${colors.heroBg} shadow-[0_30px_120px_-60px_rgba(15,23,42,0.75)]`}>
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button onClick={() => navigate(-1)} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20">
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">Edit {projectName}</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Update Media And Content</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100/85">Update the same section-wise content, images, map, cards, and media structure used on the frontend page.</p>
              </div>
              <div className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.cardIconBg}`}><MdSyncAlt size={24} /></div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-[0.25em] ${colors.sectionHead}`}>Live Replace</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Existing media is visible, and new files preview instantly before update.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`rounded-[28px] border ${colors.paleBorder} ${colors.paleBg} p-5 sm:p-6`}>
          <p className={`text-xs font-bold uppercase tracking-[0.28em] ${colors.sectionHead}`}>Frontend Section Order</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {pageSections.map((section, index) => (
              <span key={section} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">{index + 1}. {section}</span>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="01" eyebrow="Hero" title="Top Banner Text And Video" note="These fields appear first on the public page. The overview paragraphs below also create the short hero summary." />
          {renderSectionImageUpload(imgField("heroImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Small Top Line" note="Shown above the main page title." name="heroEyebrow" value={form.heroEyebrow} onChange={handleFormChange} />
            <TextField label="Main Page Title" note="The large title at the very top." name="heroTitle" value={form.heroTitle} onChange={handleFormChange} />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <label className={`flex min-h-56 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed ${colors.paleBorder} ${colors.paleBg} p-6 text-center transition-all ${colors.hoverBorder} ${colors.hoverBg}`}>
              <MdCloudUpload className="mb-3 text-slate-400" size={30} />
              <span className="text-base font-semibold text-slate-700">{video ? video.name : "Replace hero video"}</span>
              <span className="mt-1 text-xs text-slate-400">MP4, WebM accepted</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleFilePreview(setVideo, setVideoPreview, videoPreview)} />
            </label>
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-sm">
              {videoPreview ? <video src={videoPreview} controls className="h-full min-h-56 w-full object-cover" /> : (
                <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                  <p className="text-sm font-semibold text-white">No video preview</p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">Current or newly selected hero video appears here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="02" eyebrow="Project Overview" title="Introduction Beside Hero Video" note="This copy appears under Project Overview and is reused to make the short summary under the hero title." />
          {renderSectionImageUpload(imgField("overviewImage"))}
          <TextAreaField label="Overview Paragraph 1" note="Use this for company/project introduction." name="overviewParagraph1" rows={4} value={form.overviewParagraph1} onChange={handleFormChange} />
          <TextAreaField label="Overview Paragraph 2" note="Use this for project size, location, and purpose." name="overviewParagraph2" rows={4} value={form.overviewParagraph2} onChange={handleFormChange} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <label className={`flex min-h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed ${colors.paleBorder} ${colors.paleBg} text-center transition-all ${colors.hoverBorder} ${colors.hoverBg}`}>
              {brochurePreview ? <img src={brochurePreview} alt="brochure" className="h-full max-h-64 w-full object-contain bg-white p-3" /> : (
                <div className="py-10">
                  <MdCloudUpload className="mx-auto mb-2 text-slate-400" size={30} />
                  <span className="text-sm font-semibold text-slate-600">Replace brochure cover image</span>
                  <span className="mt-1 block text-xs text-slate-400">Shown in plan/download previews</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFilePreview(setBrochureImage, setBrochurePreview, brochurePreview)} />
            </label>
            <div className={`rounded-2xl border ${colors.paleBorder} ${colors.paleBg} p-4`}>
              <p className="text-sm font-bold text-slate-800">Brochure Cover Image</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">This image is used around the master plan/download area and modal preview.</p>
            </div>
          </div>
          <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 border-dashed ${colors.paleBorder} ${colors.paleBg} p-5 transition-all ${colors.hoverBorder} ${colors.hoverBg}`}>
            <div>
              <p className="text-sm font-bold text-slate-800">Brochure PDF</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {brochurePdfLabel || "Used by Project Overview Download Brochure."}
              </p>
            </div>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colors.cardIconBg}`}>
              <MdCloudUpload size={22} />
            </div>
            <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfChange(setBrochurePdf, setBrochurePdfLabel)} />
          </label>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="03" eyebrow="Location" title="Location Section Text" note="This section appears after Project Overview and also feeds the map description." />
          {renderSectionImageUpload(imgField("locationImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Location Small Top Line" name="locationEyebrow" value={form.locationEyebrow} onChange={handleFormChange} />
            <TextField label="Location Title" name="locationTitle" value={form.locationTitle} onChange={handleFormChange} />
          </div>
          <TextAreaField label="Location Description" note="Write the full location advantage text here." name="locationBenefitsText" rows={6} value={form.locationBenefitsText} onChange={handleFormChange} />
        </div>

        <div className={sectionCard}>
          <SectionIntro step="04" eyebrow="Features" title="Feature Heading And Bullet Source" note="The public page turns these paragraphs, location text, and rules text into short checkmark bullets." />
          {renderSectionImageUpload(imgField("featuresImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Features Small Top Line" name="featuresEyebrow" value={form.featuresEyebrow} onChange={handleFormChange} />
            <TextField label="Features Title" name="featuresTitle" value={form.featuresTitle} onChange={handleFormChange} />
          </div>
          <TextAreaField label="Feature Paragraph 1" name="specificationsParagraph1" value={form.specificationsParagraph1} onChange={handleFormChange} />
          <TextAreaField label="Feature Paragraph 2" name="specificationsParagraph2" value={form.specificationsParagraph2} onChange={handleFormChange} />
          <TextAreaField label="Feature Paragraph 3" name="specificationsParagraph3" value={form.specificationsParagraph3} onChange={handleFormChange} />
          <TextAreaField label="Rules And Regulation" note="Used for compliance notes and also contributes to the feature bullet list." name="rulesRegulationText" rows={5} value={form.rulesRegulationText} onChange={handleFormChange} />
        </div>

        <div className={sectionCard}>
          <SectionIntro step="05" eyebrow="Available Plots" title="Plot Section Heading, Tabs, And Cards" note="Tabs become the buttons on the public page. Each card is shown inside the selected tab." />
          {renderSectionImageUpload(imgField("plotsImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Plots Small Top Line" name="plotsEyebrow" value={form.plotsEyebrow} onChange={handleFormChange} />
            <TextField label="Plots Title" name="plotsTitle" value={form.plotsTitle} onChange={handleFormChange} />
          </div>
          <TextAreaField label="Plots Intro Text" note="Short paragraph under Available Plots title." name="plotIntroText" value={form.plotIntroText} onChange={handleFormChange} />
          <div className="space-y-5">
            {plotTabs.map((tab, tabIndex) => (
              <div key={tabIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className={`mb-4 text-sm font-bold ${colors.sectionHead}`}>Tab {tabIndex + 1}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField label="Tab Key" note="Keep this short, lowercase, and unique." value={tab.key} onChange={(event) => handlePlotTabChange(tabIndex, "key", event.target.value)} />
                  <TextField label="Tab Button Text" value={tab.label} onChange={(event) => handlePlotTabChange(tabIndex, "label", event.target.value)} />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {tab.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Card {cardIndex + 1}</p>
                      <TextField label="Card Title" value={card.title} onChange={(event) => handlePlotCardChange(tabIndex, cardIndex, "title", event.target.value)} />
                      <TextAreaField label="Card Description" value={card.description} onChange={(event) => handlePlotCardChange(tabIndex, cardIndex, "description", event.target.value)} />
                      <IconPicker label="Card Icon" value={card.iconKey} onChange={(iconKey) => handlePlotCardChange(tabIndex, cardIndex, "iconKey", iconKey)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="06" eyebrow="Goals" title="Investment Goals Section" note="Each line becomes one checkmark item in the Goals area." />
          {renderSectionImageUpload(imgField("goalsImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Goals Small Top Line" name="goalsEyebrow" value={form.goalsEyebrow} onChange={handleFormChange} />
            <TextField label="Goals Title" name="goalsTitle" value={form.goalsTitle} onChange={handleFormChange} />
          </div>
          <div className="space-y-3">{goals.map((goal, index) => <TextField key={index} label={`Goal ${index + 1}`} value={goal} onChange={(event) => handleGoalChange(index, event.target.value)} />)}</div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="07" eyebrow="Map & Highlights" title="Map Heading, Image, And Location Cards" note="This controls the location map section and the highlight cards beside it." />
          {renderSectionImageUpload(imgField("partnersImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Map Small Top Line" name="mapEyebrow" value={form.mapEyebrow} onChange={handleFormChange} />
            <TextField label="Map Title" name="mapTitle" value={form.mapTitle} onChange={handleFormChange} />
          </div>
          <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed ${colors.paleBorder} rounded-[24px] cursor-pointer ${colors.hoverBorder} ${colors.hoverBg} transition-all ${colors.paleBg} overflow-hidden`}>
            {mapPreview ? <img src={mapPreview} alt="map" className="w-full max-h-72 object-contain p-3 bg-white" /> : (
              <div className="py-10 flex flex-col items-center">
                <MdCloudUpload className="text-slate-400 mb-2" size={30} />
                <span className="text-sm text-slate-600 font-semibold">Replace map image</span>
                <span className="text-xs text-slate-400 mt-1">Shown in map and booking plan sections</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFilePreview(setMapImage, setMapPreview, mapPreview)} />
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {locationHighlights.map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Highlight {index + 1}</p>
                <TextField label="Highlight Title" value={item.title} onChange={(event) => handleHighlightChange(index, "title", event.target.value)} />
                <TextAreaField label="Highlight Detail" rows={2} value={item.detail} onChange={(event) => handleHighlightChange(index, "detail", event.target.value)} />
                <IconPicker label="Highlight Icon" value={item.iconKey} onChange={(iconKey) => handleHighlightChange(index, "iconKey", iconKey)} />
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="08" eyebrow="Booking" title="Booking Block Text" note="This appears beside the booking form near the bottom of the public page." />
          {renderSectionImageUpload(imgField("bookingImage"))}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Booking Small Top Line" name="bookingEyebrow" value={form.bookingEyebrow} onChange={handleFormChange} />
            <TextField label="Booking Title" name="bookingTitle" value={form.bookingTitle} onChange={handleFormChange} />
          </div>
          <TextAreaField label="Booking Subtitle" name="bookingSubtitle" value={form.bookingSubtitle} onChange={handleFormChange} />
          <div className={`rounded-2xl border ${colors.paleBorder} ${colors.paleBg} p-5`}>
            <div>
              <p className="text-sm font-bold text-slate-800">Booking Download PDF</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                This section uses the same Brochure PDF uploaded in Project Overview.
              </p>
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <SectionIntro step="09" eyebrow="Media" title="Slider And Gallery Images" note="Upload multiple gallery images. These images power the Best Option slider, Destination slider, and Project Gallery on the frontend." />
          <div className={`rounded-2xl border ${colors.paleBorder} ${colors.paleBg} px-4 py-3 text-sm text-slate-600`}>
            {galleryFiles.length > 0
              ? `${galleryFiles.length} new image${galleryFiles.length === 1 ? "" : "s"} selected. Saving will replace the current gallery.`
              : `${galleryPreviews.length} current image${galleryPreviews.length === 1 ? "" : "s"} saved. Add new images only when you want to replace this gallery.`}
            <span className="ml-1 font-semibold text-slate-800">Limit: {maxGalleryImages} images.</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {galleryPreviews.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={src} alt="" className="w-full h-full object-cover" />
                {galleryFiles.length > 0 && <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-sm transition hover:bg-rose-500"><MdDelete size={16} /></button>}
              </div>
            ))}
            {galleryFiles.length < maxGalleryImages && (
              <label className={`aspect-square rounded-2xl border-2 border-dashed ${colors.paleBorder} flex flex-col items-center justify-center cursor-pointer ${colors.hoverBorder} ${colors.hoverBg} transition-all ${colors.paleBg}`}>
                <MdCloudUpload className="text-slate-400" size={24} />
                <span className="text-xs text-slate-500 mt-2 font-medium">Add Image</span>
                <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.28em] ${colors.readyText}`}>Ready To Save</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Existing media remains visible, and any new upload is previewed above before updating the entry.</p>
          </div>
          <button type="submit" disabled={submitState.active || isLoading} className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${colors.button} px-8 py-3.5 text-sm font-bold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60`}>
            {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
            {submitState.active || isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectCityUpdateForm;
