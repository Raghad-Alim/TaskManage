// Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express and set a port number
const app = express();
const PORT = 3000;

// Middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Set up an in-memory "database" (an array) and a counter for task IDs
const tasks = [];
let currentId = 1;

// CREATE: Endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body; // Get title and description from request body
    const newTask = { id: currentId++, title, description, status: 'pending' }; // Create a new task
    tasks.push(newTask); // Add the new task to the array
    res.status(201).json(newTask); // Send back the new task with a success status
});

// READ: Endpoint to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Send back the list of tasks
});

// UPDATE: Endpoint to modify an existing task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params; // Get the task ID from the URL
    const { title, description, status } = req.body; // Get updated fields from the request body

    // Find the task by ID
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) return res.status(404).json({ error: 'Task not found' }); // If task not found, return 404 error

    // Update task fields if provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    res.json(task); // Send back the updated task
});

// DELETE: Endpoint to remove a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params; // Get the task ID from the URL
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id)); // Find the index of the task

    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' }); // If not found, return 404

    tasks.splice(taskIndex, 1); // Remove the task from the array
    res.status(204).send(); // Send back a success status with no content
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

