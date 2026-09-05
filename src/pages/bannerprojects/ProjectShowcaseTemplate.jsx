import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import {
  IoCheckmarkCircle,
  IoCloseOutline,
  IoPlayOutline,
} from "react-icons/io5";
import {
  FaArrowRight,
  FaRegImage,
  FaRoad,
  FaWater,
  FaPlane,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaLeaf,
  FaBuilding,
  FaCity,
} from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getYouTubeEmbedUrl } from "../../components/VideoUtility";
import EnquiryModal from "../../components/EnquiryModal";
import { usePartnerStore } from "../../store/partners/partnersStore";
import { usePlotBookingStore } from "../../store/plotbooking/plotBookingStore";
import { sharedAmenities, sharedSecurityItems } from "./projectShowcaseData";

const displayFont = { fontFamily: '"Montserrat", sans-serif' };
const accentFont = {
  fontFamily: '"Montserrat", sans-serif',
  letterSpacing: "0.16em",
  fontWeight: 700,
};
const bodyFont = { fontFamily: '"Montserrat", sans-serif' };

const hexagonClip =
  "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)";

const cleanText = (text) => (text || "").replace(/\s+/g, " ").trim();

const buildSummary = (paragraphs) => {
  const merged = paragraphs.map(cleanText).filter(Boolean).join(" ");
  if (!merged) return "";
  const words = merged.split(" ");
  return words.length <= 32 ? merged : `${words.slice(0, 32).join(" ")}...`;
};

const compactBullet = (text, maxWords = 18) => {
  const sentence = cleanText(text)
    .replace(/^"+|"+$/g, "")
    .split(/(?<=[.!?])\s+/)[0]
    .trim();

  if (!sentence) return "";

  const words = sentence.split(" ");
  return words.length <= maxWords
    ? sentence
    : `${words.slice(0, maxWords).join(" ")}...`;
};

const buildFeatureItems = (
  specificationsParagraphs,
  locationText,
  rulesText,
) => {
  const items = [
    ...specificationsParagraphs.map((item) => compactBullet(item, 18)),
    ...cleanText(locationText)
      .split(/(?<=[.!?])\s+/)
      .map((item) => compactBullet(item, 16)),
    ...cleanText(rulesText)
      .split(/(?<=[.!?])\s+/)
      .map((item) => compactBullet(item, 16)),
  ].filter(Boolean);

  return items.slice(0, 8);
};

const outlineButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-white/[0.35] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:border-[#f3b128] hover:text-[#f3b128]";

const lightOutlineButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-gray-900 transition duration-300 hover:border-green-600 hover:text-green-700";

const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-[#f3b128] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-[#ffd26d]";

const lightPrimaryButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:bg-green-700";

const formFieldClass =
  "w-full rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-[#f3b128] focus:bg-white/10";

const lightFormFieldClass =
  "w-full rounded-[1.15rem] border border-white/80 bg-white/80 px-4 py-3 text-sm text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_35px_-28px_rgba(22,101,52,0.5)] outline-none ring-1 ring-green-100/70 transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white";

const lightGlossOverlayClass =
  "absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(34,197,94,0.20),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(243,177,40,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(240,253,244,0.78)_58%,rgba(255,255,255,0.92)_100%)]";

function SectionEyebrow({ children, centered = false, tone = "gold" }) {
  const isWhite = tone === "white";
  const isGreen = tone === "green";

  return (
    <div
      className={`flex items-center gap-3 ${
        centered ? "justify-center" : "justify-start"
      }`}
    >
      <span
        className={`text-[0.7rem] font-semibold uppercase sm:text-xs ${
          isWhite ? "text-white" : isGreen ? "text-green-600" : "text-[#f3b128]"
        }`}
        style={accentFont}
      >
        {children}
      </span>
      <span
        className={`h-px w-12 ${
          isWhite
            ? "bg-white/70"
            : isGreen
              ? "bg-green-500/70"
              : "bg-[#f3b128]/70"
        }`}
      />
    </div>
  );
}

function AmbientHexagons({ dense = false }) {
  const hexagons = dense
    ? [
        { top: "3%", left: "-2%", size: 180, opacity: 0.09 },
        { top: "18%", left: "10%", size: 120, opacity: 0.07 },
        { top: "8%", right: "8%", size: 130, opacity: 0.08 },
        { top: "46%", right: "-4%", size: 220, opacity: 0.08 },
        { bottom: "14%", left: "2%", size: 110, opacity: 0.08 },
        { bottom: "4%", right: "18%", size: 160, opacity: 0.05 },
      ]
    : [
        { top: "8%", left: "-1%", size: 190, opacity: 0.08 },
        { top: "26%", left: "12%", size: 110, opacity: 0.05 },
        { top: "12%", right: "-2%", size: 140, opacity: 0.08 },
        { bottom: "8%", left: "18%", size: 130, opacity: 0.05 },
        { bottom: "0%", right: "4%", size: 200, opacity: 0.06 },
      ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hexagons.map((hexagon, index) => (
        <span
          key={`${hexagon.size}-${index}`}
          className="absolute border border-white/10 bg-white/[0.03]"
          style={{
            width: `${hexagon.size}px`,
            height: `${hexagon.size}px`,
            opacity: hexagon.opacity,
            clipPath: hexagonClip,
            boxShadow: "inset 0 0 18px rgba(255,255,255,0.04)",
            ...hexagon,
          }}
        />
      ))}
    </div>
  );
}

function FrameImageSlider({ images, alt, className = "" }) {
  const slides = images.filter(Boolean);

  if (!slides.length) return null;

  if (slides.length === 1) {
    return (
      <img
        src={slides[0]}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className="absolute inset-0 h-full w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full [&_.swiper-slide]:h-full [&_.swiper-wrapper]:h-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`} className="h-full w-full">
            <img
              src={src}
              alt={`${alt} ${index + 1}`}
              className={`h-full w-full object-cover ${className}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function AngledMediaFrame({
  imageSrc,
  imageSlides = [],
  videoSrc,
  alt,
  className = "",
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[640px] px-5 py-7 ${className}`}
    >
      <div className="absolute inset-x-0 top-3 bottom-3 border-y-[4px] border-white/[0.45] [transform:skewX(-10deg)]" />
      <div className="absolute inset-x-10 top-8 bottom-8 border-[3px] border-white/[0.45] [transform:skewX(-10deg)]" />
      <div className="relative overflow-hidden rounded-[0.7rem] bg-black shadow-[0_38px_90px_-50px_rgba(0,0,0,0.95)] [transform:skewX(-8deg)]">
        <div className="[transform:skewX(8deg)] scale-[1.08]">
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[410px]"
            />
          ) : (
            <FrameImageSlider
              images={imageSlides.length ? imageSlides : [imageSrc]}
              alt={alt}
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[410px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CurvedMediaFrame({
  imageSrc,
  imageSlides = [],
  alt,
  children,
  className = "",
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[620px] p-6 ${className}`}>
      <div
        className="absolute inset-0 border-[3px] border-white/[0.45]"
        style={{
          borderRadius: "18% 14% 18% 16% / 14% 20% 16% 22%",
          transform: "rotate(4deg)",
        }}
      />
      <div
        className="absolute inset-4 border-[3px] border-white/[0.35]"
        style={{
          borderRadius: "16% 18% 14% 20% / 18% 12% 20% 14%",
          transform: "rotate(-4deg)",
        }}
      />
      <div
        className="relative overflow-hidden bg-black/30 shadow-[0_38px_90px_-50px_rgba(0,0,0,0.95)]"
        style={{
          borderRadius: "14% 18% 14% 20% / 16% 12% 18% 20%",
        }}
      >
        {children || (
          <FrameImageSlider
            images={imageSlides.length ? imageSlides : [imageSrc]}
            alt={alt}
            className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
          />
        )}
      </div>
    </div>
  );
}

function CircleCluster({ images, altPrefix }) {
  const primary = images[0] || images[1];
  const secondary = images[1] || primary;
  const tertiary = images[2] || secondary;

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[480px] sm:h-[500px]">
      <div className="absolute left-6 top-10 h-[280px] w-[280px] rounded-full border border-white/30 sm:h-[340px] sm:w-[340px]">
        <div className="absolute inset-[-18px] rounded-full border-2 border-dotted border-white/[0.35]" />
        <div className="h-full w-full overflow-hidden rounded-full shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)]">
          <img
            src={primary}
            alt={`${altPrefix} highlight`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="absolute right-8 top-44 h-[130px] w-[130px] overflow-hidden rounded-full border border-white/[0.35] shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)] sm:h-[160px] sm:w-[160px]">
        <img
          src={secondary}
          alt={`${altPrefix} support`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute bottom-8 left-52 h-[80px] w-[80px] overflow-hidden rounded-full border-[3px] border-white/[0.55] shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)] sm:h-[92px] sm:w-[92px]">
        <img
          src={tertiary}
          alt={`${altPrefix} detail`}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="absolute bottom-28 left-12 h-4 w-4 rounded-full bg-red-500" />
    </div>
  );
}

function PartnerLogoCard({ src, alt }) {
  return (
    <div className="rounded-[1.35rem] bg-white/95 p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.85)] ring-1 ring-black/10 backdrop-blur">
      <div className="flex h-24 items-center justify-center rounded-[1rem] bg-white">
        <img src={src} alt={alt} className="max-h-16 w-full object-contain" />
      </div>
    </div>
  );
}

function FeatureCardSection({
  eyebrow,
  title,
  subtitle,
  items,
  columnsClass = "md:grid-cols-4",
}) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,197,94,0.13),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(243,177,40,0.12),transparent_22%),linear-gradient(180deg,#ffffff_0%,#f4fbf3_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center">
          <span
            className="mb-3 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-green-600"
            style={accentFont}
          >
            {eyebrow}
          </span>
          <h2
            className="mt-2 text-center text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
            style={displayFont}
          >
            {title}
          </h2>
          <div className="mt-5 h-0.5 w-16 bg-linear-to-r from-transparent via-green-500 to-transparent" />
          {subtitle && (
            <p
              className="mt-4 max-w-xl text-center text-sm leading-relaxed text-gray-500"
              style={bodyFont}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-2 gap-5 sm:grid-cols-3 ${columnsClass}`}
        >
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative flex min-h-[220px] cursor-default flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-white/80 bg-white/[0.78] p-8 shadow-[0_26px_80px_-54px_rgba(22,101,52,0.58)] ring-1 ring-green-100/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:bg-white/90 hover:shadow-xl hover:shadow-green-100"
              >
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(240,253,244,0.34)_48%,rgba(255,255,255,0.68)_100%)] transition-all duration-500" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl text-green-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-300">
                  <Icon />
                </div>
                <p
                  className="relative text-center text-sm font-semibold leading-snug text-gray-700 transition-colors duration-300 group-hover:text-green-800"
                  style={bodyFont}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcaseTemplate({
  projectName,
  config,
  logoSrc,
  videoSrc,
  locationVideoSrc,
  brochureImageSrc,
  brochurePdfHref,
  bookingPdfHref,
  mapImageSrc,
  galleryImages = [],
  overviewParagraphs = [],
  specificationsParagraphs = [],
  locationText = "",
  rulesText = "",
  plotIntroText = "",
  modalPreviewSrc,
  sectionImages = {},
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState("");
  const [plotTab, setPlotTab] = useState(
    config.plotTabs?.[0]?.key || "residential",
  );
  const [form, setForm] = useState({
    name: "",
    block: "",
    address: "",
    road: "",
    phone: "",
    plotNo: "",
    email: "",
    size: "",
  });

  const { addBooking, isLoading } = usePlotBookingStore();
  const { partners, loadPartners } = usePartnerStore();

  useEffect(() => {
    loadPartners();
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });
  }, [loadPartners]);

  const imagePool = [
    ...galleryImages.filter(Boolean),
    brochureImageSrc,
    modalPreviewSrc,
    mapImageSrc,
    logoSrc,
  ].filter(Boolean);

  const heroSummary =
    buildSummary(overviewParagraphs) || cleanText(locationText);
  const featureItems = buildFeatureItems(
    specificationsParagraphs,
    locationText,
    rulesText,
  );
  const activePlotCards =
    config.plotTabs?.find((tab) => tab.key === plotTab)?.cards ||
    config.plotTabs?.[0]?.cards ||
    [];
  const securityItems = config.securityItems || sharedSecurityItems;
  const amenities = config.amenities || sharedAmenities;
  const partnerItems = Array.isArray(partners) ? partners.slice(0, 8) : [];
  const planPreview =
    brochureImageSrc || modalPreviewSrc || mapImageSrc || imagePool[0];
  const sectionImageUrls = {
    heroImage: sectionImages?.heroImage?.url || "",
    overviewImage: sectionImages?.overviewImage?.url || "",
    locationImage: sectionImages?.locationImage?.url || "",
    featuresImage: sectionImages?.featuresImage?.url || "",
    plotsImage: sectionImages?.plotsImage?.url || "",
    goalsImage: sectionImages?.goalsImage?.url || "",
    partnersImage: sectionImages?.partnersImage?.url || "",
    bookingImage: sectionImages?.bookingImage?.url || "",
  };
  const heroVisual = sectionImageUrls.heroImage || imagePool[1] || imagePool[0];
  const overviewVisual = sectionImageUrls.overviewImage || imagePool[0];
  const locationVisual =
    sectionImageUrls.locationImage || imagePool[1] || imagePool[0];
  const featuresVisual =
    sectionImageUrls.featuresImage || imagePool[2] || imagePool[0];
  const plotsVisual =
    sectionImageUrls.plotsImage || imagePool[1] || imagePool[0];
  const goalsVisual =
    sectionImageUrls.goalsImage || imagePool[3] || imagePool[1] || imagePool[0];
  const partnersVisual =
    sectionImageUrls.partnersImage ||
    imagePool[4] ||
    imagePool[1] ||
    imagePool[0];
  const bookingVisual =
    sectionImageUrls.bookingImage || mapImageSrc || imagePool[0];
  const featuresSlides = [
    sectionImageUrls.featuresImage,
    ...galleryImages.slice(2),
    ...galleryImages,
    featuresVisual,
  ].filter(Boolean);
  const goalsSlides = [
    sectionImageUrls.goalsImage,
    ...galleryImages.slice().reverse(),
    locationVisual,
    mapImageSrc,
  ].filter(Boolean);
  const locationVisuals = [
    sectionImageUrls.locationImage,
    ...galleryImages.slice(0, 4),
    locationVisual,
  ].filter(Boolean);
  const projectGalleryImages = galleryImages.length
    ? galleryImages
    : imagePool.slice(0, 8);
  const formIdPrefix = projectName.toLowerCase().replace(/\s+/g, "-");
  const isLightPage = config.surfaceTone === "light";
  const eyebrowTone = config.eyebrowTone || "gold";
  const plotCardVariant = config.plotCardVariant || "default";
  const headingClass = isLightPage ? "text-gray-950" : "text-white";
  const bodyTextClass = isLightPage ? "text-gray-600" : "text-white/[0.78]";
  const softTextClass = isLightPage ? "text-gray-500" : "text-white/[0.74]";
  const outlineActionClass = isLightPage
    ? lightOutlineButtonClass
    : outlineButtonClass;
  const primaryActionClass = isLightPage
    ? lightPrimaryButtonClass
    : primaryButtonClass;
  const inputClass = isLightPage ? lightFormFieldClass : formFieldClass;
  const fieldLabelClass = isLightPage
    ? "mb-2 block text-sm font-medium text-gray-700"
    : "mb-2 block text-sm font-medium text-white/80";
  const effectiveBrochurePdfHref = brochurePdfHref || bookingPdfHref;
  const brochureButtonClass = `${primaryActionClass} animate-bounce shadow-[0_20px_50px_-25px_rgba(22,101,52,0.8)]`;

  const onPlayVideo = () => {
    setActiveModal(videoSrc ? "video" : "plan");
  };

  const openBrochureModal = () => {
    setIsBrochureModalOpen(true);
  };

  const openGalleryPreview = (image) => {
    setActiveGalleryImage(image);
    setActiveModal("gallery");
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBooking(form);
      toast.success("Booking request submitted successfully!");
      setForm({
        name: "",
        block: "",
        address: "",
        road: "",
        phone: "",
        plotNo: "",
        email: "",
        size: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking request.");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isLightPage ? "bg-white text-gray-950" : "bg-[#050505] text-white"
      }`}
    >
      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : "bg-[#0c0c0d]"
        }`}
      >
        {!isLightPage && <AmbientHexagons dense />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf2_68%,#ffffff_100%)]"
              : "bg-[radial-gradient(circle_at_top,_rgba(243,177,40,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(26,92,53,0.22),transparent_26%),linear-gradient(180deg,#080808_0%,#111214_65%,#090909_100%)]"
          }`}
        />
        {isLightPage && (
          <>
            <img
              src={heroVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.09]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow centered tone={eyebrowTone}>
              {config.heroEyebrow}
            </SectionEyebrow>
            <h1
              className={`mt-6 text-4xl font-semibold leading-none sm:text-5xl lg:text-[4.2rem] ${headingClass}`}
              style={displayFont}
            >
              {config.heroTitle}
            </h1>
            <p
              className={`mx-auto mt-5 max-w-3xl text-sm leading-7 sm:text-base ${softTextClass}`}
              style={bodyFont}
            >
              {heroSummary}
            </p>
          </div>

          {/* ── PROJECT OVERVIEW (With Modern Video Showcase) ── */}
          <div className="mt-16 grid items-center gap-12 lg:gap-16 lg:grid-cols-[1fr_1fr]">
            <div data-aos="fade-up" className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0f7771]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0f7771]">
                <span className="h-2 w-2 rounded-full bg-[#0f7771]" />
                PROJECT OVERVIEW
              </div>
              <h2
                className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight ${headingClass}`}
                style={displayFont}
              >
                Project Overview
              </h2>
              <div className="mt-5 space-y-4">
                {overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className={`text-sm leading-relaxed sm:text-base ${bodyTextClass} font-light`}
                    style={bodyFont}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Highlights Micro-Cards */}
              <div
                className={`mt-7 grid grid-cols-3 gap-3 rounded-2xl p-4 border ${
                  isLightPage
                    ? "border-emerald-100 bg-emerald-50/50"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#0f7771]">
                    600+
                  </p>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wider ${softTextClass}`}
                  >
                    Acres Township
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#0f7771]">
                    2021
                  </p>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wider ${softTextClass}`}
                  >
                    Est. Inception
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#0f7771]">
                    RAJUK
                  </p>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wider ${softTextClass}`}
                  >
                    Aligned Layout
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("plan")}
                  className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#0f7771] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0f7771] transition-all duration-300 hover:bg-[#0f7771] hover:text-white hover:shadow-lg"
                  style={accentFont}
                >
                  <FaRegImage size={14} />
                  Master Plan
                </button>
                {effectiveBrochurePdfHref && (
                  <button
                    type="button"
                    onClick={openBrochureModal}
                    className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0f7771] to-[#149990] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_-5px_rgba(15,119,113,0.4)] transition-all duration-300 hover:scale-105 hover:from-[#0a5e5a] hover:to-[#0f7771]"
                    style={accentFont}
                  >
                    <MdDownload className="text-base" />
                    Download Brochure
                  </button>
                )}
              </div>
            </div>

            {/* Right: Modern Project Overview Video Player Card */}
            <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[500px]">
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#0f7771]/25 via-[#f3b128]/15 to-transparent blur-2xl opacity-70" />
              <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_25px_60px_-15px_rgba(15,119,113,0.35)] ring-1 ring-slate-900/10">
                <div className="relative aspect-square w-full overflow-hidden bg-black flex items-center justify-center">
                  {videoSrc ? (
                    getYouTubeEmbedUrl(videoSrc) ? (
                      <iframe
                        src={`${getYouTubeEmbedUrl(videoSrc)}?autoplay=1&mute=1&loop=1&controls=0`}
                        title={`${projectName} overview video`}
                        className="absolute inset-0 h-full w-full pointer-events-none"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )
                  ) : (
                    <FrameImageSlider
                      images={
                        galleryImages.length
                          ? galleryImages.slice(0, 4)
                          : [overviewVisual]
                      }
                      alt={`${projectName} overview`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION & CONNECTIVITY SECTION (Media & Route Cards on Left, Strategic Details on Right) ── */}
      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage
            ? "bg-gradient-to-b from-[#f8fcf9] via-white to-[#f4faf6] border-y border-emerald-100/70"
            : "bg-[#0b0b0c]"
        }`}
      >
        {!isLightPage && (
          <>
            <img
              src={locationVisual}
              alt={`${projectName} location`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,8,0.85)_0%,rgba(9,13,8,0.72)_35%,rgba(9,13,8,0.76)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(243,177,40,0.14),transparent_20%)]" />
          </>
        )}
        {isLightPage && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(15,119,113,0.08),transparent)]" />
        )}

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:gap-14 px-4 py-20 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center lg:px-8">
          {/* Left Column: Location Video Player on Top + 4 Connectivity Cards Underneath */}
          <div className="flex flex-col gap-3.5">
            {/* Location Video Player Frame */}
            <div className="relative mx-auto w-full">
              <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#0f7771]/20 via-[#f3b128]/15 to-transparent blur-xl opacity-60" />
              <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200/90 bg-black shadow-lg ring-1 ring-slate-900/10">
                <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                  {locationVideoSrc || "/videos/projectVideo.mp4" ? (
                    getYouTubeEmbedUrl(locationVideoSrc || "") ? (
                      <iframe
                        src={`${getYouTubeEmbedUrl(locationVideoSrc)}?autoplay=1&mute=1&loop=1&controls=0`}
                        title={`${projectName} location tour`}
                        className="absolute inset-0 h-full w-full pointer-events-none"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={locationVideoSrc || "/videos/projectVideo.mp4"}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )
                  ) : (
                    <FrameImageSlider
                      images={
                        locationVisuals.length
                          ? locationVisuals
                          : [locationVisual]
                      }
                      alt={`${projectName} location`}
                      className="h-full w-full object-cover"
                    />
                  )}

                  {/* Top Floating Badge on Video */}
                  <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-3 py-1 backdrop-blur-md text-white shadow-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                      Location Video Tour
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Structured Connectivity Route Cards Under Video */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="grid sm:grid-cols-2 gap-3"
            >
              <div className="rounded-xl border border-emerald-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#0f7771]/50 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0f7771]/10 text-[#0f7771] flex items-center justify-center shrink-0">
                    <FaPlane size={13} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Airport & 300ft Road
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-normal">
                  Closest reach from Shahjalal Int'l Airport via Kuril Flyover &
                  Kanchan Bridge.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#0f7771]/50 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0f7771]/10 text-[#0f7771] flex items-center justify-center shrink-0">
                    <FaRoad size={13} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Madani Ave / US Embassy
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-normal">
                  From Natun Bazar opposite US Embassy, passing Gazi Bridge to
                  Dhaka-Sylhet Hwy.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#0f7771]/50 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0f7771]/10 text-[#0f7771] flex items-center justify-center shrink-0">
                    <FaShieldAlt size={13} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Opp. Jolshiri Abason-2
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-normal">
                  Eastern side of Shitalakhya River, opposite Army Housing
                  Jolshiri Abason-2.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#0f7771]/50 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0f7771]/10 text-[#0f7771] flex items-center justify-center shrink-0">
                    <FaWater size={13} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Rampura & Banasree
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-normal">
                  Seamlessly connected through Aftab Nagar, Rampura & Banasree
                  access road.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Location Narrative & Highlights */}
          <div className="flex flex-col justify-center lg:pl-3">
            <SectionEyebrow tone={eyebrowTone}>
              {config.locationEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-2 text-2xl sm:text-3xl lg:text-[2.2rem] font-bold tracking-tight leading-snug sm:leading-tight ${headingClass}`}
              style={displayFont}
            >
              {config.locationTitle}
            </h2>

            <p
              className={`mt-3 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 font-normal`}
              style={bodyFont}
            >
              {locationText}
            </p>

            {/* Strategic Advantage Highlight Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-[#0f7771]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f7771]" />
                River Shitalakhya Frontage
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-[#0f7771]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f7771]" />
                Purbachal 300ft Expressway Link
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-[#0f7771]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f7771]" />
                Opposite Army Housing-2
              </span>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={
                  config.directionUrl ||
                  "https://www.google.com/maps/search/?api=1&query=North+South+Green+City+Bhulta+Gausia"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0f7771] to-[#149990] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-5px_rgba(15,119,113,0.4)] transition-all duration-300 hover:scale-105 hover:from-[#0a5e5a] hover:to-[#0f7771]"
                style={accentFont}
              >
                <FaMapMarkerAlt size={12} />
                <span>Get Directions on Google Maps</span>
                <FaExternalLinkAlt size={9} className="ml-1 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setActiveModal("plan")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0f7771] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f7771] transition-all duration-300 hover:bg-[#0f7771] hover:text-white"
                style={accentFont}
              >
                <FaRegImage size={12} />
                <span>View Map Plan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION (Elegant 2-Column: Left Text, Right Slider) ── */}
      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-[#f8fdf9]" : "bg-[#0b0b0c]"
        }`}
      >
        {!isLightPage && <AmbientHexagons dense />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(15,119,113,0.06),transparent),radial-gradient(ellipse_60%_50%_at_90%_80%,rgba(243,177,40,0.06),transparent),linear-gradient(180deg,#fcfefc_0%,#f4fbf5_100%)]"
              : "bg-[linear-gradient(180deg,#0d0d0e_0%,#131315_100%)]"
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div
            data-aos="fade-up"
            className="mx-auto max-w-3xl text-center mb-14"
          >
            <SectionEyebrow centered tone={eyebrowTone}>
              {config.featuresEyebrow || "WHY GREEN CITY STANDS OUT"}
            </SectionEyebrow>
            <h2
              className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.featuresTitle || "Features of North South Green City"}
            </h2>
            <p
              className={`mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed ${softTextClass} font-light`}
              style={bodyFont}
            >
              Engineered for sustainable living, combining RAJUK compliance,
              lush green landscapes, and modern civic infrastructure in a
              self-sufficient township.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            {/* Left: Elegant Feature List */}
            <div className="flex flex-col gap-8">
              {[
                {
                  title: "RAJUK Compliance",
                  desc:
                    specificationsParagraphs[0] ||
                    "Developed strictly according to East Bengal Building Construction Act 1952 and RAJUK guidelines for organized urbanization.",
                  icon: FaShieldAlt,
                },
                {
                  title: "Scenic Lake & Greenery",
                  desc:
                    specificationsParagraphs[1] ||
                    "Expansive lakefront perimeter, sprawling recreational parks, playgrounds, and tree-lined walkways create a serene natural ecosystem.",
                  icon: FaWater,
                },
                {
                  title: "Internal Road Network",
                  desc: "Spacious 40' to 100' wide asphalt avenues, dedicated walkways, underground utility corridors, and modern stormwater drainage systems.",
                  icon: FaRoad,
                },
                {
                  title: "Civic & Social Amenities",
                  desc:
                    specificationsParagraphs[2] ||
                    "Designated zones for educational institutions, healthcare clinics, central mosques, community centers, and commercial retail hubs.",
                  icon: FaBuilding,
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-start gap-5 transition-transform duration-300 hover:translate-x-2"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isLightPage
                          ? "border-emerald-100 bg-emerald-50 text-[#0f7771] shadow-sm group-hover:bg-[#0f7771] group-hover:text-white group-hover:shadow-md"
                          : "border-white/10 bg-white/5 text-[#f3b128] group-hover:bg-[#f3b128] group-hover:text-black"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4
                        className={`text-lg sm:text-xl font-bold transition-colors ${
                          isLightPage
                            ? "text-slate-900 group-hover:text-[#0f7771]"
                            : "text-white group-hover:text-[#f3b128]"
                        }`}
                        style={displayFont}
                      >
                        {feature.title}
                      </h4>
                      <p
                        className={`mt-2 text-sm leading-relaxed font-normal ${
                          isLightPage ? "text-slate-600" : "text-slate-300/80"
                        }`}
                        style={bodyFont}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Modern Architectural Image Showcase Frame */}
            <div className="relative mx-auto w-full max-w-[500px]">
              {/* Background glowing glow */}
              <div
                className={`pointer-events-none absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-60 ${isLightPage ? "bg-gradient-to-tr from-[#0f7771]/20 via-emerald-400/10 to-transparent" : "bg-gradient-to-tr from-[#f3b128]/20 via-white/5 to-transparent"}`}
              />

              <div
                className={`relative overflow-hidden rounded-[2rem] border-4 ${isLightPage ? "border-white bg-white shadow-[0_20px_50px_-15px_rgba(15,119,113,0.25)]" : "border-white/10 bg-[#0a0a0b] shadow-[0_20px_50px_-15px_rgba(243,177,40,0.15)]"}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
                  <FrameImageSlider
                    images={
                      featuresSlides.length ? featuresSlides : [featuresVisual]
                    }
                    alt={`${projectName} features`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Top Floating Badge */}
                  <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
                    <span
                      className={`h-2 w-2 rounded-full animate-pulse ${isLightPage ? "bg-emerald-400" : "bg-[#f3b128]"}`}
                    />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                      Project Showcase
                    </span>
                  </div>

                  {/* Bottom Floating Info Card */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                    <div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${isLightPage ? "text-emerald-400" : "text-[#f3b128]"}`}
                      >
                        Sustainable Design
                      </p>
                      <h4 className="mt-1 text-sm sm:text-base font-bold text-white">
                        {projectName}
                      </h4>
                    </div>

                    {effectiveBrochurePdfHref && (
                      <button
                        type="button"
                        onClick={openBrochureModal}
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform hover:scale-105 ${isLightPage ? "bg-[#0f7771] text-white" : "bg-[#f3b128] text-black"}`}
                        title="Download Brochure"
                      >
                        <MdDownload size={22} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : ""
        }`}
      >
        {!isLightPage && (
          <>
            <img
              src={plotsVisual}
              alt={`${projectName} available plots`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,10,0.82)_0%,rgba(12,17,10,0.72)_100%)]" />
          </>
        )}
        {isLightPage && (
          <>
            <img
              src={plotsVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.10]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow centered tone={eyebrowTone}>
              {config.plotsEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-5 text-4xl font-semibold sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.plotsTitle}
            </h2>
            <p
              className={`mx-auto mt-4 max-w-3xl text-sm leading-7 sm:text-base ${softTextClass}`}
              style={bodyFont}
            >
              {plotIntroText ||
                "The master plan keeps residential, commercial, and support zones in balance so the project can grow in a more organized way."}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {config.plotTabs?.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setPlotTab(tab.key)}
                  className={`rounded-full border px-6 py-3 text-sm transition ${
                    plotTab === tab.key
                      ? isLightPage
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-[#f3b128] bg-black/[0.65] text-white"
                      : isLightPage
                        ? "border-gray-300 bg-white text-gray-600 hover:border-green-500 hover:text-green-700"
                        : "border-white/[0.35] bg-white/[0.06] text-white/75 hover:border-white/60 hover:text-white"
                  }`}
                  style={bodyFont}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <CircleCluster
              images={[plotsVisual, overviewVisual, featuresVisual]}
              altPrefix={projectName}
            />

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="grid gap-5 md:grid-cols-2"
            >
              {activePlotCards.map((card) => {
                const Icon = card.icon;
                const isFeatureVariant = plotCardVariant === "feature";

                return (
                  <div
                    key={card.title}
                    className={
                      isFeatureVariant
                        ? "group relative flex min-h-[240px] cursor-default flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-white/80 bg-white/[0.78] p-7 text-center shadow-[0_26px_80px_-50px_rgba(22,101,52,0.58)] ring-1 ring-green-100/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:bg-white/90 hover:shadow-xl hover:shadow-green-100"
                        : "rounded-[1.8rem] bg-black/[0.55] p-7 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur"
                    }
                  >
                    {isFeatureVariant && (
                      <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(240,253,244,0.44)_48%,rgba(255,255,255,0.72)_100%)] transition-all duration-500 group-hover:from-green-50/80 group-hover:to-green-100/40" />
                    )}
                    <div
                      className={
                        isFeatureVariant
                          ? "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl text-green-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-300"
                          : "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/70 text-2xl text-[#9ae6b4]"
                      }
                    >
                      <Icon />
                    </div>
                    <h3
                      className={
                        isFeatureVariant
                          ? "relative text-2xl font-semibold leading-tight text-gray-900"
                          : "text-3xl font-semibold leading-none text-white"
                      }
                      style={displayFont}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={
                        isFeatureVariant
                          ? "relative text-sm leading-7 text-gray-500"
                          : "mt-4 text-sm leading-7 text-white/[0.78]"
                      }
                      style={bodyFont}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── GOALS SECTION (Premium Visual Grid) ── */}
      <section
        data-aos="fade-up"
        className={`relative isolate ${
          isLightPage ? "bg-[#f6faf5]" : "bg-[#0b0b0c]"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {!isLightPage && <AmbientHexagons />}
          <div
            className={`absolute inset-0 ${
              isLightPage
                ? "bg-[linear-gradient(180deg,#ffffff_0%,#eef9ef_100%)]"
                : "bg-[linear-gradient(180deg,#0d0d0f_0%,#111114_100%)]"
            }`}
          />
          {isLightPage && (
            <>
              <img
                src={goalsVisual}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.03]"
              />
              <div className={lightGlossOverlayClass} />
            </>
          )}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            {/* Header Content */}
            <div className="max-w-xl lg:sticky lg:top-36 lg:pb-12">
              <SectionEyebrow tone={eyebrowTone}>
                {config.goalsEyebrow || "A DESTINATION WORTH LIVING"}
              </SectionEyebrow>
              <h2
                className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl ${headingClass}`}
                style={displayFont}
              >
                {config.goalsTitle || "Goals of North South Green City"}
              </h2>
              <p
                className={`mt-6 text-sm leading-relaxed sm:text-base font-medium ${softTextClass}`}
                style={bodyFont}
              >
                Our core vision is driven by sustainability, community
                well-being, and structured urbanization. Every aspect of the
                project is engineered to provide a balanced, high-quality
                residential lifestyle that respects nature while embracing
                modern living standards.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div
                  className={`h-px flex-1 ${isLightPage ? "bg-emerald-200" : "bg-white/10"}`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${isLightPage ? "text-[#0f7771]" : "text-[#f3b128]"}`}
                >
                  Vision & Mission
                </span>
              </div>
            </div>

            {/* Visual Goals Grid */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {config.goals?.map((goal, idx) => {
                const total = config.goals.length;
                const isLastOdd = total % 2 !== 0 && idx === total - 1;
                const isFirstOf3 = total === 3 && idx === 0;
                const spanClass =
                  isLastOdd || isFirstOf3
                    ? "sm:col-span-2 sm:aspect-[24/10] lg:aspect-[24/9]"
                    : "aspect-[4/3] sm:aspect-[4/5]";

                const bgImage = goalsSlides[idx % goalsSlides.length];

                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${isLightPage ? "hover:shadow-[#0f7771]/20 border border-emerald-50" : "hover:shadow-[#f3b128]/10 border border-white/5"} ${spanClass}`}
                  >
                    {/* Background Image */}
                    <img
                      src={bgImage}
                      alt={`Goal ${idx + 1}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Dark Gradients for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-95" />

                    {/* Number Badge */}
                    <div className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/20">
                      <span
                        className={`text-sm font-bold ${isLightPage ? "text-emerald-400" : "text-[#f3b128]"}`}
                      >
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md ${isLightPage ? "bg-[#0f7771] text-white" : "bg-[#f3b128] text-black"}`}
                        >
                          <IoCheckmarkCircle size={18} />
                        </div>
                        <p className="text-sm sm:text-base font-semibold leading-relaxed text-white drop-shadow-md">
                          {goal}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-[#f8fdf9]" : "bg-[#080809]"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf2_100%)]"
              : "bg-[linear-gradient(180deg,#070708_0%,#101114_100%)]"
          }`}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <SectionEyebrow centered tone={eyebrowTone}>
              PROJECT GALLERY
            </SectionEyebrow>
            <h2
              className={`mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl ${headingClass}`}
              style={displayFont}
            >
              Visual Tour of {projectName}
            </h2>
          </div>

          {/* Fixed Size 4-Column Grid */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {projectGalleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => openGalleryPreview(image)}
                className={`group relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl text-left ${
                  isLightPage
                    ? "ring-1 ring-black/5"
                    : "bg-black/50 ring-1 ring-white/10"
                }`}
                aria-label={`Open ${projectName} gallery image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${projectName} gallery ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Hover Reveal: Glass Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xl transform scale-50 transition-transform duration-500 group-hover:scale-100">
                    <FaRegImage size={18} />
                  </div>
                </div>

                {/* Bottom Text Info on Hover */}
                <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-serif text-lg text-white leading-snug drop-shadow-md">
                    {projectName} View {index + 1}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : "bg-[#080809]"
        }`}
      >
        {!isLightPage && <AmbientHexagons dense />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(90deg,#eef9ef_0%,#eef9ef_50%,#ffffff_50%,#ffffff_100%)]"
              : "bg-[linear-gradient(90deg,#f4f2ec_0%,#f4f2ec_50%,#101114_50%,#101114_100%)]"
          }`}
        />
        <div className="relative mx-auto grid max-w-7xl gap-0 px-0 py-0 lg:grid-cols-[1fr_0.95fr]">
          <div
            className={`px-4 py-16 sm:px-6 lg:px-10 ${
              isLightPage ? "bg-[#eef9ef]" : "bg-[#f4f2ec]"
            }`}
          >
            <div className="mx-auto flex h-full max-w-2xl items-center justify-center rounded-[2rem] border border-white/80 bg-white/[0.82] p-4 shadow-[0_30px_90px_-52px_rgba(22,101,52,0.65)] ring-1 ring-green-100/80 backdrop-blur-xl">
              <img
                src={mapImageSrc}
                alt={`${projectName} map`}
                className="w-full object-contain"
              />
            </div>
          </div>

          <div
            className={`px-4 py-16 sm:px-6 lg:px-10 ${
              isLightPage ? "bg-white/90 backdrop-blur-xl" : "bg-[#101114]"
            }`}
          >
            <SectionEyebrow tone={eyebrowTone}>
              {config.mapEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-4 text-4xl font-semibold sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.mapTitle}
            </h2>
            <p
              className={`mt-5 text-sm leading-8 sm:text-base ${softTextClass}`}
              style={bodyFont}
            >
              {locationText}
            </p>

            <div className="mt-8 space-y-5">
              {config.locationHighlights?.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                      <Icon />
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-semibold ${headingClass}`}
                        style={displayFont}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`mt-1 text-sm ${softTextClass}`}
                        style={bodyFont}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <a
                href={config.directionUrl}
                target="_blank"
                rel="noreferrer"
                className={outlineActionClass}
                style={accentFont}
              >
                Get Direction <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeatureCardSection
        eyebrow={config.securityEyebrow}
        title={config.securityTitle}
        subtitle="Secure, organized systems designed around modern township living."
        items={securityItems}
        columnsClass="md:grid-cols-3"
      />

      <FeatureCardSection
        eyebrow={config.amenitiesEyebrow}
        title={config.amenitiesTitle}
        subtitle="Experience world-class facilities designed for modern living."
        items={amenities}
      />

      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : ""
        }`}
      >
        {!isLightPage && (
          <>
            <img
              src={partnersVisual}
              alt={`${projectName} partners`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,6,0.7)_0%,rgba(3,4,6,0.76)_100%)] backdrop-blur-[2px]" />
          </>
        )}
        {isLightPage && (
          <>
            <img
              src={partnersVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.10]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="mx-auto max-w-3xl text-center">
            <SectionEyebrow centered tone={eyebrowTone}>
              {config.partnersEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-5 text-4xl font-semibold sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.partnersTitle}
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerItems.length > 0
              ? partnerItems.map((partner) => (
                  <PartnerLogoCard
                    key={partner._id}
                    src={partner.partnersImage}
                    alt={`${projectName} partner`}
                  />
                ))
              : imagePool
                  .slice(0, 4)
                  .map((image, index) => (
                    <PartnerLogoCard
                      key={`${projectName}-fallback-${index}`}
                      src={image}
                      alt={`${projectName} showcase ${index + 1}`}
                    />
                  ))}
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-[#f6faf5]" : "bg-[#080809]"
        }`}
      >
        {!isLightPage && <AmbientHexagons dense />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(180deg,#eef9ef_0%,#ffffff_100%)]"
              : "bg-[radial-gradient(circle_at_top_left,_rgba(243,177,40,0.14),transparent_20%),linear-gradient(180deg,#0c0c0d_0%,#070708_100%)]"
          }`}
        />
        {isLightPage && bookingVisual && (
          <>
            <img
              src={bookingVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start"
          >
            <div
              className={`rounded-[2rem] p-6 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.35)] ${
                isLightPage
                  ? "border border-white/80 bg-white/[0.78] ring-1 ring-green-100/80 backdrop-blur-xl"
                  : "border border-white/10 bg-white/5 backdrop-blur"
              }`}
            >
              <SectionEyebrow tone={eyebrowTone}>
                {config.bookingEyebrow}
              </SectionEyebrow>
              <h2
                className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingClass}`}
                style={displayFont}
              >
                {config.bookingTitle}
              </h2>
              <p
                className={`mt-4 text-sm leading-8 sm:text-base ${softTextClass}`}
                style={bodyFont}
              >
                {config.bookingSubtitle}
              </p>

              <div
                className={`mt-8 overflow-hidden rounded-[1.5rem] border ${
                  isLightPage
                    ? "border-white/80 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-green-100/70 backdrop-blur"
                    : "border-white/10 bg-black/25"
                }`}
              >
                {mapImageSrc ? (
                  <img
                    src={mapImageSrc}
                    alt={`${projectName} master plan`}
                    className="w-full object-contain"
                  />
                ) : (
                  <div
                    className={`flex min-h-[320px] items-center justify-center ${
                      isLightPage ? "text-gray-400" : "text-white/60"
                    }`}
                  >
                    <FaRegImage className="text-4xl" />
                  </div>
                )}
              </div>

              <p
                className={`mt-6 text-center text-sm leading-7 ${softTextClass}`}
                style={bodyFont}
              >
                Download the project brochure for complete details.
              </p>

              <div className="mt-5 flex justify-center">
                {effectiveBrochurePdfHref && (
                  <button
                    type="button"
                    onClick={openBrochureModal}
                    className={brochureButtonClass}
                    style={accentFont}
                  >
                    <MdDownload className="text-base" />
                    Download Brochure PDF
                  </button>
                )}
              </div>
            </div>

            <div
              className={`rounded-[2rem] p-6 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.35)] sm:p-8 ${
                isLightPage
                  ? "border border-white/80 bg-white/[0.78] ring-1 ring-green-100/80 backdrop-blur-xl"
                  : "border border-white/10 bg-white/5 backdrop-blur"
              }`}
            >
              <h3
                className={`text-4xl font-semibold sm:text-5xl ${headingClass}`}
                style={displayFont}
              >
                Plot Booking
              </h3>
              <p
                className={`mt-4 text-sm leading-8 sm:text-base ${softTextClass}`}
                style={bodyFont}
              >
                Send us your preferred block, contact details, and plot size so
                our team can follow up with the next steps quickly.
              </p>

              <form onSubmit={handleBookingSubmit} className="mt-8 space-y-5">
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="grid gap-5 md:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-name`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Name*
                    </label>
                    <input
                      id={`${formIdPrefix}-name`}
                      name="name"
                      value={form.name}
                      onChange={onFormChange}
                      placeholder="Full name"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-block`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Block*
                    </label>
                    <select
                      id={`${formIdPrefix}-block`}
                      name="block"
                      value={form.block}
                      onChange={onFormChange}
                      className={inputClass}
                      required
                    >
                      <option value="" className="bg-slate-900">
                        Select block
                      </option>
                      <option value="A" className="bg-slate-900">
                        A
                      </option>
                      <option value="B" className="bg-slate-900">
                        B
                      </option>
                      <option value="C" className="bg-slate-900">
                        C
                      </option>
                      <option value="D" className="bg-slate-900">
                        D
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="grid gap-5 md:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-address`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Address*
                    </label>
                    <input
                      id={`${formIdPrefix}-address`}
                      name="address"
                      value={form.address}
                      onChange={onFormChange}
                      placeholder="Current address"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-road`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Road
                    </label>
                    <input
                      id={`${formIdPrefix}-road`}
                      name="road"
                      value={form.road}
                      onChange={onFormChange}
                      placeholder="Road / area"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="grid gap-5 md:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-phone`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Phone*
                    </label>
                    <input
                      id={`${formIdPrefix}-phone`}
                      name="phone"
                      value={form.phone}
                      onChange={onFormChange}
                      placeholder="Phone number"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-plot`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Plot No
                    </label>
                    <input
                      id={`${formIdPrefix}-plot`}
                      name="plotNo"
                      value={form.plotNo}
                      onChange={onFormChange}
                      placeholder="Preferred plot no"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="grid gap-5 md:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-email`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Email*
                    </label>
                    <input
                      id={`${formIdPrefix}-email`}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onFormChange}
                      placeholder="Email address"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${formIdPrefix}-size`}
                      className={fieldLabelClass}
                      style={bodyFont}
                    >
                      Size (Katha)*
                    </label>
                    <input
                      id={`${formIdPrefix}-size`}
                      type="number"
                      name="size"
                      value={form.size}
                      onChange={onFormChange}
                      placeholder="Required size"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-2 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                    isLightPage
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-[#f3b128] text-black hover:bg-[#ffd26d]"
                  }`}
                  style={accentFont}
                >
                  {isLoading ? "Submitting..." : "Submit Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        projectTitle={projectName}
        brochureUrl={effectiveBrochurePdfHref}
      />

      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#0b0b0d] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.55] text-white transition hover:bg-black"
              aria-label="Close preview"
            >
              <IoCloseOutline size={28} />
            </button>

            {activeModal === "video" && videoSrc ? (
              getYouTubeEmbedUrl(videoSrc) ? (
                <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
                  <iframe
                    className="h-full w-full"
                    src={getYouTubeEmbedUrl(videoSrc)}
                    title={`${projectName} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    className="max-h-[85vh] w-full bg-black object-contain"
                  />
                </div>
              )
            ) : activeModal === "gallery" && activeGalleryImage ? (
              <img
                src={activeGalleryImage}
                alt={`${projectName} gallery preview`}
                className="max-h-[92vh] w-full object-contain"
              />
            ) : (
              <img
                src={planPreview}
                alt={`${projectName} preview`}
                className="max-h-[92vh] w-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectShowcaseTemplate;
