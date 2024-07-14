// AddCourseForm.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

const AddCourseForm = ({ onClose, onCourseAdded }) => {
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [prerequisites, setPrerequisites] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prereqArray = prerequisites.map((course) => course.value);
        const newCourse = {
            courseCode,
            courseName,
            prerequisites: prereqArray
        };

        try {
            const response = await axios.post('http://localhost:5000/api/courses', newCourse);
            console.log(response.data);
            toast.success('Course added successfully!');
            onCourseAdded(); // Reload course list
            onClose(); // Close the modal after saving
        } catch (error) {
            console.error('Error saving course:', error);
            toast.error('Failed to add course.');
        }
    };

    const courseOptions = courses.map((course) => ({
        value: course._id,
        label: course.courseName
    }));

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Course Code</label>
                        <input
                            type="text"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
                        <Select
                            isMulti
                            value={prerequisites}
                            onChange={setPrerequisites}
                            options={courseOptions}
                            className="mt-1"
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourseForm;
