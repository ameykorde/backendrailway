import mongoose from 'mongoose';

// Define the schema for the AcademicCalendar model
const uploadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  }
);

// Create the AcademicCalendar model
const AcademicCalendar = mongoose.model('AcademicCalendar', uploadSchema);

// Export the AcademicCalendar model
export default AcademicCalendar;
