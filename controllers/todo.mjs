import Todo from '../model/todo.mjs';

// Get all todos for a specific user
const getAllTodo = async (req, res) => {
  try {
    const userId = req.params.id;
    const { todos } = await Todo.findOne({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo for a specific user
const createTodo = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const newTodo = { title, description };
    
    // Check if user exists in database
    let todo = await Todo.findOne({ userId });
    if (!todo) {
      // If user does not exist, create new user with empty todo list
      todo = new Todo({ userId, todos: [] });
    }

    // Add new todo to user's todo list and save to database
    todo.todos.push(newTodo);
    const updatedTodo = await todo.save();

    // Return the newly added todo
    res.json(updatedTodo.todos[updatedTodo.todos.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a todo item for a specific user
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { userId, title, description } = req.body;
    const todo = await Todo.findOne({ "todos._id": todoId });
    if (!todo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    if (todo.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this to-do item' });
    }
    const todoIndex = todo.todos.findIndex((todo) => todo._id.toString() === todoId);
    if (title) {
      todo.todos[todoIndex].title = title;
    }
    if (description) {
      todo.todos[todoIndex].description = description;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo.todos[todoIndex]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo item for a specific user
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { userId } = req.body;
    const todo = await Todo.findOne({ userId });
    if (!todo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    if (todo.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this to-do item' });
    }
    const todoIndex = todo.todos.findIndex((todo) => todo._id.toString() === todoId);
    console.log(todoIndex)
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    const deletedTodo = todo.todos.splice(todoIndex, 1);
    console.log(deletedTodo)
    await todo.save();
    res.json(deletedTodo[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Export the functions for use in other modules
export {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
