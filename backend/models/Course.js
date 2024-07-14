const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Course', courseSchema);