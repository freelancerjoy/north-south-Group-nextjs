import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdApartment,
  MdEvent,
  MdRateReview,
  MdHandshake,
  MdEmail,
  MdBookOnline,
  MdTrendingUp,
  MdArrowForward,
  MdOutlineDashboardCustomize,
  MdCampaign,
  MdBusiness, // Import the icon for concerns
  MdSupportAgent,
} from "react-icons/md";
import { FaLeaf, FaCity, FaIndustry } from "react-icons/fa";
import { useProjectStore } from "../../store/project/projectStore";
import { useGreenCityStore } from "../../store/greenCity/greenCityStore";
import { useSquareCityStore } from "../../store/squareCity/squareCityStore";
import { useIndustrialCityStore } from "../../store/industrialCity/industrialCityStore";
import { useReviewStore } from "../../store/review/reviewStore";
import { usePartnerStore } from "../../store/partners/partnersStore";
import { useNewsEventsStore } from "../../store/newsEvent/newsEventStore";
import { useConcernStore } from "../../store/concern/concernStore"; // Import the new store
import { useContactStore } from "../../store/contact/contactStore";
import { usePlotBookingStore } from "../../store/plotbooking/plotBookingStore";

const quickActions = [
  { label: "Add Project", to: "/adminDashboard/createProject", color: "bg-indigo-600 hover:bg-indigo-700" },
  { label: "Add News", to: "/adminDashboard/createNewsEvent", color: "bg-pink-600 hover:bg-pink-700" },
  { label: "View Bookings", to: "/adminDashboard/viewPlotBooking", color: "bg-orange-600 hover:bg-orange-700" },
  { label: "View Contacts", to: "/adminDashboard/viewContact", color: "bg-teal-600 hover:bg-teal-700" },
];

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 animate-pulse">
    <div className="w-14 h-14 rounded-2xl bg-slate-200 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-slate-200 rounded w-20" />
      <div className="h-7 bg-slate-200 rounded w-12" />
      <div className="h-3 bg-slate-200 rounded w-28" />
    </div>
  </div>
);

