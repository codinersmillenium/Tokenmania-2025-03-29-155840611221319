import React from 'react';
const Feature = () => {
    return (
        <section className="mb-16 mt-5">
            <div className="container__main">
                <div className="text-center mb-12">
                    <h3 className="text-sky-500 font-semibold text-2xl">Why choose us?</h3>
                    <p className="text-gray-600 mt-1">Products and components delivered to your home</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    <div className="card__hover__bg">
                        <i className="fa-solid fa-truck-fast text-5xl text-sky-500"></i>
                        <h3 className="text-xl font-semibold text-gray-800 my-4">
                            Decentralized and Secure Transactions
                        </h3>
                        <p className="text-sm text-gray-600">
                            Building a Marketplace for API Services, AI Models, and AI Datasets Based on Web 3 and
                            Blockchain
                        </p>
                    </div>
                    <div className="card__hover__bg">
                        <i className="fa-solid fa-hand-holding-dollar text-5xl text-sky-500"></i>
                        <h3 className="text-xl font-semibold text-gray-800 my-4">
                            Tokenization for Seamless Payments and Rewards
                        </h3>
                        <p className="text-sm text-gray-600">
                            Tokens as the Future of Payment: Streamline payments with tokens, cutting out the hassle of
                            traditional payment systems while ensuring fast, secure, and borderless transactions.
                        </p>
                    </div>
                    <div className="card__hover__bg">
                        <i className="fa-solid fa-building-lock text-5xl text-sky-500"></i>
                        <h3 className="text-xl font-semibold text-gray-800 my-4">
                            An Open, Collaborative, and Sustainable Ecosystem
                        </h3>
                        <p className="text-sm text-gray-600">
                            A Marketplace for Everyone: Web 3's open nature means that developers, buyers, and sellers
                            can interact directly, fostering a vibrant ecosystem where everyone contributes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Feature;