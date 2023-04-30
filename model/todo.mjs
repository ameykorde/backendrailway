// Import Mongoose module
import mongoose from 'mongoose';

// Define a Mongoose schema for todo items
const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todos: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          default: ''
        }
      }
    ]
}); 

// Create a Mongoose model from the schema
const Todo = mongoose.model('todo', todoSchema);

// Export the model to be used in other parts 
export default Todo;
