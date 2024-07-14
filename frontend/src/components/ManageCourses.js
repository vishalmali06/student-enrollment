import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCourseForm from './EditCourseForm';
import CourseDetailsDialog from './CourseDetailsDialog';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
    const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);
    const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
    const [selectedCourseForDetails, setSelectedCourseForDetails] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses');
            setCourses(response.data);
        } catch (error) {
            toast.error('Failed to fetch courses');
        }
    };

    const handleCourseClick = (course) => {
        setSelectedCourseForDetails(course);
        setIsCourseDetailsOpen(true);
    };

    const handleCloseDetailsDialog = () => {
        setSelectedCourseForDetails(null);
        setIsCourseDetailsOpen(false);
    };

    const handleEditCourse = (course) => {
        setSelectedCourseForEdit(course);
        setIsEditCourseOpen(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedCourseForEdit(null);
        setIsEditCourseOpen(false);
    };

    const handleUpdateCourse = async (updatedCourse) => {
        try {
            await axios.put(`http://localhost:5000/api/courses/${selectedCourseForEdit._id}`, updatedCourse);
            toast.success('Course updated successfully');
            handleCloseEditDialog();
            fetchCourses();
        } catch (error) {
            toast.error('Failed to update course');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
            toast.success('Course deleted successfully');
            fetchCourses();
        } catch (error) {
            toast.error('Failed to delete course');
        }
    };

    const handleEnrollmentChange = async (courseId, isEnrolled) => {
        try {
            const url = isEnrolled
                ? 'http://localhost:5000/api/students/withdraw'
                : 'http://localhost:5000/api/students/enroll';
            const payload = {
                studentID: userInfo.studentId,
                courseCode: courseId
            };

            await axios.post(url, payload);
            toast.success(`Successfully ${isEnrolled ? 'withdrawn from' : 'enrolled in'} the course`);
            fetchCourses();
        } catch (error) {
            toast.error(`Failed to ${isEnrolled ? 'withdraw from' : 'enroll in'} the course`);
        }
    };

    return (
        <div>
            <div className="overflow-y-auto h-[470px]">
                {courses.map(course => {
                    const isEnrolled = course.studentsEnrolled.some(student => student._id === userInfo._id);

                    return (
                        <div key={course._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3>
                                <span
                                    className="text-lg font-semibold cursor-pointer text-sky-400"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    {course.courseName}
                                </span>
                            </h3>
                            <p>Course Code: {course.courseCode}</p>

                            {/* Display enrolled students */}
                            {course.studentsEnrolled && course.studentsEnrolled.length > 0 && (
                                <div>
                                    <h4 className="mt-2 font-semibold">Enrolled Students:</h4>
                                    <ul className="list-disc ml-5">
                                        {course.studentsEnrolled.map(student => (
                                            <li key={student._id}>{student.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {userInfo.role === 'admin' ? (
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleEditCourse(course)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md mt-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourse(course._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isEnrolled}
                                            onChange={() => handleEnrollmentChange(course.courseCode, isEnrolled)}
                                        />
                                        {isEnrolled ? ' Withdraw' : ' Enroll'}
                                    </label>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {isCourseDetailsOpen && selectedCourseForDetails && (
                <CourseDetailsDialog course={selectedCourseForDetails} onClose={handleCloseDetailsDialog} />
            )}
            {isEditCourseOpen && selectedCourseForEdit && (
                <EditCourseForm
                    course={selectedCourseForEdit}
                    onSubmit={handleUpdateCourse}
                    onClose={handleCloseEditDialog}
                />
            )}
        </div>
    );
};

export default ManageCourses;
