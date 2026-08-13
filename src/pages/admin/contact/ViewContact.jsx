import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContactStore } from "../../../store/contact/contactStore";
import { MdVisibility, MdEdit, MdDelete, MdEmail } from "react-icons/md";
import { AdminCollectionPage, getAdminGridStyles } from "../adminUi";

const ViewContact = () => {
  const navigate = useNavigate();
  const { contacts, isLoading, loadContacts, deleteContact } = useContactStore();

  useEffect(() => { loadContacts(); }, [loadContacts]);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully!");
      await loadContacts();
      navigate("/adminDashboard/viewContact");
    } catch { toast.error("Failed to delete contact"); }
  };

  const columns = [
    { field: "no", headerName: "#", width: 60 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "number", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 160 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 180 },
    {
      field: "actions", headerName: "Actions", minWidth: 130, sortable: false,
      renderCell: (p) => (
        <div className="flex items-center gap-1.5">
          <Link to={`/adminDashboard/contactDetails/${p.id}`}>
            <button title="View" className="flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"><MdVisibility size={16} /></button>
          </Link>
          <Link to={`/adminDashboard/updateContact/${p.id}`}>
            <button title="Edit" className="flex items-center justify-center w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"><MdEdit size={16} /></button>
          </Link>
          <button title="Delete" onClick={() => handleDelete(p.id)} className="flex items-center justify-center w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"><MdDelete size={16} /></button>
        </div>
      ),
    },
  ];

  const rows = Array.isArray(contacts) ? contacts.filter(Boolean).map((c, i) => ({
    id: c._id, no: i + 1, name: c.name || c.fullName || "-",
    number: c.number || "-", address: c.address || "-",
    email: c.email || "-", message: c.message || "-",
  })) : [];

  return (
    <AdminCollectionPage
      theme="teal"
      eyebrow="Inquiry Desk"
      title="Contacts & Schedules"
      description="Review all incoming contact records, open full details, and maintain clean follow-up data inside the dashboard."
      totalLabel="Total Contacts"
      totalValue={rows.length}
      actionLabel="Contact Info"
      actionTo="/adminDashboard/contactInfoSettings"
      actionIcon={<MdEmail size={18} />}
      loading={isLoading}
      rowsLength={rows.length}
      emptyIcon={<MdEmail size={28} />}
      emptyTitle="No contact submissions yet"
      emptyText="New website inquiries will appear here automatically once someone submits the contact form."
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={getAdminGridStyles("teal")}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        autoHeight
      />
    </AdminCollectionPage>
  );
};

export default ViewContact;
