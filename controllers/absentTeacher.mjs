// Import necessary modules
import AbsentTeacher from '../model/absentTeacher.mjs';
import moment from 'moment';
import 'moment-timezone';

// Create an absent teacher
const createAbsentTeacher = async (req, res) => {
    try {
        const { name, fromDate, toDate } = req.body;

        // Create a new instance of the AbsentTeacher model
        const absentTeacher = new AbsentTeacher({
            name,
            fromDate,
            toDate,
        });

        // Save the data to the database
        const savedAbsentTeacher = await absentTeacher.save();

        // Respond with a success message and the saved data
        res.status(201).json(savedAbsentTeacher);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all absent teachers
const getAbsentTeacher = async (req, res) => {
    try {
        moment.tz.setDefault('Asia/Kolkata');  //setting default timezone to Indian Timezone

        // Get the current date and time
        const currentDate = moment().startOf('day');
        
        // Find all absent teachers with a toDate greater than or equal to the current date
        const absentTeachers = await AbsentTeacher.find({ toDate: { $gte: currentDate } }).sort({ fromDate: 1 });
        
        // Respond with the found absent teachers
        res.json(absentTeachers);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Delete an absent teacher by ID
const deleteAbsentTeacherById = async (req, res) => {
    try {
        // Find and delete the absent teacher with the specified ID
        const deletedTeacher = await AbsentTeacher.findByIdAndDelete(req.params.id);

        // If the absent teacher was not found, respond with an error message
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Otherwise, respond with a success message
        res.json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: 'Failed to delete teacher' });
    }
};

// Delete all absent teachers with a toDate less than the current date
const deleteAbsentTeacherByDate = async (req, res) => {
    try {
        // Get the current date and time
        const currentDate = new Date();

        // Delete all absent teachers with a toDate less than the current date
        await AbsentTeacher.deleteMany({ toDate: { $lt: currentDate } });

        // Respond with a success message
        res.json({ message: `Absent teacher deleted Successfully.` });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Export the functions
export { createAbsentTeacher, getAbsentTeacher, deleteAbsentTeacherById, deleteAbsentTeacherByDate };