const ViewDashboard = () => {
  const [ready, setReady] = useState(false);
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const { projects, loadProjects, isLoading: projectLoading } = useProjectStore();
  const { greenCity, loadGreenCity, isLoading: greenLoading } = useGreenCityStore();
  const { squareCity, loadSquareCity, isLoading: squareLoading } = useSquareCityStore();
  const { industrialCity, loadIndustrialCity, isLoading: industrialLoading } =
    useIndustrialCityStore();
  const { reviews, loadReviews, isLoading: reviewLoading } = useReviewStore();
  const { partners, loadPartners, isLoading: partnerLoading } = usePartnerStore();
  const { newsEvents, loadNewsEvents, isLoading: newsLoading } = useNewsEventsStore();
  const { contacts, loadContacts, isLoading: contactLoading } = useContactStore();
  const { concerns, loadConcerns, isLoading: concernLoading } = useConcernStore(); // Use the new store
  const { bookings, loadBookings, isLoading: bookingLoading } = usePlotBookingStore();

  useEffect(() => {
    Promise.all([
      loadProjects(),
      loadGreenCity(),
      loadSquareCity(),
      loadIndustrialCity(),
      loadReviews(),
      loadPartners(),
      loadNewsEvents(),
      loadContacts(),
      loadConcerns(), // Load concerns data
      loadBookings(),
    ]).finally(() => setReady(true));
  }, [
    loadProjects,
    loadGreenCity,
    loadSquareCity,
    loadIndustrialCity,
    loadReviews,
    loadPartners,
    loadNewsEvents,
    loadContacts,
    loadConcerns, // Add to dependency array
    loadBookings,
  ]);

  const isLoading =
    !ready ||
    [
      projectLoading,
      greenLoading,
      squareLoading,
      industrialLoading,
      reviewLoading,
      partnerLoading,
      newsLoading,
      contactLoading,
      concernLoading, // Add concern loading state
      bookingLoading,
    ].some(Boolean);

  const stats = [
    {
      title: "Projects",
      value: projects?.length ?? 0,
      icon: <MdApartment size={24} />,
      gradient: "from-indigo-500 to-indigo-700",
      to: "/adminDashboard/viewProjects",
    },
    {
      title: "Green City",
      value: greenCity?.length ?? 0,
      icon: <FaLeaf size={22} />,
      gradient: "from-emerald-500 to-emerald-700",
      to: "/adminDashboard/viewGreenCity",
    },
    {
      title: "Square City",
      value: squareCity?.length ?? 0,
      icon: <FaCity size={22} />,
      gradient: "from-amber-500 to-amber-700",
      to: "/adminDashboard/viewSquareCity",
    },
    {
      title: "Industrial City",
      value: industrialCity?.length ?? 0,
      icon: <FaIndustry size={22} />,
      gradient: "from-rose-500 to-rose-700",
      to: "/adminDashboard/viewIndustrialCity",
    },
    {
      title: "Reviews",
      value: reviews?.length ?? 0,
      icon: <MdRateReview size={24} />,
      gradient: "from-violet-500 to-violet-700",
      to: "/adminDashboard/viewReview",
    },
    {
      title: "Partners",
      value: partners?.length ?? 0,
      icon: <MdHandshake size={24} />,
      gradient: "from-sky-500 to-sky-700",
      to: "/adminDashboard/viewPartners",
    },
    {
      title: "News & Events",
      value: newsEvents?.length ?? 0,
      icon: <MdEvent size={24} />,
      gradient: "from-pink-500 to-pink-700",
      to: "/adminDashboard/viewNewsEvents",
    },
    {
      title: "Concerns",
      value: concerns?.length ?? 0,
      icon: <MdBusiness size={24} />,
      gradient: "from-teal-500 to-teal-700",
      to: "/adminDashboard/viewConcerns", // Link to the new admin page
    },
    {
      title: "Contacts",
      value: contacts?.length ?? 0,
      icon: <MdEmail size={24} />,
      gradient: "from-teal-500 to-teal-700",
      to: "/adminDashboard/viewContact",
    },
    {
      title: "Plot Bookings",
      value: bookings?.length ?? 0,
      icon: <MdBookOnline size={24} />,
      gradient: "from-orange-500 to-orange-700",
      to: "/adminDashboard/viewPlotBooking",
    },
  ];

  const totalItems = stats.reduce((sum, s) => sum + s.value, 0);
  const contentTotal =
    (projects?.length || 0) +
    (greenCity?.length || 0) +
    (squareCity?.length || 0) +
    (industrialCity?.length || 0) +
    (newsEvents?.length || 0) +
    (concerns?.length || 0); // Include concerns in the total content count
  const brandTotal = (reviews?.length || 0) + (partners?.length || 0);
  const engagementTotal = (contacts?.length || 0) + (bookings?.length || 0);
  const priorityModules = [...stats].sort((a, b) => b.value - a.value).slice(0, 3);
  const commandPanels = [
    {
      title: "Content Stack",
      value: contentTotal,
      icon: <MdOutlineDashboardCustomize size={24} />,
      description: "Projects, banner cities, and news content currently managed in the system.",
      accent: "bg-cyan-50 text-cyan-700",
    },
    {
      title: "Brand Assets",
      value: brandTotal,
      icon: <MdCampaign size={24} />,
      description: "Reviews and partner visuals ready for public-facing brand storytelling.",
      accent: "bg-rose-50 text-rose-700",
    },
    {
      title: "Lead Desk",
      value: engagementTotal,
      icon: <MdSupportAgent size={24} />,
      description: "Combined contact and plot booking submissions waiting for follow-up.",
      accent: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[34px] border border-cyan-200 bg-[linear-gradient(135deg,#071c2c_0%,#164e63_42%,#ffffff_42.1%,#effcff_100%)] shadow-[0_30px_120px_-60px_rgba(8,47,73,0.55)]">
        <div className="grid grid-cols-1 gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1.15fr,0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-100">
              {greeting}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Admin Command Center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-50/85">
              Monitor content, brand assets, leads, and city modules from one redesigned dashboard with faster jump-off points.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/70 bg-white/92 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <MdTrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">
                    Total Records
                  </p>
                  <p className="mt-1 text-3xl font-black text-slate-900">
                    {isLoading ? "..." : totalItems}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/70 bg-white/92 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <MdOutlineDashboardCustomize size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">
                    Active Modules
                  </p>
                  <p className="mt-1 text-3xl font-black text-slate-900">{stats.length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                System Focus
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {commandPanels.map((panel) => (
                  <div key={panel.title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${panel.accent}`}>
                      {panel.icon}
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-700">{panel.title}</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">{panel.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{panel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Overview
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Module Snapshot
            </h2>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
            Updated{" "}
            {now.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : stats.map((card) => (
                <Link
                  key={card.title}
                  to={card.to}
                  className="group rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg transition-transform group-hover:scale-105`}
                    >
                      {card.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {card.title}
                      </p>
                      <p className="mt-1 text-3xl font-black text-slate-900">{card.value}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {card.value === 0 ? "No records yet" : `${card.value} total`}
                      </p>
                    </div>
                    <MdArrowForward
                      className="mt-1 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-cyan-600"
                      size={20}
                    />
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.05fr,0.95fr]">
        <div>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Quick Actions
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Move Faster
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="group rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{action.label}</p>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Open the related admin workflow without searching through the sidebar.
                    </p>
                  </div>
                  <MdArrowForward
                    size={20}
                    className="flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-cyan-600"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Priority Modules
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Highest Activity
            </h2>
          </div>
          <div className="space-y-4">
            {priorityModules.map((item, index) => (
              <Link
                key={item.title}
                to={item.to}
                className="flex items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                  0{index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.value} record{item.value === 1 ? "" : "s"} currently in this module
                  </p>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.value}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="pb-2 text-center text-xs text-slate-400">
        North South Group Command Center —{" "}
        {now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>
    </div>
  );
};

export default ViewDashboard;
