const express = require('express');
const { getAllStudents, enrollCourse, withdrawCourse, addStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/', getAllStudents);
router.post('/enroll', enrollCourse);
router.post('/withdraw', withdrawCourse);
router.post('/', addStudent);

module.exports = router;
