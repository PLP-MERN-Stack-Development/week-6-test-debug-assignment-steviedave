const Bug = require('../models/bugModel');

// Create new bug
const createBug = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const newBug = await Bug.create({ title, description, priority });
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update bug status
const updateBugStatus = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete bug
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBug,
  getAllBugs, // renamed here
  updateBugStatus,
  deleteBug
};
