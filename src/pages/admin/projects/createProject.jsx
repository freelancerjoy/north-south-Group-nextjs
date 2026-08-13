import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdArrowBack, MdOutlinePhotoLibrary } from "react-icons/md";
import { useProjectStore } from "../../../store/project/projectStore";
import { uploadFiles, uploadSingle } from "../../../utils/cloudinaryUpload";
import {
  FileInput,
  FeatureSectionEditor,
  ProjectSubmitOverlay,
  PreviewGrid,
  SingleImagePreview,
  BrochurePdfInput,
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

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject, loadProjects, isLoading } = useProjectStore();

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

  const [keyPhotoFiles, setKeyPhotoFiles] = useState(
    floorPlanFields.reduce((acc, field) => ({ ...acc, [field.key]: null }), {})
  );
  const [keyPhotoPreviews, setKeyPhotoPreviews] = useState(
    floorPlanFields.reduce((acc, field) => ({ ...acc, [field.key]: null }), {})
  );

  const [sectionImageFiles, setSectionImageFiles] = useState(projectSectionImageDefaults);
  const [sectionImagePreviews, setSectionImagePreviews] = useState(projectSectionImageDefaults);

  const [brochureFile, setBrochureFile] = useState(null);
  const [description, setDescription] = useState(projectDescriptionDefaults);
  const [specs, setSpecs] = useState(projectSpecsDefaults);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  const revokeUrls = (urls) => {
    urls.filter(Boolean).forEach((url) => URL.revokeObjectURL(url));
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

  const handleMultiImageChange = (event, setFiles, setPreviews, currentPreviews) => {
    const selectedFiles = Array.from(event.target.files || []);
    revokeUrls(currentPreviews);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    event.target.value = "";
  };

  const removeMultiImage = (index, files, previews, setFiles, setPreviews) => {
    if (previews[index]) URL.revokeObjectURL(previews[index]);
    setFiles(files.filter((_, fileIndex) => fileIndex !== index));
    setPreviews(previews.filter((_, previewIndex) => previewIndex !== index));
  };

  const handleObjectImageChange = (event, key, setFiles, setPreviews, currentPreview) => {
    const file = event.target.files?.[0] || null;
    if (currentPreview) URL.revokeObjectURL(currentPreview);
    setFiles((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: file ? URL.createObjectURL(file) : null }));
    event.target.value = "";
  };

  const removeObjectImage = (key, setFiles, setPreviews, currentPreview) => {
    if (currentPreview) URL.revokeObjectURL(currentPreview);
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: null }));
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
      const mainMediaCount =
        images.length + slideImages.length + galleryImages.length + projectGalleryImages.length + mapLocations.length + (brochureFile ? 1 : 0);
      const detailMediaCount =
        countSelectedObjectFiles(keyPhotoFiles) + countSelectedObjectFiles(sectionImageFiles);

      setSubmissionStage(
        "Preparing project upload",
        "We are checking your files and getting the upload queue ready.",
        0
      );

      if (mainMediaCount > 0) {
        setSubmissionStage(
          "Uploading gallery and brochure files",
          `${mainMediaCount} media file${mainMediaCount > 1 ? "s are" : " is"} being uploaded to Cloudinary.`,
          1
        );
      }

      const [imageUrls, slideImageUrls, galleryImageUrls, projectGalleryImageUrls, mapLocationUrls, brochureUrl] = await Promise.all([
        uploadFiles(images),
        uploadFiles(slideImages),
        uploadFiles(galleryImages, "projects/gallery"),
        uploadFiles(projectGalleryImages, "projects/project-gallery"),
        uploadFiles(mapLocations),
        uploadSingle(brochureFile, "projects/brochures"),
      ]);

      if (detailMediaCount > 0) {
        setSubmissionStage(
          "Uploading feature and floor plan images",
          `${detailMediaCount} section image${detailMediaCount > 1 ? "s are" : " is"} being prepared for the project details page.`,
          1
        );
      }

      const keyPhotoEntries = await Promise.all(
        floorPlanFields.map(async ({ key }) => [key, await uploadSingle(keyPhotoFiles[key])])
      );
      const sectionImageEntries = await Promise.all(
        projectDescriptionFields.map(async ({ key }) => [key, await uploadSingle(sectionImageFiles[key])])
      );

      const data = {
        title,
        location,
        status,
        image: imageUrls,
        slideImage: slideImageUrls,
        galleryImages: galleryImageUrls,
        projectGalleryImages: projectGalleryImageUrls,
        mapLocation: mapLocationUrls,
        keyPhotos: Object.fromEntries(keyPhotoEntries),
        brochure: brochureUrl,
        description,
        sectionImages: Object.fromEntries(sectionImageEntries),
        specs,
      };

      setSubmissionStage(
        "Saving the new project",
        "Uploads are done. The dashboard is now saving the project details.",
        2
      );

      await addProject(data);
      setSubmissionStage(
        "Project created successfully",
        "Everything is saved. Taking you back to the project list now.",
        2
      );
      toast.success("Project created successfully!");
      await loadProjects();
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewProjects");
    } catch (error) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(error?.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="create"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
      />

      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-emerald-200 bg-[linear-gradient(135deg,#06291f_0%,#0f5132_48%,#ecfdf3_48.1%,#f8fffb_100%)] shadow-[0_30px_120px_-60px_rgba(6,41,31,0.65)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-200">Admin Studio</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Create A Rich Project Story
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/80">
                  Build a better looking project page with paired content and images for every important feature section.
                </p>
              </div>
              <div className="rounded-[28px] border border-emerald-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <MdOutlinePhotoLibrary size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">New Layout</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Each feature now supports its own dedicated image beside the text.
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
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Start with the project identity, address, and status. This will be shown throughout the public pages.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={inputClass}
                placeholder="North South Premium Residency"
                required
              />
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
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className={inputClass}
                placeholder="Google Maps URL or project location"
              />
            </div>
          </div>
        </section>

        <section className={`${cardClass} space-y-5`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={sectionTitleClass}>Media Library</p>
              <h2 className="text-2xl font-bold text-slate-900">Gallery, Slider & Files</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Slide images are used in the top hero carousel. Visual Tour images are separate, so your gallery can show different project photos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FileInput
              label="Project Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setImages, setImagePreviews, imagePreviews)}
              value={images}
              helperText="Shown in gallery and overview image slider"
            />
            <FileInput
              label="Slide Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setSlideImages, setSlidePreviews, slidePreviews)}
              value={slideImages}
              helperText="Used in the top hero carousel"
            />
            <FileInput
              label="Visual Tour Gallery Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setGalleryImages, setGalleryPreviews, galleryPreviews)}
              value={galleryImages}
              helperText="Shown only in the Photo Gallery section"
            />
            <FileInput
              label="Project Gallery Images"
              multiple
              accept="image/*"
              onChange={(event) =>
                handleMultiImageChange(event, setProjectGalleryImages, setProjectGalleryPreviews, projectGalleryPreviews)
              }
              value={projectGalleryImages}
              helperText="Shown in the separate Project Gallery section"
            />
            <FileInput
              label="Map Location Images"
              multiple
              accept="image/*"
              onChange={(event) => handleMultiImageChange(event, setMapLocations, setMapLocationPreviews, mapLocationPreviews)}
              value={mapLocations}
              helperText="Optional location and nearby visuals"
            />
            <BrochurePdfInput
              file={brochureFile}
              onChange={(event) => setBrochureFile(event.target.files?.[0] || null)}
            />
          </div>

          <PreviewGrid
            title="Project Image Preview"
            previews={imagePreviews}
            onRemove={(index) => removeMultiImage(index, images, imagePreviews, setImages, setImagePreviews)}
          />
          <PreviewGrid
            title="Slide Image Preview"
            previews={slidePreviews}
            onRemove={(index) => removeMultiImage(index, slideImages, slidePreviews, setSlideImages, setSlidePreviews)}
          />
          <PreviewGrid
            title="Visual Tour Gallery Preview"
            previews={galleryPreviews}
            onRemove={(index) => removeMultiImage(index, galleryImages, galleryPreviews, setGalleryImages, setGalleryPreviews)}
          />
          <PreviewGrid
            title="Project Gallery Preview"
            previews={projectGalleryPreviews}
            onRemove={(index) =>
              removeMultiImage(index, projectGalleryImages, projectGalleryPreviews, setProjectGalleryImages, setProjectGalleryPreviews)
            }
          />
          <PreviewGrid
            title="Map Location Preview"
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
              These sections are rendered on the details page in alternating left and right layout. Upload the exact image that should sit beside each feature.
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
                onRemoveImage={() =>
                  removeObjectImage(field.key, setSectionImageFiles, setSectionImagePreviews, sectionImagePreviews[field.key])
                }
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
              Upload the individual floor plan visuals that appear in the floor plan modal section.
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
                  helperText="Used in the floor plan pop-up"
                />
                <div className="mt-4">
                  <SingleImagePreview
                    title={`${field.label} Preview`}
                    preview={keyPhotoPreviews[field.key]}
                    onRemove={() =>
                      removeObjectImage(field.key, setKeyPhotoFiles, setKeyPhotoPreviews, keyPhotoPreviews[field.key])
                    }
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
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              These values are shown in the project specification panel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Object.keys(specs).map((key) => (
              <div key={key}>
                <label className={labelClass}>{formatProjectFieldLabel(key)}</label>
                <input
                  type="text"
                  value={specs[key]}
                  onChange={(event) => handleSpecChange(key, event.target.value)}
                  className={inputClass}
                  placeholder={formatProjectFieldLabel(key)}
                />
              </div>
            ))}
          </div>
        </section>

          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">Ready To Publish</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The public details page will use the exact section images and text blocks you entered above.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitState.active || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:from-emerald-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState.active || isLoading ? <FaSpinner className="animate-spin" /> : null}
              {submitState.active ? "Uploading And Saving..." : isLoading ? "Creating Project..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
