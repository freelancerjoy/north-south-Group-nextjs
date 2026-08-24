import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeSliderStore } from '../../../store/homeSlider/homeSliderStore';

const CreateHomeSlider = () => {
    const navigate = useNavigate();
    const { addSlide } = useHomeSliderStore();

    const [formData, setFormData] = useState({
        eyebrow: '',
        title: '',
        subtitle: '',
        sortOrder: 0
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('eyebrow', formData.eyebrow);
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle);
        data.append('sortOrder', String(formData.sortOrder));
        if (image) {
            data.append('image', image);
        }

        try {
            await addSlide(data);
            navigate('/adminDashboard/viewHomeSlider');
        } catch (error) {
            console.error("Error creating slide:", error);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Create Home Slide</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Eyebrow</label>
                    <input type="text" name="eyebrow" value={formData.eyebrow} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                    <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" onChange={handleFileChange} className="mt-1" accept="image/*" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={() => navigate('/adminDashboard/viewHomeSlider')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateHomeSlider;
