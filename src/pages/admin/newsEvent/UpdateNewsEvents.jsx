import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNewsEventsStore } from "../../../store/newsEvent/newsEventStore";
import { MdArrowBack, MdCloudUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay, mediaUpdateSteps } from "../projects/projectFormUi";

const inp = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const UpdateNewsEvents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsEvents, updateNewsEvents, loadNewsEvents, isLoading } = useNewsEventsStore();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  useEffect(() => {
    if (!newsEvents.length) {
      loadNewsEvents();
    }
  }, [newsEvents.length, loadNewsEvents]);

  useEffect(() => {
    const item = newsEvents.find((n) => n._id === id);
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setLoading(false);
    } else if (newsEvents.length) {
      toast.error("News event not found");
      setLoading(false);
    }
  }, [id, newsEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((img) => formData.append("image", img));
    try {
      setSubmitState({
        active: true,
        title: "Preparing news event update",
        detail: "We are checking the latest content and selected images before submitting.",
        step: 0,
      });
      setSubmitState({
        active: true,
        title: "Uploading news event changes",
        detail: images.length
          ? `${images.length} replacement image(s) and the updated content are being processed now.`
          : "The updated news event content is being processed now.",
        step: 1,
      });
      await updateNewsEvents(id, formData);
      setSubmitState({
        active: true,
        title: "Saving news event changes",
        detail: "The request is complete. The dashboard is now finishing the update.",
        step: 2,
      });
      toast.success("News event updated successfully!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewNewsEvents");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || "Failed to update news event");
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
        entityLabel="News Event"
        steps={mediaUpdateSteps}
        notice="Image updates can take a little longer. Please keep this page open until the success message appears."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Update News & Event</h1>
            <p className="text-slate-400 text-sm">Edit the entry details below</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className={lbl}>Title *</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inp} required /></div>
            <div><label className={lbl}>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inp} resize-none h-28`} /></div>
            <div>
              <label className={lbl}>Update Images (optional)</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all bg-slate-50">
                <MdCloudUpload className="text-slate-400 mb-1" size={22} />
                <span className="text-xs text-slate-500">{images.length > 0 ? `${images.length} file(s) selected` : "Click to replace images"}</span>
                <input type="file" multiple className="hidden" onChange={(e) => setImages([...e.target.files])} />
              </label>
            </div>
            <button type="submit" disabled={submitState.active || isLoading} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
              {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
              {submitState.active || isLoading ? "Updating..." : "Update News & Event"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateNewsEvents;
