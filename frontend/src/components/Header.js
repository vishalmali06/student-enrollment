// components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl">📚</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
