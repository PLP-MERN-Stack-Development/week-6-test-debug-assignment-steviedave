const express = require('express');
const router = express.Router();
const {
  createBug,
  getAllBugs,
  updateBugStatus,
  deleteBug
} = require('../controllers/bugController');

// POST /api/bugs
router.post('/', createBug);

// GET /api/bugs
router.get('/', getAllBugs);

// PUT /api/bugs/:id
router.put('/:id', updateBugStatus);

// DELETE /api/bugs/:id
router.delete('/:id', deleteBug);

module.exports = router;
