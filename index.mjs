// Import necessary modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './connectDB/connectDB.mjs';
import authRoute from './routes/authRoute.mjs';
import notice from './routes/notice.mjs';
import ongoing from './routes/ongoing.mjs';
import teachers from './routes/teachers.mjs';
import timeTable from './routes/timeTable.mjs';
import calendar from './routes/acRoute.mjs';
import absentTeacher from './routes/absentTeacher.mjs';
import todo from './routes/todo.mjs';
import verify from './middleware/verifyToken.mjs';

// Create an express app
const app = express(); 

// Set up CORS
app.use(cors());

// Load environment variables
dotenv.config({ path: './.env' });


// Set up port number
const PORT = process.env.PORT || 5000;

// Use express json middleware
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Use routes
app.use(authRoute);

// Use verify middleware for protected routes
app.use('/notice', verify, notice);
app.use('/timetable', verify, timeTable);
app.use('/teacher', verify, teachers);
app.use('/ongoing', verify, ongoing);
app.use('/calendar', verify, calendar);
app.use('/todo', verify, todo);

app.use('/absent', absentTeacher);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
