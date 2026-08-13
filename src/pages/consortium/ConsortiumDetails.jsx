import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/env";

import Projects from "../project/Projects";
import Carousel from "../../components/Carousel";
import OptimizedImage from "../../components/OptimizedImage";
import { entityId, entityRouteId, slugify } from "../../utils/entity";
import { IoCloseOutline } from "react-icons/io5";
import { getAllProjects, getProjectById } from "../../store/project/projectApi";
import { projectDescriptionFields } from "../admin/projects/projectFieldConfig";
import {
  MdExplore,
  MdAddRoad,
  MdStraighten,
  MdAspectRatio,
  MdApartment,
  MdLocalParking,
  MdLayers,
  MdDateRange,
  MdElevator,
  MdStairs,
  MdDomain,
  MdLocationOn,
  MdWeekend,
  MdFitnessCenter,
  MdPool,
  MdOutdoorGrill,
  MdWater,
  MdChildCare,
  MdGroups,
  MdDoorbell,
} from "react-icons/md";


export default function ProjectDetails() {
  const buttons = ["Basement", "Ground Floor", "Typical Floor", "Roof Floor"];
  const { state } = useLocation();
  const { id } = useParams();
  const projectId = entityRouteId(id);
  const routedProject = state?.project || null;
  const [project, setProject] = useState(routedProject);
  const [projectLoading, setProjectLoading] = useState(!routedProject);
  const [projectError, setProjectError] = useState("");

  const [keyPlanOpen, setKeyPlanOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const handleKeyPlanOpen = (keyPhotos) => {
    setSelectedKey(keyPhotos);
    setKeyPlanOpen(true);
  };

  const handleKeyPlanClose = () => {
    setSelectedKey(null);
    setKeyPlanOpen(false);
  };

  useEffect(() => {
    let ignore = false;

    const loadProject = async () => {
      if (routedProject) {
        setProject(routedProject);
        setProjectLoading(false);
        setProjectError("");
        return;
      }

      try {
        setProjectLoading(true);
        setProjectError("");

        if (projectId?.match(/^[0-9a-fA-F]{24}$/)) {
          const res = await getProjectById(projectId);
          if (!ignore) setProject(res?.data || null);
          return;
        }

        const res = await getAllProjects();
        const routeSlug = slugify(id);
        const matchedProject = (Array.isArray(res?.data) ? res.data : []).find(
          (item) => slugify(item?.title) === routeSlug
        );

        if (!ignore) setProject(matchedProject || null);
      } catch (error) {
        if (!ignore) {
          setProject(null);
          setProjectError(error?.response?.data?.message || "Project not found");
        }
      } finally {
        if (!ignore) setProjectLoading(false);
      }
    };

    loadProject();

    return () => {
      ignore = true;
    };
  }, [id, projectId, routedProject]);

  const images = project?.image?.filter(Boolean) || [];
  const slideImages = project?.slideImage?.filter(Boolean) || [];
  const uploadedGalleryImages = project?.galleryImages?.filter(Boolean) || [];
  const uploadedProjectGalleryImages = project?.projectGalleryImages?.filter(Boolean) || [];
  const heroImages = slideImages.length > 0 ? slideImages : images;
  const desc = project?.description || {};
  const projectSpecs = project?.specs || {};
  const heroSummary =
    desc.shortOverview ||
    desc.generalFeature ||
    desc.location ||
    projectSpecs.address ||
    "A planned North South Group development with practical amenities and a connected location.";
  const fallbackSectionImages = images.length > 0 ? images : slideImages;
  const detailSections = projectDescriptionFields
    .map((field, index) => ({
      key: field.key,
      label: field.label,
      content: desc[field.key],
      image: project?.sectionImages?.[field.key] || fallbackSectionImages[index] || null,
    }))
    .filter((section) => section.content && String(section.content).trim());

  const specIcons = {
    orientation: <MdExplore />,
    frontRoad: <MdAddRoad />,
    landSize: <MdStraighten />,
    apartmentSize: <MdAspectRatio />,
    apartments: <MdApartment />,
    parking: <MdLocalParking />,
    floors: <MdLayers />,
    handover: <MdDateRange />,
    lifts: <MdElevator />,
    stairs: <MdStairs />,
    buildingType: <MdDomain />,
    address: <MdLocationOn />,
  };

  const keyPhotos = project?.keyPhotos
    ? [
        project.keyPhotos.basement,
        project.keyPhotos.groundFloor,
        project.keyPhotos.typicalFloor,
        project.keyPhotos.roofFloor,
      ].filter(Boolean)
    : [];

  const fallbackGalleryPhotos = [...images, ...slideImages];
  const photos = uploadedGalleryImages.length > 0 ? uploadedGalleryImages : fallbackGalleryPhotos;
  const projectGalleryPhotos = uploadedProjectGalleryImages.length > 0 ? uploadedProjectGalleryImages : photos;
  const [current, setCurrent] = useState(0);

  const [projectGalleryIndex, setProjectGalleryIndex] = useState(0);
  const [projectGalleryOpen, setProjectGalleryOpen] = useState(false);
  const [selectedProjectGallery, setSelectedProjectGallery] = useState(null);

  const handleProjectGalleryOpen = (index) => {
    setProjectGalleryIndex(index);
    setSelectedProjectGallery(projectGalleryPhotos[index]);
    setProjectGalleryOpen(true);
  };
  const handleProjectGalleryClose = () => {
    setProjectGalleryOpen(false);
    setSelectedProjectGallery(null);
  };
  const handleProjectGalleryPrev = () => {
    const newIndex = (projectGalleryIndex - 1 + projectGalleryPhotos.length) % projectGalleryPhotos.length;
    setProjectGalleryIndex(newIndex);
    setSelectedProjectGallery(projectGalleryPhotos[newIndex]);
  };
  const handleProjectGalleryNext = () => {
    const newIndex = (projectGalleryIndex + 1) % projectGalleryPhotos.length;
    setProjectGalleryIndex(newIndex);
    setSelectedProjectGallery(projectGalleryPhotos[newIndex]);
  };
  const handleProjectGallerySlidePrev = () => {
    setProjectGalleryIndex((prev) => (prev - 1 + projectGalleryPhotos.length) % projectGalleryPhotos.length);
  };
  const handleProjectGallerySlideNext = () => {
    setProjectGalleryIndex((prev) => (prev + 1) % projectGalleryPhotos.length);
  };

  useEffect(() => {
    setCurrent(0);
  }, [project?._id]);

  if (projectLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-green-100 border-t-green-500 animate-spin" />
      </div>
    );
  }

  if (!project || projectError) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Project not found</h2>
          <p className="text-slate-500 mt-2">{projectError || "This project could not be loaded."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="relative w-full">
        <Carousel images={heroImages} />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent pointer-events-none" />

        {/* TOP LEFT — brand tag */}
        <div className="absolute top-6 left-6 md:top-10 md:left-12 flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 backdrop-blur">
          <div className="w-8 h-px bg-green-400" />
          <span className="text-green-300 text-xs font-bold uppercase tracking-[0.24em]">North South Group</span>
        </div>

        {/* MAIN CONTENT — left aligned, bottom anchored */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
          {/* Status pill */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-green-200 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Project Details
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-4 max-w-5xl tracking-normal">
            {project.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-0.5 bg-green-400" />
            <p className="text-white/70 text-sm md:text-base font-light tracking-wide">
              {projectSpecs.address || "Planned development by North South Group"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <p className="text-white/75 text-sm md:text-base leading-7 max-w-xl">
              {heroSummary}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-md tracking-wide uppercase transition-all duration-300"
              >
                Download Brochure
              </button>
            </div>
          </div>

          {/* Stats strip */}
          {(projectSpecs.floors || projectSpecs.apartments || projectSpecs.parking) && (
            <div className="mt-10 flex flex-wrap gap-px border-t border-white/10 pt-6">
              {projectSpecs.floors && (
                <div className="flex flex-col pr-8 mr-8 border-r border-white/10">
                  <span className="text-2xl md:text-3xl font-black text-white">{projectSpecs.floors}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest mt-0.5">Floors</span>
                </div>
              )}
              {projectSpecs.apartments && (
                <div className="flex flex-col pr-8 mr-8 border-r border-white/10">
                  <span className="text-2xl md:text-3xl font-black text-white">{projectSpecs.apartments}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest mt-0.5">Units</span>
                </div>
              )}
              {projectSpecs.parking && (
                <div className="flex flex-col pr-8">
                  <span className="text-2xl md:text-3xl font-black text-white">{projectSpecs.parking}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest mt-0.5">Parking</span>
                </div>
              )}
              {projectSpecs.handover && (
                <div className="flex flex-col pl-8 border-l border-white/10">
                  <span className="text-2xl md:text-3xl font-black text-white">{projectSpecs.handover}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest mt-0.5">Handover</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs uppercase tracking-[0.2em] rotate-90 mb-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {detailSections.length > 0 && (
        <section className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl mb-14">
            <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">What We Offer</p>
            <h2 className="slide-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Features &amp; <span className="text-green-600">Amenities</span>
            </h2>
            <p className="text-slate-500 mt-5 text-base leading-7">
              Key project information is grouped with dedicated imagery for quick scanning.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-20">
            {detailSections.map((section, index) => {
              const sectionImage = section.image;
              const imageOnRight = index % 2 === 0;
              const textBlock = (
                <div
                  className={`flex flex-col justify-center ${sectionImage ? "" : "lg:col-span-2 max-w-3xl"}`}
                  data-aos={imageOnRight ? "fade-right" : "fade-left"}
                  data-aos-duration="1000"
                >
                  <div className="group p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-green-200 hover:bg-green-50/40 shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-green-600">Feature {index + 1}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">{section.label}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg leading-8 pl-4 border-l border-green-100">
                      {section.content}
                    </p>
                  </div>
                </div>
              );

              const imageBlock = sectionImage ? (
                <div
                  className="flex justify-center"
                  data-aos={imageOnRight ? "fade-left" : "fade-right"}
                  data-aos-duration="1000"
                >
                  <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
                    <OptimizedImage
                      src={sectionImage}
                      alt={section.label}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
                  </div>
                </div>
              ) : null;

              return (
                <div
                  key={section.key}
                  className={`grid grid-cols-1 ${sectionImage ? "lg:grid-cols-2" : ""} gap-10 lg:gap-16 items-center`}
                >
                  {imageOnRight ? textBlock : imageBlock}
                  {imageOnRight ? imageBlock : textBlock}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* MAIN SECTION */}
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full bg-gradient-to-br from-slate-50 via-white to-green-50/30 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">Project Details</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Overview &amp; <span className="text-green-600">Specification</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-4" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT: IMAGE SLIDER */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 bg-white border border-gray-100 flex-1">
              {photos.length > 0 && (
                <OptimizedImage
                  src={photos[current] || photos[0]}
                  alt="project"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="duration-700"
                />
              )}
              {/* Image counter badge */}
              {photos.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {current + 1} / {photos.length}
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex flex-wrap gap-2 justify-center">
              {photos.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`relative w-14 h-14 overflow-hidden rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    current === i
                      ? "border-green-500 scale-110 shadow-lg shadow-green-200"
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`Project thumbnail ${i + 1}`}
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: SPECIFICATION */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-100 border border-gray-100 p-8 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-1 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-widest">Technical</p>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
                    Specification
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(projectSpecs).filter(([key]) => key !== 'id' && key !== '_id').map(([key, value]) => (
                  <Specs
                    key={key}
                    icon={specIcons[key]}
                    label={
                      key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                    }
                    value={value}
                  />
                ))}
              </div>

              <button
                onClick={() => setEnquiryOpen(true)}
                className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.02] transition-all duration-300 tracking-wide text-sm"
              >
                ⬇ Download Brochure
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION - hidden for now, uncomment to use
      <div className="py-8">
        <ProjectLocationMap project={project} brochureUrl={project.brochure} projectTitle={project.title} />
      </div>
      */}

      {/* FEATURES & AMENITIES */}
      <section
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full bg-white py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-16">
            <span className="text-green-600 text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mt-2">
              Features &amp; <span className="text-green-600">Amenities</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-5" />
            <p className="text-gray-500 mt-4 text-center max-w-xl text-sm leading-relaxed">
              Experience world-class facilities designed for modern living.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[
              { icon: <MdWeekend />, label: "Grand Waiting Lounge" },
              { icon: <MdFitnessCenter />, label: "Gymnasium" },
              { icon: <MdPool />, label: "Rooftop Infinity Pool" },
              { icon: <MdOutdoorGrill />, label: "BBQ Station" },
              { icon: <MdWater />, label: "Water Body" },
              { icon: <MdChildCare />, label: "Children Play Area" },
              { icon: <MdGroups />, label: "Community Space" },
              { icon: <MdDoorbell />, label: "Reception Area" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-center gap-4 bg-white border border-gray-100 rounded-3xl p-8 min-h-[220px] shadow-sm hover:shadow-xl hover:shadow-green-100 hover:border-green-200 hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-green-50/0 to-green-100/0 group-hover:from-green-50/80 group-hover:to-green-100/40 transition-all duration-500 rounded-3xl" />
                <div className="relative w-16 h-16 rounded-2xl bg-green-50 group-hover:bg-green-500 flex items-center justify-center text-4xl text-green-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-green-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <p className="relative text-gray-700 group-hover:text-green-800 font-semibold text-sm text-center leading-snug transition-colors duration-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 py-20">
        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-green-400 text-xs font-bold uppercase tracking-[0.25em] mb-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">Floor Plans</span>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
            Key <span className="text-green-400">Plan</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mt-4" />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleKeyPlanOpen(keyPhotos[index])}
              disabled={!keyPhotos[index]}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:bg-green-500 hover:border-green-500 hover:shadow-green-500/30 transform transition-all duration-300 hover:scale-105 tracking-wide text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-white/10 disabled:hover:border-white/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {btn}
            </button>
          ))}
        </div>
        {/* Modal */}
        {keyPlanOpen && selectedKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
              {/* Close Button */}
              <button
                onClick={handleKeyPlanClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-4xl"
              >
                <IoCloseOutline />
              </button>

              {/* Modal Photo */}
              <div className="relative h-[70dvh] w-full">
              <OptimizedImage
                src={selectedKey}
                alt="Selected"
                objectFit="contain"
                sizes="100vw"
              />
              </div>
            </div>
          </div>
        )}
      </div>
     
      {projectGalleryPhotos.length > 0 && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-green-700">Gallery</p>
              <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl">
                Project Gallery
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                A curated visual collection of the project.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {projectGalleryPhotos.map((photo, i) => (
                <button
                  type="button"
                  onClick={() => handleProjectGalleryOpen(i)}
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-2xl"
                >
                  <OptimizedImage
                    src={photo}
                    alt={`Project gallery ${i + 1}`}
                    className="transition duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                </button>
              ))}
            </div>
          </div>

          {projectGalleryOpen && selectedProjectGallery && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4">
              <button
                onClick={handleProjectGalleryClose}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <IoCloseOutline />
              </button>
              <button
                onClick={handleProjectGalleryPrev}
                className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <div className="relative h-[88vh] w-full max-w-6xl">
              <OptimizedImage
                src={selectedProjectGallery}
                alt="Selected project gallery"
                objectFit="contain"
                sizes="100vw"
              />
              </div>
              <button
                onClick={handleProjectGalleryNext}
                className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </div>
          )}
        </section>
      )}

      <Projects fullWidth />

      {/* ENQUIRY MODAL (from SPECIFICATION button) */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative h-screen overflow-auto scrollbar-hide">
            <button
              onClick={() => setEnquiryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-800 text-4xl"
            >
              <IoCloseOutline />
            </button>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-16 px-4">
              <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                  Enquiry Form <br />
                  <span className="text-gray-700 text-lg">For {project.title}</span>
                </h2>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const apiBase = API_BASE_URL.replace(/\/$/, "");
                  const proxyUrl = `${apiBase}/project/${entityId(project)}/brochure`;
                  const link = document.createElement("a");
                  link.href = proxyUrl;
                  link.download = `${project.title || "Brochure"}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setEnquiryOpen(false);
                }}>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                    <input type="text" placeholder="Enter your full name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                    <input type="email" placeholder="Enter your email address" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Contact Address</label>
                    <textarea placeholder="Enter your contact address" rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:bg-green-700 hover:scale-105">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Specs({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50/80 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl px-4 py-3.5 transition-all duration-200 group">
      <div className="pt-0.5 text-2xl text-green-500 group-hover:text-green-600 shrink-0 transition-colors">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-gray-800 font-bold text-sm mt-1 leading-6 break-words whitespace-normal">
          {value}
        </p>
      </div>
    </div>
  );
}
