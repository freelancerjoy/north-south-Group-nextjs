import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useHomeSliderStore } from '../../../store/homeSlider/homeSliderStore';

const ViewHomeSlider = () => {
    const navigate = useNavigate();
    const { slides, loadSlides, deleteSlide } = useHomeSliderStore();

    useEffect(() => {
        loadSlides();
    }, [loadSlides]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this slide?")) {
            await deleteSlide(id);
        }
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { 
            field: 'image', 
            headerName: 'Image', 
            width: 150,
            renderCell: (params) => (
                <img 
                    src={params.row.image?.url || params.row.image || ""} 
                    alt="slide" 
                    className="h-10 w-10 object-cover rounded-md"
                />
            )
        },
        { field: 'eyebrow', headerName: 'Eyebrow', width: 150 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'subtitle', headerName: 'Subtitle', width: 200 },
        { field: 'sortOrder', headerName: 'Sort Order', type: 'number', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <IconButton color="primary" onClick={() => navigate(`/adminDashboard/updateHomeSlider/${params.row._id}`)}>
                        <MdEdit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row._id)}>
                        <MdDelete />
                    </IconButton>
                </div>
            )
        }
    ];

    return (
        <div className="p-4 bg-white shadow-md rounded-md mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Home Slider Management</h2>
                <Button variant="contained" color="primary" onClick={() => navigate('/adminDashboard/createHomeSlider')}>
                    Add Slide
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={slides || []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSizeOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ViewHomeSlider;
