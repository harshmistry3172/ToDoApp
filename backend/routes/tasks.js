const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all tasks for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task for the authenticated user
router.post('/', auth, async (req, res) => {  
  const { task, priority, completed } = req.body; // Extract task, priority, and completed fields from the request body
  const taskData = new Task({
    text: task,         // The task text
    userId: req.user.userId,  // The authenticated user ID
    priority: priority || 'Medium', // Default to Medium if no priority is provided
    completed: completed || false, // Default to false (not completed)
  });

  try {
    const newTask = await taskData.save();
    res.status(201).json(newTask); // Respond with the created task
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
});


// PUT to update a task
router.put('/:id', auth, async (req, res) => {
  try {
    // Find the task by ID and userId to ensure the task belongs to the authenticated user
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    
    // If task is not found, return a 404 response
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task fields with the values from the request body, if provided
    task.text = req.body.text || task.text;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    task.priority = req.body.priority || task.priority;  // Update priority if provided (default to current priority if not)

    // Save the updated task
    const updatedTask = await task.save();
    
    // Respond with the updated task
    res.json(updatedTask);
  } catch (error) {
    // Handle errors (e.g., invalid task ID, issues with saving the task)
    res.status(400).json({ message: error.message });
  }
});


// DELETE a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
