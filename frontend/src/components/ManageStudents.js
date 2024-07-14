import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch students', error);
        }
    };

    return (
        <div>
            <div className="overflow-y-auto h-[470px]">
                {students.map((student) => (
                    <div key={student._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="text-lg font-semibold">Student Name: {student.name}</h3>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Role:</strong> {student.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageStudents;
