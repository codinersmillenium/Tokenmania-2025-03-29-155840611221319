import React from 'react';
const About = () => {
    return (
        <section id="about" className="mb-16 md:mb-0">
            <div className="container__main">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center mt-5 gap-4">
                    <div className="justify-items-center">
                        <img src="../logos1-removebg.png" alt="Hero" />
                    </div>
                    <div className="col-span-2">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            The Best Web3 Marketplace
                            <span className="text-sky-600"> for Fast & Secure Transactions</span> with Digital Tokens!
                        </h1>
                        <p className="text-gray-600 my-5">
                            Sell and buy Service APIs, AI Models, and AI Datasets on{' '}
                            <span className="font-semibold text-sky-600">BionMart</span>, a Web3-powered Blockchain
                            Marketplace. Connect with top developers, enhance your business, and access the latest AI
                            innovations!
                        </p>
                        <button className="rounded__btn rounded-3xl">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default About;