import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../store/project/projectStore";
import { toast } from "react-toastify";
import {
  MdAdd,
  MdApartment,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdOutlineLocationOn,
} from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

const statusClasses = {
  Ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Ongoing: "border-amber-200 bg-amber-50 text-amber-700",
  Upcoming: "border-slate-200 bg-slate-100 text-slate-700",
};

const formatHandover = (value) => {
  if (!value) return "Not set";
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return value;
};

const projectGridStyles = {
  ...getAdminGridStyles(),
  backgroundColor: "#ffffff",
  "& .MuiDataGrid-row": {
    backgroundColor: "#ffffff",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    fontSize: "0.875rem",
    alignItems: "center",
    display: "flex",
    backgroundColor: "transparent",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
};

const ViewProjects = () => {
  const navigate = useNavigate();
  const { projects, isLoading, loadProjects, deleteProject } = useProjectStore();

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      await loadProjects();
      navigate("/adminDashboard/viewProjects");
    } catch {
      toast.error("Failed to delete project");
    }
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
      field: "title",
      headerName: "Project Title",
      flex: 1.2,
      minWidth: 240,
      renderCell: (p) => (
        <div className="flex w-full items-center gap-3">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {p.row.coverImage ? (
              <img src={p.row.coverImage} alt={p.value} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-100 to-slate-100 text-cyan-700">
                <MdApartment size={24} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{p.value}</p>
            <p className="mt-1 truncate text-xs text-slate-500">Project cover and management actions</p>
          </div>
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 160,
      flex: 0.8,
      renderCell: (p) => (
        <a
          href={p.value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
        >
          <MdOutlineLocationOn size={16} />
          View Map
        </a>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (p) => (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${
            statusClasses[p.value] || statusClasses.Upcoming
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current opacity-80" />
          {p.value}
        </span>
      ),
    },
    {
      field: "handover",
      headerName: "Handover",
      width: 150,
      renderCell: (p) => (
        <span className="truncate text-sm font-medium text-slate-700" title={p.value}>
          {formatHandover(p.value)}
        </span>
      ),
    },
    {
      field: "buildingType",
      headerName: "Type",
      width: 130,
      renderCell: (p) => (
        <span
          className="inline-flex max-w-full items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700"
          title={p.value}
        >
          <span className="truncate">{p.value || "Not added"}</span>
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2">
          <Link to={`/adminDashboard/projectDetails/${p.id}`}>
            <button
              title="View"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
            >
              <MdVisibility size={18} />
            </button>
          </Link>
          <Link to={`/adminDashboard/updateProject/${p.id}`}>
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

  const rows = Array.isArray(projects) ? projects.map((p, i) => ({
    id: p._id,
    no: i + 1,
    title: p.title,
    coverImage: p.image?.[0] || null,
    location: p.location,
    status: p.status,
    handover: p.specs?.handover,
    buildingType: p.specs?.buildingType,
  })) : [];

  return (
    <AdminCollectionPage
      theme="indigo"
      eyebrow="Project Pipeline"
      title="Projects"
      description="Manage every project entry, keep brochure files updated, and jump into view or edit flows from one polished list."
      totalLabel="Total Projects"
      totalValue={rows.length}
      actionLabel="New Project"
      actionTo="/adminDashboard/createProject"
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdApartment size={28} />}
      emptyTitle="No projects found"
      emptyText="Create your first project and it will appear here with quick view, edit, and delete actions."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={projectGridStyles}
        initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
        pageSizeOptions={[8, 15, 25]}
        disableRowSelectionOnClick
        autoHeight
        rowHeight={76}
        columnHeaderHeight={56}
      />
    </AdminCollectionPage>
  );
};

export default ViewProjects;
