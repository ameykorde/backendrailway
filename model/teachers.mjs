// Importing Mongoose library
import mongoose from 'mongoose';

// Creating a teacher schema with name, email, and file fields
const teacherSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  file: { 
    type: String, 
    required: true 
  }
});

// Exporting the Teacher model using the teacher schema
export default mongoose.model('Teacher', teacherSchema);
