// controllers/ProblemController.js
const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// Create a new problem
router.post('/', async (req, res) => {
    const { problemId, name, description, examples } = req.body;
    try {
        const newProblem = new Problem({ problemId, name, description, examples });
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Read all problems
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Read a single problem by ID
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a problem by ID
router.put('/:id', async (req, res) => {
    const { name, description, examples } = req.body;
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, { name, description, examples }, { new: true });
        if (!updatedProblem) return res.status(404).json({ message: 'Problem not found' });
        res.json(updatedProblem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a problem by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
        if (!deletedProblem) return res.status(404).json({ message: 'Problem not found' });
        res.json({ message: 'Problem deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createProblem = async (req, res) => {
    try {
        const newProblem = new Problem(req.body);
        const savedProblem = await newProblem.save();
        res.json(savedProblem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = router;
