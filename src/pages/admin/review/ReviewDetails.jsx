import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReviewStore } from "../../../store/review/reviewStore";
import { MdArrowBack } from "react-icons/md";

const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, loadReviews, isLoading } = useReviewStore();
  const [review, setReview] = useState(null);

  useEffect(() => { loadReviews(); }, [loadReviews]);
  useEffect(() => { if (Array.isArray(reviews)) setReview(reviews.find((r) => r._id === id) || null); }, [reviews, id]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" /></div>;
  if (!review) return <div className="flex items-center justify-center py-20 text-slate-400">Review not found</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"><MdArrowBack size={18} /></button>
        <div><h1 className="text-xl font-bold text-slate-800">Review Details</h1><p className="text-slate-400 text-sm">Client review information</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-lg">
            {(review.name || "R")[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{review.name}</h2>
            {review.designation && <p className="text-slate-400 text-sm">{review.designation}</p>}
          </div>
          {review.createdAt && <span className="ml-auto text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">{new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>}
        </div>

        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{review.title}</p>
          {review.description && <p className="text-slate-600 leading-7 whitespace-pre-line">{review.description}</p>}
        </div>

        {review.reviewVideo && (
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Review Video</p>
            <video src={review.reviewVideo} controls className="w-full rounded-xl border border-slate-100" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetails;
