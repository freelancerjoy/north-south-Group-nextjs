import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNewsEventsStore } from "../../../store/newsEvent/newsEventStore";
import { MdArrowBack, MdCloudUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

const inp = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const CreateNewsEvent = () => {
  const navigate = useNavigate();
  const { addNewsEvent, loadNewsEvents, isLoading } = useNewsEventsStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((img) => formData.append("image", img));
    try {
      await addNewsEvent(formData);
      toast.success("News & Event created successfully!");
      await loadNewsEvents();
      navigate("/adminDashboard/viewNewsEvents");
    } catch { toast.error("Failed to create news event"); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
          <MdArrowBack size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Create News & Event</h1>
          <p className="text-slate-400 text-sm">Add a new news or event entry</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={lbl}>Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inp} placeholder="Enter title" required />
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inp} resize-none h-28`} placeholder="Write a description..." />
          </div>
          <div>
            <label className={lbl}>Images</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all bg-slate-50">
              <MdCloudUpload className="text-slate-400 mb-1" size={28} />
              <span className="text-sm text-slate-500">{images.length > 0 ? `${images.length} file(s) selected` : "Click to upload images"}</span>
              <input type="file" multiple className="hidden" onChange={(e) => setImages([...e.target.files])} />
            </label>
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
            {isLoading && <FaSpinner className="animate-spin" />}
            {isLoading ? "Creating..." : "Create News & Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsEvent;
