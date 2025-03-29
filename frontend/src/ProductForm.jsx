import React, { useState } from 'react';

const ProductForm = ({ actor, setIsModalOpen, isModalOpen, principal }) => {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        imgProduct: '',
        priceToken: 0,
        urlVideoDoc: '',
        urlAccess: '',
        accessKey: '',
        category: 1,
        seller: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imgProduct: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            formData.priceToken = parseFloat(formData.priceToken);
            formData.category = parseInt(formData.category);
            const post = await actor.createProducts(formData);
            alert('Success Create Product...');
        } catch (error) {
            alert('Failed Create Product...');
        }
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Product Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="imgProduct" className="block text-sm font-medium text-gray-600">
                                    Product Image (PNG/JPG)
                                </label>
                                <input
                                    type="file"
                                    id="imgProduct"
                                    name="imgProduct"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                                {formData.imgProduct && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.imgProduct}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="priceToken" className="block text-sm font-medium text-gray-600">
                                    Price Token
                                </label>
                                <input
                                    type="number"
                                    id="priceToken"
                                    name="priceToken"
                                    value={formData.priceToken}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="urlVideoDoc" className="block text-sm font-medium text-gray-600">
                                    Video Document URL
                                </label>
                                <input
                                    type="text"
                                    id="urlVideoDoc"
                                    name="urlVideoDoc"
                                    value={formData.urlVideoDoc}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="urlAccess" className="block text-sm font-medium text-gray-600">
                                    Access URL
                                </label>
                                <input
                                    type="text"
                                    id="urlAccess"
                                    name="urlAccess"
                                    value={formData.urlAccess}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="accessKey" className="block text-sm font-medium text-gray-600">
                                    Access Key
                                </label>
                                <input
                                    type="text"
                                    id="accessKey"
                                    name="accessKey"
                                    value={formData.accessKey}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    required
                                >
                                    <option value={1}>API</option>
                                    <option value={2}>Model AI</option>
                                    <option value={3}>Data Set AI</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProductForm;