import React, { useState } from 'react';

const ProfileDropdown = ({ principal, balance, logout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
            >
                <span className="text-lg font-semibold">👤</span>
                <span className="hidden md:inline">Profile</span>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                        <li>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Principal: <span className="text-sky-500">{principal}</span>
                            </button>
                        </li>
                        <li>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Balance: <span className="text-sky-500">{parseFloat(balance)}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => logout()}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
export default ProfileDropdown;