import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdLocationOn,
  MdArrowForward,
  MdClose,
} from "react-icons/md";
import OptimizedImage from "../../components/OptimizedImage";
import { useProjectStore } from "../../store/project/projectStore";
import { useMenuStore } from "../../store/menu/menuStore";
import { entityId, projectDetailsPath } from "../../utils/entity";
import fallbackImage from "../../assets/images/bannerProjectImg2.jpg";
import landImage from "../../assets/images/land1.jpg";
import commercialImage from "../../assets/images/bannerProjectImg1.jpg";
import duplexImage from "../../assets/images/duplex.jpg";
import condominiumImage from "../../assets/images/realEstateImg3.jpg";
import greenCityImage from "../../assets/images/greenCityImg1.jpg";
import squareCityImage from "../../assets/images/greenCityImg4.jpg";
import industrialCityImage from "../../assets/images/greenCityImg2.jpg";
import titanicBayImage from "../../assets/images/heroTitanicBay.jpg";
import { getDefaultConcern } from "../ourConcern/defaultConcernData";

const fallbackProjects = [
  {
    _id: "titanic-bay-project",
    title: "Titanic Bay Hotel & Resort Ltd.",
    status: "upcoming",
    image: [fallbackImage],
    description: {
      generalFeature:
        "A premium hotel and resort opportunity planned around hospitality, leisure, and long-term investment value.",
    },
    specs: {
      address: "Bangladesh",
      apartmentSize: "Hospitality",
      handover: "Upcoming",
    },
  },
];

const projectDirectoryFallbacks = [
  {
    label: "Mayalok Resort",
    to: "/aboutUs",
  },
  {
    label: "Northsouth Garments",
    to: "/northsouthGarments",
  },
  {
    label: "Northsouth Farms Ltd.",
    to: "/northsouthFarmsLtd",
  },
  {
    label: "Northsouth Square City",
    to: "/squareCity",
  },
  {
    label: "Northsouth Industrial City",
    to: "/industrialCity",
  },
  {
    label: "North South Duplex Home",
    to: "/conceptDetails",
  },
  {
    label: "Northsouth Green City Ltd.",
    to: "/greenCity",
  },
  {
    label: "North South Consortium Ltd.",
    to: "/northSouthConsortiumLtd",
  },
  {
    label: "Titanic Bay Hotel & Resort Ltd.",
    href: "https://www.titanicbay.com/",
    external: true,
  },
  {
    label: "Nirapad Valley Condominium project",
    to: "/purbachalNirapadValley",
  },
  {
    label: "NorthSouth Humanity Aid Foundation",
    to: "/northSouthHumanityAidFoundation",
  },
  {
    label: "NorthSouth Building Construction Ltd.",
    to: "/aboutUs",
  },
  {
    label: "Commercial Project",
    to: "/commercial-project",
  },
];

const directoryImageRules = [
  { pattern: /green city/i, image: greenCityImage },
  { pattern: /square city/i, image: squareCityImage },
  { pattern: /industrial city/i, image: industrialCityImage },
  { pattern: /titanic/i, image: titanicBayImage },
  { pattern: /green city/i, image: landImage },
  { pattern: /square city/i, image: landImage },
  { pattern: /industrial city|building construction/i, image: commercialImage },
  { pattern: /duplex/i, image: duplexImage },
  { pattern: /condominium|nirapad/i, image: condominiumImage },
  { pattern: /hotel|resort|titanic|mayalok/i, image: fallbackImage },
  { pattern: /commercial|consortium|press|adin|garments|farms|foundation|humanity/i, image: commercialImage },
];

const routeSlugMap = {
  "/northsouthconsortiumltd": "north-south-consortium-ltd",
  "/purbachalnirapadvalley": "purbachal-nirapad-valley",
  "/conceptdetails": "concept-details",
  "/northsouthfarmsltd": "northsouth-farms-ltd",
  "/northsouthgarments": "northsouth-garments",
  "/northsouthtourstravels": "northsouth-tours-travels",
  "/northsouthfoundation": "northsouth-foundation",
  "/northsouthhumanityaidfoundation": "northsouth-foundation",
  "/northsouthbutterfly": "northsouth-butterfly",
};

