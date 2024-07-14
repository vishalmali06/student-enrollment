import React from 'react';

const CourseDetailsDialog = ({ course, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Course Details</h2>
                <div className="mb-4">
                    <p><strong>Course Code:</strong> {course.courseCode}</p>
                    <p><strong>Course Name:</strong> {course.courseName}</p>
                    <p><strong>Prerequisites:</strong></p>
                    <ul className="list-disc list-inside">
                        {course.prerequisites.map((prereq, index) => (
                            <li key={index}>{prereq.courseName}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsDialog;
