import mongoose from 'mongoose';

// Create absentTeacher schema
const absentTeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
});

// Create absentTeacher model
const AbsentTeacher = mongoose.model('AbsentTeacher', absentTeacherSchema);

// Export absentTeacher model
export default AbsentTeacher;
