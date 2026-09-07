import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MdArrowBack,
  MdCloudUpload,
  MdDelete,
  MdSyncAlt,
  MdDesktopWindows,
  MdTabletMac,
  MdPhoneIphone,
  MdVisibility,
  MdEdit,
  MdViewSidebar,
  MdOutlineOpenInNew,
  MdExpandMore,
  MdExpandLess,
  MdCheck,
  MdRefresh,
  MdLayers,
  MdLocationOn,
  MdImage,
  MdPlayCircleFilled,
  MdListAlt,
  MdGridView,
  MdDescription,
  MdMap,
  MdBookOnline,
  MdUnfoldMore,
  MdUnfoldLess,
  MdChevronRight,
  MdArrowForward,
  MdDashboard,
} from "react-icons/md";
import { FaSpinner, FaYoutube } from "react-icons/fa";
import { ProjectSubmitOverlay } from "../projects/projectFormUi";
import { industrialCityIconRegistry } from "../../bannerprojects/projectShowcaseData";
import { appendOptimizedFile, appendOptimizedFiles, uploadSingleAsset } from "../../../utils/cloudinaryUpload";
import { getYouTubeEmbedUrl } from "../../../components/VideoUtility";
import ProjectShowcaseTemplate from "../../bannerprojects/ProjectShowcaseTemplate";

import greenCityLogo from "../../../assets/images/greenCity.png";
import squareCityLogo from "../../../assets/images/squareCityLogo.png";
import greenCityBrochure from "../../../assets/images/green-city-brochure.png";
import squareCityBrochure from "../../../assets/images/squareCityBrochure.png";
import greenCityMap from "../../../assets/images/greenCityMap.png";
import squareCityMap from "../../../assets/images/squareCityMap.png";

