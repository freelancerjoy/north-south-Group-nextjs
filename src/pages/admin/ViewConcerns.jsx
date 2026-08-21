import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useConcernStore } from "../../store/concern/concernStore";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdBusiness, // A suitable icon for business concerns
} from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "./adminUi";
import { entityId } from "../../utils/entity";

const ViewConcerns = () => {
  const { concerns, isLoading, loadConcerns, deleteConcern } = useConcernStore();

  useEffect(() => {
    loadConcerns();
  }, [loadConcerns]);

  const handleDelete = async (id) => {
    try {
      await deleteConcern(id);
      // The store's deleteConcern already updates the state, so no need to reload or navigate
      // toast.success is handled by the store
    } catch (error) {
      // toast.error is handled by the store
      console.error("Error deleting concern:", error);
    }
  };

  const rows = Array.isArray(concerns) ? concerns.map((c, i) => ({
    id: entityId(c),
    no: i + 1,
    title: c.title,
    subtitle: c.subtitle,
    eyebrow: c.eyebrow,
    theme: c.theme,
    sortOrder: c.sortOrder,
    heroImage: c.heroImage, // Used for preview in the table
  })) : [];

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    {
      field: "title",
      headerName: "Concern Title",
      flex: 1,
      minWidth: 200,
      renderCell: (p) => (
        <div className="flex w-full items-center gap-3">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {p.row.heroImage ? (
              <img src={p.row.heroImage} alt={p.value} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700">
                <MdBusiness size={24} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{p.value}</p>
            <p className="mt-1 truncate text-xs text-slate-500">{p.row.eyebrow}</p>
          </div>
        </div>
      ),
    },
    { field: "subtitle", headerName: "Subtitle", flex: 1.5, minWidth: 250 },
    { field: "theme", headerName: "Theme", width: 100 },
    {
      field: "actions", headerName: "Actions", minWidth: 130, sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-1.5">
          {/* Assuming a details page for each concern, or direct link to the public page */}
          <Link to={`/adminDashboard/concernDetails/${p.id}`}>
            <button title="View" className="flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"><MdVisibility size={16} /></button>
          </Link>
          <Link to={`/adminDashboard/updateConcern/${p.id}`}>
            <button title="Edit" className="flex items-center justify-center w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"><MdEdit size={16} /></button>
          </Link>
          <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"><MdDelete size={16} /></button>
        </div>
      ),
    },
  ];

  return (
    <AdminCollectionPage
      theme="teal" // You can choose a theme color for this admin page
      eyebrow="Business Units"
      title="Our Concerns"
      description="Manage all business concern pages, including their content, images, and details."
      totalLabel="Total Concerns"
      totalValue={rows.length}
      actionLabel="New Concern"
      actionTo="/adminDashboard/createConcern" // Link to the create concern page
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdBusiness size={28} />}
      emptyTitle="No concerns found"
      emptyText="Create your first concern page and it will appear here for quick management."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={getAdminGridStyles("teal")} // Apply consistent admin grid styling
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

export default ViewConcerns;
