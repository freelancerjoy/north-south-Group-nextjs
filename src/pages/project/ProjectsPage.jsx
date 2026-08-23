import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import OptimizedImage from "../../components/OptimizedImage";
import { useProjectStore } from "../../store/project/projectStore";
import { entityId, projectDetailsPath } from "../../utils/entity";
import heroImage from "../../assets/images/realEstateImg1.jpg";
import fallbackImage from "../../assets/images/bannerProjectImg2.jpg";

const fallbackProjects = [
  {
    _id: "titanic-bay-project",
    title: "Titanic Bay Hotel & Resort L.T.D",
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
  { label: "Size", value: "all" },
  { label: "1000-1200 Ft", value: "1000-1200" },
  { label: "1200-1600 Ft", value: "1200-1600" },
  { label: "1600-1800 Ft", value: "1600-1800" },
  { label: "1800-2000 Ft", value: "1800-2000" },
];

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

export default function ProjectsPage() {
  const { projects, loadProjects, isLoading } = useProjectStore();
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");
  const [size, setSize] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

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
    const slides = allProjects.filter(p => getProjectImage(p)).slice(0, 5);
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

  const resetVisibleCount = () => {
    setVisibleCount(9);
  };

  return (
    <main className="bg-white pt-24 text-slate-950">
      <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden bg-slate-950 flex items-center">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentHero ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <OptimizedImage
              src={getProjectImage(slide)}
              alt={slide.title || "North South Group projects"}
              priority={index === 0}
              sizes="100vw"
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === currentHero ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}
        {/* Gradients for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent z-10" />
        
        {/* Navigation Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
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

        {/* Content */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-8 flex flex-col justify-center h-full min-h-[500px] md:min-h-[600px]">
          {heroSlides.map((slide, index) => (
            <div
              key={`content-${index}`}
              className={`absolute top-1/2 -translate-y-1/2 left-6 right-6 lg:left-8 lg:right-8 transition-all duration-1000 ease-in-out ${
                index === currentHero
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 -translate-x-10 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-4 mb-5">
                <span
                  className={`text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-[0.2em] text-white shadow-lg border border-white/20 backdrop-blur-sm ${
                    (slide.status?.toLowerCase() === 'ready' || slide.status?.toLowerCase() === 'handed over') ? 'bg-emerald-600/80' :
                    slide.status?.toLowerCase() === 'ongoing' ? 'bg-amber-500/80' :
                    'bg-blue-600/80'
                  }`}
                >
                  {slide.status || 'Upcoming'}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 drop-shadow-md">
                  North South Group
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-white max-w-3xl drop-shadow-xl mb-6">
                {slide.title || "Projects"}
              </h1>
              {getLocation(slide) && (
                <div className="flex items-center gap-2 text-white/90 mb-8 max-w-2xl">
                  <span className="w-8 h-px bg-emerald-400 shrink-0" />
                  <p className="text-sm md:text-base font-light tracking-wide truncate">{getLocation(slide)}</p>
                </div>
              )}
              {slide._id && slide.title && (
                <Link
                  to={projectDetailsPath(slide)}
                  state={{ project: slide }}
                  className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-8 rounded-sm tracking-widest uppercase text-xs transition-colors shadow-lg shadow-emerald-900/30"
                >
                  View Details
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1.3fr_auto]">
          <FilterSelect
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              resetVisibleCount();
            }}
            options={statusOptions}
          />
          <FilterSelect
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              resetVisibleCount();
            }}
            options={[
              { label: "Location", value: "all" },
              ...locationOptions.slice(1).map((item) => ({ label: item, value: item })),
            ]}
          />
          <FilterSelect
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
              resetVisibleCount();
            }}
            options={sizeOptions}
          />
          <FilterSelect
            value="all"
            onChange={() => {}}
            options={[{ label: "Apartment Type", value: "all" }]}
          />
          <div className="flex h-12 items-center border border-slate-200 bg-white px-4">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                resetVisibleCount();
              }}
              placeholder="Search project name"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 bg-emerald-700 px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-950"
          >
            <MdSearch className="text-lg" />
            Search
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        {isLoading ? (
          <div className="flex min-h-[360px] items-center justify-center">
            <FaSpinner className="animate-spin text-5xl text-emerald-700" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="border border-slate-200 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900">No projects found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try another filter or search keyword.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={entityId(project) || project.title} project={project} />
              ))}
            </div>

            {visibleProjects.length < filteredProjects.length && (
              <div className="mt-16 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 6)}
                  className="border border-emerald-700 px-10 py-3 text-sm font-bold uppercase tracking-[0.22em] text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <label className="relative block">
      <select
        value={value}
        onChange={onChange}
        className="h-12 w-full appearance-none border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-500 outline-none transition focus:border-emerald-700"
      >
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MdKeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
    </label>
  );
}

function ProjectCard({ project }) {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/62 transition duration-500 group-hover:from-black/20 group-hover:via-black/30 group-hover:to-black/78" />
        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/18" />

        <div className="absolute top-6 left-6 z-10">
          <span
            className={`text-xs font-bold px-3 py-1.5 uppercase tracking-[0.15em] text-white ${
              (project.status?.toLowerCase() === 'ready' || project.status?.toLowerCase() === 'handed over') ? 'bg-emerald-600' :
              project.status?.toLowerCase() === 'ongoing' ? 'bg-amber-500' :
              'bg-blue-600'
            }`}
          >
            {project.status || 'Upcoming'}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
          <div className="transition duration-500 group-hover:-translate-y-6">
          <h2 className="max-w-[18rem] text-2xl font-black uppercase leading-none tracking-normal md:text-[28px]">
            {project.title}
          </h2>
          <h3 className="mt-2 text-base font-medium leading-6 text-white">
            {getLocation(project)}
          </h3>
          </div>

          <div className="max-h-0 translate-y-6 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-64 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mt-4 line-clamp-5 max-w-[22rem] text-base leading-5 text-white">
            {getDescription(project)}
          </p>
          <div className="mt-8 flex h-12 w-40 items-center justify-center border border-white bg-white/0 text-sm font-bold text-white transition group-hover:bg-white group-hover:text-slate-950">
            Explore
          </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