const labelSlugMap = {
  "north south consortium ltd.": "north-south-consortium-ltd",
  "purbachal nirapad valley": "purbachal-nirapad-valley",
  "nirapad valley condominium project": "purbachal-nirapad-valley",
  "northsouth duplex home": "concept-details",
  "north south duplex home": "concept-details",
  "northsouth farms ltd.": "northsouth-farms-ltd",
  "northsouth garments": "northsouth-garments",
  "northsouth tours & travels": "northsouth-tours-travels",
  "northsouth humanity aid foundation": "northsouth-foundation",
  "northsouth foundation": "northsouth-foundation",
  "northsouth butterfly resort & park": "northsouth-butterfly",
  "titanic bay hotel & resort ltd.": "titanic-bay-hotel-resort-ltd",
};

const normalizeRouteKey = (value = "") => String(value || "").trim().toLowerCase();

const getDirectorySlug = (item = {}, label = "") => {
  const route = normalizeRouteKey(item.to || item.routePath || "");
  if (route.startsWith("/concern/")) return route.split("/concern/")[1];
  return item.concernSlug || routeSlugMap[route] || labelSlugMap[normalizeRouteKey(label)];
};

const getDirectoryImage = (label = "", item = {}) => {
  const defaultConcern = getDefaultConcern(getDirectorySlug(item, label));
  return (
    defaultConcern?.heroImage ||
    defaultConcern?.aboutImage ||
    directoryImageRules.find((rule) => rule.pattern.test(label))?.image ||
    fallbackImage
  );
};

const getDirectoryDescription = (label = "") => {
  if (/adin|press|newspaper/i.test(label)) {
    return "Press, media, and publication activity under the North South Group network.";
  }
  if (/resort|hotel|titanic|mayalok/i.test(label)) {
    return "Hospitality and resort-focused development connected with North South Group.";
  }
  if (/green|square|industrial|condominium|duplex|construction/i.test(label)) {
    return "A North South Group development concern focused on land, housing, construction, and long-term value.";
  }
  if (/garments/i.test(label)) {
    return "Apparel and manufacturing work shaped around dependable delivery and quality control.";
  }
  if (/farms/i.test(label)) {
    return "Agriculture and farm operations focused on responsible production and sustainable growth.";
  }
  if (/foundation|humanity/i.test(label)) {
    return "Social impact and community support initiatives from North South Group.";
  }
  return "A North South Group concern presented for visitors exploring every company and project.";
};

const normalizeDirectoryLabel = (label = "") => {
  const key = normalize(label);
  if (key === "purbachal nirapad valley") return "Nirapad Valley Condominium project";
  if (key === "dailyadin" || key === "daily adin") return "Daily Adin Press Media Ltd.";
  return label;
};

const isDailyAdinDirectoryItem = (item = {}) => {
  const label = normalize(item.label || item.title || "");
  const href = normalize(item.href || item.to || "");
  return label.includes("daily adin") || label.includes("dailyadin") || href.includes("dailyadin.com");
};

const directoryPriority = [
  /green city/i,
  /industrial city/i,
  /square city/i,
];

const getDirectoryPriority = (project = {}) => {
  const title = project.title || "";
  const index = directoryPriority.findIndex((pattern) => pattern.test(title));
  return index === -1 ? directoryPriority.length : index;
};

const sortDirectoryProjects = (projects = []) =>
  [...projects].sort((a, b) => {
    const priorityDifference = getDirectoryPriority(a) - getDirectoryPriority(b);
    if (priorityDifference !== 0) return priorityDifference;
    return String(a?.title || "").localeCompare(String(b?.title || ""));
  });

