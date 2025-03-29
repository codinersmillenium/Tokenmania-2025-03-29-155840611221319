import React, { useState, useEffect } from 'react';
import Header from './Header';
import About from './About';
import Feature from './Feature';
import Footer from './Footer';
import PopupProduct from './PopupProduct';
import ProductForm from './ProductForm';
const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [idPopup, setIdPopup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [actor, setActor] = useState();
    const [principal, setPrincipal] = useState();
    const [balance, setBalance] = useState(0);
    const [products, setProducts] = useState([]);
    const [activeIndex, setactiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const category = [
        { code: 0, text: 'All' },
        { code: 1, text: 'API' },
        { code: 2, text: 'Model AI' },
        { code: 3, text: 'Data Set AI' }
    ];
    const rate = [1, 2, 3, 4, 5];
    const tabButton = async (code) => {
        await fetchData(1);
        setactiveIndex(code);
        if (code !== 0) {
            let filteredItems = products.filter((item) => item.category === code);
            setProducts(filteredItems);
        }
    };
    const fetchData = async (id) => {
        try {
            setIsLoading(true);
            const response = await actor.getProducts(id);
            setProducts(response.ok || []);
            setIsLoading(false);
        } catch (error) {}
    };
    const myProduct = async () => {
        try {
            setIsLoading(true);
            let product = [];
            const products = async (id, trx = false) => {
                var response = await actor.getProducts(id);
                for (let obj in response.ok) {
                    response.ok[obj].trx = trx;
                    product.push(response.ok[obj]);
                }
            };
            await products(0);
            const trx = await actor.getTransaction();
            for (let obj in trx.ok) {
                await products(trx.ok[obj].idProduct, true);
            }
            setProducts(product || []);
            setIsLoading(false);
        } catch (error) {}
    };
    useEffect(() => {
        fetchData(1);
    }, [actor]);
    return (
        <div>
            <Header
                setActor={setActor}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setPrincipal={setPrincipal}
                principal={principal}
                balance={balance}
                setBalance={setBalance}
            />
            <About />
            {isOpen && (
                <PopupProduct
                    setIsOpen={setIsOpen}
                    fetchData={fetchData}
                    product={products}
                    id={idPopup}
                    principal={principal}
                    isAuthenticated={isAuthenticated}
                    actor={actor}
                />
            )}
            <ProductForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                actor={actor}
                principal={principal}
            />
            <section id="services" className="py-16 bg-gray-50">
                <div className="container__main">
                    <div className="text-center mb-6">
                        <h3 className="text-sky-500 font-semibold text-2xl">Browse by Category</h3>
                        <p className="text-gray-600 mt-1">Search for products and select the desired one...</p>
                        <div className="flex flex-wrap justify-center gap-4 items-center mt-5">
                            {category.map((item, index) => (
                                <button
                                    className={
                                        'rounded-full border-solid border-2 py-2.5 px-4.5 font-medium hover:bg-black hover:border-black hover:text-white ease-in duration-200 p-4 ' +
                                        (index == activeIndex
                                            ? 'bg-black border-black text-white'
                                            : 'bg-gray border-gray-3 text-black')
                                    }
                                    key={item.code}
                                    onClick={() => tabButton(item.code)}
                                >
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <div className="relative justify-center w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            <svg
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                                />
                            </svg>
                        </div>
                    </div>
                    {isAuthenticated && (
                        <div className="flex justify-end mb-10 gap-2">
                            <button
                                className="flex justify-between items-center rounded__btn rounded-3xl"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <svg
                                    width="30px"
                                    height="30px"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#ffffff"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fill="#ffffff"
                                            d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="font-medium">Sell</span>
                            </button>
                            <button
                                className="rounded-full border py-2.5 px-4.5 font-medium hover:bg-black hover:border-black hover:text-white ease-in duration-200 bg-gray border-black text-black p-4"
                                onClick={myProduct}
                            >
                                My Store
                            </button>
                        </div>
                    )}
                    {products.length < 1 && !isLoading && (
                        <div className="flex justify-center text-center text-black font-bold mt-5">
                            <span>......... Data Empty .........</span>
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex justify-center text-center text-black font-bold mt-5">
                            <span>......... Data Loaded .........</span>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7">
                        {products.map((item, index) => (
                            <div
                                className="mx-auto service__card"
                                key={index}
                                onClick={() => {
                                    setIsOpen(true);
                                    setIdPopup(item[0].id);
                                }}
                            >
                                <div className="h-72 overflow-hidden">
                                    <img
                                        src={item[0].imgProduct}
                                        alt="Product"
                                        className="h-full w-full rounded-lg transition-transform duration-300 object-cover"
                                    />
                                </div>
                                <div className="w-10/12 mx-auto rounded-lg bg-white opacity-90 shadow-md px-5 pb-8 z-10 relative -top-24 -mb-16 cursor-pointer min-w-full">
                                    <div className="w-20 h-20 flex justify-center items-center text-center rounded-full transition-colors duration-300 bg-sky-500 border-[6px] border-white text-white mx-auto relative -top-10 service__icon">
                                        <i className="fa-solid fa-chart-line text-2xl inline-block"></i>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <button className="rounded-full border py-2.5 px-3.5 font-small bg-black border-black text-white p-2">
                                            {item[0].category == 1
                                                ? 'API'
                                                : item[0].category == 2
                                                  ? 'Model AI'
                                                  : item[0].category == 3
                                                    ? 'Data Set AI'
                                                    : 'Not Defined'}
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 -mt-4 mb-4">{item[0].name}</h3>
                                    <p className="text-gray-600">
                                        {item[0].description.length > 20
                                            ? item[0].description.substr(0, 15) + '...'
                                            : item[0].description}
                                    </p>
                                    <div className="flex justify-start items-center space-x-1 mb-2">
                                        {rate.map((i, j) => (
                                            <button
                                                className={
                                                    'text-gray-300 ' + (i <= parseInt(item[1]) ? 'text-yellow-500' : '')
                                                }
                                                key={j}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    className="w-8 h-8"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 .587l3.668 7.568L24 9.432l-6 5.84 1.416 8.303L12 18.897l-7.416 4.678L6 15.272 0 9.432l8.332-1.277z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex item-center gap-2">
                                        <img src="wallet.png" alt="" width={'10%'} height={'10%'} />
                                        <h2 className="text-xl font-semibold text-yellow-500">
                                            {parseFloat(item[0].priceToken)}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {products.length > 6 && (
                        <div className="flex justify-center items-center">
                            <button className="rounded__btn rounded-3xl">Browse All</button>
                        </div>
                    )}
                </div>
            </section>
            <Feature />
            <Footer />
        </div>
    );
};
export default App;