import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContactStore } from "../../../store/contact/contactStore";
import { MdArrowBack, MdPhone, MdEmail, MdLocationOn, MdMessage } from "react-icons/md";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, loadContacts, isLoading } = useContactStore();
  const [contact, setContact] = useState(null);

  useEffect(() => { loadContacts(); }, [loadContacts]);
  useEffect(() => { if (Array.isArray(contacts)) setContact(contacts.find((c) => c._id === id) || null); }, [contacts, id]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;
  if (!contact) return <div className="flex items-center justify-center py-20 text-slate-400">Contact not found</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
        <div><h1 className="text-xl font-bold text-slate-800">Contact Details</h1><p className="text-slate-400 text-sm">Submitted inquiry information</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
            {(contact.name || contact.fullName || "?")[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{contact.name || contact.fullName}</h2>
            {contact.createdAt && <p className="text-slate-400 text-xs mt-0.5">Submitted {new Date(contact.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {contact.number && <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"><MdPhone className="text-indigo-500 mt-0.5" size={18} /><div><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Phone</p><p className="text-slate-700 text-sm font-medium mt-0.5">{contact.number}</p></div></div>}
          {contact.email && <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"><MdEmail className="text-indigo-500 mt-0.5" size={18} /><div><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email</p><p className="text-slate-700 text-sm font-medium mt-0.5">{contact.email}</p></div></div>}
          {contact.address && <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl md:col-span-2"><MdLocationOn className="text-indigo-500 mt-0.5" size={18} /><div><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Address</p><p className="text-slate-700 text-sm font-medium mt-0.5">{contact.address}</p></div></div>}
        </div>

        {contact.message && (
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
            <MdMessage className="text-indigo-500 mt-0.5 flex-shrink-0" size={18} />
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Message</p>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{contact.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
