import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePlotBookingStore } from "../../../store/plotbooking/plotBookingStore";
import { MdDelete, MdBookOnline } from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

const ViewPlotBooking = () => {
  const navigate = useNavigate();
  const { bookings, isLoading, loadBookings, deleteBooking } = usePlotBookingStore();

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      toast.success("Plot booking deleted successfully!");
      await loadBookings();
      navigate("/adminDashboard/viewPlotBooking");
    } catch { toast.error("Failed to delete plot booking"); }
  };

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "block", headerName: "Block", width: 90 },
    { field: "plotNo", headerName: "Plot No", width: 100 },
    { field: "size", headerName: "Size (Katha)", width: 120 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 160 },
    { field: "road", headerName: "Road", width: 120 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    {
      field: "actions", headerName: "Actions", width: 70, sortable: false,
      renderCell: (p) => (
        <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors">
          <MdDelete size={16} />
        </button>
      ),
    },
  ];

  const rows = Array.isArray(bookings) ? bookings.filter(Boolean).map((b, i) => ({
    id: b._id, no: i + 1, name: b.name || "-", block: b.block || "-",
    plotNo: b.plotNo || "-", size: b.size || "-", address: b.address || "-",
    road: b.road || "-", phone: b.phone || "-", email: b.email || "-",
  })) : [];

  return (
    <AdminCollectionPage
      theme="amber"
      eyebrow="Lead Desk"
      title="Plot Bookings"
      description="Track every plot booking request, inspect buyer information quickly, and keep your lead pipeline clean."
      totalLabel="Total Bookings"
      totalValue={rows.length}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdBookOnline size={28} />}
      emptyTitle="No plot bookings yet"
      emptyText="Submitted booking requests will appear here with complete buyer and plot information."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={getAdminGridStyles("amber")}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        autoHeight
      />
    </AdminCollectionPage>
  );
};

export default ViewPlotBooking;
