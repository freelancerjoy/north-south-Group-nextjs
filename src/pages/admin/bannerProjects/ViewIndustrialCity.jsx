import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIndustrialCityStore } from "../../../store/industrialCity/industrialCityStore";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVideocamOff,
} from "react-icons/md";
import { FaIndustry, FaYoutube } from "react-icons/fa";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";
import { getYouTubeEmbedUrl } from "../../../components/VideoUtility";

const mediaGridStyles = {
  ...getAdminGridStyles(),
  backgroundColor: "#ffffff",
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    fontSize: "0.875rem",
    alignItems: "center",
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
};

const ViewIndustrialCity = () => {
  const navigate = useNavigate();
  const { industrialCity, isLoading, loadIndustrialCity, deleteIndustrialCity } = useIndustrialCityStore();

  useEffect(() => { loadIndustrialCity(); }, [loadIndustrialCity]);

  const handleDelete = async (id) => {
    try {
      await deleteIndustrialCity(id);
      toast.success("Industrial City entry deleted!");
      await loadIndustrialCity();
      navigate("/adminDashboard/viewIndustrialCity");
    } catch { toast.error("Failed to delete"); }
  };

  const columns = [
    {
      field: "no",
      headerName: "#",
      width: 80,
      renderCell: (p) => (
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700">
          {p.value}
        </div>
      ),
    },
    {
      field: "industrialCityVideo",
      headerName: "02. প্রজেক্ট পরিচিতি Video",
      minWidth: 260,
      flex: 1,
      renderCell: (p) => {
        const embedUrl = p.value ? getYouTubeEmbedUrl(p.value) : null;
        return (
          <div className="flex w-full items-center gap-3">
            <div className="flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {p.value ? (
                embedUrl ? (
                  <iframe src={embedUrl} title="YouTube Preview" className="h-full w-full pointer-events-none" frameBorder="0" />
                ) : (
                  <video src={p.value} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  <MdVideocamOff size={20} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-bold text-slate-900">Overview Video</p>
                {embedUrl && (
                  <span className="inline-flex items-center gap-1 rounded bg-rose-100 px-1 py-0.5 text-[9px] font-bold text-rose-600">
                    <FaYoutube size={10} /> YouTube
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                {p.value ? (embedUrl ? "YouTube link active" : "MP4 video saved") : "No video uploaded"}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-cyan-700">
                {p.row.videoGalleryCount} gallery video{p.row.videoGalleryCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      field: "locationTourVideo",
      headerName: "03. Location & Video Tour",
      minWidth: 260,
      flex: 1,
      renderCell: (p) => {
        const embedUrl = p.value ? getYouTubeEmbedUrl(p.value) : null;
        return (
          <div className="flex w-full items-center gap-3">
            <div className="flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {p.value ? (
                embedUrl ? (
                  <iframe src={embedUrl} title="Location Tour Preview" className="h-full w-full pointer-events-none" frameBorder="0" />
                ) : (
                  <video src={p.value} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  <MdVideocamOff size={20} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-bold text-slate-900">Tour Video</p>
                {embedUrl && (
                  <span className="inline-flex items-center gap-1 rounded bg-rose-100 px-1 py-0.5 text-[9px] font-bold text-rose-600">
                    <FaYoutube size={10} /> YouTube
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                {p.value ? (embedUrl ? "YouTube tour active" : "MP4 tour saved") : "Default tour video"}
              </p>
              <span className="mt-0.5 inline-block text-[10px] font-semibold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                Section 03 Tour
              </span>
            </div>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2">
          <Link to={`/adminDashboard/updateIndustrialCity/${p.id}`}>
            <button
              title="Edit"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700 transition hover:bg-sky-100"
            >
              <MdEdit size={18} />
            </button>
          </Link>
          <button
            title="Delete"
            onClick={() => handleDelete(p.id)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700 transition hover:bg-rose-100"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(industrialCity) ? industrialCity.map((item, i) => ({
    id: item._id,
    no: i + 1,
    industrialCityVideo: item.industrialCityVideo,
    locationTourVideo: item.locationTourVideo,
    videoGalleryCount: item.videoGallery?.length || 0,
  })) : [];

  return (
    <AdminCollectionPage
      theme="cyan"
      eyebrow="Banner Project"
      title="Industrial City"
      description="Manage Industrial City hero video records and open edit actions from one cleaner media table."
      totalLabel="Video Entries"
      totalValue={rows.length}
      actionLabel="Upload Video"
      actionTo="/adminDashboard/createIndustrialCity"
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<FaIndustry size={24} />}
      emptyTitle="No Industrial City entries yet"
      emptyText="Upload an Industrial City video entry and it will appear here for quick management."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={mediaGridStyles}
        initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
        pageSizeOptions={[8, 15, 25]}
        disableRowSelectionOnClick
        autoHeight
        rowHeight={84}
        columnHeaderHeight={56}
      />
    </AdminCollectionPage>
  );
};

export default ViewIndustrialCity;
