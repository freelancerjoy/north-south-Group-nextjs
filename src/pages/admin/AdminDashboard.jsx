import { useState, useEffect, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ViewDashboard from "./ViewDashboard";
import { useAuthStore } from "../../store/auth/authStore.jsx";
import {
  MdDashboard,
  MdApartment,
  MdEmail,
  MdMenu,
  MdClose,
  MdEvent,
  MdRateReview,
  MdBusiness, // Import for Concerns
  MdHandshake,
  MdBookOnline,
  MdLogout,
  MdManageAccounts,
  MdChevronRight,
  MdViewCarousel,
} from "react-icons/md";
import { FaLeaf, FaCity, FaIndustry } from "react-icons/fa";

const drawerWidth = 296;

const navSections = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        to: "/adminDashboard/viewDashboard",
        icon: <MdDashboard size={20} />,
        match: ["viewDashboard"],
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Projects",
        to: "viewProjects",
        icon: <MdApartment size={20} />,
        match: ["viewProjects", "createProject", "updateProject", "projectDetails"],
      },
      {
        label: "News & Events",
        to: "viewNewsEvents",
        icon: <MdEvent size={20} />,
        match: ["viewNewsEvents", "createNewsEvent", "updateNewsEvents", "newsEventDetails"],
      },
      {
        label: "Green City",
        to: "viewGreenCity",
        icon: <FaLeaf size={18} />,
        match: ["viewGreenCity", "createGreenCity", "updateGreenCity"],
      },
      {
        label: "Square City",
        to: "viewSquareCity",
        icon: <FaCity size={18} />,
        match: ["viewSquareCity", "createSquareCity", "updateSquareCity"],
      },
      {
        label: "Industrial City",
        to: "viewIndustrialCity",
        icon: <FaIndustry size={18} />,
        match: ["viewIndustrialCity", "createIndustrialCity", "updateIndustrialCity"],
      },
      {
        label: "Home Slider",
        to: "viewHomeSlider",
        icon: <MdViewCarousel size={20} />,
        match: ["viewHomeSlider", "createHomeSlider", "updateHomeSlider"],
      },
      {
        label: "Commercial Project",
        to: "viewCommercialProject",
        icon: <MdApartment size={18} />,
        match: ["viewCommercialProject", "createCommercialProject", "updateCommercialProject"],
      },
      {
        label: "Reviews",
        to: "viewReview",
        icon: <MdRateReview size={20} />,
        match: ["viewReview", "createReview", "updateReview", "reviewDetails"],
      },
      {
        label: "Partners",
        to: "viewPartners",
        icon: <MdHandshake size={20} />,
        match: ["viewPartners", "createPartners", "updatePartners"],
      },
      {
        label: "Concerns",
        to: "viewConcerns",
        icon: <MdBusiness size={20} />,
        match: ["viewConcerns", "createConcern", "updateConcern", "concernDetails"],
      },
      {
        label: "Menu",
        to: "menuSettings",
        icon: <MdMenu size={20} />,
        match: ["menuSettings"],
      },
      {
        label: "About Page",
        to: "aboutPageSettings",
        icon: <MdBusiness size={20} />,
        match: ["aboutPageSettings"],
      },
    ],
  },
  {
    label: "Engagement",
    items: [
      {
        label: "Contact",
        to: "viewContact",
        icon: <MdEmail size={20} />,
        match: ["viewContact", "updateContact", "contactDetails"],
      },
      {
        label: "Contact Info",
        to: "contactInfoSettings",
        icon: <MdEmail size={20} />,
        match: ["contactInfoSettings"],
      },
      {
        label: "Plot Booking",
        to: "viewPlotBooking",
        icon: <MdBookOnline size={20} />,
        match: ["viewPlotBooking"],
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "My Profile",
        to: "adminProfile",
        icon: <MdManageAccounts size={20} />,
        match: ["adminProfile"],
      },
    ],
  },
];

