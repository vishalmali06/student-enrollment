// controllers/studentController.js
const Student = require('../models/Student');
const Course = require('../models/Course');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('enrolledCourses');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const enrollCourse = async (req, res) => {
    const { studentID, courseCode } = req.body;
    try {
        const student = await Student.findOne({ studentID });
        console.log(">>>>>>>>>>>" + student)
        const course = await Course.findOne({ courseCode });
        console.log(">>>>>>>>>>>" + course)
        if (!student || !course) {
            return res.status(404).json({ success: false, message: 'Student or Course not found' });
        }

        // Check prerequisites
        // for (let prereq of course.prerequisites) {
        //     if (!student.enrolledCourses.includes(prereq)) {
        //         return res.status(400).json({ success: false, message: 'Prerequisites not satisfied' });
        //     }
        // }

        // Enroll the student in the course
        if (!student.enrolledCourses.includes(course._id)) {
            student.enrolledCourses.push(course._id);
            await student.save();
        }

        if (!course.studentsEnrolled.includes(student._id)) {
            course.studentsEnrolled.push(student._id);
            await course.save();
        }

        res.json({ success: true, message: 'Enrollment successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const withdrawCourse = async (req, res) => {
    const { studentID, courseCode } = req.body;

    try {
        const student = await Student.findOne({ studentID });
        const course = await Course.findOne({ courseCode });

        if (!student || !course) {
            return res.status(404).json({ success: false, message: 'Student or Course not found' });
        }

        // Withdraw the student from the course
        student.enrolledCourses = student.enrolledCourses.filter(courseId => !courseId.equals(course._id));
        course.studentsEnrolled = course.studentsEnrolled.filter(studentId => !studentId.equals(student._id));

        await student.save();
        await course.save();

        res.json({ success: true, message: 'Withdrawal successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addStudent = async (req, res) => {
    const { studentID, name } = req.body;
    try {
        const student = new Student({ studentID, name });
        await student.save();
        res.status(201).json(student);
        console.log("studentID" + student);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("name" + name);
    }
};

module.exports = {
    getAllStudents,
    enrollCourse,
    withdrawCourse,
    addStudent
};
