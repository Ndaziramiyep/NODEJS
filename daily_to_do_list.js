const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple in-memory object to store todo items with weeks as keys
let todos = {};

// Route to get all todos for a specific week
app.get('/todos/:week', (req, res) => {
  const { week } = req.params;
  const weekTodos = todos[week] || [];
  res.json(weekTodos);
});

// Route to add a todo for a specific week
app.post('/todos/:week', (req, res) => {
  const { week } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  // Initialize an array for the week if it doesn't exist
  if (!todos[week]) {
    todos[week] = [];
  }
  const todo = { id: todos[week].length + 1, text };
  todos[week].push(todo);
  res.status(201).json(todo);
});

// Route to delete a todo for a specific week
app.delete('/todos/:week/:id', (req, res) => {
  const { week, id } = req.params;
  if (!todos[week]) {
    return res.status(404).json({ error: 'Week not found' });
  }
  todos[week] = todos[week].filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
