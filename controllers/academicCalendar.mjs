// Import the required module
import Calendar from "../model/acSchema.mjs";

// Function to upload calendar
const uploadCalendar = async (req, res) => {
    const { name } = req.body;
    const file = req.file.filename;

    try {
        const calendar = new Calendar({ name, file });
        await calendar.save();
        res.status(201).json(calendar);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload calendar' });
    }
};

// Function to get all calendars
const getCalendar = async (req, res) => {
    try {
        const calendars = await Calendar.find();
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get calendars' });
    }
};

// Function to delete a calendar
const deleteCalendar = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the calendar by id and delete it
        const calendar = await Calendar.findByIdAndDelete(id);

        // Return success message
        return res.status(200).json({ message: 'Calendar deleted successfully' });
    } catch (error) {
        // Return error message
        return res.status(500).json({ message: 'Failed to delete calendar' });
    }
};

// Export the functions
export {
    uploadCalendar,
    getCalendar,
    deleteCalendar
};