const buildDirectoryProjects = (items = []) => {
  const sourceItems = Array.isArray(items) && items.length ? items : projectDirectoryFallbacks;
  const seen = new Set();

  return sourceItems
    .filter((item) => item?.isVisible !== false)
    .filter((item) => !isDailyAdinDirectoryItem(item))
    .map((item, index) => {
      const title = normalizeDirectoryLabel(item.label || item.title || "");
      const key = normalize(title);
      if (!title || seen.has(key)) return null;
      seen.add(key);

      return {
        _id: `directory-${key || index}`,
        title,
        status: "Project Directory",
        image: [getDirectoryImage(title, item)],
        to: item.to || (!item.href ? "/aboutUs" : undefined),
        href: item.href,
        external: item.external,
        description: {
          generalFeature: getDirectoryDescription(title),
        },
        specs: {
          address: "North South Group",
          apartmentSize: "Concern / Project",
        },
      };
    })
    .filter(Boolean);
};

const featuredCategoryProjects = [
  {
    _id: "category-land-project",
    title: "Land Project",
    status: "Project Category",
    image: [landImage],
    to: "/greenCity",
    description: {
      generalFeature:
        "Explore North South Group land developments including Green City, Square City, and Industrial City.",
    },
    specs: {
      address: "Green City, Square City, Industrial City",
      apartmentSize: "Land Development",
    },
  },
  {
    _id: "category-commercial-project",
    title: "Commercial Project",
    status: "Project Category",
    image: [commercialImage],
    to: "/commercial-project",
    description: {
      generalFeature:
        "Commercial development opportunities designed for practical business value and long-term growth.",
    },
    specs: {
      address: "Bangladesh",
      apartmentSize: "Commercial",
    },
  },
  {
    _id: "category-duplex-project",
    title: "Duplex Project",
    status: "Project Category",
    image: [duplexImage],
    to: "/conceptDetails",
    description: {
      generalFeature:
        "Northsouth Duplex Home brings private residential planning with modern family living in focus.",
    },
    specs: {
      address: "Bangladesh",
      apartmentSize: "Duplex Residence",
    },
  },
  {
    _id: "category-condominium-project",
    title: "Condominium Project",
    status: "Project Category",
    image: [condominiumImage],
    to: "/purbachalNirapadValley",
    description: {
      generalFeature:
        "Nirapad Valley Condominium Project offers a planned residential environment with North South Group's development approach.",
    },
    specs: {
      address: "Purbachal",
      apartmentSize: "Condominium",
    },
  },
  {
    _id: "category-hotel-project",
    title: "Hotel Project",
    status: "Project Category",
    image: [fallbackImage],
    href: "https://www.titanicbay.com/",
    description: {
      generalFeature:
        "Titanic Bay Hotel & Resort Ltd. represents the group's hospitality and resort development vision.",
    },
    specs: {
      address: "Bangladesh",
      apartmentSize: "Hospitality",
    },
  },
];

