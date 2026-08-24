import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCommercialProjectStore } from "../../../store/commercialProject/commercialProjectStore";
import { MdAdd, MdDelete, MdArrowBack } from "react-icons/md";

const CreateCommercialProject = () => {
  const navigate = useNavigate();
  const { addCommercialProject, isLoading } = useCommercialProjectStore();

  const [formData, setFormData] = useState({
    heroTitle: "", heroSubtitle: "", heroDescription: "", heroBadge: "", heroMarqueeText: "",
    overviewTitle: "", overviewDescription: "", overviewStatusBadge: "", overviewStatusLabel: "",
    signatureSubtitle: "", signatureTitle: "", signatureDescription: "",
    highlightsTitle: "", highlightsSubtitle: "",
    architectureTitle: "", architectureDescription: "",
    workspaceTitle: "", workspaceDescription: "",
    galleryTitle: "",
    videoTitle: "", videoDescription: "", videoUrl: "",
    specsTitle: "",
    locationTitle: "", locationDescription: "",
    ctaTitle: "", ctaDescription: "",
  });

  const [files, setFiles] = useState({
    heroImage: null, overviewImage: null, architectureImage1: null, architectureImage2: null,
    galleryImages: [], videoThumbnail: null, mapImage: null
  });

  const [stats, setStats] = useState([{ value: "", label: "" }]);
  const [highlights, setHighlights] = useState([{ title: "", desc: "" }]);
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);
  const [locationBenefits, setLocationBenefits] = useState([""]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === "galleryImages") {
      setFiles((prev) => ({ ...prev, galleryImages: Array.from(selectedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleArrayChange = (setter, index, field, value) => {
    setter((prev) => {
      const newArray = [...prev];
      if (typeof newArray[index] === 'object' && newArray[index] !== null) {
        newArray[index] = { ...newArray[index], [field]: value };
      } else {
        newArray[index] = value;
      }
      return newArray;
    });
  };

  const addArrayItem = (setter, emptyItem) => setter((prev) => [...prev, emptyItem]);
  const removeArrayItem = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    
    data.append("stats", JSON.stringify(stats));
    data.append("highlights", JSON.stringify(highlights));
    data.append("specs", JSON.stringify(specs));
    data.append("locationBenefits", JSON.stringify(locationBenefits));

    Object.keys(files).forEach((key) => {
      if (key === "galleryImages") {
        files[key].forEach((file) => data.append("galleryImages", file));
      } else if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {
      await addCommercialProject(data);
      toast.success("Commercial Project Created Successfully");
      navigate("/adminDashboard/viewCommercialProject");
    } catch (error) {
      toast.error("Failed to create commercial project");
    }
  };

  const inputClass = "w-full rounded-md border border-gray-300 p-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";
  const sectionClass = "mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm";
  const sectionTitleClass = "mb-4 text-lg font-semibold text-gray-800 border-b pb-2";

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Create Commercial Project</h1>
        <button type="button" onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
          <MdArrowBack className="mr-1" /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Hero Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Hero Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Title</label><input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Subtitle</label><input type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInputChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea name="heroDescription" value={formData.heroDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
            <div><label className={labelClass}>Badge</label><input type="text" name="heroBadge" value={formData.heroBadge} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Marquee Text</label><input type="text" name="heroMarqueeText" value={formData.heroMarqueeText} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Hero Image</label><input type="file" name="heroImage" onChange={handleFileChange} className={inputClass} /></div>
          </div>
        </div>

        {/* Stats */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Stats</h2>
          {stats.map((stat, i) => (
            <div key={i} className="mb-2 flex items-center gap-2">
              <input type="text" placeholder="Value" value={stat.value} onChange={(e) => handleArrayChange(setStats, i, "value", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Label" value={stat.label} onChange={(e) => handleArrayChange(setStats, i, "label", e.target.value)} className={inputClass} />
              <button type="button" onClick={() => removeArrayItem(setStats, i)} className="text-red-500"><MdDelete size={24} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setStats, { value: "", label: "" })} className="mt-2 flex items-center text-sky-600"><MdAdd /> Add Stat</button>
        </div>

        {/* Overview */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Overview Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Title</label><input type="text" name="overviewTitle" value={formData.overviewTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Status Badge</label><input type="text" name="overviewStatusBadge" value={formData.overviewStatusBadge} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Status Label</label><input type="text" name="overviewStatusLabel" value={formData.overviewStatusLabel} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Overview Image</label><input type="file" name="overviewImage" onChange={handleFileChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea name="overviewDescription" value={formData.overviewDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
          </div>
        </div>

        {/* Signature */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Signature Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Subtitle</label><input type="text" name="signatureSubtitle" value={formData.signatureSubtitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Title</label><input type="text" name="signatureTitle" value={formData.signatureTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea name="signatureDescription" value={formData.signatureDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
          </div>
        </div>

        {/* Highlights */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Highlights</h2>
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Highlights Title</label><input type="text" name="highlightsTitle" value={formData.highlightsTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Highlights Subtitle</label><input type="text" name="highlightsSubtitle" value={formData.highlightsSubtitle} onChange={handleInputChange} className={inputClass} /></div>
          </div>
          {highlights.map((h, i) => (
            <div key={i} className="mb-2 flex items-start gap-2">
              <div className="flex-1 space-y-2">
                <input type="text" placeholder="Title" value={h.title} onChange={(e) => handleArrayChange(setHighlights, i, "title", e.target.value)} className={inputClass} />
                <textarea placeholder="Description" value={h.desc} onChange={(e) => handleArrayChange(setHighlights, i, "desc", e.target.value)} className={inputClass} rows={2}></textarea>
              </div>
              <button type="button" onClick={() => removeArrayItem(setHighlights, i)} className="text-red-500 mt-2"><MdDelete size={24} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setHighlights, { title: "", desc: "" })} className="mt-2 flex items-center text-sky-600"><MdAdd /> Add Highlight</button>
        </div>

        {/* Architecture & Workspace */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Architecture & Workspace</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Architecture Title</label><input type="text" name="architectureTitle" value={formData.architectureTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Workspace Title</label><input type="text" name="workspaceTitle" value={formData.workspaceTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Architecture Description</label><textarea name="architectureDescription" value={formData.architectureDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
            <div><label className={labelClass}>Workspace Description</label><textarea name="workspaceDescription" value={formData.workspaceDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
            <div><label className={labelClass}>Architecture Image 1</label><input type="file" name="architectureImage1" onChange={handleFileChange} className={inputClass} /></div>
            <div><label className={labelClass}>Architecture Image 2</label><input type="file" name="architectureImage2" onChange={handleFileChange} className={inputClass} /></div>
          </div>
        </div>

        {/* Gallery */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Gallery</h2>
          <div className="mb-4">
            <label className={labelClass}>Gallery Title</label>
            <input type="text" name="galleryTitle" value={formData.galleryTitle} onChange={handleInputChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gallery Images (Multiple)</label>
            <input type="file" name="galleryImages" multiple onChange={handleFileChange} className={inputClass} />
          </div>
        </div>

        {/* Video */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Video Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Video Title</label><input type="text" name="videoTitle" value={formData.videoTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Video URL</label><input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Video Description</label><textarea name="videoDescription" value={formData.videoDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
            <div><label className={labelClass}>Video Thumbnail</label><input type="file" name="videoThumbnail" onChange={handleFileChange} className={inputClass} /></div>
          </div>
        </div>

        {/* Specs */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Specs</h2>
          <div className="mb-4">
            <label className={labelClass}>Specs Title</label>
            <input type="text" name="specsTitle" value={formData.specsTitle} onChange={handleInputChange} className={inputClass} />
          </div>
          {specs.map((spec, i) => (
            <div key={i} className="mb-2 flex items-center gap-2">
              <input type="text" placeholder="Label" value={spec.label} onChange={(e) => handleArrayChange(setSpecs, i, "label", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Value" value={spec.value} onChange={(e) => handleArrayChange(setSpecs, i, "value", e.target.value)} className={inputClass} />
              <button type="button" onClick={() => removeArrayItem(setSpecs, i)} className="text-red-500"><MdDelete size={24} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setSpecs, { label: "", value: "" })} className="mt-2 flex items-center text-sky-600"><MdAdd /> Add Spec</button>
        </div>

        {/* Location */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Location</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>Location Title</label><input type="text" name="locationTitle" value={formData.locationTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div><label className={labelClass}>Map Image</label><input type="file" name="mapImage" onChange={handleFileChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Location Description</label><textarea name="locationDescription" value={formData.locationDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Location Benefits</label>
            {locationBenefits.map((ben, i) => (
              <div key={i} className="mb-2 flex items-center gap-2">
                <input type="text" placeholder="Benefit" value={ben} onChange={(e) => handleArrayChange(setLocationBenefits, i, null, e.target.value)} className={inputClass} />
                <button type="button" onClick={() => removeArrayItem(setLocationBenefits, i)} className="text-red-500"><MdDelete size={24} /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem(setLocationBenefits, "")} className="mt-2 flex items-center text-sky-600"><MdAdd /> Add Benefit</button>
          </div>
        </div>

        {/* CTA */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>Call to Action</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass}>CTA Title</label><input type="text" name="ctaTitle" value={formData.ctaTitle} onChange={handleInputChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>CTA Description</label><textarea name="ctaDescription" value={formData.ctaDescription} onChange={handleInputChange} className={inputClass} rows={3}></textarea></div>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="mb-8 w-full rounded-md bg-sky-600 p-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-50">
          {isLoading ? "Creating..." : "Create Commercial Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateCommercialProject;
