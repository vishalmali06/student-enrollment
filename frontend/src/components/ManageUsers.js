import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationDialog from './ConfirmationDialog';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const confirmDeleteUser = (user) => {
        if (user.role === 'admin') {
            toast.error('Cannot delete an admin user');
        } else {
            setUserToDelete(user);
            setIsConfirmationDialogOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        handleDeleteUser(userToDelete._id);
        setIsConfirmationDialogOpen(false);
        setUserToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmationDialogOpen(false);
        setUserToDelete(null);
    };

    return (
        <div>
            <div className="overflow-y-auto h-[480px]">
                {users.map(user => (
                    <div key={user._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        {user.role !== 'admin' && (
                            <button
                                onClick={() => confirmDeleteUser(user)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {isConfirmationDialogOpen && (
                <ConfirmationDialog
                    message={`Are you sure you want to delete ${userToDelete?.name}?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default ManageUsers;
