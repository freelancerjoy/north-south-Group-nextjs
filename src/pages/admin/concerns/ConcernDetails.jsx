import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEdit, MdOpenInNew } from "react-icons/md";
import { useConcernStore } from "../../../store/concern/concernStore";

const ConcernDetails = () => {
  const { id } = useParams();
  const { concern, isLoading, loadConcernById } = useConcernStore();

  useEffect(() => {
    loadConcernById(id);
  }, [id, loadConcernById]);

  if (isLoading || !concern) return <div className="py-20 text-center text-slate-500">Loading concern details...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {concern.heroImage && <img src={concern.heroImage} alt={concern.title} className="h-72 w-full object-cover" />}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-600">{concern.eyebrow}</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">{concern.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{concern.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {concern.routePath && (
                <Link to={concern.routePath} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                  <MdOpenInNew /> Public Page
                </Link>
              )}
              <Link to={`/adminDashboard/updateConcern/${concern._id}`} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">
                <MdEdit /> Edit
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {(concern.stats || []).map((item) => (
              <div key={`${item.value}-${item.label}`} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-2xl font-black text-slate-900">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section>
              <h2 className="font-bold text-slate-900">Services</h2>
              <div className="mt-3 space-y-3">
                {(concern.services || []).map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 p-4">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-bold text-slate-900">Features</h2>
              <div className="mt-3 space-y-3">
                {(concern.features || []).map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 p-4">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-bold text-slate-900">Highlights</h2>
              <div className="mt-3 space-y-3">
                {(concern.highlights || []).map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 p-4">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Hero Slides</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{concern.heroSliderImages?.length || 0}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Gallery Images</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{concern.galleryImages?.length || 0}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Contact CTA</p>
              <p className="mt-1 text-sm text-slate-500">{concern.contactTitle || concern.ctaTitle || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernDetails;
