import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCommercialProjectStore } from "../../../store/commercialProject/commercialProjectStore";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdImageNotSupported,
} from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

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

const ViewCommercialProject = () => {
  const navigate = useNavigate();
  const { commercialProject, isLoading, loadCommercialProject, deleteCommercialProject } = useCommercialProjectStore();

  useEffect(() => { loadCommercialProject(); }, [loadCommercialProject]);

  const handleDelete = async (id) => {
    try {
      if (deleteCommercialProject) {
        await deleteCommercialProject(id);
        toast.success("Commercial Project deleted!");
        await loadCommercialProject();
        navigate("/adminDashboard/viewCommercialProject");
      } else {
        toast.error("Delete action not available in store");
      }
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
      field: "heroTitle",
      headerName: "Commercial Project",
      minWidth: 280,
      flex: 1,
      renderCell: (p) => (
        <div className="flex w-full items-center gap-4">
          <div className="flex h-16 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {p.row.heroImage ? (
              <img
                src={p.row.heroImage instanceof File ? URL.createObjectURL(p.row.heroImage) : p.row.heroImage}
                alt="Hero"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                <MdImageNotSupported size={24} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{p.row.heroTitle || "No Title"}</p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {p.row.heroSubtitle || "No Subtitle"}
            </p>
          </div>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-2">
          <Link to={`/adminDashboard/updateCommercialProject/${p.id}`}>
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

  let rows = [];
  if (Array.isArray(commercialProject)) {
    rows = commercialProject.map((item, i) => ({
      id: item._id, no: i + 1, heroTitle: item.heroTitle, heroSubtitle: item.heroSubtitle, heroImage: item.heroImage
    }));
  } else if (commercialProject) {
    rows = [{
      id: commercialProject._id, no: 1, heroTitle: commercialProject.heroTitle, heroSubtitle: commercialProject.heroSubtitle, heroImage: commercialProject.heroImage
    }];
  }

  return (
    <AdminCollectionPage
      theme="sky"
      eyebrow="Page Settings"
      title="Commercial Project"
      description="Manage Commercial Project content."
      totalLabel="Entries"
      totalValue={rows.length}
      actionLabel="Create Entry"
      actionTo="/adminDashboard/createCommercialProject"
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<FaBuilding size={24} />}
      emptyTitle="No Commercial Project entries yet"
      emptyText="Create an entry to display on the page."
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

export default ViewCommercialProject;
