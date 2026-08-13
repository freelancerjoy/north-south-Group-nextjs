import news from "../../assets/images/news.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useNewsEventsStore } from "../../store/newsEvent/newsEventStore";

const TICKER_TEXT =
  "Upcoming Projects: Northsouth Tours & Travels · Northsouth Foundation · Northsouth Butterfly Resort & Park";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const NewsCard = ({ card, featured = false }) => (
  <Link
    to={`/newsEventDetails/${card._id}`}
    className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      featured ? "md:flex-row" : ""
    }`}
  >
    <div
      className={`overflow-hidden ${
        featured ? "md:w-1/2 h-60 md:h-auto" : "h-52"
      }`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
      />
    </div>

    <div className={`flex flex-col justify-between p-6 ${featured ? "md:w-1/2" : ""}`}>
      <div>
        {featured && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0f7771] bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-3">
            Featured
          </span>
        )}
        {card.createdAt && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <FaCalendarAlt size={11} />
            <span>{formatDate(card.createdAt)}</span>
          </div>
        )}
        <h3
          className={`font-bold text-gray-800 group-hover:text-[#0f7771] transition-colors leading-snug ${
            featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
          }`}
        >
          {card.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {card.description}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#0f7771] group-hover:gap-3 transition-all duration-200">
        Read More <FaArrowRight size={12} />
      </div>
    </div>
  </Link>
);

const NewsEvent = () => {
  const { newsEvents, loadNewsEvents, isLoading } = useNewsEventsStore();

  useEffect(() => {
    loadNewsEvents();
  }, [loadNewsEvents]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <FaSpinner className="animate-spin text-[#0f7771]" size={48} />
      </div>
    );
  }

  const [featured, ...rest] = newsEvents;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 lg:h-[60vh] overflow-hidden">
        <img
          src={news}
          alt="News & Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 flex flex-col justify-end pb-10 px-6 md:px-16">
          <p className="text-green-300 text-xs md:text-sm uppercase tracking-[4px] font-semibold mb-2">
            Latest Updates
          </p>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            News &amp; Events
          </h1>
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-[#0f7771] overflow-hidden py-3">
        <div className="flex items-center gap-4">
          <span className="shrink-0 bg-white text-[#0f7771] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-r-full">
            Updates
          </span>
          <div className="overflow-hidden flex-1">
            <p className="whitespace-nowrap animate-[ticker_20s_linear_infinite] inline-block text-white text-sm font-medium">
              {TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{TICKER_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 py-14">
        {newsEvents.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-lg">
            No news or events available yet.
          </div>
        ) : (
          <>
            {/* Section heading */}
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[3px] text-[#0f7771] font-semibold mb-1">
                Stay Informed
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">
                Latest News &amp; Events
              </h2>
              <div className="mt-3 w-16 h-1 bg-[#0f7771] rounded-full" />
            </div>

            {/* Featured card */}
            {featured && (
              <div className="mb-10">
                <NewsCard card={featured} featured />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((card) => (
                  <NewsCard key={card._id} card={card} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsEvent;
