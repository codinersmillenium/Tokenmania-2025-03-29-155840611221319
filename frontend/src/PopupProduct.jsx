import React, { useState, useEffect } from 'react';
const PopupProduct = ({ setIsOpen, fetchData, product, id, principal, isAuthenticated, actor }) => {
    const [useTrx, setTrx] = useState(false);
    const [isModal, setModal] = useState(false);
    const redirect = (resp) => {
        alert(resp.ok);
        setTimeout(() => {
            window.location.reload();
        }, 800);
    };
    const buy = async () => {
        const resp = await actor.createTransaction(id);
        redirect(resp);
    };
    const rate = async () => {
        var rating = parseInt(document.getElementById('ratingEl').value);
        const resp = await actor.updateRating(id, rating);
        redirect(resp);
    };
    useEffect(() => {
        fetchData(id);
        setTrx(product[0].trx);
    }, [id]);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg max-h-[80vh] flex flex-col z-50 p-6">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold mb-1 text-left">Product Description</h2>
                        <h3 className="text-bold text-left">This is a detailed description of the product.</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-gray-900 text-2xl">
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                    {product.map((item, index) => (
                        <div key={index}>
                            <div className="text-gray-600">
                                <p>{item[0].description}</p>
                            </div>
                            <div className="mt-5">
                                <h2 className="text-bold text-sky-600 mb-2"># Documentation</h2>
                                <video controls className="w-full rounded-lg" key={item[0].urlVideoDoc}>
                                    <source src={item[0].urlVideoDoc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="container mx-auto p-6 mb-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                                            <tbody>
                                                <tr>
                                                    <td className="text-semibold text-black p-2">Link</td>
                                                    <td className="text-semibold text-sky-500 p-2">
                                                        {useTrx || item[0].seller == principal
                                                            ? item[0].urlAccess
                                                            : '#####################################'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-semibold text-black p-2">Access Key</td>
                                                    <td className="text-semibold text-sky-500 p-2">
                                                        {useTrx || item[0].seller == principal
                                                            ? item[0].accessKey
                                                            : '#####################################'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    {!useTrx && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full border py-2.5 px-3.5 font-small bg-white text-black p-2"
                        >
                            Close
                        </button>
                    )}
                    {isAuthenticated && product[0] && product[0][0].seller != principal && !useTrx && (
                        <button className="rounded__btn rounded-3xl" onClick={buy}>
                            Buy Now
                        </button>
                    )}
                    {isAuthenticated && useTrx && product[0][1] < 1 && (
                        <div>
                            <button className="rounded__btn rounded-3xl" onClick={() => setModal(true)}>
                                Rate
                            </button>
                            {isModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-6 rounded w-80">
                                        <div className="p-6 bg-white rounded shadow">
                                            <label className="block mb-2">Enter a number (1 - 5):</label>
                                            <input
                                                type="number"
                                                id="ratingEl"
                                                min="1"
                                                max="5"
                                                step="1"
                                                className="w-24 p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
                                            onClick={() => setModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={rate}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PopupProduct;