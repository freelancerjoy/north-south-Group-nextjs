import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../store/project/projectStore";
import { MdArrowBack, MdLocationOn, MdCalendarToday } from "react-icons/md";

const InfoRow = ({ label, value }) => value ? (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-sm text-slate-700 font-medium">{value}</span>
  </div>
) : null;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projectDetails, isLoading, loadProjectDetails, clearProjectDetails } = useProjectStore();

  useEffect(() => {
    loadProjectDetails(id);
    return () => clearProjectDetails();
  }, [id, loadProjectDetails, clearProjectDetails]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;
  if (!projectDetails) return <div className="flex items-center justify-center py-20 text-slate-400">Project not found</div>;

  const p = projectDetails;
  const statusColor = p.status === "Ready" ? "bg-emerald-100 text-emerald-700" : p.status === "Ongoing" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-800 truncate">{p.title}</h1>
          <p className="text-slate-400 text-sm">Project Details</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColor}`}>{p.status}</span>
        {p.location && (
          <a href={p.location} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-sm font-semibold transition-colors">
            <MdLocationOn size={16} /> View Map
          </a>
        )}
      </div>

      {/* Images */}
      {p.image?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Project Images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.image.map((img, i) => <img key={i} src={img} alt="" className="w-full h-44 object-cover rounded-xl" />)}
          </div>
        </div>
      )}

      {/* Specs */}
      {p.specs && Object.keys(p.specs).length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Specifications</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Object.entries(p.specs).map(([k, v]) => v ? <InfoRow key={k} label={k.replace(/([A-Z])/g, " $1")} value={v} /> : null)}
          </div>
        </div>
      )}

      {/* Description */}
      {p.description && Object.keys(p.description).length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Description</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(p.description).map(([k, v]) => v ? (
              <div key={k}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{k.replace(/([A-Z])/g, " $1")}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{v}</p>
              </div>
            ) : null)}
          </div>
        </div>
      )}

      {/* Slide Images */}
      {p.slideImage?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Slide Images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.slideImage.map((img, i) => <img key={i} src={img} alt="" className="w-full h-44 object-cover rounded-xl" />)}
          </div>
        </div>
      )}

      {/* Visual Tour Gallery Images */}
      {p.galleryImages?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Visual Tour Gallery Images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.galleryImages.map((img, i) => <img key={i} src={img} alt="" className="w-full h-44 object-cover rounded-xl" />)}
          </div>
        </div>
      )}

      {/* Project Gallery Images */}
      {p.projectGalleryImages?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Project Gallery Images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.projectGalleryImages.map((img, i) => <img key={i} src={img} alt="" className="w-full h-44 object-cover rounded-xl" />)}
          </div>
        </div>
      )}

      {/* Map Locations */}
      {p.mapLocation?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Map Location Images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {p.mapLocation.map((img, i) => <img key={i} src={img} alt="" className="w-full h-44 object-cover rounded-xl" />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
