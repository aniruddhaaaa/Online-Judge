const express = require('express');
const router = express.Router();
const ProblemController = require('../controllers/ProblemController');


router.get('/problems', ProblemController.getAllProblems);
router.post('/problems', ProblemController.createProblem);
router.put('/problems/:id', ProblemController.updateProblem);
router.delete('/problems/:id', ProblemController.deleteProblem);

module.exports = router;