const colorMap = {
  emerald: {
    focus: "focus:border-emerald-400 focus:ring-emerald-100",
    sectionHead: "text-emerald-700",
    accent: "bg-emerald-600",
    accentHover: "hover:bg-emerald-700",
    border: "border-emerald-200",
    paleBorder: "border-emerald-200",
    paleBg: "bg-emerald-50/50",
    hoverBorder: "hover:border-emerald-400",
    hoverBg: "hover:bg-emerald-50",
    selected: "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100",
    button: "from-emerald-500 to-green-700 hover:from-emerald-600 hover:to-green-800",
    readyText: "text-emerald-300",
    cardIconBg: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  amber: {
    focus: "focus:border-amber-400 focus:ring-amber-100",
    sectionHead: "text-amber-700",
    accent: "bg-amber-600",
    accentHover: "hover:bg-amber-700",
    border: "border-amber-200",
    paleBorder: "border-amber-200",
    paleBg: "bg-amber-50/50",
    hoverBorder: "hover:border-amber-400",
    hoverBg: "hover:bg-amber-50",
    selected: "border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-100",
    button: "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    readyText: "text-amber-300",
    cardIconBg: "bg-amber-100 text-amber-700",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
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
  { key: "heroImage", label: "Hero Background", note: "Top section background visual." },
  { key: "overviewImage", label: "Overview Media", note: "Project Overview visual beside the text." },
  { key: "locationImage", label: "Location Visual", note: "Location section preview image." },
  { key: "featuresImage", label: "Features Visual", note: "Features section image." },
  { key: "plotsImage", label: "Plots Visual", note: "Available Plots background visual." },
  { key: "goalsImage", label: "Goals Visual", note: "Goals section image." },
  { key: "partnersImage", label: "Partners Background", note: "Our Concern/partners section background." },
  { key: "bookingImage", label: "Booking Background", note: "Bottom booking section background." },
];

const accordionSections = [
  { id: "hero", label: "Hero Top Banner", desc: "Headings & Hero Background", icon: MdLayers, step: "01" },
  { id: "overview", label: "Project Overview", desc: "Introduction Copy & Brochure", icon: MdDescription, step: "02" },
  { id: "location", label: "Location & Video Tour", desc: "Video Player, Route Narrative & Benefits", icon: MdPlayCircleFilled, step: "03" },
  { id: "features", label: "Features & Rules", desc: "Key Selling Points & RAJUK Compliance", icon: MdListAlt, step: "04" },
  { id: "plots", label: "Available Plots", desc: "Category Tabs & Plot Cards", icon: MdGridView, step: "05" },
  { id: "goals", label: "Vision & Goals", desc: "Strategic Points & Objectives", icon: MdCheck, step: "06" },
  { id: "map", label: "Master Plan & Map", desc: "Map Graphic & Highlight Cards", icon: MdMap, step: "07" },
  { id: "gallery", label: "Project Gallery", desc: "Photo Showcase & Sliders", icon: MdImage, step: "08" },
  { id: "booking", label: "Booking & Downloads", desc: "Bottom CTA & Booking PDF", icon: MdBookOnline, step: "09" },
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

const resolveIcon = (iconKey, fallback) =>
  industrialCityIconRegistry[iconKey] || fallback || industrialCityIconRegistry.FaHome;

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
  const colors = colorMap[theme] || colorMap.emerald;

  // Builder View Mode: "split" | "editor" | "preview"
  const [viewMode, setViewMode] = useState("split");
  // Device Mode: "desktop" | "tablet" | "mobile"
  const [deviceMode, setDeviceMode] = useState("desktop");

  // Sidebar Layout Mode: "focus" (drill-down to selected section) | "accordion" (all stacked)
  const [sidebarMode, setSidebarMode] = useState("focus");

  // Currently focused section: "hero", "overview", "location", etc.
  const [activeSection, setActiveSection] = useState("hero");

  // Accordion state (when in accordion mode)
  const [openSections, setOpenSections] = useState({
    hero: true,
    overview: false,
    location: false,
    features: false,
    plots: false,
    goals: false,
    map: false,
    gallery: false,
    booking: false,
  });

  // Smooth scroll to the section in live preview
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setOpenSections((prev) => ({ ...prev, [sectionId]: true }));
    setTimeout(() => {
      const el = document.getElementById(`preview-section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handleSelectSectionCard = (sectionId) => {
    scrollToSection(sectionId);
  };

  const toggleSection = (sectionId) => {
    const nextState = !openSections[sectionId];
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: nextState,
    }));
    if (nextState) {
      scrollToSection(sectionId);
    }
  };

  const expandAll = () => {
    setOpenSections({
      hero: true,
      overview: true,
      location: true,
      features: true,
      plots: true,
      goals: true,
      map: true,
      gallery: true,
      booking: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      hero: false,
      overview: false,
      location: false,
      features: false,
      plots: false,
      goals: false,
      map: false,
      gallery: false,
      booking: false,
    });
  };

  const inp = `w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${colors.focus}`;
  const lbl = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600";

  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
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

  const isSquare = projectName?.toLowerCase().includes("square");
  const defaultLogo = isSquare ? squareCityLogo : greenCityLogo;
  const defaultBrochure = isSquare ? squareCityBrochure : greenCityBrochure;
  const defaultMap = isSquare ? squareCityMap : greenCityMap;
  const liveRoute = isSquare ? "/squareCity" : "/greenCity";

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
    setVideoUrl(item[videoField] || "");
    setBrochurePreview(item.brochureImage?.url || null);
    setBrochurePdfLabel(item.brochurePdf?.url ? "Current brochure PDF is saved" : "");
    setBookingPdfLabel(item.bookingPdf?.url ? "Current booking PDF is saved" : "");
    setMapPreview(item.mapImage?.url || null);

    if (item.sectionImages) {
      const existing = {};
      sectionImageFields.forEach(({ key }) => {
        if (item.sectionImages[key]?.url) existing[key] = item.sectionImages[key].url;
      });
      setSectionImagePreviews(existing);
    }
    if (Array.isArray(item.galleryImages) && item.galleryImages.length) {
      setGalleryPreviews(item.galleryImages.map((img) => img.url).filter(Boolean));
    }
    if (Array.isArray(item.goals) && item.goals.length) setGoals(item.goals);
    if (Array.isArray(item.locationHighlights) && item.locationHighlights.length)
      setLocationHighlights(item.locationHighlights);
    if (Array.isArray(item.plotTabs) && item.plotTabs.length) setPlotTabs(item.plotTabs);
  }, [collection, id, loadCollection, videoField]);

  const handleFormChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleGoalChange = (idx, val) => setGoals((g) => g.map((item, i) => (i === idx ? val : item)));
  const addGoal = () => setGoals((g) => [...g, ""]);
  const removeGoal = (idx) => setGoals((g) => g.filter((_, i) => i !== idx));

  const handleHighlightChange = (idx, key, val) =>
    setLocationHighlights((h) => h.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

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
    if (e) e.preventDefault();
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
      if (video) {
        formData.append(videoField, video);
      } else if (videoUrl !== undefined) {
        formData.append(videoField, videoUrl.trim());
      }
      await appendOptimizedFile(formData, "brochureImage", brochureImage);
      const pdfFolder = pdfFolderByVideoField[videoField] || "city/pdfs";
      if (brochurePdf) {
        setSubmissionStage(`Uploading ${projectName} brochure`, "The PDF is going directly to Cloudinary so the server limit is avoided.", 1);
        const brochurePdfAsset = await uploadSingleAsset(brochurePdf, pdfFolder);
        formData.append("brochurePdfAsset", JSON.stringify(brochurePdfAsset));
        formData.append("brochurePdfUrl", brochurePdfAsset.url || "");
        formData.append("brochurePdfPublicId", brochurePdfAsset.public_id || "");
      }
      if (bookingPdf) {
        setSubmissionStage(`Uploading ${projectName} booking PDF`, "The booking PDF is going directly to Cloudinary so the server limit is avoided.", 1);
        const bookingPdfAsset = await uploadSingleAsset(bookingPdf, pdfFolder);
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

  // Build live showcase props dynamically in real-time
  const liveConfig = useMemo(() => {
    const base = { ...(config || {}) };
    textKeys.forEach((key) => {
      if (form[key] !== undefined && form[key] !== "") base[key] = form[key];
    });
    const effectiveGoals = (goals && goals.length) ? goals.filter(Boolean) : (defaultGoals || []);
    if (effectiveGoals.length) base.goals = effectiveGoals;

    const rawHighlights = (locationHighlights && locationHighlights.length) ? locationHighlights : (defaultLocationHighlights || []);
    if (rawHighlights.length) {
      base.locationHighlights = rawHighlights.map((item, index) => ({
        ...item,
        icon: resolveIcon(item.iconKey, config?.locationHighlights?.[index]?.icon),
      }));
    }

    const rawPlotTabs = (plotTabs && plotTabs.length) ? plotTabs : (defaultPlotTabs || []);
    if (rawPlotTabs.length) {
      base.plotTabs = rawPlotTabs.map((tab, tIdx) => ({
        ...tab,
        cards: (tab.cards || []).map((card, cIdx) => ({
          ...card,
          icon: resolveIcon(card.iconKey, config?.plotTabs?.[tIdx]?.cards?.[cIdx]?.icon),
        })),
      }));
    }
    return base;
  }, [config, form, goals, locationHighlights, plotTabs, defaultGoals, defaultLocationHighlights, defaultPlotTabs]);

  const liveSectionImages = useMemo(() => {
    const result = {};
    sectionImageFields.forEach(({ key }) => {
      result[key] = { url: sectionImagePreviews[key] || "" };
    });
    return result;
  }, [sectionImagePreviews]);

  const effectiveVideo = videoPreview || videoUrl || "";

  const defaultOverview = [
    "নর্থ সাউথ গ্রুপ রিয়েল এস্টেট খাতের একটি শীর্ষস্থানীয় প্রতিষ্ঠান, যা ক্রেতাদের চাহিদা এবং দীর্ঘমেয়াদী মূল্যায়নের ভিত্তিতে আধুনিক আবাসিক প্রকল্প উপহার দিয়ে আসছে।",
    "প্রকল্পটি ঢাকা-সিলেট মহাসড়কের ভুলতা-গাউছিয়া সংলগ্ন একটি আধুনিক ও পরিবেশবান্ধব আবাসন প্রকল্প।",
  ];
  const rawOverview = [form.overviewParagraph1, form.overviewParagraph2].filter(Boolean);
  const effectiveOverview = rawOverview.length ? rawOverview : defaultOverview;

  const defaultSpecs = [
    "রাজউকের নিয়ম ও পরিবেশবান্ধব নগর পরিকল্পনার সমন্বয়ে তৈরি, যা বাসিন্দাদের জন্য একটি সুস্থ ও নিরাপদ আবাসন নিশ্চিত করে।",
    "নাগরিক সুযোগ-সুবিধা, সবুজ পার্ক, খেলার মাঠ, কমিউনিটি সেন্টার এবং মনোরম লেক ভিউ একটি সমৃদ্ধ টাউনশিপ জীবনের পূর্ণতা দেয়।",
    "শিক্ষা প্রতিষ্ঠান, আধুনিক স্বাস্থ্যসেবা, শপিং কমপ্লেক্স, কমিউনিটি সেন্টার এবং মসজিদ প্রকল্পের ভেতরেই দৈনন্দিন চাহিদা পূরণ করে।",
  ];
  const rawSpecs = [
    form.specificationsParagraph1,
    form.specificationsParagraph2,
    form.specificationsParagraph3,
  ].filter(Boolean);
  const effectiveSpecs = rawSpecs.length ? rawSpecs : defaultSpecs;

  const defaultGallery = [
    defaultBrochure,
    defaultMap,
    greenCityLogo,
    squareCityLogo,
  ];
  const effectiveGallery = galleryPreviews.length ? galleryPreviews : defaultGallery;

  // Helper UI Sub-Components
  const TextField = ({ label, note, ...props }) => (
    <div>
      <label className={lbl}>{label}</label>
      <input {...props} className={inp} />
      {note && <p className="mt-1 text-[11px] leading-4 text-slate-400">{note}</p>}
    </div>
  );

  const TextAreaField = ({ label, note, rows = 3, ...props }) => (
    <div>
      <label className={lbl}>{label}</label>
      <textarea {...props} rows={rows} className={inp} />
      {note && <p className="mt-1 text-[11px] leading-4 text-slate-400">{note}</p>}
    </div>
  );

  const IconPicker = ({ label, value, onChange }) => (
    <div>
      <label className={lbl}>{label}</label>
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-5">
        {iconOptions.map((iconKey) => {
          const Icon = industrialCityIconRegistry[iconKey];
          const selected = value === iconKey;
          return (
            <button
              key={iconKey}
              type="button"
              onClick={() => onChange(iconKey)}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center text-[10px] font-semibold transition ${
                selected ? colors.selected : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
              title={iconLabels[iconKey]}
            >
              {Icon && <Icon className="text-base" />}
              <span className="truncate max-w-[50px]">{iconLabels[iconKey]}</span>
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
        className={`flex cursor-pointer items-stretch overflow-hidden rounded-xl border border-dashed ${colors.paleBorder} bg-white transition-all ${colors.hoverBorder}`}
      >
        <div className="flex flex-1 flex-col justify-center gap-0.5 p-3">
          <p className="text-xs font-bold text-slate-800">{label}</p>
          <p className="text-[11px] leading-4 text-slate-400">{note}</p>
          {file ? (
            <p className="mt-1 truncate text-[11px] font-semibold text-emerald-600">✓ {file.name}</p>
          ) : (
            <p className={`mt-0.5 text-[11px] font-semibold ${colors.sectionHead}`}>Click to change →</p>
          )}
        </div>
        <div className={`flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden border-l border-dashed ${colors.paleBorder} ${colors.paleBg}`}>
          {preview ? (
            <img src={preview} alt={label} className="h-full w-full object-cover" />
          ) : (
            <MdCloudUpload className="text-slate-300" size={20} />
          )}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={(event) => handleSectionImageChange(key, event)} />
      </label>
    );
  };

  const imgField = (key) => sectionImageFields.find((f) => f.key === key);

  // SECTION FIELD RENDERERS (Reusable for both Focus Mode & Accordion Mode)
  const renderHeroFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("heroImage"))}
      <TextField label="Small Eyebrow Line" note="Shown above the main headline." name="heroEyebrow" value={form.heroEyebrow} onChange={handleFormChange} />
      <TextField label="Main Headline Title" note="Large prominent page title." name="heroTitle" value={form.heroTitle} onChange={handleFormChange} />
    </div>
  );

  const renderOverviewFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("overviewImage"))}
      <TextAreaField label="Overview Paragraph 1" note="Company/brand introduction." name="overviewParagraph1" rows={3} value={form.overviewParagraph1} onChange={handleFormChange} />
      <TextAreaField label="Overview Paragraph 2" note="Project size, location, and purpose." name="overviewParagraph2" rows={3} value={form.overviewParagraph2} onChange={handleFormChange} />

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-3">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Brochure Assets</p>
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-3 hover:border-emerald-400 transition">
          <div>
            <p className="text-xs font-bold text-slate-800">Brochure Cover Image</p>
            <p className="text-[11px] text-slate-400">Shown in master plan/brochure card.</p>
          </div>
          {brochurePreview ? (
            <img src={brochurePreview} alt="" className="h-10 w-10 object-contain rounded" />
          ) : (
            <MdCloudUpload className="text-slate-400" size={20} />
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFilePreview(setBrochureImage, setBrochurePreview, brochurePreview)} />
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-3 hover:border-emerald-400 transition">
          <div>
            <p className="text-xs font-bold text-slate-800">Brochure PDF</p>
            <p className="text-[11px] text-slate-400">{brochurePdfLabel || "Click to upload brochure PDF"}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <MdCloudUpload size={18} />
          </div>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfChange(setBrochurePdf, setBrochurePdfLabel)} />
        </label>
      </div>
    </div>
  );

  const renderLocationFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("locationImage"))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Location Small Line" name="locationEyebrow" value={form.locationEyebrow} onChange={handleFormChange} />
        <TextField label="Location Heading" name="locationTitle" value={form.locationTitle} onChange={handleFormChange} />
      </div>

      <TextAreaField
        label="Location Advantages / Route Story"
        note="Appears beside the location tour video player on the frontend."
        name="locationBenefitsText"
        rows={5}
        value={form.locationBenefitsText}
        onChange={handleFormChange}
      />

      {/* Location Video Controls */}
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
              <FaYoutube size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Location Tour Video
              </p>
              <p className="text-[10px] text-slate-400">YouTube link or local MP4 video file</p>
            </div>
          </div>

          {effectiveVideo && (
            <button
              type="button"
              onClick={() => {
                setVideo(null);
                setVideoUrl("");
                safeRevoke(videoPreview);
                setVideoPreview(null);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-100"
            >
              <MdDelete size={14} />
              Remove Video
            </button>
          )}
        </div>

        <div>
          <label className={lbl}>Paste YouTube Video Link</label>
          <input
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=... or youtu.be/..."
            value={videoUrl}
            onChange={(e) => {
              const val = e.target.value;
              setVideoUrl(val);
              if (!video) setVideoPreview(val || null);
            }}
            className={inp}
          />
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-3 hover:bg-white hover:border-emerald-400 transition">
          <div className="flex items-center gap-2.5">
            <MdCloudUpload className="text-slate-400" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-700">
                {video ? video.name : "Or upload local video file"}
              </p>
              <p className="text-[10px] text-slate-400">MP4, WebM (Uploaded to Cloudinary)</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600">Browse</span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              safeRevoke(videoPreview);
              setVideo(file);
              setVideoUrl("");
              setVideoPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {effectiveVideo && (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-black aspect-video shadow-sm flex items-center justify-center">
            {getYouTubeEmbedUrl(effectiveVideo) ? (
              <iframe
                src={getYouTubeEmbedUrl(effectiveVideo)}
                title="Location Tour Preview"
                className="h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={effectiveVideo} controls className="h-full w-full object-cover" />
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderFeaturesFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("featuresImage"))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Features Small Line" name="featuresEyebrow" value={form.featuresEyebrow} onChange={handleFormChange} />
        <TextField label="Features Title" name="featuresTitle" value={form.featuresTitle} onChange={handleFormChange} />
      </div>
      <TextAreaField label="Feature Paragraph 1" name="specificationsParagraph1" value={form.specificationsParagraph1} onChange={handleFormChange} />
      <TextAreaField label="Feature Paragraph 2" name="specificationsParagraph2" value={form.specificationsParagraph2} onChange={handleFormChange} />
      <TextAreaField label="Feature Paragraph 3" name="specificationsParagraph3" value={form.specificationsParagraph3} onChange={handleFormChange} />
      <TextAreaField label="Rules & Regulations" note="Used for compliance notes." name="rulesRegulationText" rows={4} value={form.rulesRegulationText} onChange={handleFormChange} />
    </div>
  );

  const renderPlotsFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("plotsImage"))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Plots Small Line" name="plotsEyebrow" value={form.plotsEyebrow} onChange={handleFormChange} />
        <TextField label="Plots Title" name="plotsTitle" value={form.plotsTitle} onChange={handleFormChange} />
      </div>
      <TextAreaField label="Plots Intro Text" name="plotIntroText" value={form.plotIntroText} onChange={handleFormChange} />

      <div className="space-y-4 pt-2">
        {plotTabs.map((tab, tabIndex) => (
          <div key={tabIndex} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-3">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tab {tabIndex + 1}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <TextField label="Key" value={tab.key} onChange={(e) => handlePlotTabChange(tabIndex, "key", e.target.value)} />
              <TextField label="Label" value={tab.label} onChange={(e) => handlePlotTabChange(tabIndex, "label", e.target.value)} />
            </div>

            <div className="space-y-2 pt-2">
              {tab.cards?.map((card, cardIndex) => (
                <div key={cardIndex} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Card {cardIndex + 1}</p>
                  <TextField label="Title" value={card.title} onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "title", e.target.value)} />
                  <TextAreaField label="Description" rows={2} value={card.description} onChange={(e) => handlePlotCardChange(tabIndex, cardIndex, "description", e.target.value)} />
                  <IconPicker label="Icon" value={card.iconKey} onChange={(iconKey) => handlePlotCardChange(tabIndex, cardIndex, "iconKey", iconKey)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoalsFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("goalsImage"))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Goals Small Line" name="goalsEyebrow" value={form.goalsEyebrow} onChange={handleFormChange} />
        <TextField label="Goals Title" name="goalsTitle" value={form.goalsTitle} onChange={handleFormChange} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className={lbl}>Goals Bullet Points</label>
          <button
            type="button"
            onClick={addGoal}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
          >
            + Add Point
          </button>
        </div>
        {goals.map((goal, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(index, e.target.value)}
              className={inp}
              placeholder={`Goal item ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeGoal(index)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 shrink-0"
            >
              <MdDelete size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMapFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("partnersImage"))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Map Small Line" name="mapEyebrow" value={form.mapEyebrow} onChange={handleFormChange} />
        <TextField label="Map Title" name="mapTitle" value={form.mapTitle} onChange={handleFormChange} />
      </div>

      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-emerald-400 p-4 bg-slate-50/50 transition">
        {mapPreview ? (
          <img src={mapPreview} alt="map" className="max-h-52 w-full object-contain bg-white rounded-lg p-2" />
        ) : (
          <div className="py-4 text-center">
            <MdCloudUpload className="text-slate-400 mx-auto mb-1" size={24} />
            <span className="text-xs font-semibold text-slate-600">Upload master plan map</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFilePreview(setMapImage, setMapPreview, mapPreview)} />
      </label>

      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location Highlights</p>
        {locationHighlights.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highlight {index + 1}</p>
            <TextField label="Title" value={item.title} onChange={(e) => handleHighlightChange(index, "title", e.target.value)} />
            <TextAreaField label="Detail" rows={2} value={item.detail} onChange={(e) => handleHighlightChange(index, "detail", e.target.value)} />
            <IconPicker label="Icon" value={item.iconKey} onChange={(iconKey) => handleHighlightChange(index, "iconKey", iconKey)} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryFields = () => (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        {galleryFiles.length > 0
          ? `${galleryFiles.length} new images selected. Saving will replace current gallery.`
          : `${galleryPreviews.length} images saved. Add more below.`}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {galleryPreviews.map((src, i) => (
          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            <img src={src} alt="" className="w-full h-full object-cover" />
            {galleryFiles.length > 0 && (
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
              >
                <MdDelete size={13} />
              </button>
            )}
          </div>
        ))}

        {galleryFiles.length < maxGalleryImages && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition bg-slate-50/60">
            <MdCloudUpload className="text-slate-400" size={20} />
            <span className="text-[10px] text-slate-500 font-semibold mt-1">Add Image</span>
            <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
          </label>
        )}
      </div>
    </div>
  );

  const renderBookingFields = () => (
    <div className="space-y-4">
      {renderSectionImageUpload(imgField("bookingImage"))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Booking Small Line" name="bookingEyebrow" value={form.bookingEyebrow} onChange={handleFormChange} />
        <TextField label="Booking Title" name="bookingTitle" value={form.bookingTitle} onChange={handleFormChange} />
      </div>
      <TextAreaField label="Booking Subtitle" name="bookingSubtitle" value={form.bookingSubtitle} onChange={handleFormChange} />

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white p-3 hover:border-emerald-400 transition">
        <div>
          <p className="text-xs font-bold text-slate-800">Booking Form PDF</p>
          <p className="text-[11px] text-slate-400">{bookingPdfLabel || "Upload booking application PDF"}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <MdCloudUpload size={18} />
        </div>
        <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handlePdfChange(setBookingPdf, setBookingPdfLabel)} />
      </label>
    </div>
  );

  // Map section ID to its field renderer
  const sectionRenderers = {
    hero: renderHeroFields,
    overview: renderOverviewFields,
    location: renderLocationFields,
    features: renderFeaturesFields,
    plots: renderPlotsFields,
    goals: renderGoalsFields,
    map: renderMapFields,
    gallery: renderGalleryFields,
    booking: renderBookingFields,
  };

  const currentSectionObj = accordionSections.find((s) => s.id === activeSection) || accordionSections[0];
  const currentSectionIndex = accordionSections.findIndex((s) => s.id === activeSection);
  const prevSection = currentSectionIndex > 0 ? accordionSections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < accordionSections.length - 1 ? accordionSections[currentSectionIndex + 1] : null;

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
      />

      {/* ════════════════════════════════════════════════════════════════
          ELEMENTOR BUILDER TOP TOOLBAR
      ════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 -mx-4 -mt-6 mb-6 border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-white shadow-xl backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back Arrow & Project Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(listPath)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              title="Back to List"
            >
              <MdArrowBack size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-600 text-xs font-black text-white shadow-sm">
                E
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-wide">{projectName}</h1>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Visual Builder
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Device & View Mode Switcher */}
          <div className="flex items-center gap-2">
            {/* View Mode (Split / Editor Only / Preview Only) */}
            <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  viewMode === "split" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Split Screen: Editor + Live Preview"
              >
                <MdViewSidebar size={15} />
                <span className="hidden md:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("editor")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  viewMode === "editor" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Editor Only"
              >
                <MdEdit size={14} />
                <span className="hidden md:inline">Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  viewMode === "preview" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Live Preview Only"
              >
                <MdVisibility size={15} />
                <span className="hidden md:inline">Preview</span>
              </button>
            </div>

            {/* Device Switcher (Desktop / Tablet / Mobile) - Shown when preview is active */}
            {viewMode !== "editor" && (
              <div className="hidden sm:flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-0.5">
                <button
                  type="button"
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs transition ${
                    deviceMode === "desktop" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Desktop View"
                >
                  <MdDesktopWindows size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("tablet")}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs transition ${
                    deviceMode === "tablet" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Tablet View (768px)"
                >
                  <MdTabletMac size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs transition ${
                    deviceMode === "mobile" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Mobile View (390px)"
                >
                  <MdPhoneIphone size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Open Public Site & Elementor Save Button */}
          <div className="flex items-center gap-2">
            <a
              href={liveRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              title="Open real frontend in new tab"
            >
              <span>Live Site</span>
              <MdOutlineOpenInNew size={13} />
            </a>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitState.active || isLoading}
              className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:from-emerald-600 hover:to-green-700 disabled:opacity-50`}
            >
              {(submitState.active || isLoading) && <FaSpinner className="animate-spin text-xs" />}
              <span>{submitState.active || isLoading ? "Saving..." : "Update"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          BUILDER WORKSPACE (SPLIT SCREEN / FULL EDITOR / FULL PREVIEW)
      ════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* ─────────────────────────────────────────────────────────────
            LEFT PANEL: ELEMENTOR CONTROLS (EDITOR)
        ───────────────────────────────────────────────────────────── */}
        {(viewMode === "split" || viewMode === "editor") && (
          <div
            className={`flex flex-col transition-all ${
              viewMode === "editor"
                ? "w-full max-w-4xl mx-auto"
                : "w-full lg:w-[480px] xl:w-[520px] 2xl:w-[560px] shrink-0"
            }`}
          >
            {/* Top Mode Toggle (Focus vs Accordion) */}
            <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex items-center rounded-xl bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setSidebarMode("focus")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    sidebarMode === "focus"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Click a section to edit it individually"
                >
                  <MdDashboard size={14} />
                  <span>Section Focus</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarMode("accordion")}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    sidebarMode === "accordion"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="View all sections stacked as accordions"
                >
                  <MdLayers size={14} />
                  <span>All Accordions</span>
                </button>
              </div>

              {sidebarMode === "accordion" ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    <MdUnfoldMore size={13} />
                    Expand
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    <MdUnfoldLess size={13} />
                    Collapse
                  </button>
                </div>
              ) : (
                activeSection && (
                  <button
                    type="button"
                    onClick={() => setActiveSection(null)}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 mr-1"
                  >
                    <span>← All Sections</span>
                  </button>
                )
              )}
            </div>

            {/* Quick Section Switcher Pills */}
            <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {accordionSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelectSectionCard(sec.id)}
                  className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                    activeSection === sec.id
                      ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-[10px] opacity-75">{sec.step}</span>
                  <span>{sec.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* ════════════════════════════════════════════════════════════
                MODE A: SINGLE SECTION FOCUS (CLICK SECTION -> EDIT THAT SECTION)
            ════════════════════════════════════════════════════════════ */}
            {sidebarMode === "focus" && (
              <div className="space-y-4 pb-16">
                {activeSection === null ? (
                  /* ── SECTION NAVIGATOR CARDS (CLICK ANY TO EDIT) ── */
                  <div className="space-y-2.5">
                    <p className="px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Select a Section to Edit:
                    </p>
                    {accordionSections.map((sec) => {
                      const Icon = sec.icon;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => handleSelectSectionCard(sec.id)}
                          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50/20 hover:shadow-md"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-bold text-xs group-hover:bg-emerald-100 group-hover:text-emerald-700 transition">
                              {sec.step}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-950">
                                {sec.label}
                              </p>
                              <p className="text-xs text-slate-400 truncate">{sec.desc}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {sec.id === "location" && effectiveVideo && (
                              <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                                <FaYoutube size={11} /> Video
                              </span>
                            )}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                              <MdChevronRight size={18} />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* ── CURRENTLY FOCUSED SECTION EDITOR ── */
                  <div className="overflow-hidden rounded-2xl border-2 border-emerald-300 bg-white shadow-md ring-2 ring-emerald-100/50">
                    {/* Focused Header with Back Button */}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveSection(null)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-100 transition"
                          title="Back to all sections"
                        >
                          <MdArrowBack size={16} />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                              {currentSectionObj.step}
                            </span>
                            <h2 className="text-base font-black text-slate-900">{currentSectionObj.label}</h2>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{currentSectionObj.desc}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToSection(currentSectionObj.id)}
                        className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
                        title="Scroll preview to this section"
                      >
                        <MdVisibility size={13} />
                        <span>View</span>
                      </button>
                    </div>

                    {/* Section Inputs Form */}
                    <div className="p-4 space-y-4">
                      {sectionRenderers[activeSection]?.()}
                    </div>

                    {/* Bottom Prev / Next Navigation */}
                    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-3">
                      {prevSection ? (
                        <button
                          type="button"
                          onClick={() => handleSelectSectionCard(prevSection.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                        >
                          <MdArrowBack size={15} />
                          <span>{prevSection.label}</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {nextSection ? (
                        <button
                          type="button"
                          onClick={() => handleSelectSectionCard(nextSection.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 ml-auto"
                        >
                          <span>{nextSection.label}</span>
                          <MdArrowForward size={15} />
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Save Changes Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitState.active || isLoading}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${colors.button} px-6 py-3.5 text-sm font-bold text-white shadow-md transition disabled:opacity-50`}
                  >
                    {(submitState.active || isLoading) && <FaSpinner className="animate-spin text-sm" />}
                    <span>{submitState.active || isLoading ? "Saving Updates..." : "Save All Changes"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════
                MODE B: ALL ACCORDIONS STACKED (EXPANDABLE)
            ════════════════════════════════════════════════════════════ */}
            {sidebarMode === "accordion" && (
              <form onSubmit={handleSubmit} className="space-y-3 pb-16">
                {accordionSections.map((sec) => {
                  const isOpen = openSections[sec.id];
                  const renderFields = sectionRenderers[sec.id];
                  return (
                    <div
                      key={sec.id}
                      className={`overflow-hidden rounded-2xl border transition ${
                        isOpen ? "border-emerald-300 bg-white shadow-md ring-2 ring-emerald-100/50" : "border-slate-200 bg-white shadow-sm"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(sec.id)}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition ${
                          isOpen ? "bg-emerald-50/40" : "bg-slate-50/70 hover:bg-slate-100/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${
                              isOpen ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {sec.step}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{sec.label}</p>
                            <p className="text-[11px] text-slate-400">{sec.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {sec.id === "location" && effectiveVideo && (
                            <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                              <FaYoutube size={11} /> Video
                            </span>
                          )}
                          {isOpen ? <MdExpandLess size={20} className="text-slate-600" /> : <MdExpandMore size={20} className="text-slate-400" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="space-y-4 border-t border-slate-100 p-4">
                          {renderFields?.()}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitState.active || isLoading}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${colors.button} px-6 py-3.5 text-sm font-bold text-white shadow-md transition disabled:opacity-50`}
                  >
                    {(submitState.active || isLoading) && <FaSpinner className="animate-spin text-sm" />}
                    <span>{submitState.active || isLoading ? "Saving Updates..." : "Save All Changes"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL: REAL-TIME LIVE VISUAL PREVIEW (ELEMENTOR CANVAS)
        ───────────────────────────────────────────────────────────── */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className="flex-1 min-w-0 flex flex-col items-center">
            {/* Live Canvas Window Header */}
            <div className="w-full flex items-center justify-between rounded-t-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-300 shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 font-bold text-slate-200">
                  {deviceMode === "desktop" && "Desktop Canvas (Full Width)"}
                  {deviceMode === "tablet" && "Tablet Simulation (768px)"}
                  {deviceMode === "mobile" && "Mobile Simulation (390px)"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Real-Time Sync Active
                </span>
              </div>
            </div>

            {/* Scrollable Viewport Container */}
            <div className="w-full overflow-x-auto bg-slate-950/95 p-3 sm:p-5 rounded-b-2xl border-x border-b border-slate-800 shadow-inner flex justify-center">
              {/* Force elements with AOS animation attributes to be immediately 100% visible and un-shifted inside live preview */}
              <style>{`
                #live-preview-viewport [data-aos],
                #live-preview-viewport [data-aos="fade-up"],
                #live-preview-viewport [data-aos="fade-down"],
                #live-preview-viewport [data-aos="fade-left"],
                #live-preview-viewport [data-aos="fade-right"],
                #live-preview-viewport [data-aos="zoom-in"],
                #live-preview-viewport [data-aos="zoom-in-up"] {
                  opacity: 1 !important;
                  transform: none !important;
                  visibility: visible !important;
                  transition: none !important;
                }
              `}</style>
              <div
                id="live-preview-viewport"
                className={`transition-all duration-300 bg-white shadow-2xl overflow-y-auto max-h-[82vh] custom-scrollbar scroll-smooth ${
                  deviceMode === "mobile"
                    ? "w-[390px] rounded-[36px] border-[8px] border-slate-800 ring-2 ring-slate-700"
                    : deviceMode === "tablet"
                    ? "w-[768px] rounded-[28px] border-[8px] border-slate-800 ring-2 ring-slate-700"
                    : "w-full rounded-xl border border-slate-200"
                }`}
              >
                {/* Embedded Live Frontend Page */}
                <div className="relative pointer-events-auto">
                  <ProjectShowcaseTemplate
                    projectName={projectName}
                    config={liveConfig}
                    logoSrc={defaultLogo}
                    videoSrc={effectiveVideo}
                    locationVideoSrc={effectiveVideo}
                    brochureImageSrc={brochurePreview || defaultBrochure}
                    brochurePdfHref={brochurePdfLabel ? "#" : ""}
                    bookingPdfHref={bookingPdfLabel ? "#" : ""}
                    mapImageSrc={mapPreview || defaultMap}
                    sectionImages={liveSectionImages}
                    galleryImages={effectiveGallery}
                    overviewParagraphs={effectiveOverview}
                    specificationsParagraphs={effectiveSpecs}
                    locationText={form.locationBenefitsText || ""}
                    rulesText={form.rulesRegulationText || ""}
                    plotIntroText={form.plotIntroText || ""}
                    modalPreviewSrc={defaultBrochure}
                    activeSection={activeSection}
                    onSelectSection={(secId) => handleSelectSectionCard(secId)}
                    isLivePreview={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectCityUpdateForm;
