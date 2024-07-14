import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-gray-200 p-2 ${isOpen ? 'w-44' : 'w-10'} transition-width duration-200`}>
            <button onClick={() => setIsOpen(!isOpen)} className="text-blue-600">
                {isOpen ? '🍔' : '🍔'}
            </button>
            {isOpen && (
                <ul>
                    <li>Dashboard</li>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
