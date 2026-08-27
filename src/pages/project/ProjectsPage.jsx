import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdSearch,
  MdLocationOn,
  MdArrowForward,
  MdOutlineTune,
  MdClose,
} from "react-icons/md";
import OptimizedImage from "../../components/OptimizedImage";
import { useProjectStore } from "../../store/project/projectStore";
import { entityId, projectDetailsPath } from "../../utils/entity";
import heroImage from "../../assets/images/realEstateImg1.jpg";
import fallbackImage from "../../assets/images/bannerProjectImg2.jpg";

/**
 * OPTIONAL — for the full intended type contrast, add this to index.html <head>:
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
 * ...and in tailwind.config.js:
 *   fontFamily: { serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'], sans: ['Inter', 'ui-sans-serif', 'system-ui'] }
 * The component works with Tailwind's default fonts if you skip this — headings simply
 * fall back to the default serif stack, which still reads distinct from the sans body.
 */

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

const statusOptions = [
  { label: "All Project", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ready", value: "ready" },
  { label: "Handed Over", value: "handed over" },
];

const sizeOptions = [
  { label: "Any Size", value: "all" },
  { label: "1000-1200 Ft", value: "1000-1200" },
  { label: "1200-1600 Ft", value: "1200-1600" },
  { label: "1600-1800 Ft", value: "1600-1800" },
  { label: "1800-2000 Ft", value: "1800-2000" },
];

// Status accent map — reused on the hero badge, card badge, and filter dot
// so the same color always means the same thing across the page.
const STATUS_META = {
  ready: { label: "Ready", dot: "bg-emerald-500", badgeText: "text-emerald-50" },
  "handed over": { label: "Handed Over", dot: "bg-emerald-500", badgeText: "text-emerald-50" },
  ongoing: { label: "Ongoing", dot: "bg-[#C99A4B]", badgeText: "text-amber-50" },
  upcoming: { label: "Upcoming", dot: "bg-sky-400", badgeText: "text-sky-50" },
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
function CornerFrame({ inset = "inset-6", color = "border-white/70", className = "" }) {
  const arm = `absolute h-5 w-5 ${color}`;
  return (
    <div className={`pointer-events-none absolute ${inset} ${className}`}>
      <span className={`${arm} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${arm} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${arm} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${arm} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

export default function ProjectsPage() {
  const { projects, loadProjects, isLoading } = useProjectStore();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");
  const [size, setSize] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Read ?status= from URL and apply as filter, then scroll to grid
  useEffect(() => {
    const urlStatus = searchParams.get("status");
    if (urlStatus) {
      setStatus(urlStatus.toLowerCase());
      // Scroll to projects grid after a short delay
      setTimeout(() => {
        const el = document.getElementById("projects-grid");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [searchParams]);

  const allProjects = useMemo(() => {
    const projectList = Array.isArray(projects) ? projects : [];
    const hasTitanicBay = projectList.some((project) =>
      project?.title?.toLowerCase().includes("titanic bay")
    );
    return uniqueProjects(hasTitanicBay ? projectList : [...projectList, ...fallbackProjects]);
  }, [projects]);

  const locationOptions = useMemo(() => {
    const locations = allProjects
      .map(getLocation)
      .filter(Boolean)
      .map((item) => item.trim());
    return ["Location", ...Array.from(new Set(locations))];
  }, [allProjects]);

  const heroSlides = useMemo(() => {
    const slides = allProjects.filter((p) => getProjectImage(p)).slice(0, 5);
    return slides.length > 0 ? slides : fallbackProjects;
  }, [allProjects]);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentHero((index) => (index + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filteredProjects = useMemo(() => {
    const search = normalize(query);

    return allProjects.filter((project) => {
      const projectStatus = getStatus(project);
      const projectLocation = normalize(getLocation(project));
      const projectSize = normalize(project?.specs?.apartmentSize || project?.specs?.landSize);
      const searchableText = normalize(
        [
          project?.title,
          project?.status,
          getLocation(project),
          project?.specs?.apartmentSize,
          project?.specs?.landSize,
          getDescription(project),
        ]
          .filter(Boolean)
          .join(" ")
      );

      const matchesStatus = status === "all" || projectStatus === status;
      const matchesLocation = location === "all" || projectLocation.includes(normalize(location));
      const matchesSize = size === "all" || projectSize.includes(size);
      const matchesSearch = !search || searchableText.includes(search);

      return matchesStatus && matchesLocation && matchesSize && matchesSearch;
    });
  }, [allProjects, location, query, size, status]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasActiveFilters = status !== "all" || location !== "all" || size !== "all" || query !== "";

  const resetVisibleCount = () => setVisibleCount(9);

  const clearFilters = () => {
    setStatus("all");
    setLocation("all");
    setSize("all");
    setQuery("");
    resetVisibleCount();
  };

  return (
    <main className="bg-[#FBFAF7] pt-24 text-slate-950">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative min-h-[560px] md:min-h-[660px] overflow-hidden bg-slate-950 flex items-center">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-in-out ${
              index === currentHero ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <OptimizedImage
              src={getProjectImage(slide)}
              alt={slide.title || "North South Group projects"}
              priority={index === 0}
              sizes="100vw"
              className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                index === currentHero ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-slate-950/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent" />

        <CornerFrame
          inset="inset-6 md:inset-10"
          color="border-white/25"
          className="z-20 hidden sm:block"
        />

        {/* slide counter — a real sequence (which slide of how many), so a numeric mark is earned here */}
        {heroSlides.length > 1 && (
          <div className="absolute right-8 top-8 z-20 hidden items-center gap-2 font-mono text-xs tracking-widest text-white/70 sm:flex">
            <span className="text-white">{String(currentHero + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-white/40" />
            <span>{String(heroSlides.length).padStart(2, "0")}</span>
          </div>
        )}

        <div className="relative z-20 mx-auto flex h-full min-h-[560px] w-full max-w-7xl flex-col justify-center px-6 md:min-h-[660px] lg:px-10">
          {heroSlides.map((slide, index) => {
            const meta = getStatusMeta(slide);
            return (
              <div
                key={`content-${index}`}
                className={`absolute left-6 right-6 top-1/2 -translate-y-1/2 transition-all duration-[1200ms] ease-in-out lg:left-10 lg:right-10 ${
                  index === currentHero
                    ? "pointer-events-auto translate-x-0 opacity-100"
                    : "pointer-events-none -translate-x-8 opacity-0"
                }`}
              >
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm ${meta.badgeText}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {slide.status || meta.label}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300/90">
                    North South Group
                  </p>
                </div>

                <h1 className="max-w-3xl font-serif text-4xl font-black leading-[1.05] text-white drop-shadow-xl md:text-6xl lg:text-7xl">
                  {slide.title || "Our Projects"}
                </h1>

                {getLocation(slide) && (
                  <div className="mb-9 mt-6 flex max-w-2xl items-center gap-2.5 text-white/85">
                    <MdLocationOn className="shrink-0 text-lg text-emerald-300" />
                    <p className="truncate text-sm font-light tracking-wide md:text-base">
                      {getLocation(slide)}
                    </p>
                  </div>
                )}

                {slide._id && slide.title && (
                  <Link
                    to={projectDetailsPath(slide)}
                    state={{ project: slide }}
                    className="group inline-flex items-center gap-3 border border-white bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-slate-950"
                  >
                    View Details
                    <MdArrowForward className="text-base transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:bottom-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentHero(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentHero ? "w-12 bg-emerald-400" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Show project slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- FILTER DECK */}
      <section id="projects-grid" className="relative z-30 mx-auto -mt-14 max-w-6xl px-5 md:-mt-16 lg:px-8">
        <div className="border border-stone-200 bg-white/95 p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-center gap-2 text-slate-400">
            <MdOutlineTune className="text-base" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Refine your search</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_1.5fr_auto] xl:items-end">
            <FilterSelect
              label="Status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                resetVisibleCount();
              }}
              options={statusOptions}
            />
            <FilterSelect
              label="Location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                resetVisibleCount();
              }}
              options={[
                { label: "All Locations", value: "all" },
                ...locationOptions.slice(1).map((item) => ({ label: item, value: item })),
              ]}
            />
            <FilterSelect
              label="Unit Size"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
                resetVisibleCount();
              }}
              options={sizeOptions}
            />
            <FilterSelect
              label="Type"
              value="all"
              onChange={() => {}}
              disabled
              options={[{ label: "All Types", value: "all" }]}
            />

            <label className="block">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Search
              </span>
              <div className="flex h-11 items-center gap-2 border-b-2 border-stone-200 transition focus-within:border-emerald-700">
                <MdSearch className="shrink-0 text-lg text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    resetVisibleCount();
                  }}
                  placeholder="Search project name"
                  className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </div>
            </label>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 bg-emerald-700 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-slate-950"
            >
              <MdSearch className="text-base" />
              Search
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 transition hover:text-emerald-700"
            >
              <MdClose className="text-sm" />
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------- GRID */}
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 border-b border-stone-200 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">Portfolio</p>
            <h2 className="font-serif text-3xl font-black text-slate-950 md:text-4xl">Our Developments</h2>
          </div>
          {!isLoading && (
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-slate-400">
            <FaSpinner className="animate-spin text-4xl text-emerald-700" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em]">Loading developments</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="border border-stone-200 bg-white px-6 py-20 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">No matches</p>
            <h2 className="font-serif text-2xl font-bold text-slate-950 md:text-3xl">
              Nothing fits those filters yet
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-slate-500">
              Try a different status, location, or size — or clear your filters to see every development.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 inline-flex items-center gap-2 border border-emerald-700 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={entityId(project) || project.title} project={project} />
              ))}
            </div>

            {visibleProjects.length < filteredProjects.length && (
              <div className="mt-16 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 6)}
                  className="border border-emerald-700 px-10 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
                >
                  Load More
                </button>
                <p className="font-mono text-[11px] tracking-widest text-slate-400">
                  Showing {visibleProjects.length} of {filteredProjects.length}
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function FilterSelect({ label, value, onChange, options, disabled = false }) {
  return (
    <label className={`group block ${disabled ? "opacity-50" : ""}`}>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="h-11 w-full appearance-none border-0 border-b-2 border-stone-200 bg-transparent pr-7 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-700 disabled:cursor-not-allowed"
        >
          {options.map((option) => (
            <option key={`${option.value}-${option.label}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <MdKeyboardArrowDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition group-focus-within:text-emerald-700" />
      </div>
    </label>
  );
}

function ProjectCard({ project }) {
  const meta = getStatusMeta(project);
  const secondarySpec = project?.specs?.handover || project?.specs?.apartmentSize;

  return (
    <article className="group">
      <Link
        to={projectDetailsPath(project)}
        state={{ project }}
        className="relative block h-[520px] overflow-hidden bg-slate-900 shadow-sm md:h-[540px]"
      >
        <OptimizedImage
          src={getProjectImage(project)}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/70 transition duration-500 group-hover:from-black/25 group-hover:via-black/35 group-hover:to-black/82" />

        <CornerFrame
          inset="inset-4"
          color="border-white/0 transition-colors duration-500 group-hover:border-white/60"
        />

        <div className="absolute left-6 top-6 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm ${meta.badgeText}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {project.status || meta.label}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-9">
          <div className="transition duration-500 group-hover:-translate-y-6">
            <h2 className="max-w-[18rem] font-serif text-2xl font-black uppercase leading-none tracking-tight md:text-[26px]">
              {project.title}
            </h2>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-white/85">
              <MdLocationOn className="shrink-0 text-base text-emerald-300" />
              <span className="truncate">{getLocation(project)}</span>
            </div>

            {secondarySpec && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-white/60">
                {secondarySpec}
              </p>
            )}
          </div>

          <div className="max-h-0 translate-y-6 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-64 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="mt-4 line-clamp-4 max-w-[22rem] text-[15px] leading-6 text-white/90">
              {getDescription(project)}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 border-b-2 border-emerald-400 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all group-hover:gap-3">
              Explore
              <MdArrowForward className="text-sm" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
