import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePartnerStore } from "../../../store/partners/partnersStore";
import { MdAdd, MdEdit, MdDelete, MdOutlineWorkspacePremium, MdOutlineImage } from "react-icons/md";

const gridStyles = {
  border: "none", fontFamily: "inherit",
  "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700, color: "#64748b", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" },
  "& .MuiDataGrid-row:hover": { backgroundColor: "#f8fafc" },
  "& .MuiDataGrid-cell": { borderBottom: "1px solid #f1f5f9", color: "#334155", fontSize: "0.875rem" },
  "& .MuiDataGrid-cell[data-field='actions']": { overflow: "visible" },
  "& .MuiDataGrid-footerContainer": { borderTop: "1px solid #e2e8f0", backgroundColor: "#f8fafc" },
};

const ViewPartners = () => {
  const navigate = useNavigate();
  const { partners, isLoading, loadPartners, deletePartners } = usePartnerStore();

  useEffect(() => { loadPartners(); }, [loadPartners]);

  const handleDelete = async (id) => {
    try {
      await deletePartners(id);
      toast.success("Partner deleted successfully!");
      await loadPartners();
      navigate("/adminDashboard/viewPartners");
    } catch { toast.error("Failed to delete partner"); }
  };

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    {
      field: "partnersImage", headerName: "Partner Logo", width: 170,
      renderCell: (p) => (
        p.value ? (
          <div className="flex h-full items-center">
            <div className="flex h-14 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 shadow-sm">
              <img src={p.value} alt="partner" className="max-h-10 w-full object-contain" />
            </div>
          </div>
        ) : <span className="text-slate-400 text-xs">No image</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Uploaded",
      minWidth: 150,
      valueFormatter: ({ value }) =>
        value ? new Date(value).toLocaleDateString() : "—",
    },
    {
      field: "actions", headerName: "Actions", width: 90, sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-1.5">
          <Link to={`/adminDashboard/updatePartners/${p.id}`}>
            <button title="Edit" className="flex items-center justify-center w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"><MdEdit size={16} /></button>
          </Link>
          <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"><MdDelete size={16} /></button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(partners) ? partners.map((p, i) => ({
    id: p._id, no: i + 1, partnersImage: p.partnersImage, createdAt: p.createdAt,
  })) : [];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[30px] border border-indigo-200 bg-[linear-gradient(135deg,#1f2248_0%,#4c3b88_46%,#ffffff_46.1%,#eef4ff_100%)] shadow-[0_30px_120px_-60px_rgba(49,21,102,0.65)]">
        <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-100">Partner Management</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Partners</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-indigo-50/85">
              Keep every partner logo organized, previewable, and easy to update from one place.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr,auto] sm:items-end">
            <div className="rounded-[24px] border border-indigo-100/80 bg-white/90 p-5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                  <MdOutlineWorkspacePremium size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-700">Total Logos</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{rows.length}</p>
                </div>
              </div>
            </div>
            <Link to="/adminDashboard/createPartners">
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                <MdAdd size={18} /> Add Partner
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
          <div className="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.4)]">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <MdOutlineImage size={28} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">No partner logos yet</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add your first partner logo and it will appear here with quick edit and delete actions.
                </p>
              </div>
            </div>
          ) : (
            <DataGrid rows={rows} columns={columns} sx={gridStyles}
            initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
            pageSizeOptions={[8, 15, 25]} disableRowSelectionOnClick autoHeight />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPartners;
