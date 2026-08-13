import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContactStore } from "../../../store/contact/contactStore";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { ProjectSubmitOverlay, genericUpdateSteps } from "../projects/projectFormUi";

const inp = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, isLoading, updateContacts, loadContacts } = useContactStore();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  useEffect(() => {
    if (!contacts.length) {
      loadContacts();
    }
  }, [contacts.length, loadContacts]);

  useEffect(() => {
    const c = contacts.find((x) => x._id === id);
    if (c) {
      setName(c.name || "");
      setNumber(c.number || "");
      setAddress(c.address || "");
      setEmail(c.email || "");
      setMessage(c.message || "");
      setPageLoading(false);
    } else if (contacts.length) {
      toast.error("Contact not found");
      setPageLoading(false);
    }
  }, [id, contacts]);

  const setSubmissionStage = (title, detail, step) => {
    setSubmitState({ active: true, title, detail, step });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmissionStage(
        "Preparing contact update",
        "We are checking the latest contact details before sending the request.",
        0
      );
      setSubmissionStage(
        "Updating contact entry",
        "The contact changes are being sent to the dashboard now.",
        1
      );
      await updateContacts(id, { name, number, address, email, message });
      setSubmissionStage(
        "Saving contact changes",
        "The request is complete. The dashboard is now finishing the update.",
        2
      );
      toast.success("Contact updated!");
      setSubmitState((prev) => ({ ...prev, active: false }));
      navigate("/adminDashboard/viewContact");
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || "Failed to update contact");
    }
  };

  if (pageLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;

  return (
    <>
      <ProjectSubmitOverlay
        active={submitState.active}
        mode="update"
        title={submitState.title}
        detail={submitState.detail}
        step={submitState.step}
        entityLabel="Contact"
        steps={genericUpdateSteps}
        notice="Please keep this page open until the success message appears."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
          <div><h1 className="text-xl font-bold text-slate-800">Update Contact</h1><p className="text-slate-400 text-sm">Edit this contact entry</p></div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className={lbl}>Name *</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inp} required /></div>
              <div><label className={lbl}>Phone Number *</label><input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className={inp} required /></div>
              <div><label className={lbl}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Address</label><textarea value={address} onChange={(e) => setAddress(e.target.value)} className={`${inp} resize-none h-20`} /></div>
              <div className="md:col-span-2"><label className={lbl}>Message</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${inp} resize-none h-28`} /></div>
            </div>
            <button type="submit" disabled={submitState.active || isLoading} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
              {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
              {submitState.active || isLoading ? "Updating..." : "Update Contact"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateContact;
