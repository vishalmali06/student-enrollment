import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const EditCourseForm = ({ course, onSubmit, onClose }) => {
    const [courseCode, setCourseCode] = useState(course.courseCode);
    const [courseName, setCourseName] = useState(course.courseName);
    const [prerequisites, setPrerequisites] = useState(course.prerequisites.map(prereq => ({ value: prereq._id, label: prereq.courseName })));
    const [courseOptions, setCourseOptions] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses');
            const options = response.data.map(course => ({
                value: course._id,
                label: course.courseName,
            }));
            setCourseOptions(options);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            courseCode,
            courseName,
            prerequisites: prerequisites.map(prereq => prereq.value),
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Edit Course</h2>
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
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourseForm;
