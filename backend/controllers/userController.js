const User = require('../models/User');
const Student = require('../models/Student');

// Fetch all students
const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all admins
const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Cannot delete an admin user' });
        }

        // Delete the user
        await User.findByIdAndDelete(req.params.id);

        // Delete the corresponding student record if the user is a student
        if (user.role === 'student' && user.studentId) {
            await Student.findByIdAndDelete(user.studentId);
        }

        res.status(200).json({ message: 'User and related student record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getStudents,
    getTeachers,
    getAdmins,
    getAllUsers,
    deleteUser
};
