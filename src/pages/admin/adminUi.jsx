import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const collectionThemes = {
  indigo: {
    bannerBorder: "border-cyan-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#071c2c_0%,#164e63_46%,#ffffff_46.1%,#effcff_100%)]",
    eyebrowText: "text-cyan-100",
    panelIcon: "bg-cyan-100 text-cyan-700",
    panelText: "text-cyan-700",
    actionButton: "bg-slate-950 hover:bg-cyan-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(15,23,42,0.4)]",
    emptyIcon: "bg-cyan-50 text-cyan-600",
  },
  emerald: {
    bannerBorder: "border-emerald-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#06291f_0%,#0f5132_46%,#ffffff_46.1%,#effcf6_100%)]",
    eyebrowText: "text-emerald-100",
    panelIcon: "bg-emerald-100 text-emerald-700",
    panelText: "text-emerald-700",
    actionButton: "bg-slate-950 hover:bg-emerald-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(6,41,31,0.35)]",
    emptyIcon: "bg-emerald-50 text-emerald-600",
  },
  amber: {
    bannerBorder: "border-amber-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#3a2200_0%,#8a5a00_46%,#ffffff_46.1%,#fff8eb_100%)]",
    eyebrowText: "text-amber-100",
    panelIcon: "bg-amber-100 text-amber-700",
    panelText: "text-amber-700",
    actionButton: "bg-slate-950 hover:bg-amber-600",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(120,53,15,0.35)]",
    emptyIcon: "bg-amber-50 text-amber-600",
  },
  cyan: {
    bannerBorder: "border-sky-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#082f49_0%,#155e75_46%,#ffffff_46.1%,#effcff_100%)]",
    eyebrowText: "text-sky-100",
    panelIcon: "bg-sky-100 text-sky-700",
    panelText: "text-sky-700",
    actionButton: "bg-slate-950 hover:bg-sky-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(8,47,73,0.35)]",
    emptyIcon: "bg-sky-50 text-sky-600",
  },
  rose: {
    bannerBorder: "border-rose-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#3b0a1f_0%,#9f1239_46%,#ffffff_46.1%,#fff1f6_100%)]",
    eyebrowText: "text-rose-100",
    panelIcon: "bg-rose-100 text-rose-700",
    panelText: "text-rose-700",
    actionButton: "bg-slate-950 hover:bg-rose-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(159,18,57,0.3)]",
    emptyIcon: "bg-rose-50 text-rose-600",
  },
  teal: {
    bannerBorder: "border-teal-200",
    bannerBg:
      "bg-[linear-gradient(135deg,#072a29_0%,#115e59_46%,#ffffff_46.1%,#effdfb_100%)]",
    eyebrowText: "text-teal-100",
    panelIcon: "bg-teal-100 text-teal-700",
    panelText: "text-teal-700",
    actionButton: "bg-slate-950 hover:bg-teal-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(17,94,89,0.32)]",
    emptyIcon: "bg-teal-50 text-teal-600",
  },
  slate: {
    bannerBorder: "border-slate-300",
    bannerBg:
      "bg-[linear-gradient(135deg,#0f172a_0%,#334155_46%,#ffffff_46.1%,#f8fafc_100%)]",
    eyebrowText: "text-slate-100",
    panelIcon: "bg-slate-100 text-slate-700",
    panelText: "text-slate-700",
    actionButton: "bg-slate-950 hover:bg-slate-700",
    shellShadow: "shadow-[0_24px_80px_-48px_rgba(15,23,42,0.4)]",
    emptyIcon: "bg-slate-100 text-slate-600",
  },
};

export const getAdminGridStyles = () => ({
  border: "none",
  fontFamily: "inherit",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
    color: "#64748b",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#f8fafc",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    fontSize: "0.875rem",
  },
  "& .MuiDataGrid-cell[data-field='actions']": {
    overflow: "visible",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
});

export function AdminCollectionPage({
  theme = "indigo",
  eyebrow,
  title,
  description,
  totalLabel = "Total Entries",
  totalValue = 0,
  actionLabel,
  actionTo,
  actionIcon,
  loading = false,
  rowsLength = 0,
  emptyIcon,
  emptyTitle,
  emptyText,
  children,
}) {
  const palette = collectionThemes[theme] || collectionThemes.indigo;

  return (
    <div className="space-y-6">
      <div
        className={`overflow-hidden rounded-[30px] border ${palette.bannerBorder} ${palette.bannerBg} shadow-[0_30px_120px_-60px_rgba(15,23,42,0.45)]`}
      >
        <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.35em] ${palette.eyebrowText}`}>
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
              {description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr,auto] sm:items-end">
            <div className="rounded-[24px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${palette.panelIcon}`}
                >
                  {emptyIcon}
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.24em] ${palette.panelText}`}>
                    {totalLabel}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{totalValue}</p>
                </div>
              </div>
            </div>

            {actionLabel && actionTo ? (
              <Link to={actionTo}>
                <button
                  className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition ${palette.actionButton}`}
                >
                  {actionIcon}
                  {actionLabel}
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-[28px] border border-slate-200 bg-white py-20 shadow-sm">
          <div className="flex items-center gap-3 text-slate-500">
            <FaSpinner className="animate-spin" />
            <span className="text-sm font-medium">Loading dashboard data...</span>
          </div>
        </div>
      ) : rowsLength === 0 ? (
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center ${palette.shellShadow}`}
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${palette.emptyIcon}`}>
            {emptyIcon}
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">{emptyTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{emptyText}</p>
          </div>
        </div>
      ) : (
        <div
          className={`overflow-hidden rounded-[28px] border border-slate-200 bg-white ${palette.shellShadow}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
