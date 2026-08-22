 import news from "../../assets/images/news.jpg";
import { useEffect, useState, useRef } from "react";
import { FaSpinner, FaCalendarAlt } from "react-icons/fa";
import { IoAdd, IoRemove, IoClose, IoRefresh } from "react-icons/io5";
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

/* ---------------- Lightbox / Zoom Viewer ---------------- */
const ImageLightbox = ({ card, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0 });

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () =>
    setScale((s) => {
      const next = Math.max(s - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return;
    dragRef.current = {
      dragging: true,
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    setPosition({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    });
  };

  const handleMouseUp = () => {
    dragRef.current.dragging = false;
  };

  const handleDoubleClick = () => {
    if (scale === 1) setScale(2);
    else resetZoom();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#06201e]/97 backdrop-blur-sm flex flex-col animate-[fadeIn_0.2s_ease]"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 md:px-10 py-5 shrink-0">
        <div className="text-white/70 text-sm font-light truncate max-w-[70%]">
          {card.title}
        </div>
        <div className="flex items-center gap-4">
          {scale > 1 && (
            <button
              onClick={resetZoom}
              className="inline-flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest hover:text-[#5ec9c1] transition-colors duration-300"
            >
              <IoRefresh size={14} /> Reset
            </button>
          )}
          <button
            onClick={onClose}
            className="border border-[#5ec9c1]/40 text-[#5ec9c1] p-2.5 rounded-full hover:bg-[#5ec9c1] hover:text-[#06201e] transition-all duration-300"
          >
            <IoClose size={18} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center px-2 md:px-6 pb-6">
        <img
          src={card.image}
          alt={card.title}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          draggable={false}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
          className="max-w-full max-h-[78vh] object-contain rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] select-none transition-transform duration-150"
        />

        {/* Zoom controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 bg-[#0a3d3a]/80 backdrop-blur-md border border-[#5ec9c1]/25 px-6 py-3 rounded-full shadow-lg">
          <button
            onClick={zoomOut}
            className="text-[#5ec9c1] hover:text-white transition-colors"
          >
            <IoRemove size={20} />
          </button>
          <span className="text-white/80 text-xs tracking-widest w-12 text-center select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="text-[#5ec9c1] hover:text-white transition-colors"
          >
            <IoAdd size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Cards ---------------- */
const FeaturedCard = ({ card, onView }) => (
  <button
    onClick={() => onView(card)}
    className="group relative flex flex-col w-full h-[24rem] md:h-[30rem] lg:h-[34rem] overflow-hidden text-left"
  >
    <img
      src={card.image}
      alt={card.title}
      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[1400ms] ease-out group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#06201e] via-[#06201e]/50 to-[#06201e]/10 transition-opacity duration-500 group-hover:from-[#06201e]/95" />

    <span className="absolute top-0 left-0 h-[3px] w-0 bg-[#5ec9c1] transition-all duration-700 group-hover:w-full" />

    <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-3 z-10">
      <span className="h-px w-8 bg-[#5ec9c1]" />
      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-[#5ec9c1]">
        Featured Story
      </span>
    </div>

    <div className="relative z-10 mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-5 p-6 md:p-10">
      <div className="flex flex-col gap-2 md:max-w-2xl">
        {card.createdAt && (
          <div className="flex items-center gap-2 text-[11px] text-[#5ec9c1]">
            <FaCalendarAlt size={10} />
            <span className="uppercase tracking-[0.2em] font-semibold">
              {formatDate(card.createdAt)}
            </span>
          </div>
        )}

        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-white leading-snug">
          {card.title}
        </h3>

        <p className="text-white/70 text-sm leading-relaxed line-clamp-2 font-light hidden md:block">
          {card.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white shrink-0">
        <span>View Image</span>
      </div>
    </div>
  </button>
);

const NewsCard = ({ card, onView }) => (
  <button
    onClick={() => onView(card)}
    className="group relative flex flex-col h-[22rem] overflow-hidden rounded-[2px] shadow-[0_20px_40px_-18px_rgba(10,61,58,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_55px_-15px_rgba(10,61,58,0.55)] text-left"
  >
    <img
      src={card.image}
      alt={card.title}
      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#06201e] via-[#06201e]/50 to-[#06201e]/5 transition-opacity duration-500 group-hover:from-[#06201e]/95" />

    <span className="absolute top-0 left-0 h-[3px] w-0 bg-[#5ec9c1] transition-all duration-500 group-hover:w-full" />

    <div className="relative z-10 mt-auto p-6 flex flex-col gap-2">
      {card.createdAt && (
        <div className="flex items-center gap-2 text-[11px] text-[#5ec9c1]">
          <FaCalendarAlt size={10} />
          <span className="uppercase tracking-[0.2em] font-semibold">
            {formatDate(card.createdAt)}
          </span>
        </div>
      )}

      <h3 className="font-serif text-xl text-white leading-snug line-clamp-2">
        {card.title}
      </h3>

      <div className="mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">
        <span>View Image</span>
      </div>
    </div>
  </button>
);

/* ---------------- Main Page ---------------- */
const NewsEvent = () => {
  const { newsEvents, loadNewsEvents, isLoading } = useNewsEventsStore();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    loadNewsEvents();
  }, [loadNewsEvents]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-[60vh] bg-[#f2f8f7]">
        <FaSpinner className="animate-spin text-[#0f7771]" size={40} />
        <p className="text-xs uppercase tracking-[0.3em] text-[#0f7771]/60 font-medium">
          Loading
        </p>
      </div>
    );
  }

  const [featured, ...rest] = newsEvents;

  return (
    <div className="bg-[#f2f8f7] min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 lg:h-[60vh] overflow-hidden">
        <img
          src={news}
          alt="News & Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a3d3a]/40 via-[#0a3d3a]/50 to-[#0a3d3a]/90" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#5ec9c1]" />
            <p className="text-[#5ec9c1] text-xs md:text-sm uppercase tracking-[0.4em] font-semibold">
              Latest Updates
            </p>
          </div>
          <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
            News &amp; Events
          </h1>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative bg-[#0a3d3a] overflow-hidden py-4 border-y border-[#5ec9c1]/25">
        <div className="flex items-center gap-5">
          <span className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-[#0f7771] to-[#0c5a55] text-white text-[11px] font-bold uppercase tracking-[0.3em] pl-6 pr-5 py-2.5 rounded-r-full shadow-[0_8px_20px_-8px_rgba(15,119,113,0.7)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5ec9c1] animate-pulse" />
            Updates
          </span>

          <div className="relative overflow-hidden flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a3d3a] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a3d3a] to-transparent z-10" />

            <p className="whitespace-nowrap animate-[ticker_20s_linear_infinite] inline-block text-white/85 text-sm font-light tracking-[0.02em]">
              {TICKER_TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{TICKER_TEXT}
            </p>
          </div>
        </div>
      </div>

      <div className="h-8 md:h-12" />

      {newsEvents.length === 0 ? (
        <div className="text-center py-24 text-gray-400 text-lg font-light">
          No news or events available yet.
        </div>
      ) : (
        <>
          {featured && (
            <div className="w-full">
              <FeaturedCard card={featured} onView={setActiveImage} />
            </div>
          )}

          <div className="w-full px-5 md:px-10 lg:px-16 py-16 md:py-20">
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {rest.map((card) => (
                  <NewsCard key={card._id} card={card} onView={setActiveImage} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Lightbox */}
      {activeImage && (
        <ImageLightbox card={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </div>
  );
};

export default NewsEvent;