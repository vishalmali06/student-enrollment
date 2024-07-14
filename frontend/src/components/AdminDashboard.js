import React, { useState } from 'react';
import AddCourseForm from './AddCourseForm';
import ManageCourses from './ManageCourses';
import ManageStudents from './ManageStudents';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
    const [coursesKey, setCoursesKey] = useState(0); // Key to force re-render

    const handleShowCourses = () => {
        setActiveSection('courses');
    };

    const handleShowStudents = () => {
        setActiveSection('students');
    };

    const handleShowUsers = () => {
        setActiveSection('users');
    };

    const handleAddCourse = () => {
        setIsAddCourseModalOpen(true);
    };

    const handleCloseAddCourseModal = () => {
        setIsAddCourseModalOpen(false);
    };

    const handleCourseAdded = () => {
        setCoursesKey((prevKey) => prevKey + 1); // Change key to force re-render
    };

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="max-w-7xl w-full p-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>
                <div className="flex gap-4">
                    {/* Left Side - Cards */}
                    <div className="w-1/4 space-y-4">
                        {/* Manage Course Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">Manage Course</h3>
                            <p className="text-gray-600">View and manage courses.</p>
                            <button onClick={handleShowCourses} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                                Go to Courses
                            </button>
                        </div>

                        {/* Manage Student Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">Manage Student</h3>
                            <p className="text-gray-600">View and manage students.</p>
                            <button onClick={handleShowStudents} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                                Go to Students
                            </button>
                        </div>

                        {/* Manage Users Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
                            <p className="text-gray-600">View and manage users.</p>
                            <button onClick={handleShowUsers} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                                Go to Users
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
                        <div>
                            {activeSection === 'courses' && (
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">Manage Courses</h2>
                                    <button onClick={handleAddCourse} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                                        Add Course
                                    </button>
                                </div>
                            )}
                            {activeSection === 'students' && <h2 className="text-2xl font-bold mb-4">Manage Students</h2>}
                            {activeSection === 'users' && <h2 className="text-2xl font-bold mb-4">Manage Users</h2>}
                        </div>
                        <div className="mt-8 h-[480px] overflow-y-auto">
                            {activeSection === 'courses' && <ManageCourses key={coursesKey} />}
                            {activeSection === 'students' && <ManageStudents />}
                            {activeSection === 'users' && <ManageUsers />}
                        </div>
                    </div>
                </div>
                {isAddCourseModalOpen && <AddCourseForm onClose={handleCloseAddCourseModal} onCourseAdded={handleCourseAdded} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
