const express = require('express');
const { getStudents, getTeachers, getAdmins, getAllUsers, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/students', getStudents);
router.get('/teachers', getTeachers);
router.get('/admins', getAdmins);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;