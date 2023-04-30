import mongoose from 'mongoose';

// define notice schema
const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: String,
  time: String,
  content: String
});

// create and export notice model based on the notice schema
export default mongoose.model('notice', noticeSchema);
