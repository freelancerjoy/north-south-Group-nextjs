import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReviewStore } from "../../../store/review/reviewStore";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay, genericUpdateSteps } from "../projects/projectFormUi";

const inp = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, updateReviews, loadReviews, isLoading } = useReviewStore();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [reviewVideo, setReviewVideo] = useState("");
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  useEffect(() => {
    if (!reviews.length) {
      loadReviews();
    }
  }, [reviews.length, loadReviews]);

  useEffect(() => {
    const r = reviews.find((x) => x._id === id);
    if (r) {
      setTitle(r.title || "");
      setDescription(r.description || "");
      setName(r.name || "");
      setDesignation(r.designation || "");
      setReviewVideo(r.reviewVideo || "");
      setLoading(false);
    } else if (reviews.length) {
      toast.error("Review not found");
      setLoading(false);
    }
  }, [id, reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title); formData.append("description", description);
    formData.append("name", name); formData.append("designation", designation);
    formData.append("reviewVideo", reviewVideo);
    try {
      setSubmitState({
        active: true,
        title: "Preparing review update",
        detail: "We are checking the latest review details before sending the request.",
        step: 0,
      });
      setSubmitState({
        active: true,
        title: "Updating review entry",
        detail: "The review changes are being sent to the dashboard now.",
        step: 1,
      });
      await updateReviews(id, formData);
      setSubmitState({
        active: true,
        title: "Saving review changes",
        detail: "The request is complete. The dashboard is now finishing the update.",
        step: 2,
      });
      toast.success("Review updated!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewReview");
    }
    catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || "Failed to update review");
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
        entityLabel="Review"
        steps={genericUpdateSteps}
        notice="Please keep this page open until the success message appears."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
          <div><h1 className="text-xl font-bold text-slate-800">Update Review</h1><p className="text-slate-400 text-sm">Edit this review entry</p></div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className={lbl}>Title *</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inp} required /></div>
              <div><label className={lbl}>Reviewer Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Designation</label><input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Review Video URL</label><input type="text" value={reviewVideo} onChange={(e) => setReviewVideo(e.target.value)} className={inp} /></div>
            </div>
            <div><label className={lbl}>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inp} resize-none h-28`} /></div>
            <button type="submit" disabled={submitState.active || isLoading} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
              {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
              {submitState.active || isLoading ? "Updating..." : "Update Review"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateReview;
