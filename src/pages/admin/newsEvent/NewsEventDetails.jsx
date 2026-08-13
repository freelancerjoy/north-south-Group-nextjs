import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNewsEventsStore } from "../../../store/newsEvent/newsEventStore";
import { MdArrowBack } from "react-icons/md";

const NewsEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsEvents, loadNewsEvents, isLoading } = useNewsEventsStore();
  const [event, setEvent] = useState(null);

  useEffect(() => { loadNewsEvents(); }, [loadNewsEvents]);
  useEffect(() => { if (Array.isArray(newsEvents)) setEvent(newsEvents.find((n) => n._id === id) || null); }, [newsEvents, id]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;
  if (!event) return <div className="flex items-center justify-center py-20 text-slate-400">No news/event found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
        <div><h1 className="text-xl font-bold text-slate-800">News & Event Details</h1><p className="text-slate-400 text-sm">Full entry information</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {event.image && <img src={event.image} alt={event.title} className="w-full h-72 object-cover" />}
        <div className="p-8 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h2 className="text-2xl font-bold text-slate-800">{event.title}</h2>
            {event.createdAt && <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">{new Date(event.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>}
          </div>
          {event.description && <p className="text-slate-600 leading-7 whitespace-pre-line">{event.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewsEventDetails;
