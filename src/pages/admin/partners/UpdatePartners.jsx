import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePartnerStore } from "../../../store/partners/partnersStore";
import { MdArrowBack, MdCloudUpload, MdImage, MdOutlineWorkspacePremium, MdPhotoLibrary, MdClose, MdSyncAlt } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay, mediaUpdateSteps } from "../projects/projectFormUi";

const UpdatePartners = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { partners, updatePartners, loadPartners, isLoading } = usePartnerStore();
  const [loading, setLoading] = useState(true);
  const [partnerImage, setPartnerImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  useEffect(() => {
    if (!partners.length) {
      loadPartners();
    }
  }, [partners.length, loadPartners]);

  useEffect(() => {
    const p = partners.find((x) => x._id === id);
    if (p) {
      setCurrentImage(p.partnersImage || null);
      setPreviewUrl(p.partnersImage || null);
      setLoading(false);
    } else if (partners.length) {
      toast.error("Partner not found");
      setLoading(false);
    }
  }, [id, partners]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPartnerImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelection = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPartnerImage(null);
    setPreviewUrl(currentImage || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (partnerImage) {
      formData.append("partnersImage", partnerImage);
    }
    try {
      setSubmitState({
        active: true,
        title: "Preparing partner update",
        detail: "We are checking the selected partner logo files before sending the request.",
        step: 0,
      });
      setSubmitState({
        active: true,
        title: "Uploading partner changes",
        detail: partnerImage
          ? `${partnerImage.name} is being uploaded to replace the current partner logo.`
          : "The partner record update is being processed now.",
        step: 1,
      });
      await updatePartners(id, formData);
      setSubmitState({
        active: true,
        title: "Saving partner changes",
        detail: "The request is complete. The dashboard is now finishing the update.",
        step: 2,
      });
      toast.success("Partner updated!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewPartners");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || "Failed to update partner");
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
        entityLabel="Partner"
        steps={mediaUpdateSteps}
        notice="Logo uploads can take a little longer. Please keep this page open until the success message appears."
      />

      <div className="mx-auto max-w-5xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-indigo-200 bg-[linear-gradient(135deg,#1f2248_0%,#384372_46%,#f7f8ff_46.1%,#eef4ff_100%)] shadow-[0_30px_120px_-60px_rgba(30,41,59,0.65)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[auto,1fr] lg:items-end">
            <button
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <MdArrowBack size={20} />
            </button>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-100">Partner Management</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Update Partner Logo</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-indigo-50/85">
                  Keep the current logo visible while testing a new one, so you always know what will appear after the update.
                </p>
              </div>
              <div className="rounded-[28px] border border-indigo-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-start gap-3 text-slate-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <MdSyncAlt size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-700">Live Replace</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      The current logo stays visible, and the newly selected logo previews instantly before you save.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <MdPhotoLibrary size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-700">Replace Panel</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Partner Logo</h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {currentImage ? (
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-indigo-600">Current Logo</p>
                  <div className="mt-4 flex min-h-44 items-center justify-center rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                    <img src={currentImage} alt="Current partner logo" className="max-h-28 w-full object-contain" />
                  </div>
                </div>
              ) : null}

              <label className="flex min-h-60 w-full cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-indigo-300 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_55%),linear-gradient(135deg,#f8f7ff_0%,#eef2ff_100%)] p-6 text-center transition-all hover:border-indigo-500 hover:bg-white">
                <MdCloudUpload className="mb-3 text-slate-400" size={34} />
                <span className="text-base font-semibold text-slate-700">
                  {partnerImage ? partnerImage.name : "Click to choose a replacement logo"}
                </span>
                <span className="mt-2 text-xs leading-6 text-slate-400">
                  Select a new image only if you want to replace the current partner logo.
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-700">Preview</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Final Appearance</h2>
              </div>
              {partnerImage ? (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                >
                  <MdClose size={16} />
                  Reset
                </button>
              ) : null}
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] p-6">
              {previewUrl ? (
                <div className="space-y-5">
                  <div className="flex min-h-72 items-center justify-center rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                    <img src={previewUrl} alt="Partner logo preview" className="max-h-48 w-full object-contain" />
                  </div>
                  <div className="rounded-[24px] border border-indigo-100 bg-white/90 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-indigo-600">Preview Note</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {partnerImage
                        ? "This preview is showing the new logo you selected. Save the form to replace the current partner image."
                        : "This preview is showing the current partner logo. Upload a new image from the left side if you want to replace it."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[25rem] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-8 text-center">
                  <MdImage className="text-slate-300" size={42} />
                  <p className="mt-4 text-base font-semibold text-slate-700">Logo preview will appear here</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                    The current or newly selected partner logo will stay visible here while you edit.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-300">Ready To Save</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Current and replacement visuals stay visible until the partner update is complete.
                </p>
              </div>
              <button
                type="submit"
                disabled={submitState.active || isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition hover:from-indigo-600 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
                {submitState.active || isLoading ? "Updating..." : "Update Partner"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePartners;
