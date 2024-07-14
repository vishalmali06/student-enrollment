const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword, role });

        if (user) {
            // If the role is 'student', create a Student entry
            if (role === 'student') {
                const student = new Student({ studentID: `S${user._id}`, name: user.name });
                await student.save();

                // Update user with the reference to the student
                user.studentId = student._id;
                await user.save();
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        console.log(password + ">>>>>>>>>>>>>>>>>> " + user.password);
        console.log(await bcrypt.compare(password, user.password));

        // if (user && (await bcrypt.compare(password, user.password))) {
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).populate('studentId');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, authUser, getStudents };
