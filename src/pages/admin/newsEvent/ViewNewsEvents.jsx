import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNewsEventsStore } from "../../../store/newsEvent/newsEventStore";
import { MdAdd, MdEdit, MdDelete, MdVisibility, MdEvent } from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

const ViewNewsEvents = () => {
  const navigate = useNavigate();
  const { newsEvents, isLoading, loadNewsEvents, deleteNewsEvent } = useNewsEventsStore();

  useEffect(() => { loadNewsEvents(); }, [loadNewsEvents]);

  const handleDelete = async (id) => {
    try {
      await deleteNewsEvent(id);
      toast.success("News & Event deleted successfully!");
      await loadNewsEvents();
      navigate("/adminDashboard/viewNewsEvents");
    } catch { toast.error("Failed to delete"); }
  };

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 180 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 200 },
    {
      field: "actions", headerName: "Actions", minWidth: 130, sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-1.5">
          <Link to={`/adminDashboard/newsEventDetails/${p.id}`}>
            <button title="View" className="flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"><MdVisibility size={16} /></button>
          </Link>
          <Link to={`/adminDashboard/updateNewsEvents/${p.id}`}>
            <button title="Edit" className="flex items-center justify-center w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"><MdEdit size={16} /></button>
          </Link>
          <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"><MdDelete size={16} /></button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(newsEvents) ? newsEvents.map((n, i) => ({
    id: n._id, no: i + 1, title: n.title, description: n.description,
  })) : [];

  return (
    <AdminCollectionPage
      theme="rose"
      eyebrow="Newsroom"
      title="News & Events"
      description="Keep announcements, updates, and event stories organized with direct access to view, edit, and create flows."
      totalLabel="Total Entries"
      totalValue={rows.length}
      actionLabel="New Entry"
      actionTo="/adminDashboard/createNewsEvent"
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdEvent size={28} />}
      emptyTitle="No news or events yet"
      emptyText="Create your first news or event entry and it will appear here for quick editing."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={getAdminGridStyles("rose")}
        initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
        pageSizeOptions={[8, 15, 25]}
        disableRowSelectionOnClick
        autoHeight
      />
    </AdminCollectionPage>
  );
};

export default ViewNewsEvents;
