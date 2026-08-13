import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import { useContactInfoStore } from "../../../store/contactInfo/contactInfoStore";
import { ProjectSubmitOverlay, genericUpdateSteps } from "../projects/projectFormUi";

const inp =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all bg-white";
const lbl = "block text-sm font-semibold text-slate-600 mb-1.5";

const ArrayField = ({ label, values, onChange }) => {
  const handleChange = (i, val) => {
    const updated = [...values];
    updated[i] = val;
    onChange(updated);
  };
  const handleAdd = () => onChange([...values, ""]);
  const handleRemove = (i) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              className={inp}
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
              title="Remove"
            >
              <FaTrash size={13} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:underline mt-1"
        >
          <FaPlus size={11} /> Add
        </button>
      </div>
    </div>
  );
};

const ContactInfoSettings = () => {
  const { contactInfo, loadContactInfo, updateContactInfo, isLoading } =
    useContactInfoStore();
  const [submitState, setSubmitState] = useState({
    active: false,
    title: "",
    detail: "",
    step: 0,
  });

  const [form, setForm] = useState({
    corporateOfficeTitle: "",
    corporateOfficeLines: [""],
    dubaiOfficeTitle: "",
    dubaiOfficeLines: [""],
    phones: [""],
    emails: [""],
    websites: [""],
  });

  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  useEffect(() => {
    if (contactInfo) {
      setForm({
        corporateOfficeTitle: contactInfo.corporateOfficeTitle || "",
        corporateOfficeLines: contactInfo.corporateOfficeLines?.length
          ? contactInfo.corporateOfficeLines
          : [""],
        dubaiOfficeTitle: contactInfo.dubaiOfficeTitle || "",
        dubaiOfficeLines: contactInfo.dubaiOfficeLines?.length
          ? contactInfo.dubaiOfficeLines
          : [""],
        phones: contactInfo.phones?.length ? contactInfo.phones : [""],
        emails: contactInfo.emails?.length ? contactInfo.emails : [""],
        websites: contactInfo.websites?.length ? contactInfo.websites : [""],
      });
    }
  }, [contactInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitState({
        active: true,
        title: "Preparing contact info update",
        detail: "We are checking the latest office, phone, email and website details.",
        step: 0,
      });
      setSubmitState({
        active: true,
        title: "Updating contact info",
        detail: "The contact page settings are being sent to the dashboard now.",
        step: 1,
      });
      await updateContactInfo(form);
      setSubmitState({
        active: true,
        title: "Saving contact info changes",
        detail: "The request is complete. The dashboard is now finishing the update.",
        step: 2,
      });
      toast.success("Contact info updated successfully!");
      setSubmitState((prev) => ({ ...prev, active: false }));
    } catch (err) {
      setSubmitState((prev) => ({ ...prev, active: false }));
      toast.error(err?.response?.data?.message || "Failed to update contact info");
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
        entityLabel="Contact Info"
        steps={genericUpdateSteps}
        notice="Please keep this page open until the success message appears."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Contact Info Settings</h1>
          <p className="text-slate-400 text-sm">
            Manage the addresses, phones, emails and websites shown on the
            Contact page
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Corporate Office */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Corporate Office
            </h2>
            <div>
              <label className={lbl}>Title</label>
              <input
                type="text"
                value={form.corporateOfficeTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, corporateOfficeTitle: e.target.value }))
                }
                className={inp}
              />
            </div>
            <ArrayField
              label="Address Lines"
              values={form.corporateOfficeLines}
              onChange={(val) => setForm((f) => ({ ...f, corporateOfficeLines: val }))}
            />
          </div>

          {/* Dubai Office */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Dubai Office
            </h2>
            <div>
              <label className={lbl}>Title</label>
              <input
                type="text"
                value={form.dubaiOfficeTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dubaiOfficeTitle: e.target.value }))
                }
                className={inp}
              />
            </div>
            <ArrayField
              label="Address Lines"
              values={form.dubaiOfficeLines}
              onChange={(val) => setForm((f) => ({ ...f, dubaiOfficeLines: val }))}
            />
          </div>

          {/* Phones */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Phone Numbers
            </h2>
            <ArrayField
              label="Phones"
              values={form.phones}
              onChange={(val) => setForm((f) => ({ ...f, phones: val }))}
            />
          </div>

          {/* Emails */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Email Addresses
            </h2>
            <ArrayField
              label="Emails"
              values={form.emails}
              onChange={(val) => setForm((f) => ({ ...f, emails: val }))}
            />
          </div>

          {/* Websites */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Websites
            </h2>
            <ArrayField
              label="Website URLs"
              values={form.websites}
              onChange={(val) => setForm((f) => ({ ...f, websites: val }))}
            />
          </div>

            <button
              type="submit"
              disabled={submitState.active || isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {(submitState.active || isLoading) && <FaSpinner className="animate-spin" />}
              {submitState.active || isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactInfoSettings;
