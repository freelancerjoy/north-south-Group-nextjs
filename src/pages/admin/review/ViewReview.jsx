import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReviewStore } from "../../../store/review/reviewStore";
import { MdAdd, MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

const ViewReview = () => {
  const navigate = useNavigate();
  const { reviews, isLoading, loadReviews, deleteReview } = useReviewStore();

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      toast.success("Review deleted successfully!");
      await loadReviews();
      navigate("/adminDashboard/viewReview");
    } catch { toast.error("Failed to delete review"); }
  };

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Reviewer", width: 150 },
    { field: "designation", headerName: "Designation", width: 160 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 180 },
    {
      field: "reviewVideo", headerName: "Video", width: 90,
      renderCell: (p) => (
        p.value ? <video src={p.value} width="50" height="40" style={{ objectFit: "cover", borderRadius: "6px" }} /> : <span className="text-slate-400 text-xs">—</span>
      ),
    },
    {
      field: "actions", headerName: "Actions", minWidth: 130, sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-1.5">
          <Link to={`/adminDashboard/reviewDetails/${p.id}`}>
            <button title="View" className="flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"><MdVisibility size={16} /></button>
          </Link>
          <Link to={`/adminDashboard/updateReview/${p.id}`}>
            <button title="Edit" className="flex items-center justify-center w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"><MdEdit size={16} /></button>
          </Link>
          <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"><MdDelete size={16} /></button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(reviews) ? reviews.map((r, i) => ({
    id: r._id, no: i + 1, title: r.title, name: r.name,
    designation: r.designation, description: r.description, reviewVideo: r.reviewVideo,
  })) : [];

  return (
    <AdminCollectionPage
      theme="rose"
      eyebrow="Brand Voice"
      title="Reviews"
      description="Control testimonial content, inspect review videos, and open the right entry fast from one premium table."
      totalLabel="Total Reviews"
      totalValue={rows.length}
      actionLabel="New Review"
      actionTo="/adminDashboard/createReview"
      actionIcon={<MdAdd size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdVisibility size={28} />}
      emptyTitle="No reviews yet"
      emptyText="Create your first review and it will appear here with direct view, edit, and delete actions."
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

export default ViewReview;
