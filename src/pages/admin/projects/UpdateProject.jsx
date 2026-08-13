import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdArrowBack, MdSyncAlt } from "react-icons/md";
import { useProjectStore } from "../../../store/project/projectStore";
import { getProjectById } from "../../../store/project/projectApi";
import { uploadFiles, uploadSingle } from "../../../utils/cloudinaryUpload";
import {
  FileInput,
  FeatureSectionEditor,
  ProjectSubmitOverlay,
  PreviewGrid,
  SingleImagePreview,
  BrochurePdfInput,
  ExistingBrochureLink,
  cardClass,
  inputClass,
  labelClass,
  sectionTitleClass,
} from "./projectFormUi";
import {
  floorPlanFields,
  formatProjectFieldLabel,
  projectDescriptionDefaults,
  projectDescriptionFields,
  projectSectionImageDefaults,
  projectSpecsDefaults,
} from "./projectFieldConfig";

const keyPhotoDefaults = floorPlanFields.reduce((acc, field) => ({ ...acc, [field.key]: null }), {});

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, isLoading } = useProjectStore();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Upcoming");

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [slideImages, setSlideImages] = useState([]);
  const [slidePreviews, setSlidePreviews] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [projectGalleryImages, setProjectGalleryImages] = useState([]);
  const [projectGalleryPreviews, setProjectGalleryPreviews] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [mapLocationPreviews, setMapLocationPreviews] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [existingSlideImages, setExistingSlideImages] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);
  const [existingProjectGalleryImages, setExistingProjectGalleryImages] = useState([]);
  const [existingMapLocations, setExistingMapLocations] = useState([]);

  const [keyPhotoUrls, setKeyPhotoUrls] = useState(keyPhotoDefaults);
  const [keyPhotoFiles, setKeyPhotoFiles] = useState(keyPhotoDefaults);
  const [keyPhotoPreviews, setKeyPhotoPreviews] = useState(keyPhotoDefaults);

  const [sectionImageUrls, setSectionImageUrls] = useState(projectSectionImageDefaults);
  const [sectionImageFiles, setSectionImageFiles] = useState(projectSectionImageDefaults);
  const [sectionImagePreviews, setSectionImagePreviews] = useState(projectSectionImageDefaults);

  const [brochureFile, setBrochureFile] = useState(null);
  const [existingBrochureUrl, setExistingBrochureUrl] = useState(null);
  const [description, setDescription] = useState(projectDescriptionDefaults);
  const [specs, setSpecs] = useState(projectSpecsDefaults);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  const safeRevoke = (url) => {
    if (typeof url === "string" && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const revokeUrls = (urls) => {
    urls.forEach((url) => safeRevoke(url));
  };

  useEffect(
    () => () => {
      revokeUrls(imagePreviews);
      revokeUrls(slidePreviews);
      revokeUrls(galleryPreviews);
      revokeUrls(projectGalleryPreviews);
      revokeUrls(mapLocationPreviews);
      revokeUrls(Object.values(keyPhotoPreviews));
      revokeUrls(Object.values(sectionImagePreviews));
    },
    [imagePreviews, slidePreviews, galleryPreviews, projectGalleryPreviews, mapLocationPreviews, keyPhotoPreviews, sectionImagePreviews]
  );

  useEffect(() => {
    let ignore = false;

    const loadProject = async () => {
      try {
        setLoading(true);
        const fromStore = projects.find((project) => project._id === id);
        const project = fromStore || (await getProjectById(id))?.data;

        if (!project || ignore) return;

        setTitle(project.title || "");
        setLocation(project.location || "");
        setStatus(project.status || "Upcoming");
        setDescription({ ...projectDescriptionDefaults, ...(project.description || {}) });
        setSpecs({ ...projectSpecsDefaults, ...(project.specs || {}) });

        setExistingImages(project.image || []);
        setExistingSlideImages(project.slideImage || []);
        setExistingGalleryImages(project.galleryImages || []);
        setExistingProjectGalleryImages(project.projectGalleryImages || []);
        setExistingMapLocations(project.mapLocation || []);
        setExistingBrochureUrl(project.brochure || null);

        const nextKeyPhotos = { ...keyPhotoDefaults, ...(project.keyPhotos || {}) };
        setKeyPhotoUrls(nextKeyPhotos);
        setKeyPhotoFiles(keyPhotoDefaults);
        setKeyPhotoPreviews(nextKeyPhotos);

        const nextSectionImages = { ...projectSectionImageDefaults, ...(project.sectionImages || {}) };
        setSectionImageUrls(nextSectionImages);
        setSectionImageFiles(projectSectionImageDefaults);
        setSectionImagePreviews(nextSectionImages);
      } catch {
        if (!ignore) toast.error("Project not found");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProject();

    return () => {
      ignore = true;
    };
  }, [id, projects]);

  const handleMultiImageChange = (event, setFiles, setPreviews, currentPreviews) => {
    const selectedFiles = Array.from(event.target.files || []);
    revokeUrls(currentPreviews);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    event.target.value = "";
  };

  const removeMultiImage = (index, files, previews, setFiles, setPreviews) => {
    safeRevoke(previews[index]);
    setFiles(files.filter((_, fileIndex) => fileIndex !== index));
    setPreviews(previews.filter((_, previewIndex) => previewIndex !== index));
  };

  const handleObjectImageChange = (event, key, setFiles, setPreviews, currentPreview) => {
    const file = event.target.files?.[0] || null;
    safeRevoke(currentPreview);
    setFiles((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: file ? URL.createObjectURL(file) : null }));
    event.target.value = "";
  };

  const removeSectionImage = (key) => {
    safeRevoke(sectionImagePreviews[key]);
    setSectionImageFiles((prev) => ({ ...prev, [key]: null }));
    setSectionImageUrls((prev) => ({ ...prev, [key]: null }));
    setSectionImagePreviews((prev) => ({ ...prev, [key]: null }));
  };

  const removeKeyPhoto = (key) => {
    safeRevoke(keyPhotoPreviews[key]);
    setKeyPhotoFiles((prev) => ({ ...prev, [key]: null }));
    setKeyPhotoUrls((prev) => ({ ...prev, [key]: null }));
    setKeyPhotoPreviews((prev) => ({ ...prev, [key]: null }));
  };

  const handleDescriptionChange = (key, value) => {
    setDescription((prev) => ({ ...prev, [key]: value }));
  };

  const handleSpecChange = (key, value) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

  const setSubmissionStage = (title, detail, step) => {
    setSubmitState({ active: true, title, detail, step });
  };

  const countSelectedObjectFiles = (value) => Object.values(value).filter(Boolean).length;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const replacementMediaCount =
        images.length + slideImages.length + galleryImages.length + projectGalleryImages.length + mapLocations.length + (brochureFile ? 1 : 0);
      const detailReplacementCount =
        countSelectedObjectFiles(keyPhotoFiles) + countSelectedObjectFiles(sectionImageFiles);

      setSubmissionStage(
        "Preparing project update",
        "We are checking the replacement files and getting the update queue ready.",
        0
      );

      if (replacementMediaCount > 0) {
        setSubmissionStage(
          "Uploading replacement media",
          `${replacementMediaCount} new media file${replacementMediaCount > 1 ? "s are" : " is"} being uploaded for this project.`,
          1
        );
      }

      const [newImageUrls, newSlideUrls, newGalleryUrls, newProjectGalleryUrls, newMapUrls, newBrochure] = await Promise.all([
        images.length > 0 ? uploadFiles(images) : Promise.resolve(null),
        slideImages.length > 0 ? uploadFiles(slideImages) : Promise.resolve(null),
        galleryImages.length > 0 ? uploadFiles(galleryImages, "projects/gallery") : Promise.resolve(null),
        projectGalleryImages.length > 0 ? uploadFiles(projectGalleryImages, "projects/project-gallery") : Promise.resolve(null),
        mapLocations.length > 0 ? uploadFiles(mapLocations) : Promise.resolve(null),
        brochureFile ? uploadSingle(brochureFile, "projects/brochures") : Promise.resolve(null),
      ]);

      if (detailReplacementCount > 0) {
        setSubmissionStage(
          "Uploading updated section visuals",
          `${detailReplacementCount} floor plan or feature image${detailReplacementCount > 1 ? "s are" : " is"} being refreshed.`,
          1
        );
      }

      const keyPhotoEntries = await Promise.all(
        floorPlanFields.map(async ({ key }) => [key, keyPhotoFiles[key] ? await uploadSingle(keyPhotoFiles[key]) : keyPhotoUrls[key]])
      );
      const sectionImageEntries = await Promise.all(
        projectDescriptionFields.map(async ({ key }) => [
          key,
          sectionImageFiles[key] ? await uploadSingle(sectionImageFiles[key]) : sectionImageUrls[key],
        ])
      );

      const data = {
        title,
        location,
        status,
        description,
        specs,
        keyPhotos: Object.fromEntries(keyPhotoEntries),
        sectionImages: Object.fromEntries(sectionImageEntries),
        ...(newImageUrls && { image: newImageUrls }),
        ...(newSlideUrls && { slideImage: newSlideUrls }),
        ...(newGalleryUrls && { galleryImages: newGalleryUrls }),
        ...(newProjectGalleryUrls && { projectGalleryImages: newProjectGalleryUrls }),
        ...(newMapUrls && { mapLocation: newMapUrls }),
        ...(newBrochure && { brochure: newBrochure }),
      };

      setSubmissionStage(
        "Saving project changes",
        "Uploads are finished. The dashboard is now updating the project data.",
        2
      );

      await updateProject(id, data);
      setSubmissionStage(
        "Project updated successfully",
        "Everything is saved. Redirecting you back to the project list.",
        2
      );
      toast.success("Project updated!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewProjects");
    } catch (error) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(error?.response?.data?.message || "Failed to update project");
    }
  };

  const ExistingImageStrip = ({ title, images: items }) =>
    items.length > 0 ? (
      <div className="space-y-2">
        <p className={labelClass}>{title}</p>
        <div className="flex flex-wrap gap-3">
          {items.map((image, index) => (
            <img
              key={`${title}-${index}`}
              src={image}
              alt={title}
              className="h-20 w-24 rounded-2xl border border-slate-200 object-cover"
            />
          ))}
        </div>
      </div>
    ) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500" />
      </div>
    );
  }

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
      />

      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-amber-200 bg-[linear-gradient(135deg,#111827_0%,#1f2937_48%,#fff7ed_48.1%,#fffbeb_100%)] shadow-[0_30px_120px_-60px_rgba(17,24,39,0.7)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200">Edit Project</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Update Content And Matching Images
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200/80">
                  Replace gallery assets, tune the copy, and control which image appears beside each feature section.
                </p>
              </div>
              <div className="rounded-[28px] border border-amber-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <MdSyncAlt size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Live Replace</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      New uploads replace old assets, while unchanged items stay exactly as they are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className={`${cardClass} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Project Basics</p>
              <h2 className="text-2xl font-bold text-slate-900">Core Information</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Project Title</label>
              <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClass}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Ready">Ready</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Location / Map URL</label>
              <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} className={inputClass} />
            </div>
          </div>
        </section>

        <section className={`${cardClass} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Media Library</p>
              <h2 className="text-2xl font-bold text-slate-900">Current & Replacement Files</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Existing media is shown below. Select new files only when you want to replace the current set.
            </p>
          </div>

          <ExistingImageStrip title="Current Project Images" images={existingImages} />
          <ExistingImageStrip title="Current Slide Images" images={existingSlideImages} />
          <ExistingImageStrip title="Current Visual Tour Gallery Images" images={existingGalleryImages} />
          <ExistingImageStrip title="Current Project Gallery Images" images={existingProjectGalleryImages} />
          <ExistingImageStrip title="Current Map Images" images={existingMapLocations} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FileInput
              label="Replace Project Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setImages, setImagePreviews, imagePreviews)}
              value={images}
              helperText="This replaces the current project image set"
            />
            <FileInput
              label="Replace Slide Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setSlideImages, setSlidePreviews, slidePreviews)}
              value={slideImages}
              helperText="This replaces the hero slider images"
            />
            <FileInput
              label="Replace Visual Tour Gallery Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setGalleryImages, setGalleryPreviews, galleryPreviews)}
              value={galleryImages}
              helperText="This replaces only the Photo Gallery section"
            />
            <FileInput
              label="Replace Project Gallery Images"
              multiple
              accept="image/*"
              onChange={(event) =>
                handleMultiImageChange(event, setProjectGalleryImages, setProjectGalleryPreviews, projectGalleryPreviews)
              }
              value={projectGalleryImages}
              helperText="This replaces only the Project Gallery section"
            />
            <FileInput
              label="Replace Map Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setMapLocations, setMapLocationPreviews, mapLocationPreviews)}
              value={mapLocations}
              helperText="This replaces the current map image set"
            />
            <div className="space-y-2">
              <ExistingBrochureLink url={existingBrochureUrl} />
              <BrochurePdfInput
                file={brochureFile}
                onChange={(event) => setBrochureFile(event.target.files?.[0] || null)}
              />
            </div>
          </div>

          <PreviewGrid
            title="New Project Image Preview"
            previews={imagePreviews}
            onRemove={(index) => removeMultiImage(index, images, imagePreviews, setImages, setImagePreviews)}
          />
          <PreviewGrid
            title="New Slide Image Preview"
            previews={slidePreviews}
            onRemove={(index) => removeMultiImage(index, slideImages, slidePreviews, setSlideImages, setSlidePreviews)}
          />
          <PreviewGrid
            title="New Visual Tour Gallery Preview"
            previews={galleryPreviews}
            onRemove={(index) => removeMultiImage(index, galleryImages, galleryPreviews, setGalleryImages, setGalleryPreviews)}
          />
          <PreviewGrid
            title="New Project Gallery Preview"
            previews={projectGalleryPreviews}
            onRemove={(index) =>
              removeMultiImage(index, projectGalleryImages, projectGalleryPreviews, setProjectGalleryImages, setProjectGalleryPreviews)
            }
          />
          <PreviewGrid
            title="New Map Image Preview"
            previews={mapLocationPreviews}
            onRemove={(index) => removeMultiImage(index, mapLocations, mapLocationPreviews, setMapLocations, setMapLocationPreviews)}
          />
        </section>

        <section className={`${cardClass} space-y-6`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Feature Storytelling</p>
              <h2 className="text-2xl font-bold text-slate-900">Descriptions With Matching Images</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Each feature section has its own image slot. Replace or remove them independently.
            </p>
          </div>

          <div className="space-y-6">
            {projectDescriptionFields.map((field, index) => (
              <FeatureSectionEditor
                key={field.key}
                field={field}
                value={description[field.key]}
                onTextChange={handleDescriptionChange}
                preview={sectionImagePreviews[field.key]}
                onFileChange={(event) =>
                  handleObjectImageChange(
                    event,
                    field.key,
                    setSectionImageFiles,
                    setSectionImagePreviews,
                    sectionImagePreviews[field.key]
                  )
                }
                onRemoveImage={() => removeSectionImage(field.key)}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </section>

        <section className={`${cardClass} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Floor Plans</p>
              <h2 className="text-2xl font-bold text-slate-900">Key Plan Images</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Replace or remove individual floor plans from here.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {floorPlanFields.map((field) => (
              <div key={field.key} className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                <FileInput
                  label={field.label}
                  accept="image/*"
                  onChange={(event) =>
                    handleObjectImageChange(
                      event,
                      field.key,
                      setKeyPhotoFiles,
                      setKeyPhotoPreviews,
                      keyPhotoPreviews[field.key]
                    )
                  }
                  value={keyPhotoFiles[field.key]}
                  helperText="Replace only if needed"
                />
                <div className="mt-4">
                  <SingleImagePreview
                    title={`${field.label} Preview`}
                    preview={keyPhotoPreviews[field.key]}
                    onRemove={() => removeKeyPhoto(field.key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${cardClass} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Specifications</p>
              <h2 className="text-2xl font-bold text-slate-900">Technical Information</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Object.keys(specs).map((key) => (
              <div key={key}>
                <label className={labelClass}>{formatProjectFieldLabel(key)}</label>
                <input
                  type="text"
                  value={specs[key] || ""}
                  onChange={(event) => handleSpecChange(key, event.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </section>

          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Save Changes</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Updated feature images will appear beside the matching sections on the public details page.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitState.active || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:from-amber-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState.active || isLoading ? <FaSpinner className="animate-spin" /> : null}
              {submitState.active ? "Uploading And Updating..." : isLoading ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;
