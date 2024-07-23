
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    examples: { type: Array, required: true }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