const statusOptions = [
  { label: "All Project", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ready", value: "ready" },
  { label: "Handed Over", value: "handed over" },
];


const LUXURY_SHOWCASE_SLIDES = [
  {
    title: "Signature Living",
    subtitle: "North South Group",
    caption:
      "Contemporary architecture shaped around refined living, confident design, and a strong sense of place.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790317812/Slider1.jpg.jpg",
    source: "project",
  },
  {
    title: "Designed With Detail",
    subtitle: "Architectural Experience",
    caption:
      "A refined visual language where proportion, material, greenery, and modern residential planning come together.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318528/Scene_7_2_copy.jpg",
    source: "project",
  },
  {
    title: "Modern Perspective",
    subtitle: "Project View",
    caption:
      "Thoughtful contemporary development presented with a clean architectural identity and premium residential character.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318527/Scene_4_3.png",
    source: "project",
  },
  {
    title: "A Better Way To Live",
    subtitle: "Signature Development",
    caption:
      "A modern environment created around comfort, design quality, everyday convenience, and long-term value.",
    image:
      "https://res.cloudinary.com/dpsjkcaa/image/upload/v1790318526/2_copy.jpg",
    source: "project",
  },
  {
    title: "Grand Arrival",
    subtitle: "Lobby & Reception",
    caption:
      "A calm interior experience shaped by light, scale, elegant material choices, and a welcoming sense of arrival.",
    image:
      "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?auto=format&fit=crop&q=88&w=2600",
    source: "interior",
  },
  {
    title: "Private Living",
    subtitle: "Interior Experience",
    caption:
      "Contemporary interior inspiration with generous proportions, natural light, and a refined residential atmosphere.",
    image:
      "https://images.unsplash.com/photo-1776362355123-ca966d36e29c?auto=format&fit=crop&q=88&w=2600",
    source: "interior",
  },
];

const getProjectGallery = (project) => {
  const pools = [
    project?.image,
    project?.images,
    project?.slideImage,
    project?.galleryImages,
    project?.lobbyImages,
    project?.interiorImages,
    project?.exteriorImages,
    project?.skyViewImages,
    project?.amenityImages,
    project?.amenitiesImages,
  ];

  const seen = new Set();

  return pools
    .flatMap((item) => (Array.isArray(item) ? item : item ? [item] : []))
    .filter(Boolean)
    .filter((item) => {
      const key = String(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

// Status accent map — reused on the hero badge, card badge, and filter dot
// so the same color always means the same thing across the page.
const STATUS_META = {
  ready: { label: "Ready", dot: "bg-emerald-600", badgeText: "text-emerald-700" },
  "handed over": { label: "Handed Over", dot: "bg-green-600", badgeText: "text-green-700" },
  ongoing: { label: "Ongoing", dot: "bg-lime-600", badgeText: "text-lime-700" },
  upcoming: { label: "Upcoming", dot: "bg-teal-600", badgeText: "text-teal-700" },
  "project category": { label: "Project Category", dot: "bg-emerald-500", badgeText: "text-emerald-700" },
  "project directory": { label: "Project Directory", dot: "bg-green-500", badgeText: "text-green-700" },
};

const getStatusMeta = (project) => {
  const key = getStatus(project);
  return STATUS_META[key] || STATUS_META.upcoming;
};

const getStatus = (project) => String(project?.status || "upcoming").toLowerCase();

const getProjectImage = (project) =>
  project?.image?.find(Boolean) ||
  project?.slideImage?.find(Boolean) ||
  project?.galleryImages?.find(Boolean) ||
  fallbackImage;

const getDescription = (project) =>
  project?.description?.shortOverview ||
  project?.description?.generalFeature ||
  project?.description?.location ||
  "A North South Group development planned around location value, modern living, and practical long-term ownership.";

const getLocation = (project) =>
  project?.specs?.address || project?.description?.location || "Bangladesh";

const normalize = (value = "") => String(value || "").trim().toLowerCase();

const getProjectLink = (project) => project?.href || project?.to || projectDetailsPath(project);

const isExternalProject = (project) => Boolean(project?.href);

const uniqueProjects = (projects) => {
  const seen = new Set();
  return projects.filter((project) => {
    const key = entityId(project) || project?.title;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// Signature motif — a surveyor's / blueprint corner-frame. It echoes the literal
// tools of the subject (site plans, plot markers) and reappears on the hero and
// on every card, so it reads as the one deliberate idea rather than decoration.
/**
 * NAVBAR NOTE:
 * This page leaves a pure-white 96px surface behind the site navbar.
 * If the Navbar/Header component itself still has `bg-black`, change that
 * component to `bg-white` and use dark/green text there.
 */
export default function ProjectsPage() {
  const { projects, loadProjects, isLoading } = useProjectStore();
  const { concernMenuItems, loadConcernMenuItems } = useMenuStore();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    loadConcernMenuItems();
  }, [loadConcernMenuItems]);

  // Read ?status= from URL and apply as filter, then scroll to grid
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    if (urlStatus) {
      const timer = setTimeout(() => {
        setStatus(urlStatus.toLowerCase());
        const el = document.getElementById("projects-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [searchParams]);

  const allProjects = useMemo(() => {
    const projectList = Array.isArray(projects) ? projects : [];
    const hasTitanicBay = projectList.some((project) =>
      project?.title?.toLowerCase().includes("titanic bay")
    );
    const listedProjects = hasTitanicBay ? projectList : [...projectList, ...fallbackProjects];
    const directoryProjects = sortDirectoryProjects(buildDirectoryProjects(concernMenuItems));
    return uniqueProjects([...listedProjects, ...directoryProjects, ...featuredCategoryProjects]);
  }, [concernMenuItems, projects]);

  const locationOptions = useMemo(() => {
    const locations = allProjects
      .map(getLocation)
      .filter(Boolean)
      .map((item) => item.trim());
    return ["Location", ...Array.from(new Set(locations))];
  }, [allProjects]);

  const heroSlides = LUXURY_SHOWCASE_SLIDES;

  useEffect(() => {
    if (currentHero >= heroSlides.length) setCurrentHero(0);
    if (heroSlides.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentHero((index) => (index + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const projectStatus = getStatus(project);
      const projectLocation = normalize(getLocation(project));

      const matchesStatus =
        status === "all" || projectStatus === status;

      const matchesLocation =
        location === "all" ||
        projectLocation.includes(normalize(location));

      return matchesStatus && matchesLocation;
    });
  }, [allProjects, location, status]);

  const visibleProjects = filteredProjects;
  const hasActiveFilters = status !== "all" || location !== "all";

  const clearFilters = () => {
    setStatus("all");
    setLocation("all");
  };

  const goToHero = (nextIndex) => {
    const count = heroSlides.length;
    setCurrentHero((nextIndex + count) % count);
  };

  return (
    <main
      className="overflow-x-hidden bg-white text-slate-900"
      style={{ fontFamily: '"Manrope", "Montserrat", ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* =============================================================== FULLSCREEN HERO */}
      <section className="relative min-h-[620px] h-[100svh] overflow-hidden bg-white pt-20 sm:min-h-[660px] sm:pt-24 lg:min-h-[700px]">
        {/* White surface behind a transparent/fixed navbar */}
        <div className="absolute inset-x-0 top-0 z-0 h-20 bg-white sm:h-24" />
        {heroSlides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`absolute inset-x-0 bottom-0 top-20 transition-opacity duration-[1400ms] ease-out sm:top-24 ${
              index === currentHero ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.title} - ${slide.subtitle}`}
              className={`h-full w-full object-cover transition-transform duration-[9000ms] ease-out ${
                index === currentHero ? "scale-[1.025]" : "scale-100"
              }`}
            />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 top-20 z-10 bg-gradient-to-r from-emerald-950/82 via-emerald-950/36 to-transparent sm:top-24 sm:from-emerald-950/78 sm:via-emerald-950/28" />
        <div className="absolute inset-x-0 bottom-0 top-20 z-10 bg-gradient-to-t from-emerald-950/78 via-emerald-950/5 to-transparent sm:top-24 sm:from-emerald-950/68" />

        <div className="absolute inset-x-0 bottom-0 top-20 z-20 mx-auto flex max-w-[1700px] items-end px-4 pb-5 sm:top-24 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:px-10 lg:pb-12 xl:px-14 2xl:px-16">
          <div className="grid w-full items-end gap-5 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_480px]">
            <div className="max-w-[920px]">
              <div className="mb-3 flex items-center gap-3 sm:mb-5 sm:gap-4">
                <span className="h-px w-8 bg-emerald-400 sm:w-12" />
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-emerald-100 sm:text-[10px] sm:tracking-[0.28em] lg:text-[11px] lg:tracking-[0.32em]">
                  North South Group · Signature Collection
                </p>
              </div>

              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.20em] text-white/75 sm:mb-3 sm:text-xs sm:tracking-[0.26em] md:text-sm">
                {heroSlides[currentHero]?.subtitle}
              </p>

              <h1 className="max-w-4xl text-[34px] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] 2xl:text-[90px]">
                {heroSlides[currentHero]?.title}
              </h1>

              <p className="mt-4 line-clamp-3 max-w-2xl text-[12px] leading-5.5 text-white/75 sm:mt-5 sm:text-sm sm:leading-6 md:mt-6 md:text-base md:leading-7">
                {heroSlides[currentHero]?.caption}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("projects-grid")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-emerald-600 px-5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(5,150,105,0.24)] transition hover:bg-white hover:text-emerald-800 sm:h-11 sm:px-6 sm:text-[10px] md:h-12 md:px-7 md:text-[11px] md:tracking-[0.2em]"
                >
                  Explore Projects
                  <MdArrowForward className="text-lg transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex h-10 items-center overflow-hidden rounded-full border border-white/25 bg-black/15 backdrop-blur-md sm:h-11 md:h-12">
                  <button
                    type="button"
                    onClick={() => goToHero(currentHero - 1)}
                    className="grid h-full w-10 place-items-center border-r border-white/20 text-lg text-white transition hover:bg-white hover:text-black sm:w-11 md:w-12 md:text-xl"
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                  <div className="min-w-[72px] px-2.5 text-center font-mono text-[9px] tracking-[0.16em] text-white/75 sm:min-w-[82px] sm:px-3 sm:text-[10px] md:min-w-[92px] md:px-4 md:text-[11px] md:tracking-[0.24em]">
                    {String(currentHero + 1).padStart(2, "0")} /{" "}
                    {String(heroSlides.length).padStart(2, "0")}
                  </div>
                  <button
                    type="button"
                    onClick={() => goToHero(currentHero + 1)}
                    className="grid h-full w-10 place-items-center text-lg text-white transition hover:bg-white hover:text-black sm:w-11 md:w-12 md:text-xl"
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
             
            </div>
          </div>
        </div>
      </section>

 

      {/* ======================================================== LIGHT LUXURY PROJECT COLLECTION */}
      <section
        id="projects-grid"
        className="relative scroll-mt-20 overflow-hidden bg-[#F8FBF8] px-4 pb-16 pt-10 sm:scroll-mt-24 sm:px-6 sm:pb-20 sm:pt-12 md:px-8 lg:px-10 lg:pb-24 lg:pt-14 xl:px-12 2xl:px-14"
      >
        {/* soft architectural background details */}
        <div className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full bg-emerald-100/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-green-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1880px]">
          {isLoading ? (
            <div className="grid min-h-[50svh] place-items-center">
              <div className="flex flex-col items-center gap-4 text-slate-400">
                <FaSpinner className="animate-spin text-4xl text-emerald-600" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em]">
                  Loading developments
                </p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="grid min-h-[55svh] place-items-center text-center">
              <div className="w-full max-w-2xl rounded-[24px] border border-emerald-100 bg-white px-5 py-10 shadow-[0_24px_70px_rgba(15,76,58,0.08)] sm:rounded-[32px] sm:px-10 sm:py-14">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-700">
                  No matches
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-900 sm:mt-4 sm:text-3xl">
                  Nothing fits those filters yet.
                </h3>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 rounded-full bg-emerald-700 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-800"
                >
                  Show all projects
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-6 sm:mb-10 md:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] xl:items-end">
                <div className="max-w-3xl">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <span className="h-px w-8 bg-emerald-600 sm:w-11" />
                    <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-[9px] sm:tracking-[0.26em] lg:text-[10px] lg:tracking-[0.30em]">
                      Signature Developments
                    </p>
                  </div>

                  <h2 className="max-w-3xl text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[42px] xl:text-[46px]">
                    Designed for a better way of living.
                  </h2>

                  <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7 md:text-[15px]">
                    Explore a curated collection of residential, commercial, hospitality,
                    and land developments presented in a clean premium experience.
                  </p>
                </div>

                {/* Slim project filter */}
                <div className="w-full self-end">
                  <div className="flex flex-col gap-2.5 rounded-[16px] border border-emerald-100 bg-white/85 p-2.5 shadow-[0_10px_28px_rgba(15,76,58,0.05)] backdrop-blur-sm sm:gap-3 sm:p-3 md:flex-row md:items-end">
                    <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                      <CompactFilterSelect
                        label="Status"
                        value={status}
                        onChange={(event) => {
                          setStatus(event.target.value);
                        }}
                        options={statusOptions}
                      />

                      <CompactFilterSelect
                        label="Location"
                        value={location}
                        onChange={(event) => {
                          setLocation(event.target.value);
                        }}
                        options={[
                          { label: "All Locations", value: "all" },
                          ...locationOptions.slice(1).map((item) => ({
                            label: item,
                            value: item,
                          })),
                        ]}
                      />
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-2 md:justify-end">
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-[7px] font-bold uppercase tracking-[0.13em] text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700 sm:text-[8px] sm:tracking-[0.15em]"
                        >
                          <MdClose className="text-xs" />
                          Clear
                        </button>
                      )}

                      <div className="inline-flex h-8 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 sm:gap-2 sm:px-3">
                        <span className="font-mono text-[9px] font-bold text-emerald-700">
                          {String(filteredProjects.length).padStart(2, "0")}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-emerald-800/70">
                          Projects
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7">
                {filteredProjects.map((project, index) => (
                  <PremiumProjectCard
                    key={entityId(project) || project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ================================================================ END NOTE */}
      <section className="border-t border-emerald-100 bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-14 xl:px-14 2xl:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 rounded-[22px] bg-emerald-950 px-5 py-7 text-white shadow-[0_24px_70px_rgba(6,78,59,0.16)] sm:rounded-[28px] sm:px-7 sm:py-8 md:flex-row md:items-center md:justify-between md:px-9 lg:rounded-[32px] lg:px-10 lg:py-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-200">
              North South Group
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Discover the project that fits your vision.
            </h3>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-emerald-900 sm:w-auto sm:px-6 sm:text-[10px] sm:tracking-[0.22em] md:h-11"
          >
            Back to top ↑
          </button>
        </div>
      </section>
    </main>
  );
}

function CompactFilterSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
}) {
  return (
    <label className={`block ${disabled ? "opacity-55" : ""}`}>
      <span className="mb-1 block text-[7px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:tracking-[0.17em]">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            h-9 w-full min-w-0 appearance-none rounded-[10px]
            border border-emerald-100
            bg-[#FBFDFB]
            px-2.5 pr-7
            text-[10px] font-medium text-slate-700 sm:h-8
            outline-none transition
            focus:border-emerald-400 focus:bg-white
            disabled:cursor-not-allowed
          "
        >
          {options.map((option) => (
            <option
              key={`${option.value}-${option.label}`}
              value={option.value}
              className="bg-white text-slate-700"
            >
              {option.label}
            </option>
          ))}
        </select>

        <MdKeyboardArrowDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[15px] text-emerald-500" />
      </div>
    </label>
  );
}

function PremiumProjectCard({ project, index }) {
  const meta = getStatusMeta(project);
  const projectGallery = getProjectGallery(project);

  const primaryImage =
    projectGallery[0] ||
    LUXURY_SHOWCASE_SLIDES[index % LUXURY_SHOWCASE_SLIDES.length]?.image ||
    fallbackImage;

  const secondarySpec =
    project?.specs?.handover ||
    project?.specs?.apartmentSize ||
    project?.specs?.landSize ||
    project?.specs?.category;

  const card = (
    <article className="group relative h-full">
      <div
        className="
          relative h-[500px] overflow-hidden
          rounded-[18px]
          border border-emerald-100/90
          bg-white/45
          shadow-[0_16px_40px_rgba(15,76,58,0.07)]
          backdrop-blur-md
          transition-all duration-500
          hover:-translate-y-1
          hover:border-emerald-300
          hover:shadow-[0_24px_58px_rgba(15,76,58,0.12)]
          sm:h-[540px] sm:rounded-[20px]
          md:h-[560px]
          lg:h-[570px]
          xl:h-[600px] xl:rounded-[22px]
          2xl:h-[620px]
        "
      >
        {/* Soft fill keeps portrait / landscape renders visually complete */}
        <img
          src={primaryImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-[14px] saturate-75 transition duration-[1200ms] group-hover:scale-[1.13]"
        />

        <div className="absolute inset-0 bg-white/20" />

        {/* Full project image */}
        <img
          src={primaryImage}
          alt={project.title || "Project"}
          className="
            absolute inset-0 h-full w-full
            object-contain object-center
            transition-transform duration-[1200ms] ease-out
            group-hover:scale-[1.02]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/8 to-white/5" />

        {/* Status */}
        <div className="absolute left-3 top-3 z-20 sm:left-4 sm:top-4 xl:left-5 xl:top-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-emerald-950/28 px-2.5 py-1.5 backdrop-blur-xl sm:gap-2 sm:px-3 sm:py-2">
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-white sm:text-[8px] sm:tracking-[0.17em] xl:text-[9px] xl:tracking-[0.20em]">
              {project.status || meta.label}
            </span>
          </div>
        </div>

        {/* Number / photo count */}
        <div className="absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5 sm:right-4 sm:top-4 xl:right-5 xl:top-5">
          <span className="grid h-8 min-w-8 place-items-center rounded-full border border-white/45 bg-white/16 px-2 font-mono text-[8px] font-semibold tracking-[0.12em] text-white backdrop-blur-xl sm:h-9 sm:min-w-9 sm:text-[9px]">
            {String(index + 1).padStart(2, "0")}
          </span>

          {projectGallery.length > 1 && (
            <span className="rounded-full border border-white/30 bg-emerald-950/25 px-2.5 py-1.5 text-[7px] font-semibold uppercase tracking-[0.13em] text-white/85 backdrop-blur-lg sm:text-[8px] sm:tracking-[0.16em]">
              {projectGallery.length} Photos
            </span>
          )}
        </div>

        {/* Architectural hover accent */}
        <div className="absolute left-0 top-0 z-20 h-full w-[2px] origin-bottom scale-y-0 bg-emerald-400 transition-transform duration-700 group-hover:scale-y-100 sm:w-[3px]" />

        {/* Bottom information */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 xl:p-6">
          <div className="mb-2 flex min-w-0 items-center gap-2 text-white/85 sm:mb-3">
            <MdLocationOn className="shrink-0 text-[15px] text-emerald-300 sm:text-[16px]" />
            <span className="truncate text-[9px] font-medium tracking-wide sm:text-[10px] xl:text-[11px]">
              {getLocation(project)}
            </span>
          </div>

          <h3 className="line-clamp-2 max-w-[96%] text-[19px] font-semibold uppercase leading-[1.08] tracking-[-0.018em] text-white drop-shadow-sm sm:text-[21px] lg:text-[22px] xl:text-[24px]">
            {project.title}
          </h3>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-white/18 pt-3 sm:mt-4 sm:gap-4 sm:pt-4">
            <div className="min-w-0">
              {secondarySpec && (
                <>
                  <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-emerald-200/85 sm:text-[8px] sm:tracking-[0.20em]">
                    Project Detail
                  </p>
                  <p className="mt-1 max-w-[220px] truncate text-[8px] font-medium uppercase tracking-[0.10em] text-white/75 sm:max-w-[240px] sm:text-[9px] xl:text-[10px] xl:tracking-[0.13em]">
                    {secondarySpec}
                  </p>
                </>
              )}
            </div>

            <span
              className="
                grid h-9 w-9 shrink-0 place-items-center
                rounded-full border border-white/35
                bg-white/12 text-white
                backdrop-blur-xl
                transition-all duration-300
                group-hover:border-white
                group-hover:bg-white
                group-hover:text-emerald-800
                sm:h-10 sm:w-10
                xl:h-11 xl:w-11
              "
            >
              <MdArrowForward className="text-base transition-transform duration-300 group-hover:translate-x-1 sm:text-lg" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (isExternalProject(project)) {
    return (
      <a
        href={getProjectLink(project)}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    );
  }

  return (
    <Link
      to={getProjectLink(project)}
      state={{ project }}
      className="block h-full"
    >
      {card}
    </Link>
  );
}

function ProjectLink({ project, children }) {
  if (isExternalProject(project)) {
    return (
      <a
        href={getProjectLink(project)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={getProjectLink(project)}
      state={{ project }}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </Link>
  );
}