export default function AdminDashboard() {
  const isMobileNow = () => typeof window !== "undefined" && window.innerWidth < 768;
  const [open, setOpen] = useState(!isMobileNow());
  const [isMobile, setIsMobile] = useState(isMobileNow());
  const location = useLocation();
  const { user, logoutUser } = useAuthStore();
  const profilePicUrl = user?.profilePic?.url;
  const routeMeta = {
    viewDashboard: {
      title: "Dashboard",
      description: "Track every module, monitor counts, and jump into the next admin action quickly.",
    },
    viewProjects: {
      title: "Projects",
      description: "Manage real-estate projects, details, media, and brochure content from one place.",
    },
    createProject: {
      title: "Create Project",
      description: "Build a new project entry with structured sections, media uploads, and brochure support.",
    },
    updateProject: {
      title: "Update Project",
      description: "Edit existing project details, media, and brochure files without losing visibility.",
    },
    projectDetails: {
      title: "Project Details",
      description: "Review the saved project data exactly as it is stored inside the admin system.",
    },
    viewNewsEvents: {
      title: "News & Events",
      description: "Keep every news item and event record organized, editable, and easy to publish.",
    },
    createNewsEvent: {
      title: "Create News Event",
      description: "Add a fresh news or event entry with content and images in one flow.",
    },
    updateNewsEvents: {
      title: "Update News Event",
      description: "Refresh titles, descriptions, and media while keeping the current entry visible.",
    },
    newsEventDetails: {
      title: "News Event Details",
      description: "Inspect the saved news and event content before making additional edits.",
    },
    viewGreenCity: {
      title: "Green City",
      description: "Manage Green City media, hero video, gallery content, and brochure assets.",
    },
    createGreenCity: {
      title: "Create Green City",
      description: "Add a new Green City media entry with previews, brochure visuals, and content.",
    },
    updateGreenCity: {
      title: "Update Green City",
      description: "Replace media and refresh Green City content without losing the current preview.",
    },
    viewSquareCity: {
      title: "Square City",
      description: "Organize Square City content, hero media, brochure cover, and gallery assets.",
    },
    createSquareCity: {
      title: "Create Square City",
      description: "Prepare a new Square City entry with instant previews and structured copy blocks.",
    },
    updateSquareCity: {
      title: "Update Square City",
      description: "Swap media and update Square City content while keeping the existing state visible.",
    },
    viewIndustrialCity: {
      title: "Industrial City",
      description: "Manage Industrial City hero video, brochure visuals, and supporting gallery assets.",
    },
    createIndustrialCity: {
      title: "Create Industrial City",
      description: "Create a fresh Industrial City media entry with the same polished admin flow.",
    },
    updateIndustrialCity: {
      title: "Update Industrial City",
      description: "Replace media and save Industrial City content updates with full loading feedback.",
    },
    viewReview: {
      title: "Reviews",
      description: "Control testimonial content, reviewer identity, and linked review videos.",
    },
    createReview: {
      title: "Create Review",
      description: "Publish a new client or brand review with supporting reviewer details.",
    },
    updateReview: {
      title: "Update Review",
      description: "Edit review content, reviewer information, and the associated video link.",
    },
    reviewDetails: {
      title: "Review Details",
      description: "Inspect the stored review content before making further adjustments.",
    },
    viewPartners: {
      title: "Partners",
      description: "Manage partner logos, preview replacements, and keep brand assets organized.",
    },
    createPartners: {
      title: "Create Partner",
      description: "Upload a fresh partner logo with instant preview before it goes live.",
    },
    updatePartners: {
      title: "Update Partner",
      description: "Replace the existing partner logo while keeping both current and new visuals visible.",
    },
    viewContact: {
      title: "Contacts",
      description: "Review inquiries, responses, and contact form messages from the site.",
    },
    updateContact: {
      title: "Update Contact",
      description: "Adjust contact message details and manage the saved inquiry data.",
    },
    contactDetails: {
      title: "Contact Details",
      description: "Open a full contact record to review the saved message and sender information.",
    },
    contactInfoSettings: {
      title: "Contact Info Settings",
      description: "Update office addresses, phone numbers, email addresses, and website links.",
    },
    aboutPageSettings: {
      title: "About Page Settings",
      description: "Update the public About Us page content, leadership section, CSR gallery, and key company messaging.",
    },
    viewPlotBooking: {
      title: "Plot Bookings",
      description: "Track submitted booking requests, buyer information, and reserved plot details.",
    },
    menuSettings: {
      title: "Menu Settings",
      description: "Arrange the Our Concern menu links and control which items appear on the public site.",
    },
    adminProfile: {
      title: "Admin Profile",
      description: "Manage your profile image, account information, and password from one place.",
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const handleNavClick = useCallback(() => {
    if (isMobile) setOpen(false);
  }, [isMobile]);

  const logOut = async () => {
    try {
      await logoutUser();
    } catch {
      // handled by store
    }
  };

  const getCurrentSegment = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    let segment = parts[parts.length - 1] || "viewDashboard";
    if (/^[a-f\d]{24}$/i.test(segment)) {
      segment = parts[parts.length - 2] || "viewDashboard";
    }
    if (segment === "adminDashboard") {
      return "viewDashboard";
    }
    return segment;
  };

  const currentSegment = getCurrentSegment();
  const currentMeta =
    routeMeta[currentSegment] || {
      title: currentSegment.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
      description: "Manage and update the content inside this admin section.",
    };

  const isActive = (item) =>
    item.match.some((segment) => location.pathname.includes(segment));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),transparent_18%),linear-gradient(180deg,#f6f8fb_0%,#eef3f8_100%)] text-slate-900">
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className="fixed left-0 top-0 z-50 flex h-full flex-col border-r border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),transparent_22%),linear-gradient(180deg,#061322_0%,#0b1c30_46%,#0f172a_100%)] text-white shadow-[0_30px_120px_-48px_rgba(2,6,23,0.9)] transition-transform duration-300"
        style={{
          width: drawerWidth,
          transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
        }}
      >
        <div className="border-b border-slate-800/80 px-5 py-5">
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-200/80">
                North South Group
              </p>
              <p className="mt-1 text-lg font-black tracking-tight text-white">Command Center</p>
            </div>
          </Link>

          <div className="mt-5 rounded-[22px] border border-cyan-500/20 bg-white/5 p-4 backdrop-blur">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
              Workspace Focus
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Manage projects, brand media, inquiries, and site content from one premium admin workspace.
            </p>
          </div>
        </div>

        <nav className="scrollbar-hide flex-1 overflow-y-auto px-4 py-5">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                {section.label}
              </p>
              <div className="mt-3 space-y-1.5">
                {section.items.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={handleNavClick}
                      className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-cyan-500/16 text-white ring-1 ring-cyan-400/30 shadow-[0_18px_42px_-24px_rgba(34,211,238,0.55)]"
                          : "text-slate-300 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
                          active
                            ? "bg-cyan-400/18 text-cyan-100"
                            : "bg-white/6 text-slate-400 group-hover:text-cyan-200"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate">{item.label}</p>
                      </div>
                      <MdChevronRight
                        size={18}
                        className={`transition-all ${
                          active ? "text-cyan-100" : "text-slate-600 group-hover:text-cyan-200"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-3 border-t border-slate-800/80 p-4">
          <Link
            to="adminProfile"
            onClick={handleNavClick}
            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-3 py-3 transition hover:bg-white/8"
          >
            {profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="avatar"
                className="h-11 w-11 rounded-2xl object-cover ring-2 ring-cyan-400/50"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/20 text-sm font-bold text-white ring-2 ring-cyan-400/30">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">Admin account · Open profile</p>
            </div>
          </Link>
          <button
            onClick={logOut}
            className="flex w-full items-center gap-3 rounded-2xl border border-rose-500/15 px-4 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div
        className="min-w-0 flex min-h-screen flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: !isMobile && open ? drawerWidth : 0 }}
      >
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <button
                onClick={toggleDrawer}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {open ? <MdClose size={20} /> : <MdMenu size={20} />}
              </button>

              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Admin Workspace
                </p>
                <h1 className="mt-1 truncate text-2xl font-black tracking-tight text-slate-900">
                  {currentMeta.title}
                </h1>
                <p className="mt-1 hidden truncate text-sm text-slate-500 lg:block">
                  {currentMeta.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm lg:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Today
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Signed In
                  </p>
                  <p className="mt-1 max-w-[140px] truncate text-sm font-semibold text-slate-800">
                    {user?.name || "Admin User"}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-2.5 py-1.5 min-w-0">
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt="avatar"
                      className="h-8 w-8 flex-shrink-0 rounded-2xl object-cover"
                />
              ) : (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-xs font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                </div>
              )}
                  <span className="max-w-[110px] truncate text-sm font-semibold text-slate-700 sm:max-w-[140px]">
                    {user?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
            {!location.pathname.includes("/adminDashboard/") && <ViewDashboard />}
            {location.pathname !== "/adminDashboard" && <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
