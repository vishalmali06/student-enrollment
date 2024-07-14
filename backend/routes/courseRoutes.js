const express = require('express');
const { getAllCourses, addCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getAllCourses);
router.post('/', addCourse);
router.delete('/:id', deleteCourse);
router.put('/:id', updateCourse);

module.exports = router;
