import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IoCheckmarkCircle,
  IoCloseOutline,
  IoPlayOutline,
} from "react-icons/io5";
import { FaArrowRight, FaRegImage } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import EnquiryModal from "../../components/EnquiryModal";
import { usePartnerStore } from "../../store/partners/partnersStore";
import { usePlotBookingStore } from "../../store/plotbooking/plotBookingStore";
import {
  sharedAmenities,
  sharedSecurityItems,
} from "./projectShowcaseData";

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

const buildFeatureItems = (specificationsParagraphs, locationText, rulesText) => {
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
          isWhite ? "bg-white/70" : isGreen ? "bg-green-500/70" : "bg-[#f3b128]/70"
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
    return <img src={slides[0]} alt={alt} className={className} />;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 2800, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-full w-full"
    >
      {slides.map((src, index) => (
        <SwiperSlide key={`${src}-${index}`}>
          <img src={src} alt={`${alt} ${index + 1}`} className={className} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function AngledMediaFrame({ imageSrc, imageSlides = [], videoSrc, alt, className = "" }) {
  return (
    <div className={`relative mx-auto w-full max-w-[640px] px-5 py-7 ${className}`}>
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

function CurvedMediaFrame({ imageSrc, imageSlides = [], alt, children, className = "" }) {
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
        <img
          src={src}
          alt={alt}
          className="max-h-16 w-full object-contain"
        />
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

        <div className={`grid grid-cols-2 gap-5 sm:grid-cols-3 ${columnsClass}`}>
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
  const [plotTab, setPlotTab] = useState(config.plotTabs?.[0]?.key || "residential");
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
  }, [loadPartners]);

  const imagePool = [
    ...galleryImages.filter(Boolean),
    brochureImageSrc,
    modalPreviewSrc,
    mapImageSrc,
    logoSrc,
  ].filter(Boolean);

  const heroSummary = buildSummary(overviewParagraphs) || cleanText(locationText);
  const featureItems = buildFeatureItems(
    specificationsParagraphs,
    locationText,
    rulesText
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
  const locationVisual = sectionImageUrls.locationImage || imagePool[1] || imagePool[0];
  const featuresVisual = sectionImageUrls.featuresImage || imagePool[2] || imagePool[0];
  const plotsVisual = sectionImageUrls.plotsImage || imagePool[1] || imagePool[0];
  const goalsVisual = sectionImageUrls.goalsImage || imagePool[3] || imagePool[1] || imagePool[0];
  const partnersVisual = sectionImageUrls.partnersImage || imagePool[4] || imagePool[1] || imagePool[0];
  const bookingVisual = sectionImageUrls.bookingImage || mapImageSrc || imagePool[0];
  const featuresSlides = [
    sectionImageUrls.featuresImage,
    ...galleryImages,
    overviewVisual,
    brochureImageSrc,
  ].filter(Boolean);
  const goalsSlides = [
    sectionImageUrls.goalsImage,
    ...galleryImages.slice().reverse(),
    locationVisual,
    mapImageSrc,
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
      className={`overflow-hidden ${
        isLightPage ? "bg-white text-gray-950" : "bg-[#050505] text-white"
      }`}
    >
      <section
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
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
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

          <div className="mt-16 grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="max-w-xl">
              <h2
                className={`text-4xl font-semibold sm:text-5xl ${headingClass}`}
                style={displayFont}
              >
                Project Overview
              </h2>
              <div className="mt-6 space-y-5">
                {overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className={`text-sm leading-8 sm:text-base ${bodyTextClass}`}
                    style={bodyFont}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("plan")}
                  className={outlineActionClass}
                  style={accentFont}
                >
                  Master Plan
                </button>
                {effectiveBrochurePdfHref && (
                  <button
                    type="button"
                    onClick={openBrochureModal}
                    className={primaryActionClass}
                    style={accentFont}
                  >
                    <MdDownload className="text-base" />
                    Download Brochure
                  </button>
                )}
              </div>
            </div>

            <AngledMediaFrame
              imageSrc={overviewVisual}
              videoSrc={videoSrc}
              alt={`${projectName} overview`}
            />
          </div>
        </div>
      </section>

      <section
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : ""
        }`}
      >
        {!isLightPage && (
          <>
            <img
              src={locationVisual}
              alt={`${projectName} location`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,8,0.82)_0%,rgba(9,13,8,0.72)_35%,rgba(9,13,8,0.74)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(243,177,40,0.14),transparent_20%)]" />
          </>
        )}
        {isLightPage && (
          <>
            <img
              src={locationVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[1fr_0.95fr] md:items-center lg:px-8">
          <CurvedMediaFrame>
            <div className="relative h-[260px] overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06))] sm:h-[320px] lg:h-[380px]">
              <img
                src={locationVisual}
                alt={`${projectName} presentation`}
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
                <img
                  src={logoSrc}
                  alt={`${projectName} logo`}
                  className="max-h-24 w-auto object-contain sm:max-h-32"
                />
                <button
                  type="button"
                  onClick={onPlayVideo}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-black/[0.35] text-white transition hover:scale-105 hover:border-[#f3b128] hover:text-[#f3b128]"
                  aria-label={`Play ${projectName} video`}
                >
                  <IoPlayOutline size={34} />
                </button>
              </div>
            </div>
          </CurvedMediaFrame>

          <div className="max-w-xl md:pl-2">
            <SectionEyebrow tone={eyebrowTone}>
              {config.locationEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.locationTitle}
            </h2>
            <p
              className={`mt-6 text-sm leading-8 sm:text-base ${bodyTextClass}`}
              style={bodyFont}
            >
              {locationText}
            </p>
          </div>
        </div>
      </section>

      <section
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-[#f6faf5]" : "bg-[#0b0b0c]"
        }`}
      >
        {!isLightPage && <AmbientHexagons dense />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(180deg,#eef9ef_0%,#ffffff_100%)]"
              : "bg-[linear-gradient(180deg,#0d0d0e_0%,#131315_100%)]"
          }`}
        />
        {isLightPage && (
          <>
            <img
              src={featuresVisual}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:px-8">
          <div className="max-w-xl">
            <SectionEyebrow tone={eyebrowTone}>
              {config.featuresEyebrow}
            </SectionEyebrow>
            <h2
              className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.featuresTitle}
            </h2>
            <div className="mt-7 space-y-4">
              {featureItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <IoCheckmarkCircle className="mt-1 shrink-0 text-2xl text-emerald-400" />
                  <p
                    className={`text-sm leading-7 sm:text-base ${bodyTextClass}`}
                    style={bodyFont}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {effectiveBrochurePdfHref && (
                <button
                  type="button"
                  onClick={openBrochureModal}
                  className={outlineActionClass}
                  style={accentFont}
                >
                  <MdDownload className="text-base" />
                  Download Brochure
                </button>
              )}
            </div>
          </div>

          <AngledMediaFrame
            imageSrc={featuresVisual}
            imageSlides={featuresSlides}
            alt={`${projectName} features`}
          />
        </div>
      </section>

      <section
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

            <div className="grid gap-5 md:grid-cols-2">
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

      <section
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-[#f6faf5]" : "bg-[#0b0b0c]"
        }`}
      >
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
              className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
            />
            <div className={lightGlossOverlayClass} />
          </>
        )}
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:px-8">
          <div className="max-w-xl">
            <SectionEyebrow tone={eyebrowTone}>{config.goalsEyebrow}</SectionEyebrow>
            <h2
              className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingClass}`}
              style={displayFont}
            >
              {config.goalsTitle}
            </h2>
            <div className="mt-7 space-y-4">
              {config.goals?.map((goal) => (
                <div key={goal} className="flex items-start gap-3">
                  <IoCheckmarkCircle className="mt-1 shrink-0 text-2xl text-emerald-400" />
                  <p
                    className={`text-sm leading-7 sm:text-base ${bodyTextClass}`}
                    style={bodyFont}
                  >
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <CurvedMediaFrame
            imageSrc={goalsVisual}
            imageSlides={goalsSlides}
            alt={`${projectName} goals`}
          />
        </div>
      </section>

      <section
        className={`relative isolate overflow-hidden ${
          isLightPage ? "bg-white" : "bg-[#080809]"
        }`}
      >
        {!isLightPage && <AmbientHexagons />}
        <div
          className={`absolute inset-0 ${
            isLightPage
              ? "bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf2_100%)]"
              : "bg-[linear-gradient(180deg,#070708_0%,#101114_100%)]"
          }`}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow centered tone={eyebrowTone}>
              PROJECT GALLERY
            </SectionEyebrow>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projectGalleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => openGalleryPreview(image)}
                className="group relative h-[260px] overflow-hidden rounded-[1.4rem] bg-black text-left shadow-[0_28px_80px_-48px_rgba(0,0,0,0.75)] ring-1 ring-black/10"
                aria-label={`Open ${projectName} gallery image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${projectName} gallery ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
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
            <SectionEyebrow tone={eyebrowTone}>{config.mapEyebrow}</SectionEyebrow>
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
          <div className="mx-auto max-w-3xl text-center">
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
              : imagePool.slice(0, 4).map((image, index) => (
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
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
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
                  isLightPage ? "border-white/80 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-green-100/70 backdrop-blur" : "border-white/10 bg-black/25"
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
                <div className="grid gap-5 md:grid-cols-2">
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

                <div className="grid gap-5 md:grid-cols-2">
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

                <div className="grid gap-5 md:grid-cols-2">
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

                <div className="grid gap-5 md:grid-cols-2">
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
              <video
                src={videoSrc}
                controls
                autoPlay
                className="max-h-[92vh] w-full bg-black object-contain"
              />
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
