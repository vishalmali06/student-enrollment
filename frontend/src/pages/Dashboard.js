import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from '../components/AdminDashboard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-4">
                    {user && user.role === 'admin' && <AdminDashboard />}
                    {user && user.role === 'teacher' && <TeacherDashboard />}
                    {user && user.role === 'student' && <StudentDashboard />}
                </main>
                <ToastContainer />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
