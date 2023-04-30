import mongoose from 'mongoose';

// define the schema for the timetable collection
const uploadSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true
    },
    images: [{ 
      filename: String
    }]
  }
);

// create a model for the timetable collection
const TimeTable = mongoose.model("timeTable", uploadSchema);

// export the model
export default TimeTable;
