import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MdPerson, MdEdit, MdSave, MdLock, MdEmail, MdVerifiedUser, MdOutlineSecurity, MdOutlineCloudUpload } from "react-icons/md";
import { FaCamera, FaRegUserCircle } from "react-icons/fa";
import { useAuthStore } from "../../store/auth/authStore.jsx";
import { ProjectSubmitOverlay, mediaUpdateSteps } from "./projects/projectFormUi";

const inp =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

export default function AdminProfile() {
  const { user, updateProfile, isLoading, error } = useAuthStore();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [previewUrl, setPreviewUrl] = useState(user?.profilePic?.url || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
    }));
    setPreviewUrl(user?.profilePic?.url || null);
  }, [user]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    if (form.name) formData.append("name", form.name);
    if (form.email) formData.append("email", form.email);
    if (form.password) formData.append("password", form.password);
    if (selectedFile) formData.append("profilePic", selectedFile);

    try {
      setSubmitState({
        active: true,
        title: "Preparing profile update",
        detail: "We are checking your account details and selected profile image.",
        step: 0,
      });
      setSubmitState({
        active: true,
        title: "Uploading profile changes",
        detail: selectedFile
          ? "Your profile photo and account changes are being processed now."
          : "Your account changes are being processed now.",
        step: 1,
      });
      await updateProfile(formData);
      setSubmitState({
        active: true,
        title: "Saving profile changes",
        detail: "The request is complete. Your profile is now being refreshed.",
        step: 2,
      });
      toast.success("Profile updated successfully!");
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSubmitState((prev) => ({ ...prev, active: false }));
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || error || "Failed to update profile");
    }
  };

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
        entityLabel="Profile"
        steps={mediaUpdateSteps}
        notice="Profile image uploads can take a little longer. Please keep this page open until the success message appears."
      />

      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <div className="overflow-hidden rounded-[32px] border border-indigo-200 bg-[linear-gradient(135deg,#1c2347_0%,#4b3f86_46%,#ffffff_46.1%,#eef4ff_100%)] shadow-[0_30px_120px_-60px_rgba(49,21,102,0.65)]">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-100">Account Center</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Admin Profile</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-indigo-50/85">
                Update your personal info, password, and profile image from one place with a cleaner live preview layout.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-indigo-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <MdVerifiedUser size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-700">Current User</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{user?.name || "Admin User"}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-indigo-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <MdOutlineSecurity size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-700">Security</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Password and photo update ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 xl:grid-cols-[0.92fr,1.08fr]">
          <div className="space-y-8">
            <div className="rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <FaRegUserCircle size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-700">Profile Preview</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Identity Card</h2>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(160deg,#1f2350_0%,#3f458f_55%,#eef3ff_55.1%,#ffffff_100%)]">
                <div className="px-6 py-6 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-100">Administrator</p>
                  <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="relative">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile"
                          className="h-28 w-28 rounded-[28px] object-cover ring-4 ring-white/20"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white/15 text-4xl font-black ring-4 ring-white/15">
                          {user?.name?.[0]?.toUpperCase() || "A"}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                      >
                        <FaCamera size={14} />
                      </button>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-black tracking-tight">{form.name || "Admin User"}</h3>
                      <p className="mt-2 text-sm text-indigo-100">{form.email || "No email added yet"}</p>
                      <div className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-indigo-50">
                        {selectedFile ? "New photo selected" : "Current photo active"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-indigo-600">Photo Upload</p>
                <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-indigo-300 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),transparent_55%),linear-gradient(135deg,#f8f7ff_0%,#eef2ff_100%)] p-6 text-center transition-all hover:border-indigo-500 hover:bg-white">
                  <MdOutlineCloudUpload className="mb-3 text-slate-400" size={32} />
                  <span className="text-base font-semibold text-slate-700">
                    {selectedFile ? selectedFile.name : "Click to upload or replace your profile picture"}
                  </span>
                  <span className="mt-2 text-xs leading-6 text-slate-400">
                    JPG, PNG, WEBP accepted. Your selected photo appears instantly above.
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-300">Live Summary</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                You can change your photo, full name, email, and password here. Nothing has been removed from the previous form, only the layout has been refreshed.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <MdPerson size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-700">Basic Information</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Account Details</h2>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="name" className={lbl}>
                    <MdPerson className="mr-1 inline text-indigo-500" size={15} />
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={`${inp} rounded-2xl px-4 py-3`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={lbl}>
                    <MdEmail className="mr-1 inline text-indigo-500" size={15} />
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${inp} rounded-2xl px-4 py-3`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <MdLock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-700">Security</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Password Update</h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Leave these fields empty if you want to keep your current password unchanged.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className={lbl}>
                    <MdLock className="mr-1 inline text-indigo-500" size={15} />
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`${inp} rounded-2xl px-4 py-3`}
                    placeholder="New password"
                    autoComplete="new-password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={lbl}>
                    <MdLock className="mr-1 inline text-indigo-500" size={15} />
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`${inp} rounded-2xl px-4 py-3`}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-[30px] border border-slate-200 bg-slate-950 px-6 py-5 shadow-[0_24px_80px_-48px_rgba(2,6,23,0.95)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-300">Ready To Save</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Your profile preview stays visible while the form is being updated.
                </p>
              </div>
              <button
                type="submit"
                disabled={submitState.active || isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition hover:from-indigo-600 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitState.active || isLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <MdSave size={18} />
                )}
                {submitState.active || isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
