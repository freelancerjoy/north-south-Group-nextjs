import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReviewStore } from "../../../store/review/reviewStore";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

const inp = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const CreateReview = () => {
  const navigate = useNavigate();
  const { addReviews, loadReviews, isLoading } = useReviewStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [reviewVideo, setReviewVideo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("reviewVideo", reviewVideo);
    try {
      await addReviews(formData);
      toast.success("Review created successfully!");
      await loadReviews();
      navigate("/adminDashboard/viewReview");
    } catch { toast.error("Failed to create review"); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
          <MdArrowBack size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Create Review</h1>
          <p className="text-slate-400 text-sm">Add a new client review</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={lbl}>Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inp} placeholder="Review title" required />
            </div>
            <div>
              <label className={lbl}>Reviewer Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inp} placeholder="Full name" />
            </div>
            <div>
              <label className={lbl}>Designation</label>
              <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className={inp} placeholder="e.g. CEO, Manager" />
            </div>
            <div>
              <label className={lbl}>Review Video URL</label>
              <input type="text" value={reviewVideo} onChange={(e) => setReviewVideo(e.target.value)} className={inp} placeholder="Video URL or path" />
            </div>
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inp} resize-none h-28`} placeholder="Write the review content..." />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
            {isLoading && <FaSpinner className="animate-spin" />}
            {isLoading ? "Creating..." : "Create Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
